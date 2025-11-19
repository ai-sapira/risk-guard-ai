import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, User, ArrowRight, Command } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'insurer',
      title: "Insurance Provider",
      subtitle: "Admin Console",
      icon: ShieldCheck,
      path: "/insurance",
    },
    {
      id: 'company',
      title: "Company Workspace",
      subtitle: "Risk Management",
      icon: Building2,
      path: "/company",
    },
    {
      id: 'employee',
      title: "Employee Portal",
      subtitle: "Training & Tasks",
      icon: User,
      path: "/employee",
    }
  ];

  return (
    <div className="min-h-screen bg-dot-pattern flex items-center justify-center p-6 font-sans text-slate-900">
      
      <div className="w-full max-w-[400px] animate-enter">
        <div className="text-center mb-8">
           <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg mx-auto flex items-center justify-center shadow-sm mb-4">
              <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
           </div>
           <h1 className="text-lg font-semibold text-slate-900">Welcome back</h1>
           <p className="text-[13px] text-slate-500 mt-1">Select a workspace to continue</p>
        </div>

        {/* Workspace Card */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
           <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Available Environments</span>
              <Command className="w-3 h-3 text-slate-400" />
           </div>
           
           <div className="p-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => navigate(role.path)}
                  className="w-full flex items-center gap-3 p-2.5 rounded-md hover:bg-sky-50 border border-transparent hover:border-blue-100 transition-all group text-left"
                >
                  <div className="w-8 h-8 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors shadow-sm">
                    <role.icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-slate-900">{role.title}</h3>
                    <p className="text-[11px] text-slate-500">{role.subtitle}</p>
                  </div>

                  <div className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight className="w-3 h-3 text-blue-400" />
                  </div>
                </button>
              ))}
           </div>
           
           <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                 </span>
                 <span className="text-[11px] text-slate-500 font-medium">System Operational</span>
              </div>
              <span className="text-[11px] text-slate-400">v2.4.0</span>
           </div>
        </div>

        <div className="mt-6 text-center">
           <p className="text-[11px] text-slate-400 hover:text-slate-500 transition-colors cursor-pointer">
             Don't see your workspace? <span className="underline decoration-slate-300 underline-offset-2">Contact Support</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;