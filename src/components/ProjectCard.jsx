import React from 'react';
import { ExternalLink, CheckCircle2, Briefcase, QrCode, CalendarCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Github } from './icons/BrandIcons';

const iconMap = {
  Briefcase,
  QrCode,
  CalendarCheck,
};

export default function ProjectCard({ project, index }) {
  const IconComponent = iconMap[project.icon] || Briefcase;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group glass-card glass-card-hover rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-slate-200/80 dark:border-white/10 hover:border-violet-500/50 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-600/10 via-indigo-600/5 to-transparent rounded-full blur-2xl pointer-events-none -z-10 group-hover:scale-125 transition-transform duration-500" />

      <div>
        {/* Top Header: Project Number, Icon, Category Badge */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono font-bold text-violet-600 dark:text-violet-400">
              #{project.number}
            </span>
            <div className="p-2.5 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform">
              <IconComponent className="w-5 h-5" />
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/20">
            {project.badge}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Key Features */}
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Key Highlights
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {project.features.map((feature, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technology Badges */}
        <div className="mt-6 pt-5 border-t border-slate-200/60 dark:border-white/5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-dark-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons: GitHub & Live Demo */}
      <div className="mt-8 pt-5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 dark:bg-dark-800 hover:bg-violet-600 dark:hover:bg-violet-600 border border-slate-700/50 dark:border-white/10 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          aria-label={`View ${project.title} GitHub repository`}
        >
          <Github className="w-4 h-4" />
          <span>Source Code</span>
        </a>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500"
            aria-label={`View ${project.title} Live Demo`}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-100/60 dark:bg-dark-900/40 border border-slate-200/40 dark:border-white/5 cursor-not-allowed select-none"
            title="Repository showcase version (Live deployment coming soon)"
          >
            <span>Repository Only</span>
          </span>
        )}
      </div>
    </motion.article>
  );
}
