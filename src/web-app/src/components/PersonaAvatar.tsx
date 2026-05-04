'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: string;
  color: string;
}

export const PersonaAvatar: React.FC<Props> = ({ code, color }) => {
  const renderTotem = () => {
    switch (code) {
      case 'UODP': // AI 驯化大师
        return (
          <g>
            <motion.rect x="70" y="70" width="60" height="60" stroke={color} strokeWidth="4" fill="none" animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
            <motion.rect x="55" y="55" width="90" height="90" stroke={color} strokeWidth="2" opacity="0.5" fill="none" animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
            <motion.circle cx="100" cy="100" r="10" fill={color} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }} />
          </g>
        );
      case 'UODR': // 全自动咸鱼
        return (
          <g>
            {[...Array(4)].map((_, i) => (
              <motion.circle key={i} cx={70 + i * 20} cy={80 + (i % 2) * 40} r={15 + i * 5} fill={color} fillOpacity={0.3} animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </g>
        );
      case 'UOMP': // 人间清醒派
        return (
          <g>
            <motion.circle cx="100" cy="100" r="50" stroke={color} strokeWidth="8" fill="none" animate={{ strokeDasharray: ["1, 200", "150, 200", "1, 200"] }} transition={{ duration: 3, repeat: Infinity }} />
            <circle cx="100" cy="100" r="15" fill={color} />
            <path d="M100 20 L100 50 M100 150 L100 180 M20 100 L50 100 M150 100 L180 100" stroke={color} strokeWidth="3" />
          </g>
        );
      case 'UOMR': // 社畜生存狂
        return (
          <g>
            <motion.rect x="50" y="20" width="100" height="15" fill={color} animate={{ y: [0, 65, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "anticipate" }} />
            <motion.ellipse cx="100" cy="100" rx="40" ry="40" fill={color} opacity="0.4" animate={{ ry: [40, 15, 40], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, ease: "anticipate" }} />
            <rect x="30" y="140" width="140" height="5" fill={color} />
          </g>
        );
      case 'UCDP': // 刀尖起舞者
        return (
          <g>
            <motion.path d="M30 100 L170 100" stroke={color} strokeWidth="4" animate={{ y: [0, -30, 30, 0] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.polygon points="100,60 120,110 80,110" fill={color} animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
          </g>
        );
      case 'UCDR': // 技术甩锅侠
        return (
          <g>
            <motion.path d="M100 40 L130 160 L70 160 Z" fill="none" stroke={color} strokeWidth="4" animate={{ skewX: [0, 20, -20, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
            {[...Array(6)].map((_, i) => (
              <motion.circle key={i} cx="100" cy="100" r="3" fill={color} animate={{ x: [0, (i-3)*40], y: [0, -100], opacity: [1, 0] }} transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }} />
            ))}
          </g>
        );
      case 'UCMP': // 硬核防雷员
        return (
          <g>
            <path d="M100 30 C150 30 180 80 180 100 C180 150 100 180 100 180 C100 180 20 150 20 100 C20 80 50 30 100 30" stroke={color} strokeWidth="6" fill="none" />
            <motion.circle cx="100" cy="90" r="20" fill={color} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          </g>
        );
      case 'UCMR': // 精神内耗王
        return (
          <g>
            <motion.path d="M50 100 Q 75 50 100 100 T 150 100" stroke={color} strokeWidth="4" fill="none" animate={{ strokeDashoffset: [0, 100] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <motion.path d="M50 100 Q 75 150 100 100 T 150 100" stroke={color} strokeWidth="4" fill="none" opacity="0.5" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <motion.circle cx="100" cy="100" r="15" fill={color} animate={{ scale: [1, 2, 1], opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          </g>
        );
      case 'SODP': // 反侦察专家
        return (
          <g>
            <rect x="40" y="80" width="120" height="40" fill={color} opacity="0.1" />
            <motion.rect x="40" y="80" width="30" height="40" fill={color} animate={{ x: [40, 130, 40] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <path d="M100 30 L140 160 L60 160 Z" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 'SODR': // 赛博逃票者
        return (
          <g>
            <line x1="30" y1="60" x2="170" y2="60" stroke={color} strokeWidth="2" strokeDasharray="5,5" />
            <line x1="30" y1="140" x2="170" y2="140" stroke={color} strokeWidth="2" strokeDasharray="5,5" />
            <motion.circle r="12" fill={color} animate={{ x: [50, 150, 80, 120, 50], y: [80, 120, 70, 130, 80], opacity: [1, 0, 1, 0, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
          </g>
        );
      case 'SOMP': // 数字主理人
        return (
          <g>
            {[0, 120, 240].map(deg => (
              <motion.path 
                key={deg} d="M100 40 L150 70 L150 130 L100 160 L50 130 L50 70 Z" 
                stroke={color} strokeWidth="2" fill="none"
                animate={{ rotate: deg + 360, scale: [0.8, 1, 0.8] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <motion.path d="M100 60 L135 120 L65 120 Z" fill={color} animate={{ opacity: [0.3, 1, 0.3] }} />
          </g>
        );
      case 'SOMR': // [NEW] 断网守望者 - 层层闭合迷宫
        return (
          <g>
            {[0, 1, 2].map(i => (
              <motion.rect 
                key={i} x={40 + i*15} y={40 + i*15} width={120 - i*30} height={120 - i*30} 
                stroke={color} strokeWidth={8 - i*2} fill="none"
                animate={{ strokeOpacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, delay: i*0.5, repeat: Infinity }}
              />
            ))}
            <circle cx="100" cy="100" r="5" fill={color} />
          </g>
        );
      case 'SCDP': // 维权战神
        return (
          <g>
            <motion.path d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" stroke={color} strokeWidth="4" fill="none" animate={{ strokeOpacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <path d="M100 50 L100 150 M50 100 L150 100" stroke={color} strokeWidth="12" strokeLinecap="square" />
          </g>
        );
      case 'SCDR': // [REFINED] 监控下的囚徒 - 高位铁窗
        return (
          <g>
            {/* 方块位置极限上抬：起始于 45px，活动于 45-75px 之间 (栅栏高度为 40-160) */}
            <motion.rect 
              x="85" y="45" width="30" height="30" fill={color} 
              animate={{ y: [45, 75, 45], opacity: [0.6, 1, 0.6] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
            />
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={50 + i * 14} y1="40" x2={50 + i * 14} y2="160" stroke={color} strokeWidth="5" />
            ))}
          </g>
        );
      case 'SCMP': // 数据洁癖狂
        return (
          <g>
            <rect x="60" y="60" width="80" height="80" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
            <motion.rect x="50" y="60" width="100" height="2" fill={color} animate={{ y: [0, 80, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
            <circle cx="100" cy="100" r="15" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 'SCDA': // 数字透明人
        return (
          <g>
            {[...Array(12)].map((_, i) => (
              <motion.circle key={i} cx="100" cy="100" r={2} fill={color} animate={{ x: [0, (Math.random() - 0.5) * 160], y: [0, (Math.random() - 0.5) * 160], opacity: [1, 0] }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
            ))}
            <motion.circle cx="100" cy="100" r="20" fill={color} opacity="0.2" animate={{ scale: [1, 0.5, 1] }} />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="100" cy="100" r="40" fill={color} />
            <motion.circle cx="100" cy="100" r="60" stroke={color} strokeWidth="2" fill="none" animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          </g>
        );
    }
  };

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ width: '100%', height: '100%', maxWidth: '200px', maxHeight: '200px', margin: '0 auto' }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g filter="url(#glow)">
          {renderTotem()}
        </g>
      </svg>
    </motion.div>
  );
};
