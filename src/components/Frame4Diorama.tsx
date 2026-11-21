import React, { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Gamepad2, Sparkles, Volume2 } from 'lucide-react';
import { DIORAMA_ROLES } from '../data/curriculum';
import { DioramaRole, ZoneId } from '../types/game';
import { ActivityScene, CartoonCharacter } from './Characters';
import { TopHud } from './TopHud';
import { audioEngine } from '../utils/audioEngine';

interface Frame4DioramaProps {
  zone: ZoneId;
  stars: number;
  badgeCount: number;
  discoveredIds: string[];
  musicEnabled: boolean;
  voEnabled: boolean;
  onToggleMusic: () => void;
  onToggleVo: () => void;
  onDiscoverRole: (roleId: string) => void;
  onBackToMap: () => void;
  onStartQuiz: () => void;
}

export const Frame4Diorama: React.FC<Frame4DioramaProps> = ({
  zone,
  stars,
  badgeCount,
  discoveredIds,
  musicEnabled,
  voEnabled,
  onToggleMusic,
  onToggleVo,
  onDiscoverRole,
  onBackToMap,
  onStartQuiz,
}) => {
  const roles = DIORAMA_ROLES.filter((r) => r.zone === zone);
  const [selectedRole, setSelectedRole] = useState<DioramaRole | null>(null);

  const discoveredInZone = roles.filter((r) => discoveredIds.includes(r.id)).length;
  const allDiscovered = discoveredInZone === roles.length;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      audioEngine.speak(
        zone === 'sekolah'
          ? 'Selamat datang di Zona Lingkungan Sekolah! Klik keempat tokoh yang sedang beraktivitas untuk mengenal peran dan tugas mereka.'
          : 'Selamat datang di Zona Lingkungan Masyarakat! Klik keempat tokoh untuk mengamati peran mereka di masyarakat.',
        'teacher'
      );
    }, 300);
    return () => {
      window.clearTimeout(timer);
      audioEngine.stopSpeaking();
    };
  }, [zone]);

  const handleSelectCharacter = (role: DioramaRole) => {
    audioEngine.playActivitySfx(role.activity);
    setSelectedRole(role);
    onDiscoverRole(role.id);
    audioEngine.speak(role.voText, 'teacher');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-white to-emerald-50 flex flex-col justify-between pb-6 select-none">
      <TopHud
        title={zone === 'sekolah' ? 'Zona Lingkungan Sekolah' : 'Zona Lingkungan Masyarakat'}
        stars={stars}
        badgeCount={badgeCount}
        musicEnabled={musicEnabled}
        voEnabled={voEnabled}
        onToggleMusic={onToggleMusic}
        onToggleVo={onToggleVo}
      />

      <main className="w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-4">
        {/* Progress & Back Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/95 px-4 py-3 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onBackToMap();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Peta</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-700 tabular-nums">
              Eksplorasi Tokoh: <strong className="text-teal-700">{discoveredInZone}/4 tokoh ditemukan</strong>
            </span>
            <div className="flex gap-1.5">
              {roles.map((r) => (
                <span
                  key={r.id}
                  className={`w-3.5 h-3.5 rounded-full border ${
                    discoveredIds.includes(r.id)
                      ? 'bg-emerald-500 border-emerald-600'
                      : 'bg-slate-200 border-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Split: Diorama Stage + Side Role Pop-up Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1">
          {/* Interactive Diorama Canvas */}
          <div
            className={`relative rounded-3xl border-4 border-white shadow-xl overflow-hidden min-h-[420px] ${
              selectedRole ? 'lg:col-span-7' : 'lg:col-span-12'
            } transition-all duration-300`}
          >
            {/* Full-Scene Cartoon Vector Diorama Backdrop */}
            {zone === 'sekolah' ? (
              <svg viewBox="0 0 900 460" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {/* Classroom & Schoolyard Sky */}
                <rect width="900" height="290" fill="#E0F2FE" />
                <rect y="290" width="900" height="170" fill="#BBF7D0" />
                {/* Classroom Wall & Blackboard Area */}
                <rect x="30" y="40" width="560" height="260" rx="16" fill="#FEF9C3" stroke="#FDE047" strokeWidth="4" />
                <rect x="290" y="75" width="160" height="88" rx="6" fill="#065F46" stroke="#92400E" strokeWidth="6" />
                <line x1="312" y1="104" x2="420" y2="104" stroke="#FEF9C3" strokeWidth="4" strokeLinecap="round" />
                <line x1="312" y1="126" x2="390" y2="126" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" />
                {/* Classroom Desk */}
                <rect x="110" y="242" width="120" height="58" rx="6" fill="#D97706" />
                {/* Library Bookshelf */}
                <rect x="490" y="88" width="90" height="196" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="3" />
                <rect x="500" y="102" width="70" height="34" fill="#FEF3C7" />
                <rect x="500" y="146" width="70" height="34" fill="#FEF3C7" />
                <rect x="500" y="190" width="70" height="34" fill="#FEF3C7" />
                {/* School Garden */}
                <ellipse cx="760" cy="330" rx="110" ry="38" fill="#4ADE80" />
                <circle cx="715" cy="306" r="10" fill="#F43F5E" />
                <circle cx="755" cy="296" r="10" fill="#FACC15" />
                <circle cx="798" cy="308" r="10" fill="#EC4899" />
                <circle cx="810" cy="180" r="54" fill="#22C55E" />
                <rect x="802" y="228" width="16" height="72" fill="#92400E" />
              </svg>
            ) : (
              <svg viewBox="0 0 900 460" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                {/* Community Sky & Ground */}
                <rect width="900" height="260" fill="#BAE6FD" />
                <path d="M0 245 Q280 205 540 245 Q740 270 900 230 L900 460 L0 460 Z" fill="#86EFAC" />
                {/* Neighborhood Park & Trash Bin */}
                <circle cx="110" cy="180" r="52" fill="#16A34A" />
                <rect x="102" y="226" width="16" height="70" fill="#92400E" />
                <rect x="195" y="275" width="36" height="44" rx="4" fill="#10B981" stroke="#065F46" strokeWidth="2.5" />
                {/* Market Stall */}
                <rect x="300" y="180" width="150" height="115" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
                <path d="M286 184 L464 184 L452 152 L298 152 Z" fill="#EF4444" />
                {/* Green Rice Paddy */}
                <rect x="495" y="268" width="220" height="125" rx="18" fill="#4ADE80" stroke="#16A34A" strokeWidth="3" />
                <path d="M525 310 Q535 280 545 310 M575 310 Q585 280 595 310 M625 310 Q635 280 645 310" fill="none" stroke="#15803D" strokeWidth="3.5" />
                {/* Puskesmas / Clinic */}
                <rect x="705" y="135" width="165" height="150" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
                <rect x="778" y="155" width="18" height="44" rx="3" fill="#EF4444" />
                <rect x="765" y="168" width="44" height="18" rx="3" fill="#EF4444" />
              </svg>
            )}

            {/* Helper Banner Inside Diorama */}
            <div className="relative z-10 m-3 inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-xl border border-slate-200 shadow-xs text-xs sm:text-sm font-bold text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Klik setiap tokoh yang bersinar untuk melihat peran dan gerakannya!</span>
            </div>

            {/* 4 Clickable Animated Characters Positioned in Scene */}
            {roles.map((role) => {
              const isDiscovered = discoveredIds.includes(role.id);
              const isSelected = selectedRole?.id === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleSelectCharacter(role)}
                  onMouseEnter={() => audioEngine.playHoverPop()}
                  style={{
                    left: `${role.position.xPercent}%`,
                    top: `${role.position.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute z-20 group flex flex-col items-center cursor-pointer focus:outline-hidden"
                >
                  {/* Glowing Pulse Ring */}
                  <span
                    className={`absolute -inset-2 rounded-full border-4 transition-opacity ${
                      isSelected
                        ? 'border-amber-400 bg-amber-200/30 opacity-100'
                        : isDiscovered
                        ? 'border-emerald-400/70 opacity-60'
                        : 'border-amber-400 bg-amber-100/35 animate-pulse-ring'
                    }`}
                  />

                  <div className="relative transition-transform duration-200 group-hover:scale-110">
                    <CartoonCharacter
                      id={role.characterId}
                      pose={isSelected ? 'jump' : 'wave'}
                      className="w-20 h-26 sm:w-24 sm:h-30"
                    />
                  </div>

                  <span
                    className={`mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-sm border whitespace-nowrap ${
                      isSelected
                        ? 'bg-amber-400 text-amber-950 border-amber-500'
                        : isDiscovered
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white text-slate-800 border-slate-200'
                    }`}
                  >
                    {isDiscovered && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{isDiscovered ? role.roleName : `Klik ${role.characterLabel}`}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Side Detail Pop-up Panel */}
          {selectedRole && (
            <aside className="lg:col-span-5 bg-white rounded-3xl border-2 border-teal-200 shadow-xl p-5 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                      Profil Peran · {selectedRole.characterLabel}
                    </p>
                    <h3 className="font-display text-2xl font-bold text-slate-800">
                      {selectedRole.roleName}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      audioEngine.playActivitySfx(selectedRole.activity);
                      audioEngine.speak(selectedRole.voText, 'teacher');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs border border-sky-300 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Putar Suara</span>
                  </button>
                </div>

                {/* Close-up Active Action Loop Preview */}
                <div className="flex justify-center">
                  <ActivityScene
                    characterId={selectedRole.characterId}
                    activity={selectedRole.activity}
                    size="lg"
                  />
                </div>

                {/* Role Details */}
                <div className="space-y-3 bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div>
                    <span className="text-xs font-bold uppercase text-teal-700 block">
                      Kegiatan &amp; Tugas
                    </span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {selectedRole.activitiesText}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold uppercase text-amber-700 block">
                      Mengapa Penting?
                    </span>
                    <p className="text-sm font-semibold text-slate-700 leading-relaxed">
                      {selectedRole.whyImportant}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Bottom CTA when all 4 roles are discovered */}
        <div className="flex justify-center pt-1">
          {allDiscovered ? (
            <button
              type="button"
              onClick={() => {
                audioEngine.playStarSuccess();
                onStartQuiz();
              }}
              onMouseEnter={() => audioEngine.playHoverPop()}
              className="btn-3d-amber inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 font-display text-xl font-bold border-4 border-white cursor-pointer animate-bounce"
            >
              <Gamepad2 className="w-6 h-6" />
              <span>MULAI TANTANGAN MISI!</span>
            </button>
          ) : (
            <p className="text-sm font-bold text-slate-600 bg-white/85 px-5 py-2.5 rounded-2xl border border-slate-200">
              Temukan semua 4 tokoh di atas ({discoveredInZone}/4) untuk membuka Tantangan Misi!
            </p>
          )}
        </div>
      </main>
    </div>
  );
};
