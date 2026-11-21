import React, { useEffect, useState } from 'react';
import { Award, Printer, RotateCcw, Star, Trophy, Volume2, X } from 'lucide-react';
import { BADGES, SUMMARY_POINTS } from '../data/curriculum';
import { CartoonCharacter } from './Characters';
import { audioEngine } from '../utils/audioEngine';

interface Frame7VictoryProps {
  stars: number;
  earnedBadges: string[];
  onPlayAgain: () => void;
}

export const Frame7Victory: React.FC<Frame7VictoryProps> = ({
  stars,
  earnedBadges,
  onPlayAgain,
}) => {
  const [visiblePoints, setVisiblePoints] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [studentName, setStudentName] = useState('Siswa Hebat Kelas 4');

  useEffect(() => {
    // Save completion to localStorage
    try {
      localStorage.setItem(
        'petualangan_peran_completed',
        JSON.stringify({
          completedAt: new Date().toISOString(),
          stars,
          badges: earnedBadges,
        })
      );
    } catch {
      // ignore storage errors
    }

    audioEngine.playVictoryFanfare();
    const voTimer = window.setTimeout(() => {
      audioEngine.speak('Selamat! Kamu sudah menuntaskan Bab 6 Topik A dengan gemilang!', 'cheer');
    }, 650);

    const p1Timer = window.setTimeout(() => setVisiblePoints(1), 500);
    const p2Timer = window.setTimeout(() => setVisiblePoints(2), 1300);

    return () => {
      window.clearTimeout(voTimer);
      window.clearTimeout(p1Timer);
      window.clearTimeout(p2Timer);
      audioEngine.stopSpeaking();
    };
  }, [stars, earnedBadges]);

  const unlockedBadges = BADGES.filter((b) => earnedBadges.includes(b.id));
  const displayBadges = unlockedBadges.length > 0 ? unlockedBadges : BADGES;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-100 via-sky-50 to-emerald-100 relative overflow-hidden flex flex-col justify-between py-6 px-4 select-none">
      {/* Pastel Fireworks Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden no-print">
        {[
          { left: '12%', top: '18%', color: '#F472B6', delay: '0s' },
          { left: '84%', top: '16%', color: '#38BDF8', delay: '0.5s' },
          { left: '25%', top: '34%', color: '#FACC15', delay: '1.1s' },
          { left: '76%', top: '38%', color: '#34D399', delay: '0.8s' },
        ].map((fw, idx) => (
          <div
            key={idx}
            style={{
              left: fw.left,
              top: fw.top,
              animation: `fireworkBurst 2.4s ease-out ${fw.delay} infinite`,
            }}
            className="absolute w-24 h-24 rounded-full border-4 border-dashed opacity-70"
          >
            <div className="w-full h-full rounded-full" style={{ border: `4px dotted ${fw.color}` }} />
          </div>
        ))}
      </div>

      <main className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center gap-6 no-print">
        {/* Top Golden Banner */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-8 py-3.5 rounded-3xl border-4 border-white shadow-xl">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 tracking-wide">
              SELAMAT! KAMU DUTA PERAN HEBAT!
            </h1>
          </div>
        </div>

        {/* Center Split: Left Trophy & Badges | Right Ayo Menyimpulkan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Trophy, Total Stars & 4 Badges */}
          <section className="lg:col-span-5 bg-white/95 rounded-3xl border-4 border-amber-300 shadow-xl p-6 flex flex-col items-center justify-between text-center gap-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-b from-amber-100 to-amber-200 border-4 border-amber-400 flex items-center justify-center shadow-inner animate-joy-bounce">
                <Trophy className="w-16 h-16 text-amber-600" />
              </div>
            </div>

            <div className="flex items-center gap-2 bg-amber-50 px-5 py-2 rounded-2xl border border-amber-200 font-display text-2xl font-bold text-amber-800 tabular-nums">
              <Star className="w-7 h-7 fill-amber-400 text-amber-500" />
              <span>{stars} Total Bintang</span>
            </div>

            <div className="w-full">
              <h2 className="font-display text-lg font-bold text-slate-700 mb-3">
                4 Lencana Peran Terkumpul
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {displayBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-teal-50/80 border border-teal-200 rounded-2xl p-2.5 flex items-center gap-2 text-left"
                  >
                    <Award className="w-7 h-7 shrink-0" style={{ color: badge.color }} />
                    <div className="min-w-0">
                      <div className="font-display font-bold text-xs text-slate-800 truncate">
                        {badge.title}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 truncate">
                        {badge.zone === 'sekolah' ? 'Sekolah' : 'Masyarakat'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Ayo Menyimpulkan Interactive Board */}
          <section className="lg:col-span-7 bg-white/95 rounded-3xl border-4 border-teal-300 shadow-xl p-6 flex flex-col justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    Refleksi &amp; Rangkuman Bab 6 Topik A
                  </span>
                  <h2 className="font-display text-2xl font-bold text-slate-800">
                    Ayo Menyimpulkan
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    audioEngine.playWoodTap();
                    audioEngine.speak(
                      'Kesimpulan belajar kita hari ini: Satu, peran manusia beragam karena perbedaan karakter, bakat, minat, tempat tinggal, dan kebutuhan. Dua, peran kita berbeda di setiap lingkungan: di rumah sebagai anak, di sekolah sebagai peserta didik, dan di masyarakat sebagai warga.',
                      'teacher'
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold text-xs sm:text-sm border border-sky-300 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengarkan Kesimpulan</span>
                </button>
              </div>

              <div className="space-y-4">
                {SUMMARY_POINTS.map((point, idx) => (
                  <div
                    key={point.number}
                    className={`rounded-2xl p-4 border-2 transition-all duration-500 ${
                      idx === 0
                        ? 'bg-teal-50/70 border-teal-200'
                        : 'bg-amber-50/70 border-amber-200'
                    } ${
                      visiblePoints >= point.number
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    }`}
                  >
                    <h3 className="font-display font-bold text-base text-slate-800 mb-1">
                      {point.number}. {point.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-slate-700 leading-relaxed">
                      {point.number}. {point.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-700">
              Kemajuan belajarmu sudah tersimpan otomatis sebagai Duta Peran Hebat!
            </p>
          </section>
        </div>

        {/* All 5 Characters Jumping Together in Celebration */}
        <div className="flex items-end justify-center gap-2 sm:gap-5 pt-2">
          <CartoonCharacter id="dara" pose="jump" showName className="w-20 sm:w-24 h-24 sm:h-28" />
          <CartoonCharacter id="banu" pose="jump" showName className="w-20 sm:w-24 h-24 sm:h-28" />
          <CartoonCharacter id="mia" pose="jump" showName className="w-22 sm:w-26 h-26 sm:h-32" />
          <CartoonCharacter id="ian" pose="jump" showName className="w-20 sm:w-24 h-24 sm:h-28" />
          <CartoonCharacter id="aga" pose="jump" showName className="w-20 sm:w-24 h-24 sm:h-28" />
        </div>

        {/* Bottom Actions: Main Lagi & Cetak Sertifikat */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              onPlayAgain();
            }}
            className="btn-3d-teal inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 text-white font-display text-lg font-bold border-2 border-white cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>MAIN LAGI</span>
          </button>

          <button
            type="button"
            onClick={() => {
              audioEngine.playWoodTap();
              setShowCertificate(true);
            }}
            className="btn-3d-amber inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-amber-950 font-display text-lg font-bold border-2 border-white cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>CETAK SERTIFIKAT</span>
          </button>
        </div>
      </main>

      {/* Digital Certificate Modal (Printable) */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-8 border-amber-400 shadow-2xl print-only-area relative">
            <button
              type="button"
              onClick={() => setShowCertificate(false)}
              className="no-print absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              aria-label="Tutup Sertifikat"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center border-2 border-dashed border-amber-300 rounded-2xl p-6 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-400">
                <Trophy className="w-9 h-9 text-amber-600" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-teal-700">
                  Sertifikat Penghargaan Belajar · Bab 6 Topik A
                </p>
                <h2 className="font-display text-3xl font-bold text-amber-900 mt-1">
                  DUTA PERAN HEBAT
                </h2>
              </div>

              <p className="text-sm font-semibold text-slate-600">Diberikan kepada:</p>

              <div className="max-w-sm mx-auto">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  aria-label="Nama Siswa"
                  className="w-full text-center font-display text-2xl font-bold text-slate-900 border-b-2 border-teal-500 focus:outline-hidden bg-teal-50/40 py-1.5 px-3 rounded-t-lg"
                />
                <p className="no-print text-[11px] font-semibold text-slate-400 mt-1">
                  Ketik namamu di kolom di atas sebelum mencetak
                </p>
              </div>

              <p className="text-sm font-semibold text-slate-700 max-w-md mx-auto leading-relaxed">
                Telah berhasil menuntaskan petualangan{' '}
                <strong>&ldquo;Peranku di Lingkungan Sekolah dan Masyarakat&rdquo;</strong> dengan
                meraih <strong>{stars} Bintang</strong> dan <strong>4 Lencana Peran</strong>.
              </p>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-slate-600">
                <span>SD Kelas 4</span>
                <span>·</span>
                <span>Petualangan Peran &amp; Tugasku</span>
              </div>
            </div>

            <div className="no-print mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
