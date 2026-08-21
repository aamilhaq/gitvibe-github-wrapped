import React from 'react';
import { 
  Star, 
  GitFork, 
  BookOpen, 
  Flame, 
  Calendar, 
  Moon, 
  Sparkles, 
  Github,
  Zap,
  Code,
  Target
} from 'lucide-react';

export default function StoryCard({ 
  profile, 
  cardFormat = '9:16', 
  theme = 'cyberpunk',
  customGoal = 'Day 2 of #ProjectGetHired 🚀',
  cardRef
}) {
  if (!profile) return null;

  const isVertical = cardFormat === '9:16';

  const themeClasses = {
    cyberpunk: 'theme-cyberpunk text-slate-100',
    gold: 'theme-gold text-amber-100',
    synthwave: 'theme-synthwave text-purple-100',
    nord: 'theme-nord text-slate-100'
  };

  const accentColor = {
    cyberpunk: 'text-pink-400 border-pink-500/40 bg-pink-500/10',
    gold: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    synthwave: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
    nord: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10'
  }[theme];

  return (
    <div
      ref={cardRef}
      className={`rounded-3xl p-6 border shadow-2xl relative overflow-hidden transition-all duration-500 mx-auto ${
        themeClasses[theme]
      } ${
        isVertical
          ? 'w-[340px] sm:w-[380px] min-h-[620px] flex flex-col justify-between'
          : 'w-full max-w-2xl min-h-[400px] flex flex-col justify-between'
      }`}
    >
      {/* Background Subtle Mesh Glow */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header: User Avatar & Handle */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-14 h-14 rounded-2xl border-2 border-white/20 shadow-lg object-cover"
            />
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white leading-tight">
                {profile.name}
              </h3>
              <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                @{profile.username}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase rounded-full bg-white/10 text-white border border-white/20">
              GITVIBE 2026
            </span>
          </div>
        </div>

        {/* Custom Goal Banner (if set) */}
        {customGoal && (
          <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
            <Target className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-semibold text-white truncate">{customGoal}</span>
          </div>
        )}

        {/* Archetype Persona Badge Pill */}
        {profile.archetype && (
          <div className={`p-3 rounded-2xl border flex items-center gap-3 ${accentColor}`}>
            <span className="text-2xl">{profile.archetype.badgeEmoji}</span>
            <div className="flex-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-75 block">
                Verified Developer Persona
              </span>
              <span className="font-heading text-sm font-extrabold text-white">
                {profile.archetype.title}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Middle Section: Key Metrics Grid */}
      <div className="relative z-10 my-4 space-y-3.5">
        
        <div className="grid grid-cols-3 gap-2">
          
          <div className="bg-slate-950/70 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold uppercase opacity-70 block mb-0.5">Total Stars</span>
            <span className="font-mono-tech text-base sm:text-lg font-bold text-amber-300 flex items-center justify-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              {profile.totalStars}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold uppercase opacity-70 block mb-0.5">Commits</span>
            <span className="font-mono-tech text-base sm:text-lg font-bold text-cyan-300 flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-300" />
              {profile.stats?.totalCommitsThisYear || 500}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] font-bold uppercase opacity-70 block mb-0.5">Streak</span>
            <span className="font-mono-tech text-base sm:text-lg font-bold text-rose-300 flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              {profile.stats?.longestStreak || 14}d
            </span>
          </div>

        </div>

        {/* Top Languages Stack */}
        <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="opacity-80 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5" />
              Primary Stack
            </span>
            <span className="font-mono text-[11px] opacity-60">
              {profile.publicRepos} Public Repos
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden flex">
            {profile.topLanguages.map((lang, idx) => (
              <div
                key={idx}
                style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                className="h-full transition-all"
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Language Legend */}
          <div className="flex items-center gap-3 flex-wrap text-[11px] pt-1">
            {profile.topLanguages.map((lang, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="font-medium text-slate-200">{lang.name}</span>
                <span className="opacity-60 font-mono text-[10px]">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timing & Peak Activity */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] opacity-60 block">Commit Rhythm</span>
              <span className="font-semibold text-slate-200">{profile.stats?.nightOwlRatio || 'Night Owl'}</span>
            </div>
          </div>

          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] opacity-60 block">Peak Active Day</span>
              <span className="font-semibold text-slate-200">{profile.stats?.mostActiveDay || 'Wednesday'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Card Footer: #ProjectGetHired Branding Watermark */}
      <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
          <span>#ProjectGetHired</span>
        </div>

        <span className="font-mono text-slate-400 text-[10px]">
          gitvibe.dev
        </span>
      </div>

    </div>
  );
}
