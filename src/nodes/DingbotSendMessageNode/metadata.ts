import type { INodeTypeDescription } from 'n8n-workflow';

export const description: INodeTypeDescription = {
  displayName: 'Dingbot - Send Message',
  name: 'dingbotSendMessage',
  group: ['communication'],
  version: 1,
  description: 'Send message from Dingbot',
  defaults: {
    name: 'Dingbot - Send Message',
    color: '#772244',
  },
  inputs: ['main'],
  outputs: ['main'],
  properties: [
    {
      displayName: 'Access Token',
      name: 'accessToken',
      type: 'string',
      required: true,
      default: '',
      description: 'Access Token of the webhook',
    },
    {
      displayName: 'Secret',
      name: 'secret',
      type: 'string',
      default: '',
      description: 'Secret of the webhook',
    },
    {
      displayName: 'Message Type',
      name: 'messageType',
      type: 'options',
      required: true,
      default: 'text',
      description:
        'https://open.dingtalk.com/document/group/custom-robot-access',
      options: [
        {
          name: 'Text',
          value: 'text',
        },
        {
          name: 'Link',
          value: 'link',
        },
        {
          name: 'Markdown',
          value: 'markdown',
        },
        {
          name: 'Action Card',
          value: 'actionCard',
        },
        // {
        //   name: 'Feed Card',
        //   value: 'feedCard',
        // },
      ],
    },
    {
      displayName: 'Title',
      name: 'title',
      type: 'string',
      required: true,
      default: '',
      displayOptions: {
        show: {
          messageType: ['link', 'markdown', 'actionCard'],
        },
      },
    },
    {
      displayName: 'Content',
      name: 'textContent',
      type: 'string',
      required: true,
      default: '',
      displayOptions: {
        show: {
          messageType: ['text', 'link', 'markdown', 'actionCard'],
        },
      },
    },
    {
      displayName: 'Link URL',
      name: 'linkURL',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          messageType: ['link'],
        },
      },
    },
    {
      displayName: 'Link Image URL',
      name: 'linkImageURL',
      type: 'string',
      default: '',
      displayOptions: {
        show: {
          messageType: ['link'],
        },
      },
    },
    {
      displayName: 'Button Orientation',
      name: 'buttonOrientation',
      type: 'options',
      required: true,
      default: '0',
      displayOptions: {
        show: {
          messageType: ['actionCard'],
        },
      },
      options: [
        {
          name: 'Vertical',
          value: '0',
        },
        {
          name: 'Horizontal',
          value: '1',
        },
      ],
    },
    {
      displayName: 'Actions',
      name: 'actions',
      type: 'fixedCollection',
      placeholder: 'Add Action',
      default: '',
      typeOptions: {
        multipleValues: true,
      },
      displayOptions: {
        show: {
          messageType: ['actionCard'],
        },
      },
      options: [
        {
          name: 'action',
          displayName: 'Action',
          values: [
            {
              displayName: 'Action Title',
              name: 'title',
              type: 'string',
              required: true,
              default: '',
            },
            {
              displayName: 'Action URL',
              name: 'actionURL',
              type: 'string',
              required: true,
              default: '',
            },
          ],
        },
      ],
    },
  ],
};
