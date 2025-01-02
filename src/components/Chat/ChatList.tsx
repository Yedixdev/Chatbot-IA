import { memo } from 'react';
import { RiUser2Fill } from "react-icons/ri";
import { TbEditCircle } from "react-icons/tb";
import { ChatData } from '../../types/index';

interface ChatListProps {
  chats: ChatData[];
  selectedChat: string;
  unreadChats: Set<string>;
  onChatSelect: (phoneNumber: string) => void;
  onEditClick: (phoneNumber: string) => void;
  query: string;
}

export const ChatList = memo(({ 
  chats, 
  selectedChat, 
  unreadChats, 
  onChatSelect, 
  onEditClick, 
  query 
}: ChatListProps) => {
  const filteredChats = chats.filter((chat) =>
    chat.phone_number.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2 overflow-y-auto">
      {filteredChats.map((chat) => (
        <div
          key={chat.phone_number}
          onClick={() => onChatSelect(chat.phone_number)}
          className={`
            h-20 flex justify-between items-center 
            border-b border-gray-700 py-2 rounded-lg p-2 
            hover:bg-gray-900 mb-3 cursor-pointer
            ${selectedChat === chat.phone_number ? 'bg-gray-800' : ''}
          `}
        >
          <div className="w-10 h-10 p-2 border border-gray-700 rounded-full flex items-center justify-center relative">
            {chat.lastMessage?.name ? (
              <span className="text-lg font-semibold">
                {chat.lastMessage.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <RiUser2Fill className="text-2xl" />
            )}
            {unreadChats.has(chat.phone_number) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </div>

          <div className="w-full p-2 flex flex-col">
            <h3 className="font-semibold flex flex-row items-center justify-between gap-2">
              {chat.lastMessage?.name || chat.phone_number}
            </h3>
            {chat.lastMessage && (
              <p className="text-sm text-gray-400 truncate">
                {chat.lastMessage.message_text.slice(0,55) + 
                 (chat.lastMessage.message_text.length > 52 ? "..." : "")}
              </p>
            )}
          </div>

          <span className="w-[100px] text-sm text-gray-500 flex flex-col items-center justify-center gap-2">
            <TbEditCircle
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(chat.phone_number);
              }}
              className="text-2xl hover:text-gray-400 hover:transform hover:scale-110 cursor-pointer"
            />
            {chat.lastMessage && (
              <span className="text-xs">
                {new Date(chat.lastMessage.timestamp).toLocaleTimeString()}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
});

ChatList.displayName = 'ChatList';