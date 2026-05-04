'use client';

import React from 'react';
import { motion } from 'framer-motion';
import personas from '@/data/personas.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';

export default function PreviewPage() {
  const personaList = Object.entries(personas);

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#1e293b' }}>
          数字灵魂图腾预览 <span style={{ color: '#fb923c' }}>Gallery</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          为 16 种数字公民人格设计的抽象 SVG 图腾 (Iterative Version)
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '30px',
        maxWidth: '1400px',
        margin: '0 auto' 
      }}>
        {personaList.map(([code, data]: [string, any]) => (
          <motion.div 
            key={code}
            whileHover={{ y: -5 }}
            style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '24px', 
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div style={{ 
              background: '#f8fafc', 
              borderRadius: '20px', 
              width: '100%', 
              height: '220px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '20px',
              border: '1px solid #f1f5f9'
            }}>
              <PersonaAvatar code={code} color={data.theme_color} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '4px 12px', 
                background: data.theme_color, 
                color: '#fff', 
                borderRadius: '8px', 
                fontSize: '0.75rem', 
                fontWeight: '800',
                marginBottom: '10px' 
              }}>
                {code}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '8px' }}>
                {data.name}
              </h2>
              <p style={{ color: data.theme_color, fontWeight: '700', fontSize: '0.9rem', marginBottom: '15px' }}>
                “ {data.slogan} ”
              </p>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6', height: '80px', overflow: 'hidden' }}>
                {data.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#94a3b8', fontSize: '0.9rem' }}>
        普通人的数字权利社区 · 2026
      </footer>
    </div>
  );
}
