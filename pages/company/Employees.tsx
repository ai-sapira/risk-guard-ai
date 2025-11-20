
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Upload, 
  User, 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  TrendingUp, 
  Mail, 
  Building, 
  CreditCard, 
  Database
} from 'lucide-react';

// Mock Data
const employees = [
  { id: 1, name: "Sarah Connor", email: "sarah.c@acme.com", department: "Finance", role: "CFO", riskScore: 85, trend: "up", tags: ["High Value Approver", "ERP Admin"], lastSim: "Clicked" },
  { id: 2, name: "John Smith", email: "john.s@acme.com", department: "IT", role: "SysAdmin", riskScore: 92, trend: "stable", tags: ["Domain Admin"], lastSim: "Reported" },
  { id: 3, name: "Emily Chen", email: "emily.c@acme.com", department: "Sales", role: "Account Exec", riskScore: 45, trend: "down", tags: ["External Sender"], lastSim: "Clicked" },
  { id: 4, name: "Michael Wong", email: "michael.w@acme.com", department: "HR", role: "Director", riskScore: 78, trend: "up", tags: ["PII Access"], lastSim: "Ignored" },
  { id: 5, name: "David Miller", email: "david.m@acme.com", department: "Finance", role: "Controller", riskScore: 62, trend: "down", tags: ["SWIFT Access", "Wire Transfer"], lastSim: "Failed" },
  { id: 6, name: "Jessica Day", email: "jess.d@acme.com", department: "Marketing", role: "Associate", riskScore: 88, trend: "up", tags: [], lastSim: "Reported" },
  { id: 7, name: "Robert Fox", email: "rob.f@acme.com", department: "IT", role: "Helpdesk", riskScore: 95, trend: "stable", tags: ["Ticket Admin"], lastSim: "Reported" },
  { id: 8, name: "Lisa Wang", email: "lisa.w@acme.com", department: "Sales", role: "VP Sales", riskScore: 55, trend: "down", tags: ["Frequent Traveler"], lastSim: "Clicked" },
  { id: 9, name: "Tom Holland", email: "tom.h@acme.com", department: "Engineering", role: "DevOps", riskScore: 90, trend: "stable", tags: ["AWS Root"], lastSim: "Ignored" },
  { id: 10, name: "Karen Page", email: "karen.p@acme.com", department: "Legal", role: "Counsel", riskScore: 70, trend: "up", tags: ["Confidential"], lastSim: "Reported" },
  { id: 11, name: "Frank Castle", email: "frank.c@acme.com", department: "Security", role: "Guard", riskScore: 60, trend: "down", tags: [], lastSim: "Ignored" },
  { id: 12, name: "Matt Murdock", email: "matt.m@acme.com", department: "Legal", role: "Partner", riskScore: 82, trend: "up", tags: ["Sensitive Data"], lastSim: "Reported" },
];

const departments = [
    { name: "Finance", risk: "High", score: 58, users: 12 },
    { name: "Sales", risk: "Medium", score: 65, users: 24 },
    { name: "IT / Eng", risk: "Low", score: 91, users: 45 },
    { name: "HR", risk: "Medium", score: 72, users: 8 },
];

