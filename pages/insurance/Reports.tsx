
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Filter, 
  PieChart, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  ChevronDown, 
  Layers,
  BarChart3,
  ScatterChart as ScatterIcon,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';

// --- Mock Data ---

const scatterData = [
  { x: 10, y: 20, z: 200, name: 'Acme Corp' },
  { x: 12, y: 10, z: 260, name: 'TechFlow' },
  { x: 17, y: 30, z: 400, name: 'Global Log' },
  { x: 14, y: 25, z: 280, name: 'MediCare' },
  { x: 15, y: 40, z: 500, name: 'FinServe' },
  { x: 11, y: 18, z: 190, name: 'OmniRetail' },
  { x: 16, y: 55, z: 600, name: 'CyberDyne' },
  { x: 13, y: 22, z: 300, name: 'BlueSky' },
];

const vulnerabilityMatrix = [
  { sector: 'Finance', ransomware: 65, phishing: 45, bec: 82, social: 30 },
  { sector: 'Healthcare', ransomware: 88, phishing: 62, bec: 40, social: 75 },
  { sector: 'Manuf.', ransomware: 72, phishing: 35, bec: 68, social: 20 },
  { sector: 'Retail', ransomware: 40, phishing: 78, bec: 35, social: 55 },
  { sector: 'Tech', ransomware: 25, phishing: 30, bec: 45, social: 85 },
];

const executiveSummary = {
  portfolioScore: 68.4,
  trend: "+2.1%",
  criticalClients: 14,
  topRiskSector: "Healthcare",
  trainingCompletion: "84%"
};

