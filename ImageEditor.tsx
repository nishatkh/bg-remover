import React, { useState, useRef, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import { Download, Crop, Image as ImageIcon, RefreshCw, AlertCircle } from 'lucide-react';
import BackgroundOptions from './BackgroundOptions';
import { removeBackground } from '../services/backgroundService';

const ImageEditor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState<string>('white');
  const [customColor, setCustomColor] = useState('#FFFFFF');
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSquareCrop, setIsSquareCrop] = useState(true);
  const [zoom, setZoom] = useState(100);

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setProcessedImage(null);
    setError(null);
    setZoom(100);
  };

  const handleProcessImage = async () => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Call the background removal service
      const result = await removeBackground(originalImage);
      setProcessedImage(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error processing image. Please try again.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage && !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'linkedin-profile-photo.png';
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (processedImage && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set background
        if (selectedBackground === 'white') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (selectedBackground === 'light-gray') {
          ctx.fillStyle = '#F3F4F6';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (selectedBackground === 'custom') {
          ctx.fillStyle = customColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (selectedBackground === 'blur') {
          // Create a blurred background effect
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = canvas.width;
          tempCanvas.height = canvas.height;
          
          if (tempCtx) {
            // Draw the original image (blurred)
            tempCtx.filter = 'blur(10px)';
            tempCtx.drawImage(img, -10, -10, canvas.width + 20, canvas.height + 20);
            
            // Draw the blurred background
            ctx.drawImage(tempCanvas, 0, 0);
          }
        }
        
        // Draw the processed image on top with proper scaling
        const scale = zoom / 100;
        const imgWidth = img.width * scale;
        const imgHeight = img.height * scale;
        const x = (canvas.width - imgWidth) / 2;
        const y = (canvas.height - imgHeight) / 2;
        
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
      };
      
      img.src = processedImage;
    }
  }, [processedImage, selectedBackground, customColor, zoom]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Original Image Preview */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Original Photo</h3>
                <div className="relative aspect-square rounded-lg border-2 border-gray-200 overflow-hidden">
                  <img 
                    src={originalImage} 
                    alt="Original" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Processed Image Preview */}
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Professional Version</h3>
                <div className="relative aspect-square rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {isProcessing ? (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-10 w-10 text-blue-500 animate-spin" />
                      <p className="mt-2 text-sm text-gray-600">Processing your image...</p>
                    </div>
                  ) : processedImage ? (
                    <canvas 
                      ref={canvasRef} 
                      width={500} 
                      height={500}
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center p-6 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-gray-600">Click "Remove Background" to see the processed image</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              
              {!processedImage && !isProcessing && (
                <button
                  onClick={handleProcessImage}
                  className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Remove Background
                </button>
              )}
              
              {processedImage && (
                <>
                  <BackgroundOptions 
                    selectedBackground={selectedBackground}
                    setSelectedBackground={setSelectedBackground}
                    customColor={customColor}
                    setCustomColor={setCustomColor}
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zoom: {zoom}%
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={zoom}
                      onChange={(e) => setZoom(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  <button
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Image
                  </button>
                </>
              )}
              
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                  setError(null);
                }}
                className="w-full py-2 text-gray-600 font-medium rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Upload Different Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageEditor;