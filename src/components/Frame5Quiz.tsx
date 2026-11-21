import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Heart,
  Home,
  School,
  ShoppingBag,
  Sparkles,
  Sprout,
  Star,
  Stethoscope,
  Users,
  Volume2,
} from 'lucide-react';
import { MatchItem, QuizOption, QuizQuestion } from '../types/game';
import { ActivityScene } from './Characters';
import { audioEngine } from '../utils/audioEngine';

interface Frame5QuizProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  stars: number;
  lives: number;
  onAnswer: (isCorrect: boolean) => void;
}

const OPTION_COLORS = [
  'bg-teal-50 border-teal-300 hover:border-teal-500 hover:bg-teal-100/80 text-teal-950',
  'bg-amber-50 border-amber-300 hover:border-amber-500 hover:bg-amber-100/80 text-amber-950',
  'bg-sky-50 border-sky-300 hover:border-sky-500 hover:bg-sky-100/80 text-sky-950',
  'bg-emerald-50 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-100/80 text-emerald-950',
];

export const renderRoleIcon = (iconKey: QuizOption['iconKey'], className = 'w-8 h-8') => {
  switch (iconKey) {
    case 'student':
      return <BookOpen className={`${className} text-teal-700`} />;
    case 'teacher':
      return <School className={`${className} text-amber-700`} />;
    case 'librarian':
      return <BookOpen className={`${className} text-sky-700`} />;
    case 'gardener':
      return <Sprout className={`${className} text-emerald-700`} />;
    case 'citizen':
      return <Users className={`${className} text-teal-700`} />;
    case 'merchant':
      return <ShoppingBag className={`${className} text-orange-700`} />;
    case 'farmer':
      return <Sprout className={`${className} text-green-700`} />;
    case 'doctor':
      return <Stethoscope className={`${className} text-sky-700`} />;
    case 'diverse':
      return <Sparkles className={`${className} text-amber-600`} />;
    case 'school':
      return <Building2 className={`${className} text-teal-700`} />;
    case 'community':
      return <Home className={`${className} text-emerald-700`} />;
    default:
      return <Briefcase className={`${className} text-slate-600`} />;
  }
};

