'use client';

import React from 'react';
import { Shield, Quote, Heart, Info, Layout } from 'lucide-react';
import { PersonaAvatar } from './PersonaAvatar';
import dimensions from '@/data/dimensions.json';

interface DetailedReportProps {
  code: string;
  persona: any;
}

export const DetailedReport: React.FC<DetailedReportProps> = ({ code, persona }) => {
  const getDimensionData = (c: string) => {
    return c.split('').map(letter => (dimensions as any)[letter]);
  };

  const dimensionData = getDimensionData(code);

  const formatDimensionName = (name: string) => {
    const parts = name.split('(');
    if (parts.length < 2) return name;
    return (
      <>
        {parts[0]}(<span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>{parts[1][0]}</span>{parts[1].slice(1)}
      </>
    );
  };

  return (
    <div 
      id="detailed-report-pdf"
      style={{ 
        width: '794px', // A4 width at 96 DPI
        minHeight: '1123px', // A4 height
        padding: '60px', 
        background: '#fff', 
        color: '#1e293b',
        position: 'absolute',
        left: '-9999px', // Hide from view
        top: 0,
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={32} color="#fb923c" />
          <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>普通人的数字权利</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>
          DIGITAL CITIZEN ARCHIVE / 2026
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ background: persona?.theme_color || '#fb923c', borderRadius: '32px', padding: '40px', color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(0,0,0,0.15)', borderRadius: '99px', fontSize: '0.8rem', fontWeight: 800, marginBottom: '20px' }}>
          TYPE ARCHIVE: {code.split('').join('-')}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ transform: 'scale(1.5)' }}>
            <PersonaAvatar code={code} color="#ffffff" />
          </div>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '10px 0', letterSpacing: '-2px' }}>{persona?.name}</h1>
        <p style={{ fontSize: '1.4rem', fontWeight: 700, opacity: 0.9 }}>{persona?.slogan}</p>
      </div>

      {/* Narrative Section */}
      <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-15px', left: '30px', background: persona?.theme_color, padding: '8px', borderRadius: '50%' }}>
          <Quote size={20} color="#fff" />
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '15px', color: persona?.theme_color }}>数字公民人格深度解析</h3>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#475569', textAlign: 'justify' }}>
          {persona?.narrative || persona?.desc}
        </p>
      </div>

      {/* Dimensions Detail */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 900, marginBottom: '25px', color: '#1e293b', borderLeft: `6px solid ${persona?.theme_color}`, paddingLeft: '15px' }}>
          性格维度深度拆解
        </h3>
        <div style={{ display: 'grid', gap: '20px' }}>
          {dimensionData.map((dim, idx) => (
            <div key={idx} style={{ padding: '25px', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#1e293b' }}>
                  {formatDimensionName(dim.name)}
                </div>
                <div style={{ padding: '4px 12px', background: persona.theme_color, color: '#fff', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 900 }}>
                  {code[idx]} 侧
                </div>
              </div>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Info size={12} /> 维度定义
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6 }}>{dim.definition}</p>
                </div>
                <div style={{ background: '#fff', padding: '15px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: persona.theme_color, marginBottom: '6px' }}>你的性格画像</div>
                  <p style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.7 }}>{dim.behavior}</p>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '4px' }}>差异对比</div>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, fontStyle: 'italic' }}>{dim.contrast}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div style={{ borderTop: '2px dashed #f1f5f9', paddingTop: '40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '10px' }}>
          由「普通人的数字权利」社区出品。
        </p>
        <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.8', marginBottom: '10px' }}>
          希望了解提升自身的权益素养，参与到更多保护权益的行动中？
        </p>
        <p style={{ fontSize: '1.1rem', color: persona?.theme_color || '#fb923c', fontWeight: 800 }}>
          访问 putongren.org 了解更多.
        </p>
        <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '30px' }}>© 2026 普通人的数字权利社区</div>
      </div>
    </div>
  );
};
