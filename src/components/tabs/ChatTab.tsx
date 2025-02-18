import React, { useState } from 'react';
import { useStore } from '../../store';
import { Search, Send, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatTab = () => {
  const [message, setMessage] = useState('');
  const darkMode = useStore((state) => state.darkMode);
  const friends = useStore((state) => state.friends);
  const activeChat = useStore((state) => state.activeChat);
  const setActiveChat = useStore((state) => state.setActiveChat);
  const chats = useStore((state) => state.chats);
  const sendMessage = useStore((state) => state.sendMessage);

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      id: crypto.randomUUID(),
      senderId: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    sendMessage(activeChat, newMessage);
    setMessage('');
    toast.success('Message sent!');
  };

  return (
    <div className="h-full flex">
      {/* Friends List */}
      <div className={`w-72 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mr-4 retro-border`}>
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              className="retro-input w-full pl-10"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          {friends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => setActiveChat(friend.id)}
              className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-colors ${
                activeChat === friend.id
                  ? 'bg-primary text-white'
                  : darkMode
                  ? 'hover:bg-gray-600'
                  : 'hover:bg-gray-200'
              }`}
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full retro-border"
              />
              <div className="flex-1 text-left">
                <p className="font-bold">{friend.name}</p>
                <p className="text-sm truncate">
                  {friend.lastMessage || 'Start chatting!'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mb-4 overflow-y-auto retro-border`}>
              {chats
                .find((chat) => chat.id === activeChat)
                ?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-4 flex ${
                      msg.senderId === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.senderId === 'user'
                          ? 'bg-primary text-white'
                          : darkMode
                          ? 'bg-gray-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      {msg.content}
                      {msg.blob && (
                        <div className="mt-2 retro-border p-2 rounded bg-white">
                          <img
                            src={msg.blob.image}
                            alt={msg.blob.name}
                            className="w-32 h-32 object-cover rounded"
                          />
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                              {msg.blob.name}
                            </span>
                            <button
                              onClick={() => {
                                // Download functionality
                                toast.success('Blob downloaded!');
                              }}
                              className="text-primary hover:text-primary-dark"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="retro-input flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="retro-button px-6"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 flex items-center justify-center retro-border`}>
            <p className="text-xl">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTab;