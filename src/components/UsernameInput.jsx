import React, { useState } from 'react';
import { Search, Sparkles, Github, Loader2, ArrowRight } from 'lucide-react';
import { DEMO_PROFILES } from '../data/demoProfiles';

export default function UsernameInput({ onFetch, isLoading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onFetch(username.trim());
    }
  };

  const handleDemoClick = (demoKey) => {
    setUsername(demoKey);
    onFetch(demoKey);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-500"></div>
        
        <div className="relative flex items-center bg-[#0d1322] border border-slate-700/80 rounded-2xl p-2 shadow-2xl">
          <div className="pl-3 pr-2 text-slate-400">
            <Github className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username (e.g. torvalds, karpathy, gaearon)..."
            className="w-full bg-transparent py-2.5 px-2 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono-tech"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 disabled:opacity-50 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-lg transition-all shrink-0 active:scale-95 touch-active cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span className="hidden sm:inline">Fetching...</span>
              </>
            ) : (
              <>
                <span>Wrap It</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* 1-Click Instant Demo Profile Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Try Famous Profiles:
        </span>

        {Object.keys(DEMO_PROFILES).map((key) => (
          <button
            key={key}
            onClick={() => handleDemoClick(key)}
            disabled={isLoading}
            className="px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-all shadow-md active:scale-95 cursor-pointer"
          >
            @{key}
          </button>
        ))}
      </div>

    </div>
  );
}
