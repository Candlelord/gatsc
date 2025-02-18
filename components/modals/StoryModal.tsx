import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const StoryModal = () => {
  const {
    stories,
    viewStory,
    activeStory,
    setActiveStory
  } = useStore();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!activeStory) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Move to next story or close
          const currentIndex = stories.findIndex(s => s.id === activeStory.id);
          if (currentIndex < stories.length - 1) {
            setActiveStory(stories[currentIndex + 1]);
          } else {
            setActiveStory(null);
          }
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [activeStory, stories, setActiveStory]);

  if (!activeStory) return null;

  const handlePrevStory = () => {
    const currentIndex = stories.findIndex(s => s.id === activeStory.id);
    if (currentIndex > 0) {
      setActiveStory(stories[currentIndex - 1]);
      setProgress(0);
    }
  };

  const handleNextStory = () => {
    const currentIndex = stories.findIndex(s => s.id === activeStory.id);
    if (currentIndex < stories.length - 1) {
      setActiveStory(stories[currentIndex + 1]);
      setProgress(0);
    } else {
      setActiveStory(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-2xl aspect-[9/16]">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
          <div
            className="h-full bg-primary transition-all duration-50 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Story Content */}
        <div className="absolute inset-0 m-4">
          <img
            src={activeStory.blob.image}
            alt={activeStory.blob.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* User Info */}
        <div className="absolute top-4 left-4 right-4 flex items-center">
          <img
            src={activeStory.user.avatar}
            alt={activeStory.user.name}
            className="w-10 h-10 rounded-full retro-border"
          />
          <div className="ml-3">
            <p className="text-white font-bold">{activeStory.user.name}</p>
            <p className="text-gray-300 text-sm">
              {new Date(activeStory.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setActiveStory(null)}
          className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation */}
        <button
          onClick={handlePrevStory}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={handleNextStory}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:bg-white/10 rounded-full"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default StoryModal;