import React, { useEffect } from 'react';
import { ArrowRight, Award, School, Sparkles, Star, Users } from 'lucide-react';
import { FeedbackModalState } from '../types/game';
import { CartoonCharacter } from './Characters';
import { audioEngine } from '../utils/audioEngine';

interface FeedbackModalsProps {
  modal: FeedbackModalState;
  onContinue: () => void;
}

const CONFETTI_COLORS = ['#FACC15', '#34D399', '#38BDF8', '#F472B6', '#FB923C'];

export const FeedbackModals: React.FC<FeedbackModalsProps> = ({ modal, onContinue }) => {
  useEffect(() => {
    if (modal.type === 'correct') {
      audioEngine.playStarSuccess();
      audioEngine.speak('Yeay! Kamu hebat sekali!', 'cheer');
    } else {
      audioEngine.playGentleBoing();
      audioEngine.speak(
        'Tidak apa-apa salah, ayo kita perhatikan petunjuknya bersama-sama!',
        'teacher'
      );
    }

    return () => {
      audioEngine.stopSpeaking();
    };
  }, [modal]);

  if (modal.type === 'correct') {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4 overflow-hidden">
        {/* Confetti Rain & Flying Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              style={{
                left: `${(i * 4.3) % 100}%`,
                backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                animation: `confettiFall ${1.8 + (i % 4) * 0.45}s linear ${(i % 5) * 0.15}s infinite`,
              }}
              className="absolute -top-4 w-3 h-4 rounded-xs opacity-90"
            />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <Star
              key={`fly-${i}`}
              style={{
                left: `${42 + i * 3}%`,
                top: '45%',
                animation: `starFlyUp 1.4s ease-out ${i * 0.12}s forwards`,
              }}
              className="absolute w-7 h-7 fill-amber-400 text-amber-500"
            />
          ))}
        </div>

        {/* Frame 6A: Bright Turquoise Card with Gold Star Border */}
        <div className="relative z-10 max-w-lg w-full rounded-3xl bg-gradient-to-b from-teal-400 to-teal-600 border-4 border-amber-300 shadow-2xl p-6 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-amber-300 text-amber-950 px-4 py-1.5 rounded-full font-display font-bold text-sm shadow-sm mb-3">
            <Sparkles className="w-4 h-4" />
            <span>+{modal.pointsAdded} Bintang!</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-xs">
            Luar Biasa! Jawabanmu Tepat!
          </h2>

          {/* Jumping Character + Optional New Badge */}
          <div className="my-4 flex items-center justify-center gap-4">
            <CartoonCharacter id="dara" pose="jump" className="w-24 h-30" />
            {modal.badgeAwarded && (
              <div className="bg-amber-50 text-amber-950 rounded-2xl p-3 border-2 border-amber-300 shadow-md max-w-[180px]">
                <Award className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                <div className="text-xs font-bold uppercase text-amber-700">Lencana Baru!</div>
                <div className="font-display font-bold text-sm">{modal.badgeAwarded.title}</div>
              </div>
            )}
          </div>

          {/* Reinforcement Box */}
          <div className="bg-white text-slate-800 rounded-2xl p-4 text-sm sm:text-base font-semibold leading-relaxed shadow-inner mb-5">
            {modal.explanation}
            <div className="mt-2.5 pt-2.5 border-t border-slate-200 flex items-center justify-center gap-2 text-xs font-bold text-teal-800">
              <span>Peran</span>
              <span>→</span>
              <span>Tugas Dijalankan</span>
              <span>→</span>
              <span>Lingkungan Nyaman &amp; Rukun</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onContinue();
            }}
            className="btn-3d-amber w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-400 text-amber-950 font-display text-xl font-bold border-2 border-white cursor-pointer"
          >
            <span>LANJUT BERIKUTNYA</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Frame 6B: Warm Yellow-Orange Child-Friendly Corrective Modal (No Harsh Red!)
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative max-w-xl w-full rounded-3xl bg-gradient-to-b from-amber-100 via-amber-50 to-orange-50 border-4 border-amber-400 shadow-2xl p-6 text-slate-800 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-amber-900">
          Hampir Tepat! Yuk Kita Cek Bersama
        </h2>

        {modal.refilledHearts && (
          <p className="mt-2 text-xs font-bold text-teal-800 bg-teal-100 inline-block px-3 py-1 rounded-lg">
            Semangatmu terisi penuh kembali! Terus berjuang ya!
          </p>
        )}

        <div className="my-3 flex justify-center">
          <CartoonCharacter id="banu" pose="scratch" className="w-24 h-28" />
        </div>

        {/* Explanation */}
        <p className="bg-white rounded-2xl p-4 border border-amber-200 text-sm sm:text-base font-bold text-slate-700 leading-relaxed mb-4">
          {modal.explanation}
        </p>

        {/* Visual Mini Comparison: Sekolah vs Masyarakat */}
        <div className="grid grid-cols-2 gap-3 text-left mb-5">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 font-display font-bold text-teal-800 text-sm mb-1">
              <School className="w-4 h-4" />
              <span>Di Sekolah</span>
            </div>
            <p className="text-xs font-semibold text-slate-700">
              Peserta didik, Guru, Petugas Perpustakaan, Penjaga Sekolah.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3">
            <div className="flex items-center gap-1.5 font-display font-bold text-orange-800 text-sm mb-1">
              <Users className="w-4 h-4" />
              <span>Di Masyarakat</span>
            </div>
            <p className="text-xs font-semibold text-slate-700">
              Warga kerja bakti, Pedagang, Petani, Dokter &amp; Perawat.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            audioEngine.playWoodTap();
            onContinue();
          }}
          className="btn-3d-amber w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-b from-amber-400 to-orange-400 text-amber-950 font-display text-lg font-bold border-2 border-white cursor-pointer"
        >
          <span>COBA SOAL SELANJUTNYA</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
