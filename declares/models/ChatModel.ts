export interface ChatPayload {
  message: string;
}

export interface IMessage {
  id: number;
  name: string;
  message: string;
  created_at: string;
  type: string;
}
