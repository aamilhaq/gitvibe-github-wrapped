export const ARCHETYPES = {
  titan: {
    id: 'titan',
    title: 'Ecosystem Titan',
    badgeEmoji: '👑',
    description: 'Powers the global software engineering industry with foundational open-source architecture and massive developer adoption.',
    traits: ['Ecosystem Architect', 'Global Scale', 'High Star Magnet'],
    quote: '"Building tools that millions of developers rely on every single day."'
  },
  ai_pioneer: {
    id: 'ai_pioneer',
    title: 'AI & ML Pioneer',
    badgeEmoji: '🤖',
    description: 'Pushes the boundaries of artificial intelligence, neural networks, and machine learning models.',
    traits: ['Neural Architect', 'Model Training', 'Python Wizardry'],
    quote: '"Teaching computers to understand, reason, and generate."'
  },
  polyglot: {
    id: 'polyglot',
    title: 'Polyglot Architect',
    badgeEmoji: '⚡',
    description: 'Fluidly navigates across multiple languages, frameworks, and system boundaries with architectural ease.',
    traits: ['Multi-Language Mastery', 'System Flexibility', 'Cross-Platform'],
    quote: '"Right tool for the right job, regardless of stack."'
  },
  systems_monk: {
    id: 'systems_monk',
    title: 'Systems Specialist',
    badgeEmoji: '🏔️',
    description: 'Obsessed with low-level memory safety, zero-overhead abstractions, and metal-level execution speed.',
    traits: ['Zero-Overhead', 'Low-Level Perfection', 'Memory Safety'],
    quote: '"Talk is cheap. Show me the code."'
  },
  frontend_craft: {
    id: 'frontend_craft',
    title: 'Frontend Craftsperson',
    badgeEmoji: '🎨',
    description: 'Transforms code into pixel-perfect user interfaces, fluid animations, and slick component libraries.',
    traits: ['Pixel Perfection', 'UI/UX Polish', 'Component Architecture'],
    quote: '"Beautiful UI is code you actually want to own."'
  },
  speedrunner: {
    id: 'speedrunner',
    title: 'Velocity Speedrunner',
    badgeEmoji: '🚀',
    description: 'Ships features with relentless daily momentum, high commit frequency, and long contribution streaks.',
    traits: ['Daily Streak Master', 'High Velocity', 'Rapid Shipper'],
    quote: '"Move fast, test cleanly, ship daily."'
  },
  innovator: {
    id: 'innovator',
    title: 'Side-Project Innovator',
    badgeEmoji: '💡',
    description: 'Constantly launching micro-MVPs, experimenting with new tech stacks, and building in public.',
    traits: ['Micro-MVP Builder', 'Build in Public', 'Rapid Ideation'],
    quote: '"Saturdays are for shipping new MVPs."'
  },
  bug_hunter: {
    id: 'bug_hunter',
    title: 'Midnight Code Specialist',
    badgeEmoji: '🦇',
    description: 'Crushes edge cases, fixes critical bugs, and pushes commits during deep late-night focus sessions.',
    traits: ['Late-Night Focus', 'Relentless Debugging', 'Edge-Case Specialist'],
    quote: '"Bugs fear the dark because that is when I hunt."'
  },
  reliability: {
    id: 'reliability',
    title: 'Reliability Engineer',
    badgeEmoji: '🛡️',
    description: 'Focuses on production stability, CI/CD automation, and bulletproof system uptime.',
    traits: ['Production Stability', 'CI/CD Automation', 'Robust Tests'],
    quote: '"Uptime is the ultimate feature."'
  },
  rising_star: {
    id: 'rising_star',
    title: 'Rising Open-Source Star',
    badgeEmoji: '🌟',
    description: 'Rapidly building public proof-of-work, growing star count, and leveling up engineering skills.',
    traits: ['Portfolio Builder', 'Proof-of-Work', 'Continuous Growth'],
    quote: '"Shipping proof-of-work, one commit at a time."'
  }
};

/**
 * Evaluates developer stats to compute a highly specific archetype classification
 */
export const calculateArchetype = (profileData) => {
  const { topLanguages, stats, publicRepos, totalStars, followers, bio } = profileData;

  const nightRatioNum = parseInt(stats?.nightOwlRatio || '30', 10);
  const totalCommits = stats?.totalCommitsThisYear || 500;
  const langCount = topLanguages?.length || 1;
  const topLangName = topLanguages?.[0]?.name || '';
  const bioLower = (bio || '').toLowerCase();

  // 1. Ecosystem Titan (Torvalds, Evan You, Dan Abramov level)
  if (totalStars >= 3000 || followers >= 3000) {
    return ARCHETYPES.titan;
  }

  // 2. AI & ML Pioneer
  if (
    topLangName === 'Python' ||
    topLangName === 'Jupyter Notebook' ||
    bioLower.includes('ai') ||
    bioLower.includes('machine learning') ||
    bioLower.includes('llm') ||
    bioLower.includes('pytorch') ||
    bioLower.includes('openai')
  ) {
    return ARCHETYPES.ai_pioneer;
  }

  // 3. Systems Specialist (C, Rust, Go, C++)
  if (['C', 'C++', 'Rust', 'Go', 'Assembly'].includes(topLangName)) {
    return ARCHETYPES.systems_monk;
  }

  // 4. Midnight Code Specialist (Strict > 65% night commits)
  if (nightRatioNum >= 65) {
    return ARCHETYPES.bug_hunter;
  }

  // 5. Frontend Craftsperson
  if (['TypeScript', 'JavaScript', 'Vue', 'CSS', 'HTML'].includes(topLangName) && (publicRepos >= 25 || totalStars >= 200)) {
    return ARCHETYPES.frontend_craft;
  }

  // 6. Polyglot Architect (Multiple languages used)
  if (langCount >= 4 && topLanguages?.[0]?.percentage < 60) {
    return ARCHETYPES.polyglot;
  }

  // 7. Velocity Speedrunner (High commits / long streaks)
  if (totalCommits >= 1200 || (stats?.longestStreak && stats.longestStreak >= 40)) {
    return ARCHETYPES.speedrunner;
  }

  // 8. Side-Project Innovator
  if (publicRepos >= 20) {
    return ARCHETYPES.innovator;
  }

  // 9. Default Rising Star
  return ARCHETYPES.rising_star;
};
