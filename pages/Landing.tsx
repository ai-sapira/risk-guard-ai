import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, User, ArrowRight, Command, Plus, Link as LinkIcon, AlertTriangle } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'insurer',
      title: "Telefónica Admin", 
      subtitle: "Underwriting & Portfolio",
      icon: ShieldCheck,
      path: "/insurance",
    },
    {
      id: 'company',
      title: "Company Workspace",
      subtitle: "Risk Management",
      icon: Building2,
      path: "/company",
      actions: [
          { label: "Dashboard", path: "/company" },
          { label: "Simulate Invite", path: "/company/invite/demo-token", icon: LinkIcon }
      ]
    },
    {
      id: 'employee',
      title: "Employee Portal",
      subtitle: "Training & Tasks",
      icon: User,
      path: "/employee",
      actions: [
          { label: "Dashboard", path: "/employee" },
          { label: "New User Setup", path: "/employee/onboarding", icon: User },
          { label: "Simulate Phish Click", path: "/employee/simulation-result/demo", icon: AlertTriangle }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-dot-pattern flex items-center justify-center p-6 font-sans text-slate-900">
      
      <div className="w-full max-w-[450px] animate-enter">
        <div className="text-center mb-10">
           <div className="w-12 h-12 bg-blue-600 rounded-lg mx-auto flex items-center justify-center shadow-lg shadow-blue-200 mb-5">
               {/* Telefónica Logo White */}
                <div className="grid grid-cols-3 gap-1">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-transparent"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-transparent"></div>
                    <div className="w-1.5 h-1.5 bg-transparent"></div><div className="w-1.5 h-1.5 bg-white rounded-full"></div><div className="w-1.5 h-1.5 bg-transparent"></div>
                </div>
           </div>
           <h1 className="text-2xl font-bold text-slate-900 mb-2">RiskGuard HQ</h1>
           <p className="text-[13px] text-slate-500 font-medium uppercase tracking-wider">Powered by Telefónica Tech</p>
        </div>

        {/* Workspace Card */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xl">
           <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Select Environment</span>
              <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[11px] font-medium text-slate-500">v2.5.0</span>
              </div>
           </div>
           
           <div className="p-4 space-y-3">
              {roles.map((role) => (
                <div key={role.id} className="relative group rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all p-4 hover:shadow-sm">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                        <role.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{role.title}</h3>
                        <p className="text-[12px] text-slate-500">{role.subtitle}</p>
                      </div>
                    </div>

                    {role.actions ? (
                        <div className="flex flex-wrap gap-2 pl-14">
                            {role.actions.map(action => (
                                <button 
                                    key={action.label}
                                    onClick={() => navigate(action.path)}
                                    className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-md text-[11px] font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm hover:shadow"
                                >
                                    {action.icon && <action.icon className="w-3 h-3" />}
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="pl-14">
                            <button 
                                onClick={() => navigate(role.path)}
                                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-[12px] font-bold hover:bg-slate-800 transition-all shadow-md w-full group-hover:bg-blue-600"
                            >
                                Access Console <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>
              ))}
           </div>
           
           <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
              <p className="text-[10px] text-slate-400 font-medium">
                  © 2023 Telefónica Cybersecurity & Cloud Tech
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;