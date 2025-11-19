
import React, { useState } from 'react';
import { 
  Download, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  BarChart3, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  Printer
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

// Mock Data
const riskTrendData = [
  { date: 'Jan', score: 62 },
  { date: 'Feb', score: 65 },
  { date: 'Mar', score: 64 },
  { date: 'Apr', score: 70 },
  { date: 'May', score: 75 },
  { date: 'Jun', score: 78 },
];

const deptData = [
  { name: 'Finance', risk: 58, training: 92 },
  { name: 'Sales', risk: 65, training: 78 },
  { name: 'IT', risk: 91, training: 98 },
  { name: 'HR', risk: 72, training: 85 },
  { name: 'Legal', risk: 80, training: 95 },
];

const StatCard = ({ label, value, trend, trendValue, icon: Icon }: any) => (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:border-blue-300 transition-colors group">
       <div className="flex justify-between items-start">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
          <div className="p-1.5 bg-slate-50 rounded-md border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
             <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
          </div>
       </div>
       <div className="mt-4">
          <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</span>
          <div className="flex items-center gap-1.5 mt-1">
             {trend === 'up' ? (
                <ArrowUpRight className="w-3 h-3 text-emerald-600" />
             ) : (
                <ArrowDownRight className="w-3 h-3 text-rose-600" />
             )}
             <span className={`text-[11px] font-medium tabular-nums ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trendValue}
             </span>
             <span className="text-[11px] text-slate-400">vs last period</span>
          </div>
       </div>
    </div>
);

const Reports: React.FC = () => {
  const [reportConfig, setReportConfig] = useState({
     execSummary: true,
     riskMatrix: true,
     campaigns: true,
     training: true
  });

  return (
    <div className="min-h-full bg-dot-pattern pb-12">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10 shadow-sm">
         <div className="max-w-6xl mx-auto flex items-center justify-between">
             <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Intelligence</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Analytics & Reporting</h1>
             </div>
             <div className="flex gap-3">
                 <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                     <Calendar className="w-3.5 h-3.5" /> Last 30 Days
                 </button>
                 <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-[13px] font-medium hover:bg-blue-700 transition-colors shadow-sm">
                     <Download className="w-3.5 h-3.5" /> Export PDF
                 </button>
             </div>
         </div>
       </div>

       <div className="max-w-6xl mx-auto px-8 mt-8 space-y-8">
          {/* Executive KPIs */}
          <div className="grid grid-cols-4 gap-6">
             <StatCard label="Overall Risk Score" value="78/100" trend="up" trendValue="+3.2" icon={TrendingUp} />
             <StatCard label="Phishing Prone %" value="4.2%" trend="down" trendValue="-1.5%" icon={AlertTriangle} />
             <StatCard label="Reporting Rate" value="68%" trend="up" trendValue="+5%" icon={FileText} />
             <StatCard label="Training Adherence" value="94%" trend="up" trendValue="+2%" icon={BarChart3} />
          </div>

          <div className="grid grid-cols-3 gap-6">
             {/* Risk Trend Chart */}
             <div className="col-span-2 bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Risk Score Evolution</h3>
                   <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Score</span>
                   </div>
                </div>
                <div className="h-64 w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskTrendData}>
                         <defs>
                            <linearGradient id="colorRiskReport" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                               <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                         <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                         <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} domain={[0, 100]} />
                         <RechartsTooltip 
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                            itemStyle={{ fontSize: '12px', fontWeight: 500, color: '#1e293b' }}
                         />
                         <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRiskReport)" />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
             </div>

             {/* Department Breakdown */}
             <div className="col-span-1 bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-6">Dept. Performance</h3>
                <div className="space-y-5">
                   {deptData.map(d => (
                      <div key={d.name}>
                         <div className="flex justify-between text-[12px] font-medium text-slate-600 mb-1">
                            <span>{d.name}</span>
                            <span className={d.risk < 70 ? "text-rose-500" : "text-emerald-600"}>{d.risk} Score</span>
                         </div>
                         <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                             <div className={`h-full rounded-full ${d.risk < 70 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${d.risk}%` }}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Report Generator Section */}
          <div className="mt-12 pt-8 border-t border-slate-200">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-lg font-semibold text-slate-900">Report Generator</h2>
                   <p className="text-[13px] text-slate-500 mt-1">Create and preview compliant audit reports for stakeholders.</p>
                </div>
             </div>

             <div className="grid grid-cols-12 gap-8">
                {/* Controls */}
                <div className="col-span-4 space-y-6">
                   <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4">Content Configuration</h3>
                      
                      <div className="space-y-3">
                         {['Executive Summary', 'Risk Matrix', 'Campaign Performance', 'Training Data'].map((item, i) => {
                             const keys = ['execSummary', 'riskMatrix', 'campaigns', 'training'] as const;
                             const key = keys[i];
                             return (
                                 <label key={key} className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${reportConfig[key] ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-300'}`}>
                                       <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <input type="checkbox" className="hidden" checked={reportConfig[key]} onChange={() => setReportConfig(prev => ({...prev, [key]: !prev[key]}))} />
                                    <span className="text-[13px] font-medium text-slate-700">{item}</span>
                                 </label>
                             )
                         })}
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                         <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm">
                            <Download className="w-4 h-4" /> Download PDF
                         </button>
                         <button className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 py-2.5 rounded-md text-[13px] font-medium hover:bg-slate-50 transition-colors">
                            <Printer className="w-4 h-4" /> Print Preview
                         </button>
                      </div>
                   </div>
                </div>

                {/* Live Preview (A4) */}
                <div className="col-span-8 bg-slate-100 rounded-xl p-8 overflow-hidden flex justify-center border border-slate-200">
                   <div className="bg-white w-[595px] min-h-[842px] shadow-xl p-12 flex flex-col relative origin-top transform scale-[0.9]">
                      
                      {/* Header */}
                      <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-8">
                         <div>
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Security Audit Report</h1>
                            <p className="text-sm text-slate-500 mt-2 font-medium">Q3 2023 Human Risk Assessment</p>
                         </div>
                         <div className="text-right">
                            <div className="flex items-center gap-2 justify-end mb-1">
                               <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                               <span className="font-bold text-slate-900">RiskGuard</span>
                            </div>
                            <p className="text-xs text-slate-400">Confidential & Proprietary</p>
                         </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 space-y-8">
                         {reportConfig.execSummary && (
                            <div className="space-y-3">
                               <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">1. Executive Summary</h2>
                               <p className="text-xs text-slate-600 leading-relaxed text-justify font-serif">
                                  During the Q3 period, the organization demonstrated a <strong>3.2% improvement</strong> in overall risk scoring, 
                                  driven largely by increased reporting rates in the Finance department. However, simulation failure rates 
                                  remain elevated in remote-working segments.
                               </p>
                               <div className="grid grid-cols-3 gap-4 mt-4">
                                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold">Current Score</p>
                                     <p className="text-xl font-bold text-emerald-600">78/100</p>
                                  </div>
                                  <div className="bg-slate-50 p-3 rounded border border-slate-100 text-center">
                                     <p className="text-[10px] text-slate-500 uppercase font-bold">Incidents</p>
                                     <p className="text-xl font-bold text-slate-900">0</p>
                                  </div>
                               </div>
                            </div>
                         )}

                         {reportConfig.riskMatrix && (
                            <div className="space-y-3">
                               <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-1">2. Risk Matrix</h2>
                               <div className="border border-slate-200 rounded overflow-hidden">
                                  <table className="w-full text-xs text-left">
                                     <thead className="bg-slate-50 text-slate-500 font-bold">
                                        <tr>
                                           <th className="p-2 border-r border-slate-200">Department</th>
                                           <th className="p-2 border-r border-slate-200">Risk Level</th>
                                           <th className="p-2">Trend</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-100">
                                        <tr>
                                           <td className="p-2 border-r border-slate-200 font-medium">Finance</td>
                                           <td className="p-2 border-r border-slate-200 text-rose-600 font-bold">High</td>
                                           <td className="p-2 text-emerald-600">Improving</td>
                                        </tr>
                                        <tr>
                                           <td className="p-2 border-r border-slate-200 font-medium">IT Operations</td>
                                           <td className="p-2 border-r border-slate-200 text-emerald-600 font-bold">Low</td>
                                           <td className="p-2 text-slate-500">Stable</td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                         )}
                         {reportConfig.campaigns && (
                             <div className="p-6 border border-dashed border-slate-300 rounded bg-slate-50 text-center text-slate-400 text-xs">
                                 [Campaign Performance Data Visualization]
                             </div>
                         )}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-6 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                         <span>Generated via RiskGuard AI Platform</span>
                         <span>Page 1 of 4</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Reports;
