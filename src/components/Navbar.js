import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, darkMode, toggleDarkMode, handleLogin, handleLogout, isAdmin }) => {
  return (
    <nav className="bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <i className="fas fa-exchange-alt text-primary-600 text-2xl mr-2"></i>
              <span className="text-xl font-bold text-gray-900 dark:text-white font-display">StudCycle</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/listings" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Browse Listings
            </Link>
            {user && (
              <Link to="/create-listing" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Sell an Item
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Admin
              </Link>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700"
            >
              <i className={darkMode ? "fas fa-sun text-yellow-300" : "fas fa-moon text-gray-600"}></i>
            </button>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                      {user.displayName.charAt(0)}
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
                    {user.displayName}
                  </span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
              >
                <i className="fas fa-sign-in-alt mr-2"></i> Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;