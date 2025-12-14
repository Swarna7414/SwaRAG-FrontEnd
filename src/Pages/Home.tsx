import React, { useState, useRef, useEffect } from 'react';
import { BiSolidDownArrow } from "react-icons/bi";
import { TbSearch } from "react-icons/tb";
import HomeLogo from "../assets/Navbarlogo.png"

// API Configuration
const API_BASE_URL = 'https://SaiSankarSwarna-SwaRAG.hf.space';

interface SearchAnswer {
  answer_id?: number;
  answer_body: string;
  answer_score: number;
  is_accepted: boolean;
  question_title: string;
  question_link: string;
  bm25_score?: number;
  question_score?: number;
  relevance_score?: number;
}

interface SearchResult {
  query: string;
  answers: SearchAnswer[];
  total_answers: number;
  tag: string;
  source: string;
}

interface RAGResult {
  question: string;
  rag_response: string;
  primary_source?: {
    title: string;
    link: string;
    score: number;
    relevance: number;
  };
  alternative_sources?: Array<{
    title: string;
    link: string;
    score: number;
    relevance: number;
  }>;
}

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'results' | 'rag'>('results');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [ragResults, setRagResults] = useState<RAGResult | null>(null);
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

  const handleLocalSearch = async () => {
    if (!validateQuery()) {
      return;
    }
    
    setIsSearching(true);
    setError('');
    setHasSearched(true);
    setActiveTab('results');
    setRagResults(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          tag: selectedTag || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data: SearchResult = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleOnlineSearch = async () => {
    if (!validateQuery()) {
      return;
    }
    
    setIsSearching(true);
    setError('');
    setHasSearched(true);
    setActiveTab('results');
    setRagResults(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/searchaccurate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          tag: selectedTag || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Online search failed');
      }

      const data: SearchResult = await response.json();
      setSearchResults(data);
    } catch (err) {
      setError('Failed to perform online search. Please try again.');
      console.error('Online search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRAGSearch = async () => {
    if (!validateQuery()) {
      return;
    }
    
    setIsSearching(true);
    setError('');
    setHasSearched(true);
    setActiveTab('rag');
    setSearchResults(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/ragsearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          tag: selectedTag || null,
        }),
      });

      if (!response.ok) {
        throw new Error('RAG search failed');
      }

      const data: RAGResult = await response.json();
      setRagResults(data);
    } catch (err) {
      setError('Failed to perform RAG search. Please try again.');
      console.error('RAG search error:', err);
    } finally {
      setIsSearching(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLocalSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    
    if (error) {
      setError('');
    }
  };

  return (
    <>
      <style>{`
        @keyframes colorPulse {
          0%, 100% {
            color: rgb(0, 0, 0);
          }
          50% {
            color: rgb(34, 197, 94);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .react-spinner {
          animation: spin 3s linear infinite;
        }
        .react-spinner-inner {
          animation: spinReverse 2s linear infinite;
        }
        .loading-dot {
          animation: pulse 1.4s ease-in-out infinite;
        }
        .loading-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
      `}</style>
      <div className="pt-20 min-h-screen bg-gray-50">
      <div className={`flex flex-col items-center ${hasSearched ? 'justify-start' : 'justify-center'} min-h-[calc(100vh-8rem)] px-4 ${hasSearched ? 'pt-4' : '-mt-8'}`}>
        <div className={`w-full ${hasSearched ? 'max-w-full' : 'max-w-3xl'}`}>
          
          {/* Logo - Hidden when searched */}
          {!hasSearched && (
            <div className="flex justify-center mb-8">
              <img
                src={HomeLogo}
                alt="SwaRAG Logo"
                className="h-32 w-auto object-contain"
              />
            </div>
          )}
          
          {/* Search Bar with TAG and Search Button - Horizontal when searched */}
          {hasSearched ? (
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-2 w-full">
              {/* Search Box - Top on mobile, left on desktop */}
              <div className="sm:hidden relative w-full mb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your search query"
                  disabled={isSearching}
                  className={`w-full pl-6 pr-20 py-4 text-xl border-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                    error 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  } ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  onClick={handleOnlineSearch}
                  disabled={isSearching}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 hover:opacity-80 transition-opacity duration-200 disabled:opacity-50"
                  title="Online Search"
                >
                  <TbSearch className="w-7 h-7 text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                </button>
              </div>
              <div className="hidden sm:block relative" style={{ flex: '0.88 1 0%', minWidth: 0 }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your search query"
                  disabled={isSearching}
                  className={`w-full pl-6 pr-16 py-4 text-xl border-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                    error 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  } ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  onClick={handleOnlineSearch}
                  disabled={isSearching}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 hover:opacity-80 transition-opacity duration-200 disabled:opacity-50"
                  title="Online Search"
                >
                  <TbSearch className="w-7 h-7 text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                </button>
              </div>
              
             
              <div className="flex flex-row gap-3 w-full sm:w-auto items-center justify-center">
                <div className="relative flex-1 sm:flex-none" ref={tagDropdownRef}>
                  <button
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    className="flex items-center w-full sm:w-[220px] px-4 sm:px-16 py-3 sm:py-6 border-2 border-black bg-gray-100 sm:bg-transparent sm:border-2 sm:hover:border-blue-500 text-black text-base sm:text-lg font-medium rounded-2xl sm:hover:bg-blue-50 focus:outline-none transition-all duration-200 sm:hover:shadow-md transform cursor-pointer relative"
                  >
                    <span className="absolute left-4 sm:left-5">{selectedTag || 'Tag'}</span>
                    <BiSolidDownArrow className={`absolute right-4 sm:right-5 w-4 h-4 transition-transform duration-200 ${isTagDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isTagDropdownOpen && (
                    <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-auto min-w-[200px] bg-gray-100 rounded-md shadow-lg z-50 overflow-hidden">
                      <div className="py-1">
                        {tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className={`w-full text-left px-4 py-2 text-lg sm:text-xl text-black hover:bg-blue-100 transition-colors duration-200 ${
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
                  onClick={handleLocalSearch}
                  disabled={isSearching}
                  className="flex-1 sm:flex-none px-4 sm:px-16 py-3 border-2 border-black bg-gray-100 text-black text-base sm:text-lg font-medium rounded-2xl hover:bg-transparent hover:text-black hover:border-blue-500 focus:outline-none transition-all duration-200 hover:shadow-lg transform cursor-pointer disabled:opacity-50"
                >
                  {isSearching ? 'Retrieving...' : 'Search'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative mb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your search query"
                  disabled={isSearching}
                  className={`w-full pl-6 pr-20 py-4 text-xl border-2 rounded-full focus:outline-none focus:ring-2 transition-all duration-200 shadow-sm ${
                    error 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
                  } ${isSearching ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <button
                  onClick={handleOnlineSearch}
                  disabled={isSearching}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 hover:opacity-80 transition-opacity duration-200 disabled:opacity-50"
                  title="Online Search"
                >
                  <TbSearch className="w-7 h-7 text-black hover:text-blue-500 transition-colors duration-200 cursor-pointer" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
                <div className="relative w-full sm:w-auto" ref={tagDropdownRef}>
                  <button
                    onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                    className="flex items-center justify-center w-full sm:w-[280px] px-20 py-3 sm:py-6 border-2 border-black bg-gray-100 sm:bg-transparent sm:hover:border-blue-500 text-black text-lg font-medium rounded-2xl sm:hover:bg-blue-50 focus:outline-none transition-all duration-200 sm:hover:shadow-md transform cursor-pointer relative h-[48px] sm:h-auto"
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
                  onClick={handleLocalSearch}
                  disabled={isSearching}
                  className="w-full sm:w-auto px-20 py-3 border-2 border-black bg-gray-100 text-black text-lg font-medium rounded-2xl hover:bg-transparent hover:text-black hover:border-blue-500 focus:outline-none transition-all duration-200 hover:shadow-lg transform cursor-pointer h-[48px] sm:h-auto disabled:opacity-50"
                >
                  {isSearching ? 'Retiring...' : 'Search'}
                </button>
              </div>
            </>
          )}
          
          {error && (
            <div className="mb-4 text-center">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Tab Section - Only show after search */}
          {hasSearched && (
            <div className="w-full mt-6">
              <div className="flex items-center justify-center pb-2 gap-96">
                <button
                  onClick={() => setActiveTab('results')}
                  className={`text-lg font-medium px-4 py-2 transition-colors duration-200 ${
                    activeTab === 'results'
                      ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Results
                </button>
                <button
                  onClick={() => {
                    setActiveTab('rag');
                    if (!ragResults) {
                      handleRAGSearch();
                    }
                  }}
                  className={`text-lg font-medium px-4 py-2 transition-colors duration-200 ${
                    activeTab === 'rag'
                      ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  RAG
                </button>
              </div>
              
              {/* Tab Content Area */}
              <div className="mt-4 min-h-[400px]">
                {isSearching && (
                  <div className="text-center py-20">
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-gray-600 text-lg font-medium">Searching</p>
                      <div className="flex gap-1.5">
                        <span className="loading-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="loading-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="loading-dot w-2 h-2 bg-blue-500 rounded-full"></span>
                      </div>
                    </div>
                  </div>
                )}
                
                {!isSearching && activeTab === 'results' && (
                  <div>
                    {searchResults ? (
                      <div>
                        <div className="space-y-4">
                          {searchResults.answers.length > 0 ? (
                            searchResults.answers.map((answer, index) => (
                              <div key={answer.answer_id || index} className="rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                  <a 
                                    href={answer.question_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    {answer.question_title}
                                  </a>
                                </h3>
                                <div className="prose max-w-none mt-3">
                                  <p className="text-gray-700 whitespace-pre-wrap">{answer.answer_body}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                  <span className="text-black">Score: {answer.answer_score}</span>
                                  {answer.is_accepted && answer.answer_score !== 0 && (
                                    <span 
                                      className="font-normal" 
                                      style={{ 
                                        animation: 'colorPulse 2s ease-in-out infinite'
                                      }}
                                    >
                                      Accepted by the User
                                    </span>
                                  )}
                                  {answer.bm25_score && (
                                    <span className="font-bold text-black">BM25: {answer.bm25_score.toFixed(2)}</span>
                                  )}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                              <p className="text-gray-600">No results found. Try a different query.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-20">
                        <p>Click Search or use the lens icon to search</p>
                      </div>
                    )}
                  </div>
                )}
                
                {!isSearching && activeTab === 'rag' && (
                  <div>
                    {ragResults ? (
                      <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{ragResults.question}</h3>
                        <div className="prose max-w-none">
                          <div 
                            className="text-gray-700 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: ragResults.rag_response.replace(/\n/g, '<br />') }}
                          />
                        </div>
                        {ragResults.primary_source && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Primary Source:</p>
                            <a 
                              href={ragResults.primary_source.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {ragResults.primary_source.title}
                            </a>
                            <span className="ml-2 text-sm text-gray-500">
                              (Score: {ragResults.primary_source.score}, Relevance: {ragResults.primary_source.relevance.toFixed(2)})
                            </span>
                          </div>
                        )}
                        {ragResults.alternative_sources && ragResults.alternative_sources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Alternative Sources:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {ragResults.alternative_sources.map((source, index) => (
                                <li key={index}>
                                  <a 
                                    href={source.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                    {source.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-20">
                        <p>Click on RAG tab to generate AI-powered answer</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;