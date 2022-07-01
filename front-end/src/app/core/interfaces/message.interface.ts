export enum MessageTypeEnum {
  SERVER_ERROR,
}

export interface MessageInterface {
  type: MessageTypeEnum;
  text: string;
}

export type MessageType = MessageInterface | null;
