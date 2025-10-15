import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⧖</span>
              </div>
              <h3 className="text-xl font-bold">React Chrono</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              A modern, accessible, and customizable timeline component for React applications. 
              Create beautiful timelines with ease.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/prabhuignoto/react-chrono" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.npmjs.com/package/react-chrono" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">NPM</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 7v10h6.5v1.5h5V17H24V7H0zm6.5 7.5h-2v-5h2v5zm6.5 0h-2v-3.5h-2v3.5h-2v-5h6v5zm8.5 0h-2v-3.5h-2v3.5h-2v-3.5h-2v3.5h-2v-5h10v5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/prabhuignoto/react-chrono#getting-started" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white transition-colors">
                  Getting Started
                </a>
              </li>
              <li>
                <a href="https://github.com/prabhuignoto/react-chrono#props" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="https://github.com/prabhuignoto/react-chrono/blob/master/README.md" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://github.com/prabhuignoto/react-chrono/blob/master/CONTRIBUTING.md" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-gray-300 hover:text-white transition-colors">
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Examples</h4>
            <ul className="space-y-2">
              <li>
                <a href="/vertical-basic" className="text-gray-300 hover:text-white transition-colors">
                  Vertical Timeline
                </a>
              </li>
              <li>
                <a href="/horizontal" className="text-gray-300 hover:text-white transition-colors">
                  Horizontal Timeline
                </a>
              </li>
              <li>
                <a href="/theme-showcase" className="text-gray-300 hover:text-white transition-colors">
                  Custom Themes
                </a>
              </li>
              <li>
                <a href="/vertical-comprehensive" className="text-gray-300 hover:text-white transition-colors">
                  Advanced Features
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 React Chrono. Built with ❤️ by{' '}
            <a 
              href="https://github.com/prabhuignoto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Prabhu Murthy
            </a>
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">MIT License</span>
            <span className="text-gray-400 text-sm">v2.9.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;