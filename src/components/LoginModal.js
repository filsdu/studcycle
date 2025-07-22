// src/components/LoginModal.js
import React from 'react';

const LoginModal = ({ onClose, onLogin }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Student Login</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Sign in with your school email to access the student marketplace.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            onClick={onLogin}>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
              <i className="fab fa-google text-blue-600 dark:text-blue-400"></i>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">Sign in with Google</span>
          </div>
          
          <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                <i className="fas fa-envelope text-primary-600 dark:text-primary-400"></i>
              </div>
              <span className="font-medium text-gray-900 dark:text-white">School Email Login</span>
            </div>
            <input 
              type="email" 
              placeholder="yourname@university.edu" 
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
            <button className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium">
              Continue
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          By signing in, you agree to our Terms and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default LoginModal;