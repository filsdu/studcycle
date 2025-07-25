import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ListingsPage from './components/ListingsPage';
import CreateListing from './components/CreateListing';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
        <Navbar user={user} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <CTA />
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/create-listing" element={<CreateListing user={user} />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;