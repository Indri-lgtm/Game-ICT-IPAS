import React from 'react';
import { ActivityType, CharacterId } from '../types/game';

interface CharacterProps {
  id: CharacterId;
  pose?: 'wave' | 'idle' | 'jump' | 'scratch' | 'guide';
  isSpeaking?: boolean;
  className?: string;
  showName?: boolean;
}

const CHARACTER_PALETTE: Record<
  CharacterId,
  {
    name: string;
    skin: string;
    hair: string;
    shirt: string;
    accent: string;
    pants: string;
  }
> = {
  dara: {
    name: 'Dara',
    skin: '#FCD5B5',
    hair: '#3B2314',
    shirt: '#FFFFFF',
    accent: '#EF4444', // Red SD tie/skirt
    pants: '#DC2626',
  },
  banu: {
    name: 'Banu',
    skin: '#F3C19D',
    hair: '#1E293B',
    shirt: '#FFFFFF',
    accent: '#F59E0B', // Scout kerchief
    pants: '#DC2626',
  },
  ian: {
    name: 'Ian',
    skin: '#FDE0C6',
    hair: '#451A03',
    shirt: '#10B981',
    accent: '#FEF08A',
    pants: '#1D4ED8',
  },
  aga: {
    name: 'Aga',
    skin: '#E0A984',
    hair: '#171717',
    shirt: '#0EA5E9',
    accent: '#FBBF24',
    pants: '#334155',
  },
  mia: {
    name: 'Mia',
    skin: '#FCD9BD',
    hair: '#291D16',
    shirt: '#0D9488',
    accent: '#F472B6',
    pants: '#0F766E',
  },
};