const Employees: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  return (
    <div className="min-h-full bg-dot-pattern pb-12 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">People & Culture</span>
               </div>
               <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Human Risk Directory</h1>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                    <Upload className="w-3.5 h-3.5" /> Import CSV
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md text-[13px] font-medium hover:bg-blue-700 transition-colors shadow-sm">
                    <Download className="w-3.5 h-3.5" /> Export Report
                </button>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8 space-y-8">
        
        {/* Risk Heatmap (Hotspots) */}
        <div className="grid grid-cols-4 gap-4 animate-stagger-1">
            {departments.map(dept => (
                <div key={dept.name} className="bg-white border border-slate-200 rounded-md p-4 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[13px] font-semibold text-slate-900">{dept.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${
                            dept.risk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                            dept.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-emerald-50 text-emerald-700 border-emerald-100'
                        }`}>{dept.risk} Risk</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{dept.score}</span>
                            <span className="text-[11px] text-slate-400 ml-1">/ 100</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <User className="w-3 h-3" /> {dept.users}
                        </div>
                    </div>
                    <div className="mt-3 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full rounded-full ${
                                dept.score < 60 ? 'bg-rose-500' : dept.score < 80 ? 'bg-amber-400' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${dept.score}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>

        {/* Employee Grid */}
        <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm animate-stagger-2">
            {/* Toolbar */}
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Search employees..." 
                            className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
                        />
                    </div>
                    <button className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600">
                        <Filter className="w-3.5 h-3.5" />
                    </button>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">1,240 Employees Total</span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-50/50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0">
                <div className="col-span-4">Employee</div>
                <div className="col-span-2">Role & Dept</div>
                <div className="col-span-3">Context Tags (ERP/CRM)</div>
                <div className="col-span-2">Risk Score</div>
                <div className="col-span-1 text-right">Last Sim</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
                {employees.map((emp, i) => (
                    <div 
                        key={emp.id} 
                        onClick={() => setSelectedEmployee(emp)}
                        className="grid grid-cols-12 px-4 py-3 hover:bg-sky-50/30 transition-colors cursor-pointer group items-center animate-enter"
                        style={{ animationDelay: `${i * 30}ms` }}
                    >
                        <div className="col-span-4 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                                {emp.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-[13px] font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{emp.name}</p>
                                <p className="text-[11px] text-slate-500">{emp.email}</p>
                            </div>
                        </div>
                        
                        <div className="col-span-2">
                            <p className="text-[13px] text-slate-700 font-medium">{emp.role}</p>
                            <p className="text-[11px] text-slate-500">{emp.department}</p>
                        </div>

                        <div className="col-span-3 flex flex-wrap gap-1.5">
                            {emp.tags.length > 0 ? emp.tags.map(tag => (
                                <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-medium text-slate-600">
                                    {tag}
                                </span>
                            )) : <span className="text-[11px] text-slate-400 italic">No external tags</span>}
                        </div>

                        <div className="col-span-2 flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${
                                        emp.riskScore < 60 ? 'bg-rose-500' : emp.riskScore < 80 ? 'bg-amber-400' : 'bg-emerald-500'
                                    }`} 
                                    style={{ width: `${emp.riskScore}%` }}
                                ></div>
                            </div>
                            <span className="text-[13px] font-medium text-slate-700 tabular-nums">{emp.riskScore}</span>
                        </div>

                        <div className="col-span-1 flex justify-end">
                            <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded border ${
                                emp.lastSim === 'Clicked' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                emp.lastSim === 'Reported' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                'bg-slate-50 text-slate-600 border-slate-200'
                            }`}>
                                {emp.lastSim}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Slide-Over Detail Drawer */}
      {selectedEmployee && createPortal(
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedEmployee(null)} />
            <div className="relative w-[400px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col">
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-200 bg-slate-50/50">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-lg font-bold text-slate-700 shadow-sm">
                            {selectedEmployee.name.substring(0, 2).toUpperCase()}
                        </div>
                        <button onClick={() => setSelectedEmployee(null)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{selectedEmployee.name}</h2>
                    <p className="text-sm text-slate-500">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Risk Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border border-slate-200 rounded-md bg-white">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase">Risk Score</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl font-bold text-slate-900">{selectedEmployee.riskScore}</span>
                                {selectedEmployee.riskScore > 80 ? (
                                    <span className="text-[11px] text-emerald-600 font-medium mb-1">Safe</span>
                                ) : (
                                    <span className="text-[11px] text-rose-600 font-medium mb-1">Critical</span>
                                )}
                            </div>
                        </div>
                        <div className="p-3 border border-slate-200 rounded-md bg-white">
                            <span className="text-[11px] font-semibold text-slate-500 uppercase">Simulations</span>
                            <div className="flex items-end gap-2 mt-1">
                                <span className="text-2xl font-bold text-slate-900">12</span>
                                <span className="text-[11px] text-slate-500 mb-1">All time</span>
                            </div>
                        </div>
                    </div>

                    {/* Context Tags */}
                    <div>
                        <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Database className="w-3.5 h-3.5 text-blue-500" /> ERP/Business Context
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedEmployee.tags.length > 0 ? selectedEmployee.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-[11px] font-medium rounded border border-blue-100 flex items-center gap-1.5">
                                    {tag.includes("Approver") || tag.includes("Transfer") ? <CreditCard className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                    {tag}
                                </span>
                            )) : <p className="text-sm text-slate-400">No context data integrated.</p>}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-slate-400" /> Activity Log
                        </h3>
                        <div className="space-y-4 relative pl-2 border-l border-slate-200 ml-1.5">
                            <div className="pl-4 relative">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white ring-1 ring-slate-200"></div>
                                <p className="text-[13px] font-medium text-slate-900">Clicked on Link</p>
                                <p className="text-[11px] text-slate-500">"Q3 Invoice Fraud" Campaign • 2 days ago</p>
                            </div>
                            <div className="pl-4 relative">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-1 ring-slate-200"></div>
                                <p className="text-[13px] font-medium text-slate-900">Assigned Training</p>
                                <p className="text-[11px] text-slate-500">"Phishing Fundamentals 101" • 2 days ago</p>
                            </div>
                            <div className="pl-4 relative">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-slate-200"></div>
                                <p className="text-[13px] font-medium text-slate-900">Reported Email</p>
                                <p className="text-[11px] text-slate-500">"CEO Gift Card" Lure • 1 month ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200 bg-slate-50">
                    <button className="w-full py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-[13px] font-medium rounded shadow-sm transition-all">
                        View Full Profile
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Employees;
