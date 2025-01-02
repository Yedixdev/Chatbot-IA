import { useState, ChangeEvent } from "react";
import { RiMenuUnfold4Line, RiMenuFoldLine } from "react-icons/ri";
import { useChat } from './hooks/useChat';
import { ChatList } from './components/Chat/ChatList';
import { MessageList } from './components/Message/MessageList';
import { PopUpEdit } from "./components/EditForm/PopUpEdit";
import { usePopUp } from "./components/EditForm/usePopUp";

function App() {
  const [query, setQuery] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isOpen, handleOpen, handleClose } = usePopUp();
  
  const {
    selectedChat,
    setSelectedChat,
    chats,
    selectedChatMessages,
    isLoading,
    unreadChats,
    error
  } = useChat();

  const handleChatSelect = (phoneNumber: string) => {
    setSelectedChat(phoneNumber);
    setIsSidebarOpen(false);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const selectedChatData = chats.find(chat => chat.phone_number === selectedChat);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <div className={`fixed inset-0 bg-gray-950 text-white p-4 border-r border-gray-700 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/3 z-10`}>
        <div className="flex justify-between items-center text-2xl mb-4">
          <h2 className="text-2xl font-bold">Chats</h2>
          <RiMenuFoldLine
            className="text-gray-100 cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Buscar..."
          className="w-full p-2 mb-4 text-lg text-gray-950 placeholder:text-gray-600 bg-gray-300 rounded-xl focus:ring-2 focus:ring-gray-700 focus:outline-none"
        />

        <ChatList
          chats={chats}
          selectedChat={selectedChat}
          unreadChats={unreadChats}
          onChatSelect={handleChatSelect}
          onEditClick={handleOpen}
          query={query}
        />
      </div>

      {isOpen && <PopUpEdit onClose={handleClose} />}

      {!isSidebarOpen && (
        <RiMenuUnfold4Line
          className="text-gray-900 cursor-pointer absolute top-4 right-4 z-20 text-2xl md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Chat Area */}
      <div
        className={`flex-grow flex flex-col h-screen ${
          isSidebarOpen ? "w-full" : "w-full md:w-2/3"
        }`}
        style={{ background: "linear-gradient(to bottom, #d3d3d3, #00008b)" }}
      >
        <div className="p-4 border-b border-gray-400 bg-gray-300 bg-opacity-75 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">
              {selectedChatData?.lastMessage?.name || selectedChat}
            </h2>
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <div className="flex-grow p-4 overflow-y-auto bg-gray-300 bg-opacity-75">
          <MessageList messages={selectedChatMessages} />
        </div>
      </div>
    </div>
  );
}

export default App;