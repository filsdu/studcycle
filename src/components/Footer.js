import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">StudCycle</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The next-generation student marketplace powered by AR, AI, and blockchain.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Browse Listings</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Start Selling</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Guides</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                <i className="fab fa-tiktok text-xl"></i>
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">
                <i className="fab fa-discord text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2023 StudCycle. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Privacy</a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;