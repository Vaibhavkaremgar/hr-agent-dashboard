import { memo } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LayoutDashboard, Briefcase, Users, Upload, Wallet, BarChart3, Mail, Settings, Receipt, Shield, MessageSquare } from 'lucide-react'
import AIBackground from '../ui/AIBackground'

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800/50 transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 border border-indigo-500/30 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`

export default memo(function Sidebar() {
  const { user } = useAuth()
  
  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { to: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard', emoji: '🎛️' },
        { to: '/admin/users', icon: Users, label: 'Clients', emoji: '👥' },
        { to: '/admin/tools-pricing', icon: Settings, label: 'Tools Pricing', emoji: '⚙️' },
        { to: '/admin/transactions', icon: Receipt, label: 'Transactions', emoji: '🧾' },
        { to: '/candidates', icon: Users, label: 'Candidates', emoji: '📋' },
      ]
    }
    
    if (user?.client_type === 'insurance') {
      return [
        { to: '/insurance', icon: Shield, label: 'Dashboard', emoji: '🏠' },
        { to: '/insurance/customers', icon: Users, label: 'Customers', emoji: '👥' },
        { to: '/insurance/policies', icon: Shield, label: 'Policies', emoji: '📋' },
        { to: '/insurance/renewals', icon: LayoutDashboard, label: 'Renewals', emoji: '🔄' },
        { to: '/insurance/messages', icon: Mail, label: 'Messages', emoji: '💬' },
        { to: '/insurance/claims', icon: Briefcase, label: 'Claims', emoji: '📝' },
        { to: '/insurance/reports', icon: BarChart3, label: 'Reports', emoji: '📊' },
        { to: '#', icon: Wallet, label: 'Wallet 🔒', emoji: '💰', disabled: true },
      ]
    }
    
    // Default HR client menu
    return [
      { to: '/dashboard', icon: LayoutDashboard, label: 'HR Dashboard', emoji: '📊' },
      { to: '/jobs', icon: Briefcase, label: 'Jobs', emoji: '💼' },
      { to: '/candidates', icon: Users, label: 'Candidates', emoji: '👥' },
      { to: '/upload', icon: Upload, label: 'Resume Upload', emoji: '📤' },
      { to: '/wallet', icon: Wallet, label: 'Wallet', emoji: '💰' },
      { to: '/analytics', icon: BarChart3, label: 'Analytics', emoji: '📈' },
      { to: '/emails', icon: Mail, label: 'Email History', emoji: '📧' },
    ]
  }
  
  const menuItems = getMenuItems()
  
  const getSidebarTitle = () => {
    if (user?.role === 'admin') return null
    if (user?.name) return `🏢 ${user.name}`
    if (user?.client_type === 'insurance') return '🏢 Insurance Agency'
    return '🏢 HR Agency'
  }
  
  const sidebarTitle = getSidebarTitle()
  
  return (
    <aside className="hidden md:block w-[var(--sidebar-width)] border-r border-slate-800/50 bg-slate-900/40 backdrop-blur-xl relative z-10">
      <AIBackground />
      <div className="p-6 border-b border-slate-800/50">
        {/* Client-specific Logo */}
        <div className="mb-4 flex justify-center">
          <img 
            src={user?.email?.toLowerCase().includes('joban') 
              ? 'https://drive.google.com/uc?export=view&id=1R2CNXhJr0rqnYkML3g4GWKPdaZt8-ffc'
              : 'https://drive.google.com/uc?export=view&id=1FzuJ03-cQ8VA7fAUDcoz1QW-2_We5FiL'
            }
            alt="Company Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        {sidebarTitle && (
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
            {sidebarTitle}
          </Link>
        )}
        {user?.client_type && (
          <div className="text-xs text-indigo-300 mt-1">
            {user.client_type === 'insurance' ? 'Insurance Agency' : 'HR Agency'}
          </div>
        )}
        <div className="text-xs text-slate-400 truncate mt-1" title={user?.email || ''}>
          {user?.email}
        </div>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.to}>
            {(item as any).disabled ? (
              <div 
                className="group flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 opacity-50 cursor-not-allowed"
                title="Coming Soon - Premium Feature"
                onClick={() => alert('🔒 Premium Feature\n\nWallet feature coming soon for insurance agencies.\n\nContact support for more info.')}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{item.emoji}</span>
                  <item.icon className="w-4 h-4 opacity-70" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </div>
            ) : (
              <NavLink to={item.to} className={linkCls} title={item.label}>
                <div className="flex items-center gap-3 w-full hover:translate-x-1 transition-transform duration-150">
                  <span className="text-lg">{item.emoji}</span>
                  <item.icon className="w-4 h-4 opacity-70" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
})
