import { memo, useRef, useEffect } from 'react';
import { Message } from '../../types/index';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = memo(({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        message ? (
          <div
            key={message.id}
            className={`p-4 rounded-xl max-w-[80%] ${
              message.is_user
                ? "bg-gray-900 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start mr-auto"
            }`}
          >
            <div>{message.message_text}</div>
            <div className="text-xs text-gray-400 mt-2 flex justify-between">
              <span>{message.name || 'Bot'}</span>
              <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ) : null
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
});

MessageList.displayName = 'MessageList';