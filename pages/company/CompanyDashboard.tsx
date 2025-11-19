
import React from 'react';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  CheckCircle2,
  Zap,
  ChevronRight,
  Download,
  Target,
  Terminal
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// --- Mock Data ---

const mainChartData = [
  { date: 'Oct 1', risk: 65, training: 20 },
  { date: 'Oct 5', risk: 68, training: 25 },
  { date: 'Oct 10', risk: 64, training: 40 },
  { date: 'Oct 15', risk: 72, training: 45 },
  { date: 'Oct 20', risk: 75, training: 60 },
  { date: 'Oct 25', risk: 78, training: 55 },
  { date: 'Oct 30', risk: 82, training: 70 },
];

const sparklineData1 = [
  { v: 40 }, { v: 35 }, { v: 50 }, { v: 45 }, { v: 60 }, { v: 55 }, { v: 75 }
];
const sparklineData2 = [
  { v: 20 }, { v: 25 }, { v: 15 }, { v: 30 }, { v: 20 }, { v: 10 }, { v: 5 }
];
const sparklineData3 = [
  { v: 60 }, { v: 65 }, { v: 70 }, { v: 75 }, { v: 80 }, { v: 85 }, { v: 92 }
];
const sparklineData4 = [
  { v: 40 }, { v: 42 }, { v: 45 }, { v: 48 }, { v: 50 }, { v: 52 }, { v: 55 }
];

const alerts = [
  { id: 'EVT-9921', type: 'Critical', msg: "CEO Fraud attempt detected in Finance", time: "10:42:23", source: "Email Gateway" },
  { id: 'EVT-9922', type: 'Warning', msg: "Training compliance dropped < 80%", time: "09:15:00", source: "Compliance Bot" },
  { id: 'EVT-9923', type: 'Info', msg: "New employee sync (12 users)", time: "08:30:11", source: "Azure AD" },
  { id: 'EVT-9924', type: 'Info', msg: "Campaign 'Q3 Phish' completed", time: "Yesterday", source: "Campaign Mgr" },
];

