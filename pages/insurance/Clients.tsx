
import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { 
  Search, 
  Filter, 
  Building2, 
  ShieldAlert, 
  Users, 
  Calendar,
  CreditCard,
  X,
  Briefcase,
  AlertTriangle,
  Activity,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { 
  LineChart, 
  Line,
  ResponsiveContainer
} from 'recharts';

// --- Types ---

interface ClientCompany {
  id: string;
  name: string;
  domain: string;
  logo: string;
  sector: string;
  riskScore: number;
  employees: number;
  status: 'Active' | 'Onboarding' | 'Inactive';
  trend: 'up' | 'down' | 'stable';
  history: number[];
  renewal: string;
  premium: number;
  contact: string;
}

// --- Mock Data (Spanish Mid-Market/Tech) ---

const initialCompanies: ClientCompany[] = [
  { id: '1', name: 'Cabify', domain: 'cabify.com', logo: 'https://logo.clearbit.com/cabify.com', sector: 'Mobility', riskScore: 92, employees: 1200, status: 'Active', trend: 'up', history: [88, 89, 90, 91, 91, 92], renewal: 'Aug 2025', premium: 180000, contact: 'Security Ops' },
  { id: '2', name: 'Factorial', domain: 'factorialhr.com', logo: 'https://logo.clearbit.com/factorialhr.com', sector: 'HR Tech', riskScore: 88, employees: 850, status: 'Active', trend: 'stable', history: [88, 88, 87, 88, 88, 88], renewal: 'Jan 2025', premium: 95000, contact: 'Jordi R.' },
  { id: '3', name: 'Wallapop', domain: 'wallapop.com', logo: 'https://logo.clearbit.com/wallapop.com', sector: 'Marketplace', riskScore: 74, employees: 350, status: 'Active', trend: 'up', history: [68, 70, 71, 72, 73, 74], renewal: 'Mar 2025', premium: 62000, contact: 'Platform Sec' },
  { id: '4', name: 'Holaluz', domain: 'holaluz.com', logo: 'https://logo.clearbit.com/holaluz.com', sector: 'Energy', riskScore: 65, employees: 500, status: 'Active', trend: 'down', history: [70, 68, 66, 65, 64, 65], renewal: 'Dec 2024', premium: 125000, contact: 'Carlota P.' },
  { id: '5', name: 'TravelPerk', domain: 'travelperk.com', logo: 'https://logo.clearbit.com/travelperk.com', sector: 'Travel SaaS', riskScore: 81, employees: 1100, status: 'Active', trend: 'up', history: [75, 76, 78, 79, 80, 81], renewal: 'Feb 2025', premium: 150000, contact: 'Risk Team' },
  { id: '6', name: 'Filmin', domain: 'filmin.es', logo: 'https://logo.clearbit.com/filmin.es', sector: 'Media', riskScore: 55, employees: 120, status: 'Active', trend: 'down', history: [60, 58, 57, 56, 55, 55], renewal: 'Nov 2024', premium: 45000, contact: 'Jaume R.' },
  { id: '7', name: 'Idealista', domain: 'idealista.com', logo: 'https://logo.clearbit.com/idealista.com', sector: 'Real Estate', riskScore: 78, employees: 800, status: 'Active', trend: 'up', history: [70, 72, 74, 76, 77, 78], renewal: 'Jul 2025', premium: 130000, contact: 'Trust & Safety' },
  { id: '8', name: 'Heura Foods', domain: 'heurafoods.com', logo: 'https://logo.clearbit.com/heurafoods.com', sector: 'Food Tech', riskScore: 62, employees: 150, status: 'Onboarding', trend: 'stable', history: [60, 61, 62, 62, 62, 62], renewal: 'Jun 2025', premium: 35000, contact: 'Marc C.' },
  { id: '9', name: 'Red Points', domain: 'redpoints.com', logo: 'https://logo.clearbit.com/redpoints.com', sector: 'Legal Tech', riskScore: 95, employees: 300, status: 'Active', trend: 'stable', history: [94, 94, 95, 95, 95, 95], renewal: 'Sep 2024', premium: 80000, contact: 'Laura U.' },
  { id: '10', name: 'Paack', domain: 'paack.co', logo: 'https://logo.clearbit.com/paack.co', sector: 'Logistics', riskScore: 45, employees: 600, status: 'Active', trend: 'down', history: [50, 48, 46, 45, 44, 45], renewal: 'Oct 2024', premium: 110000, contact: 'Ops Director' },
  { id: '11', name: 'Tradeinn', domain: 'tradeinn.com', logo: 'https://logo.clearbit.com/tradeinn.com', sector: 'E-commerce', riskScore: 72, employees: 500, status: 'Active', trend: 'up', history: [68, 69, 70, 71, 71, 72], renewal: 'May 2025', premium: 90000, contact: 'David M.' },
  { id: '12', name: 'Clikalia', domain: 'clikalia.com', logo: 'https://logo.clearbit.com/clikalia.com', sector: 'PropTech', riskScore: 85, employees: 450, status: 'Active', trend: 'up', history: [80, 82, 83, 84, 84, 85], renewal: 'Apr 2025', premium: 100000, contact: 'Alister M.' }
];

// --- Components ---

const SparkLine = ({ data, color }: { data: number[], color: string }) => {
    const chartData = data.map((val, i) => ({ i, val }));
    return (
        <div className="h-8 w-20">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <Line type="monotone" dataKey="val" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

// --- Main Page ---

const Clients: React.FC = () => {
  const [companies] = useState<ClientCompany[]>(initialCompanies);
  const [selectedClient, setSelectedClient] = useState<ClientCompany | null>(null);
  
  // Filtering
  const [activeSegment, setActiveSegment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = useMemo(() => {
     return companies.filter(c => {
        // Segment Logic
        if (activeSegment === 'critical' && c.riskScore >= 50) return false;
        if (activeSegment === 'renewal' && !c.renewal.includes('2024')) return false;
        
        // Search Logic
        if (searchQuery) {
           if (!c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        }
        return true;
     });
  }, [companies, activeSegment, searchQuery]);

  return (
    <div className="min-h-full bg-dot-pattern pb-12 relative">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-8 pt-6 sticky top-0 z-20 shadow-sm">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Portfolio Console</span>
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Client Management</h1>
               </div>
            </div>

            {/* Control Bar (Attio Style) */}
            <div className="flex items-center justify-between gap-4 pb-4">
                {/* Smart Segments (Tabs) */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                    {[
                        { id: 'all', label: 'All Clients' },
                        { id: 'critical', label: 'Critical Risk' },
                        { id: 'renewal', label: 'Upcoming Renewals' }
                    ].map(seg => (
                        <button
                            key={seg.id}
                            onClick={() => setActiveSegment(seg.id)}
                            className={`px-4 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                                activeSegment === seg.id 
                                ? 'bg-white text-slate-900 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {seg.label}
                        </button>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter className="w-3.5 h-3.5" /> Filter
                    </button>
                </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-8">
         <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm animate-enter">
             {/* Table Header */}
             <div className="grid grid-cols-12 px-6 py-3 bg-slate-50/50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                 <div className="col-span-3">Company</div>
                 <div className="col-span-2">Sector</div>
                 <div className="col-span-2">Risk Trend</div>
                 <div className="col-span-2">Premium</div>
                 <div className="col-span-2">Next Renewal</div>
                 <div className="col-span-1 text-right">Status</div>
             </div>

             {/* Rows */}
             <div className="divide-y divide-slate-100">
                 {filteredCompanies.map((c, i) => (
                     <div 
                        key={c.id} 
                        onClick={() => setSelectedClient(c)}
                        className="grid grid-cols-12 px-6 py-3 items-center hover:bg-sky-50/30 transition-colors cursor-pointer group animate-enter"
                        style={{ animationDelay: `${i * 30}ms` }}
                     >
                         <div className="col-span-3 flex items-center gap-3">
                             <img 
                                src={c.logo} 
                                alt={c.name}
                                className="w-8 h-8 rounded-md border border-slate-200 object-cover bg-white"
                                onError={(e) => {
                                    // Fallback if logo fails
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                             />
                             {/* Fallback Avatar (Hidden by default) */}
                             <div className="hidden w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600">
                                 {c.name.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                 <p className="text-[13px] font-medium text-slate-900 group-hover:text-blue-700">{c.name}</p>
                                 <p className="text-[11px] text-slate-500">{c.employees.toLocaleString()} employees</p>
                             </div>
                         </div>
                         <div className="col-span-2">
                             <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-600">
                                 <Briefcase className="w-3 h-3" /> {c.sector}
                             </span>
                         </div>
                         <div className="col-span-2">
                             <div className="flex items-center gap-3">
                                <SparkLine data={c.history} color={c.riskScore < 50 ? '#f43f5e' : c.riskScore < 70 ? '#f59e0b' : '#10b981'} />
                                <span className={`text-[12px] font-bold tabular-nums ${
                                    c.riskScore < 50 ? 'text-rose-600' : c.riskScore < 70 ? 'text-amber-600' : 'text-emerald-600'
                                }`}>{c.riskScore}</span>
                             </div>
                         </div>
                         <div className="col-span-2 text-[13px] text-slate-600 tabular-nums font-medium">
                             €{c.premium.toLocaleString()}
                         </div>
                         <div className="col-span-2 text-[13px] text-slate-600 tabular-nums font-medium flex items-center gap-1.5">
                             <Calendar className="w-3.5 h-3.5 text-slate-400" /> {c.renewal}
                         </div>
                         <div className="col-span-1 text-right">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                                c.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                {c.status}
                            </span>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      </div>

      {/* Client Detail Drawer */}
      {selectedClient && createPortal(
         <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedClient(null)} />
            <div className="relative w-[600px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col">
                <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-start">
                    <div className="flex gap-4">
                        <img 
                            src={selectedClient.logo} 
                            alt={selectedClient.name}
                            className="w-12 h-12 rounded-lg border border-slate-200 object-cover bg-white"
                        />
                        <div>
                            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                                Policy #{Math.floor(Math.random() * 10000)}
                            </span>
                            <h2 className="text-2xl font-bold text-slate-900">{selectedClient.name}</h2>
                            <div className="flex items-center gap-4 mt-2 text-[13px] text-slate-500">
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {selectedClient.employees.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><CreditCard className="w-4 h-4" /> €{selectedClient.premium.toLocaleString()}/yr</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    {/* Risk Analysis */}
                    <div>
                        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-blue-600" /> Risk Analysis
                        </h3>
                        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Current Score</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-bold text-slate-900">{selectedClient.riskScore}</span>
                                        <span className={`text-[13px] font-medium mb-1 ${
                                            selectedClient.riskScore < 50 ? 'text-rose-600' : 'text-emerald-600'
                                        }`}>{selectedClient.riskScore < 50 ? 'Critical' : 'Safe'}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[11px] font-semibold text-slate-500 uppercase">Trend (12m)</p>
                                    <div className="h-10 w-32 mt-1">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={selectedClient.history.map((v, i) => ({ i, v }))}>
                                                <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-rose-50 border border-rose-100 rounded text-[12px]">
                                    <span className="font-medium text-rose-800 flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> High Phishing Susceptibility in Finance</span>
                                    <span className="font-bold text-rose-700">-15 pts</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div>
                        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-600" /> Underwriting Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left group">
                                <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <h4 className="text-[13px] font-bold text-slate-900">Trigger Audit</h4>
                                <p className="text-[11px] text-slate-500 mt-1">Force a compliance check.</p>
                            </button>
                            <button className="p-4 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-left group">
                                <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <CheckCircle2 className="w-4 h-4" />
                                </div>
                                <h4 className="text-[13px] font-bold text-slate-900">Approve Discount</h4>
                                <p className="text-[11px] text-slate-500 mt-1">Apply 5% renewal bonus.</p>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div className="text-[11px] text-slate-500">
                        Contact: <span className="font-medium text-slate-700">{selectedClient.contact}</span>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded text-[13px] font-medium text-slate-700 hover:bg-slate-100 transition-colors shadow-sm">
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

export default Clients;
