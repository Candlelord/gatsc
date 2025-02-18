import { create } from 'zustand';
import { Blob, Friend, Chat, Message, UserProfile, Story } from './types';
import { format } from 'date-fns';

// Generate 100 random profiles
const generateProfiles = () => {
  const profiles: Friend[] = [];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  // Add Walrus profile first
  profiles.push({
    id: 'walrus',
    name: 'Walrus',
    avatar: 'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?w=400&h=400&fit=crop',
    online: true,
    isWalrus: true,
    lastMessage: 'Hello! I\'m Walrus, your friendly blob assistant!'
  });
  
  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const id = Math.floor(Math.random() * 100);
    
    profiles.push({
      id: `user${i}`,
      name,
      avatar: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`,
      online: Math.random() > 0.5,
      lastMessage: Math.random() > 0.5 ? 'Check out this cool blob!' : undefined,
      lastMessageTime: new Date(Date.now() - Math.random() * 86400000).toISOString()
    });
  }
  return profiles;
};

const searchableProfiles = generateProfiles();

interface AppState {
  userProfile: UserProfile;
  setUserProfile: (profile: Partial<UserProfile>) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  blobs: Blob[];
  addBlob: (blob: Blob) => void;
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, message: Message) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCreatingBlob: boolean;
  setIsCreatingBlob: (isCreating: boolean) => void;
  selectedBlob: Blob | null;
  setSelectedBlob: (blob: Blob | null) => void;
  searchableProfiles: Friend[];
  searchProfiles: (query: string) => Friend[];
  blobCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  stories: Story[];
  addStory: (story: Story) => void;
  viewStory: (storyId: string) => void;
  showShareModal: boolean;
  setShowShareModal: (show: boolean) => void;
  selectedBlobToShare: Blob | null;
  setSelectedBlobToShare: (blob: Blob | null) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  activeStory: Story | null;
  setActiveStory: (story: Story | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  userProfile: {
    id: 'user',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
  },
  setUserProfile: (profile) => set((state) => ({
    userProfile: { ...state.userProfile, ...profile }
  })),
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  blobs: [],
  addBlob: (blob) => set((state) => {
    const newBlob = {
      ...blob,
      rarity: Math.floor(Math.random() * 100) + 1
    };
    
    // Add to stories
    const story: Story = {
      id: crypto.randomUUID(),
      user: get().userProfile,
      blob: newBlob,
      createdAt: new Date().toISOString(),
      viewed: false
    };
    
    return {
      blobs: [...state.blobs, newBlob],
      stories: [...state.stories, story]
    };
  }),
  friends: [],
  addFriend: (friend) => set((state) => {
    if (state.friends.some(f => f.id === friend.id)) {
      return state;
    }
    const newChat: Chat = {
      id: friend.id,
      friend,
      messages: []
    };
    return {
      friends: [...state.friends, friend],
      chats: [...state.chats, newChat]
    };
  }),
  chats: [],
  activeChat: null,
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  sendMessage: (chatId, message) => set((state) => {
    const updatedChats = state.chats.map((chat) => {
      if (chat.id === chatId) {
        return { ...chat, messages: [...chat.messages, message] };
      }
      return chat;
    });

    // If it's the Walrus, generate a response
    const chat = state.chats.find(c => c.id === chatId);
    if (chat?.friend.isWalrus) {
      setTimeout(() => {
        const walrusResponse: Message = {
          id: crypto.randomUUID(),
          senderId: 'walrus',
          content: 'Beep boop! I love your blob! 🦭',
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, messages: [...chat.messages, walrusResponse] }
              : chat
          )
        }));
      }, 1000);
    }

    return { chats: updatedChats };
  }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isCreatingBlob: false,
  setIsCreatingBlob: (isCreating) => set({ isCreatingBlob: isCreating }),
  selectedBlob: null,
  setSelectedBlob: (blob) => set({ selectedBlob: blob }),
  searchableProfiles,
  searchProfiles: (query: string) => {
    const profiles = get().searchableProfiles;
    if (!query) return [];
    return profiles.filter(profile => 
      profile.name.toLowerCase().includes(query.toLowerCase()) &&
      !get().friends.some(friend => friend.id === profile.id)
    );
  },
  blobCategories: ['All', 'Memories', 'Friends', 'Created', 'Favorites'],
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  stories: [],
  addStory: (story) => set((state) => ({ stories: [...state.stories, story] })),
  viewStory: (storyId) => set((state) => ({
    stories: state.stories.map(story =>
      story.id === storyId ? { ...story, viewed: true } : story
    )
  })),
  showShareModal: false,
  setShowShareModal: (show) => set({ showShareModal: show }),
  selectedBlobToShare: null,
  setSelectedBlobToShare: (blob) => set({ selectedBlobToShare: blob }),
  showProfileModal: false,
  setShowProfileModal: (show) => set({ showProfileModal: show }),
  activeStory: null,
  setActiveStory: (story) => set({ activeStory: story })
}));