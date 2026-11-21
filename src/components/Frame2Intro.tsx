import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  RotateCw,
  Sparkles,
  Users,
  Volume2,
} from 'lucide-react';
import { LEARNING_OBJECTIVES, MATERIAL_CARDS } from '../data/curriculum';
import { ActivityScene, CartoonCharacter } from './Characters';
import { TopHud } from './TopHud';
import { audioEngine } from '../utils/audioEngine';

interface Frame2IntroProps {
  stars: number;
  badgeCount: number;
  musicEnabled: boolean;
  voEnabled: boolean;
  onToggleMusic: () => void;
  onToggleVo: () => void;
  onContinueToMap: () => void;
}

export const Frame2Intro: React.FC<Frame2IntroProps> = ({
  stars,
  badgeCount,
  musicEnabled,
  voEnabled,
  onToggleMusic,
  onToggleVo,
  onContinueToMap,
}) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [openedCount, setOpenedCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentCard = MATERIAL_CARDS[cardIndex];
  const isFlipped = !!flippedIds[currentCard.id];

  useEffect(() => {
    const unsub = audioEngine.onSpeakingChange(setIsSpeaking);
    // Automatically introduce the material when entering Frame 2
    const timer = window.setTimeout(() => {
      audioEngine.speak(
        'Ayo kenali peran kita! Peran kita berubah sesuai tempatnya: di rumah sebagai anak, di sekolah sebagai peserta didik, dan di masyarakat sebagai warga. Klik kartu konsep untuk membaliknya ya!',
        'teacher'
      );
    }, 350);

    return () => {
      unsub();
      window.clearTimeout(timer);
      audioEngine.stopSpeaking();
    };
  }, []);

  const handleFlipCard = () => {
    audioEngine.playPageFlip();
    setFlippedIds((prev) => {
      const nextState = !prev[currentCard.id];
      if (!prev[currentCard.id]) {
        setOpenedCount((c) => c + 1);
      }
      return { ...prev, [currentCard.id]: nextState };
    });
  };

  const handleSlide = (dir: -1 | 1) => {
    audioEngine.playPageFlip();
    setCardIndex((prev) => (prev + dir + MATERIAL_CARDS.length) % MATERIAL_CARDS.length);
  };

  const renderObjectiveIcon = (icon: 'users' | 'clipboard' | 'sparkles') => {
    if (icon === 'users') return <Users className="w-6 h-6 text-amber-300 shrink-0" />;
    if (icon === 'clipboard') return <ClipboardCheck className="w-6 h-6 text-teal-300 shrink-0" />;
    return <Sparkles className="w-6 h-6 text-sky-300 shrink-0" />;
  };

  const renderCardIllustration = (type: typeof currentCard.illustration) => {
    if (type === 'ceremony') {
      return <ActivityScene characterId="dara" activity="flag_ceremony" size="sm" />;
    }
    if (type === 'farmer') {
      return <ActivityScene characterId="aga" activity="farmer" size="sm" />;
    }
    if (type === 'gotong_royong') {
      return <ActivityScene characterId="banu" activity="gotong_royong" size="sm" />;
    }
    return <ActivityScene characterId="mia" activity="group_study" size="sm" />;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-[#F8FAFC] to-teal-50 flex flex-col justify-between pb-6">
      <TopHud
        stars={stars}
        badgeCount={badgeCount}
        musicEnabled={musicEnabled}
        voEnabled={voEnabled}
        onToggleMusic={onToggleMusic}
        onToggleVo={onToggleVo}
      />

      <main className="w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col justify-center gap-5">
        {/* Header Chapter Ribbon */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 text-white px-7 py-3 rounded-2xl shadow-md border-2 border-teal-200">
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-balance">
              Bab 6: Peranku di Lingkungan Sekolah dan Masyarakat — Topik A
            </h1>
          </div>
        </div>

        {/* Two Main Cards: Left (Tujuan Belajar Chalkboard) & Right (Konsep Utama 3D Flip Carousel) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Chalkboard Tujuan Belajar */}
          <section className="lg:col-span-5 bg-[#064E3B] rounded-3xl border-[10px] border-[#92400E] shadow-xl p-6 flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-emerald-700/80">
                <h2 className="font-display text-2xl font-bold text-amber-200">
                  Tujuan Belajar Kita
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playWoodTap();
                    audioEngine.speak(
                      'Tujuan belajar kita hari ini adalah: Satu, mengenal beragam peran di sekolah dan masyarakat. Dua, memahami tugas sesuai peran. Tiga, mengetahui alasan mengapa peran manusia beragam.',
                      'teacher'
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-emerald-50 text-xs font-bold border border-emerald-500 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Suara</span>
                </button>
              </div>

              <ul className="space-y-4">
                {LEARNING_OBJECTIVES.map((obj) => (
                  <li
                    key={obj.id}
                    className="flex items-start gap-3.5 bg-emerald-900/55 p-3.5 rounded-2xl border border-emerald-700/60"
                  >
                    <div className="mt-0.5">{renderObjectiveIcon(obj.icon)}</div>
                    <p className="text-base font-semibold text-emerald-50 leading-snug">
                      <span className="font-display text-amber-300 mr-1.5">{obj.id}.</span>
                      {obj.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-700/60 text-xs font-semibold text-emerald-200">
              Petunjuk: Klik tombol suara kapan saja jika ingin dibacakan oleh Kak Mia.
            </div>
          </section>

          {/* Right: Interactive 3D Flip Concept Carousel */}
          <section className="lg:col-span-7 bg-white rounded-3xl border-2 border-slate-200 shadow-lg p-6 flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-700">
                  Kartu Konsep Utama · {cardIndex + 1} / {MATERIAL_CARDS.length}
                </p>
                <h2 className="font-display text-2xl font-bold text-slate-800">
                  {currentCard.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  audioEngine.playWoodTap();
                  audioEngine.speak(currentCard.voText, 'teacher');
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs sm:text-sm border border-sky-300 cursor-pointer whitespace-nowrap shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>Dengarkan Suara</span>
              </button>
            </div>

            {/* 3D Flip Card Area */}
            <div className="perspective-1000 w-full h-64 sm:h-60 my-2">
              <div
                onClick={handleFlipCard}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleFlipCard();
                  }
                }}
                aria-label={`Balik kartu ${currentCard.title}`}
                className={`relative w-full h-full duration-500 preserve-3d cursor-pointer transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-gradient-to-br from-teal-50 via-white to-amber-50 border-2 border-teal-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex-1 space-y-2.5">
                    <span className="text-xs font-bold text-teal-700">{currentCard.kicker}</span>
                    <p className="text-lg font-bold text-slate-800 leading-relaxed">
                      {currentCard.frontSummary}
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 pt-1">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Klik kartu untuk membalik &amp; lihat contohnya!</span>
                    </p>
                  </div>
                  <div className="shrink-0">{renderCardIllustration(currentCard.illustration)}</div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-sky-50 border-2 border-amber-300 p-5 flex flex-col justify-between shadow-sm">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-700">Penjelasan Mendalam</span>
                      <span className="text-xs font-bold text-slate-500 inline-flex items-center gap-1">
                        <RotateCw className="w-3.5 h-3.5" /> Klik untuk kembali
                      </span>
                    </div>
                    <p className="text-base font-semibold text-slate-800 leading-relaxed">
                      {currentCard.backDetail}
                    </p>
                  </div>
                  <div className="bg-white/90 rounded-xl p-3 border border-amber-200 text-sm font-bold text-teal-800">
                    {currentCard.exampleText}
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleSlide(-1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer min-h-[40px]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <div className="flex items-center gap-2">
                {MATERIAL_CARDS.map((card, idx) => (
                  <button
                    key={card.id}
                    type="button"
                    aria-label={`Kartu ${idx + 1}`}
                    onClick={() => {
                      audioEngine.playPageFlip();
                      setCardIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      idx === cardIndex ? 'w-7 bg-teal-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => handleSlide(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer min-h-[40px]"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </div>

        {/* Bottom Row: Mia Guide Mascot + Lanjut ke Peta Misi CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl border border-teal-200 shadow-xs max-w-xl">
            <CartoonCharacter
              id="mia"
              pose="guide"
              isSpeaking={isSpeaking}
              className="w-16 h-20 shrink-0"
            />
            <div className="text-sm font-semibold text-slate-700 leading-snug">
              <span className="font-display font-bold text-teal-800 block">
                Kak Mia · Pemandu Belajar
              </span>
              {openedCount > 0
                ? 'Hebat! Kamu sudah membuka kartu konsep. Yuk lanjut ke Peta Misi!'
                : 'Klik kartu di atas untuk membaliknya, atau klik tombol Lanjut di sebelah kanan!'}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onContinueToMap();
            }}
            onMouseEnter={() => audioEngine.playHoverPop()}
            className="btn-3d-teal inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 text-white font-display text-lg md:text-xl font-bold border-2 border-white cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>LANJUT KE PETA MISI</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
};
