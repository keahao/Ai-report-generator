import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, DollarSign, Settings, Shield } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: FileText, label: '报告生成' },
    { path: '/pricing', icon: DollarSign, label: '定价' },
    { path: '/settings', icon: Settings, label: '设置' },
  ]

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-xl shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
              📊
            </div>
            <span className="font-bold text-lg hidden sm:block">AI Report Generator</span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  location.pathname === path
                    ? 'bg-primary-500/20 text-primary-300'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="relative pt-16 min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-gray-300 transition-colors flex items-center gap-1">
                <Shield size={14} />
                隐私政策
              </Link>
              <Link to="/terms" className="hover:text-gray-300 transition-colors">
                服务条款
              </Link>
            </div>
            <p>© 2026 AI Report Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
