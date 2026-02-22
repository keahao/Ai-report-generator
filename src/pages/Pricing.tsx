import { useState } from 'react'
import { Check, Zap, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const PLANS = [
  {
    id: 'free',
    name: '免费版',
    price: '¥0',
    priceYearly: '¥0',
    period: '永久免费',
    features: [
      '每日 3 次生成',
      '5种报告类型',
      '基础版报告',
      'Markdown 导出',
    ],
    cta: '开始使用',
    popular: false,
    link: '/',
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥99',
    priceYearly: '¥79',
    period: '/月',
    periodYearly: '/月 (年付)',
    features: [
      '无限次生成',
      '5种报告类型',
      '所有深度级别',
      'PDF/Word 导出',
      '优先响应',
      '邮件支持',
    ],
    cta: '立即订阅',
    popular: true,
    paypalMonthly: 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=haotony%40hotmail.com&item_name=AI+Report+Generator+-+%E4%B8%93%E4%B8%9A%E7%89%88%E6%9C%88%E4%BB%98&amount=14.00&currency_code=USD&return=https%3A%2F%2Fai-report-generator-alpha.vercel.app%2F%3Fpaid%3Dsuccess&cancel_return=https%3A%2F%2Fai-report-generator-alpha.vercel.app%2Fpricing',
    paypalYearly: 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=haotony%40hotmail.com&item_name=AI+Report+Generator+-+%E4%B8%93%E4%B8%9A%E7%89%88%E5%B9%B4%E4%BB%98&amount=134.00&currency_code=USD&return=https%3A%2F%2Fai-report-generator-alpha.vercel.app%2F%3Fpaid%3Dsuccess&cancel_return=https%3A%2F%2Fai-report-generator-alpha.vercel.app%2Fpricing',
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '¥999',
    priceYearly: '¥799',
    period: '/月',
    periodYearly: '/月 (年付)',
    features: [
      '无限次生成',
      'API 接入',
      '自定义报告模板',
      '团队协作',
      '专属客服',
      'SLA 保障',
    ],
    cta: '联系我们',
    popular: false,
    email: 'mailto:haotony@hotmail.com?subject=AI Report Generator 企业版咨询',
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
          选择适合您的方案
        </h1>
        <p className="text-xl text-gray-400">灵活定价，按需选择</p>
      </motion.div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 rounded-full glass">
          <button
            onClick={() => setBilling('monthly')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              billing === 'monthly'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              billing === 'yearly'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            年付
            <span className="ml-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
              省20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans */}
      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative glass rounded-2xl p-6 lg:p-8 ${
              plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full shadow-lg">
                最受欢迎
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

            <div className="mb-6">
              <span className="text-5xl font-bold">
                {billing === 'yearly' ? plan.priceYearly : plan.price}
              </span>
              <span className="text-gray-400 ml-1">
                {billing === 'yearly' ? plan.periodYearly : plan.period}
              </span>
              {billing === 'yearly' && plan.id !== 'free' && (
                <div className="text-green-400 text-sm mt-1">
                  年省 ¥{(parseInt(plan.price.slice(1)) - parseInt(plan.priceYearly.slice(1))) * 12}
                </div>
              )}
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <Check className="text-green-400 flex-shrink-0" size={18} />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.link && (
              <a
                href={plan.link}
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {plan.cta}
              </a>
            )}

            {plan.paypalMonthly && (
              <a
                href={billing === 'yearly' ? plan.paypalYearly : plan.paypalMonthly}
                className="block text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all"
              >
                <Zap className="inline mr-2" size={18} />
                {plan.cta} ¥{billing === 'yearly' ? '948' : '99'}/{billing === 'yearly' ? '年' : '月'}
              </a>
            )}

            {plan.email && (
              <a
                href={plan.email}
                className="block text-center py-3 rounded-xl font-semibold bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-all"
              >
                <Mail className="inline mr-2" size={18} />
                {plan.cta}
              </a>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        <p>💳 支持 PayPal、信用卡、借记卡</p>
        <p className="mt-2">🔒 安全支付由 PayPal 提供</p>
      </div>
    </div>
  )
}
