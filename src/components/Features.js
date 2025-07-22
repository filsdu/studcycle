import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'fas fa-cube',
      title: 'AR Preview',
      description: 'Inspect items in your space before buying. Rotate textbooks, test tool sizes, and verify conditions.'
    },
    {
      icon: 'fas fa-link',
      title: 'Blockchain Verification',
      description: 'NFT certificates for high-value items. Tamper-proof ownership history and authenticity guarantees.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Campus Delivery Network',
      description: 'Student couriers earn cash delivering items between dorms and libraries in under 2 hours.'
    },
    {
      icon: 'fas fa-robot',
      title: 'AI Negotiation',
      description: 'Our bot haggles for you. Set your target price and let AI work magic while you study.'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Eco Impact',
      description: 'Track CO₂ saved by buying used. Earn badges and compete on school sustainability leaderboards.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Professor Verified',
      description: 'Required materials tagged by your actual professors. No more wrong edition purchases.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why StudCycle Dominates</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've rebuilt campus commerce from atoms to bits with these killer features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="bg-primary-100 dark:bg-primary-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${feature.icon} text-primary-600 dark:text-primary-400 text-xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;