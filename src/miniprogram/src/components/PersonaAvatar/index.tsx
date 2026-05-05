import React from 'react'
import { View } from '@tarojs/components'
import './index.scss'

interface Props {
  code: string
  color: string
}

const PersonaAvatar: React.FC<Props> = ({ code, color }) => {
  const renderTotem = () => {
    switch (code) {
      case 'UODP': // AI 驯化大师
        return (
          <g>
            <circle cx="100" cy="100" r="50" fill={color} opacity="0.1" className="ani-pulse" />
            <rect x="70" y="70" width="60" height="60" stroke={color} stroke-width="4" fill="none" className="ani-rotate-fast" style="transform-origin: 100px 100px;" />
            <rect x="55" y="55" width="90" height="90" stroke={color} stroke-width="2" opacity="0.5" fill="none" className="ani-rotate-reverse" style="transform-origin: 100px 100px;" />
            <circle cx="100" cy="100" r="10" fill={color} />
          </g>
        )
      case 'UODR': // 全自动咸鱼
        return (
          <g>
            <circle cx="80" cy="90" r="20" fill={color} opacity="0.3" className="ani-pulse" />
            <circle cx="120" cy="110" r="25" fill={color} opacity="0.2" style="animation: pulse-scale 3s infinite;" />
            <circle cx="95" cy="120" r="15" fill={color} opacity="0.4" />
          </g>
        )
      case 'UOMR': // 社畜生存狂
        return (
          <g>
            <rect x="60" y="60" width="80" height="80" stroke={color} stroke-width="2" fill="none" />
            <line x1="20" y1="20" x2="180" y2="180" stroke={color} stroke-width="1" opacity="0.5" />
            <rect x="90" y="90" width="20" height="20" fill={color} />
          </g>
        )
      case 'SCDR': // 监控下的囚徒
        return (
          <g>
            <rect x="85" y="45" width="30" height="30" fill={color} opacity="0.7" />
            {[0,1,2,3,4,5,6,7].map(i => (
              <line key={i} x1={50 + i * 14} y1="40" x2={50 + i * 14} y2="160" stroke={color} stroke-width="5" />
            ))}
          </g>
        )
      case 'SOMR': // 断网守望者
        return (
          <g>
            <rect x="40" y="40" width="120" height="120" stroke={color} stroke-width="8" fill="none" opacity="0.3" />
            <rect x="55" y="55" width="90" height="90" stroke={color} stroke-width="6" fill="none" opacity="0.6" />
            <rect x="70" y="70" width="60" height="60" stroke={color} stroke-width="4" fill="none" />
            <circle cx="100" cy="100" r="5" fill={color} />
          </g>
        )
      case 'SCDP': // 维权战神
        return (
          <g>
            <path d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" stroke={color} stroke-width="4" fill="none" />
            <path d="M100 50 L100 150 M50 100 L150 100" stroke={color} stroke-width="12" />
          </g>
        )
      default:
        return (
          <g>
            <circle cx="100" cy="100" r="40" fill={color} />
            <circle cx="100" cy="100" r="60" stroke={color} stroke-width="2" fill="none" opacity="0.3" />
          </g>
        )
    }
  }

  return (
    <View className='totem-container'>
      <svg className='totem-svg' viewBox="0 0 200 200">
        {renderTotem()}
      </svg>
    </View>
  )
}

export default PersonaAvatar
