import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import NavBarLogo from '../assets/Navbarlogo.png'

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobilePeopleOpen, setIsMobilePeopleOpen] = useState<boolean>(false);
  const location = useLocation();

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const toggleMobilePeople = (): void => {
    setIsMobilePeopleOpen((prev) => !prev);
  };

  const isPeopleActive = location.pathname === '/people' || 
                        location.pathname === '/faculty' || 
                        location.pathname === '/staff' || 
                        location.pathname === '/students';

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200/50 h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 z-50">
      <div className="flex items-center space-x-2">
        <img
          src={NavBarLogo}
          alt="AI Lab Logo"
          className="h-30 w-35 object-contain"
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
            location.pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <Link to="/about">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/about' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            About
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <li className="relative group">
          <div className={`font-medium transition-colors duration-200 ${
            isPeopleActive ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            People
          </div>
          <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
            isPeopleActive ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></span>
          
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <Link
              to="/faculty"
              className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
            >
              Faculty
              <svg className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/staff"
              className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
            >
              Staff
              <svg className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/students"
              className="flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors duration-200"
            >
              Students
              <svg className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </li>
        <Link to="/resources">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/resources' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            Resources
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/resources' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <Link to="/initiatives">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/initiatives' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            Initiatives
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/initiatives' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <Link to="/affiliates">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/affiliates' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            Affiliates
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/affiliates' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
        <Link to="/contact">
          <li className={`font-medium transition-colors duration-200 relative group ${
            location.pathname === '/contact' ? 'text-red-600' : 'text-gray-700 hover:text-red-500'
          }`}>
            Contact
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all duration-300 ${
              location.pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
            }`}></span>
          </li>
        </Link>
      </ul>

      <div className={`fixed top-20 right-0 w-64 min-h-screen bg-white/90 backdrop-blur-2xl flex flex-col items-start justify-start gap-6 pt-8 px-6 pb-8 md:hidden transition-all duration-500 ease-in-out shadow-2xl overflow-y-auto z-40 ${
        isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
          <Link to="/" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">Home</div></Link>
          <Link to="/about" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">About</div></Link>
          <div className="w-full">
            <button 
              onClick={toggleMobilePeople}
              className="text-lg font-medium text-gray-700 flex items-center justify-between w-full text-left"
            >
              People
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  isMobilePeopleOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMobilePeopleOpen && (
              <div className="ml-4 space-y-4">
                <Link to="/faculty" onClick={toggleMenu}><div className="hover:text-red-600 text-base font-medium py-1">Faculty</div></Link>
                <Link to="/staff" onClick={toggleMenu}><div className="hover:text-red-600 text-base font-medium py-1">Staff</div></Link>
                <Link to="/students" onClick={toggleMenu}><div className="hover:text-red-600 text-base font-medium py-1">Students</div></Link>
              </div>
            )}
          </div>
          <Link to="/resources" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">Resources</div></Link>
          <Link to="/initiatives" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">Initiatives</div></Link>
          <Link to="/affiliates" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">Affiliates</div></Link>
          <Link to="/contact" onClick={toggleMenu}><div className="hover:text-red-600 text-lg font-medium">Contact</div></Link>
        </div>
    </div>
  );
};

export default NavBar;