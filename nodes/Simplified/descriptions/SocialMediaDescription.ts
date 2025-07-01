import type { INodeProperties } from 'n8n-workflow';


export const socialMediaOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['social-media'],
            },
        },
        options: [

            {
                name: 'Get Connected Accounts',
                value: 'getAccounts',
                description: 'Retrieve all connected social media accounts',
                action: 'Get connected accounts',
            },
            {
                name: 'Create Post',
                value: 'createPost',
                description: 'Create a new social media post',
                action: 'Create a new post',
            },
        ],
        default: 'createPost',
    },
];

export const socialMediaFields: INodeProperties[] = [
    // ----------------------------------------
    //            social-media: createPost
    // ----------------------------------------
    {
        displayName: 'Action',
        name: 'action',
        type: 'options',
        options: [
            {
                name: 'Schedule',
                value: 'schedule',
                action: 'Schedule a social media',
            },
            {
                name: 'Add to Queue',
                value: 'add_to_queue',
                action: 'Add to queue a social media',
            },
            {
                name: 'Add as Draft',
                value: 'draft',
                action: 'Add as draft a social media',
            },
        ],
        default: 'schedule',
        required: true,
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
            },
        },
    },
    {
        displayName: 'Network Type',
        name: 'network',
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
            },
        },
        type: 'options',
        options: [
            {
                name: 'Bluesky',
                value: 'bluesky',
            },
            {
                name: 'Facebook',
                value: 'facebook',
            },
            {
                name: 'Google Profile',
                value: 'google',
            },
            {
                name: 'Instagram',
                value: 'instagram',
            },
            {
                name: 'LinkedIn',
                value: 'linkedin',
            },

            {
                name: 'Pinterest',
                value: 'pinterest',
            },
            {
                name: 'Threads',
                value: 'threads',
            },

            {
                name: 'Tiktok (Business)',
                value: 'tiktokBusiness',
            },
            {
                name: 'Tiktok (Personal)',
                value: 'tiktok',
            },
            {
                name: 'Youtube',
                value: 'youtube',
            },


        ],
        default: 'facebook',
        required: true,
    },
    {
        displayName: 'Account Name or ID',
        name: 'accountIds',
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
            },
        },
        type: 'options',
        typeOptions: {
            loadOptionsDependsOn: [
                'network',
            ],
            loadOptionsMethod: 'getAccountsList',
        },
        default: '',
        required: true,
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
    },
    {
        displayName: 'Message',
        name: 'message',
        type: 'string',
        typeOptions: {
            rows: 4,
        },
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
            },
        },
        default: '',
        description: 'The message content for the social media post',
    },

    {
        displayName: 'Schedule Date',
        name: 'scheduleDate',
        type: 'dateTime',
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
                action: ['schedule', 'draft'],
            },
        },
        default: '',
        description: 'Date and time when the post should be published',
    },
    {
        displayName: 'Media',
        name: 'media',
        type: 'fixedCollection',
        placeholder: 'Add media item',
        default: [],
        typeOptions: {
            multipleValues: true,
        },
        displayOptions: {
            show: {
                operation: ['createPost'],
                resource: ['social-media'],
            },
        },
        options: [
            {
                name: 'mediaItem',
                displayName: 'Media Item',
                values: [
                    {
                        displayName: 'URL/AssetId',
                        name: 'url',
                        type: 'string',
                        default: '',
                        placeholder: 'https://example.com/image.jpg',
                    },
                ],
            },
        ],
    },

    {
        // "google" 
        displayName: 'Google My Business Settings',
        name: 'google',
        type: 'collection',
        default: {},
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['google'],
            },
        },
        options: [
            {
                // "post" 
                displayName: 'Google Post',
                name: 'post',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Call to Action Type',
                        name: 'callToActionType',
                        type: 'options',
                        options: [
                            { name: 'Book', value: 'BOOK' },
                            { name: 'Call', value: 'CALL' },
                            { name: 'Learn More', value: 'LEARN_MORE' },
                            { name: 'None', value: '' },
                            { name: 'Order', value: 'ORDER' },
                            { name: 'Shop', value: 'SHOP' },
                            { name: 'Sign Up', value: 'SIGN_UP' },
                        ],
                        default: '',
                        description: 'Type of call to action for the post',
                    },
                    {
                        displayName: 'Call to Action URL',
                        name: 'callToActionUrl',
                        type: 'string',
                        default: '',
                        description: 'URL for the call to action button',
                    },
                    {
                        displayName: 'Coupon Code',
                        name: 'couponCode',
                        type: 'string',
                        default: '',
                        description: 'Coupon code for an offer post',
                        displayOptions: {
                            show: {
                                topicType: ['OFFER'],
                            },
                        },
                    },
                    {
                        displayName: 'End Date',
                        name: 'endDate',
                        type: 'dateTime',
                        default: '',
                        description: 'The end date of the Google My Business post (e.g., event or offer)',
                    },

                    {
                        displayName: 'Redeem Online URL',
                        name: 'redeemOnlineUrl',
                        type: 'string',
                        default: '',
                        description: 'Redeem online URL for an offer post',
                        displayOptions: {
                            show: {
                                topicType: ['OFFER'],
                            },
                        },
                    },
                    {
                        displayName: 'Start Date',
                        name: 'startDate',
                        type: 'dateTime',
                        default: '',
                        description: 'The start date of the Google My Business post (e.g., event or offer)',
                    },
                    {
                        displayName: 'Terms Conditions',
                        name: 'termsConditions',
                        type: 'string',
                        default: '',
                        description: 'Terms and conditions for an offer post',
                        displayOptions: {
                            show: {
                                topicType: ['OFFER'],
                            },
                        },
                    }, {
                        displayName: 'Title',
                        name: 'title',
                        type: 'string',
                        default: '',
                        description: 'The title of the Google My Business post',
                    },
                    {
                        displayName: 'Topic Type',
                        name: 'topicType',
                        type: 'options',
                        options: [
                            { name: 'Standard', value: 'STANDARD' },
                            { name: 'Event', value: 'EVENT' },
                            { name: 'Offer', value: 'OFFER' },
                        ],
                        default: 'STANDARD',
                        description: 'The type of Google My Business post',
                    },

                ],
            },
        ],
    },
    {
        // "tiktok" 
        displayName: 'TikTok Personal Settings',
        name: 'tiktok',
        type: 'collection',
        default: {},
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['tiktok'],
            },
        },
        options: [
            {
                displayName: 'Post Video Settings',
                name: 'post',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Brand Content',
                        name: 'brandContent',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the video contains branded content',
                    },
                    {
                        displayName: 'Brand Organic',
                        name: 'brandOrganic',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the video is organic brand content',
                    },
                    {
                        displayName: 'Comment Disabled',
                        name: 'commentDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable comments for this video',
                    },
                    {
                        displayName: 'Duet Disabled',
                        name: 'duetDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable dueting for this video',
                    },
                    {
                        displayName: 'Privacy',
                        name: 'privacyStatus',
                        type: 'options',
                        options: [
                            { name: 'Public to Everyone', value: 'PUBLIC_TO_EVERYONE' },
                            { name: 'Mutual Follow Friends', value: 'MUTUAL_FOLLOW_FRIENDS' },
                            { name: 'Follower of Creator', value: 'FOLLOWER_OF_CREATOR' },
                            { name: 'Self Only', value: 'SELF_ONLY' },
                        ],
                        default: 'PUBLIC_TO_EVERYONE',
                        description: 'Privacy setting for the video',
                    },
                    {
                        displayName: 'Stitch Disabled',
                        name: 'stitchDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable stitching for this video',
                    },

                ],
            },
            {
                displayName: 'Channel',
                name: 'channel',
                type: 'options',
                options: [
                    { name: 'Direct', value: 'direct' },
                    { name: 'Reminder', value: 'reminder' },
                ],
                default: 'direct',
                description: 'The channel for the TikTok post',
            },
            {
                displayName: 'Post Type',
                name: 'postType',
                type: 'options',
                options: [
                    { name: 'Video', value: 'video' },
                    { name: 'Photo', value: 'photo' },
                ],
                default: 'video',
                description: 'The type of content to post on TikTok',
            },
            {
                displayName: 'Post Photo Settings',
                name: 'postPhoto',
                type: 'collection',
                default: {},
                displayOptions: {
                    show: {
                        'postType': ['photo'],
                    },
                },
                options: [

                    {
                        displayName: 'Brand Content',
                        name: 'brandContent',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the photo contains branded content',
                    },
                    {
                        displayName: 'Brand Organic',
                        name: 'brandOrganic',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the photo is organic brand content',
                    },
                    {
                        displayName: 'Comment Disabled',
                        name: 'commentDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable comments for this photo',
                    },
                    {
                        displayName: 'Duet Disabled',
                        name: 'duetDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable dueting for this photo',
                    },
                    {
                        displayName: 'Privacy',
                        name: 'privacyStatus',
                        type: 'options',
                        options: [
                            { name: 'Public to Everyone', value: 'PUBLIC_TO_EVERYONE' },
                            { name: 'Mutual Follow Friends', value: 'MUTUAL_FOLLOW_FRIENDS' },
                            { name: 'Follower of Creator', value: 'FOLLOWER_OF_CREATOR' },
                            { name: 'Self Only', value: 'SELF_ONLY' },
                        ],
                        default: 'PUBLIC_TO_EVERYONE',
                        description: 'Privacy setting for the photo',
                    },
                    {
                        displayName: 'Stitch Disabled',
                        name: 'stitchDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable stitching for this photo',
                    },

                ],
            },
        ],
    },
    {
        // "threads" 
        displayName: 'Threads Settings',
        name: 'threads',
        type: 'collection',
        default: {},
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['threads'],
            },
        },
        options: [
            {
                displayName: 'Channel',
                name: 'channel',
                type: 'options',
                options: [
                    { name: 'Direct', value: 'direct' },
                    { name: 'Reminder', value: 'reminder' },
                ],
                default: 'direct',
                description: 'The channel for the Threads post',
            },
        ],
    },
    {
        displayName: 'YouTube Settings',
        name: 'youtube',
        type: 'collection',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['youtube'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Post Settings',
                name: 'post',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Title',
                        name: 'title',
                        type: 'string',
                        default: '',
                        description: 'Title of the YouTube video',
                    },
                    {
                        displayName: 'License',
                        name: 'license',
                        type: 'options',
                        options: [
                            { name: 'None', value: '' },
                            { name: 'YouTube Standard License', value: 'youtube' },
                            { name: 'Creative Commons', value: 'creativeCommon' },
                        ],
                        default: '',
                        description: 'License type for the YouTube video',
                    },
                    {
                        displayName: 'Privacy',
                        name: 'privacyStatus',
                        type: 'options',
                        options: [
                            { name: 'None', value: '' },
                            { name: 'Private', value: 'private' },
                            { name: 'Unlisted', value: 'unlisted' },
                            { name: 'Public', value: 'public' },
                        ],
                        default: '',
                        description: 'Privacy status of the YouTube video',
                    },
                    {
                        displayName: 'Made For Kids',
                        name: 'selfDeclaredMadeForKids',
                        type: 'options',
                        options: [
                            { name: 'None', value: '' },
                            { name: 'No', value: 'no' },
                            { name: 'Yes', value: 'yes' },
                        ],
                        default: '',
                        description: 'Indicate if the video is made for kids',
                    },
                ],
            },
            {
                displayName: 'Post Type',
                name: 'postType',
                type: 'options',
                options: [
                    { name: 'Video', value: 'video' },
                    { name: 'Short', value: 'short' },
                ],
                default: 'video',
                description: 'The type of content to post on YouTube',
            },
        ],
    },
    {
        // "facebook" 
        displayName: 'Facebook Settings',
        name: 'facebook',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['facebook'],
            },
        },
        type: 'collection',
        default: {},
        options: [
            {
                displayName: 'Post Type',
                name: 'postType',
                type: 'options',
                options: [
                    { name: 'Post', value: 'post' },
                    { name: 'Story', value: 'story' },
                    { name: 'Reel', value: 'reel' },
                ],
                default: 'post',
                description: 'The type of content to post on Facebook',
            },
        ],
    },
    {
        // "linkedin"
        displayName: 'LinkedIn Settings',
        name: 'linkedin',
        type: 'collection',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['linkedin'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Audience',
                name: 'audience',
                type: 'options',
                options: [
                    { name: 'Public', value: 'PUBLIC' },
                    { name: 'Connections', value: 'CONNECTIONS' },
                    { name: 'Logged In', value: 'LOGGED_IN' },
                ],
                default: 'PUBLIC',
                description: 'The audience for the LinkedIn post',
            },
        ],
    },
    {
        // "instagram" 
        displayName: 'Instagram Settings',
        name: 'instagram',
        type: 'collection',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['instagram'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Reel Settings',
                name: 'postReel',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Audio Name',
                        name: 'audioName',
                        type: 'string',
                        default: '',
                        description: 'Name of the audio used in the Instagram Reel',
                    },
                    {
                        displayName: 'Share to Feed',
                        name: 'shareToFeed',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to share the Reel to the main feed',
                    },
                ],
            },
            {
                displayName: 'Post Type',
                name: 'postType',
                type: 'options',
                options: [
                    { name: 'Post', value: 'post' },
                    { name: 'Story', value: 'story' },
                    { name: 'Reel', value: 'reel' },
                ],
                default: 'post',
                description: 'The type of content to post on Instagram',
            },
        ],
    },
    {
        // "pinterest" 
        displayName: 'Pinterest Settings',
        name: 'pinterest',
        type: 'collection',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['pinterest'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Pin Settings',
                name: 'post',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Link',
                        name: 'link',
                        type: 'string',
                        default: '',
                        description: 'The link associated with the Pinterest pin',
                    },
                    {
                        displayName: 'Title',
                        name: 'title',
                        type: 'string',
                        default: '',
                        description: 'The title of the Pinterest pin',
                    },
                    {
                        displayName: 'Image Alt Text',
                        name: 'imageAlt',
                        type: 'string',
                        default: '',
                        description: 'Alternative text for the image on Pinterest',
                    },
                ],
            },
        ],
    },
    {
        // "tiktokBusiness" 
        displayName: 'TikTok Business Settings',
        name: 'tiktokBusiness',
        type: 'collection',
        displayOptions: {
            show: {
                operation: ['createPost'],
                network: ['tiktokBusiness'],
            },
        },
        default: {},
        options: [
            {
                displayName: 'Post Video Settings',
                name: 'post',
                type: 'collection',
                default: {},
                options: [
                    {
                        displayName: 'Brand Content',
                        name: 'brandContent',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the video contains branded content',
                    },
                    {
                        displayName: 'Brand Organic',
                        name: 'brandOrganic',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the video is organic brand content',
                    },
                    {
                        displayName: 'Comment Disabled',
                        name: 'commentDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable comments for this video',
                    },
                    {
                        displayName: 'Duet Disabled',
                        name: 'duetDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable dueting for this video',
                    },
                    {
                        displayName: 'Privacy',
                        name: 'privacyStatus',
                        type: 'options',
                        options: [
                            { name: 'Public to Everyone', value: 'PUBLIC_TO_EVERYONE' },
                            { name: 'Mutual Follow Friends', value: 'MUTUAL_FOLLOW_FRIENDS' },
                            { name: 'Follower of Creator', value: 'FOLLOWER_OF_CREATOR' },
                            { name: 'Self Only', value: 'SELF_ONLY' },
                        ],
                        default: 'PUBLIC_TO_EVERYONE',
                        description: 'Privacy setting for the video',
                    },
                    {
                        displayName: 'Stitch Disabled',
                        name: 'stitchDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable stitching for this video',
                    },

                ],
            },
            {
                displayName: 'Channel',
                name: 'channel',
                type: 'options',
                options: [
                    { name: 'Direct', value: 'direct' },
                    { name: 'Reminder', value: 'reminder' },
                ],
                default: 'direct',
                description: 'The channel for the TikTok Business post',
            },
            {
                displayName: 'Post Type',
                name: 'postType',
                type: 'options',
                options: [
                    { name: 'Video', value: 'video' },
                    { name: 'Photo', value: 'photo' },
                ],
                default: 'video',
                description: 'The type of content to post on TikTok Business',
            },
            {
                displayName: 'Post Photo Settings',
                name: 'postPhoto',
                type: 'collection',
                default: {},
                displayOptions: {
                    show: {
                        'postType': ['photo'],
                    },
                },
                options: [

                    {
                        displayName: 'Brand Content',
                        name: 'brandContent',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the photo contains branded content',
                    },
                    {
                        displayName: 'Brand Organic',
                        name: 'brandOrganic',
                        type: 'boolean',
                        default: true,
                        description: 'Whether the photo is organic brand content',
                    }, {
                        displayName: 'Comment Disabled',
                        name: 'commentDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable comments for this photo',
                    },
                    {
                        displayName: 'Duet Disabled',
                        name: 'duetDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable dueting for this photo',
                    },
                    {
                        displayName: 'Privacy',
                        name: 'privacyStatus',
                        type: 'options',
                        options: [
                            { name: 'Public to Everyone', value: 'PUBLIC_TO_EVERYONE' },
                            { name: 'Mutual Follow Friends', value: 'MUTUAL_FOLLOW_FRIENDS' },
                            { name: 'Follower of Creator', value: 'FOLLOWER_OF_CREATOR' },
                            { name: 'Self Only', value: 'SELF_ONLY' },
                        ],
                        default: 'PUBLIC_TO_EVERYONE',
                        description: 'Privacy setting for the photo',
                    },
                    {
                        displayName: 'Stitch Disabled',
                        name: 'stitchDisabled',
                        type: 'boolean',
                        default: true,
                        description: 'Whether to disable stitching for this photo',
                    },
                    {
                        displayName: 'Title',
                        name: 'title',
                        type: 'string',
                        default: '',
                        description: 'Title for the photo post',
                    },

                ],
            },
        ],
    },

];