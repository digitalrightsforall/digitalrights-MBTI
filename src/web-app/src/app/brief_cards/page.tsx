'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Heart, Quote, Camera, Info } from 'lucide-react';
import personas from '@/data/personas.json';
import dimensions from '@/data/dimensions.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function BriefCardsPage() {
  const [selectedCode, setSelectedCode] = useState(Object.keys(personas)[0]);
  const currentPersona = (personas as any)[selectedCode];

  const getDimensionData = (code: string) => {
    return code.split('').map(letter => (dimensions as any)[letter]);
  };

  const dimensionData = getDimensionData(selectedCode);

  // Helper to format name with underline on the first English letter after '('
  const formatDimensionName = (name: string) => {
    const parts = name.split('(');
    if (parts.length < 2) return name;
    return (
      <>
        {parts[0]}(<span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{parts[1][0]}</span>{parts[1].slice(1)}
      </>
    );
  };

  return (
    <main className="container" style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '1rem', minHeight: '100dvh', background: '#f8fafc' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 900, color: '#1e293b' }}>
          Brief Cards <span style={{ color: 'var(--primary)' }}>Mirror Mode</span>
        </h1>

        {/* Selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '2rem' }}>
          {Object.keys(personas).map(code => (
            <button
              key={code}
              onClick={() => setSelectedCode(code)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                background: selectedCode === code ? 'var(--primary)' : '#fff',
                color: selectedCode === code ? '#fff' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 800,
                transition: 'all 0.2s'
              }}
            >
              {code}
            </button>
          ))}
        </div>

        <div className="result-container" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '700' }}>
            <Camera size={14} /> 📷 截图保存长图，分享你的数字公民人格
          </div>

          <motion.div key={selectedCode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
            <div style={{ background: currentPersona?.theme_color || 'var(--primary)', padding: '2.5rem 1.5rem', textAlign: 'center', color: '#fff' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.4rem 1rem', background: 'rgba(0,0,0,0.15)', borderRadius: '99px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '1px' }}>
                TYPE ARCHIVE: {selectedCode}
              </div>
              <PersonaAvatar code={selectedCode} color="#ffffff" />
              <h1 style={{ fontSize: '2.8rem', fontWeight: '900', margin: '1rem 0 0.2rem 0', letterSpacing: '-1.5px' }}>
                {currentPersona?.name}
              </h1>
              <div style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '4px', opacity: 0.8, marginBottom: '0.8rem', color: '#fff' }}>
                {selectedCode.split('').join('-')}
              </div>
              <p style={{ fontSize: '1.15rem', fontWeight: '700', opacity: 0.95 }}>
                {currentPersona?.slogan}
              </p>
            </div>

            <div style={{ padding: '1.5rem 1.2rem', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {currentPersona?.tags?.map((tag: string) => (
                  <span key={tag} style={{ background: '#f8fafc', color: currentPersona?.theme_color, padding: '0.4rem 0.9rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '800', border: '1px solid #f1f5f9' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* 1. 数字公民人格解读 */}
              <div style={{ padding: '1.5rem', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '2rem', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '-10px', left: '20px', background: currentPersona?.theme_color, padding: '4px', borderRadius: '50%' }}>
                    <Quote size={14} color="#fff" />
                 </div>
                 <h3 style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '1rem', color: currentPersona?.theme_color, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    数字公民人格解读
                 </h3>
                 <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.8', textAlign: 'justify' }}>
                    {currentPersona?.narrative || currentPersona?.desc}
                 </p>
              </div>

              {/* 2. 性格维度拆解 - Brief Comparative Version */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '1.2rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color={currentPersona?.theme_color} /> 性格维度拆解
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {dimensionData.map((dim, idx) => (
                    <div key={idx} style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                      <div style={{ fontWeight: '900', fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{formatDimensionName(dim.name)}</span>
                        <span style={{ fontSize: '0.7rem', color: currentPersona.theme_color, background: 'rgba(255,255,255,0.8)', padding: '2px 8px', borderRadius: '6px' }}>
                          {selectedCode[idx]} 侧
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: '1.6' }}>
                        <strong style={{ color: '#475569' }}>定义:</strong> {dim.definition}<br/>
                        <strong style={{ color: '#475569' }}>表现:</strong> {dim.behavior}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{ padding: '1.2rem', background: 'rgba(34, 197, 94, 0.03)', borderRadius: '24px', border: '1px solid rgba(34, 197, 94, 0.1)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={18} /> 数字生存指南
                  </h3>
                  <p style={{ color: '#1e293b', fontSize: '0.9rem', lineHeight: '1.7' }}>{currentPersona?.advice}</p>
                </div>
              </div>

              {/* 品牌底部印章 */}
              <div style={{ borderTop: '2px dashed #f1f5f9', paddingTop: '2.5rem', paddingBottom: '1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.8rem' }}>
                  <Shield size={24} color="var(--primary)" />
                  <a href="https://putongren.org" target="_blank" style={{ fontWeight: '900', fontSize: '1.1rem', color: '#1e293b', textDecoration: 'none' }}>「普通人的数字权利」</a>
                </div>
                <p style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.5', maxWidth: '280px', margin: '0 auto' }}>
                  一个提升全民科技伦理素养、数字权利意识，<br/>为普通人提供权益发声和参与平台的公益社区。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
