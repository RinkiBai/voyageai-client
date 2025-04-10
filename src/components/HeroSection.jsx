// src/components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4"; // ✅ adjust path as needed

const HeroSection = () => {
  return (
    <section className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors overflow-hidden">
      {/* 🔄 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* 🌍 Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6 md:px-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 text-white drop-shadow">
          Explore the World with <span className="text-blue-400">VoyageAI</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-100">
          Your intelligent travel assistant
        </p>

        {/* 🔍 AI Search Bar */}
        <div className="w-full max-w-xl mb-6">
          <input
            type="text"
            placeholder="Where do you want to go?"
            className="w-full px-6 py-3 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 🚀 CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/book"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Book Now
          </Link>
          <Link
            to="/ai-chat"
            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Ask AI Travel Guide
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
