import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: string;
  color: string;
}

export const PersonaAvatar: React.FC<Props> = ({ code, color }) => {
  // 根据 code 返回不同的 SVG 形象组合
  // 这里我们为每种人格设计一个核心视觉构图
  
  const renderCharacter = () => {
    switch (code) {
      case 'UODP': // AI 驯化大师
        return (
          <g>
            <circle cx="100" cy="80" r="30" fill={color} fillOpacity="0.2" />
            <path d="M85 50 L100 30 L115 50 L130 40 L100 10 L70 40 Z" fill={color} /> {/* 皇冠 */}
            <rect x="90" y="80" width="20" height="60" rx="10" fill={color} /> {/* 身体 */}
            <circle cx="130" cy="90" r="15" fill={color} className="animate-pulse">
               <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
            </circle> {/* 能量球 */}
          </g>
        );
      case 'UODR': // 全自动咸鱼
        return (
          <g>
            <path d="M60 100 Q100 130 140 100 Q100 70 60 100" fill={color} fillOpacity="0.3" /> {/* 气泡 */}
            <circle cx="100" cy="95" r="25" fill={color} /> {/* 咸鱼头 */}
            <rect x="85" y="85" width="30" height="10" rx="5" fill="#fff" fillOpacity="0.5" /> {/* 睡眠眼 */}
          </g>
        );
      case 'SCDP': // 维权战神
        return (
          <g>
            <path d="M70 40 L130 40 L130 120 L100 140 L70 120 Z" fill={color} /> {/* 盾牌主体 */}
            <path d="M90 60 L110 60 L110 100 L120 100 L100 120 L80 100 L90 100 Z" fill="#fff" /> {/* 法槌符号 */}
          </g>
        );
      case 'SCMP': // 数据洁癖狂
        return (
          <g>
            <path d="M100 30 C130 70 130 110 100 140 C70 110 70 70 100 30" fill={color} /> {/* 纯净水滴 */}
            <circle cx="100" cy="85" r="40" stroke={color} strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </g>
        );
      case 'UOMR': // 社畜生存狂
        return (
          <g>
            <rect x="70" y="60" width="60" height="80" rx="5" fill={color} fillOpacity="0.2" />
            <path d="M60 50 L140 50 M60 80 L140 80 M60 110 L140 110" stroke={color} strokeWidth="1" /> {/* 栅栏 */}
            <circle cx="100" cy="90" r="20" fill={color} />
          </g>
        );
      default:
        // 通用简约形象
        return (
          <g>
            <circle cx="100" cy="70" r="35" fill={color} />
            <rect x="80" y="110" width="40" height="40" rx="10" fill={color} />
            <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
          </g>
        );
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      style={{ width: '180px', height: '180px', margin: '0 auto' }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <radialGradient id={`grad-${code}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill={`url(#grad-${code})`} />
        {renderCharacter()}
      </svg>
    </motion.div>
  );
};
