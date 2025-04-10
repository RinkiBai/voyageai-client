// src/components/TopBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Switch from '@/components/ui/switch';
import Button from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';

const TopBar = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleDarkMode } = useTheme();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md px-4 md:px-8 py-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* 🚀 Brand */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Voyage<span className="text-blue-500">AI</span>
        </h1>

        {/* 🔗 Navigation */}
        <nav className="flex flex-wrap gap-2">
          <Link to="/book">
            <Button variant="secondary">Book Now</Button>
          </Link>
          <Link to="/chat">
            <Button variant="secondary">AI Chat</Button>
          </Link>
          <Link to="/profile">
            <Button variant="secondary">Profile</Button>
          </Link>
          <Link to="/settings">
            <Button variant="secondary">Settings</Button>
          </Link>
        </nav>

        {/* ⚙️ Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-700 dark:text-gray-300">Dark Mode</span>
            <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
          </div>

          <Button variant="outline" onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'हिंदी' : 'English'}
          </Button>

          <Link to="/login">
            <Button variant="ghost">{t('login')}</Button>
          </Link>
          <Link to="/register">
            <Button>{t('register')}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
