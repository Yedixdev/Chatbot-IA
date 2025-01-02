export interface Message {
    id: number;
    message_text: string;
    timestamp: string;
    is_user: boolean;
    phone_number: string;
    name: string | null;
    message_id: string | null;
    response: string | null;
    is_read?: boolean;
  }
  
  export interface ChatData {
    phone_number: string;
    messages: Message[];
    lastMessage?: Message;
  }