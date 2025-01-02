import { useState, useEffect, useCallback } from 'react';
import { getMessages, getMessagesByNumber } from "../api/axiosHelper";
import { ChatData, Message } from '../types/index';

export const useChat = () => {
  const [selectedChat, setSelectedChat] = useState<string>("");
  const [chats, setChats] = useState<ChatData[]>([]);
  const [selectedChatMessages, setSelectedChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadChats, setUnreadChats] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const updateChatsWithNewMessages = useCallback((newMessages: Message[]) => {
    if (!newMessages.length) return;
    
    setChats(prevChats => prevChats.map(chat => {
      if (chat.phone_number === selectedChat) {
        return {
          ...chat,
          lastMessage: newMessages[newMessages.length - 1]
        };
      }
      return chat;
    }));
  }, [selectedChat]);

  const loadSelectedChatMessages = useCallback(async () => {
    if (!selectedChat) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMessagesByNumber(selectedChat);
      
      if (data?.[0]?.messages) {
        setSelectedChatMessages(data[0].messages);
        setUnreadChats(prev => {
          const next = new Set(prev);
          next.delete(selectedChat);
          return next;
        });

        updateChatsWithNewMessages(data[0].messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Error al cargar los mensajes');
    } finally {
      setIsLoading(false);
    }
  }, [selectedChat, updateChatsWithNewMessages]);

  const loadInitialChats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getMessages();
      
      const chatsWithLastMessage = await Promise.all(
        data.map(async (chat: ChatData) => {
          try {
            const messages = await getMessagesByNumber(chat.phone_number);
            return {
              ...chat,
              lastMessage: messages[0]?.messages[0] || null
            };
          } catch (error) {
            console.error(`Error loading messages for ${chat.phone_number}:`, error);
            return chat;
          }
        })
      );

      setChats(chatsWithLastMessage);
      if (chatsWithLastMessage.length > 0 && !selectedChat) {
        setSelectedChat(chatsWithLastMessage[0].phone_number);
      }
    } catch (error) {
      console.error('Error loading initial chats:', error);
      setError('Error al cargar los chats');
    } finally {
      setIsLoading(false);
    }
  }, [selectedChat]);

  useEffect(() => {
    loadInitialChats();
  }, []);

  useEffect(() => {
    if (!selectedChat) return;

    loadSelectedChatMessages();
    const interval = setInterval(loadSelectedChatMessages, 3000);
    return () => clearInterval(interval);
  }, [selectedChat, loadSelectedChatMessages]);

  return {
    selectedChat,
    setSelectedChat,
    chats,
    selectedChatMessages,
    isLoading,
    unreadChats,
    error,
    refreshMessages: loadSelectedChatMessages
  };
};