// Layout.jsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col space-y-4">
        <h2 className="text-xl font-bold text-blue-400">WeatherX</h2>
        <nav className="flex flex-col space-y-2">
          <a href="#" className="hover:text-blue-300">Dashboard</a>
          <a href="#" className="hover:text-blue-300">Forecast</a>
          <a href="#" className="hover:text-blue-300">AQI</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-800 p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Current Weather</h1>
          <span className="text-sm text-blue-300">Ghaziabad, India</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
