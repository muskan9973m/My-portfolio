import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to dynamically fetch and process public GitHub repositories
 * for a user with caching, AbortController cleanup, and error resilience.
 */
export function useGitHubRepos(username = 'muskan9973m') {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);

  const fetchRepos = useCallback(async (signal) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
      const response = await fetch(endpoint, {
        signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please try again later or visit Muskan\'s GitHub profile directly.');
        } else if (response.status === 404) {
          throw new Error(`GitHub user "${username}" was not found.`);
        } else {
          throw new Error(`GitHub API request failed with status code ${response.status}.`);
        }
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Unexpected response format received from GitHub API.');
      }

      // Filter out forked repositories and sort by last updated
      const filteredAndSorted = data
        .filter((repo) => !repo.fork)
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 6); // Top 6 non-fork repositories

      setRepos(filteredAndSorted);
      setLastFetched(new Date());
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching GitHub repositories:', err);
        setError(err.message || 'Failed to fetch repositories.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    const controller = new AbortController();
    fetchRepos(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchRepos]);

  const retry = () => {
    const controller = new AbortController();
    fetchRepos(controller.signal);
  };

  return { repos, isLoading, error, retry, lastFetched };
}
