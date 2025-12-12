import React from 'react';
import { NavLink } from 'react-router-dom';
import cls from 'classnames';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen = false }) => {
  return (
    <header className="bg-white border-b border-electric-200 shadow-sm sticky top-0 z-50 font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onMenuToggle}
              aria-expanded={isMenuOpen}
              className="p-2 rounded-lg text-electric-600 hover:text-electric-700 hover:bg-electric-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 focus-visible:ring-offset-2"
            >
              <span className="sr-only">{isMenuOpen ? 'Close sidebar' : 'Open sidebar'}</span>
              {isMenuOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            <NavLink to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-electric-500 to-electric-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-electric-700 font-display whitespace-nowrap">React Chrono</h1>
                <p className="text-xs text-electric-600 whitespace-nowrap">Modern Timeline Component</p>
              </div>
            </NavLink>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-2xl">
            <NavLink 
              to="/" 
              className={({ isActive }) => cls(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                isActive 
                  ? 'bg-electric-100 text-electric-700' 
                  : 'text-electric-600 hover:text-electric-700 hover:bg-electric-50'
              )}
            >
              Overview
            </NavLink>
            <NavLink 
              to="/vertical-basic" 
              className={({ isActive }) => cls(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                isActive 
                  ? 'bg-electric-100 text-electric-700' 
                  : 'text-electric-600 hover:text-electric-700 hover:bg-electric-50'
              )}
            >
              Examples
            </NavLink>
            <NavLink 
              to="/theme-showcase" 
              className={({ isActive }) => cls(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                isActive 
                  ? 'bg-electric-100 text-electric-700' 
                  : 'text-electric-600 hover:text-electric-700 hover:bg-electric-50'
              )}
            >
              Themes
            </NavLink>
            <NavLink 
              to="/vertical-comprehensive" 
              className={({ isActive }) => cls(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
                isActive 
                  ? 'bg-electric-100 text-electric-700' 
                  : 'text-electric-600 hover:text-electric-700 hover:bg-electric-50'
              )}
            >
              Showcase
            </NavLink>
          </nav>

          <div className="flex items-center space-x-2 shrink-0">
            <a
              href="https://github.com/prabhuignoto/react-chrono"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg bg-electric-600 text-white hover:bg-electric-700 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline whitespace-nowrap text-white">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;