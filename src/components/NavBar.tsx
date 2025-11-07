import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import NavBarLogo from '../assets/Navbarlogo.png'

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobilePeopleOpen, setIsMobilePeopleOpen] = useState<boolean>(false);


  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const toggleMobilePeople = (): void => {
    setIsMobilePeopleOpen((prev) => !prev);
  };


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