// src/components/CreditsSection.jsx
import React from 'react';

const CreditsSection = () => {
  return (
    <footer className="text-center py-8 bg-gray-100 dark:bg-gray-800 mt-10">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">✨ Built with 💙 by</h3>
      <p className="text-md text-gray-600 dark:text-gray-300">
        <span className="text-blue-600 font-semibold">Rinki</span>,{' '}
        <span className="text-pink-500 font-semibold">Yashika</span> &{' '}
        <span className="text-purple-600 font-semibold">Parneet</span>
      </p>
      <p className="text-sm text-gray-500 mt-2">© 2025 VoyageAI. All rights reserved.</p>
    </footer>
  );
};

export default CreditsSection;
