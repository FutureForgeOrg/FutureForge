import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import futureForgeLogo from '/bg-hd.png';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveLink = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('bookmark')) return 'bookmark';
    if (path.includes('jobsearch')) return 'jobsearch';
    if (path.includes('tools')) return 'tools';
    if (path.includes('profile')) return 'profile';
    return 'dashboard';
  };

  const activeLink = getActiveLink();

  const handleLogout = () => {
    logout();              // clear auth state
    navigate('/login');    // redirect to login page
  };

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleToolsClick = (tool) => {
    setShowToolsDropdown(false);
    navigate(`/tools/${tool}`);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0a1fcc] backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-2">

          {/* Logo */}
          <div className="flex gap-2 items-center cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-12 h-12 p-1 md:p-0 rounded-full cursor-pointer">
              <img
                src={futureForgeLogo}
                loading="lazy"
                alt="logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="h-12 flex items-center">
              <h4 className="text-heading text-xl md:text-2xl leading-none">FutureForge</h4>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { to: '/Dashboard', label: 'Dashboard' },
              { to: '/Bookmark', label: 'Bookmark' },
              { to: '/JobSearch', label: 'Job Search' },
              { to: '/Profile', label: 'Profile' }
            ].map(({ to, label }) => (
              <Link key={label} to={to}>
                <button
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                    ${activeLink === label.toLowerCase().replace(' ', '')
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                      : 'text-white/80 hover:bg-white/10 hover:text-indigo-300'}
                  `}
                >
                  {label}
                </button>
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowToolsDropdown(!showToolsDropdown)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-1
                  ${activeLink === 'tools'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105'
                    : 'text-white/80 hover:bg-white/10 hover:text-indigo-300'}
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

              {/* Tools Dropdown Menu */}
              <div className={`
                absolute top-full left-0 mt-2 w-52 bg-[#181022]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg z-[60]
                transition-all duration-300 origin-top
                ${showToolsDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
              `}>
                {['Resume', 'Portfolio', 'Interview', 'Quiz'].map(tool => (
                  <button
                    key={tool}
                    onClick={() => handleToolsClick(tool)}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/10 hover:text-indigo-300 transition-all duration-200"
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            {/* Logout Button (Desktop) */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl transition-all duration-300 text-white hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden bg-[#0e0a1fcc] backdrop-blur-md transition-all duration-300 border-t border-white/10
        ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
      `}>
        <div className="px-4 py-4 space-y-2">
          {[
            { to: '/Dashboard', label: 'Dashboard' },
            { to: '/Bookmark', label: 'Bookmark' },
            { to: '/JobSearch', label: 'Job Search' },
            { to: '/Profile', label: 'Profile' }
          ].map(({ to, label }) => (
            <Link key={label} to={to}>
              <button
                onClick={handleLinkClick}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300
                  ${activeLink === label.toLowerCase().replace(' ', '')
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                    : 'text-white/80 hover:bg-white/10 hover:text-indigo-300'}
                `}
              >
                {label}
              </button>
            </Link>
          ))}

          {/* Mobile Tools Dropdown */}
          <div className="pt-2">
            <button
              onClick={() => setShowToolsDropdown(!showToolsDropdown)}
              className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-white/80 hover:bg-white/10 hover:text-indigo-300 transition-all duration-300 flex justify-between items-center"
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

            {showToolsDropdown && (
              <div className="pl-4 pt-1 space-y-1">
                {['Resume', 'Portfolio', 'Interview', 'Quiz'].map(tool => (
                  <button
                    key={tool}
                    onClick={() => { handleLinkClick(); navigate(`/tools/${tool}`); }}
                    className="block w-full text-left px-4 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-indigo-300 transition"
                  >
                    {tool} Builder
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Logout Button (Mobile) */}
          <button
            onClick={() => { handleLinkClick(); handleLogout(); }}
            className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
