import React from 'react';
import { Home, RefreshCw } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 text-center max-w-md w-full">
        <div className="text-9xl font-bold text-blue-500 mb-6">
          404
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have taken an unexpected detour. 
          Don't worry, we'll help you find your way back.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/" 
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <Home className="mr-2" size={20} />
            Home
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            <RefreshCw className="mr-2" size={20} />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;