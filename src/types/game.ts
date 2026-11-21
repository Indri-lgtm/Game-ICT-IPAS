export type FrameId = 'FRAME_1' | 'FRAME_2' | 'FRAME_3' | 'FRAME_4' | 'FRAME_5' | 'FRAME_7';

export type ZoneId = 'sekolah' | 'masyarakat';

export type CharacterId = 'dara' | 'banu' | 'ian' | 'aga' | 'mia';

export type ActivityType =
  | 'sweep'
  | 'teach'
  | 'librarian'
  | 'gardener'
  | 'gotong_royong'
  | 'merchant'
  | 'farmer'
  | 'doctor'
  | 'group_study'
  | 'flag_ceremony';

export interface BadgeInfo {
  id: string;
  title: string;
  subtitle: string;
  zone: ZoneId;
  color: string;
  iconName: 'book' | 'leaf' | 'users' | 'award';
}

export interface MaterialCard {
  id: string;
  title: string;
  kicker: string;
  frontSummary: string;
  backDetail: string;
  exampleText: string;
  voText: string;
  illustration: 'ceremony' | 'farmer' | 'gotong_royong' | 'home_school';
  accentColor: string;
}

export interface DioramaRole {
  id: string;
  zone: ZoneId;
  roleName: string;
  characterId: CharacterId;
  characterLabel: string;
  activity: ActivityType;
  activitiesText: string;
  whyImportant: string;
  voText: string;
  position: { xPercent: number; yPercent: number };
}

export interface QuizOption {
  id: string;
  label: string;
  sublabel?: string;
  iconKey:
    | 'student'
    | 'teacher'
    | 'librarian'
    | 'gardener'
    | 'citizen'
    | 'merchant'
    | 'farmer'
    | 'doctor'
    | 'diverse'
    | 'same'
    | 'school'
    | 'community';
  isCorrect?: boolean;
}

export interface MatchItem {
  id: string;
  label: string;
  targetZone: 'sekolah' | 'masyarakat';
  iconKey: QuizOption['iconKey'];
}

export interface QuizQuestion {
  id: string;
  zone: ZoneId;
  type: 'multiple_choice' | 'match_zone';
  characterId: CharacterId;
  activity: ActivityType;
  prompt: string;
  voPrompt: string;
  options?: QuizOption[];
  matchItems?: MatchItem[];
  explanationCorrect: string;
  explanationIncorrect: string;
  badgeOnComplete?: string;
}

export interface FeedbackModalState {
  type: 'correct' | 'incorrect';
  explanation: string;
  pointsAdded: number;
  badgeAwarded?: BadgeInfo;
  refilledHearts?: boolean;
}
