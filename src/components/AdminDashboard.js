// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { FaChartBar, FaList, FaUsers, FaCog, FaSearch, FaCheck, FaTimes, FaBan, FaLeaf, FaGraduationCap, FaLink } from 'react-icons/fa';

const AdminDashboard = ({ user, listings, schools }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalListings: 0,
    activeUsers: 0,
    totalSales: 0,
    pendingVerification: 0
  });

  useEffect(() => {
    // Simulate fetching users
    setUsers([
      { id: '1', name: 'John Smith', email: 'john@harvard.edu', status: 'active', joined: '2023-01-15' },
      { id: '2', name: 'Sarah Johnson', email: 'sarah@mit.edu', status: 'active', joined: '2023-02-22' },
      { id: '3', name: 'Alex Brown', email: 'alex@stanford.edu', status: 'banned', joined: '2023-03-10' },
      { id: '4', name: 'Maria Garcia', email: 'maria@berkeley.edu', status: 'active', joined: '2023-04-05' },
    ]);
    
    // Calculate stats
    setStats({
      totalListings: listings.length,
      activeUsers: users.filter(u => u.status === 'active').length,
      totalSales: listings.reduce((sum, item) => sum + item.price, 0),
      pendingVerification: listings.filter(item => !item.blockchainVerified && item.price > 100).length
    });
  }, [listings, users]);

  // Filter listings based on search term
  const filteredListings = listings.filter(listing => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approveListing = (id) => {
    // In a real app, we would update Firestore
    alert(`Listing ${id} approved`);
  };

  const rejectListing = (id) => {
    // In a real app, we would update Firestore
    alert(`Listing ${id} rejected`);
  };

  const toggleUserStatus = (id, currentStatus) => {
    // In a real app, we would update Firestore
    alert(`User ${id} status changed to ${currentStatus === 'active' ? 'banned' : 'active'}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
      
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaChartBar className="mr-2 inline" /> Dashboard
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'listings'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaList className="mr-2 inline" /> Listings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaUsers className="mr-2 inline" /> Users
          </button>
          <button
            onClick={() => setActiveTab('verification')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'verification'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <FaGraduationCap className="mr-2 inline" /> Professor Verification
          </button>
        </nav>
      </div>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white w-full"
          />
        </div>
      </div>
      
      <div>
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <div className="text-3xl font-bold mb-2">{stats.totalListings}</div>
                <div className="text-gray-600 dark:text-gray-300">Total Listings</div>
              </div>
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <div className="text-3xl font-bold mb-2">{stats.activeUsers}</div>
                <div className="text-gray-600 dark:text-gray-300">Active Users</div>
              </div>
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <div className="text-3xl font-bold mb-2">${stats.totalSales.toFixed(2)}</div>
                <div className="text-gray-600 dark:text-gray-300">Total Sales</div>
              </div>
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <div className="text-3xl font-bold mb-2">{stats.pendingVerification}</div>
                <div className="text-gray-600 dark:text-gray-300">Pending Verifications</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Listings</h3>
                <div className="space-y-4">
                  {listings.slice(0, 5).map(listing => (
                    <div key={listing.id} className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-dark-700 rounded-lg"></div>
                      <div className="ml-4 flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{listing.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">${listing.price} • {listing.school}</div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Platform Stats</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Academic Items</span>
                      <span className="text-gray-900 dark:text-white">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5">
                      <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Verified Professors</span>
                      <span className="text-gray-900 dark:text-white">42</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600 dark:text-gray-300">CO₂ Saved (kg)</span>
                      <span className="text-gray-900 dark:text-white">1,240</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'listings' && (
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredListings.length} of {listings.length} listings
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-dark-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Seller
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredListings.map(listing => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-dark-700 rounded-lg"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{listing.title}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{listing.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{listing.seller?.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{listing.school}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        ${listing.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {listing.blockchainVerified ? (
                          <span className="inline-flex items-center text-xs text-indigo-600 dark:text-indigo-400">
                            <FaLink className="mr-1" /> Verified
                          </span>
                        ) : listing.professorVerified ? (
                          <span className="inline-flex items-center text-xs text-purple-600 dark:text-purple-400">
                            <FaGraduationCap className="mr-1" /> Verified
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 dark:text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-500 mr-3">
                          <FaCheck />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500">
                          <FaTimes />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-dark-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 dark:bg-dark-700 rounded-full"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(user.joined).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.status === 'active' ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Banned
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {user.status === 'active' ? (
                          <button 
                            onClick={() => toggleUserStatus(user.id, user.status)}
                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-500 flex items-center"
                          >
                            <FaBan className="mr-1" /> Ban
                          </button>
                        ) : (
                          <button 
                            onClick={() => toggleUserStatus(user.id, user.status)}
                            className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-500"
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'verification' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Professor Verification Requests</h3>
                <div className="space-y-4">
                  {listings
                    .filter(item => item.professorVerified && !item.professorApproved)
                    .slice(0, 3)
                    .map(listing => (
                      <div key={listing.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{listing.title}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-300">Course: {listing.verifiedCourse}</div>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => approveListing(listing.id)}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => rejectListing(listing.id)}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  {listings.filter(item => item.professorVerified && !item.professorApproved).length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No pending verification requests
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Verified Professors</h3>
                <div className="space-y-3">
                  {[
                    { id: 1, name: 'Dr. James Wilson', email: 'jwilson@mit.edu', courses: ['PHYS101', 'PHYS202'] },
                    { id: 2, name: 'Prof. Sarah Johnson', email: 'sjohnson@harvard.edu', courses: ['MATH301', 'MATH405'] },
                    { id: 3, name: 'Dr. Robert Chen', email: 'rchen@stanford.edu', courses: ['CHEM150', 'CHEM350'] },
                  ].map(prof => (
                    <div key={prof.id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{prof.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{prof.email}</div>
                      </div>
                      <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Verified
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Add New Professor</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Professor Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="Dr. James Wilson"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="jwilson@mit.edu"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Courses</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="PHYS101, PHYS202, PHYS301"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold">
                    Add Professor
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;