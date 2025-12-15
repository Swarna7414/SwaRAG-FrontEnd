import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import NavBarLogo from '../assets/Navbarlogo.png'

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-50 backdrop-blur-md border-b border-gray-200/50 h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-50">
      <div className="flex items-center space-x-2">
        <img
          src={NavBarLogo}
          alt="AI Lab Logo"
          className="h-36 w-56 object-contain"
        />
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-3xl text-gray-700 focus:outline-none">
          {isOpen ? (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <ul className="hidden md:flex flex-row justify-between items-center gap-8 transition duration-300 ease-in-out text-lg">
        <Link to="/">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
          }`}>
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
              location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <Link to="/about">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/about' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
          }`}>
            About
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
              location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <a href="https://SaiSankarSwarna-SwaRAG.hf.space/db-console">
          <li className="font-medium transition-colors duration-200 relative group text-gray-700 hover:text-blue-500 cursor-pointer">
            DataBase
            <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 w-0 group-hover:w-full"></span>
          </li>
        </a>
      </ul>

      <div className={`fixed top-20 right-0 w-64 min-h-screen bg-gray-100 backdrop-blur-2xl flex flex-col items-start justify-start gap-6 pt-8 px-6 pb-8 md:hidden transition-all duration-500 ease-in-out shadow-2xl overflow-y-auto z-40 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
          <Link to="/" onClick={toggleMenu}><div className="hover:text-blue-600 text-lg font-medium">Home</div></Link>
          <Link to="/about" onClick={toggleMenu}><div className="hover:text-blue-600 text-lg font-medium">About</div></Link>
          <a href="https://SaiSankarSwarna-SwaRAG.hf.space/db-console" onClick={toggleMenu}><div className="hover:text-blue-600 text-lg font-medium">DataBase</div></a>
        </div>
    </div>
  );
};

export default NavBar;