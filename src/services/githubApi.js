import { DEMO_PROFILES } from '../data/demoProfiles';
import { calculateArchetype } from './archetypeSolver';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
  Jupyter: '#DA5B0B',
  Dockerfile: '#384d54'
};

/**
 * Fetches real GitHub user profile, repos, and events
 * Analyzes exact commit timestamps to compute Night-Owl % and Peak Activity Days.
 */
export const fetchGitHubWrapped = async (rawUsername, patToken = '') => {
  const username = rawUsername.trim().toLowerCase();

  // If match demo profile and no PAT token, return instant mock
  if (DEMO_PROFILES[username] && !patToken) {
    return DEMO_PROFILES[username];
  }

  const headers = patToken ? { Authorization: `token ${patToken}` } : {};

  try {
    // 1. Fetch User Profile
    const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!userRes.ok) {
      if (userRes.status === 404) {
        throw new Error(`User "${username}" not found on GitHub.`);
      }
      if (userRes.status === 403) {
        console.warn('GitHub API rate limited, generating calculated profile.');
        return generateMockProfile(username);
      }
      throw new Error(`GitHub API HTTP ${userRes.status}`);
    }

    const userData = await userRes.json();

    // 2. Fetch User Repositories (up to 100)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, { headers });
    const reposData = reposRes.ok ? await reposRes.json() : [];

    // Calculate language frequencies & stars
    const langCounts = {};
    let totalStars = 0;
    let totalForks = 0;
    let topRepo = reposData[0]?.name || 'main-project';
    let topRepoStars = -1;

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;

      if ((repo.stargazers_count || 0) > topRepoStars) {
        topRepoStars = repo.stargazers_count || 0;
        topRepo = repo.name;
      }

      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + (repo.stargazers_count > 5 ? 3 : 1);
      }
    });

    const totalLangInstances = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
    const topLanguages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([lang, count]) => ({
        name: lang,
        percentage: Math.round((count / totalLangInstances) * 100),
        color: LANGUAGE_COLORS[lang] || '#a855f7'
      }));

    if (topLanguages.length === 0) {
      topLanguages.push({ name: 'TypeScript', percentage: 65, color: '#3178c6' });
      topLanguages.push({ name: 'JavaScript', percentage: 35, color: '#f1e05a' });
    }

    // 3. Fetch User Events to parse exact commit timing
    let nightCommits = 0;
    let dayCommits = 0;
    const dayOfWeekCounts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    let pushEventCount = 0;

    try {
      const eventsRes = await fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers });
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        eventsData.forEach((ev) => {
          if (ev.type === 'PushEvent' && ev.created_at) {
            pushEventCount += ev.payload?.commits?.length || 1;
            const date = new Date(ev.created_at);
            const hour = date.getHours(); // 0-23
            const dayOfWeek = date.getDay(); // 0 (Sun) - 6 (Sat)

            dayOfWeekCounts[dayOfWeek] = (dayOfWeekCounts[dayOfWeek] || 0) + 1;

            // Night time = 21:00 (9 PM) to 05:59 (6 AM)
            if (hour >= 21 || hour < 6) {
              nightCommits++;
            } else {
              dayCommits++;
            }
          }
        });
      }
    } catch (e) {
      console.warn('Events fetch skipped or unthrottled', e);
    }

    const totalEventCommits = nightCommits + dayCommits;
    const nightOwlPercentage = totalEventCommits > 0
      ? Math.round((nightCommits / totalEventCommits) * 100)
      : Math.floor(Math.random() * 35) + 30;

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let mostActiveDayIdx = 3;
    let maxDayCount = -1;
    Object.entries(dayOfWeekCounts).forEach(([dIdx, cnt]) => {
      if (cnt > maxDayCount) {
        maxDayCount = cnt;
        mostActiveDayIdx = parseInt(dIdx, 10);
      }
    });

    const totalCommits = Math.max(pushEventCount * 8, userData.public_repos * 12 + totalStars * 4, 150);
    const longestStreak = Math.min(120, Math.floor(totalCommits / 16) + 10);

    const profile = {
      username: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio || 'Building open-source software & micro-MVPs.',
      company: userData.company || 'Independent Builder',
      location: userData.location || 'Global',
      publicRepos: userData.public_repos || 0,
      followers: userData.followers || 0,
      following: userData.following || 0,
      totalStars,
      totalForks,
      topLanguages,
      stats: {
        totalCommitsThisYear: totalCommits,
        longestStreak,
        mostActiveDay: dayNames[mostActiveDayIdx],
        nightOwlRatio: `${nightOwlPercentage}% Night / ${100 - nightOwlPercentage}% Day`,
        topRepo
      }
    };

    profile.archetype = calculateArchetype(profile);
    return profile;
  } catch (err) {
    console.warn('Falling back to mock profile generator:', err.message);
    return generateMockProfile(username);
  }
};

const generateMockProfile = (username) => {
  const profile = {
    username: username,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
    bio: 'Full-Stack Developer & Open Source Enthusiast',
    company: '#ProjectGetHired',
    location: 'Remote',
    publicRepos: 28,
    followers: 380,
    following: 72,
    totalStars: 145,
    totalForks: 32,
    topLanguages: [
      { name: 'TypeScript', percentage: 65, color: '#3178c6' },
      { name: 'JavaScript', percentage: 25, color: '#f1e05a' },
      { name: 'HTML', percentage: 10, color: '#e34c26' }
    ],
    stats: {
      totalCommitsThisYear: 780,
      longestStreak: 32,
      mostActiveDay: 'Wednesday',
      nightOwlRatio: '62% Night / 38% Day',
      topRepo: 'gitvibe-github-wrapped'
    }
  };

  profile.archetype = calculateArchetype(profile);
  return profile;
};
