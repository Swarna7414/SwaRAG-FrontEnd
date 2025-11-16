import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateQuery = (): boolean => {
    if (!searchQuery.trim()) {
      setError('Please enter a search query');
      return false;
    }
    setError('');
    return true;
  };

  const handleSearch = () => {
    if (!validateQuery()) {
      return;
    }
    console.log('Search:', searchQuery);
    
  };

  const handleRAG = () => {
    if (!validateQuery()) {
      return;
    }
    console.log('RAG:', searchQuery);
    // RAG functionality will be implemented here
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 -mt-8">
        <div className="w-full max-w-2xl">
          

          
          <div className="relative mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your search query..."
              className={`w-full pl-6 pr-16 py-4 text-xl border-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-4 hover:opacity-80 transition-opacity duration-200"
            >
              <CiSearch className="w-8 h-8 mr-2 text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer" />
            </button>
          </div>
          {error && (
            <div className="mb-4 text-center">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-20 py-3 bg-blue-500 text-white text-lg font-medium rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform cursor-pointer"
            >
              Search
            </button>
            <button
              onClick={handleRAG}
              className="w-full sm:w-auto px-20 py-3 bg-blue-500 text-white text-lg font-medium rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform cursor-pointer"
            >
              RAG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
