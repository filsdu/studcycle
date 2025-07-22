// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import algoliasearch from 'algoliasearch/lite';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CreateListing from './components/CreateListing';
import ListingsPage from './components/ListingsPage';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import ListingDetail from './components/ListingDetail';
import BlockchainVerification from './components/BlockchainVerification';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI1Or3lUPzR8D7BO5h5wWO14z4afUF4qk",
  authDomain: "studcycle-843f8.firebaseapp.com",
  projectId: "studcycle-843f8",
  storageBucket: "studcycle-843f8.appspot.com",
  messagingSenderId: "485038088962",
  appId: "1:485038088962:web:6d701e9ca22a51d410981b",
  measurementId: "G-PTNQWN7YEE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Algolia
const algoliaClient = algoliasearch('M27COJX92J', 'f2ed30035f28c69998bcacf469c914d9');
const listingsIndex = algoliaClient.initIndex('listings');

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [schools, setSchools] = useState([]);
  const [listings, setListings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${user.email.split('@')[0]}&background=random`,
          school: user.email.split('@')[1].replace('.edu', ' University')
        };
        
        setUser(userData);
        
        // Check if user is admin
        const adminEmails = ['admin@studcycle.com', 'nezerwa@studcycle.com'];
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    
    // Load schools from Firestore
    const loadSchools = async () => {
      const q = query(collection(db, "schools"));
      const querySnapshot = await getDocs(q);
      const schoolsData = querySnapshot.docs.map(doc => doc.data());
      setSchools(schoolsData);
    };
    
    // Load listings
    const loadListings = async () => {
      const q = query(collection(db, "listings"), where("status", "==", "active"));
      const querySnapshot = await getDocs(q);
      const listingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setListings(listingsData);
    };
    
    loadSchools();
    loadListings();
    
    return () => unsubscribe();
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Handle login
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      hd: 'edu' // Restrict to .edu domains
    });
    
    try {
      await signInWithPopup(auth, provider);
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Create new listing
  const createListing = async (listingData, images) => {
    try {
      // Upload images to Firebase Storage
      const imageUrls = [];
      for (const image of images) {
        const storageRef = ref(storage, `listings/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
      
      // Add listing to Firestore
      const newListing = {
        ...listingData,
        seller: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        },
        createdAt: new Date().toISOString(),
        status: "active",
        views: 0,
        images: imageUrls,
        blockchainVerified: listingData.price > 100 // Auto-verify high-value items
      };
      
      const docRef = await addDoc(collection(db, "listings"), newListing);
      
      // Add to Algolia index
      await listingsIndex.saveObject({
        objectID: docRef.id,
        ...newListing
      });
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error("Error creating listing:", error);
      return { success: false, error };
    }
  };

  // Update listing
  const updateListing = async (listingId, updates) => {
    try {
      const listingRef = doc(db, "listings", listingId);
      await updateDoc(listingRef, updates);
      
      // Update Algolia index
      await listingsIndex.partialUpdateObject({
        objectID: listingId,
        ...updates
      });
      
      return { success: true };
    } catch (error) {
      console.error("Error updating listing:", error);
      return { success: false, error };
    }
  };

  return (
    <div className={`font-sans transition-colors duration-300 ${darkMode ? 'dark bg-dark-900' : 'bg-gray-50'}`}>
      <Router>
        <Navbar 
          user={user} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          handleLogin={() => setShowLoginModal(true)}
          handleLogout={handleLogout}
          isAdmin={isAdmin}
        />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero user={user} schools={schools} />
              <Features />
              <CTA user={user} />
            </>
          } />
          <Route path="/listings" element={<ListingsPage listings={listings} schools={schools} />} />
          <Route path="/create-listing" element={<CreateListing user={user} schools={schools} createListing={createListing} />} />
          <Route path="/profile" element={<UserProfile user={user} listings={listings} updateListing={updateListing} />} />
          <Route path="/admin" element={<AdminDashboard user={user} listings={listings} schools={schools} />} />
          <Route path="/listing/:id" element={<ListingDetail listings={listings} user={user} updateListing={updateListing} />} />
          <Route path="/blockchain-verify/:id" element={<BlockchainVerification user={user} listings={listings} updateListing={updateListing} />} />
        </Routes>
        
        <Footer />
      </Router>
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin} 
        />
      )}
    </div>
  );
}

export { app, db, storage, auth };
export default App;