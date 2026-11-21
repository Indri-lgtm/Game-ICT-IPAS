import {
  BadgeInfo,
  DioramaRole,
  MaterialCard,
  QuizQuestion,
} from '../types/game';

export const LEARNING_OBJECTIVES = [
  {
    id: 1,
    text: 'Mengenal beragam peran di sekolah dan masyarakat.',
    icon: 'users' as const,
  },
  {
    id: 2,
    text: 'Memahami tugas sesuai peran.',
    icon: 'clipboard' as const,
  },
  {
    id: 3,
    text: 'Mengetahui alasan mengapa peran manusia beragam.',
    icon: 'sparkles' as const,
  },
];

export const MATERIAL_CARDS: MaterialCard[] = [
  {
    id: 'pengertian-peran',
    title: 'Apa Itu Peran?',
    kicker: 'Konsep 1 dari 4',
    frontSummary: 'Peran adalah kedudukan atau posisi seseorang di suatu tempat.',
    backDetail:
      'Setiap orang bisa memiliki lebih dari satu peran! Peran kita berubah mengikuti tempat kita berada: di rumah sebagai anak, di sekolah sebagai peserta didik, dan di lingkungan sekitar sebagai warga masyarakat.',
    exampleText: 'Contoh: Dara adalah anak di rumah, sekaligus peserta didik di SD Nusantara.',
    voText:
      'Apa itu peran? Peran adalah posisi seseorang di suatu tempat. Peran kita berubah sesuai tempatnya! Di rumah sebagai anak, di sekolah sebagai peserta didik, dan di masyarakat sebagai warga.',
    illustration: 'home_school',
    accentColor: 'teal',
  },
  {
    id: 'pengertian-tugas',
    title: 'Tugas Sesuai Peran',
    kicker: 'Konsep 2 dari 4',
    frontSummary: 'Setiap peran memiliki tugas dan tanggung jawab yang harus dijalankan.',
    backDetail:
      'Tugas adalah pekerjaan atau kewajiban yang sesuai dengan peran kita. Jika semua orang menjalankan tugasnya dengan baik, kegiatan bersama menjadi tertib, aman, dan menyenangkan.',
    exampleText: 'Contoh: Tugas peserta didik adalah belajar dengan tekun dan menjaga kebersihan kelas.',
    voText:
      'Setiap peran membawa tugas dan tanggung jawab. Misalnya, tugas peserta didik adalah belajar dengan rajin, mengikuti upacara bendera dengan tertib, dan piket kelas.',
    illustration: 'ceremony',
    accentColor: 'amber',
  },
  {
    id: 'lingkungan-sekolah',
    title: 'Peran di Lingkungan Sekolah',
    kicker: 'Konsep 3 dari 4',
    frontSummary: 'Di sekolah ada peserta didik, guru, petugas perpustakaan, dan penjaga sekolah.',
    backDetail:
      'Sekolah berjalan lancar karena kerja sama banyak peran: Guru mengajar dan membimbing, peserta didik belajar, petugas perpustakaan menata buku, dan penjaga sekolah merawat taman serta kebersihan.',
    exampleText: 'Semua warga sekolah saling membutuhkan agar belajar terasa nyaman.',
    voText:
      'Di lingkungan sekolah ada beragam peran! Ada peserta didik yang belajar, guru yang membimbing, petugas perpustakaan yang merawat buku, serta penjaga sekolah yang merawat taman dan kebersihan.',
    illustration: 'farmer',
    accentColor: 'sky',
  },
  {
    id: 'lingkungan-masyarakat',
    title: 'Peran di Masyarakat',
    kicker: 'Konsep 4 dari 4',
    frontSummary: 'Di masyarakat ada warga, pedagang, petani, hingga dokter dan perawat.',
    backDetail:
      'Mengapa peran manusia beragam? Karena setiap orang memiliki bakat, minat, tempat tinggal, dan kebutuhan yang berbeda. Keberagaman peran membuat kebutuhan hidup kita semua terpenuhi!',
    exampleText: 'Petani menanam padi, pedagang menjual bahan makanan, warga bergotong royong.',
    voText:
      'Di masyarakat perannya makin beragam! Ada warga yang bergotong royong, pedagang di pasar, petani di sawah, dan dokter di puskesmas. Peran kita beragam karena bakat, minat, tempat tinggal, dan kebutuhan yang berbeda.',
    illustration: 'gotong_royong',
    accentColor: 'emerald',
  },
];

export const BADGES: BadgeInfo[] = [
  {
    id: 'lencana_pelajar',
    title: 'Pelajar Teladan',
    subtitle: 'Mengenal peran di kelas & sekolah',
    zone: 'sekolah',
    color: '#0D9488',
    iconName: 'book',
  },
  {
    id: 'lencana_penjaga',
    title: 'Sahabat Sekolah',
    subtitle: 'Menuntaskan tantangan Sekolah Ceria',
    zone: 'sekolah',
    color: '#F59E0B',
    iconName: 'leaf',
  },
  {
    id: 'lencana_warga',
    title: 'Warga Peduli',
    subtitle: 'Memahami gotong royong masyarakat',
    zone: 'masyarakat',
    color: '#0284C7',
    iconName: 'users',
  },
  {
    id: 'lencana_duta',
    title: 'Duta Peran Hebat',
    subtitle: 'Menaklukkan seluruh Bab 6 Topik A',
    zone: 'masyarakat',
    color: '#D97706',
    iconName: 'award',
  },
];

export const DIORAMA_ROLES: DioramaRole[] = [
  // ZONA 1: SEKOLAH CERIA
  {
    id: 'peserta-didik',
    zone: 'sekolah',
    roleName: 'Peserta Didik',
    characterId: 'dara',
    characterLabel: 'Dara',
    activity: 'sweep',
    activitiesText:
      'Belajar dengan tekun, mengangkat tangan saat bertanya, mengikuti upacara bendera dengan tertib, dan melaksanakan piket menyapu kelas.',
    whyImportant: 'Agar kegiatan belajar nyaman, kelas bersih, dan suasana kelas selalu rukun.',
    voText:
      'Peserta Didik! Tugasnya belajar dengan tekun, bertanya dengan sopan, mengikuti upacara bendera, dan piket menyapu kelas agar belajar terasa nyaman.',
    position: { xPercent: 22, yPercent: 64 },
  },
  {
    id: 'guru',
    zone: 'sekolah',
    roleName: 'Guru',
    characterId: 'mia',
    characterLabel: 'Ibu Mia',
    activity: 'teach',
    activitiesText:
      'Mengajar di depan kelas, menulis penjelasan di papan tulis, dan membimbing peserta didik agar memahami pelajaran.',
    whyImportant: 'Membantu peserta didik memperoleh ilmu pengetahuan dan sikap terpuji.',
    voText:
      'Guru! Tugasnya mengajar, menulis materi di papan tulis, dan membimbing peserta didik dengan penuh kasih sayang agar semakin pintar dan berakhlak baik.',
    position: { xPercent: 44, yPercent: 54 },
  },
  {
    id: 'petugas-perpustakaan',
    zone: 'sekolah',
    roleName: 'Petugas Perpustakaan',
    characterId: 'ian',
    characterLabel: 'Kak Ian',
    activity: 'librarian',
    activitiesText:
      'Merapikan dan menata buku ke rak sesuai kategori, mencatat peminjaman buku, serta membantu siswa mencari bahan bacaan.',
    whyImportant: 'Agar buku mudah ditemukan dan perpustakaan tetap tenang serta rapi.',
    voText:
      'Petugas Perpustakaan! Tugasnya menata buku ke rak dan melayani peminjaman buku agar siswa mudah mencari bahan bacaan yang menarik.',
    position: { xPercent: 66, yPercent: 58 },
  },
  {
    id: 'penjaga-sekolah',
    zone: 'sekolah',
    roleName: 'Penjaga Sekolah',
    characterId: 'aga',
    characterLabel: 'Pak Aga',
    activity: 'gardener',
    activitiesText:
      'Menyiram tanaman di taman sekolah, menjaga keamanan gerbang, dan memastikan lingkungan sekolah selalu bersih dan asri.',
    whyImportant: 'Menjaga sekolah tetap aman, sejuk, dan indah dipandang setiap hari.',
    voText:
      'Penjaga Sekolah! Tugasnya menyiram tanaman, menjaga keamanan gerbang, dan merawat halaman sekolah agar selalu sejuk dan asri.',
    position: { xPercent: 84, yPercent: 67 },
  },

  // ZONA 2: LINGKUNGAN MASYARAKAT
  {
    id: 'warga-masyarakat',
    zone: 'masyarakat',
    roleName: 'Warga Masyarakat',
    characterId: 'banu',
    characterLabel: 'Banu & Warga',
    activity: 'gotong_royong',
    activitiesText:
      'Bergotong royong membersihkan taman warga dan selokan bersama tetangga serta menjaga keamanan di pos ronda.',
    whyImportant: 'Agar lingkungan tempat tinggal bersih, bebas banjir, dan warga hidup rukun.',
    voText:
      'Warga Masyarakat! Tugasnya bergotong royong membersihkan taman dan selokan agar lingkungan sehat, bersih, dan warganya hidup rukun.',
    position: { xPercent: 20, yPercent: 65 },
  },
  {
    id: 'pedagang',
    zone: 'masyarakat',
    roleName: 'Pedagang',
    characterId: 'dara',
    characterLabel: 'Ibu Dara',
    activity: 'merchant',
    activitiesText:
      'Menimbang buah dan sayuran dengan jujur di pasar serta melayani pembeli dengan ramah.',
    whyImportant: 'Memudahkan masyarakat mendapatkan kebutuhan pangan sehari-hari.',
    voText:
      'Pedagang di Pasar! Tugasnya menimbang buah dengan jujur dan melayani pembeli dengan ramah agar warga mudah memenuhi kebutuhan sehari-hari.',
    position: { xPercent: 43, yPercent: 58 },
  },
  {
    id: 'petani',
    zone: 'masyarakat',
    roleName: 'Petani',
    characterId: 'aga',
    characterLabel: 'Pak Aga',
    activity: 'farmer',
    activitiesText:
      'Mencangkul tanah, menanam bibit padi di sawah, dan merawat tanaman hingga panen tiba.',
    whyImportant: 'Menghasilkan beras dan bahan pangan pokok bagi seluruh masyarakat.',
    voText:
      'Petani di Sawah! Tugasnya mencangkul tanah dan menanam padi agar seluruh masyarakat mendapatkan makanan pokok yang bergizi.',
    position: { xPercent: 66, yPercent: 64 },
  },
  {
    id: 'dokter-perawat',
    zone: 'masyarakat',
    roleName: 'Dokter & Perawat',
    characterId: 'mia',
    characterLabel: 'Dokter Mia',
    activity: 'doctor',
    activitiesText:
      'Memeriksa kesehatan pasien menggunakan stetoskop, merawat warga yang sakit, dan memberi saran hidup sehat.',
    whyImportant: 'Menjaga kesehatan masyarakat dan membantu penyembuhan saat ada warga sakit.',
    voText:
      'Dokter dan Perawat! Tugasnya memeriksa kesehatan pasien dan merawat warga yang sakit agar masyarakat tetap sehat dan kuat.',
    position: { xPercent: 85, yPercent: 56 },
  },
];

