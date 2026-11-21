import React from 'react';
import { Award, BookOpen, HelpCircle, Star, Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface TopHudProps {
  title?: string;
  stars: number;
  badgeCount: number;
  totalBadges?: number;
  musicEnabled: boolean;
  voEnabled: boolean;
  onToggleMusic: () => void;
  onToggleVo: () => void;
  onBackToMaterial?: () => void;
  onOpenHelp?: () => void;
  showProgressStats?: boolean;
}

export const TopHud: React.FC<TopHudProps> = ({
  title,
  stars,
  badgeCount,
  totalBadges = 4,
  musicEnabled,
  voEnabled,
  onToggleMusic,
  onToggleVo,
  onBackToMaterial,
  onOpenHelp,
  showProgressStats = true,
}) => {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 pt-3 pb-2 flex flex-wrap items-center justify-between gap-3 z-30 relative no-print">
      {/* Left: Title or Stats */}
      <div className="flex items-center gap-3 flex-wrap">
        {title && (
          <h2 className="font-display text-lg md:text-xl font-bold text-slate-800 bg-white/90 px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
            {title}
          </h2>
        )}

        {showProgressStats && (
          <div className="flex items-center gap-4 bg-white/95 px-4 py-2 rounded-2xl border border-slate-200 shadow-xs text-sm font-bold tabular-nums">
            <div className="flex items-center gap-1.5 text-amber-600" title="Total Bintang">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span>{stars}</span>
              <span className="text-slate-500 font-semibold hidden sm:inline">Bintang</span>
            </div>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <div className="flex items-center gap-1.5 text-teal-700" title="Lencana Peran">
              <Award className="w-5 h-5 text-teal-600" />
              <span>
                {badgeCount}/{totalBadges}
              </span>
              <span className="text-slate-500 font-semibold hidden sm:inline">Lencana</span>
            </div>
          </div>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {onBackToMaterial && (
          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onBackToMaterial();
            }}
            onMouseEnter={() => audioEngine.playHoverPop()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 font-bold text-sm shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Baca Materi Lagi</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            audioEngine.playWoodTap();
            onToggleMusic();
          }}
          aria-label={musicEnabled ? 'Matikan Musik' : 'Nyalakan Musik'}
          title={musicEnabled ? 'Musik Nyala' : 'Musik Mati'}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
            musicEnabled
              ? 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Music className="w-4 h-4" />
          <span className="hidden sm:inline">{musicEnabled ? 'Musik On' : 'Musik Off'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            audioEngine.playWoodTap();
            onToggleVo();
          }}
          aria-label={voEnabled ? 'Matikan Sulih Suara' : 'Nyalakan Sulih Suara'}
          title={voEnabled ? 'Sulih Suara Nyala' : 'Sulih Suara Mati'}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border font-bold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
            voEnabled
              ? 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          {voEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span className="hidden sm:inline">{voEnabled ? 'Suara On' : 'Suara Off'}</span>
        </button>

        {onOpenHelp && (
          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onOpenHelp();
            }}
            onMouseEnter={() => audioEngine.playHoverPop()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Cara Bermain</span>
          </button>
        )}
      </div>
    </header>
  );
};