export const CartoonCharacter: React.FC<CharacterProps> = ({
  id,
  pose = 'idle',
  isSpeaking = false,
  className = 'w-28 h-36',
  showName = false,
}) => {
  const p = CHARACTER_PALETTE[id];

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 120 150"
        className={`w-full h-full overflow-visible ${
          pose === 'jump' ? 'animate-joy-bounce' : 'animate-breathe'
        }`}
        aria-label={`Karakter ${p.name}`}
      >
        {/* Ground Shadow */}
        <ellipse cx="60" cy="142" rx="28" ry="6" fill="rgba(15,23,42,0.12)" />

        {/* Legs & Shoes */}
        <rect x="44" y="106" width="11" height="28" rx="5" fill={p.skin} />
        <rect x="65" y="106" width="11" height="28" rx="5" fill={p.skin} />
        <ellipse cx="49" cy="135" rx="9" ry="5" fill="#1E293B" />
        <ellipse cx="71" cy="135" rx="9" ry="5" fill="#1E293B" />

        {/* Pants / Skirt */}
        {id === 'dara' || id === 'mia' ? (
          <path d="M36 96 L84 96 L90 118 L30 118 Z" fill={p.pants} stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        ) : (
          <g>
            <rect x="40" y="96" width="18" height="20" rx="5" fill={p.pants} stroke="#1E293B" strokeWidth="2" />
            <rect x="62" y="96" width="18" height="20" rx="5" fill={p.pants} stroke="#1E293B" strokeWidth="2" />
          </g>
        )}

        {/* Left Arm */}
        <g
          className={pose === 'wave' ? 'animate-wave' : ''}
          style={pose === 'wave' ? { transformOrigin: '38px 72px' } : undefined}
        >
          <path
            d={pose === 'wave' ? 'M38 72 Q20 55 18 36' : 'M38 72 Q26 84 28 96'}
            fill="none"
            stroke={p.skin}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <circle cx={pose === 'wave' ? 18 : 28} cy={pose === 'wave' ? 35 : 97} r="6" fill={p.skin} />
        </g>

        {/* Right Arm (Scratching head in pose='scratch' or waving) */}
        <g
          className={pose === 'wave' && id === 'banu' ? 'animate-wave' : ''}
          style={pose === 'wave' && id === 'banu' ? { transformOrigin: '82px 72px' } : undefined}
        >
          {pose === 'scratch' ? (
            <g>
              <path
                d="M82 72 Q100 58 88 32"
                fill="none"
                stroke={p.skin}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="87" cy="31" r="6" fill={p.skin} />
            </g>
          ) : (
            <g>
              <path
                d="M82 72 Q94 84 92 96"
                fill="none"
                stroke={p.skin}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <circle cx="92" cy="97" r="6" fill={p.skin} />
            </g>
          )}
        </g>

        {/* Torso / Shirt */}
        <rect
          x="38"
          y="64"
          width="44"
          height="36"
          rx="12"
          fill={p.shirt}
          stroke="#1E293B"
          strokeWidth="2.2"
        />
        {/* Shirt Accent / Tie / Kerchief */}
        {id === 'dara' && (
          <path d="M56 65 L64 65 L62 84 L60 88 L58 84 Z" fill={p.accent} />
        )}
        {id === 'banu' && (
          <path d="M44 65 L76 65 L60 82 Z" fill={p.accent} stroke="#B45309" strokeWidth="1.5" />
        )}
        {id === 'mia' && (
          <path d="M50 65 L70 65 L60 76 Z" fill="#FFFFFF" />
        )}
        {id === 'aga' && (
          <rect x="44" y="74" width="32" height="7" rx="3.5" fill={p.accent} />
        )}
        {id === 'ian' && (
          <circle cx="60" cy="78" r="6" fill={p.accent} />
        )}

        {/* Hair Back (for girls) */}
        {id === 'dara' && (
          <g>
            <circle cx="29" cy="40" r="10" fill={p.hair} />
            <circle cx="91" cy="40" r="10" fill={p.hair} />
            <circle cx="32" cy="36" r="3.5" fill="#EF4444" />
            <circle cx="88" cy="36" r="3.5" fill="#EF4444" />
          </g>
        )}
        {id === 'mia' && (
          <path d="M32 38 Q30 62 38 66 L82 66 Q90 62 88 38 Z" fill={p.hair} />
        )}

        {/* Head */}
        <circle cx="60" cy="42" r="24" fill={p.skin} stroke="#1E293B" strokeWidth="2.2" />

        {/* Hair Front */}
        {id === 'dara' && (
          <path d="M36 38 Q48 16 60 22 Q72 16 84 38 Q72 28 60 30 Q48 28 36 38 Z" fill={p.hair} />
        )}
        {id === 'banu' && (
          <path d="M36 36 Q38 14 55 18 L60 11 L68 18 Q84 16 84 36 Q70 26 60 28 Q50 26 36 36 Z" fill={p.hair} />
        )}
        {id === 'ian' && (
          <path d="M36 36 Q42 15 62 17 Q82 17 84 36 Q70 25 60 27 Q48 25 36 36 Z" fill={p.hair} />
        )}
        {id === 'aga' && (
          <g>
            <path d="M36 34 Q46 16 64 16 Q82 16 84 34 Z" fill="#0EA5E9" stroke="#1E293B" strokeWidth="2" />
            <path d="M34 32 L78 32" stroke="#FBBF24" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
        {id === 'mia' && (
          <g>
            <path d="M36 36 Q46 15 60 18 Q74 15 84 36 Q72 26 60 28 Q48 26 36 36 Z" fill={p.hair} />
            <path d="M39 29 Q60 16 81 29" fill="none" stroke="#F472B6" strokeWidth="4.5" strokeLinecap="round" />
          </g>
        )}

        {/* Rosy Cheeks */}
        <circle cx="44" cy="48" r="4" fill="#FDA4AF" opacity="0.65" />
        <circle cx="76" cy="48" r="4" fill="#FDA4AF" opacity="0.65" />

        {/* Blinking Eyes */}
        <g className="animate-blink" style={{ transformOrigin: '60px 41px' }}>
          <circle cx="50" cy="41" r="3.6" fill="#1E293B" />
          <circle cx="70" cy="41" r="3.6" fill="#1E293B" />
          <circle cx="51.2" cy="39.8" r="1.2" fill="#FFFFFF" />
          <circle cx="71.2" cy="39.8" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Ian's Glasses */}
        {id === 'ian' && (
          <g fill="none" stroke="#1E293B" strokeWidth="2">
            <circle cx="50" cy="41" r="7" />
            <circle cx="70" cy="41" r="7" />
            <line x1="57" y1="41" x2="63" y2="41" />
          </g>
        )}

        {/* Mouth (Lip-sync or Smile) */}
        {isSpeaking ? (
          <ellipse
            cx="60"
            cy="53"
            rx="5.5"
            ry="4"
            fill="#9F1239"
            className="animate-lipsync"
            style={{ transformOrigin: '60px 53px' }}
          />
        ) : pose === 'scratch' ? (
          <path d="M54 53 Q60 56 66 52" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        ) : (
          <path d="M53 51 Q60 59 67 51" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        )}
      </svg>
      {showName && (
        <span className="mt-1 text-xs font-bold tracking-wide text-slate-700 bg-white/85 px-2.5 py-0.5 rounded-md shadow-xs">
          {p.name}
        </span>
      )}
    </div>
  );
};

interface ActivitySceneProps {
  characterId: CharacterId;
  activity: ActivityType;
  size?: 'sm' | 'md' | 'lg';
}

export const ActivityScene: React.FC<ActivitySceneProps> = ({
  characterId,
  activity,
  size = 'md',
}) => {
  const boxSize =
    size === 'lg' ? 'w-56 h-44' : size === 'sm' ? 'w-28 h-24' : 'w-44 h-36';

  return (
    <div
      className={`relative ${boxSize} rounded-2xl bg-gradient-to-b from-sky-100 via-white to-emerald-50 border-2 border-slate-200/80 overflow-hidden flex items-end justify-center p-2 shadow-inner select-none`}
    >
      {/* Contextual Background Props */}
      <svg viewBox="0 0 220 150" className="absolute inset-0 w-full h-full pointer-events-none">
        {activity === 'teach' && (
          <g>
            {/* Blackboard */}
            <rect x="20" y="16" width="130" height="72" rx="6" fill="#065F46" stroke="#92400E" strokeWidth="5" />
            <line x1="35" y1="36" x2="98" y2="36" stroke="#FEF9C3" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="35" y1="52" x2="122" y2="52" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
            <line x1="35" y1="68" x2="84" y2="68" stroke="#FEF9C3" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {activity === 'librarian' && (
          <g>
            {/* Bookshelf */}
            <rect x="18" y="18" width="96" height="96" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="3" />
            <rect x="24" y="25" width="84" height="24" fill="#FEF3C7" />
            <rect x="24" y="55" width="84" height="24" fill="#FEF3C7" />
            {/* Books */}
            <rect x="28" y="28" width="9" height="20" rx="1" fill="#EF4444" />
            <rect x="39" y="30" width="9" height="18" rx="1" fill="#0EA5E9" />
            <rect x="50" y="27" width="10" height="21" rx="1" fill="#10B981" />
            <rect x="62" y="29" width="9" height="19" rx="1" fill="#F59E0B" />
            <rect x="28" y="58" width="10" height="20" rx="1" fill="#8B5CF6" />
            <rect x="40" y="57" width="9" height="21" rx="1" fill="#EC4899" />
            <rect x="52" y="60" width="9" height="18" rx="1" fill="#14B8A6" />
          </g>
        )}

        {activity === 'gardener' && (
          <g>
            {/* Garden Bush & Flowers */}
            <ellipse cx="42" cy="126" rx="28" ry="18" fill="#22C55E" />
            <circle cx="32" cy="116" r="6" fill="#F43F5E" />
            <circle cx="48" cy="112" r="6" fill="#FBBF24" />
            <circle cx="56" cy="124" r="5" fill="#EC4899" />
            {/* Watering droplets */}
            <g className="animate-water">
              <circle cx="72" cy="96" r="3" fill="#38BDF8" />
              <circle cx="80" cy="102" r="2.5" fill="#0EA5E9" />
              <circle cx="64" cy="105" r="2.8" fill="#38BDF8" />
            </g>
          </g>
        )}

        {activity === 'sweep' && (
          <g>
            {/* Classroom Floor & Broom */}
            <rect x="0" y="122" width="220" height="28" fill="#FDE68A" />
            <g className="animate-sweep" style={{ transformOrigin: '75px 65px' }}>
              <line x1="75" y1="65" x2="54" y2="122" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
              <path d="M40 120 L66 120 L70 134 L36 134 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
            </g>
          </g>
        )}

        {activity === 'gotong_royong' && (
          <g>
            <rect x="0" y="120" width="220" height="30" fill="#86EFAC" />
            <rect x="26" y="88" width="28" height="36" rx="4" fill="#10B981" stroke="#065F46" strokeWidth="2.5" />
            <rect x="23" y="83" width="34" height="7" rx="2" fill="#047857" />
            <g className="animate-sweep" style={{ transformOrigin: '78px 70px' }}>
              <line x1="78" y1="70" x2="58" y2="124" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M48 124 L68 124 L64 134 L52 134 Z" fill="#D97706" />
            </g>
          </g>
        )}

        {activity === 'merchant' && (
          <g>
            {/* Market Stall & Weighing Scale */}
            <rect x="18" y="96" width="88" height="44" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
            <path d="M12 36 L112 36 L104 54 L20 54 Z" fill="#EF4444" />
            {/* Apples & Oranges */}
            <circle cx="36" cy="90" r="7" fill="#EF4444" />
            <circle cx="48" cy="90" r="7" fill="#F97316" />
            <circle cx="60" cy="90" r="7" fill="#22C55E" />
            {/* Scale */}
            <g className="animate-scale" style={{ transformOrigin: '86px 78px' }}>
              <line x1="86" y1="74" x2="86" y2="96" stroke="#334155" strokeWidth="3" />
              <line x1="70" y1="78" x2="102" y2="78" stroke="#334155" strokeWidth="3" />
              <path d="M64 88 L76 88 L70 78 Z" fill="#94A3B8" />
              <path d="M96 88 L108 88 L102 78 Z" fill="#94A3B8" />
            </g>
          </g>
        )}

        {activity === 'farmer' && (
          <g>
            {/* Green Rice Field & Hoe */}
            <rect x="0" y="114" width="220" height="36" fill="#4ADE80" />
            <path d="M22 118 Q26 96 30 118 M34 118 Q38 94 42 118 M46 118 Q50 98 54 118" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
            <g className="animate-hoe" style={{ transformOrigin: '88px 75px' }}>
              <line x1="88" y1="75" x2="48" y2="116" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M40 110 L54 122" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            </g>
          </g>
        )}

        {activity === 'doctor' && (
          <g>
            {/* Clinic Cross & Clipboard */}
            <rect x="24" y="24" width="52" height="52" rx="12" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2.5" />
            <rect x="45" y="34" width="10" height="32" rx="2" fill="#EF4444" />
            <rect x="34" y="45" width="32" height="10" rx="2" fill="#EF4444" />
            <g className="animate-arm-raise" style={{ transformOrigin: '78px 80px' }}>
              <path d="M74 68 Q62 82 74 96" fill="none" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="75" cy="98" r="5" fill="#0284C7" />
            </g>
          </g>
        )}

        {activity === 'group_study' && (
          <g>
            <rect x="24" y="108" width="90" height="28" rx="4" fill="#D97706" />
            <rect x="38" y="96" width="28" height="14" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="72" y="98" width="24" height="12" rx="2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
            <g className="animate-arm-raise" style={{ transformOrigin: '55px 50px' }}>
              <circle cx="52" cy="40" r="13" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
              <text x="52" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0D9488">?</text>
            </g>
          </g>
        )}

        {activity === 'flag_ceremony' && (
          <g>
            <line x1="42" y1="18" x2="42" y2="132" stroke="#64748B" strokeWidth="4" />
            <g className="animate-flag" style={{ transformOrigin: '42px 24px' }}>
              <rect x="44" y="20" width="44" height="14" fill="#EF4444" />
              <rect x="44" y="34" width="44" height="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            </g>
          </g>
        )}
      </svg>

      {/* Character Positioned on Stage */}
      <div className="relative z-10 translate-x-7">
        <CartoonCharacter
          id={characterId}
          pose={activity === 'group_study' || activity === 'teach' ? 'wave' : 'idle'}
          className={size === 'lg' ? 'w-28 h-36' : size === 'sm' ? 'w-16 h-20' : 'w-24 h-30'}
        />
      </div>
    </div>
  );
};
