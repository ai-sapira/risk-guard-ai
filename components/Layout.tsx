import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  Zap, 
  Building2,
  FileText,
  Settings,
  Search,
  Bell,
  Command,
  ChevronDown,
  Plus,
  CheckCircle2,
  LogOut,
  PanelLeft,
  Target,
  ChevronRight
} from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: Role;
}

const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsWorkspaceMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/');
  };

  const getNavItems = () => {
    switch (role) {
      case Role.INSURANCE_ADMIN:
        return [
          { icon: LayoutGrid, label: 'Overview', path: '/insurance' },
          { icon: Building2, label: 'Companies', path: '/insurance/clients' },
          { icon: FileText, label: 'Reports', path: '/insurance/reports' },
          { icon: Settings, label: 'Settings', path: '/insurance/settings' },
        ];
      case Role.COMPANY_ADMIN:
        return [
          { icon: LayoutGrid, label: 'Home', path: '/company' },
          { icon: Target, label: 'Campaigns', path: '/company/campaigns' },
          { icon: Users, label: 'People', path: '/company/employees' },
          { icon: Zap, label: 'Training', path: '/company/training' },
          { icon: FileText, label: 'Reports', path: '/company/reports' },
          { icon: Settings, label: 'Settings', path: '/company/settings' },
        ];
      case Role.EMPLOYEE:
        return [
          { icon: LayoutGrid, label: 'Dashboard', path: '/employee' },
          { icon: Zap, label: 'Training', path: '/employee/training' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar - Solid Gray Background, Full Height, Right Border */}
      <aside className="w-60 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 z-30 relative">
        {/* Workspace Switcher */}
        <div 
          className="h-12 flex items-center px-4 border-b border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer group relative select-none"
          onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
        >
          <div className="flex items-center gap-3 w-full">
             <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
                <div className="font-bold text-[11px] tracking-tight">R</div>
             </div>
             <div className="flex flex-1 items-center justify-between min-w-0">
                <span className="text-[13px] font-semibold text-slate-900 truncate tracking-tight">RiskGuard HQ</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
             </div>
          </div>
        </div>

        {/* Workspace Menu Dropdown */}
        {isWorkspaceMenuOpen && (
          <div ref={menuRef} className="absolute top-14 left-2 w-56 bg-white border border-slate-200 rounded-lg shadow-modal z-50 py-1 animate-enter origin-top-left">
            <div className="px-3 py-2 border-b border-slate-100">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Current Workspace</p>
              <p className="text-[13px] font-medium text-slate-900 mt-0.5">RiskGuard HQ</p>
            </div>
            <div className="py-1">
              <button 
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-slate-600 hover:bg-sky-50 hover:text-blue-600 transition-colors text-left"
                onClick={() => setIsWorkspaceMenuOpen(false)}
              >
                <Settings className="w-3.5 h-3.5" />
                Workspace Settings
              </button>
              <button 
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-slate-600 hover:bg-sky-50 hover:text-blue-600 transition-colors text-left"
                onClick={() => setIsWorkspaceMenuOpen(false)}
              >
                <Users className="w-3.5 h-3.5" />
                Manage Members
              </button>
            </div>
            <div className="border-t border-slate-100 pt-1 mt-1">
               <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors text-left"
               >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
               </button>
            </div>
          </div>
        )}

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150 leading-5 ${
                    isActive 
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <item.icon 
                    className={`w-4 h-4 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`} 
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Lists Section (Attio Style) */}
          <div className="mt-6 px-3">
             <p className="text-[11px] font-semibold text-slate-500 mb-2 flex items-center justify-between group cursor-pointer hover:text-slate-700 uppercase tracking-wider">
                <span>VIEWS</span>
                <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
             </p>
             <div className="space-y-0.5">
                <button className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left leading-5 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform"></div>
                   <span>Pending Actions</span>
                </button>
                <button className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left leading-5 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></div>
                   <span>Active Risks</span>
                </button>
             </div>
          </div>
        </div>

        {/* User Profile - Bottom */}
        <div className="p-3 border-t border-slate-200">
           <button className="w-full flex items-center gap-3 p-1.5 rounded-md hover:bg-slate-100 transition-colors text-left">
              <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                 JD
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-[13px] font-medium text-slate-900 truncate">Jane Doe</p>
              </div>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative">
        {/* Top Navigation Bar - Compact */}
        <header className="h-12 border-b border-slate-200 flex items-center justify-between px-4 bg-white shrink-0 z-10">
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
             <span className="hover:text-slate-800 cursor-pointer transition-colors">Workspace</span>
             <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
             <span className="font-medium text-slate-900 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                {navItems.find(n => n.path === location.pathname)?.label || 'Overview'}
             </span>
          </div>

          <div className="flex items-center gap-2">
             {/* Search Input */}
             <div className="relative group">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
                <input 
                   type="text" 
                   placeholder="Search or jump to..."
                   className="pl-8 pr-8 h-7 w-64 bg-white border border-slate-200 rounded text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                   <span className="text-[10px] text-slate-400 font-medium bg-slate-50 px-1 rounded border border-slate-100">⌘K</span>
                </div>
             </div>
             
             <div className="w-px h-4 bg-slate-200 mx-1"></div>

             <button className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors">
                <Bell className="w-3.5 h-3.5" />
             </button>
             <button className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded transition-colors">
                <Settings className="w-3.5 h-3.5" />
             </button>
          </div>
        </header>

        {/* Scrollable Content with Dot Background support */}
        <div className="flex-1 overflow-y-auto relative">
           {/* Page Transition Wrapper */}
           <div key={location.pathname} className="h-full animate-page-enter">
             {children}
           </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;