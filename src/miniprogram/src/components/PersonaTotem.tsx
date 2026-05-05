import React from 'react';
import { View } from '@tarojs/components';
import './PersonaTotem.scss';

interface Props {
  code: string;
  color: string;
}

export const PersonaTotem: React.FC<Props> = ({ code, color }) => {
  const renderTotem = () => {
    switch (code) {
      case 'UODP': // AI 驯化大师
        return (
          <g>
            <rect x="70" y="70" width="60" height="60" stroke={color} strokeWidth="4" fill="none" className="rotate-360" />
            <rect x="55" y="55" width="90" height="90" stroke={color} strokeWidth="2" opacity="0.5" fill="none" className="rotate-neg-360" />
            <circle cx="100" cy="100" r="10" fill={color} className="scale-pulse" />
          </g>
        );
      case 'UODR': // 全自动咸鱼
        return (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={70 + i * 20} cy={80 + (i % 2) * 40} r={15 + i * 5} fill={color} fillOpacity="0.3" className={`drift-${i}`} />
            ))}
          </g>
        );
      case 'UOMP': // 人间清醒派
        return (
          <g>
            <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="8" fill="none" className="dash-draw" />
            <circle cx="100" cy="100" r="15" fill={color} />
            <path d="M100 20 L100 50 M100 150 L100 180 M20 100 L50 100 M150 100 L180 100" stroke={color} strokeWidth="3" />
          </g>
        );
      case 'UOMR': // 社畜生存狂
        return (
          <g>
            <rect x="50" y="20" width="100" height="15" fill={color} className="vertical-scan" />
            <ellipse cx="100" cy="100" rx="40" ry="40" fill={color} opacity="0.4" className="oval-pulse" />
            <rect x="30" y="140" width="140" height="5" fill={color} />
          </g>
        );
      case 'UCDP': // 刀尖起舞者
        return (
          <g>
            <path d="M30 100 L170 100" stroke={color} strokeWidth="4" className="y-bounce" />
            <polygon points="100,60 120,110 80,110" fill={color} className="rotate-360-slow" />
          </g>
        );
      case 'UCDR': // 技术甩锅侠
        return (
          <g>
            <path d="M100 40 L130 160 L70 160 Z" fill="none" stroke={color} strokeWidth="4" className="skew-shake" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx="100" cy="100" r="3" fill={color} className={`particle-${i}`} />
            ))}
          </g>
        );
      case 'UCMP': // 硬核防雷员
        return (
          <g>
            <path d="M100 30 C150 30 180 80 180 100 C180 150 100 180 100 180 C100 180 20 150 20 100 C20 80 50 30 100 30" stroke={color} strokeWidth="6" fill="none" />
            <circle cx="100" cy="90" r="20" fill={color} className="fade-pulse" />
          </g>
        );
      case 'UCMR': // 精神内耗王
        return (
          <g>
            <path d="M50 100 Q 75 50 100 100 T 150 100" stroke={color} strokeWidth="4" fill="none" className="flow-path-1" />
            <path d="M50 100 Q 75 150 100 100 T 150 100" stroke={color} strokeWidth="4" fill="none" opacity="0.5" className="flow-path-2" />
            <circle cx="100" cy="100" r="15" fill={color} className="scale-fade" />
          </g>
        );
      case 'SODP': // 反侦察专家
        return (
          <g>
            <rect x="40" y="80" width="120" height="40" fill={color} opacity="0.1" />
            <rect x="40" y="80" width="30" height="40" fill={color} className="x-scan" />
            <path d="M100 30 L140 160 L60 160 Z" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 'SODR': // 赛博逃票者
        return (
          <g>
            <line x1="30" y1="60" x2="170" y2="60" stroke={color} strokeWidth="2" strokeDasharray="5,5" />
            <line x1="30" y1="140" x2="170" y2="140" stroke={color} strokeWidth="2" strokeDasharray="5,5" />
            <circle r="12" fill={color} className="random-move" />
          </g>
        );
      case 'SOMP': // 数字主理人
        return (
          <g>
            {[0, 120, 240].map(deg => (
              <path 
                key={deg} d="M100 40 L150 70 L150 130 L100 160 L50 130 L50 70 Z" 
                stroke={color} strokeWidth="2" fill="none"
                style={{ transformOrigin: '100px 100px' }}
                className={`rotate-poly-${deg}`}
              />
            ))}
            <path d="M100 60 L135 120 L65 120 Z" fill={color} className="fade-pulse" />
          </g>
        );
      case 'SOMR': // 断网守望者
        return (
          <g>
            {[0, 1, 2].map(i => (
              <rect 
                key={i} x={40 + i*15} y={40 + i*15} width={120 - i*30} height={120 - i*30} 
                stroke={color} strokeWidth={8 - i*2} fill="none"
                className={`maze-pulse-${i}`}
              />
            ))}
            <circle cx="100" cy="100" r="5" fill={color} />
          </g>
        );
      case 'SCDP': // 维权战神
        return (
          <g>
            <path d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" stroke={color} strokeWidth="4" fill="none" className="fade-pulse" />
            <path d="M100 50 L100 150 M50 100 L150 100" stroke={color} strokeWidth="12" strokeLinecap="square" />
          </g>
        );
      case 'SCDR': // 监控下的囚徒
        return (
          <g>
            <rect x="85" y="45" width="30" height="30" fill={color} className="up-down-float" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line key={i} x1={50 + i * 14} y1="40" x2={50 + i * 14} y2="160" stroke={color} strokeWidth="5" />
            ))}
          </g>
        );
      case 'SCMP': // 数据洁癖狂
        return (
          <g>
            <rect x="60" y="60" width="80" height="80" stroke={color} strokeWidth="1" fill="none" opacity="0.3" />
            <rect x="50" y="60" width="100" height="2" fill={color} className="scan-line" />
            <circle cx="100" cy="100" r="15" stroke={color} strokeWidth="2" fill="none" />
          </g>
        );
      case 'SCDA': // 数字透明人
        return (
          <g>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <circle key={i} r={2} fill={color} className={`pixel-drift-${i}`} />
            ))}
            <circle cx="100" cy="100" r="20" fill={color} opacity="0.2" className="scale-pulse-alt" />
          </g>
        );
      default:
        return (
          <g>
            <circle cx="100" cy="100" r="40" fill={color} />
            <circle cx="100" cy="100" r="60" stroke={color} strokeWidth="2" fill="none" className="ring-pulse" />
          </g>
        );
    }
  };

  return (
    <View className="totem-wrapper">
      <svg viewBox="0 0 200 200" className="totem-svg">
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
    </View>
  );
};
