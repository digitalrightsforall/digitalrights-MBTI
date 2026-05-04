'use client';

import React from 'react';
import { motion } from 'framer-motion';
import personas from '@/data/personas.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';
import { Compass, Shield, Zap, Target, Quote } from 'lucide-react';

export default function PreviewPage() {
  const personaList = Object.entries(personas);

  const designPrinciples = [
    { icon: <Shield size={20} />, label: "主权 (Sovereignty)", desc: "多边形与锐利线条。代表边界、防卫与数字堡垒。" },
    { icon: <Zap size={20} />, label: "效用 (Utility)", desc: "圆形与流动曲线。代表流转、收益与效率红利。" },
    { icon: <Target size={20} />, label: "审慎 (Cautious)", desc: "网格、准星与路径。代表逻辑验证、溯源与白盒思维。" },
    { icon: <Compass size={20} />, label: "能动 (Action)", desc: "扩散、旋转与位移。向外扩张代表积极，内缩代表被动。" }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '60px 20px' }}>
      {/* 顶部设计哲学 */}
      <header style={{ maxWidth: '1000px', margin: '0 auto 80px auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#1e293b', marginBottom: '20px', letterSpacing: '-1px' }}>
          数字灵魂图腾 <span style={{ color: '#fb923c' }}>Laboratory</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.2rem', marginBottom: '40px' }}>
          将抽象的认知动机，转化为具备生命力的几何符号
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          background: '#fff',
          padding: '30px',
          borderRadius: '32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
          textAlign: 'left'
        }}>
          {designPrinciples.map((p, i) => (
            <div key={i}>
              <div style={{ color: '#fb923c', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', marginBottom: '8px' }}>
                {p.icon} {p.label}
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: '1.5' }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </header>

      {/* 图腾画廊 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '40px',
        maxWidth: '1600px',
        margin: '0 auto' 
      }}>
        {personaList.map(([code, data]: [string, any]) => (
          <motion.div 
            key={code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              background: '#fff', 
              borderRadius: '32px', 
              padding: '0', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* 视觉头部 - 模拟正式结果页背景 */}
            <div style={{ 
              background: data.theme_color, 
              padding: '40px 20px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0,0,0,0.15)', color: '#fff', borderRadius: '99px', fontSize: '0.7rem', fontWeight: '900', marginBottom: '20px', letterSpacing: '1px' }}>
                TYPE ARCHIVE: {code}
              </div>
              <div style={{ width: '120px', height: '120px' }}>
                <PersonaAvatar code={code} color="#ffffff" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#fff', marginTop: '15px', marginBottom: '5px' }}>
                {data.name}
              </h2>
              <p style={{ color: '#fff', opacity: 0.9, fontWeight: '700', fontSize: '0.9rem' }}>
                {data.slogan}
              </p>
            </div>

            {/* 文字内容区 */}
            <div style={{ padding: '30px', flexGrow: 1 }}>
              {/* 采用正式版叙事文案 */}
              <div style={{ padding: '1.2rem', background: '#f8fafc', borderRadius: '20px', border: '1px solid #f1f5f9', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-10px', left: '15px', background: data.theme_color, padding: '3px', borderRadius: '50%' }}>
                  <Quote size={12} color="#fff" />
                </div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '900', color: data.theme_color, marginBottom: '8px' }}>数字灵魂深度解析</h4>
                <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.7', textAlign: 'justify' }}>
                  {data.narrative}
                </p>
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px dashed #f1f5f9' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '900', color: '#1e293b', marginBottom: '8px' }}>生存指南</h4>
                <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: '1.6' }}>
                  {data.advice}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '100px', color: '#cbd5e1', fontWeight: 'bold', fontSize: '0.8rem', letterSpacing: '2px' }}>
        ORDINARY PEOPLE'S DIGITAL RIGHTS · LABORATORY 2026
      </footer>
    </div>
  );
}
