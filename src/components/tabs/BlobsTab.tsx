import React from 'react';
import { useStore } from '../../store';
import { Download, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const BlobsTab = () => {
  const darkMode = useStore((state) => state.darkMode);
  const blobs = useStore((state) => state.blobs);
  const categories = useStore((state) => state.blobCategories);
  const selectedCategory = useStore((state) => state.selectedCategory);
  const setSelectedCategory = useStore((state) => state.setSelectedCategory);

  const handleDownload = (blob: any) => {
    // Create a temporary link element
    const link = document.createElement('a');
    
    // Create a canvas to combine the image and card design
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size to match the card dimensions
      canvas.width = 400;
      canvas.height = 600;
      
      if (ctx) {
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#4a90e2');
        gradient.addColorStop(1, '#9b51e0');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw image
        ctx.drawImage(img, 20, 20, canvas.width - 40, 300);
        
        // Add card details
        ctx.fillStyle = 'white';
        ctx.font = '24px VT323';
        ctx.fillText(blob.name, 30, 360);
        ctx.font = '18px VT323';
        ctx.fillText(`Created by: ${blob.creator}`, 30, 390);
        if (blob.memory) {
          ctx.fillText(blob.memory, 30, 420);
        }
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            link.href = URL.createObjectURL(blob);
            link.download = 'blob-card.png';
            link.click();
            toast.success('Blob downloaded!');
          }
        });
      }
    };
    
    img.src = blob.image;
  };

  const handleSend = (blobId: string) => {
    toast.success('Select a friend to send the blob to!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Blobs</h2>
        <div className="flex gap-4">
          <select 
            className="retro-input"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {blobs.map((blob) => (
          <div
            key={blob.id}
            className="blob-card group"
            style={{ 
              background: blob.gradient || 'linear-gradient(135deg, #4a90e2, #9b51e0)'
            }}
          >
            <img
              src={blob.image}
              alt={blob.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-3 text-white">
              <h3 className="font-bold truncate">{blob.name}</h3>
              <p className="text-sm opacity-90 truncate">
                Created by: {blob.creator}
              </p>
              {blob.memory && (
                <p className="text-sm opacity-90 mt-1 truncate">
                  {blob.memory}
                </p>
              )}
            </div>
            <div className="blob-card-overlay">
              <button
                onClick={() => handleDownload(blob)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSend(blob.id)}
                className="p-2 bg-white rounded-full hover:bg-gray-100"
                title="Send to friend"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlobsTab;