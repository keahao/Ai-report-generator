export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 gradient-text">隐私政策</h1>
      
      <div className="glass rounded-2xl p-6 sm:p-8 prose prose-invert prose-sm">
        <p className="text-gray-400 mb-6">
          最后更新：2026年2月
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">1. 信息收集</h2>
        <p className="text-gray-300">
          我们收集的信息仅用于提供和改进服务。这包括您输入的报告需求和生成的报告内容。
          所有数据在本地浏览器中处理，我们不会将您的内容存储在服务器上。
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">2. API Key 安全</h2>
        <p className="text-gray-300">
          您的 API Key 仅存储在本地浏览器中（localStorage），不会传输到我们的服务器。
          AI 报告生成请求直接从您的浏览器发送到 OpenRouter API。
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">3. 数据存储</h2>
        <p className="text-gray-300">
          本应用不使用后端服务器，所有用户数据（设置、偏好）均存储在您的浏览器本地。
          清除浏览器数据将删除所有本地存储的信息。
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">4. 第三方服务</h2>
        <p className="text-gray-300">
          本应用使用以下第三方服务：
        </p>
        <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
          <li>OpenRouter API - AI 模型调用</li>
          <li>PayPal - 支付处理</li>
        </ul>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">5. Cookie</h2>
        <p className="text-gray-300">
          本应用使用 localStorage 存储用户设置，不使用传统的 HTTP Cookie。
        </p>

        <h2 className="text-xl font-semibold text-white mt-6 mb-3">6. 联系我们</h2>
        <p className="text-gray-300">
          如有隐私相关问题，请联系：haotony@hotmail.com
        </p>
      </div>
    </div>
  )
}