// --- Components ---

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'board-pack' | 'analytics'>('board-pack');
  const [config, setConfig] = useState({
    summary: true,
    heatmap: true,
    impact: true,
    recommendations: true
  });

  // 1. Board Pack Generator (A4 Preview)
  const renderBoardPack = () => (
    <div className="grid grid-cols-12 gap-8 animate-enter">
       {/* Configuration Sidebar */}
       <div className="col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-4">
                <Layers className="w-4 h-4 text-blue-600" />
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Report Structure</h3>
             </div>
             
             <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                   <span className="text-[13px] font-medium text-slate-700">1. Executive Summary</span>
                   <input type="checkbox" checked={config.summary} onChange={() => setConfig({...config, summary: !config.summary})} className="rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                   <span className="text-[13px] font-medium text-slate-700">2. Sector Heatmap</span>
                   <input type="checkbox" checked={config.heatmap} onChange={() => setConfig({...config, heatmap: !config.heatmap})} className="rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                   <span className="text-[13px] font-medium text-slate-700">3. Impact Analysis (ROI)</span>
                   <input type="checkbox" checked={config.impact} onChange={() => setConfig({...config, impact: !config.impact})} className="rounded text-blue-600 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 transition-colors">
                   <span className="text-[13px] font-medium text-slate-700">4. Recommendations</span>
                   <input type="checkbox" checked={config.recommendations} onChange={() => setConfig({...config, recommendations: !config.recommendations})} className="rounded text-blue-600 focus:ring-blue-500" />
                </label>
             </div>

             <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm">
                   <Download className="w-4 h-4" /> Generate PDF Pack
                </button>
                <div className="text-center">
                   <span className="text-[10px] text-slate-400">For Risk Committee meeting (Oct 24)</span>
                </div>
             </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
             <h4 className="text-[12px] font-bold text-blue-900 uppercase tracking-wider mb-2">AI Insight</h4>
             <p className="text-[12px] text-blue-800 leading-relaxed">
                "Including the <strong>Impact Analysis</strong> section increases stakeholder confidence by 24% based on previous board meetings."
             </p>
          </div>
       </div>

       {/* Live Preview Area */}
       <div className="col-span-8 bg-slate-200/50 rounded-xl p-8 overflow-hidden border border-slate-300/50 flex justify-center shadow-inner">
          <div className="bg-white w-[595px] min-h-[842px] shadow-2xl p-10 flex flex-col relative origin-top transform scale-[0.85] hover:scale-[0.9] transition-transform duration-500 ease-out-expo">
             
             {/* Report Header */}
             <div className="flex justify-between items-start border-b-2 border-blue-600 pb-6 mb-8">
                <div>
                   <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Portfolio Risk Report</h1>
                   <p className="text-[11px] text-slate-500 mt-1 font-medium uppercase tracking-widest">Confidential • Risk Committee</p>
                </div>
                <div className="text-right">
                   <div className="flex items-center gap-2 justify-end mb-1">
                      <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                      <span className="font-bold text-slate-900 text-sm">RiskGuard Intelligence</span>
                   </div>
                   <p className="text-[10px] text-slate-400">October 2023</p>
                </div>
             </div>

             <div className="flex-1 space-y-8">
                {/* Section 1: Exec Summary */}
                {config.summary && (
                   <div>
                      <h2 className="text-[13px] font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">1. Executive Summary</h2>
                      <div className="bg-slate-50 p-4 rounded border border-slate-100 mb-4">
                         <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-bold">Portfolio Avg</p>
                               <p className="text-xl font-bold text-blue-600">{executiveSummary.portfolioScore}</p>
                            </div>
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-bold">QoQ Trend</p>
                               <p className="text-xl font-bold text-emerald-600">{executiveSummary.trend}</p>
                            </div>
                            <div>
                               <p className="text-[10px] text-slate-500 uppercase font-bold">Critical Clients</p>
                               <p className="text-xl font-bold text-rose-600">{executiveSummary.criticalClients}</p>
                            </div>
                         </div>
                      </div>
                      <p className="text-[11px] text-slate-600 text-justify leading-relaxed font-serif">
                         The overall portfolio health has improved slightly this quarter, driven by strong adoption of MFA protocols in the Tech sector. 
                         However, <strong>Healthcare</strong> remains a critical vulnerability point, specifically regarding ransomware preparedness.
                      </p>
                   </div>
                )}

                {/* Section 2: Heatmap */}
                {config.heatmap && (
                   <div>
                      <h2 className="text-[13px] font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">2. Sector Vulnerability Matrix</h2>
                      <div className="border border-slate-200 rounded overflow-hidden">
                         <table className="w-full text-[10px] text-left">
                            <thead className="bg-slate-50 font-bold text-slate-600">
                               <tr>
                                  <th className="p-2">Sector</th>
                                  <th className="p-2">Ransomware</th>
                                  <th className="p-2">BEC</th>
                                  <th className="p-2">Phishing</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {vulnerabilityMatrix.slice(0, 4).map(row => (
                                  <tr key={row.sector}>
                                     <td className="p-2 font-bold text-slate-700">{row.sector}</td>
                                     <td className="p-2"><span className={`px-1.5 py-0.5 rounded ${row.ransomware > 60 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{row.ransomware}</span></td>
                                     <td className="p-2"><span className={`px-1.5 py-0.5 rounded ${row.bec > 60 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{row.bec}</span></td>
                                     <td className="p-2"><span className={`px-1.5 py-0.5 rounded ${row.phishing > 60 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>{row.phishing}</span></td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>
                )}

                {/* Section 3: Recommendations */}
                {config.recommendations && (
                   <div>
                      <h2 className="text-[13px] font-bold text-slate-900 border-b border-slate-100 pb-1 mb-3">4. Strategic Recommendations</h2>
                      <ul className="space-y-2">
                         <li className="flex items-start gap-2 text-[11px] text-slate-700 font-serif">
                            <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                            <span>Initiate mandatory Ransomware simulations for all clients in the Healthcare sector (&gt;500 employees).</span>
                         </li>
                         <li className="flex items-start gap-2 text-[11px] text-slate-700 font-serif">
                            <div className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 shrink-0"></div>
                            <span>Review premium discounts for Tech clients maintaining a Risk Score &gt; 85 for 3 consecutive quarters.</span>
                         </li>
                      </ul>
                   </div>
                )}
             </div>

             {/* Report Footer */}
             <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center text-[9px] text-slate-400">
                <span>Generated by RiskGuard Automated Reporting</span>
                <span>Confidential - Do Not Distribute</span>
             </div>
          </div>
       </div>
    </div>
  );

  // 2. Deep Analytics View
  const renderAnalytics = () => (
    <div className="space-y-8 animate-enter">
       
       <div className="grid grid-cols-2 gap-6">
          {/* Impact Analysis (Scatter) */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <ScatterIcon className="w-4 h-4 text-blue-600" /> Impact Correlation
                   </h3>
                   <p className="text-[11px] text-slate-500 mt-1">Does training actually reduce risk? (Training vs Risk Score)</p>
                </div>
             </div>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis type="number" dataKey="x" name="Training Volume" unit="hrs" tick={{fontSize: 11, fill: '#64748b'}} />
                      <YAxis type="number" dataKey="y" name="Risk Reduction" unit="%" tick={{fontSize: 11, fill: '#64748b'}} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                      <Scatter name="Clients" data={scatterData} fill="#3b82f6">
                         {scatterData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.y > 40 ? '#10b981' : '#3b82f6'} />
                         ))}
                      </Scatter>
                   </ScatterChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded text-[11px] text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span><strong>Positive Correlation:</strong> Clients with &gt;15hrs training show 40%+ risk reduction.</span>
             </div>
          </div>

          {/* Deep Vulnerability Matrix */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-blue-600" /> Deep Vulnerability Map
                   </h3>
                   <p className="text-[11px] text-slate-500 mt-1">Aggregated failure rates by attack vector</p>
                </div>
             </div>
             <div className="space-y-1">
                <div className="grid grid-cols-5 text-[10px] font-bold text-slate-400 uppercase pb-2 border-b border-slate-100 text-center">
                   <div className="text-left">Sector</div>
                   <div>Ransomware</div>
                   <div>Phishing</div>
                   <div>BEC</div>
                   <div>Social Eng.</div>
                </div>
                {vulnerabilityMatrix.map((row) => (
                   <div key={row.sector} className="grid grid-cols-5 items-center py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors text-center">
                      <div className="text-left text-[12px] font-bold text-slate-700">{row.sector}</div>
                      <div>
                         <div className={`w-10 h-6 mx-auto rounded flex items-center justify-center text-[11px] font-bold ${
                            row.ransomware > 70 ? 'bg-rose-500 text-white' : row.ransomware > 40 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                         }`}>
                            {row.ransomware}%
                         </div>
                      </div>
                      <div>
                         <div className={`w-10 h-6 mx-auto rounded flex items-center justify-center text-[11px] font-bold ${
                            row.phishing > 70 ? 'bg-rose-500 text-white' : row.phishing > 40 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                         }`}>
                            {row.phishing}%
                         </div>
                      </div>
                      <div>
                         <div className={`w-10 h-6 mx-auto rounded flex items-center justify-center text-[11px] font-bold ${
                            row.bec > 70 ? 'bg-rose-500 text-white' : row.bec > 40 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                         }`}>
                            {row.bec}%
                         </div>
                      </div>
                      <div>
                         <div className={`w-10 h-6 mx-auto rounded flex items-center justify-center text-[11px] font-bold ${
                            row.social > 70 ? 'bg-rose-500 text-white' : row.social > 40 ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'
                         }`}>
                            {row.social}%
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-full bg-dot-pattern pb-12 relative">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Executive Intelligence</span>
                   </div>
                   <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Risk Committee Reports</h1>
                </div>
             </div>

             {/* Navigation Tabs */}
             <div className="flex gap-8 border-b border-slate-100">
                 <button 
                    onClick={() => setActiveTab('board-pack')}
                    className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 -mb-[1px] ${
                       activeTab === 'board-pack' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                    }`}
                 >
                    <FileText className="w-4 h-4" /> Board Pack Generator
                 </button>
                 <button 
                    onClick={() => setActiveTab('analytics')}
                    className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 -mb-[1px] ${
                       activeTab === 'analytics' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                    }`}
                 >
                    <BarChart3 className="w-4 h-4" /> Deep Portfolio Analytics
                 </button>
             </div>
          </div>
       </div>

       <div className="max-w-6xl mx-auto px-8 mt-8">
          {activeTab === 'board-pack' && renderBoardPack()}
          {activeTab === 'analytics' && renderAnalytics()}
       </div>
    </div>
  );
};

export default Reports;
