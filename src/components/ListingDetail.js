// src/components/ListingDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaShare, FaTruck, FaUserGraduate, FaLink, FaRobot, FaCube, FaShoppingCart, FaStar, FaLeaf, FaGraduationCap } from 'react-icons/fa';

const ListingDetail = ({ listings, user, updateListing }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [negotiationPrice, setNegotiationPrice] = useState('');
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [negotiationSent, setNegotiationSent] = useState(false);

  useEffect(() => {
    const foundListing = listings.find(l => l.id === id);
    if (foundListing) {
      setListing(foundListing);
      
      // Simulate view count update
      setTimeout(() => {
        updateListing(id, { views: (foundListing.views || 0) + 1 });
      }, 5000);
      
      setLoading(false);
    }
  }, [id, listings, updateListing]);

  const handleSaveListing = () => {
    setIsSaved(!isSaved);
    // In a real app, we would save to user's profile in Firestore
  };

  const handleNegotiate = () => {
    if (!negotiationPrice) {
      alert('Please enter your target price');
      return;
    }
    
    if (parseFloat(negotiationPrice) >= listing.price) {
      alert('Your offer should be lower than the current price');
      return;
    }
    
    setShowNegotiation(false);
    setNegotiationSent(true);
    
    // Simulate AI negotiation
    setTimeout(() => {
      alert(`Seller has countered with $${listing.price - 5}. Do you accept?`);
      setNegotiationSent(false);
    }, 3000);
  };

  const handlePurchase = () => {
    if (!user) {
      alert('Please sign in to make a purchase');
      return;
    }
    
    // Simulate purchase flow
    navigate(`/purchase/${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-6"></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Loading Listing Details...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* AR Preview Overlay */}
      {showAR && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="bg-gray-900 p-4 flex justify-between items-center">
            <h3 className="text-white font-bold">AR Preview</h3>
            <button 
              onClick={() => setShowAR(false)}
              className="text-white text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="bg-gray-700 w-64 h-96 mx-auto rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4"></div>
                  <p>Point camera at floor</p>
                </div>
              </div>
              <p className="text-gray-400">Place the item in your space</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="bg-gray-200 dark:bg-dark-700 rounded-xl overflow-hidden mb-4 h-96 flex items-center justify-center">
            {listing.images && listing.images.length > 0 ? (
              <img 
                src={listing.images[0]} 
                alt={listing.title} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-gray-500">No image available</div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {listing.images && listing.images.slice(0, 4).map((img, index) => (
              <div 
                key={index} 
                className="bg-gray-200 dark:bg-dark-700 rounded-lg overflow-hidden h-24 flex items-center justify-center"
              >
                <img 
                  src={img} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {(!listing.images || listing.images.length < 4) && 
              Array.from({ length: 4 - (listing.images?.length || 0) }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-gray-200 dark:bg-dark-700 border-2 border-dashed rounded-lg h-24 flex items-center justify-center text-gray-500"
                >
                  No image
                </div>
              ))
            }
          </div>
          
          <button 
            onClick={() => setShowAR(true)}
            className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-bold flex items-center justify-center"
          >
            <FaCube className="mr-2" /> View in AR
          </button>
        </div>
        
        {/* Details */}
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{listing.title}</h1>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${listing.price}</span>
                <span className="bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded-full ml-4">
                  {listing.condition === 'new' ? 'New' : 
                   listing.condition === 'like-new' ? 'Like New' : 
                   listing.condition.charAt(0).toUpperCase() + listing.condition.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleSaveListing}
                className={`p-2 rounded-full ${isSaved ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'} hover:bg-gray-100 dark:hover:bg-dark-700`}
              >
                <FaHeart className={isSaved ? 'fill-current' : ''} />
              </button>
              <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700">
                <FaShare />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {listing.blockchainVerified && (
              <Link 
                to={`/blockchain-verify/${listing.id}`}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium px-3 py-1.5 rounded-full flex items-center hover:bg-indigo-200 dark:hover:bg-indigo-800"
              >
                <FaLink className="mr-1" /> Blockchain Verified
              </Link>
            )}
            {listing.professorVerified && (
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                <FaGraduationCap className="mr-1" /> Professor Verified: {listing.verifiedCourse}
              </span>
            )}
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
              <FaTruck className="mr-1" /> 
              {listing.deliveryMethod === 'campus_delivery' ? 'Campus Delivery Available' : 'Meetup Only'}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
              <FaLeaf className="mr-1" /> Saves {Math.round(listing.price * 0.1)}kg CO₂
            </span>
          </div>
          
          <div className="prose prose-indigo dark:prose-invert max-w-none mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white">Description</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {listing.description || 'No description provided.'}
            </p>
            
            <h3 className="font-bold text-gray-900 dark:text-white mt-6">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-600 dark:text-gray-400">Category</div>
                <div className="font-medium">{listing.category}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Course</div>
                <div className="font-medium">{listing.course || 'N/A'}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">School</div>
                <div className="font-medium">{listing.school}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Listed</div>
                <div className="font-medium">
                  {new Date(listing.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Seller Information</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 overflow-hidden">
                {listing.seller.photoURL ? (
                  <img src={listing.seller.photoURL} alt={listing.seller.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                    {listing.seller.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{listing.seller.name}</h4>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FaStar className="text-yellow-400 mr-1" /> 4.8 (24 reviews)
                </div>
              </div>
              <button className="ml-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600">
                Contact
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handlePurchase}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center"
            >
              <FaShoppingCart className="mr-2" /> Buy Now
            </button>
            <button 
              onClick={() => setShowNegotiation(true)}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-900 transition-all flex items-center"
            >
              <FaRobot className="mr-2" /> AI Negotiate
            </button>
            <button 
              onClick={() => setShowAR(true)}
              className="px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-bold hover:bg-primary-50 dark:hover:bg-dark-800 transition-all flex items-center"
            >
              <FaCube className="mr-2" /> AR Preview
            </button>
          </div>
        </div>
      </div>
      
      {/* Negotiation Modal */}
      {showNegotiation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">AI-Powered Negotiation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Set your target price and let our AI negotiate the best deal for you.
            </p>
            
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Target Price (${listing.price})</label>
              <input
                type="number"
                value={negotiationPrice}
                onChange={(e) => setNegotiationPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                placeholder={`e.g., ${listing.price - 5}`}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowNegotiation(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleNegotiate}
                className="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold"
              >
                Start Negotiation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Negotiation Success */}
      {negotiationSent && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white rounded-lg shadow-lg p-4 z-50 flex items-center">
          <FaRobot className="mr-2" />
          <span>AI negotiation started! Waiting for seller response...</span>
        </div>
      )}
    </div>
  );
};

export default ListingDetail;