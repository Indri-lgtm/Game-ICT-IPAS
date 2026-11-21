import React, { useEffect, useRef, useState } from 'react';
import { HelpCircle, Music, Play, Volume2, VolumeX, X } from 'lucide-react';
import { CartoonCharacter } from './Characters';
import { audioEngine } from '../utils/audioEngine';

interface Frame1SplashProps {
  musicEnabled: boolean;
  voEnabled: boolean;
  onToggleMusic: () => void;
  onToggleVo: () => void;
  onStart: () => void;
}

export const Frame1Splash: React.FC<Frame1SplashProps> = ({
  musicEnabled,
  voEnabled,
  onToggleMusic,
  onToggleVo,
  onStart,
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const hasTriggeredWelcome = useRef(false);

  const handleFirstInteraction = () => {
    if (hasTriggeredWelcome.current) return;
    hasTriggeredWelcome.current = true;
    if (musicEnabled) {
      audioEngine.startBackgroundMusic();
    }
    audioEngine.speak(
      'Halo teman-teman hebat kelas 4! Selamat datang di Petualangan Peran dan Tugasku! Siap menjelajahi sekolah dan lingkungan sekitar? Klik tombol Ayo Mulai, ya!',
      'kid'
    );
  };

  useEffect(() => {
    const onPointerDown = () => handleFirstInteraction();
    window.addEventListener('pointerdown', onPointerDown, { once: true });
    return () => window.removeEventListener('pointerdown', onPointerDown);
  });

  return (
    <div
      onClick={handleFirstInteraction}
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 select-none"
    >
      {/* Animated Sky Backdrop: Spinning Sunbeams, Drifting Clouds, Flying Birds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Rotating Sun */}
        <div className="absolute -top-14 -left-14 w-56 h-56 opacity-80">
          <svg viewBox="0 0 200 200" className="w-full h-full animate-sun-spin">
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x="95"
                y="6"
                width="10"
                height="28"
                rx="5"
                fill="#FDE047"
                transform={`rotate(${i * 30} 100 100)`}
              />
            ))}
            <circle cx="100" cy="100" r="46" fill="#FACC15" />
          </svg>
        </div>

        {/* Cloud 1 */}
        <div className="absolute top-12 left-0 w-44 opacity-90 animate-cloud-slow">
          <svg viewBox="0 0 180 70" className="w-full">
            <path
              d="M35 55 H145 C160 55 170 44 166 31 C163 20 151 16 141 19 C135 6 116 1 102 9 C92 0 70 2 62 15 C49 12 34 20 31 32 C19 34 14 48 24 53 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* Cloud 2 */}
        <div className="absolute top-28 right-0 w-52 opacity-80 animate-cloud-reverse">
          <svg viewBox="0 0 180 70" className="w-full">
            <path
              d="M35 55 H145 C160 55 170 44 166 31 C163 20 151 16 141 19 C135 6 116 1 102 9 C92 0 70 2 62 15 C49 12 34 20 31 32 C19 34 14 48 24 53 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* Flying Birds */}
        <div className="absolute top-24 left-0 animate-bird">
          <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
            <path d="M4 18 Q12 8 20 16 Q28 8 36 18" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M36 10 Q42 2 48 9 Q54 2 60 10" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Pastel City & School Skyline + Park Ground */}
        <svg
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 w-full h-[52vh]"
        >
          {/* Distant Pastel City Silhouette */}
          <rect x="60" y="130" width="90" height="190" rx="8" fill="#BAE6FD" />
          <rect x="170" y="95" width="110" height="225" rx="8" fill="#DDD6FE" />
          <rect x="1150" y="105" width="105" height="215" rx="8" fill="#FDE68A" />
          <rect x="1275" y="140" width="95" height="180" rx="8" fill="#BAE6FD" />

          {/* Rolling Green Hills */}
          <path d="M0 280 Q360 210 720 265 Q1080 310 1440 240 L1440 420 L0 420 Z" fill="#86EFAC" />
          <path d="M0 320 Q420 270 860 320 Q1180 350 1440 300 L1440 420 L0 420 Z" fill="#4ADE80" />

          {/* School Gate Building (Center Left) */}
          <rect x="380" y="150" width="320" height="165" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="4" />
          <path d="M360 155 L540 88 L720 155 Z" fill="#F97316" stroke="#C2410C" strokeWidth="4" strokeLinejoin="round" />
          {/* School Sign */}
          <rect x="462" y="128" width="156" height="30" rx="6" fill="#FFFFFF" stroke="#B45309" strokeWidth="2.5" />
          <text x="540" y="148" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9A3412">
            SD NUSANTARA
          </text>
          {/* Gate Arch */}
          <rect x="495" y="218" width="90" height="97" rx="45" fill="#93C5FD" stroke="#B45309" strokeWidth="4" />
          {/* School Windows */}
          <rect x="410" y="192" width="46" height="44" rx="6" fill="#E0F2FE" stroke="#D97706" strokeWidth="3" />
          <rect x="624" y="192" width="46" height="44" rx="6" fill="#E0F2FE" stroke="#D97706" strokeWidth="3" />

          {/* City Park Pavilion & Trees (Right) */}
          <circle cx="880" cy="230" r="46" fill="#22C55E" />
          <rect x="872" y="268" width="16" height="50" fill="#92400E" />
          <circle cx="1010" cy="242" r="38" fill="#16A34A" />
          <rect x="1003" y="274" width="14" height="44" fill="#92400E" />
          {/* Park Bench */}
          <rect x="916" y="288" width="66" height="10" rx="3" fill="#B45309" />
          <rect x="922" y="298" width="8" height="18" fill="#78350F" />
          <rect x="968" y="298" width="8" height="18" fill="#78350F" />

          {/* Brick Pathway */}
          <path d="M510 315 L580 315 L690 420 L400 420 Z" fill="#FDE68A" />
        </svg>
      </div>

      {/* Top Right Controls */}
      <div className="relative z-20 w-full flex justify-end items-center gap-2.5 p-4 md:px-8">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playWoodTap();
            onToggleMusic();
          }}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 font-bold text-sm shadow-sm transition-colors cursor-pointer min-h-[42px] ${
            musicEnabled
              ? 'bg-white/95 border-teal-400 text-teal-800 hover:bg-teal-50'
              : 'bg-white/80 border-slate-300 text-slate-500'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>{musicEnabled ? 'Musik Nyala' : 'Musik Mati'}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playWoodTap();
            onToggleVo();
          }}
          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 font-bold text-sm shadow-sm transition-colors cursor-pointer min-h-[42px] ${
            voEnabled
              ? 'bg-white/95 border-sky-400 text-sky-800 hover:bg-sky-50'
              : 'bg-white/80 border-slate-300 text-slate-500'
          }`}
        >
          {voEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          <span>{voEnabled ? 'Sulih Suara' : 'Suara Mati'}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playWoodTap();
            setShowHelp(true);
          }}
          onMouseEnter={() => audioEngine.playHoverPop()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-300 hover:bg-amber-400 text-amber-950 border-2 border-amber-500 font-bold text-sm shadow-sm transition-colors cursor-pointer min-h-[42px]"
        >
          <HelpCircle className="w-4 h-4" />
          <span>? Cara Bermain</span>
        </button>
      </div>

      {/* Top Center Curved Glossy 3D Title */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-1 flex flex-col items-center">
        <svg viewBox="0 0 820 185" className="w-full max-w-[760px] drop-shadow-xl overflow-visible">
          <defs>
            <path id="titleArch" d="M 60 148 Q 410 26 760 148" fill="none" />
            <linearGradient id="glossyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="48%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* 3D Extrusion Shadow Layer */}
          <text
            fontFamily="Fredoka, sans-serif"
            fontSize="45"
            fontWeight="700"
            fill="#0F766E"
            stroke="#0F766E"
            strokeWidth="12"
            strokeLinejoin="round"
            transform="translate(0, 8)"
          >
            <textPath href="#titleArch" startOffset="50%" textAnchor="middle">
              PETUALANGAN PERAN &amp; TUGASKU
            </textPath>
          </text>
          {/* White Outline Layer */}
          <text
            fontFamily="Fredoka, sans-serif"
            fontSize="45"
            fontWeight="700"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="10"
            strokeLinejoin="round"
          >
            <textPath href="#titleArch" startOffset="50%" textAnchor="middle">
              PETUALANGAN PERAN &amp; TUGASKU
            </textPath>
          </text>
          {/* Glossy Gradient Front Layer */}
          <text
            fontFamily="Fredoka, sans-serif"
            fontSize="45"
            fontWeight="700"
            fill="url(#glossyGrad)"
          >
            <textPath href="#titleArch" startOffset="50%" textAnchor="middle">
              PETUALANGAN PERAN &amp; TUGASKU
            </textPath>
          </text>
        </svg>

        <p className="font-display text-base md:text-lg font-semibold text-teal-900 bg-white/85 px-5 py-1.5 rounded-2xl border border-teal-200 shadow-xs -mt-4">
          Bab 6 · Peranku di Lingkungan Sekolah &amp; Masyarakat · Kelas 4 SD
        </p>
      </div>

      {/* Center: 5 Cartoon Kids Waving */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex items-end justify-center gap-2 sm:gap-5 md:gap-8 mt-4">
        <CartoonCharacter id="dara" pose="wave" showName className="w-24 sm:w-28 md:w-32 h-32 md:h-40" />
        <CartoonCharacter id="banu" pose="wave" showName className="w-24 sm:w-28 md:w-32 h-32 md:h-40" />
        <CartoonCharacter id="mia" pose="wave" showName className="w-26 sm:w-32 md:w-36 h-36 md:h-44 -translate-y-2" />
        <CartoonCharacter id="ian" pose="wave" showName className="w-24 sm:w-28 md:w-32 h-32 md:h-40" />
        <CartoonCharacter id="aga" pose="wave" showName className="w-24 sm:w-28 md:w-32 h-32 md:h-40" />
      </div>

      {/* Bottom: Large 3D Turquoise Capsule Start Button */}
      <div className="relative z-20 pb-8 pt-4 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFirstInteraction();
            audioEngine.playWoodTap();
            onStart();
          }}
          onMouseEnter={() => audioEngine.playHoverPop()}
          className="btn-3d-teal inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 text-white font-display text-2xl md:text-3xl font-bold tracking-wide border-4 border-white cursor-pointer"
        >
          <Play className="w-7 h-7 fill-white" />
          <span>AYO MULAI!</span>
        </button>
        <p className="text-xs font-semibold text-emerald-950/75">
          Klik tombol atau layar untuk memulai petualangan dan suara pemandu
        </p>
      </div>

      {/* Cara Bermain Modal */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-white rounded-3xl border-4 border-amber-300 max-w-lg w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-2xl font-bold text-teal-800">
                Cara Bermain Petualangan
              </h3>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ol className="space-y-3 text-slate-700 font-medium text-base leading-relaxed">
              <li className="flex gap-3">
                <span className="font-display font-bold text-teal-700">1.</span>
                <span>Pelajari tujuan belajar dan balik kartu konsep untuk mengenal arti peran dan tugas.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-teal-700">2.</span>
                <span>Buka Zona 1 Sekolah Ceria di peta, lalu klik ke-4 tokoh yang bergerak untuk melihat perannya.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-teal-700">3.</span>
                <span>Jawab 5 tantangan kuis untuk mengumpulkan bintang dan membuka kunci Zona 2 Lingkungan Masyarakat.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-display font-bold text-teal-700">4.</span>
                <span>Selesaikan kedua zona untuk meraih 4 Lencana Peran dan cetak sertifikatmu!</span>
              </li>
            </ol>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  audioEngine.playWoodTap();
                  setShowHelp(false);
                }}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer"
              >
                Siap Mengerti!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
