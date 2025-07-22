// src/components/ListingCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaCube, FaShoppingCart, FaStar } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  const conditionColors = {
    'new': 'bg-green-100 text-green-800',
    'like-new': 'bg-blue-100 text-blue-800',
    'good': 'bg-yellow-100 text-yellow-800',
    'fair': 'bg-orange-100 text-orange-800',
    'poor': 'bg-red-100 text-red-800'
  };
  
  return (
    <Link to={`/listing/${listing.id}`} className="group">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative">
          <img 
            src={listing.image} 
            alt={listing.title} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 flex space-x-2">
            <button className="bg-white dark:bg-dark-900 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <FaHeart className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="bg-white dark:bg-dark-900 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
              <FaEye className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className={`${conditionColors[listing.condition]} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
              {listing.condition === 'new' ? 'New' : 
               listing.condition === 'like-new' ? 'Like New' : 
               listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white truncate">{listing.title}</h3>
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${listing.price}</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">
            {listing.description}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <div className="flex items-center mr-4">
              <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
              <span className="truncate">{listing.seller.name}</span>
            </div>
            <span className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              {listing.rating || '4.8'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
              {listing.school}
            </span>
            
            <div className="flex space-x-2">
              <button className="text-xs bg-indigo-500 text-white px-3 py-1 rounded-full flex items-center">
                <FaCube className="text-xs mr-1" /> AR
              </button>
              <button className="text-xs bg-gray-800 text-white px-3 py-1 rounded-full flex items-center">
                <FaShoppingCart className="text-xs mr-1" /> Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;