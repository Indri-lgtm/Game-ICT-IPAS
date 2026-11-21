import React, { useEffect, useState } from 'react';
import { CheckCircle2, Lock, Sparkles, Unlock } from 'lucide-react';
import { ZoneId } from '../types/game';
import { CartoonCharacter } from './Characters';
import { TopHud } from './TopHud';
import { audioEngine } from '../utils/audioEngine';

interface Frame3WorldMapProps {
  stars: number;
  badgeCount: number;
  unlockedZone2: boolean;
  justUnlockedZone2: boolean;
  completedZones: ZoneId[];
  musicEnabled: boolean;
  voEnabled: boolean;
  onToggleMusic: () => void;
  onToggleVo: () => void;
  onBackToMaterial: () => void;
  onSelectZone: (zone: ZoneId) => void;
  onAcknowledgeUnlock: () => void;
}

export const Frame3WorldMap: React.FC<Frame3WorldMapProps> = ({
  stars,
  badgeCount,
  unlockedZone2,
  justUnlockedZone2,
  completedZones,
  musicEnabled,
  voEnabled,
  onToggleMusic,
  onToggleVo,
  onBackToMaterial,
  onSelectZone,
  onAcknowledgeUnlock,
}) => {
  const [walkingTo, setWalkingTo] = useState<ZoneId | null>(null);
  const [lockedMessage, setLockedMessage] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (justUnlockedZone2) {
        audioEngine.playStarSuccess();
        audioEngine.speak(
          'Hore! Gembok Zona Lingkungan Masyarakat sudah terbuka! Ayo kita klik Zona 2 untuk petualangan berikutnya!',
          'cheer'
        );
      } else if (!completedZones.includes('sekolah')) {
        audioEngine.speak(
          'Ayo klik Zona Sekolah Ceria untuk melihat peran dan tugas apa saja yang ada di sana!',
          'kid'
        );
      }
    }, 300);
    return () => {
      window.clearTimeout(timer);
      audioEngine.stopSpeaking();
    };
  }, [justUnlockedZone2, completedZones]);

  const handleZoneClick = (zone: ZoneId) => {
    if (walkingTo) return;

    if (zone === 'masyarakat' && !unlockedZone2) {
      audioEngine.playGentleBoing();
      setLockedMessage(true);
      audioEngine.speak('Selesaikan misi di Sekolah Ceria dulu ya, teman!', 'kid');
      return;
    }

    setLockedMessage(false);
    if (zone === 'sekolah') {
      audioEngine.playSchoolBell();
    } else {
      audioEngine.playVillageBirds();
    }

    if (justUnlockedZone2) {
      onAcknowledgeUnlock();
    }

    setWalkingTo(zone);
    window.setTimeout(() => {
      onSelectZone(zone);
    }, 950);
  };

  const zone1Done = completedZones.includes('sekolah');
  const zone2Done = completedZones.includes('masyarakat');

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 flex flex-col justify-between pb-6 select-none">
      <TopHud
        title="Peta Petualangan Peran"
        stars={stars}
        badgeCount={badgeCount}
        musicEnabled={musicEnabled}
        voEnabled={voEnabled}
        onToggleMusic={onToggleMusic}
        onToggleVo={onToggleVo}
        onBackToMaterial={onBackToMaterial}
      />

      <main className="w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col justify-center gap-4">
        {/* Interactive Isometric 2-Zone Map Board */}
        <div className="relative w-full rounded-3xl bg-gradient-to-b from-sky-200/80 via-emerald-200/70 to-emerald-300/70 border-4 border-white shadow-xl overflow-hidden p-5 md:p-8 min-h-[430px] flex flex-col justify-between">
          {/* Decorative Map Terrain & Dotted Path SVG */}
          <svg
            viewBox="0 0 1000 440"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {/* Soft river / green hills */}
            <path d="M0 110 Q260 60 520 120 Q780 170 1000 95 L1000 440 L0 440 Z" fill="#A7F3D0" opacity="0.7" />
            <path d="M0 240 Q310 190 560 255 Q820 310 1000 220 L1000 440 L0 440 Z" fill="#6EE7B7" opacity="0.55" />

            {/* Winding Footpath connecting Zona 1 & Zona 2 */}
            <path
              d="M 240 250 C 370 290, 460 190, 520 225 C 580 260, 640 285, 765 240"
              fill="none"
              stroke="#FEF3C7"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M 240 250 C 370 290, 460 190, 520 225 C 580 260, 640 285, 765 240"
              fill="none"
              stroke="#D97706"
              strokeWidth="4"
              strokeDasharray="12 12"
              strokeLinecap="round"
            />
          </svg>

          {/* Animated Walking Student Avatar on Path */}
          <div
            className="absolute z-20 pointer-events-none transition-all duration-900 ease-in-out"
            style={{
              left: walkingTo === 'sekolah' ? '23%' : walkingTo === 'masyarakat' ? '73%' : '47%',
              top: walkingTo === 'sekolah' ? '44%' : walkingTo === 'masyarakat' ? '42%' : '48%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="bg-white/95 rounded-full p-1.5 shadow-lg border-2 border-amber-400">
              <CartoonCharacter id="banu" pose={walkingTo ? 'jump' : 'idle'} className="w-14 h-16" />
            </div>
          </div>

          {/* Two Interactive Zone Islands */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center my-auto">
            {/* ZONA 1: SEKOLAH CERIA */}
            <button
              type="button"
              onClick={() => handleZoneClick('sekolah')}
              onMouseEnter={() => audioEngine.playHoverPop()}
              className="group text-left bg-white/95 rounded-3xl p-5 border-4 border-teal-400 shadow-lg transition-all duration-200 hover:scale-[1.06] hover:shadow-[0_0_32px_rgba(250,204,21,0.7)] hover:border-amber-400 cursor-pointer relative"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    Zona 1 · Terbuka
                  </p>
                  <h3 className="font-display text-2xl font-bold text-slate-800">
                    Sekolah Ceria
                  </h3>
                </div>
                {zone1Done ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Selesai
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-lg">
                    <Unlock className="w-4 h-4" /> Ayo Jelajahi
                  </span>
                )}
              </div>

              {/* Isometric School Illustration + Waving Flag */}
              <div className="w-full h-40 rounded-2xl bg-gradient-to-b from-sky-100 to-emerald-100 border border-slate-200 overflow-hidden flex items-end justify-center relative">
                <svg viewBox="0 0 320 150" className="w-full h-full">
                  <rect x="0" y="118" width="320" height="32" fill="#86EFAC" />
                  {/* School Building */}
                  <rect x="74" y="54" width="168" height="72" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
                  <path d="M62 58 L158 18 L254 58 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" />
                  <rect x="138" y="82" width="40" height="44" rx="4" fill="#93C5FD" stroke="#B45309" strokeWidth="2.5" />
                  <rect x="90" y="76" width="30" height="26" rx="4" fill="#E0F2FE" stroke="#D97706" strokeWidth="2" />
                  <rect x="196" y="76" width="30" height="26" rx="4" fill="#E0F2FE" stroke="#D97706" strokeWidth="2" />
                  {/* Flagpole + Waving Merah Putih */}
                  <line x1="42" y1="30" x2="42" y2="126" stroke="#475569" strokeWidth="3.5" />
                  <g className="animate-flag" style={{ transformOrigin: '42px 35px' }}>
                    <rect x="44" y="32" width="34" height="11" fill="#EF4444" />
                    <rect x="44" y="43" width="34" height="11" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
                  </g>
                  {/* School Garden Tree */}
                  <circle cx="278" cy="88" r="24" fill="#22C55E" />
                  <rect x="273" y="106" width="10" height="20" fill="#92400E" />
                </svg>
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-600">
                Gerbang SD, Ruang Kelas, Perpustakaan &amp; Taman Sekolah
              </p>
            </button>

            {/* ZONA 2: LINGKUNGAN MASYARAKAT */}
            <button
              type="button"
              onClick={() => handleZoneClick('masyarakat')}
              onMouseEnter={() => unlockedZone2 && audioEngine.playHoverPop()}
              className={`group text-left rounded-3xl p-5 border-4 shadow-lg transition-all duration-200 relative cursor-pointer ${
                unlockedZone2
                  ? 'bg-white/95 border-amber-400 hover:scale-[1.06] hover:shadow-[0_0_32px_rgba(250,204,21,0.75)]'
                  : 'bg-slate-100/90 border-slate-300 opacity-90 hover:scale-[1.02]'
              }`}
            >
              {/* Starburst Unlock Celebration Overlay */}
              {justUnlockedZone2 && (
                <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-950 px-3 py-1.5 rounded-full font-display font-bold text-xs shadow-lg border-2 border-white flex items-center gap-1 animate-bounce z-20">
                  <Sparkles className="w-4 h-4" /> Baru Terbuka!
                </div>
              )}

              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Zona 2 · {unlockedZone2 ? 'Terbuka' : 'Terkunci'}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-slate-800">
                    Lingkungan Masyarakat
                  </h3>
                </div>

                {!unlockedZone2 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-lg">
                    <Lock className="w-4 h-4" /> Terkunci
                  </span>
                ) : zone2Done ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    <CheckCircle2 className="w-4 h-4" /> Selesai
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                    <Unlock className="w-4 h-4" /> Siap Jelajah
                  </span>
                )}
              </div>

              {/* Isometric Village / Market / Rice Field + Spinning Windmill */}
              <div className="w-full h-40 rounded-2xl bg-gradient-to-b from-sky-100 to-lime-100 border border-slate-200 overflow-hidden flex items-end justify-center relative">
                <svg viewBox="0 0 320 150" className={`w-full h-full ${!unlockedZone2 ? 'grayscale-[45%]' : ''}`}>
                  <rect x="0" y="114" width="320" height="36" fill="#4ADE80" />
                  {/* Market Stall */}
                  <rect x="26" y="72" width="76" height="46" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
                  <path d="M20 72 L108 72 L100 54 L28 54 Z" fill="#EF4444" />
                  {/* Pos Ronda / Puskesmas */}
                  <rect x="122" y="64" width="78" height="54" rx="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
                  <rect x="155" y="74" width="12" height="24" fill="#EF4444" />
                  <rect x="149" y="80" width="24" height="12" fill="#EF4444" />
                  {/* Rice Field & Spinning Windmill */}
                  <rect x="218" y="102" width="90" height="20" rx="4" fill="#22C55E" />
                  <rect x="258" y="54" width="10" height="60" fill="#B45309" />
                  <g className="animate-windmill" style={{ transformOrigin: '263px 56px' }}>
                    <rect x="260" y="24" width="6" height="64" rx="3" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
                    <rect x="231" y="53" width="64" height="6" rx="3" fill="#FFFFFF" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="263" cy="56" r="5" fill="#F59E0B" />
                  </g>
                </svg>

                {!unlockedZone2 && (
                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center">
                    <div className="bg-white/95 p-3 rounded-full shadow-lg border-2 border-slate-300">
                      <Lock className="w-8 h-8 text-slate-600" />
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-600">
                Pos Ronda, Pasar, Taman Warga &amp; Sawah Desa
              </p>
            </button>
          </div>
        </div>

        {/* Bottom: Banu Speech Bubble */}
        <div className="flex items-center gap-4 bg-white rounded-3xl border-2 border-amber-200 px-5 py-3.5 shadow-md max-w-3xl mx-auto w-full">
          <CartoonCharacter id="banu" pose="wave" className="w-16 h-20 shrink-0" />
          <div className="flex-1">
            <span className="font-display font-bold text-amber-800 text-sm block">
              Banu · Teman Petualangmu
            </span>
            <p className="text-base font-bold text-slate-800">
              {lockedMessage
                ? 'Selesaikan misi di Sekolah Ceria dulu ya, teman!'
                : unlockedZone2 && !zone2Done
                ? 'Wah, Zona Lingkungan Masyarakat sudah terbuka! Yuk klik Zona 2 untuk melanjutkan!'
                : zone2Done
                ? 'Hebat! Semua zona sudah kamu jelajahi! Kamu boleh mengulang zona mana saja.'
                : 'Pilih lokasi petualanganmu! Mari kita mulai dari Lingkungan Sekolah dulu, yuk!'}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
