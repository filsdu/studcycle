// src/components/FiltersPanel.js
import React from 'react';
import { FaTimes } from 'react-icons/fa';

const FiltersPanel = ({ filters, handleFilterChange, resetFilters, schools }) => {
  return (
    <div className="bg-white dark:bg-dark-800 shadow-lg py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Filter Listings</h3>
          <button 
            onClick={resetFilters}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center"
          >
            <FaTimes className="mr-1" /> Clear all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              <option value="textbook">Textbooks</option>
              <option value="kit">Lab/Drawing Kits</option>
              <option value="uniform">Uniforms</option>
              <option value="tool">Academic Tools</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School</label>
            <select
              name="school"
              value={filters.school}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="">All Schools</option>
              {schools.map(school => (
                <option key={school.id} value={school.name}>{school.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Condition</label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            >
              <option value="">All Conditions</option>
              <option value="new">Brand New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Course Code</label>
            <input
              type="text"
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
              placeholder="e.g., MATH101"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;