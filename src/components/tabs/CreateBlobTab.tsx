import React, { useState, useRef } from 'react';
import { useStore } from '../../store';
import { Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CreateBlobTab = () => {
  const [name, setName] = useState('');
  const [memory, setMemory] = useState('');
  const [gradient, setGradient] = useState({
    color1: '#4a90e2',
    color2: '#9b51e0'
  });
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const darkMode = useStore((state) => state.darkMode);
  const addBlob = useStore((state) => state.addBlob);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !preview) {
      toast.error('Please fill in all required fields!');
      return;
    }

    const newBlob = {
      id: crypto.randomUUID(),
      name,
      image: preview,
      creator: 'You',
      createdAt: new Date().toISOString(),
      memory,
      gradient: `linear-gradient(135deg, ${gradient.color1}, ${gradient.color2})`,
    };

    addBlob(newBlob);
    toast.success('Blob created successfully!');
    
    // Reset form
    setName('');
    setMemory('');
    setGradient({ color1: '#4a90e2', color2: '#9b51e0' });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Blob</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Blob Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="retro-input w-full"
                placeholder="Enter blob name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Memory Message
              </label>
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                className="retro-input w-full h-24 resize-none"
                placeholder="Add a memory to your blob..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Card Gradient
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1">Color 1</label>
                  <input
                    type="color"
                    value={gradient.color1}
                    onChange={(e) => setGradient(prev => ({ ...prev, color1: e.target.value }))}
                    className="retro-input w-full h-10"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Color 2</label>
                  <input
                    type="color"
                    value={gradient.color2}
                    onChange={(e) => setGradient(prev => ({ ...prev, color2: e.target.value }))}
                    className="retro-input w-full h-10"
                  />
                </div>
              </div>
              <div 
                className="mt-2 h-8 rounded-lg retro-border"
                style={{ background: `linear-gradient(135deg, ${gradient.color1}, ${gradient.color2})` }}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Blob Image *
            </label>
            <div
              className={`h-64 retro-border ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              } rounded-lg relative overflow-hidden`}
            >
              {preview ? (
                <div className="relative h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-full flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-12 h-12 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload image</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="retro-button">
            Create Blob
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlobTab;