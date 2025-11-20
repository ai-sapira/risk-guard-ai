
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Play, 
  CheckCircle2, 
  Clock,
  BookOpen,
  Lock,
  History,
  Smartphone,
  Mail,
  Calendar
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Phishing Fundamentals",
    type: "Training",
    duration: "5 min",
    status: "Pending",
    priority: "High",
    description: "Learn to identify suspicious email headers.",
    link: "/employee/training"
  },
  {
    id: 2,
    title: "Password Security Policy",
    type: "Policy",
    duration: "2 min",
    status: "Pending",
    priority: "Medium",
    description: "Review the updated quarterly requirements.",
    link: "/employee/training"
  },
  {
    id: 3,
    title: "Q3 Security Quiz",
    type: "Assessment",
    duration: "10 min",
    status: "Completed",
    priority: "Medium",
    description: "Test your knowledge on recent tactics.",
    link: "/employee/training"
  }
];

const simHistory = [
    { id: 101, date: "Oct 20", type: "Email", outcome: "Clean", title: "Fake Invoice" },
    { id: 102, date: "Oct 05", type: "SMS", outcome: "Reported", title: "Delivery Fee" },
    { id: 103, date: "Sep 15", type: "Email", outcome: "Failed", title: "Urgent CEO Request" },
];

const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  
  const personalScore = 85;

  return (
    <div className="w-full min-h-full bg-dot-pattern p-8">
      {/* Welcome Header */}
      <div className="flex items-end justify-between mb-8 animate-enter">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Security Dashboard</h1>
           <p className="text-slate-500 text-sm mt-1">Welcome back. You are on a <span className="font-semibold text-blue-600">12-day security streak!</span></p>
        </div>
        <div className="text-right hidden sm:block">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm text-[12px] font-medium text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Today, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
          
          {/* Left Column: Personal Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-6 animate-slide-up">
              {/* Risk Score Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
                  <h2 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-4 relative z-10">Your Security Score</h2>
                  <div className="flex items-end gap-3 mb-4 relative z-10">
                      <span className="text-6xl font-bold text-slate-900 tracking-tighter">{personalScore}</span>
                      <span className="text-sm font-medium text-emerald-600 mb-2 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Top 10%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3 relative z-10">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 relative" style={{ width: `${personalScore}%` }}>
                          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50"></div>
                      </div>
                  </div>
                  <p className="text-xs text-slate-400 relative z-10">Keep it above 80 to maintain "Guardian" status.</p>
              </div>

              {/* Detailed Metrics */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">Risk Factors</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100"><Mail className="w-4 h-4" /></div>
                              <div>
                                  <p className="text-[13px] font-medium text-slate-900">Phishing</p>
                                  <p className="text-[11px] text-slate-500">Last failed: Sep 15</p>
                              </div>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Low Risk</span>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center border border-purple-100"><Smartphone className="w-4 h-4" /></div>
                              <div>
                                  <p className="text-[13px] font-medium text-slate-900">Devices</p>
                                  <p className="text-[11px] text-slate-500">OS updated</p>
                              </div>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">Safe</span>
                      </div>
                      <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center border border-amber-100"><Lock className="w-4 h-4" /></div>
                              <div>
                                  <p className="text-[13px] font-medium text-slate-900">Passwords</p>
                                  <p className="text-[11px] text-slate-500">Last changed: 3mo ago</p>
                              </div>
                          </div>
                          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-100">Review</span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Middle Column: Tasks */}
          <div className="col-span-12 lg:col-span-5 space-y-6 animate-slide-up" style={{animationDelay: '100ms'}}>
              <div className="flex items-center justify-between">
                 <h2 className="text-lg font-bold text-slate-900 tracking-tight">Action Items</h2>
                 <span className="text-[11px] font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">{pendingCount} Pending</span>
              </div>

              <div className="space-y-3">
                {tasks.filter(t => t.status === 'Pending').map(task => (
                    <div key={task.id} className="group flex items-start gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="mt-1 shrink-0">
                            <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-500 group-hover:text-blue-600 flex items-center justify-center transition-colors bg-slate-50 group-hover:bg-white">
                                <Play className="w-3 h-3 ml-0.5 fill-current opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-[14px] font-bold text-slate-900">{task.title}</h4>
                                {task.priority === 'High' && (
                                    <span className="px-1.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-100 uppercase tracking-wide">Urgent</span>
                                )}
                            </div>
                            <p className="text-[13px] text-slate-500 leading-relaxed">{task.description}</p>
                            
                            <div className="flex items-center gap-3 mt-3">
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100 text-[11px] font-medium text-slate-600">
                                   <Clock className="w-3 h-3 text-slate-400" /> {task.duration}
                                </span>
                                <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100 text-[11px] font-medium text-slate-600">
                                   <BookOpen className="w-3 h-3 text-slate-400" /> {task.type}
                                </span>
                            </div>
                        </div>
                        <div className="self-center">
                            <button 
                                onClick={() => navigate(task.link)}
                                className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-[12px] font-bold group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"
                            >
                                Start
                            </button>
                        </div>
                    </div>
                ))}
              </div>

              {completedCount > 0 && (
                <div className="pt-4">
                    <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> Completed Recently
                    </h3>
                    <div className="space-y-2 opacity-75 hover:opacity-100 transition-opacity">
                        {tasks.filter(t => t.status === 'Completed').map(task => (
                            <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <span className="text-[13px] font-medium text-slate-600 line-through decoration-slate-300">{task.title}</span>
                                </div>
                                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">+50 XP</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}
          </div>

          {/* Right Column: History & Activity */}
          <div className="col-span-12 lg:col-span-3 space-y-6 animate-slide-up" style={{animationDelay: '200ms'}}>
             {/* Quick Tip */}
             <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 shadow-sm">
                 <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-amber-600" />
                    <h3 className="text-[12px] font-bold text-amber-900 uppercase tracking-wider">Daily Tip</h3>
                 </div>
                 <p className="text-[13px] text-amber-800 leading-relaxed">
                    Lock your screen <span className="font-bold font-mono bg-amber-100 px-1 rounded text-amber-900">Win + L</span> every time you leave your desk, even for a minute.
                 </p>
             </div>

             {/* History */}
             <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[320px]">
                 <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                         <History className="w-4 h-4 text-slate-500" />
                         <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">Sim History</h3>
                     </div>
                 </div>
                 <div className="divide-y divide-slate-100 flex-1 overflow-y-auto">
                     {simHistory.map(sim => (
                         <div key={sim.id} className="p-3 hover:bg-slate-50 transition-colors">
                             <div className="flex items-center justify-between mb-1">
                                 <p className="text-[13px] font-medium text-slate-900">{sim.title}</p>
                                 <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                                     sim.outcome === 'Failed' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                     sim.outcome === 'Reported' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                     'bg-slate-50 text-slate-600 border-slate-200'
                                 }`}>
                                     {sim.outcome}
                                 </span>
                             </div>
                             <p className="text-[11px] text-slate-500 flex items-center gap-2">
                                 <span>{sim.date}</span>
                                 <span className="w-0.5 h-0.5 bg-slate-300 rounded-full"></span>
                                 <span>{sim.type}</span>
                             </p>
                         </div>
                     ))}
                 </div>
                 <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
                     <button className="text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors">View All Activity</button>
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
