import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { projectsData, projectFilterCategories } from '../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.categories.includes(activeCategory);
  });

  return (
    <section
      id="projects"
      className="py-20 md:py-28 relative"
      aria-label="Featured Projects Showcase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio Showcase"
          title="Featured Projects"
          subtitle="Some of the applications I've been building."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {projectFilterCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
                className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 bg-white dark:bg-dark-900 border border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-md shadow-violet-500/25 -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span>{category}</span>
                <span className="ml-1.5 opacity-75 text-[11px]">
                  (
                  {category === 'All'
                    ? projectsData.length
                    : projectsData.filter((p) => p.categories.includes(category)).length}
                  )
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
