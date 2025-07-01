import {
	IAuthenticateGeneric,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class SimplifiedApi implements ICredentialType {
	name = 'simplifiedApi';
	displayName = 'Simplified API';

	documentationUrl = 'https://simplified.readme.io/reference/authentication';

	properties: INodeProperties[] = [
		 {
            displayName: 'Simplified API URL',
            name: 'url',
            placeholder: "https://api.simplified.com",
            type: 'string',
            default: 'https://api.simplified.com',
            required: true,
        },
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': 'Api-Key ={{$credentials.apiKey}}',
			},
		},
	};

}
