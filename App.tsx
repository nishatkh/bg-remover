import React from 'react';
import { Camera } from 'lucide-react';
import ImageEditor from './components/ImageEditor';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              LinkedIn Photo Background Changer
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upload your photo and get a professional LinkedIn profile picture with a clean, 
              customizable background in seconds.
            </p>
          </div>
          
          <ImageEditor />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;