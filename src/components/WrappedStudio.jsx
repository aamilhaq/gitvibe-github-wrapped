import React, { useState, useRef } from 'react';
import StoryCard from './StoryCard';
import ArchetypeBadge from './ArchetypeBadge';
import { 
  Download, 
  Share2, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Palette, 
  Check, 
  Info,
  RotateCcw,
  Target,
  Key,
  X
} from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export default function WrappedStudio({ profile, onReset, onReFetchWithPAT }) {
  const [cardFormat, setCardFormat] = useState('9:16'); // '9:16' | '16:9'
  const [theme, setTheme] = useState('cyberpunk'); // 'cyberpunk' | 'gold' | 'synthwave' | 'nord'
  const [customGoal, setCustomGoal] = useState('Day 2 of #ProjectGetHired 🚀');
  const [showArchetypeModal, setShowArchetypeModal] = useState(false);
  const [showPATModal, setShowPATModal] = useState(false);
  const [patInput, setPatInput] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);

  const cardRef = useRef(null);

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      const node = cardRef.current;
      const dataUrl = await toPng(node, { 
        cacheBust: true, 
        pixelRatio: 2,
        width: node.offsetWidth,
        height: node.offsetHeight,
        style: {
          transform: 'none',
          margin: '0',
          boxSizing: 'border-box'
        }
      });

      const link = document.createElement('a');
      link.download = `gitvibe_${profile.username}_${cardFormat.replace(':', 'x')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export card image:', err);
      alert('Could not export PNG. Please try taking a screenshot!');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyShareText = () => {
    const text = `🚀 My 2026 Developer GitVibe Wrapped!

👤 Developer: @${profile.username}
🎭 Persona: ${profile.archetype?.title || 'Builder'} ${profile.archetype?.badgeEmoji || '⚡'}
⭐ Stars: ${profile.totalStars}
⚡ Commits: ${profile.stats?.totalCommitsThisYear}
🔥 Streak: ${profile.stats?.longestStreak} days
🎯 Goal: ${customGoal}

Built for #ProjectGetHired 🚀`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyPAT = (e) => {
    e.preventDefault();
    if (patInput.trim()) {
      onReFetchWithPAT(profile.username, patInput.trim());
      setShowPATModal(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-20 md:pb-10">
      
      {/* Studio Toolbar Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Format Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full md:w-auto justify-center">
            <button
              onClick={() => setCardFormat('9:16')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                cardFormat === '9:16'
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 Story</span>
            </button>

            <button
              onClick={() => setCardFormat('16:9')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                cardFormat === '16:9'
                  ? 'bg-gradient-to-r from-cyan-500 to-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>16:9 Social</span>
            </button>
          </div>

          {/* Theme Picker */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              Theme:
            </span>

            {[
              { id: 'cyberpunk', label: 'Cyberpunk', color: 'bg-pink-500' },
              { id: 'gold', label: 'Amalfi Gold', color: 'bg-amber-500' },
              { id: 'synthwave', label: 'Synthwave', color: 'bg-purple-500' },
              { id: 'nord', label: 'Nord Ice', color: 'bg-cyan-500' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
                  theme === t.id
                    ? 'border-white text-white font-bold bg-slate-800'
                    : 'border-slate-800 text-slate-400 hover:text-slate-200 bg-slate-900/60'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${t.color}`} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Controls: Private Repos PAT & Reset */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <button
              onClick={() => setShowPATModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
              title="Include private repos via Personal Access Token"
            >
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Private Repos</span>
            </button>

            <button
              onClick={() => setShowArchetypeModal(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-all"
              title="Inspect Persona Breakdown"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
              title="Search another username"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Custom Goal Banner Input */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs">
          <Target className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="font-semibold text-slate-300 shrink-0">Custom Sprint Goal Tag:</span>
          <input
            type="text"
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="e.g. Day 2 of #ProjectGetHired..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

      </div>

      {/* Main Studio Preview Stage */}
      <div className="flex flex-col items-center justify-center space-y-6 overflow-x-hidden">
        
        {/* Story Card Render */}
        <StoryCard
          profile={profile}
          cardFormat={cardFormat}
          theme={theme}
          customGoal={customGoal}
          cardRef={cardRef}
        />

        {/* Download & Share Action Bar */}
        <div className="flex items-center gap-3 flex-wrap justify-center max-w-md w-full">
          
          <button
            onClick={handleDownloadPNG}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-extrabold py-3 px-6 rounded-2xl text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all active:scale-95 touch-active cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isExporting ? 'Exporting HD PNG...' : 'Download HD Card (PNG)'}</span>
          </button>

          <button
            onClick={handleCopyShareText}
            className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 py-3 px-5 rounded-2xl text-xs font-bold transition-all active:scale-95 touch-active cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Copied!' : 'Copy Share Text'}</span>
          </button>

        </div>

      </div>

      {/* Archetype Breakdown Modal */}
      {showArchetypeModal && (
        <ArchetypeBadge
          archetype={profile.archetype}
          onClose={() => setShowArchetypeModal(false)}
        />
      )}

      {/* PAT Token Modal */}
      {showPATModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-slate-800 relative shadow-2xl space-y-4">
            <button
              onClick={() => setShowPATModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Include Private Repos</h3>
                <p className="text-xs text-slate-400">GitHub Personal Access Token (PAT)</p>
              </div>
            </div>

            <form onSubmit={handleApplyPAT} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fine-Grained PAT Token (Read-Only)
                </label>
                <input
                  type="password"
                  value={patInput}
                  onChange={(e) => setPatInput(e.target.value)}
                  placeholder="github_pat_11..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50"
                />
                <p className="text-[11px] text-slate-400 mt-1.5">
                  Allows fetching private repositories and commit statistics. Token is processed client-side and never stored on any server.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPATModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-cyan-500/20"
                >
                  Re-fetch Verified Stats
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
