import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window === 'undefined'
      ? true
      : window.matchMedia('(min-width: 1024px)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleChange = (event: MediaQueryListEvent) => {
      setSidebarOpen(event.matches);
    };

    if (!mediaQuery.matches) {
      setSidebarOpen(false);
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      <Header
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        isMenuOpen={sidebarOpen}
      />

      <div className="flex-1 flex relative overflow-hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" aria-hidden="true" />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-80 bg-white shadow-xl transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main
          className={`flex-1 flex flex-col min-w-0 w-full overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-80' : 'lg:ml-0'
          } ${isHomePage ? 'w-full' : ''}`}
        >
          {isHomePage && <HeroSection />}

          <div className={`flex-1 ${isHomePage ? 'px-0' : 'p-4 sm:p-6 lg:p-8'}`}>
            <Outlet />
          </div>
        <Footer />
        </main>
      </div>
    </div>
  );
};

export { Layout };
