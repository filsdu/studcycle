// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FaEdit, FaCog, FaChartLine, FaShieldAlt, FaLeaf, FaGraduationCap, FaStar } from 'react-icons/fa';

const UserProfile = ({ user }) => {
  const [userListings, setUserListings] = useState([]);
  const [activeTab, setActiveTab] = useState('listings');
  const [stats, setStats] = useState({
    itemsSold: 12,
    rating: 4.8,
    carbonSaved: 42.5,
    earnings: 560.25
  });

  useEffect(() => {
    const fetchUserListings = async () => {
      if (!user) return;
      
      try {
        const listingsRef = collection(db, 'listings');
        const q = query(listingsRef, where('seller.id', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        const listingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setUserListings(listingsData);
      } catch (error) {
        console.error('Error fetching user listings:', error);
      }
    };

    fetchUserListings();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <i className="fas fa-exclamation-circle text-5xl text-yellow-500 mb-6"></i>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You need to sign in to view your profile.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-900 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <div className="relative">
              <img 
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`} 
                alt={user.displayName} 
                className="w-32 h-32 rounded-full border-4 border-white/20"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                <div className="bg-white rounded-full w-5 h-5 flex items-center justify-center">
                  <FaGraduationCap className="text-green-500 text-xs" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.displayName}</h1>
            <p className="text-primary-200 mb-4">{user.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm text-primary-200">University</div>
                <div className="font-bold">{user.school || 'St. Clair College'}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm text-primary-200">Program</div>
                <div className="font-bold">Construction Engineering</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-sm text-primary-200">Member Since</div>
                <div className="font-bold">Jan 2023</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 md:ml-auto">
            <button className="px-6 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg mr-4">
              <FaChartLine className="text-primary-600 dark:text-primary-400 text-xl" />
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Items Sold</div>
              <div className="text-2xl font-bold">{stats.itemsSold}</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg mr-4">
              <FaStar className="text-yellow-500 dark:text-yellow-400 text-xl" />
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Rating</div>
              <div className="text-2xl font-bold">{stats.rating} <span className="text-sm text-gray-400">/5</span></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
              <FaLeaf className="text-green-500 dark:text-green-400 text-xl" />
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">CO₂ Saved</div>
              <div className="text-2xl font-bold">{stats.carbonSaved}kg</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6 flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">
              <FaShieldAlt className="text-purple-500 dark:text-purple-400 text-xl" />
            </div>
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Earnings</div>
              <div className="text-2xl font-bold">${stats.earnings}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'purchases'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Purchase History
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Account Settings
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'listings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Active Listings</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-dark-700">
                    Drafts (2)
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all">
                    Create New Listing
                  </button>
                </div>
              </div>
              
              {userListings.length === 0 ? (
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-12 text-center">
                  <div className="bg-gray-200 dark:bg-dark-700 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <FaLeaf className="text-gray-400 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No active listings</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start selling your academic items to fellow students
                  </p>
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold">
                    Create Your First Listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map(listing => (
                    <div key={listing.id} className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white truncate">{listing.title}</h3>
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${listing.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                          {listing.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                            12 views
                          </span>
                          <div className="flex space-x-2">
                            <button className="text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded">
                              Edit
                            </button>
                            <button className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                    <FaChartLine className="text-blue-500 dark:text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2">Boost Your Listings</h3>
                    <p className="text-blue-700 dark:text-blue-300 mb-4">
                      Get more visibility for your items with our premium promotion options
                    </p>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                      Promote Listings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'purchases' && (
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Purchase History</h2>
              {/* Purchase history content would go here */}
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Reviews & Ratings</h2>
              {/* Reviews content would go here */}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
              {/* Settings content would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;