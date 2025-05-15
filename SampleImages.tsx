import React from 'react';

const SampleImages: React.FC = () => {
  const samples = [
    {
      before: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      after: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      title: "Professional Headshot"
    },
    {
      before: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      after: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      title: "Office Setting"
    },
    {
      before: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
      after: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
      title: "Casual Professional"
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {samples.map((sample, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-2">{sample.title}</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Before</p>
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img src={sample.before} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">After</p>
                  <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                    <img src={sample.after} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleImages;