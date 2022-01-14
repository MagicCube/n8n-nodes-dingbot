import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
} from 'n8n-workflow';
import {
  ActionCard as ActionCardMessage,
  Link as LinkMessage,
  Markdown as MarkdownMessage,
  MessageTemplateAbs as Message,
  Robot as DingbotClient,
  Text as TextMessage,
} from 'ts-dingtalk-robot';

import * as metadata from './metadata';

export class DingbotSendMessageNode implements INodeType {
  description = metadata.description;

  async execute(
    this: IExecuteFunctions
  ): Promise<INodeExecutionData[][] | null> {
    const items = this.getInputData();

    if (items.length > 0) {
      const messages = items.map((item, i) => {
        const messageType = this.getNodeParameter('messageType', i) as string;
        let message: Message;
        switch (messageType) {
          case 'text':
            const text = new TextMessage(
              this.getNodeParameter('textContent', i) as string
            );
            message = text;
            break;
          case 'link':
            const link = new LinkMessage(
              this.getNodeParameter('textContent', i) as string
            );
            link.setTitle(this.getNodeParameter('title', i) as string);
            link.setImage(this.getNodeParameter('linkImageURL', i) as string);
            link.setUrl(this.getNodeParameter('linkURL', i) as string);
            message = link;
            break;
          case 'markdown':
            const markdown = new MarkdownMessage();
            markdown.setTitle(this.getNodeParameter('title', i) as string);
            markdown.add(this.getNodeParameter('textContent', i) as string);
            message = markdown;
            break;
          case 'actionCard':
            const actionCard = new ActionCardMessage();
            actionCard.setTitle(this.getNodeParameter('title', i) as string);
            actionCard.setText(
              this.getNodeParameter('textContent', i) as string
            );
            actionCard.setBtnOrientation(
              parseInt(this.getNodeParameter('buttonOrientation', i) as string)
            );
            const actions = this.getNodeParameter('actions.action', i) as {
              title: string;
              actionURL: string;
            }[];
            actionCard.setBtns(actions);
            message = actionCard;
            break;
          default:
            throw new Error(`Unsupported message type: ${messageType}`);
        }

        item.json['dingbotMessage'] = message.get() as unknown as IDataObject;

        return message;
      });

      const accessToken = this.getNodeParameter('accessToken', 0) as string;
      const secret = this.getNodeParameter('secret', 0) as string | undefined;
      const dingbotClient = new DingbotClient({
        accessToken,
        secret: secret ? secret : undefined,
      });
      await Promise.all(
        messages.map((message) => {
          return dingbotClient.send(message);
        })
      );
    }

    return this.prepareOutputData(items);
  }
}
