'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import {
  Shield, Zap, Cpu, Activity, RefreshCcw, Heart, Users, Sparkles,
  Download, Camera, Quote
} from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar as RadarLine } from 'recharts';
import questions from '@/data/questions.json';
import personas from '@/data/personas.json';
import dimensions from '@/data/dimensions.json';
import shareConfig from '@/data/share-config.json';
import { PersonaAvatar } from '@/components/PersonaAvatar';
import { DetailedReport } from '@/components/DetailedReport';

// Dynamic import for PDF tools to avoid SSR issues
const downloadPDF = async (elementId: string, filename: string) => {
  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width / 2, canvas.height / 2]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
  pdf.save(filename);
};

const DynamicIcon = ({ name, size = 24, color = "currentColor" }: { name: string, size?: number | string, color?: string }) => {
  const IconComponent = (Icons as any)[name] || Shield;
  return <IconComponent size={size} color={color} />;
};

const formatDimensionName = (name: string) => {
  const parts = name.split('(');
  if (parts.length < 2) return name;
  return (
    <>
      {parts[0]}(<span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>{parts[1][0]}</span>{parts[1].slice(1)}
    </>
  );
};

function generateParticipantId(): string {
  return 'web_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

async function logToLark(data: Record<string, string>) {
  try {
    await fetch('/api/lark-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('埋点上报失败:', err);
  }
}

export default function Home() {
  const [step, setStep] = useState<'landing' | 'test' | 'result'>('landing');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});
  const [resultCode, setResultCode] = useState('');
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({});
  const [participantId, setParticipantId] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    let pid = localStorage.getItem('mbti_participant_id');
    if (!pid) {
      pid = generateParticipantId();
      localStorage.setItem('mbti_participant_id', pid);
    }
    setParticipantId(pid);
    // 用户首次访问即上报
    logToLark({
      参与者标识: pid,
      来源平台: 'web',
      完成状态: '访问',
    });
  }, []);

  // 监听屏幕尺寸，检测小屏设备
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerHeight < 700);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

    logToLark({
      参与者标识: participantId,
      来源平台: 'web',
      完成状态: '完成',
      MBTI结果: code,
    });

    setStep('result');
    window.scrollTo(0, 0);
  };

  const handleStartTest = () => {
    logToLark({
      参与者标识: participantId,
      来源平台: 'web',
      完成状态: '点击',
    });
    setStep('test');
  };

  const currentPersona = (personas as any)[resultCode];

  const resetTest = () => {
    setStep('landing');
    setCurrentQ(0);
    setAnswers({});
  };

  const handleShareWeibo = async () => {
    let title = shareConfig.weibo.template
      .replace('{{name}}', currentPersona?.name || '')
      .replace('{{code}}', resultCode)
      .replace('{{slogan}}', currentPersona?.slogan || '');
    
    const url = shareConfig.weibo.url;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = document.getElementById('result-card');
      if (element) {
        await html2canvas(element, { scale: 1, useCORS: true });
        console.log('截图已生成，建议用户长按保存图片后分享');
      }
    } catch (err) {
      console.error('截图失败:', err);
    }

    window.open(`http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      await downloadPDF('detailed-report-pdf', `数字公民人格报告-${currentPersona?.name}-${resultCode}.pdf`);
      logToLark({
        参与者标识: participantId,
        来源平台: 'web',
        动作: '下载PDF',
        MBTI结果: resultCode
      });
    } catch (err) {
      console.error('PDF下载失败:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: '100%', width: step === 'result' ? '100%' : '480px', margin: '0 auto', padding: '0.5rem', minHeight: '100dvh' }}>
      <div className="bg-glow" />
      
      {/* Hidden Detailed Report for PDF Generation */}
      {step === 'result' && <DetailedReport code={resultCode} persona={currentPersona} />}

      <AnimatePresence mode="wait">
        {step === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ textAlign: 'center', padding: 'var(--card-padding) 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '85dvh' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--padding-md)' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ padding: 'clamp(0.8rem, 3vw, 1.2rem)', background: 'rgba(251, 146, 60, 0.1)', borderRadius: '30%' }}>
                    <DynamicIcon name="Cpu" size="var(--icon-size)" color="var(--primary)" />
                  </div>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: 'absolute', top: -5, right: -5, background: 'var(--accent)', padding: '5px', borderRadius: '50%' }}>
                    <Sparkles size={18} color="#fff" />
                  </motion.div>
                </div>
              </div>
              <h1 style={{ fontSize: 'var(--title-size)', fontWeight: '900', marginBottom: 'var(--padding-sm)', color: 'var(--foreground)', letterSpacing: '-1px', lineHeight: '1.2' }}>
                数字公民人格 <span style={{ color: 'var(--primary)' }}>MBTI</span>
              </h1>
              <div style={{ color: 'var(--text-dim)', fontSize: 'var(--subtitle-size)', marginBottom: 'var(--padding-md)', fontWeight: '500', lineHeight: '1.8' }}>
                2026 AI 时代：<br/>
                你是驯服算法的大师，<br/>
                还是被看光的透明人？
              </div>

              {/* 四大维度展示区 - 小屏可隐藏 */}
              {!isSmallScreen && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: 'var(--padding-md)' }}>
                  {[
                    ['主权', '效用'],
                    ['审慎', '乐观'],
                    ['掌控', '让渡'],
                    ['积极', '响应']
                  ].map(([left, right], idx) => (
                    <div key={idx} style={{ padding: '0.5rem', background: 'rgba(251, 146, 60, 0.05)', borderRadius: '12px', border: '1px solid rgba(251, 146, 60, 0.1)', fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)', fontWeight: '800', color: 'var(--text-dim)', display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <span>{left}</span>
                      <span style={{ color: 'var(--primary)', opacity: 0.5, fontStyle: 'italic' }}>vs</span>
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
              )}

              <p style={{ color: 'var(--text-dim)', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', fontWeight: '700', marginBottom: 'var(--padding-lg)' }}>
                深度解构 16 种原型，锁定你的数字公民人格 DNA
              </p>
            </div>

            <div>
              <button className="btn" onClick={handleStartTest} style={{ width: '100%', fontSize: 'clamp(1.1rem, 4vw, 1.25rem)', padding: 'clamp(1rem, 3vh, 1.3rem)', marginBottom: 'var(--padding-md)' }}>
                开启我的性格档案
              </button>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', fontWeight: '700', borderTop: '1px solid #f1f5f9', paddingTop: 'var(--padding-sm)' }}>
                出品：<a href="https://putongren.org" target="_blank" style={{ color: 'inherit', textDecoration: 'underline' }}>「普通人的数字权利」社区</a>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'test' && (
          <motion.div key={`test-${currentQ}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card" style={{ padding: 'var(--card-padding) 1.2rem', minHeight: '420px', display: 'flex', flexDirection: 'column' }}>
            <div className="progress-bar" style={{ height: '6px', marginBottom: 'clamp(1.5rem, 4vh, 2rem)' }}>
              <div className="progress-fill" style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
            </div>
            
            <div style={{ marginBottom: 'clamp(1.8rem, 5vh, 2.5rem)', flexGrow: 1 }}>
              <div style={{ color: 'var(--primary)', fontWeight: '900', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)', letterSpacing: '2px', marginBottom: 'clamp(0.75rem, 2.5vh, 1rem)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Activity size={14} /> 维度探索 {currentQ + 1} / {questions.length}
              </div>
              <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.45rem)', fontWeight: '800', lineHeight: '1.45', color: 'var(--foreground)' }}>
                {questions[currentQ].question}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <motion.button whileTap={{ scale: 0.98, backgroundColor: 'var(--option-hover)' }} className="btn btn-option" onClick={() => handleAnswer('A')} style={{ padding: 'clamp(0.9rem, 2.5vh, 1.2rem)', fontSize: 'clamp(0.9rem, 2.7vw, 1rem)', lineHeight: '1.4' }}>
                {questions[currentQ].option_a}
              </motion.button>
              <motion.button whileTap={{ scale: 0.98, backgroundColor: 'var(--option-hover)' }} className="btn btn-option" onClick={() => handleAnswer('B')} style={{ padding: 'clamp(0.9rem, 2.5vh, 1.2rem)', fontSize: 'clamp(0.9rem, 2.7vw, 1rem)', lineHeight: '1.4' }}>
                {questions[currentQ].option_b}
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <div className="result-container" style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '0.8rem', color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '700' }}>
              <Camera size={14} /> 📷 截图保存长图，分享你的数字公民人格
            </div>

            <motion.div id="result-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
              <div style={{ background: currentPersona?.theme_color || 'var(--primary)', padding: 'var(--hero-padding) 1.25rem', textAlign: 'center', color: '#fff' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.35rem 0.9rem', background: 'rgba(0,0,0,0.15)', borderRadius: '99px', fontSize: 'clamp(0.7rem, 2vw, 0.75rem)', fontWeight: '800', marginBottom: 'clamp(0.8rem, 2vh, 1.5rem)', letterSpacing: '1px' }}>
                  TYPE ARCHIVE: {resultCode}
                </div>
                <PersonaAvatar code={resultCode} color="#ffffff" />
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: '900', margin: '0.8rem 0 0.2rem 0', letterSpacing: '-1.5px' }}>
                  {currentPersona?.name}
                </h1>
                <div style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', fontWeight: '800', letterSpacing: '4px', opacity: 0.8, marginBottom: '0.6rem' }}>
                  {resultCode.split('').join('-')}
                </div>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.15rem)', fontWeight: '700', opacity: 0.95 }}>
                  {currentPersona?.slogan}
                </p>
              </div>

              <div style={{ padding: 'var(--padding-md) 1.1rem', background: '#fff' }}>
                {/* 标签区域 - 小屏可隐藏 */}
                {!isSmallScreen && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {currentPersona?.tags?.map((tag: string) => (
                      <span key={tag} style={{ background: '#f8fafc', color: currentPersona?.theme_color, padding: '0.35rem 0.8rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', border: '1px solid #f1f5f9' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 1. 数字公民人格解读 */}
                <div style={{ padding: '1.25rem', background: 'linear-gradient(180deg, #f8fafc 0%, #fff 100%)', borderRadius: '20px', border: '1px solid #f1f5f9', marginBottom: '1.75rem', position: 'relative' }}>
                   <div style={{ position: 'absolute', top: '-8px', left: '18px', background: currentPersona?.theme_color, padding: '3px', borderRadius: '50%' }}>
                      <Quote size={12} color="#fff" />
                   </div>
                   <h3 style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', fontWeight: '900', marginBottom: '0.75rem', color: currentPersona?.theme_color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      数字公民人格解读
                   </h3>
                   <p style={{ color: '#475569', fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', lineHeight: '1.7', textAlign: 'justify' }}>
                      {currentPersona?.narrative}
                   </p>
                </div>

                {/* 2. 性格维度拆解 */}
                <div style={{ marginBottom: 'clamp(2rem, 5vh, 3rem)' }}>
                  <h3 style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', fontWeight: '900', marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={16} color={currentPersona?.theme_color} /> 性格维度拆解
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                    {resultCode.split('').map((letter, idx) => {
                      const dim = (dimensions as any)[letter];
                      return (
                        <div key={idx} style={{ padding: '0.85rem', background: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: '800', fontSize: 'clamp(0.75rem, 2.3vw, 0.85rem)', color: currentPersona?.theme_color, marginBottom: '0.35rem' }}>
                            {formatDimensionName(dim.name)}
                          </div>
                          <p style={{ fontSize: 'clamp(0.7rem, 2vw, 0.75rem)', color: '#64748b', lineHeight: '1.5', fontWeight: '500' }}>{dim.brief}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 品牌底部印章 */}
                <div style={{ borderTop: '2px dashed #f1f5f9', paddingTop: 'clamp(1.5rem, 4vh, 2.5rem)', paddingBottom: '0.8rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
                    <Shield size={20} color="var(--primary)" />
                    <a href="https://putongren.org" target="_blank" style={{ fontWeight: '900', fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)', color: 'var(--foreground)', textDecoration: 'none' }}>「普通人的数字权利」</a>
                  </div>
                  <p style={{ fontSize: '0.68rem', color: '#94a3b8', lineHeight: '1.5', maxWidth: '280px', margin: '0 auto' }}>
                    一个提升全民科技伦理素养、数字权利意识，<br/>为普通人提供权益发声和参与平台的公益社区。
                  </p>
                </div>
              </div>
            </motion.div>

            <div style={{ marginTop: 'clamp(1.5rem, 4vh, 2.5rem)', paddingBottom: 'clamp(2.5rem, 6vh, 4rem)', display: 'flex', flexDirection: 'column', gap: '0.9rem', alignItems: 'center' }}>
              <button 
                onClick={handleDownloadPDF} 
                disabled={isDownloading}
                style={{ 
                  background: 'var(--primary)', 
                  color: '#fff', 
                  border: 'none', 
                  padding: 'clamp(0.85rem, 2.5vh, 1rem) 1.8rem', 
                  borderRadius: '14px', 
                  fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', 
                  fontWeight: '900', 
                  cursor: isDownloading ? 'not-allowed' : 'pointer', 
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 20px -5px rgba(251, 146, 60, 0.3)'
                }}
              >
                {isDownloading ? <RefreshCcw className="animate-spin" size={18} /> : <Download size={18} />}
                {isDownloading ? '正在生成深度报告...' : '获取深度性格报告 (PDF)'}
              </button>
              
              <button onClick={handleShareWeibo} style={{ background: '#ff8200', color: '#fff', border: 'none', padding: 'clamp(0.85rem, 2.5vh, 1rem) 1.8rem', borderRadius: '14px', fontSize: 'clamp(0.88rem, 2.4vw, 0.95rem)', fontWeight: '800', cursor: 'pointer', width: '100%' }}>分享到微博</button>
              <button onClick={resetTest} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 'clamp(0.88rem, 2.4vw, 0.95rem)', fontWeight: '700', textDecoration: 'underline', cursor: 'pointer' }}>
                 重新开始解析之旅
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
