import React from 'react';
import { X, Sparkles, Quote, Award, CheckCircle2 } from 'lucide-react';

export default function ArchetypeBadge({ archetype, onClose }) {
  if (!archetype) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="glass-card-glow w-full max-w-md bg-[#0e1526] border border-cyan-500/30 rounded-3xl p-6 relative shadow-2xl space-y-4">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 pt-2">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-4xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20 animate-bounce">
            {archetype.badgeEmoji}
          </div>

          <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Developer Persona Archetype
          </span>

          <h3 className="font-heading text-2xl font-extrabold text-white">
            {archetype.title}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed px-2">
            {archetype.description}
          </p>
        </div>

        {/* Persona Quote */}
        {archetype.quote && (
          <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 flex items-start gap-3">
            <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs italic text-amber-200 font-serif">
              {archetype.quote}
            </p>
          </div>
        )}

        {/* Key Traits */}
        <div className="space-y-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Signature Developer Traits:
          </span>
          <div className="space-y-1.5">
            {archetype.traits.map((trait, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{trait}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-amber-400 hover:from-cyan-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-lg transition-all"
        >
          Got it!
        </button>

      </div>
    </div>
  );
}
