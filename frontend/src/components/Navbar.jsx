import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Get active link based on current path
  const getActiveLink = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('bookmark')) return 'bookmark';
    if (path.includes('jobsearch')) return 'jobsearch';
    if (path.includes('tools')) return 'tools';
    if (path.includes('profile')) return 'profile';
    return 'dashboard'; // default
  };

  const activeLink = getActiveLink();

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg border-b border-gray-200 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-white/20 hover:ring-indigo-300 transition-all duration-300">
              <img src={logo} alt="logo" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to='/Dashboard'>
              <button
                // onClick={handleLinkClick}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 transform
                  ${activeLink === 'dashboard' 
                    ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105' 
                    : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                  }
                `}
              >
                Dashboard
              </button>
            </Link>
            <Link to='/Bookmark'>
              <button
                // onClick={handleLinkClick}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 transform
                  ${activeLink === 'bookmark' 
                    ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105' 
                    : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                  }
                `}
              >
                Bookmark
              </button>
            </Link>
            <Link to="/JobSearch">
              <button
                // onClick={handleLinkClick}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 transform
                  ${activeLink === 'jobsearch' 
                    ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105' 
                    : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                  }
                `}
              >
                Job Search
              </button>
            </Link>
            <button
              // onClick={handleLinkClick}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1 transform
                ${activeLink === 'tools' 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105' 
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                }
              `}
            >
              Tools
            </button>
            <Link to="/Profile">
            <button
              // onClick={handleLinkClick}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1 transform
                ${activeLink === 'profile' 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105' 
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                }
              `}
            >
              Profile
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                p-2.5 rounded-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-800
                ${isMenuOpen ? 'bg-blue-100 text-indigo-800' : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'}
              `}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`
        md:hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-lg border-t border-gray-200
        ${isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
      `}>
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
          <Link to='/Dashboard'>
            <button
              onClick={handleLinkClick}
              className={`
                block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
                ${activeLink === 'dashboard' 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg' 
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
                }
              `}
            >
              Dashboard
            </button>
          </Link>
          <Link to='/Bookmark'>
            <button
              onClick={handleLinkClick}
              className={`
                block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
                ${activeLink === 'bookmark' 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg' 
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
                }
              `}
            >
              Bookmark
            </button>
          </Link>
          <Link to="/JobSearch">
            <button
              onClick={handleLinkClick}
              className={`
                block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
                ${activeLink === 'jobsearch' 
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg' 
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
                }
              `}
            >
              Job Search
            </button>
          </Link>
          <button
            onClick={handleLinkClick}
            className={`
              block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
              ${activeLink === 'tools' 
                ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
              }
            `}
          >
            Tools
          </button>
          <Link to="/Profile">
          <button
            onClick={handleLinkClick}
            className={`
              block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
              ${activeLink === 'profile' 
                ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg' 
                : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
              }
            `}
          >
            Profile
          </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;