import axios from "axios";

export const BASE_URL = "https://chatbot-whatsapp-ycnt.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const getMessages = async () => {
  const response = await axiosInstance.get(`/messages`);
  console.log(response);
  return response.data;
};
