import { useState } from 'react';
import { BADGES, QUIZ_QUESTIONS } from './data/curriculum';
import {
  FeedbackModalState,
  FrameId,
  QuizQuestion,
  ZoneId,
} from './types/game';
import { Frame1Splash } from './components/Frame1Splash';
import { Frame2Intro } from './components/Frame2Intro';
import { Frame3WorldMap } from './components/Frame3WorldMap';
import { Frame4Diorama } from './components/Frame4Diorama';
import { Frame5Quiz } from './components/Frame5Quiz';
import { FeedbackModals } from './components/FeedbackModals';
import { Frame7Victory } from './components/Frame7Victory';
import { audioEngine } from './utils/audioEngine';

function prepareZoneQuestions(zone: ZoneId): QuizQuestion[] {
  const bank = [...QUIZ_QUESTIONS[zone]];
  const typeA = bank.filter((q) => q.type === 'multiple_choice');
  const typeB = bank.filter((q) => q.type === 'match_zone');

  // Shuffle within each type while keeping alternating Type A / Type B rhythm
  const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const sA = shuffle(typeA);
  const sB = shuffle(typeB);
  const result: QuizQuestion[] = [];
  let aIdx = 0;
  let bIdx = 0;

  for (let i = 0; i < bank.length; i++) {
    if (i % 2 === 0 && aIdx < sA.length) {
      result.push(sA[aIdx++]);
    } else if (bIdx < sB.length) {
      result.push(sB[bIdx++]);
    } else if (aIdx < sA.length) {
      result.push(sA[aIdx++]);
    }
  }
  return result;
}

export default function App() {
  const [frame, setFrame] = useState<FrameId>('FRAME_1');
  const [stars, setStars] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [completedZones, setCompletedZones] = useState<ZoneId[]>([]);
  const [unlockedZone2, setUnlockedZone2] = useState(false);
  const [justUnlockedZone2, setJustUnlockedZone2] = useState(false);

  const [activeZone, setActiveZone] = useState<ZoneId>('sekolah');
  const [discoveredRoles, setDiscoveredRoles] = useState<string[]>([]);

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState | null>(null);

  const [musicEnabled, setMusicEnabled] = useState(true);
  const [voEnabled, setVoEnabled] = useState(true);

  const handleToggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    audioEngine.setMusicEnabled(next);
  };

  const handleToggleVo = () => {
    const next = !voEnabled;
    setVoEnabled(next);
    audioEngine.setVoEnabled(next);
  };

  const awardBadge = (badgeId: string) => {
    setBadges((prev) => (prev.includes(badgeId) ? prev : [...prev, badgeId]));
    return BADGES.find((b) => b.id === badgeId);
  };

  const handleStartGame = () => {
    setStars(0);
    setBadges([]);
    setCompletedZones([]);
    setUnlockedZone2(false);
    setJustUnlockedZone2(false);
    setDiscoveredRoles([]);
    setQuizIndex(0);
    setLives(3);
    setFeedbackModal(null);
    setFrame('FRAME_2');
  };

  const handleSelectZone = (zone: ZoneId) => {
    setActiveZone(zone);
    setFrame('FRAME_4');
  };

  const handleDiscoverRole = (roleId: string) => {
    setDiscoveredRoles((prev) => (prev.includes(roleId) ? prev : [...prev, roleId]));
  };

  const handleStartQuiz = () => {
    // Award exploration badge upon completing zone diorama observation
    if (activeZone === 'sekolah') {
      awardBadge('lencana_pelajar');
    } else {
      awardBadge('lencana_warga');
    }
    setActiveQuestions(prepareZoneQuestions(activeZone));
    setQuizIndex(0);
    setLives(3);
    setFrame('FRAME_5');
  };

  const handleAnswerQuiz = (isCorrect: boolean) => {
    const currentQ = activeQuestions[quizIndex];
    if (!currentQ) return;

    if (isCorrect) {
      setStars((prev) => prev + 20);

      let badgeAwarded;
      if (quizIndex === activeQuestions.length - 1) {
        const endBadgeId = activeZone === 'sekolah' ? 'lencana_penjaga' : 'lencana_duta';
        badgeAwarded = awardBadge(endBadgeId);
      }

      setFeedbackModal({
        type: 'correct',
        explanation: currentQ.explanationCorrect,
        pointsAdded: 20,
        badgeAwarded,
      });
    } else {
      const nextLives = lives - 1;
      const refilled = nextLives <= 0;
      setLives(refilled ? 3 : nextLives);

      setFeedbackModal({
        type: 'incorrect',
        explanation: currentQ.explanationIncorrect,
        pointsAdded: 0,
        refilledHearts: refilled,
      });
    }
  };

  const handleContinueAfterFeedback = () => {
    setFeedbackModal(null);

    if (quizIndex < activeQuestions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      return;
    }

    // Finished 5th question of active zone!
    if (activeZone === 'sekolah') {
      awardBadge('lencana_pelajar');
      awardBadge('lencana_penjaga');
      setCompletedZones((prev) => (prev.includes('sekolah') ? prev : [...prev, 'sekolah']));
      if (!unlockedZone2) {
        setUnlockedZone2(true);
        setJustUnlockedZone2(true);
      }
      setFrame('FRAME_3');
    } else {
      awardBadge('lencana_warga');
      awardBadge('lencana_duta');
      setCompletedZones((prev) => (prev.includes('masyarakat') ? prev : [...prev, 'masyarakat']));
      setFrame('FRAME_7');
    }
  };

  const handlePlayAgain = () => {
    setStars(0);
    setBadges([]);
    setCompletedZones([]);
    setUnlockedZone2(false);
    setJustUnlockedZone2(false);
    setDiscoveredRoles([]);
    setFeedbackModal(null);
    setFrame('FRAME_1');
  };

  return (
    <>
      {frame === 'FRAME_1' && (
        <Frame1Splash
          musicEnabled={musicEnabled}
          voEnabled={voEnabled}
          onToggleMusic={handleToggleMusic}
          onToggleVo={handleToggleVo}
          onStart={handleStartGame}
        />
      )}

      {frame === 'FRAME_2' && (
        <Frame2Intro
          stars={stars}
          badgeCount={badges.length}
          musicEnabled={musicEnabled}
          voEnabled={voEnabled}
          onToggleMusic={handleToggleMusic}
          onToggleVo={handleToggleVo}
          onContinueToMap={() => setFrame('FRAME_3')}
        />
      )}

      {frame === 'FRAME_3' && (
        <Frame3WorldMap
          stars={stars}
          badgeCount={badges.length}
          unlockedZone2={unlockedZone2}
          justUnlockedZone2={justUnlockedZone2}
          completedZones={completedZones}
          musicEnabled={musicEnabled}
          voEnabled={voEnabled}
          onToggleMusic={handleToggleMusic}
          onToggleVo={handleToggleVo}
          onBackToMaterial={() => setFrame('FRAME_2')}
          onSelectZone={handleSelectZone}
          onAcknowledgeUnlock={() => setJustUnlockedZone2(false)}
        />
      )}

      {frame === 'FRAME_4' && (
        <Frame4Diorama
          zone={activeZone}
          stars={stars}
          badgeCount={badges.length}
          discoveredIds={discoveredRoles}
          musicEnabled={musicEnabled}
          voEnabled={voEnabled}
          onToggleMusic={handleToggleMusic}
          onToggleVo={handleToggleVo}
          onDiscoverRole={handleDiscoverRole}
          onBackToMap={() => setFrame('FRAME_3')}
          onStartQuiz={handleStartQuiz}
        />
      )}

      {frame === 'FRAME_5' && activeQuestions[quizIndex] && (
        <Frame5Quiz
          question={activeQuestions[quizIndex]}
          questionIndex={quizIndex}
          totalQuestions={activeQuestions.length}
          stars={stars}
          lives={lives}
          onAnswer={handleAnswerQuiz}
        />
      )}

      {frame === 'FRAME_7' && (
        <Frame7Victory
          stars={stars}
          earnedBadges={badges}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {feedbackModal && (
        <FeedbackModals
          modal={feedbackModal}
          onContinue={handleContinueAfterFeedback}
        />
      )}
    </>
  );
}
