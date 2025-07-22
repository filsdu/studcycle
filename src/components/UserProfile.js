import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  FaEdit,
  FaCog,
  FaChartLine,
  FaShieldAlt,
  FaLeaf,
  FaGraduationCap,
  FaStar
} from 'react-icons/fa';

// Dummy implementation to simulate UserProfile component
const UserProfile = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulated data fetch
    const fetchData = async () => {
      const q = query(collection(db, 'users'), where('active', '==', true));
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setData(results);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {data.map((user, index) => (
        <div key={index}>
          <p><FaStar /> {user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;