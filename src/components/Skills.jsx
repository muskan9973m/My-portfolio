import React from 'react';
import { Layout, Server, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { skillsData } from '../data/skills';

const categoryIcons = {
  'Frontend Development': Layout,
  'Backend & Database': Server,
  'Tools & Platforms': Terminal,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-28 relative"
      aria-label="Skills and Technologies"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Expertise"
          title="Skills & Technologies"
          subtitle="A comprehensive toolkit for developing modern, scalable, and responsive digital products."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((categoryItem, idx) => {
            const Icon = categoryIcons[categoryItem.category] || Terminal;
            return (
              <motion.div
                key={categoryItem.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className={`group glass-card glass-card-hover rounded-3xl p-7 flex flex-col justify-between border border-slate-200/80 dark:border-white/10 ${categoryItem.borderAccent}`}
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="p-3 rounded-2xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {categoryItem.category}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {categoryItem.skills.length} core competencies
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {categoryItem.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {categoryItem.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-dark-800 text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-white/5 hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:text-violet-600 dark:hover:text-violet-300 transition-colors cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>Production-ready</span>
                  <div className="w-2 h-2 rounded-full bg-violet-500/60" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
