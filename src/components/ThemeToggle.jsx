import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="relative p-2.5 rounded-full text-slate-700 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 bg-slate-100/80 dark:bg-dark-800/80 border border-slate-200 dark:border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50"
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, rotate: theme === 'dark' ? -90 : 90, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-violet-600" />
        )}
      </motion.div>
    </button>
  );
}
