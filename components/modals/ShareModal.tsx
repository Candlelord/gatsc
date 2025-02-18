import React, { useState } from 'react';
import { useStore } from '../../store';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const ShareModal = () => {
  const {
    showShareModal,
    setShowShareModal,
    selectedBlobToShare,
    friends,
    sendMessage,
    setActiveTab
  } = useStore();

  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  if (!showShareModal || !selectedBlobToShare) return null;

  const handleShare = () => {
    if (!selectedFriend) {
      toast.error('Please select a friend to share with!');
      return;
    }

    const newMessage = {
      id: crypto.randomUUID(),
      senderId: 'user',
      content: message || 'Check out this blob!',
      timestamp: new Date().toISOString(),
      blob: selectedBlobToShare
    };

    sendMessage(selectedFriend, newMessage);
    setShowShareModal(false);
    setActiveTab('chat');
    toast.success('Blob shared successfully!');
  };

  return (
    <div className="retro-menu">
      <div className="retro-menu-content max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Share Blob</h2>
          <button
            onClick={() => setShowShareModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <img
              src={selectedBlobToShare.image}
              alt={selectedBlobToShare.name}
              className="w-24 h-24 object-cover rounded-lg retro-border"
            />
            <div>
              <h3 className="font-bold">{selectedBlobToShare.name}</h3>
              <p className="text-sm text-gray-500">
                Created by {selectedBlobToShare.creator}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Friend
            </label>
            <div className="grid grid-cols-2 gap-4 max-h-48 overflow-y-auto">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  onClick={() => setSelectedFriend(friend.id)}
                  className={`p-3 rounded-lg retro-border flex items-center space-x-3 ${
                    selectedFriend === friend.id
                      ? 'bg-primary text-white'
                      : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{friend.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Message (Optional)
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="retro-input w-full"
              placeholder="Add a message..."
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowShareModal(false)}
              className="retro-button bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="retro-button flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Share Blob</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;