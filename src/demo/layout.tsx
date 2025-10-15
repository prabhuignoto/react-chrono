import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex relative overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          w-80 bg-white shadow-lg transform transition-transform duration-300 z-50
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:shadow-none
          fixed lg:static h-full lg:block
        `}>
          <Sidebar onItemClick={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className={`flex-1 flex flex-col min-w-0 overflow-y-auto ${isHomePage ? 'w-full' : ''}`}>
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
