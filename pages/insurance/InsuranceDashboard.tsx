import React from 'react';
import { 
  TrendingUp, 
  MoreHorizontal,
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  LayoutList,
  SlidersHorizontal
} from 'lucide-react';
import { Company } from '../../types';

const mockCompanies: Company[] = [
  { id: '1', name: 'Acme Corp', sector: 'Manufacturing', riskScore: 45, employees: 1200, status: 'Active', trend: 'down' },
  { id: '2', name: 'TechFlow Inc', sector: 'Technology', riskScore: 88, employees: 450, status: 'Active', trend: 'up' },
  { id: '3', name: 'Global Logistics', sector: 'Transport', riskScore: 62, employees: 3200, status: 'Onboarding', trend: 'stable' },
  { id: '4', name: 'MediCare Plus', sector: 'Healthcare', riskScore: 35, employees: 800, status: 'Active', trend: 'down' },
  { id: '5', name: 'FinServe Ltd', sector: 'Finance', riskScore: 72, employees: 150, status: 'Active', trend: 'up' },
  { id: '6', name: 'OmniRetail', sector: 'Retail', riskScore: 55, employees: 2100, status: 'Active', trend: 'down' },
  { id: '7', name: 'CyberDyne', sector: 'Defense', riskScore: 92, employees: 5000, status: 'Active', trend: 'up' },
];

const MetricBox = ({ label, value, trend, trendValue }: { label: string, value: string, trend: 'up' | 'down' | 'neutral', trendValue: string }) => (
  <div className="bg-white border border-slate-200 rounded-md p-4 flex flex-col justify-between h-28 hover:border-blue-300 transition-colors cursor-default">
    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    <div>
       <span className="text-2xl font-semibold text-slate-900 tracking-tight tabular-nums">{value}</span>
       <div className="flex items-center gap-1.5 mt-1">
          {trend === 'up' ? (
             <ArrowUpRight className="w-3 h-3 text-emerald-600" />
          ) : (
             <ArrowDownRight className="w-3 h-3 text-rose-600" />
          )}
          <span className={`text-[11px] font-medium tabular-nums ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>{trendValue}</span>
          <span className="text-[11px] text-slate-400">vs last month</span>
       </div>
    </div>
  </div>
);

const InsuranceDashboard: React.FC = () => {
  return (
    <div className="min-h-full bg-slate-50/50">
      {/* Header Actions */}
      <div className="px-6 py-5 border-b border-slate-200 bg-white sticky top-0 z-10">
         <div className="flex items-center justify-between mb-6">
            <div>
               <h1 className="text-lg font-semibold text-slate-900 tracking-tight">Portfolio Overview</h1>
               <p className="text-[13px] text-slate-500 mt-0.5">Manage risk across 124 active companies.</p>
            </div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                  Export
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-md text-[13px] font-medium hover:bg-slate-800 shadow-sm transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Add Company
               </button>
            </div>
         </div>

         {/* Metrics Grid */}
         <div className="grid grid-cols-4 gap-4">
            <MetricBox label="Portfolio Risk Score" value="68.4" trend="up" trendValue="+2.1" />
            <MetricBox label="Active Companies" value="124" trend="up" trendValue="+4" />
            <MetricBox label="Campaigns (30d)" value="342" trend="up" trendValue="+12%" />
            <MetricBox label="Critical Alerts" value="12" trend="down" trendValue="-2" />
         </div>
      </div>

      {/* Filters & Data Grid */}
      <div className="p-6">
         {/* Filter Bar */}
         <div className="flex items-center gap-2 mb-4">
            <div className="relative">
               <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
               <input 
                  type="text" 
                  placeholder="Filter companies..." 
                  className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] w-64 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-700 focus:border-blue-500"
               />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
               <Filter className="w-3.5 h-3.5" />
               Sector
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors">
               <LayoutList className="w-3.5 h-3.5" />
               Status
            </button>
            <div className="flex-1"></div>
            <button className="p-1.5 text-slate-400 hover:text-slate-600">
               <SlidersHorizontal className="w-4 h-4" />
            </button>
         </div>

         {/* Data Grid Container */}
         <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-12 px-4 py-2 bg-slate-50/50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
               <div className="col-span-4 flex items-center">Company Name</div>
               <div className="col-span-2 flex items-center">Sector</div>
               <div className="col-span-2 flex items-center">Risk Score</div>
               <div className="col-span-2 flex items-center">Employees</div>
               <div className="col-span-2 flex items-center justify-end">Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
               {mockCompanies.map((company, i) => (
                  <div 
                     key={company.id} 
                     className="grid grid-cols-12 px-4 py-2.5 hover:bg-sky-50/30 transition-colors group cursor-pointer items-center"
                     style={{ animationDelay: `${i * 50}ms` }}
                  >
                     <div className="col-span-4 flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-600 tracking-tight group-hover:border-blue-200 group-hover:text-blue-600 group-hover:bg-white transition-colors">
                           {company.name.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-[13px] font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{company.name}</span>
                     </div>
                     
                     <div className="col-span-2">
                        <span className="text-[13px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 inline-block">
                           {company.sector}
                        </span>
                     </div>
                     
                     <div className="col-span-2 flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                           <div 
                              className={`h-full rounded-full ${
                                 company.riskScore > 80 ? 'bg-emerald-500' : 
                                 company.riskScore > 50 ? 'bg-amber-400' : 'bg-rose-500'
                              }`} 
                              style={{ width: `${company.riskScore}%` }}
                           ></div>
                        </div>
                        <span className="text-[13px] font-medium text-slate-700 tabular-nums">{company.riskScore}</span>
                     </div>
                     
                     <div className="col-span-2 text-[13px] text-slate-600 tabular-nums">
                        {company.employees.toLocaleString()}
                     </div>
                     
                     <div className="col-span-2 flex items-center justify-end">
                        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${
                           company.status === 'Active' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                           <span className={`w-1.5 h-1.5 rounded-full ${
                              company.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                           }`}></span>
                           {company.status}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="px-4 py-2 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-[11px] text-slate-500 font-medium">
               <span>Showing 7 of 124</span>
               <div className="flex gap-2">
                  <button className="hover:text-slate-900 transition-colors">Previous</button>
                  <button className="hover:text-slate-900 transition-colors">Next</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;