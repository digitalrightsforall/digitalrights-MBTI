import { useState } from 'react'
import { View, Text, Button, Progress, Canvas } from '@tarojs/components'
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import questions from '../../data/questions.json'
import personas from '../../data/personas.json'
import './index.scss'

export default function Index() {
  const [step, setStep] = useState<'landing' | 'test' | 'result'>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [resultCode, setResultCode] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)

  // Share with friends
  useShareAppMessage(() => ({
    title: '2026 AI 时代：你是驯服算法的大师，还是被看光的透明人？',
    path: '/pages/index/index'
  }))

  // Share to Timeline
  useShareTimeline(() => ({
    title: '数字灵魂 MBTI 评测：开启你的数字性格档案',
    query: ''
  }))

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
    
    const code = [
      percentages['S/U'] >= 50 ? 'S' : 'U',
      percentages['C/O'] >= 50 ? 'C' : 'O',
      percentages['M/D'] >= 50 ? 'M' : 'D',
      percentages['P/R'] >= 50 ? 'P' : 'R'
    ].join('')
    
    setResultCode(code)
    setStep('result')
  }

  // --- Canvas 海报生成逻辑 ---
  const drawPoster = async () => {
    setIsDrawing(true)
    Taro.showLoading({ title: '正在生成海报...' })

    try {
      const persona = (personas as any)[resultCode]
      const ctx = Taro.createCanvasContext('posterCanvas')

      // 1. 绘制背景
      ctx.setFillStyle('#ffffff')
      ctx.fillRect(0, 0, 300, 500)

      // 2. 绘制顶部色块
      ctx.setFillStyle(persona.theme_color || '#fb923c')
      ctx.fillRect(0, 0, 300, 150)

      // 3. 绘制文字 - 人格名称
      ctx.setFontSize(28)
      ctx.setFillStyle('#ffffff')
      ctx.setTextAlign('center')
      ctx.fillText(persona.name, 150, 80)

      // 4. 绘制代码
      ctx.setFontSize(16)
      ctx.setGlobalAlpha(0.8)
      ctx.fillText(`TYPE: ${resultCode}`, 150, 110)
      ctx.setGlobalAlpha(1.0)

      // 5. 绘制口号
      ctx.setFontSize(14)
      ctx.setFillStyle('#333333')
      ctx.fillText(`“ ${persona.slogan} ”`, 150, 200)

      // 6. 绘制描述 (简易换行处理)
      ctx.setFontSize(12)
      ctx.setFillStyle('#666666')
      const desc = persona.desc.length > 40 ? persona.desc.substring(0, 37) + '...' : persona.desc
      ctx.fillText(desc, 150, 240)

      // 7. 绘制底部品牌印章
      ctx.setStrokeStyle('#eeeeee')
      ctx.setLineDash([5, 5])
      ctx.moveTo(30, 400)
      ctx.lineTo(270, 400)
      ctx.stroke()

      ctx.setFontSize(14)
      ctx.setFillStyle('#333333')
      ctx.fillText('普通人的数字权利', 150, 440)
      
      ctx.setFontSize(10)
      ctx.setFillStyle('#999999')
      ctx.fillText('提升数字素养 · 捍卫数字权利', 150, 460)

      // 8. 渲染到 Canvas
      ctx.draw(false, () => {
        // 9. 导出为图片
        Taro.canvasToTempFilePath({
          canvasId: 'posterCanvas',
          success: (res) => {
            Taro.hideLoading()
            // 10. 保存到相册
            Taro.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                Taro.showToast({ title: '已保存到相册，快去分享吧！', icon: 'success' })
              },
              fail: () => {
                Taro.showModal({
                  title: '保存失败',
                  content: '请检查是否授权相册访问权限',
                  showCancel: false
                })
              }
            })
          },
          fail: () => {
            Taro.hideLoading()
            Taro.showToast({ title: '生成失败', icon: 'error' })
          }
        })
      })
    } catch (err) {
      Taro.hideLoading()
      console.error(err)
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
      {/* 隐藏的 Canvas 仅用于生成图片 */}
      <Canvas canvasId='posterCanvas' style={{ width: '300px', height: '500px', position: 'absolute', left: '-1000px', top: '-1000px' }} />

      {step === 'landing' && (
        <View className='landing'>
          <View className='title'>数字灵魂 MBTI</View>
          <Text className='subtitle'>2026 AI 时代：你是哪种数字公民？</Text>
          <Button className='btn-start' onClick={() => setStep('test')}>开启我的档案</Button>
          <View className='brand-footer'>出品：普通人的数字权利</View>
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
          <View className='header-card' style={{ backgroundColor: (personas as any)[resultCode]?.theme_color }}>
             <Text className='res-code'>{resultCode}</Text>
             <Text className='res-name'>{(personas as any)[resultCode]?.name}</Text>
          </View>
          <View className='content-body'>
            <Text className='res-slogan'>“ {(personas as any)[resultCode]?.slogan} ”</Text>
            <View className='res-desc'>{(personas as any)[resultCode]?.desc}</View>
            
            <View className='actions'>
              <Button className='btn-save' onClick={drawPoster} disabled={isDrawing}>保存结果海报</Button>
              <Button className='btn-reset' onClick={resetTest}>重新测试</Button>
            </View>

            <View className='about-box'>
              <Text className='about-title'>关于：普通人的数字权利</Text>
              <Text className='about-text'>提升全民科技伦理素养，为普通人提供数字权益发声平台。</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
