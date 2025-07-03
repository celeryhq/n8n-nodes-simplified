import type {
	IDataObject,
	IExecuteFunctions,
	ILoadOptionsFunctions,
	IHookFunctions,
	IWebhookFunctions,
	JsonObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function simplifiedApiRequest(
	this: IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions | IExecuteFunctions,
	method: IHttpRequestMethods,
	resource: string,
	body: any = {},
	query: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('simplifiedApi');
	const baseUrl = `${credentials.url}`;

	let options: IHttpRequestOptions = {
		method,
		body,
		qs: query,
		url: uri || `${baseUrl}${resource}`,
		json: true,
	};
	if (Object.keys(body as IDataObject).length === 0) {
		delete options.body;
	}
	if (Object.keys(query).length === 0) {
		delete options.qs;
	}
	options = { ...options, ...option };
	try {
		return await this.helpers.httpRequestWithAuthentication.call(
			this,
			'simplifiedApi',
			options,
		);
	} catch (error: any) {
		throw new NodeApiError(this.getNode(), error as JsonObject);
	}
}
