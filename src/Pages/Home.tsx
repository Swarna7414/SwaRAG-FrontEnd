import React, { useState, useRef, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";
import { BiSolidDownArrow } from "react-icons/bi";
import HomeLogo from "../assets/Navbarlogo.png"

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState<boolean>(false);
  const tagDropdownRef = useRef<HTMLDivElement>(null);
  
  const tags = ['spring-boot', 'react', 'django', 'node.js', 'flask'];

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    setIsTagDropdownOpen(false);
  };

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


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    if (error) {
      setError('');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4 -mt-8">
        <div className="w-full max-w-3xl">
          
          <div className="flex justify-center mb-8">
            <img
              src={HomeLogo}
              alt="SwaRAG Logo"
              className="h-32 w-auto object-contain"
            />
          </div>
          
          <div className="relative mb-2">
            
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your search query"
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
              <CiSearch className="w-8 h-8 mr-2 text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
            </button>
          </div>
          {error && (
            <div className="mb-4 text-center">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <div className="relative" ref={tagDropdownRef}>
              <button
                onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                className=" flex items-center w-full sm:w-[280px] px-20 py-6 border-2 hover:border-blue-500 text-black text-lg font-medium rounded-2xl hover:bg-blue-50 focus:outline-none transition-all duration-200 hover:shadow-md transform cursor-pointer relative"
              >
                <span className="absolute left-5">{selectedTag || 'Tag'}</span>
                <BiSolidDownArrow className={`absolute right-5 w-4 h-4 transition-transform duration-200 ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isTagDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-auto min-w-[200px] bg-gray-100 rounded-md shadow-lg z-50 overflow-hidden">
                  <div className="py-1">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect(tag)}
                        className={`w-full text-left px-4 py-2 text-xl text-black hover:bg-blue-100 transition-colors duration-200 ${
                          selectedTag === tag ? 'bg-blue-400 font-medium rounded-xl' : ''
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="w-full sm:w-auto px-20 py-3 border-2 border-black bg-gray-100 text-black text-lg font-medium rounded-2xl hover:bg-transparent hover:text-black hover:border-blue-500 focus:outline-none transition-all duration-200 hover:shadow-lg transform cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;