import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ user, schools }) => {
  return (
    <section className="hero-pattern bg-white dark:bg-dark-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-gray-900 dark:text-white">Trade smarter with</span>
              <span className="text-gradient block">Campus Verified</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              The only student marketplace with AR previews, blockchain verification, and hyper-local delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to={user ? "/create-listing" : "#"}
                onClick={!user ? (e) => { e.preventDefault(); alert('Please sign in first'); } : undefined}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                <i className="fas fa-bolt mr-2"></i> Start Selling
              </Link>
              <Link 
                to="/listings"
                className="px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-bold hover:bg-primary-50 dark:hover:bg-dark-800 transition-all"
              >
                <i className="fas fa-search mr-2"></i> Browse Listings
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center bg-white dark:bg-dark-800 p-3 rounded-lg shadow-sm">
                <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                  <i className="fas fa-check-circle text-primary-600 dark:text-primary-400"></i>
                </div>
                <span className="text-sm font-medium dark:text-white">No platform fees</span>
              </div>
              <div className="flex items-center bg-white dark:bg-dark-800 p-3 rounded-lg shadow-sm">
                <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                  <i className="fas fa-shield-alt text-primary-600 dark:text-primary-400"></i>
                </div>
                <span className="text-sm font-medium dark:text-white">Verified students only</span>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-10 w-full h-96 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-auto">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl blur-lg opacity-50"></div>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl">
                    <div className="bg-gray-800 p-2 flex items-center">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                        <span className="w-2 h-2 rounded-full bg-gray-600"></span>
                      </div>
                      <div className="mx-auto">
                        <span className="text-xs text-white font-medium">StudCycle</span>
                      </div>
                      <div className="w-6"></div>
                    </div>
                    <div className="p-4">
                      <div className="bg-gray-100 rounded-lg overflow-hidden mb-2">
                        <img 
                          src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                          className="w-full h-32 object-cover" 
                          alt="Calculus Textbook"
                        />
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">Calculus Textbook</span>
                        <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">$45</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-gray-300 mr-2"></div>
                        <span className="text-xs text-gray-600">@harvard.edu</span>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full flex items-center">
                          <i className="fas fa-cube text-xs mr-1"></i> AR View
                        </button>
                        <button className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full">
                          <i className="fas fa-shopping-cart mr-1"></i> Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;