import {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	INode,
	LoggerProxy as Logger,
} from 'n8n-workflow';

import { simplifiedApiRequest } from './GenericFunctions';
import { NodeApiError, NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { socialMediaFields, socialMediaOperations } from './descriptions/SocialMediaDescription';

export class Simplified implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Simplified',
		name: 'simplified',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: { light: 'file:simplified.svg', dark: 'file:simplified.svg' },
		description: 'Simplified',
		defaults: {
			name: 'Simplified',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		requestDefaults: {
			baseURL: '={{$credentials.url}}',
		},
		credentials: [
			{
				name: 'simplifiedApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Social Media',
						value: 'social-media',
					},

				],
				default: 'social-media',
			},
			...socialMediaOperations,
			...socialMediaFields,
		]
	};
	methods = {
		loadOptions: {
			async getAccountsList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {

				try {
					const returnData: INodePropertyOptions[] = [];
					const networkValue = this.getCurrentNodeParameter('network') as string; // Zakładamy, że 'network' to string

					const queryParameters: { [key: string]: any } = {};
					if (networkValue) {
						queryParameters.network = networkValue;
					}

					const response = await simplifiedApiRequest.call(this, 'GET', `/api/v1/service/social-media/get-accounts`, {}, queryParameters);

					const accounts = response.accounts;

					for (const account of accounts) {
						const listName = account.name + ' (' + account.type + ')';
						const listId = account.id;
						returnData.push({
							name: listName,
							value: listId,
						});
					}
					return returnData;
				} catch (error) {
					throw new NodeOperationError(this.getNode(), 'Could not load accounts. Check your API credentials or network connection.');
				}
			}
		}
	}

	static _formatDateString(node: INode, dateString: string): string {
		const isoDateString = dateString.replace(' ', 'T');
		const dateObj = new Date(isoDateString);

		if (isNaN(dateObj.getTime())) {
			throw new NodeOperationError(node, `Failed to parse date string: "${dateString}". Ensure it's a valid date format.`);
		}

		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, '0');
		const day = String(dateObj.getDate()).padStart(2, '0');
		const hours = String(dateObj.getHours()).padStart(2, '0');
		const minutes = String(dateObj.getMinutes()).padStart(2, '0');

		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const fieldStructureMap: Record<string, Record<string, 'value' | 'object'>> = {
			facebook: { postType: 'value' },
			linkedin: { audience: 'value' },
			instagram: { postReel: 'object', postType: 'value' },
			youtube: { post: 'object', postType: 'value' },
			tiktok: { post: 'object', postType: 'value', channel: 'value', postPhoto: 'object' },
			tiktokBusiness: { post: 'object', postType: 'value', channel: 'value', postPhoto: 'object' },
			pinterest: { post: 'object' },
			google: { post: 'object' },
			threads: { channel: 'value' },
		};
		// Get operation type
		const operation = this.getNodeParameter('operation', 0) as string;
		const resource = this.getNodeParameter('resource', 0);
		try {

			for (let i = 0; i < items.length; i++) {
				let responseData: any;
				if (resource === 'social-media') {

					if (operation === 'getAccounts') {
						responseData = await simplifiedApiRequest.call(this, 'GET', `/api/v1/service/social-media/get-accounts`, {});
					}

					if (operation === 'createPost') {
						const network = this.getNodeParameter('network', i) as string;
						const fieldFormat = fieldStructureMap[network] || {};
						const rawParams = this.getNodeParameter(network, i, {}) as Record<string, any>;
						const message = this.getNodeParameter('message', i) as string;
						const scheduleDateISO = this.getNodeParameter('scheduleDate', i) as string;
						const accountId = this.getNodeParameter('accountIds', i) as string;
						const action = this.getNodeParameter('action', i) as string;
						const formattedParams: Record<string, any> = {};

						for (const [key, val] of Object.entries(rawParams)) {
							const format = fieldFormat[key] || 'value';
							if (format === 'value') {
								formattedParams[key] = { value: val };
							} else if (format === 'object') {
								formattedParams[key] = val;
							}
						}

						const additional = {
							[network]: formattedParams,
						}
						let formattedDate: string | null = null;
						if (scheduleDateISO) {
							formattedDate = Simplified._formatDateString(this.getNode(), scheduleDateISO);
						}

						const mediaWrapper = this.getNodeParameter('media', i, {}) as {
							mediaItem?: Array<{ url: string }>;
						};

						const media = mediaWrapper.mediaItem?.map(item => item.url) ?? [];

						const payload = {
							action: action,
							message: message.trim(),
							account_ids: [accountId],
							date: formattedDate,
							media: media,
							additional: additional
						};
						Logger.debug(JSON.stringify({ "payload": payload }));

						responseData = await simplifiedApiRequest.call(this, 'POST', '/api/v1/service/social-media/create', payload);

						Logger.debug(responseData);

					}
				}


				// Add the response data to return array
				returnData.push({
					json: responseData,
					pairedItem: {
						item: i,
					},
				});
			}
			return this.prepareOutputData(returnData);
		} catch (error) {
			// Handle any uncaught errors
			if (error instanceof NodeApiError || error instanceof NodeOperationError) {
				throw error;
			}

			throw new NodeOperationError(this.getNode(), `Execution failed: ${error.message}`);
		}
	}

}
