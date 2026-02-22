import { useState } from 'react'
import { Save, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const MODELS = [
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat', recommended: true },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash' },
]

interface Config {
  apiKey: string
  model: string
}

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('deepseek/deepseek-chat')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load existing config
  useState(() => {
    const stored = localStorage.getItem('ai-tools-config')
    if (stored) {
      const config: Config = JSON.parse(stored)
      setApiKey(config.apiKey || '')
      setModel(config.model || 'deepseek/deepseek-chat')
    }
  })

  const handleSave = () => {
    const config: Config = { apiKey, model }
    localStorage.setItem('ai-tools-config', JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-8 gradient-text">API 设置</h1>

        <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              OpenRouter API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-v1-..."
                className="w-full px-4 py-3 pr-12 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              从{' '}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300"
              >
                openrouter.ai/keys
              </a>
              {' '}获取 API Key
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              AI 模型
            </label>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModel(m.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left transition-all flex items-center justify-between ${
                    model === m.id
                      ? 'bg-primary-500/20 border-primary-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                  } border`}
                >
                  <span>{m.name}</span>
                  {m.recommended && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      推荐
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <CheckCircle size={20} />
                已保存
              </>
            ) : (
              <>
                <Save size={20} />
                保存设置
              </>
            )}
          </button>
        </div>

        {/* Help */}
        <div className="mt-8 p-6 glass rounded-2xl">
          <h2 className="font-semibold mb-4">使用帮助</h2>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>1. 访问 OpenRouter 官网注册账号</li>
            <li>2. 在 Keys 页面创建新的 API Key</li>
            <li>3. 将 API Key 粘贴到上方输入框</li>
            <li>4. 选择您喜欢的 AI 模型</li>
            <li>5. 点击保存，即可开始使用</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
