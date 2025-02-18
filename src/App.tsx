import React from 'react';
import { useStore } from './store';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ProfileModal from './components/modals/ProfileModal';
import StoryModal from './components/modals/StoryModal';
import ShareModal from './components/modals/ShareModal';
import { Toaster } from 'react-hot-toast';

function App() {
  const darkMode = useStore((state) => state.darkMode);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto p-4">
        <div className="flex gap-4 h-[calc(100vh-2rem)]">
          <Sidebar />
          <MainContent />
        </div>
      </div>
      <ProfileModal />
      <StoryModal />
      <ShareModal />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;