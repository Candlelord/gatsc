import React, { useState } from 'react';
import { useStore } from '../../store';
import { X, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileModal = () => {
  const {
    showProfileModal,
    setShowProfileModal,
    userProfile,
    setUserProfile
  } = useStore();

  const [name, setName] = useState(userProfile.name);
  const [status, setStatus] = useState(userProfile.status || '');
  const [avatar, setAvatar] = useState(userProfile.avatar);

  if (!showProfileModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name,
      status,
      avatar
    });
    setShowProfileModal(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="retro-menu">
      <div className="retro-menu-content max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button
            onClick={() => setShowProfileModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative group">
              <img
                src={avatar}
                alt={name}
                className="w-32 h-32 rounded-full retro-border"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white retro-border"
                onClick={() => {
                  // In a real app, this would open a file picker
                  const avatars = [
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                    'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop'
                  ];
                  const newAvatar = avatars[Math.floor(Math.random() * avatars.length)];
                  setAvatar(newAvatar);
                  toast.success('Avatar updated!');
                }}
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="retro-input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Status
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="retro-input w-full"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowProfileModal(false)}
              className="retro-button bg-gray-100"
            >
              Cancel
            </button>
            <button type="submit" className="retro-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;