const departmentRisk = [
  { name: 'Finance', risk: 85, clickRate: 12.4 },
  { name: 'Sales', risk: 65, clickRate: 8.2 },
  { name: 'HR', risk: 45, clickRate: 4.1 },
  { name: 'IT', risk: 25, clickRate: 1.5 },
  { name: 'Legal', risk: 35, clickRate: 2.8 },
];

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-3 rounded-lg shadow-xl text-[11px]">
        <p className="font-bold text-slate-900 mb-1">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-slate-600">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="font-medium">{entry.name}:</span>
            <span className="font-bold tabular-nums">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const SparkLine = ({ data, color }: { data: any[], color: string }) => (
  <div className="h-10 w-24">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const KpiCard = ({ label, value, trend, trendVal, data, colorHex }: any) => (
  <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-300 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</span>
        </div>
      </div>
      <SparkLine data={data} color={colorHex} />
    </div>
    <div className="flex items-center gap-1.5 pt-3 border-t border-slate-50">
       {trend === 'up' ? <ArrowUpRight className="w-3 h-3 text-emerald-600" /> : <ArrowDownRight className="w-3 h-3 text-rose-600" />}
       <span className={`text-[11px] font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>{trendVal}</span>
       <span className="text-[11px] text-slate-400">vs last period</span>
    </div>
  </div>
);

const CompanyDashboard: React.FC = () => {
  return (
    <div className="min-h-full bg-dot-pattern pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10 shadow-sm">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Command Center</span>
                  <span className="text-[11px] text-slate-400 font-medium border border-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 font-mono">
                      Q3_2023.REPORT
                  </span>
               </div>
               <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Security Posture Overview</h1>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Download className="w-3.5 h-3.5" /> Export
               </button>
               <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-[13px] font-medium hover:bg-slate-800 transition-colors shadow-sm">
                  <Target className="w-3.5 h-3.5" /> Run Simulation
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8 space-y-8">
         
         {/* KPI Grid with Sparklines */}
         <div className="grid grid-cols-4 gap-6">
            <KpiCard 
              label="Human Risk Score" 
              value="78.4" 
              trend="up" 
              trendVal="+3.2" 
              data={sparklineData1} 
              colorHex="#10b981" 
            />
            <KpiCard 
              label="Phishing Rate" 
              value="4.2%" 
              trend="down" 
              trendVal="-1.5%" 
              data={sparklineData2} 
              colorHex="#f43f5e" 
            />
            <KpiCard 
              label="Training Coverage" 
              value="92%" 
              trend="up" 
              trendVal="+5.0%" 
              data={sparklineData3} 
              colorHex="#3b82f6" 
            />
            <KpiCard 
              label="Active Users" 
              value="1,240" 
              trend="up" 
              trendVal="+12" 
              data={sparklineData4} 
              colorHex="#64748b" 
            />
         </div>

         <div className="grid grid-cols-3 gap-6">
            {/* Main Chart: High Fidelity Gradient Area */}
            <div className="col-span-2 bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                   <div>
                       <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                           <TrendingUp className="w-4 h-4 text-blue-600" />
                           Risk Velocity & Training Impact
                       </h3>
                   </div>
                   <div className="flex items-center gap-4 text-[11px] font-medium">
                       <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                           <span className="text-slate-600">Risk Score</span>
                       </div>
                       <div className="flex items-center gap-2">
                           <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                           <span className="text-slate-600">Training Volume</span>
                       </div>
                   </div>
                </div>
                
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mainChartData}>
                            <defs>
                                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorTrain" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} domain={[0, 100]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="risk" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" name="Risk Score" />
                            <Area type="monotone" dataKey="training" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTrain)" name="Training" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Event Log */}
            <div className="col-span-1 bg-white border border-slate-200 rounded-lg p-0 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-slate-500" />
                        Live Event Log
                    </h3>
                    <div className="flex gap-1">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-0">
                    {alerts.map((alert, i) => (
                        <div key={alert.id} className={`p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group ${i === alerts.length - 1 ? 'border-0' : ''}`}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="font-mono text-[10px] text-slate-400">{alert.id}</span>
                                <span className="font-mono text-[10px] text-slate-400">{alert.time}</span>
                            </div>
                            <p className="text-[12px] font-medium text-slate-800 group-hover:text-blue-700 transition-colors mb-1">
                                {alert.msg}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    alert.type === 'Critical' ? 'bg-rose-500' :
                                    alert.type === 'Warning' ? 'bg-amber-500' : 'bg-blue-500'
                                }`}></span>
                                <span className="text-[10px] text-slate-500">{alert.source}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
                   <button className="text-[11px] font-medium text-slate-500 hover:text-slate-900">View Full Audit Log</button>
                </div>
            </div>
         </div>

         {/* Department Grid */}
         <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Departmental Risk Matrix</h3>
             </div>
             <div className="grid grid-cols-12 px-6 py-2 bg-slate-50/30 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                 <div className="col-span-4">Department</div>
                 <div className="col-span-3">Phishing Rate</div>
                 <div className="col-span-3">Risk Score</div>
                 <div className="col-span-2 text-right">Status</div>
             </div>
             <div className="divide-y divide-slate-100">
                 {departmentRisk.map((dept) => (
                     <div key={dept.name} className="grid grid-cols-12 px-6 py-3 items-center hover:bg-slate-50 transition-colors">
                         <div className="col-span-4 font-medium text-[13px] text-slate-900">{dept.name}</div>
                         <div className="col-span-3 text-[13px] text-slate-600 tabular-nums">{dept.clickRate}%</div>
                         <div className="col-span-3">
                             <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                 <div 
                                    className={`h-full rounded-full ${
                                        dept.risk > 70 ? 'bg-emerald-500' : dept.risk > 40 ? 'bg-amber-400' : 'bg-rose-500'
                                    }`} 
                                    style={{ width: `${dept.risk}%` }}
                                 ></div>
                             </div>
                         </div>
                         <div className="col-span-2 text-right">
                             <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                                 dept.risk > 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                 dept.risk > 40 ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                 'bg-rose-50 text-rose-700 border-rose-100'
                             }`}>
                                 {dept.risk > 70 ? 'Safe' : dept.risk > 40 ? 'Monitor' : 'Critical'}
                             </span>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
