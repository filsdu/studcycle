// src/components/ListingsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ListingsPage = ({ listings, schools }) => {
  const [filters, setFilters] = useState({
    category: '',
    school: '',
    minPrice: '',
    maxPrice: '',
    condition: '',
    search: ''
  });
  
  const [sortBy, setSortBy] = useState('newest');
  
  const filteredListings = listings.filter(listing => {
    // Apply filters
    if (filters.category && listing.category !== filters.category) return false;
    if (filters.school && listing.school !== filters.school) return false;
    if (filters.minPrice && listing.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && listing.price > parseFloat(filters.maxPrice)) return false;
    if (filters.condition && listing.condition !== filters.condition) return false;
    if (filters.search && 
        !listing.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !listing.description.toLowerCase().includes(filters.search.toLowerCase())) return false;
    
    return true;
  });
  
  // Sort listings
  const sortedListings = [...filteredListings].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Browse Listings</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find academic items from students at your school
          </p>
        </div>
        <Link 
          to="/create-listing"
          className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all"
        >
          <i className="fas fa-plus mr-2"></i> Create Listing
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 h-fit sticky top-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Filters</h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search listings..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Category</label>
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2">School</label>
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Condition</label>
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
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Price Range</label>
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
            
            <button 
              onClick={() => setFilters({
                category: '',
                school: '',
                minPrice: '',
                maxPrice: '',
                condition: '',
                search: ''
              })}
              className="w-full py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-dark-700"
            >
              Clear All Filters
            </button>
          </div>
        </div>
        
        {/* Listings grid */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-0">
              Showing {filteredListings.length} of {listings.length} listings
            </p>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300 mr-3">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {sortedListings.length === 0 ? (
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-12 text-center">
              <i className="fas fa-search text-5xl text-gray-400 mb-6"></i>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No listings found</h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
              <button 
                onClick={() => setFilters({
                  category: '',
                  school: '',
                  minPrice: '',
                  maxPrice: '',
                  condition: '',
                  search: ''
                })}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedListings.map(listing => (
                <Link 
                  to={`/listing/${listing.id}`}
                  key={listing.id}
                  className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ${listing.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{listing.title}</h3>
                      <span className="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {listing.condition === 'new' ? 'New' : 
                         listing.condition === 'like-new' ? 'Like New' : 
                         listing.condition === 'good' ? 'Good' : 
                         listing.condition === 'fair' ? 'Fair' : 'Poor'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
                      <span className="truncate">{listing.seller.name}</span>
                      <span className="mx-2">•</span>
                      <span>{listing.school}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;