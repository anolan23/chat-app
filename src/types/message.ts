export interface Message {
  id?: number;
  created_at?: string;
  user_id?: number;
  channel_id: number;
  body: string;
  photo?: string;
  name?: string;
}
