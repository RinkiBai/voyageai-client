// src/components/SubscribeSection.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async () => {
    try {
      const res = await axios.post('/api/subscribe', { email });
      setSuccessMsg('Thanks for subscribing!');
      setErrorMsg('');
      setEmail('');
    } catch (err) {
      setErrorMsg('Subscription failed. Try again!');
      setSuccessMsg('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-12 text-center rounded-xl shadow-md mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Join our Travel Community!</h2>
      <p className="mb-6 text-sm md:text-base">Subscribe to receive the latest travel tips, updates, and exclusive offers 🚀</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={handleSubscribe}
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Subscribe
        </button>
      </div>

      {successMsg && <p className="mt-4 text-green-200">{successMsg}</p>}
      {errorMsg && <p className="mt-4 text-red-200">{errorMsg}</p>}
    </div>
  );
};

export default SubscribeSection;
