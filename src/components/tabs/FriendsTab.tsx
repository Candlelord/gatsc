import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { Search, UserPlus, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const FriendsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const darkMode = useStore((state) => state.darkMode);
  const friends = useStore((state) => state.friends);
  const addFriend = useStore((state) => state.addFriend);
  const searchProfiles = useStore((state) => state.searchProfiles);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(searchProfiles(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchProfiles]);

  const handleAddFriend = (friend: any) => {
    addFriend(friend);
    toast.success(`Added ${friend.name} as a friend!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Friends</h2>
        <div className="relative w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="retro-input w-full pl-10"
          />
          <Search className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mb-6 retro-border`}>
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className={`${
                  darkMode ? 'bg-gray-600' : 'bg-white'
                } p-4 rounded-lg retro-border flex items-center justify-between`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full retro-border"
                  />
                  <div>
                    <p className="font-bold">{user.name}</p>
                    <p className={`text-sm ${user.online ? 'text-green-500' : 'text-gray-500'}`}>
                      {user.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddFriend(user)}
                  className="retro-button p-2"
                  title="Add Friend"
                >
                  <UserPlus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Friends List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`${
              darkMode ? 'bg-gray-700' : 'bg-white'
            } p-4 rounded-lg retro-border flex items-center justify-between`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-12 h-12 rounded-full retro-border"
              />
              <div>
                <p className="font-bold">{friend.name}</p>
                <p className={`text-sm ${friend.online ? 'text-green-500' : 'text-gray-500'}`}>
                  {friend.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">
                <Check className="w-5 h-5" />
              </span>
              <span className="text-sm">Friends</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsTab;