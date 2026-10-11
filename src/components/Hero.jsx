import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, FileDown, Sparkles, Terminal, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin } from './icons/BrandIcons';
import { siteConfig } from '../config/siteConfig';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Rotating roles animation
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.hero.animatedRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
      aria-label="Hero Introduction"
    >
      {/* Decorative gradient glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Small greeting */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-violet-500/10 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/25 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span>{siteConfig.hero.greeting}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
            >
              Building digital experiences that{' '}
              <span className="text-gradient">solve real-world problems.</span>
            </motion.h1>

            {/* Rotating Animated Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex items-center justify-center lg:justify-start gap-2.5 text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300"
            >
              <Terminal className="w-5 h-5 text-violet-500 shrink-0" />
              <span>I am a</span>
              <div className="h-8 overflow-hidden inline-flex items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="text-violet-600 dark:text-violet-400 font-bold"
                  >
                    {siteConfig.hero.animatedRoles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {siteConfig.hero.supportingHeadline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                View Projects
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-dark-800/80 hover:bg-slate-100 dark:hover:bg-dark-750 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                Contact Me
              </button>

              <a
                href={siteConfig.resume.filePath}
                download={siteConfig.resume.fileName}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 dark:hover:bg-violet-900/40 border border-violet-200 dark:border-violet-800/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Download Resume PDF"
              >
                <FileDown className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Prominent Social & Contact Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-dark-800/80 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Muskan Singh LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2] group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">/muskan-singh</span>
              </a>

              <a
                href={`mailto:${siteConfig.socialLinks.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-dark-800/80 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Send Email to muskansingh9973m@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>Gmail</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">muskansingh9973m@gmail.com</span>
              </a>

              <a
                href={siteConfig.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-dark-800/80 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-400 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-violet-500"
                aria-label="Muskan Kumari GitHub Profile"
              >
                <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">@muskan9973m</span>
              </a>
            </motion.div>
          </div>

          {/* Right / Abstract Developer Monogram Avatar */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center"
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-violet-600/20 via-indigo-600/10 to-purple-600/20 blur-xl animate-pulse-slow" />

              {/* Main Avatar Card */}
              <div className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-br from-violet-500/40 via-indigo-500/20 to-purple-500/40 shadow-2xl backdrop-blur-xl">
                <div className="w-full h-full rounded-[22px] bg-slate-100/90 dark:bg-dark-900/95 p-6 flex flex-col justify-between border border-white/20 dark:border-white/10">
                  
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-xs font-mono">
                      <Code className="w-3 h-3" />
                      <span>developer.tsx</span>
                    </div>
                  </div>

                  {/* Center Profile Photo or Monogram */}
                  <div className="flex flex-col items-center justify-center my-auto py-2">
                    <div className="relative group">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-purple-600 p-[2.5px] shadow-glow-md overflow-hidden">
                        {siteConfig.hero.profileImage ? (
                          <img
                            src={siteConfig.hero.profileImage}
                            alt="Muskan Kumari - Full-Stack Developer"
                            className="w-full h-full object-cover object-[center_18%] rounded-[14px] group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full rounded-[14px] bg-white dark:bg-dark-950 flex flex-col items-center justify-center"
                          style={{ display: siteConfig.hero.profileImage ? 'none' : 'flex' }}
                        >
                          <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-violet-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tighter">
                            MK
                          </span>
                        </div>
                      </div>
                      <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500 text-white shadow-md flex items-center gap-1.5 z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Available
                      </span>
                    </div>

                    <p className="mt-3.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Muskan Kumari
                    </p>
                    <p className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                      Full-Stack &amp; Frontend Developer
                    </p>
                  </div>

                  {/* Bottom Interactive Tech Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10 text-center">
                    <div className="px-2 py-1.5 rounded-lg bg-slate-200/50 dark:bg-dark-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      React.js
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-slate-200/50 dark:bg-dark-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      Node.js
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-slate-200/50 dark:bg-dark-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                      Tailwind
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating decorative mini-badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-4 px-3.5 py-2 rounded-xl bg-white dark:bg-dark-800 border border-slate-200 dark:border-white/10 shadow-lg text-xs font-semibold text-slate-800 dark:text-white flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                <span>Clean Code &amp; Solutions</span>
              </motion.div>
            </motion.div>
          </div>

        </div>

        {/* Scroll down prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <button
            onClick={() => scrollTo('about')}
            className="flex flex-col items-center gap-2 text-xs font-medium text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors focus:outline-none"
            aria-label="Scroll to About section"
          >
            <span>Explore More</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-violet-500" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
