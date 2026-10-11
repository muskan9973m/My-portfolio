import React from 'react';
import { Mail, ArrowUp, Code2, Heart } from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-dark-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              {siteConfig.role}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${siteConfig.socialLinks.email}`}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 transition-colors"
              aria-label="Email Muskan"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 transition-colors ml-2"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & message */}
        <div className="mt-8 pt-8 border-t border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>© {currentYear} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Designed and built with React, Tailwind CSS, and a passion for creating useful digital experiences.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