export const Frame5Quiz: React.FC<Frame5QuizProps> = ({
  question,
  questionIndex,
  totalQuestions,
  stars,
  lives,
  onAnswer,
}) => {
  // Drag & Drop / Click-to-Match state for Type B
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, 'sekolah' | 'masyarakat'>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMatchId(null);
    setAssignments({});
    setDraggingId(null);

    const timer = window.setTimeout(() => {
      audioEngine.speak(question.voPrompt, 'teacher');
    }, 280);

    return () => {
      window.clearTimeout(timer);
      audioEngine.stopSpeaking();
    };
  }, [question]);

  const handleAssignItem = (itemId: string, targetZone: 'sekolah' | 'masyarakat') => {
    audioEngine.playWoodTap();
    setAssignments((prev) => ({ ...prev, [itemId]: targetZone }));
    setSelectedMatchId(null);
  };

  const handleCheckMatches = () => {
    if (!question.matchItems) return;
    audioEngine.playWoodTap();
    const allCorrect = question.matchItems.every(
      (item) => assignments[item.id] === item.targetZone
    );
    onAnswer(allCorrect);
  };

  const matchItems: MatchItem[] = question.matchItems || [];
  const unassignedItems = matchItems.filter((item) => !assignments[item.id]);
  const schoolItems = matchItems.filter((item) => assignments[item.id] === 'sekolah');
  const communityItems = matchItems.filter((item) => assignments[item.id] === 'masyarakat');
  const allPlaced = matchItems.length > 0 && unassignedItems.length === 0;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-[#F8FAFC] to-amber-50 flex flex-col justify-between pb-6 select-none">
      {/* Quiz HUD Header */}
      <header className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 flex flex-wrap items-center justify-between gap-3">
        {/* Stars */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-amber-200 shadow-xs font-bold text-amber-700 tabular-nums">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
          <span>{stars} Bintang</span>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 max-w-xs min-w-[180px] bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1 tabular-nums">
            <span>Tantangan Misi</span>
            <span>
              Soal {questionIndex + 1}/{totalQuestions}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Hearts / Semangat */}
        <div
          className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-2xl border-2 border-rose-200 shadow-xs"
          aria-label={`Semangat ${lives} dari 3`}
        >
          <span className="text-xs font-bold text-slate-600 mr-1">Semangat:</span>
          {[1, 2, 3].map((h) => (
            <Heart
              key={h}
              className={`w-5 h-5 transition-transform ${
                h <= lives ? 'fill-rose-500 text-rose-500 scale-100' : 'fill-slate-200 text-slate-300 scale-90'
              }`}
            />
          ))}
        </div>
      </header>

      <main className="w-full max-w-5xl mx-auto px-4 flex-1 flex flex-col justify-center gap-5">
        {/* Top Center Question Card with Animated Character Activity (No Role Label!) */}
        <section className="bg-white rounded-3xl border-2 border-teal-200 shadow-lg p-5 md:p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="shrink-0">
            <ActivityScene
              characterId={question.characterId}
              activity={question.activity}
              size="md"
            />
          </div>

          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {question.type === 'multiple_choice'
                  ? 'Tipe A · Pilihan Ganda Visual'
                  : 'Tipe B · Seret & Pasangkan'}
              </span>
              <button
                type="button"
                onClick={() => {
                  audioEngine.playWoodTap();
                  audioEngine.speak(question.voPrompt, 'teacher');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs border border-sky-300 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Bacakan Soal</span>
              </button>
            </div>

            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
              {question.prompt}
            </h2>
          </div>
        </section>

        {/* Bottom Interaction Area: Type A or Type B */}
        {question.type === 'multiple_choice' && question.options ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {question.options.map((opt, idx) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  audioEngine.playWoodTap();
                  onAnswer(!!opt.isCorrect);
                }}
                onMouseEnter={() => audioEngine.playHoverPop()}
                className={`group rounded-3xl border-3 p-4 sm:p-5 flex items-center gap-4 text-left shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                  OPTION_COLORS[idx % OPTION_COLORS.length]
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/95 border border-slate-200 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  {renderRoleIcon(opt.iconKey)}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg sm:text-xl font-bold leading-tight">
                    {opt.label}
                  </div>
                  {opt.sublabel && (
                    <div className="text-xs sm:text-sm font-semibold opacity-80 mt-0.5">
                      {opt.sublabel}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </section>
        ) : (
          <section className="space-y-4">
            {/* Source Cards to Drag or Click */}
            <div className="bg-white/90 rounded-2xl border-2 border-dashed border-slate-300 p-4">
              <p className="text-xs font-bold text-slate-600 mb-3 text-center">
                Seret kartu peran ke kotak lingkungan di bawah, atau klik kartu lalu klik kotak tujuannya!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 min-h-[60px]">
                {unassignedItems.length === 0 ? (
                  <span className="text-sm font-bold text-emerald-700 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5" /> Semua kartu sudah dipasangkan! Klik tombol Periksa di bawah.
                  </span>
                ) : (
                  unassignedItems.map((item) => {
                    const isSelected = selectedMatchId === item.id;
                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => {
                          audioEngine.playWoodTap();
                          setDraggingId(item.id);
                        }}
                        onClick={() => {
                          audioEngine.playWoodTap();
                          setSelectedMatchId(isSelected ? null : item.id);
                        }}
                        className={`inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 font-bold text-sm sm:text-base shadow-sm cursor-grab active:cursor-grabbing transition-all ${
                          isSelected
                            ? 'bg-amber-200 border-amber-500 text-amber-950 scale-105 ring-4 ring-amber-300/60'
                            : 'bg-white border-slate-300 text-slate-800 hover:border-teal-400'
                        }`}
                      >
                        {renderRoleIcon(item.iconKey, 'w-6 h-6')}
                        <span>{item.label}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Two Drop Zones: Sekolah & Masyarakat */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  {
                    key: 'sekolah' as const,
                    title: 'Lingkungan Sekolah',
                    bg: 'bg-teal-50 border-teal-400',
                    header: 'text-teal-900',
                    items: schoolItems,
                  },
                  {
                    key: 'masyarakat' as const,
                    title: 'Lingkungan Masyarakat',
                    bg: 'bg-amber-50 border-amber-400',
                    header: 'text-amber-900',
                    items: communityItems,
                  },
                ]
              ).map((zoneBox) => (
                <div
                  key={zoneBox.key}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggingId) {
                      handleAssignItem(draggingId, zoneBox.key);
                      setDraggingId(null);
                    }
                  }}
                  onClick={() => {
                    if (selectedMatchId) {
                      handleAssignItem(selectedMatchId, zoneBox.key);
                    }
                  }}
                  className={`rounded-3xl border-3 p-4 min-h-[145px] transition-all ${zoneBox.bg} ${
                    selectedMatchId ? 'ring-2 ring-dashed ring-slate-400 cursor-pointer' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-display text-lg font-bold ${zoneBox.header}`}>
                      {zoneBox.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-600">
                      {zoneBox.items.length} kartu
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {zoneBox.items.length === 0 ? (
                      <p className="text-xs font-semibold text-slate-500 italic">
                        Lepaskan atau klik untuk menaruh kartu di sini...
                      </p>
                    ) : (
                      zoneBox.items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            audioEngine.playWoodTap();
                            setAssignments((prev) => {
                              const copy = { ...prev };
                              delete copy[item.id];
                              return copy;
                            });
                          }}
                          title="Klik untuk mengembalikan kartu"
                          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:bg-slate-50 cursor-pointer"
                        >
                          {renderRoleIcon(item.iconKey, 'w-5 h-5')}
                          <span>{item.label}</span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Matching Button */}
            <div className="flex justify-center pt-1">
              <button
                type="button"
                disabled={!allPlaced}
                onClick={handleCheckMatches}
                className={`px-8 py-3 rounded-full font-display text-lg font-bold border-2 border-white shadow-md transition-all ${
                  allPlaced
                    ? 'btn-3d-teal bg-gradient-to-b from-teal-400 to-teal-600 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Periksa Pasangan ✓
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
