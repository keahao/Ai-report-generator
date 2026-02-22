import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, AlertCircle, Loader2, Copy, Check, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const REPORT_TYPES = [
  { id: 'feasibility', label: '可行性研究', icon: '📊' },
  { id: 'business', label: '商业计划', icon: '💼' },
  { id: 'market', label: '市场调研', icon: '📈' },
  { id: 'technical', label: '技术分析', icon: '🔧' },
  { id: 'financial', label: '财务分析', icon: '💰' },
]

const DEPTH_LEVELS = [
  { id: 'basic', label: '基础版', words: '500-1000字' },
  { id: 'standard', label: '标准版', words: '2000-3000字' },
  { id: 'deep', label: '深度版', words: '5000-8000字' },
]

interface Config {
  apiKey: string
  model: string
}

export default function Home() {
  const [input, setInput] = useState('')
  const [reportType, setReportType] = useState('feasibility')
  const [depth, setDepth] = useState('standard')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const getConfig = (): Config | null => {
    const stored = localStorage.getItem('ai-tools-config')
    return stored ? JSON.parse(stored) : null
  }

  const handleGenerate = async () => {
    const config = getConfig()
    if (!config?.apiKey) {
      setError('请先配置 API Key')
      return
    }

    if (!input.trim()) {
      setError('请输入报告需求')
      return
    }

    setLoading(true)
    setError('')
    setOutput('')

    try {
      const systemPrompt = `你是一位专业的${REPORT_TYPES.find(t => t.id === reportType)?.label}专家。
请根据用户需求，生成一份${DEPTH_LEVELS.find(d => d.id === depth)?.label}（${DEPTH_LEVELS.find(d => d.id === depth)?.words}）的专业报告。
报告应该结构清晰、数据详实、分析深入。`

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: config.model || 'deepseek/deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input },
          ],
          stream: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('无法读取响应流')
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const json = JSON.parse(data)
              const content = json.choices?.[0]?.delta?.content
              if (content) {
                setOutput(prev => prev + content)
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasConfig = getConfig()?.apiKey

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-4xl mb-6 shadow-2xl shadow-primary-500/30"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📊
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
          AI 报告生成
        </h1>
        <p className="text-xl text-gray-400">
          可行性研究 · 商业计划 · 市场调研
        </p>
      </motion.div>

      {/* API Key Alert */}
      <AnimatePresence>
        {!hasConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-200">
              <AlertCircle className="flex-shrink-0" />
              <p>
                请先配置 API Key。{' '}
                <Link to="/settings" className="underline hover:text-yellow-100">
                  前往设置
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 sm:p-8"
      >
        {/* Report Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">报告类型</label>
          <div className="flex flex-wrap gap-2">
            {REPORT_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  reportType === type.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Depth Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">深度级别</label>
          <div className="flex flex-wrap gap-2">
            {DEPTH_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setDepth(level.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  depth === level.id
                    ? 'bg-secondary-500 text-white shadow-lg shadow-secondary-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {level.label} <span className="text-xs opacity-70">({level.words})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">输入需求</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="详细描述您的报告需求，例如：为一家新能源汽车公司撰写市场调研报告，分析2024-2026年中国电动车市场趋势..."
            className="w-full h-40 p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !hasConfig}
          className="w-full py-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              生成中...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              生成报告
            </>
          )}
        </button>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output */}
        <AnimatePresence>
          {output && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-300">生成结果</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? '已复制' : '复制'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    <Download size={16} />
                    下载
                  </button>
                </div>
              </div>
              <div className="p-4 bg-black/30 border border-white/10 rounded-xl whitespace-pre-wrap text-gray-300 leading-relaxed max-h-[600px] overflow-y-auto">
                {output}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
