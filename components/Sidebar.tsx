import React from 'react';
import { Menu, Users, Image, Moon, Sun, MessageSquare, Plus, Home } from 'lucide-react';
import { useStore } from '../store';

const Sidebar = () => {
  const darkMode = useStore((state) => state.darkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const setActiveTab = useStore((state) => state.setActiveTab);
  const activeTab = useStore((state) => state.activeTab);

  const tabs = [
    { icon: Home, id: 'home', label: 'Home' },
    { icon: MessageSquare, id: 'chat', label: 'Chat' },
    { icon: Image, id: 'blobs', label: 'My Blobs' },
    { icon: Plus, id: 'create', label: 'Create Blob' },
    { icon: Users, id: 'friends', label: 'Friends' },
  ];

  return (
    <div className={`w-20 flex flex-col items-center py-6 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } retro-border`}>
      <div className="flex-1 flex flex-col gap-6">
        {tabs.map(({ icon: Icon, id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`p-3 rounded-lg transition-colors duration-200 group relative ${
              activeTab === id ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={label}
          >
            <Icon className="w-6 h-6" />
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {label}
            </span>
          </button>
        ))}
      </div>
      <button 
        onClick={toggleDarkMode}
        className="p-3 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 mt-auto"
        title={darkMode ? 'Light Mode' : 'Dark Mode'}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </button>
    </div>
  );
}

export default Sidebar;