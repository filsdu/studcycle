// src/components/CreateListing.js
import React, { useState } from 'react';

const CreateListing = ({ user, schools, db }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'textbook',
    course: '',
    school: user?.school || '',
    price: '',
    condition: 'like-new',
    images: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = (e) => {
    // In a real app, we would upload to Firebase Storage
    const files = Array.from(e.target.files);
    const imagePreviews = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imagePreviews] }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would save to Firestore
      const listingData = {
        ...formData,
        seller: {
          id: user.uid,
          name: user.displayName,
          email: user.email
        },
        createdAt: new Date().toISOString(),
        status: 'active'
      };
      
      // Simulate Firestore save
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Listing created:', listingData);
      setSubmitSuccess(true);
      
      // Reset form after success
      setFormData({
        title: '',
        description: '',
        category: 'textbook',
        course: '',
        school: user?.school || '',
        price: '',
        condition: 'like-new',
        images: []
      });
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <i className="fas fa-exclamation-circle text-5xl text-yellow-500 mb-6"></i>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Authentication Required</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You need to sign in with your school email to create a listing.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold">
            Sign In Now
          </button>
        </div>
      </div>
    );
  }
  
  if (submitSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <i className="fas fa-check-circle text-5xl text-green-500 mb-6"></i>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Listing Created Successfully!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Your item is now live on StudCycle. Students can now view and purchase your item.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold"
            >
              Create Another Listing
            </button>
            <button className="px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-bold">
              View My Listings
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
          <h1 className="text-2xl font-bold">Create New Listing</h1>
          <p className="text-primary-200">Sell your academic items to fellow students</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Item Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="e.g., Calculus Textbook (8th Edition)"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  placeholder="Describe your item in detail..."
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  >
                    <option value="textbook">Textbook</option>
                    <option value="kit">Lab/Drawing Kit</option>
                    <option value="uniform">Uniform</option>
                    <option value="tool">Academic Tool</option>
                    <option value="electronics">Electronics</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  >
                    <option value="new">Brand New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="45"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Course Code</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                    placeholder="e.g., MATH101"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">School</label>
                <select
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select your school</option>
                  {schools.map(school => (
                    <option key={school.id} value={school.name}>{school.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Item Images</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center mb-6">
                {formData.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={img} 
                          alt={`Preview ${index}`} 
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }))}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-500 mb-4">Drag & drop images here or click to browse</p>
                  </>
                )}
                
                <label className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    multiple
                    onChange={handleImageUpload}
                  />
                  Select Images
                </label>
                <p className="text-sm text-gray-500 mt-3">Upload up to 6 photos (max 5MB each)</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-500 dark:text-blue-400 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Listing Guidelines</h4>
                    <ul className="text-blue-700 dark:text-blue-300 text-sm list-disc pl-5 space-y-1">
                      <li>Only academic-related items allowed</li>
                      <li>Provide accurate descriptions and photos</li>
                      <li>Price items fairly for students</li>
                      <li>No commercial or prohibited items</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Publishing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-bolt mr-2"></i> Publish Listing
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;