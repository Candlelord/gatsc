import React from 'react';
import { useStore } from '../store';
import HomeTab from './tabs/HomeTab';
import ChatTab from './tabs/ChatTab';
import BlobsTab from './tabs/BlobsTab';
import CreateBlobTab from './tabs/CreateBlobTab';
import FriendsTab from './tabs/FriendsTab';

const MainContent = () => {
  const darkMode = useStore((state) => state.darkMode);
  const activeTab = useStore((state) => state.activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'chat':
        return <ChatTab />;
      case 'blobs':
        return <BlobsTab />;
      case 'create':
        return <CreateBlobTab />;
      case 'friends':
        return <FriendsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div className={`flex-1 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-white'
    } rounded-lg shadow-lg p-6 overflow-y-auto`}>
      {renderTabContent()}
    </div>
  );
};

export default MainContent;