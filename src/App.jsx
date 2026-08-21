import React, { useState, useEffect } from 'react';
import UsernameInput from './components/UsernameInput';
import WrappedStudio from './components/WrappedStudio';
import { fetchGitHubWrapped } from './services/githubApi';
import { DEMO_PROFILES } from './data/demoProfiles';
import { Github, Sparkles, Flame, Code2, Layers, Award } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial auto-load with demo profile so studio is immediately populated on load
  useEffect(() => {
    setProfile(DEMO_PROFILES.torvalds);
  }, []);

  const handleFetchUser = async (username, patToken = '') => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const data = await fetchGitHubWrapped(username, patToken);
      setProfile(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to fetch GitHub profile data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <div>
        {/* Navigation Header */}
        <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-slate-950 font-bold">
                <Github className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                    Git<span className="text-cyan-400">Vibe</span>
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Day 2 MVP
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Developer GitHub Wrapped & Archetype Card Studio
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>

          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 lg:px-8 pt-6">
          
          {/* Day 2 #ProjectGetHired Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 mb-8 relative overflow-hidden bg-gradient-to-r from-cyan-950/20 via-slate-900/40 to-slate-950/60 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-3 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Flame className="w-3.5 h-3.5 fill-cyan-400" />
                <span>Day 2 of #ProjectGetHired</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Your Developer GitHub <span className="text-cyan-400">Wrapped Studio</span> 🐙
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Generate 3D animated Wrapped cards, unlock your Developer Archetype persona, and export HD story cards ready for LinkedIn, Twitter/X, and Instagram.
              </p>

              {/* Username Input Component */}
              <div className="pt-2">
                <UsernameInput onFetch={handleFetchUser} isLoading={isLoading} />
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl text-xs text-rose-300">
                  {errorMsg}
                </div>
              )}
            </div>
          </div>

          {/* Main Wrapped Studio */}
          {profile && (
            <WrappedStudio
              profile={profile}
              onReset={() => setProfile(null)}
              onReFetchWithPAT={(user, pat) => handleFetchUser(user, pat)}
            />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-4 text-center text-xs text-slate-500 mb-6 sm:mb-0">
        <p>
          Built for <strong className="text-slate-400">#ProjectGetHired</strong> • Day 2 MVP • 100% Open Source & Client-Side Canvas Engine
        </p>
      </footer>

    </div>
  );
}
