// src/components/BlockchainVerification.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaLink, FaCheckCircle, FaEthereum, FaWallet } from 'react-icons/fa';

const BlockchainVerification = ({ user, listings, updateListing }) => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [step, setStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const foundListing = listings.find(l => l.id === id);
    if (foundListing) {
      setListing(foundListing);
      setIsVerified(foundListing.blockchainVerified);
    }
  }, [id, listings]);

  const handleVerify = async () => {
    if (!walletAddress) {
      alert('Please enter your wallet address');
      return;
    }
    
    setLoading(true);
    
    // Simulate blockchain transaction
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate fake transaction hash
      const fakeHash = '0x' + Math.random().toString(36).substring(2, 42);
      setTransactionHash(fakeHash);
      
      // Update listing in database
      await updateListing(id, {
        blockchainVerified: true,
        nftCertificate: {
          tokenId: Math.floor(Math.random() * 10000),
          contractAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          transactionHash: fakeHash,
          verifiedAt: new Date().toISOString()
        }
      });
      
      setStep(3);
      setIsVerified(true);
    } catch (error) {
      console.error('Verification error:', error);
      alert('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Listing</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 text-white">
          <h1 className="text-3xl font-bold flex items-center">
            <FaLink className="mr-3" /> Blockchain Verification
          </h1>
          <p className="text-indigo-200">Secure ownership with blockchain technology</p>
        </div>
        
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
              }`}>
                1
              </div>
              <div className={`ml-2 ${step === 1 ? 'font-bold text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-300'}`}>
                Connect Wallet
              </div>
            </div>
            
            <div className="h-1 w-16 bg-gray-200 dark:bg-dark-700 mx-2"></div>
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 2 ? 'bg-indigo-600 text-white' : step > 2 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
              }`}>
                {step > 2 ? <FaCheckCircle /> : 2}
              </div>
              <div className={`ml-2 ${step === 2 ? 'font-bold text-indigo-600 dark:text-indigo-400' : step > 2 ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                Verify
              </div>
            </div>
            
            <div className="h-1 w-16 bg-gray-200 dark:bg-dark-700 mx-2"></div>
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 3 ? 'bg-indigo-600 text-white' : step > 3 ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-gray-300'
              }`}>
                {step > 3 ? <FaCheckCircle /> : 3}
              </div>
              <div className={`ml-2 ${step === 3 ? 'font-bold text-indigo-600 dark:text-indigo-400' : step > 3 ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}>
                Complete
              </div>
            </div>
          </div>
          
          {isVerified ? (
            <div className="text-center py-12">
              <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-green-500 dark:text-green-400 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Verification Complete!</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                This item is now blockchain verified. Ownership has been securely recorded on the blockchain.
              </p>
              
              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6 max-w-2xl mx-auto text-left mb-8">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Verification Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Token ID</div>
                    <div className="font-mono text-gray-900 dark:text-white">{listing.nftCertificate.tokenId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Contract Address</div>
                    <div className="font-mono text-gray-900 dark:text-white truncate">{listing.nftCertificate.contractAddress}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Transaction Hash</div>
                    <div className="font-mono text-gray-900 dark:text-white truncate">{listing.nftCertificate.transactionHash}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Verified At</div>
                    <div className="text-gray-900 dark:text-white">
                      {new Date(listing.nftCertificate.verifiedAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <a 
                  href={`/listing/${listing.id}`}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-bold"
                >
                  View Listing
                </a>
                <button className="px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg font-bold">
                  View NFT
                </button>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To verify this item on the blockchain, connect your Ethereum wallet. This will create an NFT certificate 
                proving your ownership of this item.
              </p>
              
              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg mr-4">
                    <FaWallet className="text-indigo-600 dark:text-indigo-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Wallet Connection</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We support MetaMask, Coinbase Wallet, and WalletConnect
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Wallet Address</label>
                  <input
                    type="text"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white font-mono"
                  />
                </div>
                
                <button 
                  onClick={() => setStep(2)}
                  disabled={!walletAddress}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-bold disabled:opacity-50"
                >
                  Continue to Verification
                </button>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
                <div className="flex items-start">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Verification Fee</h4>
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Blockchain verification requires a small transaction fee (approximately $3-5) to cover network costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Verification</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Review the details below and confirm to create your NFT certificate on the blockchain.
              </p>
              
              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Item to Verify</div>
                    <div className="font-bold text-gray-900 dark:text-white">{listing.title}</div>
                    <div className="text-gray-600 dark:text-gray-300">${listing.price}</div>
                  </div>
                  
                  <div className="bg-white dark:bg-dark-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your Wallet</div>
                    <div className="font-mono text-gray-900 dark:text-white truncate">{walletAddress}</div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-dark-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full mr-3">
                      <FaEthereum className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">Estimated Fees</h3>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="text-gray-600 dark:text-gray-300">Network Fee (Gas)</div>
                    <div className="font-bold">0.0012 ETH (~$3.50)</div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <div className="text-gray-600 dark:text-gray-300">Platform Fee</div>
                    <div className="font-bold">$0.00</div>
                  </div>
                </div>
                
                <button 
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-bold flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing Verification...
                    </>
                  ) : (
                    "Confirm and Verify on Blockchain"
                  )}
                </button>
              </div>
              
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                By verifying, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          ) : step === 3 && !isVerified ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Verification in Progress</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Your blockchain verification is being processed. This usually takes 1-2 minutes.
              </p>
              
              <div className="bg-gray-50 dark:bg-dark-700 rounded-xl p-8 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto mb-6"></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirming Transaction</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Waiting for blockchain confirmation...
                </p>
                {transactionHash && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Transaction Hash:</div>
                    <div className="font-mono text-gray-900 dark:text-white text-sm break-all">
                      {transactionHash}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BlockchainVerification;