// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="loader border-t-4 border-green-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
