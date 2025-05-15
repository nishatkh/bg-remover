import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface BackgroundOptionsProps {
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
}

const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({
  selectedBackground,
  setSelectedBackground,
  customColor,
  setCustomColor
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Background Options</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* White Background */}
        <button 
          onClick={() => setSelectedBackground('white')}
          className={`relative flex flex-col items-center p-3 border rounded-md transition-all ${
            selectedBackground === 'white' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-md mb-2"></div>
          <span className="text-sm text-gray-700">White</span>
          {selectedBackground === 'white' && (
            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
          )}
        </button>
        
        {/* Light Gray Background */}
        <button 
          onClick={() => setSelectedBackground('light-gray')}
          className={`relative flex flex-col items-center p-3 border rounded-md transition-all ${
            selectedBackground === 'light-gray' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-md mb-2"></div>
          <span className="text-sm text-gray-700">Light Gray</span>
          {selectedBackground === 'light-gray' && (
            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
          )}
        </button>
        
        {/* Custom Color */}
        <button 
          onClick={() => setSelectedBackground('custom')}
          className={`relative flex flex-col items-center p-3 border rounded-md transition-all ${
            selectedBackground === 'custom' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div 
            className="w-12 h-12 border border-gray-200 rounded-md mb-2 relative"
            style={{ backgroundColor: customColor }}
          >
            {selectedBackground === 'custom' && (
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            )}
          </div>
          <span className="text-sm text-gray-700">Custom</span>
          {selectedBackground === 'custom' && (
            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
          )}
        </button>
        
        {/* Blurred Background */}
        <button 
          onClick={() => setSelectedBackground('blur')}
          className={`relative flex flex-col items-center p-3 border rounded-md transition-all ${
            selectedBackground === 'blur' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-200 rounded-md mb-2 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white opacity-70"></div>
          </div>
          <span className="text-sm text-gray-700">Office Blur</span>
          {selectedBackground === 'blur' && (
            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-blue-500" />
          )}
        </button>
      </div>
      
      {selectedBackground === 'custom' && (
        <div className="mt-3">
          <label className="text-sm text-gray-600 block mb-1">Select custom color:</label>
          <div className="flex items-center">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded border border-gray-300 mr-2"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              placeholder="#FFFFFF"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundOptions;