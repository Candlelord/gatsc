export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  status?: string;
}

export interface Blob {
  id: string;
  name: string;
  image: string;
  creator: string;
  createdAt: string;
  memory?: string;
  gradient?: string;
  category?: string;
  rarity?: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online: boolean;
  isWalrus?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  blob?: Blob;
}

export interface Chat {
  id: string;
  friend: Friend;
  messages: Message[];
}

export interface Story {
  id: string;
  user: UserProfile;
  blob: Blob;
  createdAt: string;
  viewed: boolean;
}