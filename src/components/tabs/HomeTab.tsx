import React from 'react';
import { useStore } from '../../store';
import { 
  Sparkles, PlusCircle, Users, MessageSquare, 
  Image, UserCircle, Moon, Sun, Camera
} from 'lucide-react';
import { format } from 'date-fns';

const HomeTab = () => {
  const {
    darkMode,
    toggleDarkMode,
    setActiveTab,
    userProfile,
    setShowProfileModal,
    stories,
    viewStory,
    friends
  } = useStore();

  const quickLinks = [
    {
      icon: PlusCircle,
      title: '🎨 Create Blob',
      description: 'Design your next masterpiece',
      tab: 'create',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: Users,
      title: '👥 Add Friends',
      description: 'Grow your blob community',
      tab: 'friends',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Image,
      title: '🎁 My Blobs',
      description: 'View your collection',
      tab: 'blobs',
      gradient: 'from-yellow-500 to-red-500'
    },
    {
      icon: MessageSquare,
      title: '💬 Chat',
      description: 'Connect with friends',
      tab: 'chat',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Banner */}
      <div className="relative h-64 rounded-xl overflow-hidden retro-border group">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&h=400&fit=crop)',
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 flex items-end space-x-4">
          <button 
            onClick={() => setShowProfileModal(true)}
            className="relative group"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-24 h-24 rounded-full retro-border hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute bottom-0 right-0 p-1 bg-primary rounded-full retro-border">
              <Camera className="w-4 h-4 text-white" />
            </div>
          </button>
          
          <div className="text-white">
            <h1 className="text-4xl font-bold">{userProfile.name}</h1>
            <p className="text-gray-300">{userProfile.status || 'Ready to share some blobs!'}</p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur-md rounded-lg hover:bg-white/20 transition-colors"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Stories Section */}
      {stories.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Stories</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {stories.map((story) => (
              <button
                key={story.id}
                onClick={() => viewStory(story.id)}
                className="flex-shrink-0 group"
              >
                <div className="w-20 h-20 rounded-full retro-border overflow-hidden relative">
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 border-4 rounded-full ${
                    story.viewed ? 'border-gray-400' : 'border-primary animate-pulse'
                  }`} />
                </div>
                <p className="mt-2 text-sm text-center truncate w-20">
                  {story.user.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickLinks.map((link) => (
          <button
            key={link.title}
            onClick={() => setActiveTab(link.tab)}
            className="group relative overflow-hidden rounded-xl retro-border"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-90 group-hover:opacity-100 transition-opacity`} />
            <div className="relative p-6 text-white">
              <link.icon className="w-12 h-12 mb-4 float animate-float" />
              <h3 className="text-2xl font-bold mb-2">{link.title}</h3>
              <p className="text-white/80">{link.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Online Friends */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Online Friends</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {friends.filter(f => f.online).map((friend) => (
            <button
              key={friend.id}
              onClick={() => setActiveTab('chat')}
              className="flex-shrink-0 text-center group"
            >
              <div className="relative">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-16 h-16 rounded-full retro-border group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full retro-border" />
              </div>
              <p className="mt-2 text-sm truncate w-16">{friend.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;