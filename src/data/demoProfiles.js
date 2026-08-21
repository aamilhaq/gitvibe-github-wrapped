import { ARCHETYPES } from '../services/archetypeSolver';

export const DEMO_PROFILES = {
  torvalds: {
    username: 'torvalds',
    name: 'Linus Torvalds',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
    bio: 'Creator of Linux & Git.',
    company: 'Linux Foundation',
    location: 'Portland, OR',
    publicRepos: 7,
    followers: 240000,
    following: 0,
    totalStars: 180000,
    totalForks: 54000,
    topLanguages: [
      { name: 'C', percentage: 95, color: '#555555' },
      { name: 'Assembly', percentage: 3, color: '#6E4C13' },
      { name: 'Makefile', percentage: 2, color: '#427819' }
    ],
    archetype: ARCHETYPES.systems_monk,
    stats: {
      totalCommitsThisYear: 3900,
      longestStreak: 120,
      mostActiveDay: 'Sunday',
      nightOwlRatio: '32% Night / 68% Day',
      topRepo: 'linux'
    }
  },

  gaearon: {
    username: 'gaearon',
    name: 'Dan Abramov',
    avatarUrl: 'https://avatars.githubusercontent.com/u/810438?v=4',
    bio: 'Building Bluesky & React ecosystem.',
    company: '@bluesky-social',
    location: 'London, UK',
    publicRepos: 270,
    followers: 86400,
    following: 12,
    totalStars: 42500,
    totalForks: 8900,
    topLanguages: [
      { name: 'JavaScript', percentage: 58, color: '#f7df1e' },
      { name: 'TypeScript', percentage: 32, color: '#3178c6' },
      { name: 'HTML', percentage: 6, color: '#e34c26' },
      { name: 'CSS', percentage: 4, color: '#563d7c' }
    ],
    archetype: ARCHETYPES.titan,
    stats: {
      totalCommitsThisYear: 1420,
      longestStreak: 42,
      mostActiveDay: 'Wednesday',
      nightOwlRatio: '38% Night / 62% Day',
      topRepo: 'redux'
    }
  },

  yyx99: {
    username: 'yyx99',
    name: 'Evan You',
    avatarUrl: 'https://avatars.githubusercontent.com/u/499550?v=4',
    bio: 'Creator of Vue.js & Vite.',
    company: 'VoidZero',
    location: 'Singapore',
    publicRepos: 185,
    followers: 98200,
    following: 95,
    totalStars: 128000,
    totalForks: 24000,
    topLanguages: [
      { name: 'TypeScript', percentage: 68, color: '#3178c6' },
      { name: 'JavaScript', percentage: 22, color: '#f7df1e' },
      { name: 'Vue', percentage: 8, color: '#41b883' },
      { name: 'Rust', percentage: 2, color: '#dea584' }
    ],
    archetype: ARCHETYPES.polyglot,
    stats: {
      totalCommitsThisYear: 2850,
      longestStreak: 88,
      mostActiveDay: 'Monday',
      nightOwlRatio: '20% Night / 80% Day',
      topRepo: 'vue'
    }
  },

  karpathy: {
    username: 'karpathy',
    name: 'Andrej Karpathy',
    avatarUrl: 'https://avatars.githubusercontent.com/u/241138?v=4',
    bio: 'AI Engineer & Educator. Ex-Tesla AI, OpenAI.',
    company: 'Eureka Labs',
    location: 'San Francisco, CA',
    publicRepos: 48,
    followers: 95000,
    following: 7,
    totalStars: 92000,
    totalForks: 14000,
    topLanguages: [
      { name: 'Python', percentage: 85, color: '#3572A5' },
      { name: 'C++', percentage: 10, color: '#f34b7d' },
      { name: 'C', percentage: 5, color: '#555555' }
    ],
    archetype: ARCHETYPES.ai_pioneer,
    stats: {
      totalCommitsThisYear: 1650,
      longestStreak: 52,
      mostActiveDay: 'Tuesday',
      nightOwlRatio: '28% Night / 72% Day',
      topRepo: 'micrograd'
    }
  },

  shadcn: {
    username: 'shadcn',
    name: 'shadcn',
    avatarUrl: 'https://avatars.githubusercontent.com/u/124599?v=4',
    bio: 'Designing components & UI primitives for Vercel.',
    company: 'Vercel',
    location: 'San Francisco, CA',
    publicRepos: 92,
    followers: 74000,
    following: 34,
    totalStars: 85000,
    totalForks: 8200,
    topLanguages: [
      { name: 'TypeScript', percentage: 75, color: '#3178c6' },
      { name: 'CSS', percentage: 15, color: '#563d7c' },
      { name: 'JavaScript', percentage: 10, color: '#f7df1e' }
    ],
    archetype: ARCHETYPES.frontend_craft,
    stats: {
      totalCommitsThisYear: 1980,
      longestStreak: 56,
      mostActiveDay: 'Friday',
      nightOwlRatio: '42% Night / 58% Day',
      topRepo: 'ui'
    }
  }
};
