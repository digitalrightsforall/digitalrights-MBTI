'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Heart, Quote, Download, Layout, Info } from 'lucide-react';
import personas from '@/data/personas.json';
import dimensions from '@/data/dimensions.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function DetailCardsPage() {
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
        {parts[0]}(<span style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>{parts[1][0]}</span>{parts[1].slice(1)}
      </>
    );
  };

  return (
    <main className="container" style={{ maxWidth: '100%', width: '100%', margin: '0 auto', padding: '2rem 1rem', minHeight: '100dvh', background: '#f8fafc' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.4rem', fontWeight: 900, color: '#1e293b' }}>
          Detailed Report <span style={{ color: 'var(--primary)' }}>PDF Layout Mirror</span>
        </h1>

        {/* Selector */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginBottom: '3rem' }}>
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
          <motion.div key={selectedCode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '0', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
            
            {/* Header Section */}
            <div style={{ background: currentPersona?.theme_color || 'var(--primary)', padding: '3.5rem 2rem', textAlign: 'center', color: '#fff' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1.2rem', background: 'rgba(0,0,0,0.15)', borderRadius: '99px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '2rem', letterSpacing: '1.5px' }}>
                DIGITAL CITIZEN ARCHIVE: {selectedCode}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ transform: 'scale(1.2)' }}>
                  <PersonaAvatar code={selectedCode} color="#ffffff" />
                </div>
              </div>
              <h1 style={{ fontSize: '3.2rem', fontWeight: '900', margin: '1rem 0 0.2rem 0', letterSpacing: '-2px' }}>
                {currentPersona?.name}
              </h1>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '6px', opacity: 0.8, marginBottom: '1rem', color: '#fff' }}>
                {selectedCode.split('').join('-')}
              </div>
              <p style={{ fontSize: '1.4rem', fontWeight: '700', opacity: 0.95 }}>
                {currentPersona?.slogan}
              </p>
            </div>

            <div style={{ padding: '3rem 2.5rem', background: '#fff' }}>
              {/* Tags */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
                {currentPersona?.tags?.map((tag: string) => (
                  <span key={tag} style={{ background: '#f8fafc', color: currentPersona?.theme_color, padding: '0.5rem 1.2rem', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '800', border: '1px solid #f1f5f9' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* 1. 数字公民人格解读 */}
              <div style={{ padding: '2rem', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', borderRadius: '24px', border: '1px solid #f1f5f9', marginBottom: '3.5rem', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '-12px', left: '25px', background: currentPersona?.theme_color, padding: '6px', borderRadius: '50%' }}>
                    <Quote size={16} color="#fff" />
                 </div>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.2rem', color: currentPersona?.theme_color, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    数字公民人格解读
                 </h3>
                 <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.9', textAlign: 'justify', fontWeight: '500' }}>
                    {currentPersona?.narrative || currentPersona?.desc}
                 </p>
              </div>

              {/* 2. 性格维度拆解 - Detailed Comparative Version */}
              <div style={{ marginBottom: '5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '2rem', color: '#1e293b', borderLeft: `6px solid ${currentPersona?.theme_color}`, paddingLeft: '1rem' }}>
                  性格维度深度拆解
                </h3>
                <div style={{ display: 'grid', gap: '2rem' }}>
                  {dimensionData.map((dim, idx) => (
                    <div key={idx} style={{ padding: '2rem', background: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                        <div>
                          <div style={{ color: currentPersona?.theme_color, fontSize: '0.8rem', fontWeight: '800', marginBottom: '0.4rem', letterSpacing: '1px' }}>
                            {dim.axis}
                          </div>
                          <div style={{ fontWeight: '900', fontSize: '1.25rem', color: '#1e293b' }}>
                            {formatDimensionName(dim.name)}
                          </div>
                        </div>
                        <div style={{ padding: '0.4rem 1rem', background: currentPersona.theme_color, color: '#fff', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '900' }}>
                          {selectedCode[idx]} 侧
                        </div>
                      </div>
                      
                      <div style={{ display: 'grid', gap: '1.2rem' }}>
                        <div style={{ borderLeft: '3px solid #e2e8f0', paddingLeft: '1rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748b', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Info size={14} /> 维度定义
                          </div>
                          <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.6' }}>{dim.definition}</p>
                        </div>
                        
                        <div style={{ background: '#fff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: currentPersona.theme_color, marginBottom: '0.6rem' }}>
                            你的性格画像 ({selectedCode[idx]})
                          </div>
                          <p style={{ fontSize: '1rem', color: '#1e293b', lineHeight: '1.7', fontWeight: '500' }}>{dim.behavior}</p>
                        </div>

                        <div style={{ padding: '0 1.2rem' }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#94a3b8', marginBottom: '0.4rem' }}>
                            差异对比 (Contrast)
                          </div>
                          <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7', fontStyle: 'italic' }}>{dim.contrast}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. 指南与特征 */}
              <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
                <div style={{ padding: '1.8rem', background: 'rgba(34, 197, 94, 0.04)', borderRadius: '24px', border: '1px solid rgba(34, 197, 94, 0.1)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={20} /> 数字生存指南 (Survival Advice)
                  </h3>
                  <p style={{ color: '#1e293b', fontSize: '1rem', lineHeight: '1.8' }}>{currentPersona?.advice}</p>
                </div>
                <div style={{ padding: '1.8rem', background: 'rgba(251, 146, 60, 0.04)', borderRadius: '24px', border: '1px solid rgba(251, 146, 60, 0.1)' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1rem', color: '#9a3412', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Shield size={20} /> 权利博弈特征 (Rights & PIPL)
                  </h3>
                  <p style={{ color: '#1e293b', fontSize: '1rem', lineHeight: '1.8' }}>{currentPersona?.rights}</p>
                </div>
              </div>

              {/* PDF Footer */}
              <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '3rem', paddingBottom: '1rem', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '1rem' }}>
                  <Shield size={32} color="var(--primary)" />
                  <div style={{ textAlign: 'left' }}>
                    <a href="https://putongren.org" target="_blank" style={{ fontWeight: '900', fontSize: '1.3rem', color: '#1e293b', lineHeight: 1, textDecoration: 'none' }}>「普通人的数字权利」</a>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px', fontWeight: '700' }}>DIGITAL RIGHTS FOR EVERYONE</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '400px', margin: '1.5rem auto' }}>
                  本报告由「普通人的数字权利」社区生成。<br/>
                  旨在提升公民科技伦理素养，构建更公平的数字社会。
                </p>
              </div>
            </div>
          </motion.div>

          <div style={{ marginTop: '3rem', paddingBottom: '5rem', textAlign: 'center' }}>
            <button style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '1.2rem 3rem', borderRadius: '20px', fontSize: '1.1rem', fontWeight: '900', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px', boxShadow: '0 20px 40px -10px rgba(251, 146, 60, 0.3)' }}>
              <Download size={24} /> 生成 PDF 性格报告 (1.2MB)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
