import React from 'react';

const SectionLoader = () => {
  return (
    <div className="w-full py-20 flex justify-center items-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SectionLoader;
