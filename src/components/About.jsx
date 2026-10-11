import React from 'react';
import { Layers, Cpu, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import SectionHeading from './SectionHeading';
import { siteConfig } from '../config/siteConfig';

const iconMap = {
  Layers: Layers,
  Cpu: Cpu,
  Sparkles: Sparkles,
};

export default function About() {
  const { about } = siteConfig;

  return (
    <section
      id="about"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-label="About Muskan Kumari"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Who I Am"
          title={about.heading}
          subtitle={about.subheading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Main Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Ambient background glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none -z-10 group-hover:bg-violet-600/15 transition-colors" />

            <div>
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold text-sm mb-4">
                <Terminal className="w-4 h-4" />
                <span>Developer Philosophy</span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {about.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Modular Frontend Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Scalable Backend Integration</span>
              </div>
            </div>
          </motion.div>

          {/* Three Highlight Cards Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {about.highlights.map((highlight, index) => {
              const IconComponent = iconMap[highlight.icon] || Sparkles;
              return (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="p-3 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 shrink-0">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {highlight.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-normal">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
