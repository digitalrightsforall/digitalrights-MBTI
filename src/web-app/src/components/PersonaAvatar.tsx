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
      case 'UODP': // AI 驯化大师 (效率、乐观、让渡、积极)
        return (
          <g>
            <motion.circle cx="100" cy="100" r="50" fill={color} fillOpacity="0.1" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.path d="M100 40 L160 100 L100 160 L40 100 Z" stroke={color} strokeWidth="4" fill="none" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
            <motion.circle cx="100" cy="100" r="10" fill={color} animate={{ r: [8, 15, 8] }} transition={{ duration: 1.5, repeat: Infinity }} />
            {[0, 90, 180, 270].map(deg => (
              <motion.line key={deg} x1="100" y1="100" x2="100" y2="30" stroke={color} strokeWidth="2" strokeDasharray="4,4" transform={`rotate(${deg} 100 100)`} />
            ))}
          </g>
        );
      case 'UODR': // 全自动咸鱼 (效率、乐观、让渡、被动)
        return (
          <g>
            <motion.path 
              d="M40 100 Q100 140 160 100 Q100 60 40 100" 
              fill={color} 
              fillOpacity="0.6"
              animate={{ d: [
                "M40 100 Q100 150 160 100 Q100 50 40 100",
                "M40 100 Q100 120 160 100 Q100 80 40 100",
                "M40 100 Q100 150 160 100 Q100 50 40 100"
              ]}}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle cx="100" cy="100" r="40" stroke={color} strokeWidth="1" fill="none" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
          </g>
        );
      case 'SCMP': // 数据洁癖狂 (主权、审慎、掌控、积极)
        return (
          <g>
            <rect x="60" y="60" width="80" height="80" stroke={color} strokeWidth="6" fill="none" />
            <motion.path 
              d="M100 20 L100 180 M20 100 L180 100" 
              stroke={color} 
              strokeWidth="2" 
              animate={{ rotate: 90 }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
            />
            <circle cx="100" cy="100" r="10" fill={color} />
          </g>
        );
      case 'SCDP': // 维权战神 (主权、审慎、让渡、积极)
        return (
          <g>
            <motion.path 
              d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" 
              stroke={color} strokeWidth="4" fill="none"
              animate={{ strokeOpacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path d="M100 50 L100 150 M50 100 L150 100" stroke={color} strokeWidth="12" strokeLinecap="square" />
          </g>
        );
      case 'UOMR': // 社畜生存狂 (效用、乐观、掌控、被动)
        return (
          <g>
            <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="2" fill="none" strokeDasharray="2,2" />
            <motion.path 
              d="M100 50 A50 50 0 0 1 150 100" 
              stroke={color} strokeWidth="12" strokeLinecap="round" fill="none"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <rect x="90" y="90" width="20" height="20" fill={color} />
          </g>
        );
      case 'SCDR': // 监控下的囚徒 (主权、审慎、让渡、被动)
        return (
          <g>
            {[...Array(6)].map((_, i) => (
              <line key={i} x1={60 + i * 16} y1="40" x2={60 + i * 16} y2="160" stroke={color} strokeWidth="3" opacity="0.3" />
            ))}
            <motion.circle 
              cx="100" cy="100" r="30" fill={color} 
              animate={{ y: [0, 15, 0], scale: [1, 0.9, 1] }} 
              transition={{ duration: 3, repeat: Infinity }} 
            />
          </g>
        );
      case 'SOMP': // 数字主理人 (主权、乐观、掌控、积极)
        return (
          <g>
            <rect x="50" y="50" width="100" height="100" stroke={color} strokeWidth="2" fill="none" />
            <motion.circle cx="50" cy="50" r="10" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.circle cx="150" cy="50" r="10" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
            <motion.circle cx="150" cy="150" r="10" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
            <motion.circle cx="50" cy="150" r="10" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }} />
            <path d="M100 80 L120 120 L80 120 Z" fill={color} />
          </g>
        );
      case 'UOMP': // 高效公民 (效用、乐观、掌控、积极)
        return (
          <g>
            <motion.circle cx="100" cy="100" r="50" stroke={color} strokeWidth="8" fill="none" animate={{ strokeDasharray: ["1, 200", "150, 200", "1, 200"] }} transition={{ duration: 3, repeat: Infinity }} />
            <circle cx="100" cy="100" r="15" fill={color} />
            <path d="M100 20 L100 50 M100 150 L100 180 M20 100 L50 100 M150 100 L180 100" stroke={color} strokeWidth="3" />
          </g>
        );
      case 'UCDP': // 刀尖起舞者 (效用、审慎、让渡、积极)
        return (
          <g>
            <motion.path 
              d="M30 100 L170 100" stroke={color} strokeWidth="4" 
              animate={{ y: [0, -30, 30, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.polygon 
              points="100,60 120,110 80,110" fill={color}
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          </g>
        );
      case 'UCMP': // 硬核防雷员 (效用、审慎、掌控、积极)
        return (
          <g>
            <path d="M100 30 C150 30 180 80 180 100 C180 150 100 180 100 180 C100 180 20 150 20 100 C20 80 50 30 100 30" stroke={color} strokeWidth="6" fill="none" />
            <motion.circle cx="100" cy="90" r="20" fill={color} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
            <line x1="100" y1="30" x2="100" y2="180" stroke={color} strokeWidth="1" opacity="0.4" />
          </g>
        );
      case 'UCMR': // 精神内耗王 (效用、审慎、掌控、被动)
        return (
          <g>
            <motion.path 
              d="M70 100 C 70 70, 130 70, 130 100 C 130 130, 70 130, 70 100" 
              stroke={color} strokeWidth="5" fill="none"
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.path d="M100 100 L100 40" stroke={color} strokeWidth="2" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} />
          </g>
        );
      case 'SODP': // 反侦察专家 (主权、乐观、让渡、积极)
        return (
          <g>
            <rect x="40" y="80" width="120" height="40" fill={color} opacity="0.1" />
            <motion.rect 
              x="40" y="80" width="30" height="40" fill={color}
              animate={{ x: [40, 130, 40] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <path d="M100 30 L140 160 L60 160 Z" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 'SODR': // 赛博逃票者 (主权、乐观、让渡、被动)
        return (
          <g>
            <motion.circle cx="100" cy="100" r="50" fill={color} fillOpacity="0.2" animate={{ scale: [1, 0.8, 1] }} transition={{ duration: 4, repeat: Infinity }} />
            <path d="M50 150 L150 150" stroke={color} strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="90" r="15" fill={color} />
          </g>
        );
      case 'SOMR': // 断网守望者 (主权、乐观、掌控、被动)
        return (
          <g>
            <path d="M70 100 A30 30 0 1 1 130 100" stroke={color} strokeWidth="10" fill="none" />
            <rect x="65" y="100" width="70" height="50" rx="8" fill={color} />
            <motion.circle cx="100" cy="125" r="6" fill="#fff" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </g>
        );
      case 'SCDA': // 数字透明人 (主权、审慎、让渡、被动)
        return (
          <g>
             {[...Array(4)].map((_, i) => (
               <motion.circle 
                 key={i} cx="100" cy="100" r={30 + i * 20} 
                 stroke={color} strokeWidth="1" fill="none" strokeDasharray="2,4"
                 animate={{ opacity: [0, 0.4, 0] }}
                 transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
               />
             ))}
             <circle cx="100" cy="100" r="10" fill={color} opacity="0.5" />
          </g>
        );
      case 'SCDR': // 监控下的囚徒 (主权、审慎、让渡、被动)
        return (
          <g>
            {[...Array(8)].map((_, i) => (
              <line key={i} x1={50 + i * 14} y1="40" x2={50 + i * 14} y2="160" stroke={color} strokeWidth="2" opacity="0.4" />
            ))}
            <motion.rect x="85" y="85" width="30" height="30" fill={color} animate={{ y: [85, 115, 85] }} transition={{ duration: 2, repeat: Infinity }} />
          </g>
        );
      case 'SCMA': // 暂用
        return (
          <g>
            <motion.path d="M100 20 L180 180 L20 180 Z" stroke={color} strokeWidth="2" fill="none" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }} />
            <circle cx="100" cy="100" r="30" fill={color} />
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
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ width: '100%', height: '100%', maxWidth: '200px', maxHeight: '200px', margin: '0 auto' }}
    >
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
EOF