export const QUIZ_QUESTIONS: Record<'sekolah' | 'masyarakat', QuizQuestion[]> = {
  sekolah: [
    {
      id: 'q-sek-1',
      zone: 'sekolah',
      type: 'multiple_choice',
      characterId: 'dara',
      activity: 'group_study',
      prompt:
        'Lihat gerakan Dara dan teman-teman! Mereka sedang berdiskusi mengerjakan tugas kelompok di kelas. Apa peran mereka?',
      voPrompt:
        'Lihat gerakan Dara dan teman-teman! Mereka sedang berdiskusi mengerjakan tugas kelompok di kelas. Apa peran mereka?',
      options: [
        { id: 'a', label: 'Peserta Didik', sublabel: 'Belajar dan berdiskusi di kelas', iconKey: 'student', isCorrect: true },
        { id: 'b', label: 'Pedagang', sublabel: 'Menjual buah di pasar', iconKey: 'merchant', isCorrect: false },
        { id: 'c', label: 'Petani', sublabel: 'Menanam padi di sawah', iconKey: 'farmer', isCorrect: false },
        { id: 'd', label: 'Dokter', sublabel: 'Memeriksa pasien sakit', iconKey: 'doctor', isCorrect: false },
      ],
      explanationCorrect:
        'Tepat sekali! Saat belajar dan berdiskusi tugas kelompok di sekolah, Dara berperan sebagai Peserta Didik.',
      explanationIncorrect:
        'Hampir tepat! Ingat ya, tugas belajar dan berdiskusi di kelas dilakukan oleh Peserta Didik di lingkungan sekolah.',
    },
    {
      id: 'q-sek-2',
      zone: 'sekolah',
      type: 'match_zone',
      characterId: 'ian',
      activity: 'librarian',
      prompt:
        'Ayo pasangkan kartu peran berikut ke kotak lingkungan yang tepat: Lingkungan Sekolah atau Lingkungan Masyarakat!',
      voPrompt:
        'Ayo pasangkan kartu peran berikut ke kotak lingkungan yang tepat: Lingkungan Sekolah atau Lingkungan Masyarakat!',
      matchItems: [
        { id: 'm1', label: 'Petugas Perpustakaan', targetZone: 'sekolah', iconKey: 'librarian' },
        { id: 'm2', label: 'Guru Kelas', targetZone: 'sekolah', iconKey: 'teacher' },
        { id: 'm3', label: 'Petani Sawah', targetZone: 'masyarakat', iconKey: 'farmer' },
      ],
      explanationCorrect:
        'Hebat! Petugas Perpustakaan dan Guru berperan di Lingkungan Sekolah, sedangkan Petani berperan di Lingkungan Masyarakat.',
      explanationIncorrect:
        'Yuk cek lagi! Guru dan Petugas Perpustakaan bekerja di Lingkungan Sekolah, sedangkan Petani bekerja di Lingkungan Masyarakat.',
    },
    {
      id: 'q-sek-3',
      zone: 'sekolah',
      type: 'multiple_choice',
      characterId: 'aga',
      activity: 'gardener',
      prompt:
        'Perhatikan Pak Aga yang sedang menyiram tanaman di taman sekolah agar tetap asri. Apa tugas utama perannya?',
      voPrompt:
        'Perhatikan Pak Aga yang sedang menyiram tanaman di taman sekolah agar tetap asri. Apa tugas utama perannya?',
      options: [
        { id: 'a', label: 'Penjaga Sekolah', sublabel: 'Merawat taman & keamanan sekolah', iconKey: 'gardener', isCorrect: true },
        { id: 'b', label: 'Warga Masyarakat', sublabel: 'Ronda malam di desa', iconKey: 'citizen', isCorrect: false },
        { id: 'c', label: 'Petugas Perpustakaan', sublabel: 'Menata buku di rak', iconKey: 'librarian', isCorrect: false },
        { id: 'd', label: 'Guru', sublabel: 'Menulis di papan tulis', iconKey: 'teacher', isCorrect: false },
      ],
      explanationCorrect:
        'Benar! Penjaga Sekolah bertugas merawat tanaman, menjaga kebersihan halaman, dan menjaga keamanan sekolah.',
      explanationIncorrect:
        'Belum tepat, teman! Menyiram tanaman halaman dan menjaga keamanan gerbang adalah tugas Penjaga Sekolah.',
    },
    {
      id: 'q-sek-4',
      zone: 'sekolah',
      type: 'multiple_choice',
      characterId: 'mia',
      activity: 'teach',
      prompt:
        'Ibu Mia sedang menulis di papan tulis dan membimbing siswa yang kesulitan. Apa manfaat tugas peran tersebut bagi siswa?',
      voPrompt:
        'Ibu Mia sedang menulis di papan tulis dan membimbing siswa yang kesulitan. Apa manfaat tugas peran tersebut bagi siswa?',
      options: [
        { id: 'a', label: 'Membuat siswa paham materi & terampil', sublabel: 'Peran Guru membimbing belajar', iconKey: 'teacher', isCorrect: true },
        { id: 'b', label: 'Menjual sayuran segar di pasar', sublabel: 'Tugas pedagang di masyarakat', iconKey: 'merchant', isCorrect: false },
        { id: 'c', label: 'Memanen padi di sawah', sublabel: 'Tugas petani di desa', iconKey: 'farmer', isCorrect: false },
        { id: 'd', label: 'Membersihkan selokan kampung', sublabel: 'Kerja bakti warga masyarakat', iconKey: 'citizen', isCorrect: false },
      ],
      explanationCorrect:
        'Luar biasa! Guru berperan membimbing peserta didik agar memahami pelajaran dan tumbuh menjadi anak yang cerdas.',
      explanationIncorrect:
        'Ingat ya! Menulis di papan tulis dan membimbing siswa adalah peran Guru agar siswa memahami materi pelajaran.',
    },
    {
      id: 'q-sek-5',
      zone: 'sekolah',
      type: 'match_zone',
      characterId: 'dara',
      activity: 'sweep',
      prompt:
        'Pasangkan kegiatan nyata ini ke lingkungan tempat peran itu berlangsung!',
      voPrompt:
        'Pasangkan kegiatan nyata ini ke lingkungan tempat peran itu berlangsung!',
      matchItems: [
        { id: 'm4', label: 'Piket menyapu ruang kelas', targetZone: 'sekolah', iconKey: 'student' },
        { id: 'm5', label: 'Menata buku rak perpustakaan', targetZone: 'sekolah', iconKey: 'librarian' },
        { id: 'm6', label: 'Menimbang buah untuk pembeli', targetZone: 'masyarakat', iconKey: 'merchant' },
      ],
      explanationCorrect:
        'Sempurna! Piket kelas dan menata buku perpustakaan terjadi di Lingkungan Sekolah, sedangkan menimbang buah di pasar terjadi di Masyarakat.',
      explanationIncorrect:
        'Ayo perhatikan lagi! Piket kelas dan merapikan buku perpustakaan ada di Sekolah, sedangkan menimbang buah di pasar ada di Masyarakat.',
      badgeOnComplete: 'lencana_penjaga',
    },
  ],

  masyarakat: [
    {
      id: 'q-mas-1',
      zone: 'masyarakat',
      type: 'multiple_choice',
      characterId: 'banu',
      activity: 'gotong_royong',
      prompt:
        'Lihat Banu dan tetangganya! Mereka sedang bekerja bakti membersihkan taman warga dan selokan. Apa peran mereka saat itu?',
      voPrompt:
        'Lihat Banu dan tetangganya! Mereka sedang bekerja bakti membersihkan taman warga dan selokan. Apa peran mereka saat itu?',
      options: [
        { id: 'a', label: 'Warga Masyarakat', sublabel: 'Gotong royong menjaga lingkungan', iconKey: 'citizen', isCorrect: true },
        { id: 'b', label: 'Petugas Perpustakaan', sublabel: 'Merapikan buku sekolah', iconKey: 'librarian', isCorrect: false },
        { id: 'c', label: 'Penjaga Sekolah', sublabel: 'Menjaga gerbang SD', iconKey: 'gardener', isCorrect: false },
        { id: 'd', label: 'Guru Kelas', sublabel: 'Mengajar pelajaran IPA', iconKey: 'teacher', isCorrect: false },
      ],
      explanationCorrect:
        'Luar Biasa! Jawabanmu Tepat! Sebagai warga masyarakat, mengikuti kerja bakti membuat lingkungan bersih dan rukun.',
      explanationIncorrect:
        'Hampir tepat! Bekerja bakti membersihkan selokan dan taman kampung adalah tugas mulia sebagai Warga Masyarakat.',
    },
    {
      id: 'q-mas-2',
      zone: 'masyarakat',
      type: 'match_zone',
      characterId: 'dara',
      activity: 'merchant',
      prompt:
        'Pasangkan peran tokoh-tokoh hebat berikut ke tempat peranannya yang tepat!',
      voPrompt:
        'Pasangkan peran tokoh-tokoh hebat berikut ke tempat peranannya yang tepat!',
      matchItems: [
        { id: 'm7', label: 'Pedagang Buah di Pasar', targetZone: 'masyarakat', iconKey: 'merchant' },
        { id: 'm8', label: 'Dokter & Perawat Puskesmas', targetZone: 'masyarakat', iconKey: 'doctor' },
        { id: 'm9', label: 'Peserta Didik Upacara', targetZone: 'sekolah', iconKey: 'student' },
      ],
      explanationCorrect:
        'Hebat sekali! Pedagang dan Dokter berperan di Lingkungan Masyarakat, sedangkan Peserta Didik berperan di Lingkungan Sekolah.',
      explanationIncorrect:
        'Ingat ya, pedagang dan dokter berperan di lingkungan masyarakat, sedangkan peserta didik berperan di sekolah!',
    },
    {
      id: 'q-mas-3',
      zone: 'masyarakat',
      type: 'multiple_choice',
      characterId: 'aga',
      activity: 'farmer',
      prompt:
        'Pak Aga mencangkul dan menanam padi di sawah dengan tekun. Mengapa peran petani sangat penting bagi masyarakat?',
      voPrompt:
        'Pak Aga mencangkul dan menanam padi di sawah dengan tekun. Mengapa peran petani sangat penting bagi masyarakat?',
      options: [
        { id: 'a', label: 'Menghasilkan bahan pangan pokok', sublabel: 'Beras & sayuran untuk warga', iconKey: 'farmer', isCorrect: true },
        { id: 'b', label: 'Menjaga gerbang sekolah dasar', sublabel: 'Tugas penjaga sekolah', iconKey: 'gardener', isCorrect: false },
        { id: 'c', label: 'Mencatat peminjaman buku', sublabel: 'Tugas petugas perpustakaan', iconKey: 'librarian', isCorrect: false },
        { id: 'd', label: 'Membimbing PR matematika', sublabel: 'Tugas guru di kelas', iconKey: 'teacher', isCorrect: false },
      ],
      explanationCorrect:
        'Tepat sekali! Petani menghasilkan beras dan hasil panen yang menjadi sumber makanan bagi seluruh warga masyarakat.',
      explanationIncorrect:
        'Coba ingat gambarnya! Mencangkul dan menanam padi adalah peran Petani untuk menghasilkan bahan pangan pokok masyarakat.',
    },
    {
      id: 'q-mas-4',
      zone: 'masyarakat',
      type: 'multiple_choice',
      characterId: 'mia',
      activity: 'doctor',
      prompt:
        'Mengapa peran manusia di lingkungan sekolah dan masyarakat sangat beragam, seperti ada guru, petani, pedagang, dan dokter?',
      voPrompt:
        'Mengapa peran manusia di lingkungan sekolah dan masyarakat sangat beragam, seperti ada guru, petani, pedagang, dan dokter?',
      options: [
        {
          id: 'a',
          label: 'Karena perbedaan bakat, minat, tempat tinggal & kebutuhan',
          sublabel: 'Agar semua kebutuhan hidup saling terpenuhi',
          iconKey: 'diverse',
          isCorrect: true,
        },
        {
          id: 'b',
          label: 'Karena manusia dilarang bekerja sama',
          sublabel: 'Semua orang hidup sendiri-sendiri',
          iconKey: 'same',
          isCorrect: false,
        },
        {
          id: 'c',
          label: 'Karena semua pekerjaan hanya dilakukan di kelas',
          sublabel: 'Tidak ada kegiatan di luar sekolah',
          iconKey: 'school',
          isCorrect: false,
        },
        {
          id: 'd',
          label: 'Karena setiap orang memiliki bakat yang persis sama',
          sublabel: 'Tidak ada perbedaan minat',
          iconKey: 'same',
          isCorrect: false,
        },
      ],
      explanationCorrect:
        'Pintar sekali! Peran manusia beragam karena perbedaan karakter, bakat, minat, tempat tinggal, dan kebutuhan sehingga manusia bisa saling melengkapi!',
      explanationIncorrect:
        'Ayo ingat materi kita! Peran manusia beragam karena bakat, minat, tempat tinggal, dan kebutuhan hidup yang berbeda-beda.',
    },
    {
      id: 'q-mas-5',
      zone: 'masyarakat',
      type: 'multiple_choice',
      characterId: 'banu',
      activity: 'flag_ceremony',
      prompt:
        'Apakah peran kita sama di setiap lingkungan? Banu di rumah adalah anak, di sekolah peserta didik. Bagaimana peran Banu saat ikut kerja bakti di kampung?',
      voPrompt:
        'Apakah peran kita sama di setiap lingkungan? Banu di rumah adalah anak, di sekolah peserta didik. Bagaimana peran Banu saat ikut kerja bakti di kampung?',
      options: [
        {
          id: 'a',
          label: 'Berbeda! Di masyarakat Banu berperan sebagai Warga',
          sublabel: 'Peran berubah menyesuaikan tempatnya',
          iconKey: 'community',
          isCorrect: true,
        },
        {
          id: 'b',
          label: 'Sama saja, tetap sebagai petugas perpustakaan',
          sublabel: 'Peran tidak pernah berubah',
          iconKey: 'librarian',
          isCorrect: false,
        },
        {
          id: 'c',
          label: 'Menjadi pedagang buah otomatis di kelas',
          sublabel: 'Tertukar antara sekolah dan pasar',
          iconKey: 'merchant',
          isCorrect: false,
        },
        {
          id: 'd',
          label: 'Tidak memiliki peran sama sekali di kampung',
          sublabel: 'Warga tidak punya peran',
          iconKey: 'same',
          isCorrect: false,
        },
      ],
      explanationCorrect:
        'Keren banget! Peran kita berbeda di setiap lingkungan: di rumah sebagai anak, di sekolah sebagai peserta didik, dan di masyarakat sebagai warga!',
      explanationIncorrect:
        'Ingat konsep utama kita ya: peran kita berubah sesuai lingkungannya—di rumah anak, di sekolah peserta didik, di kampung warga masyarakat!',
      badgeOnComplete: 'lencana_duta',
    },
  ],
};

export const SUMMARY_POINTS = [
  {
    number: 1,
    title: 'Mengapa Peran Manusia Beragam?',
    body: 'Peran manusia beragam karena perbedaan karakter, bakat, minat, tempat tinggal, dan kebutuhan.',
  },
  {
    number: 2,
    title: 'Apakah Peran Kita Sama di Setiap Lingkungan?',
    body: 'Peran kita berbeda di setiap lingkungan: di rumah sebagai anak, di sekolah sebagai peserta didik, dan di masyarakat sebagai warga.',
  },
];
