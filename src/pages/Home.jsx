// src/pages/Home.jsx
import React from "react";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import SubscribeSection from "@/components/SubscribeSection";
import CreditsSection from "@/components/CreditsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors flex flex-col">
      {/* Navigation */}
      <TopBar />

      {/* Hero */}
      <HeroSection />

      {/* Subscribe */}
      <div className="px-4 py-10 flex justify-center">
        <SubscribeSection />
      </div>

      {/* Footer / Credits */}
      <div className="px-4 pb-16 flex justify-center">
        <CreditsSection />
      </div>
    </div>
  );
};

export default Home;
