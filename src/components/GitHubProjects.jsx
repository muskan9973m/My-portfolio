import React from 'react';
import { Star, GitFork, ExternalLink, RefreshCw, AlertCircle, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { Github } from './icons/BrandIcons';
import SectionHeading from './SectionHeading';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { siteConfig } from '../config/siteConfig';

// Language color mappings
const languageColors = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34f26',
  CSS: '#264de4',
  Python: '#3572A5',
  Java: '#b07219',
};

function formatUpdateDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function GitHubProjects() {
  const { repos, isLoading, error, retry } = useGitHubRepos(siteConfig.github.username);

  return (
    <section
      id="github"
      className="py-20 md:py-28 relative bg-slate-100/50 dark:bg-dark-900/30 border-y border-slate-200/60 dark:border-white/5"
      aria-label="Live GitHub Repositories"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Live GitHub Integration"
          title="Explore My GitHub"
          subtitle="Explore my repositories, projects, and development work directly from the GitHub REST API."
        />

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div
                key={sk}
                className="glass-card rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 animate-pulse space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-32 bg-slate-300 dark:bg-dark-700 rounded-md" />
                  <div className="h-4 w-4 bg-slate-300 dark:bg-dark-700 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-3.5 w-full bg-slate-200 dark:bg-dark-800 rounded" />
                  <div className="h-3.5 w-4/5 bg-slate-200 dark:bg-dark-800 rounded" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-white/5">
                  <div className="h-3 w-16 bg-slate-300 dark:bg-dark-700 rounded" />
                  <div className="h-3 w-20 bg-slate-300 dark:bg-dark-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error Fallback with Retry */}
        {!isLoading && error && (
          <div className="max-w-xl mx-auto text-center glass-card rounded-2xl p-8 border border-rose-500/20 shadow-md">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Unable to load live GitHub repositories
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {error}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={retry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Request</span>
              </button>
              <a
                href={siteConfig.github.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-dark-800 hover:bg-slate-300 dark:hover:bg-dark-700 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && repos.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <Github className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No public repositories found for @{siteConfig.github.username}.</p>
          </div>
        )}

        {/* Success Grid */}
        {!isLoading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, idx) => (
              <motion.article
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between border border-slate-200/80 dark:border-white/10 group hover:border-violet-500/40"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-base text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex items-center gap-1.5 break-all"
                    >
                      <Github className="w-4 h-4 text-violet-500 shrink-0" />
                      <span>{repo.name}</span>
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4 min-h-[3rem]">
                    {repo.description || 'Public GitHub repository showcasing functional code and implementation logic.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    {/* Primary Language */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || '#a855f7',
                        }}
                      />
                      <span>{repo.language || 'Code'}</span>
                    </div>

                    {/* Stats: Stars & Forks */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Updated {formatUpdateDate(repo.updated_at)}</span>
                    </span>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                    >
                      <span>View Repo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All on GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href={siteConfig.github.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-slate-900 dark:text-white bg-white dark:bg-dark-800 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 border border-slate-200 dark:border-white/10 shadow-sm transition-all duration-200 group"
          >
            <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>View All Repositories on GitHub</span>
            <ExternalLink className="w-4 h-4 opacity-75" />
          </a>
        </div>
      </div>
    </section>
  );
}
