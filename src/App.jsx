import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubProjects from './components/GitHubProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-900 dark:text-slate-100 selection:bg-violet-500 selection:text-white transition-colors duration-300">
      {/* Top Sticky Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Content Areas */}
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubProjects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
