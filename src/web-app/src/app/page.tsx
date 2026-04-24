'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { 
  Shield, Zap, Cpu, Activity, RefreshCcw, Heart, Users, Sparkles, 
  Download, MessageCircle 
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarLine } from 'recharts';
import questions from '@/data/questions.json';
import personas from '@/data/personas.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';

const DynamicIcon = ({ name, size = 24, color = "currentColor" }: { name: string, size?: number, color?: string }) => {
  const IconComponent = (Icons as any)[name] || Shield;
  return <IconComponent size={size} color={color} />;
};

export default function Home() {
  const [step, setStep] = useState<'landing' | 'test' | 'result'>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [resultCode, setResultCode] = useState('');
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({});

  const handleAnswer = (choice: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQ]: choice };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, 'A' | 'B'>) => {
    const scores: Record<string, number> = { 'S/U': 0, 'C/O': 0, 'M/D': 0, 'P/R': 0 };
    const maxPossible: Record<string, number> = { 'S/U': 0, 'C/O': 0, 'M/D': 0, 'P/R': 0 };
    questions.forEach((q: any, idx: number) => {
      const choice = finalAnswers[idx];
      const dimension = q.dimension;
      maxPossible[dimension] += q.weight;
      if (choice === 'A') scores[dimension] += q.weight;
    });
    const percentages: Record<string, number> = {};
    Object.keys(scores).forEach(dim => {
      percentages[dim] = Math.round((scores[dim] / maxPossible[dim]) * 100);
    });
    setDimensionScores(percentages);
    const code = [percentages['S/U'] >= 50 ? 'S' : 'U', percentages['C/O'] >= 50 ? 'C' : 'O', percentages['M/D'] >= 50 ? 'M' : 'D', percentages['P/R'] >= 50 ? 'P' : 'R'].join('');
    setResultCode(code);
    setStep('result');
    window.scrollTo(0, 0);
  };

  const currentPersona = (personas as any)[resultCode];
  const rarity = currentPersona?.rarity || 5.0;

  const radarData = dimensionScores['S/U'] !== undefined ? [
    { subject: '数据主权', A: dimensionScores['S/U'] },
    { subject: '算法信任', A: 100 - dimensionScores['C/O'] }, 
    { subject: '代理自主', A: 100 - dimensionScores['M/D'] }, 
    { subject: '能动行动', A: dimensionScores['P/R'] },
  ] : [];

  const compatiblePersona = useMemo(() => {
    if (!resultCode) return '';
    const map: any = {S:'U', U:'S', C:'O', O:'C', M:'D', D:'M', P:'R', R:'P'};
    const opposite = resultCode.split('').map(c => map[c]).join('');
    return (personas as any)[opposite]?.name || '数字流浪者';
  }, [resultCode]);

  const resetTest = () => {
    setStep('landing');
    setCurrentQ(0);
    setAnswers({});
  };

  return (
    <main className="container" style={{ maxWidth: '100%', width: step === 'result' ? '100%' : '480px', margin: '0 auto', padding: '0.5rem', minHeight: '100dvh' }}>
      <div className="bg-glow" />
      
      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ textAlign: 'center', padding: '2.5rem 1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '80dvh' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ padding: '1rem', background: 'rgba(251, 146, 60, 0.1)', borderRadius: '30%' }}>
                    <DynamicIcon name="Cpu" size={60} color="var(--primary)" />
                  </div>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: -5, right: -5, background: 'var(--accent)', padding: '5px', borderRadius: '50%' }}>
                    <Sparkles size={16} color="#fff" />
                  </motion.div>
                </div>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.5rem', color: 'var(--foreground)', letterSpacing: '-1px' }}>
                数字灵魂 <span style={{ color: 'var(--primary)' }}>MBTI</span>
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2rem', fontWeight: '500', lineHeight: '1.5' }}>
                2026 AI 时代：<br/>你是驯服算法的大师，<br/>还是被看光的透明人？
              </p>
            </div>

            <div>
              <button className="btn" onClick={() => setStep('test')} style={{ width: '100%', fontSize: '1.2rem', padding: '1.2rem', marginBottom: '1.5rem' }}>
                开启我的档案
              </button>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '700', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
                出品：普通人的数字权利社区
              </div>
            </div>
          </motion.div>
        )}

        {step === 'test' && (
          <motion.div key={`test-${currentQ}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card" style={{ padding: '2rem 1.2rem', minHeight: '450px', display: 'flex', flexDirection: 'column' }}>
            <div className="progress-bar" style={{ height: '6px', marginBottom: '2rem' }}>
              <div className="progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
            </div>
            
            <div style={{ marginBottom: '2.5rem', flexGrow: 1 }}>
              <div style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.75rem', letterSpacing: '2px', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} /> 维度探索 {currentQ + 1} / {questions.length}
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.5', color: 'var(--foreground)' }}>
                {questions[currentQ].question}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 使用 motion.button 并增加 whileTap 修复高亮残留问题 */}
              <motion.button 
                whileTap={{ scale: 0.98, backgroundColor: 'var(--option-hover)' }}
                className="btn btn-option" 
                onClick={() => handleAnswer('A')} 
                style={{ padding: '1.2rem', fontSize: '0.95rem' }}
              >
                {questions[currentQ].option_a}
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.98, backgroundColor: 'var(--option-hover)' }}
                className="btn btn-option" 
                onClick={() => handleAnswer('B')} 
                style={{ padding: '1.2rem', fontSize: '0.95rem' }}
              >
                {questions[currentQ].option_b}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <div className="result-container" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Download size={12} /> 长按保存长图，分享你的数字灵魂
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '28px' }}>
              <div style={{ background: currentPersona?.theme_color || 'var(--primary)', padding: '2rem 1.5rem', textAlign: 'center', color: '#fff' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.3rem 0.8rem', background: 'rgba(0,0,0,0.15)', borderRadius: '99px', fontSize: '0.7rem', fontWeight: '800', marginBottom: '1.2rem' }}>
                  <Users size={12} /> 全球稀有度 {rarity}%
                </div>
                <PersonaAvatar code={resultCode} color="#ffffff" />
                <h1 style={{ fontSize: '2.6rem', fontWeight: '900', margin: '0.8rem 0 0.5rem 0', letterSpacing: '-1.5px' }}>
                  {currentPersona?.name}
                </h1>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', opacity: 0.95 }}>
                  {currentPersona?.slogan}
                </p>
              </div>

              <div style={{ padding: '1.5rem 1.2rem', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {currentPersona?.tags?.map((tag: string) => (
                    <span key={tag} style={{ background: '#f8fafc', color: currentPersona?.theme_color, padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', border: '1px solid #f1f5f9' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ height: '240px', marginBottom: '1rem' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                      <RadarLine name="Score" dataKey="A" stroke={currentPersona?.theme_color} fill={currentPersona?.theme_color} fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '2rem' }}>
                  <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800', marginBottom: '0.3rem' }}>契合灵魂</div>
                    <div style={{ fontWeight: '900', color: '#1e293b', fontSize: '0.85rem' }}>{compatiblePersona}</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800', marginBottom: '0.3rem' }}>人格代码</div>
                    <div style={{ fontWeight: '900', color: '#1e293b', fontSize: '0.85rem' }}>{resultCode}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{ padding: '1rem', background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b' }}>
                      <DynamicIcon name="Cpu" size={16} color={currentPersona?.theme_color} /> 深度画像
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.6' }}>{currentPersona?.desc}</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.03)', borderRadius: '20px', border: '1px solid rgba(34, 197, 94, 0.1)' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '0.5rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DynamicIcon name="Heart" size={16} /> 生存指南
                    </h3>
                    <p style={{ color: '#1e293b', fontSize: '0.85rem', lineHeight: '1.6' }}>{currentPersona?.advice}</p>
                  </div>
                </div>

                <div style={{ borderTop: '2px dashed #f1f5f9', paddingTop: '1.5rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <Shield size={20} color="var(--primary)" />
                    <span style={{ fontWeight: '900', fontSize: '1rem' }}>普通人的数字权利</span>
                  </div>
                  <p style={{ fontSize: '0.7rem', color: '#94a3b8', lineHeight: '1.5', padding: '0 1rem' }}>
                    一个提升全民科技伦理素养、数字权利意识，<br/>为普通人提供权益发声和参与平台的公益社区。
                  </p>
                  <div style={{ marginTop: '1.2rem', padding: '0.6rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.75rem', color: '#94a3b8', fontWeight: '800' }}>
                    —— 搜索「普通人的数字权利」开启测评 ——
                  </div>
                </div>
              </div>
            </motion.div>

            <div style={{ marginTop: '2rem', paddingBottom: '4rem', textAlign: 'center' }}>
              <button onClick={resetTest} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.9rem', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}>
                 重新开始解析之旅
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
