import { useState, useMemo } from 'react'
import { View, Text, Button, Progress, Canvas } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import questions from '../../data/questions.json'
import personas from '../../data/personas.json'
import { PersonaTotem } from '../../components/PersonaTotem'
import './index.scss'

export default function Index() {
  const [step, setStep] = useState<'landing' | 'test' | 'result'>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [resultCode, setResultCode] = useState('')
  const [dimensionScores, setDimensionScores] = useState<Record<string, number>>({})
  const [isDrawing, setIsDrawing] = useState(false)

  // 分享给好友
  useShareAppMessage(() => {
    const persona = (personas as any)[resultCode]
    return {
      title: step === 'result' ? `我的数字公民人格是：#${persona?.name}#！全球仅 ${persona?.rarity}% 的人拥有此性格。` : '2026 AI 时代：你是驯服算法的大师，还是被看光的透明人？',
      path: '/pages/index/index'
    }
  })

  // 分享到朋友圈
  useShareTimeline(() => {
    const persona = (personas as any)[resultCode]
    return {
      title: step === 'result' ? `数字公民人格 MBTI：我是[${persona?.name}]，稀有度 ${persona?.rarity}%` : '数字公民人格 MBTI 评测',
      query: ''
    }
  })

  const handleAnswer = (choice: 'A' | 'B') => {
    const newAnswers = { ...answers, [currentQ]: choice }
    setAnswers(newAnswers)
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (finalAnswers: Record<number, 'A' | 'B'>) => {
    const scores: Record<string, number> = { 'S/U': 0, 'C/O': 0, 'M/D': 0, 'P/R': 0 }
    const maxPossible: Record<string, number> = { 'S/U': 0, 'C/O': 0, 'M/D': 0, 'P/R': 0 }
    
    questions.forEach((q: any, idx: number) => {
      const choice = finalAnswers[idx]
      const dimension = q.dimension
      maxPossible[dimension] += q.weight
      if (choice === 'A') scores[dimension] += q.weight
    })

    const percentages: Record<string, number> = {}
    Object.keys(scores).forEach(dim => {
      percentages[dim] = Math.round((scores[dim] / maxPossible[dim]) * 100)
    })
    
    setDimensionScores(percentages)
    const code = [
      percentages['S/U'] >= 50 ? 'S' : 'U',
      percentages['C/O'] >= 50 ? 'C' : 'O',
      percentages['M/D'] >= 50 ? 'M' : 'D',
      percentages['P/R'] >= 50 ? 'P' : 'R'
    ].join('')
    
    setResultCode(code)
    setStep('result')
    Taro.pageScrollTo({ scrollTop: 0, duration: 300 })
  }

  const currentPersona = (personas as any)[resultCode]

  // --- Canvas 海报生成逻辑 ---
  const drawPoster = async () => {
    if (isDrawing) return
    setIsDrawing(true)
    Taro.showLoading({ title: '正在生成海报...' })

    try {
      const persona = (personas as any)[resultCode]
      const ctx = Taro.createCanvasContext('posterCanvas')

      // 1. 绘制背景
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(0, 0, 300, 600)

      // 2. 绘制顶部色块
      ctx.setFillStyle(persona.theme_color || '#fb923c')
      ctx.fillRect(0, 0, 300, 180)

      // 3. 绘制稀有度
      ctx.setFontSize(10)
      ctx.setFillStyle('rgba(0,0,0,0.2)')
      ctx.fillRect(100, 20, 100, 20)
      ctx.setFillStyle('#ffffff')
      ctx.setTextAlign('center')
      ctx.fillText(`全球稀有度 ${persona.rarity}%`, 150, 34)

      // 4. 绘制人格名称
      ctx.setFontSize(26)
      ctx.fillText(persona.name, 150, 100)

      // 5. 绘制口号
      ctx.setFontSize(14)
      ctx.setGlobalAlpha(0.9)
      ctx.fillText(persona.slogan, 150, 135)
      ctx.setGlobalAlpha(1.0)

      // 6. 绘制分割线与内容
      ctx.setFillStyle('#333333')
      ctx.setFontSize(14)
      ctx.fillText('数字图腾解析', 150, 220)
      
      // 换行绘制解读
      ctx.setFontSize(11)
      ctx.setFillStyle('#666666')
      const interpretation = persona.interpretation
      const lines = interpretation.length > 20 ? [interpretation.slice(0, 20), interpretation.slice(20, 40)] : [interpretation]
      lines.forEach((line, i) => ctx.fillText(line, 150, 250 + i * 18))

      // 7. 绘制深度画像标题
      ctx.setFillStyle(persona.theme_color)
      ctx.setFontSize(14)
      ctx.fillText('深度画像', 150, 320)
      
      // 换行绘制描述
      ctx.setFontSize(10)
      ctx.setFillStyle('#444444')
      const desc = persona.desc
      const descLines = [desc.slice(0, 25), desc.slice(25, 50), desc.slice(50, 75)]
      descLines.forEach((line, i) => ctx.fillText(line, 150, 350 + i * 16))

      // 8. 绘制底部品牌
      ctx.setStrokeStyle('#f1f5f9')
      ctx.setLineDash([5, 5])
      ctx.moveTo(30, 480)
      ctx.lineTo(270, 480)
      ctx.stroke()

      ctx.setFontSize(15)
      ctx.setFillStyle('#1e293b')
      ctx.fillText('普通人的数字权利', 150, 520)
      
      ctx.setFontSize(9)
      ctx.setFillStyle('#94a3b8')
      ctx.fillText('提升全民科技伦理素养 · 捍卫数字权利', 150, 545)
      ctx.fillText('—— 搜索「普通人的数字权利」开启测评 ——', 150, 575)

      // 渲染
      ctx.draw(false, () => {
        Taro.canvasToTempFilePath({
          canvasId: 'posterCanvas',
          success: (res) => {
            Taro.hideLoading()
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => Taro.showToast({ title: '已存入相册', icon: 'success' }),
              fail: () => Taro.showModal({ title: '保存失败', content: '请授权相册访问权限', showCancel: false })
            })
          },
          fail: () => {
            Taro.hideLoading()
            Taro.showToast({ title: '生成失败', icon: 'none' })
          }
        })
      })
    } catch (err) {
      Taro.hideLoading()
    } finally {
      setIsDrawing(false)
    }
  }

  const resetTest = () => {
    setStep('landing')
    setCurrentQ(0)
    setAnswers({})
  }

  return (
    <View className='container'>
      <Canvas canvasId='posterCanvas' style={{ width: '300px', height: '600px', position: 'absolute', left: '-1000px', top: '-1000px' }} />

      {step === 'landing' && (
        <View className='landing'>
          <View className='logo-box'>
             <View className='logo-icon' />
          </View>
          <View className='title'>数字公民人格 MBTI</View>
          <Text className='subtitle'>2026 AI 时代：你是哪种数字公民？</Text>
          <Button className='btn-start' onClick={() => setStep('test')}>开启我的档案</Button>
          <View className='brand-footer'>出品：普通人的数字权利社区</View>
        </View>
      )}

      {step === 'test' && (
        <View className='test'>
          <Progress percent={((currentQ + 1) / questions.length) * 100} strokeWidth={4} activeColor='#fb923c' />
          <View className='question-box'>
            <Text className='q-count'>探索进度 {currentQ + 1} / {questions.length}</Text>
            <Text className='q-text'>{questions[currentQ].question}</Text>
          </View>
          <View className='options'>
            <Button className='btn-opt' onClick={() => handleAnswer('A')}>{questions[currentQ].option_a}</Button>
            <Button className='btn-opt' onClick={() => handleAnswer('B')}>{questions[currentQ].option_b}</Button>
          </View>
        </View>
      )}

      {step === 'result' && (
        <View className='result'>
          <View className='result-card-outer'>
            <View className='result-header' style={{ backgroundColor: currentPersona?.theme_color }}>
              <View className='rarity-tag'>全球稀有度 {currentPersona?.rarity}%</View>
              <View className='totem-container'>
                <PersonaTotem code={resultCode} color="#ffffff" />
              </View>
              <View className='res-name'>{currentPersona?.name}</View>
              <View className='res-slogan'>{currentPersona?.slogan}</View>
            </View>

            <View className='result-body'>
              <View className='tags-row'>
                {currentPersona?.tags?.map(tag => <Text key={tag} className='tag' style={{ color: currentPersona?.theme_color }}>{tag}</Text>)}
              </View>

              <View className='section'>
                <View className='section-title' style={{ color: currentPersona?.theme_color }}>数字图腾解析</View>
                <View className='section-content'>{currentPersona?.interpretation}</View>
              </View>

              <View className='section'>
                <View className='section-title' style={{ color: currentPersona?.theme_color }}>深度画像</View>
                <View className='section-content'>{currentPersona?.desc}</View>
              </View>

              <View className='section survival'>
                <View className='section-title'>生存指南</View>
                <View className='section-content'>{currentPersona?.advice}</View>
              </View>

              <View className='brand-seal'>
                <View className='seal-name'>普通人的数字权利</View>
                <View className='seal-desc'>提升全民科技伦理素养，捍卫数字权利</View>
              </View>
            </View>
          </View>
          
          <View className='footer-actions'>
            <Button className='btn-save' onClick={drawPoster} disabled={isDrawing}>保存海报分享</Button>
            <Button className='btn-reset' onClick={resetTest}>重新测试</Button>
          </View>
        </View>
      )}
    </View>
  )
}
