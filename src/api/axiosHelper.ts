import axios from "axios";

export const BASE_URL = "https://chatbot-whatsapp-ycnt.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Obtener lista de chats
export const getMessages = async () => {
  try {
    const response = await axiosInstance.get('/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Obtener mensajes de un chat específico
export const getMessagesByNumber = async (number: string) => {
  try {
    const response = await axiosInstance.get(`/messages?number=${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages for number:', error);
    return [];
  }
};
