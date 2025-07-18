import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-gray-300 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left - Logo */}
        <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtAXamaSF8es3kqz-aKl6VPD-lMBq8knxS5w&s"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 dark:text-white">TravPlan</h2>
        </a>

        {/* Right - Button & Toggle */}
        <div className="flex items-center gap-3">
          <a href="/create-trip">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white">
              Get Started
            </Button>
          </a>

          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 px-3 py-1 rounded-full border border-gray-400 dark:border-white text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
