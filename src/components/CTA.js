import React from 'react';
import { Link } from 'react-router-dom';

const CTA = ({ user }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to revolutionize campus commerce?</h2>
        <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Join 50,000+ students across 120 campuses trading smarter
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to={user ? "/create-listing" : "#"}
            onClick={!user ? (e) => { e.preventDefault(); alert('Please sign in first'); } : undefined}
            className="px-8 py-4 bg-white text-primary-600 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-rocket mr-2"></i> Launch Your First Listing
          </Link>
          <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all">
            <i className="fas fa-play-circle mr-2"></i> Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;