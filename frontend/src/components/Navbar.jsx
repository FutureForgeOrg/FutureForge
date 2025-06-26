import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const navigate = useNavigate();

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

  const handleToolsClick = (tool) => {
    setShowToolsDropdown(false);
    navigate(`/tools/${tool}`);
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
            
            {/* Tools Dropdown Container */}
            <div className="relative">
              <button
                onClick={() => setShowToolsDropdown(prev => !prev)}
                className={`
                  px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 transform flex items-center gap-1
                  ${activeLink === 'tools'
                    ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105'
                    : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                  }
                `}
              >
                Tools
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${showToolsDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Improved Dropdown */}
              <div className={`
                absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-lg 
                border border-gray-200 shadow-xl rounded-xl z-[60]
                transition-all duration-300 transform origin-top
                ${showToolsDropdown 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }
              `}>
                <div className="py-2">
                  <button
                    onClick={() => handleToolsClick('Resume')}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 
                               hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 
                               hover:text-indigo-800 transition-all duration-200
                               flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Resume Builder
                  </button>
                  <button
                    onClick={() => handleToolsClick('Portfolio')}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 
                               hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 
                               hover:text-indigo-800 transition-all duration-200
                               flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Portfolio Builder
                  </button>
                  <button
                    onClick={() => handleToolsClick('Reviews')}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 
                               hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 
                               hover:text-indigo-800 transition-all duration-200
                               flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Reviews
                  </button>
                </div>
              </div>
            </div>

            <Link to="/Profile">
              <button
                className={`
                px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1 transform flex items-center gap-2
                ${activeLink === 'profile'
                    ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg scale-105'
                    : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800 hover:scale-105'
                  }
              `}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
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
        ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
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
          
          {/* Mobile Tools Section */}
          <div className="space-y-1">
            <button
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className={`
                flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
                ${activeLink === 'tools'
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg'
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
                }
              `}
            >
              Tools
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showToolsDropdown ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Mobile Tools Dropdown */}
            <div className={`
              pl-4 space-y-1 transition-all duration-300 overflow-hidden
              ${showToolsDropdown ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <button
                onClick={() => { handleLinkClick(); navigate('/tools/Resume'); }}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-indigo-800 transition-all duration-200"
              >
                📄 Resume Builder
              </button>
              <button
                onClick={() => { handleLinkClick(); navigate('/tools/Portfolio'); }}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-indigo-800 transition-all duration-200"
              >
                💼 Portfolio Builder
              </button>
              <button
                onClick={() => { handleLinkClick(); navigate('/tools/Reviews'); }}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-indigo-800 transition-all duration-200"
              >
                Reviews
              </button>
            </div>
          </div>

          <Link to="/Profile">
            <button
              onClick={handleLinkClick}
              className={`
              block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
              flex items-center gap-2
              ${activeLink === 'profile'
                  ? 'bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-lg'
                  : 'text-gray-800 hover:bg-blue-100 hover:text-indigo-800'
                }
            `}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;