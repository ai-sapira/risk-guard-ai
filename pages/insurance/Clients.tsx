
import React, { useState, useMemo, useEffect } from 'react';
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
  CheckCircle2,
  ChevronLeft,
  ChevronRight
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

const generateHistory = (base: number, trend: 'up' | 'down' | 'stable'): number[] => {
  const history: number[] = [];
  let current = base;
  for (let i = 0; i < 6; i++) {
    if (trend === 'up') {
      current = Math.min(100, current - 4 + Math.random() * 2);
    } else if (trend === 'down') {
      current = Math.max(40, current + 4 - Math.random() * 2);
    } else {
      current = base + (Math.random() - 0.5) * 2;
    }
    history.push(Math.round(current));
  }
  return history;
};

const initialCompanies: ClientCompany[] = [
  { id: '1', name: 'Cabify', domain: 'cabify.com', logo: 'https://logo.clearbit.com/cabify.com', sector: 'Mobility', riskScore: 92, employees: 1200, status: 'Active', trend: 'up', history: generateHistory(92, 'up'), renewal: 'Aug 2025', premium: 180000, contact: 'Security Ops' },
  { id: '2', name: 'Factorial', domain: 'factorialhr.com', logo: 'https://logo.clearbit.com/factorialhr.com', sector: 'HR Tech', riskScore: 88, employees: 850, status: 'Active', trend: 'stable', history: generateHistory(88, 'stable'), renewal: 'Jan 2025', premium: 95000, contact: 'Jordi R.' },
  { id: '3', name: 'Wallapop', domain: 'wallapop.com', logo: 'https://logo.clearbit.com/wallapop.com', sector: 'Marketplace', riskScore: 74, employees: 350, status: 'Active', trend: 'up', history: generateHistory(74, 'up'), renewal: 'Mar 2025', premium: 62000, contact: 'Platform Sec' },
  { id: '4', name: 'Holaluz', domain: 'holaluz.com', logo: 'https://logo.clearbit.com/holaluz.com', sector: 'Energy', riskScore: 65, employees: 500, status: 'Active', trend: 'down', history: generateHistory(65, 'down'), renewal: 'Dec 2024', premium: 125000, contact: 'Carlota P.' },
  { id: '5', name: 'TravelPerk', domain: 'travelperk.com', logo: 'https://logo.clearbit.com/travelperk.com', sector: 'Travel SaaS', riskScore: 81, employees: 1100, status: 'Active', trend: 'up', history: generateHistory(81, 'up'), renewal: 'Feb 2025', premium: 150000, contact: 'Risk Team' },
  { id: '6', name: 'Filmin', domain: 'filmin.es', logo: 'https://logo.clearbit.com/filmin.es', sector: 'Media', riskScore: 55, employees: 120, status: 'Active', trend: 'down', history: generateHistory(55, 'down'), renewal: 'Nov 2024', premium: 45000, contact: 'Jaume R.' },
  { id: '7', name: 'Idealista', domain: 'idealista.com', logo: 'https://logo.clearbit.com/idealista.com', sector: 'Real Estate', riskScore: 78, employees: 800, status: 'Active', trend: 'up', history: generateHistory(78, 'up'), renewal: 'Jul 2025', premium: 130000, contact: 'Trust & Safety' },
  { id: '8', name: 'Heura Foods', domain: 'heurafoods.com', logo: 'https://logo.clearbit.com/heurafoods.com', sector: 'Food Tech', riskScore: 62, employees: 150, status: 'Onboarding', trend: 'stable', history: generateHistory(62, 'stable'), renewal: 'Jun 2025', premium: 35000, contact: 'Marc C.' },
  { id: '9', name: 'Red Points', domain: 'redpoints.com', logo: 'https://logo.clearbit.com/redpoints.com', sector: 'Legal Tech', riskScore: 95, employees: 300, status: 'Active', trend: 'stable', history: generateHistory(95, 'stable'), renewal: 'Sep 2024', premium: 80000, contact: 'Laura U.' },
  { id: '10', name: 'Paack', domain: 'paack.co', logo: 'https://logo.clearbit.com/paack.co', sector: 'Logistics', riskScore: 45, employees: 600, status: 'Active', trend: 'down', history: generateHistory(45, 'down'), renewal: 'Oct 2024', premium: 110000, contact: 'Ops Director' },
  { id: '11', name: 'Tradeinn', domain: 'tradeinn.com', logo: 'https://logo.clearbit.com/tradeinn.com', sector: 'E-commerce', riskScore: 72, employees: 500, status: 'Active', trend: 'up', history: generateHistory(72, 'up'), renewal: 'May 2025', premium: 90000, contact: 'David M.' },
  { id: '12', name: 'Clikalia', domain: 'clikalia.com', logo: 'https://logo.clearbit.com/clikalia.com', sector: 'PropTech', riskScore: 85, employees: 450, status: 'Active', trend: 'up', history: generateHistory(85, 'up'), renewal: 'Apr 2025', premium: 100000, contact: 'Alister M.' },
  { id: '13', name: 'Typeform', domain: 'typeform.com', logo: 'https://logo.clearbit.com/typeform.com', sector: 'SaaS', riskScore: 89, employees: 400, status: 'Active', trend: 'up', history: generateHistory(89, 'up'), renewal: 'Mar 2025', premium: 75000, contact: 'Product Sec' },
  { id: '14', name: 'Wallbox', domain: 'wallbox.com', logo: 'https://logo.clearbit.com/wallbox.com', sector: 'Energy Tech', riskScore: 76, employees: 900, status: 'Active', trend: 'up', history: generateHistory(76, 'up'), renewal: 'Jun 2025', premium: 140000, contact: 'Engineering' },
  { id: '15', name: 'Freepik', domain: 'freepik.com', logo: 'https://logo.clearbit.com/freepik.com', sector: 'Media', riskScore: 82, employees: 600, status: 'Active', trend: 'stable', history: generateHistory(82, 'stable'), renewal: 'Jan 2025', premium: 110000, contact: 'IT Security' },
  { id: '16', name: 'Jobandtalent', domain: 'jobandtalent.com', logo: 'https://logo.clearbit.com/jobandtalent.com', sector: 'HR Tech', riskScore: 71, employees: 700, status: 'Active', trend: 'up', history: generateHistory(71, 'up'), renewal: 'Sep 2025', premium: 120000, contact: 'Compliance' },
  { id: '17', name: 'Glovo', domain: 'glovoapp.com', logo: 'https://logo.clearbit.com/glovoapp.com', sector: 'Delivery', riskScore: 68, employees: 2000, status: 'Active', trend: 'down', history: generateHistory(68, 'down'), renewal: 'Dec 2024', premium: 250000, contact: 'Security Lead' },
  { id: '18', name: 'Spotahome', domain: 'spotahome.com', logo: 'https://logo.clearbit.com/spotahome.com', sector: 'PropTech', riskScore: 79, employees: 350, status: 'Active', trend: 'up', history: generateHistory(79, 'up'), renewal: 'Feb 2025', premium: 68000, contact: 'Tech Ops' },
  { id: '19', name: 'Letgo', domain: 'letgo.com', logo: 'https://logo.clearbit.com/letgo.com', sector: 'Marketplace', riskScore: 73, employees: 400, status: 'Active', trend: 'stable', history: generateHistory(73, 'stable'), renewal: 'Apr 2025', premium: 85000, contact: 'Platform Team' },
  { id: '20', name: 'PcComponentes', domain: 'pccomponentes.com', logo: 'https://logo.clearbit.com/pccomponentes.com', sector: 'E-commerce', riskScore: 77, employees: 800, status: 'Active', trend: 'up', history: generateHistory(77, 'up'), renewal: 'May 2025', premium: 135000, contact: 'Security Manager' },
  { id: '21', name: 'Civitatis', domain: 'civitatis.com', logo: 'https://logo.clearbit.com/civitatis.com', sector: 'Travel', riskScore: 80, employees: 450, status: 'Active', trend: 'up', history: generateHistory(80, 'up'), renewal: 'Aug 2025', premium: 95000, contact: 'Risk Ops' },
  { id: '22', name: 'Scalpers', domain: 'scalperscompany.com', logo: 'https://logo.clearbit.com/scalperscompany.com', sector: 'Retail', riskScore: 64, employees: 300, status: 'Active', trend: 'down', history: generateHistory(64, 'down'), renewal: 'Nov 2024', premium: 55000, contact: 'IT Director' },
  { id: '23', name: 'Housfy', domain: 'housfy.com', logo: 'https://logo.clearbit.com/housfy.com', sector: 'PropTech', riskScore: 70, employees: 250, status: 'Active', trend: 'up', history: generateHistory(70, 'up'), renewal: 'Jul 2025', premium: 48000, contact: 'Tech Lead' },
  { id: '24', name: 'Cobee', domain: 'cobee.io', logo: 'https://logo.clearbit.com/cobee.io', sector: 'HR Tech', riskScore: 86, employees: 200, status: 'Active', trend: 'up', history: generateHistory(86, 'up'), renewal: 'Sep 2025', premium: 42000, contact: 'Founder' },
  { id: '25', name: 'Jeff', domain: 'wearejeff.com', logo: 'https://logo.clearbit.com/wearejeff.com', sector: 'E-commerce', riskScore: 69, employees: 180, status: 'Active', trend: 'stable', history: generateHistory(69, 'stable'), renewal: 'Oct 2024', premium: 38000, contact: 'CTO' },
  { id: '26', name: 'Kave Home', domain: 'kavehome.com', logo: 'https://logo.clearbit.com/kavehome.com', sector: 'E-commerce', riskScore: 75, employees: 550, status: 'Active', trend: 'up', history: generateHistory(75, 'up'), renewal: 'Dec 2024', premium: 98000, contact: 'Security' },
  { id: '27', name: 'Vicio', domain: 'ganasdevicio.com', logo: 'https://logo.clearbit.com/ganasdevicio.com', sector: 'Food Tech', riskScore: 58, employees: 120, status: 'Onboarding', trend: 'stable', history: generateHistory(58, 'stable'), renewal: 'Jan 2025', premium: 32000, contact: 'Operations' },
  { id: '28', name: 'PdPaola', domain: 'pdpaola.com', logo: 'https://logo.clearbit.com/pdpaola.com', sector: 'E-commerce', riskScore: 83, employees: 150, status: 'Active', trend: 'up', history: generateHistory(83, 'up'), renewal: 'Mar 2025', premium: 45000, contact: 'Founder' },
  { id: '29', name: 'Domestika', domain: 'domestika.org', logo: 'https://logo.clearbit.com/domestika.org', sector: 'EdTech', riskScore: 87, employees: 650, status: 'Active', trend: 'up', history: generateHistory(87, 'up'), renewal: 'Jun 2025', premium: 115000, contact: 'Platform Sec' },
  { id: '30', name: 'Adevinta', domain: 'adevinta.com', logo: 'https://logo.clearbit.com/adevinta.com', sector: 'Marketplace', riskScore: 84, employees: 1200, status: 'Active', trend: 'stable', history: generateHistory(84, 'stable'), renewal: 'Apr 2025', premium: 200000, contact: 'CISO' },
  { id: '31', name: 'Fever', domain: 'feverup.com', logo: 'https://logo.clearbit.com/feverup.com', sector: 'Entertainment', riskScore: 81, employees: 500, status: 'Active', trend: 'up', history: generateHistory(81, 'up'), renewal: 'May 2025', premium: 95000, contact: 'Tech Ops' },
  { id: '32', name: 'Domestika', domain: 'domestika.org', logo: 'https://logo.clearbit.com/domestika.org', sector: 'EdTech', riskScore: 87, employees: 650, status: 'Active', trend: 'up', history: generateHistory(87, 'up'), renewal: 'Jun 2025', premium: 115000, contact: 'Platform Sec' },
  { id: '33', name: 'Zara', domain: 'zara.com', logo: 'https://logo.clearbit.com/zara.com', sector: 'Retail', riskScore: 90, employees: 5000, status: 'Active', trend: 'up', history: generateHistory(90, 'up'), renewal: 'Oct 2025', premium: 450000, contact: 'Global CISO' },
  { id: '34', name: 'Mango', domain: 'mango.com', logo: 'https://logo.clearbit.com/mango.com', sector: 'Retail', riskScore: 88, employees: 15000, status: 'Active', trend: 'stable', history: generateHistory(88, 'stable'), renewal: 'Nov 2025', premium: 600000, contact: 'Security Director' },
  { id: '35', name: 'BBVA', domain: 'bbva.com', logo: 'https://logo.clearbit.com/bbva.com', sector: 'Finance', riskScore: 93, employees: 120000, status: 'Active', trend: 'up', history: generateHistory(93, 'up'), renewal: 'Dec 2025', premium: 1200000, contact: 'CISO Office' },
  { id: '36', name: 'Santander', domain: 'santander.com', logo: 'https://logo.clearbit.com/santander.com', sector: 'Finance', riskScore: 91, employees: 200000, status: 'Active', trend: 'stable', history: generateHistory(91, 'stable'), renewal: 'Jan 2026', premium: 1500000, contact: 'Cyber Risk' },
  { id: '37', name: 'Telefónica', domain: 'telefonica.com', logo: 'https://logo.clearbit.com/telefonica.com', sector: 'Telecom', riskScore: 94, employees: 100000, status: 'Active', trend: 'up', history: generateHistory(94, 'up'), renewal: 'Feb 2026', premium: 2000000, contact: 'Security Ops' },
  { id: '38', name: 'Repsol', domain: 'repsol.com', logo: 'https://logo.clearbit.com/repsol.com', sector: 'Energy', riskScore: 85, employees: 25000, status: 'Active', trend: 'up', history: generateHistory(85, 'up'), renewal: 'Mar 2026', premium: 800000, contact: 'IT Security' },
  { id: '39', name: 'Inditex', domain: 'inditex.com', logo: 'https://logo.clearbit.com/inditex.com', sector: 'Retail', riskScore: 89, employees: 175000, status: 'Active', trend: 'stable', history: generateHistory(89, 'stable'), renewal: 'Apr 2026', premium: 1800000, contact: 'Global Security' },
  { id: '40', name: 'CaixaBank', domain: 'caixabank.com', logo: 'https://logo.clearbit.com/caixabank.com', sector: 'Finance', riskScore: 92, employees: 40000, status: 'Active', trend: 'up', history: generateHistory(92, 'up'), renewal: 'May 2026', premium: 900000, contact: 'Risk Management' },
  { id: '41', name: 'Iberdrola', domain: 'iberdrola.com', logo: 'https://logo.clearbit.com/iberdrola.com', sector: 'Energy', riskScore: 86, employees: 40000, status: 'Active', trend: 'up', history: generateHistory(86, 'up'), renewal: 'Jun 2026', premium: 750000, contact: 'Cyber Defense' },
  { id: '42', name: 'Mapfre', domain: 'mapfre.com', logo: 'https://logo.clearbit.com/mapfre.com', sector: 'Insurance', riskScore: 88, employees: 35000, status: 'Active', trend: 'stable', history: generateHistory(88, 'stable'), renewal: 'Jul 2026', premium: 850000, contact: 'Security Team' },
  { id: '43', name: 'Amadeus', domain: 'amadeus.com', logo: 'https://logo.clearbit.com/amadeus.com', sector: 'Travel Tech', riskScore: 90, employees: 19000, status: 'Active', trend: 'up', history: generateHistory(90, 'up'), renewal: 'Aug 2026', premium: 550000, contact: 'IT Security' },
  { id: '44', name: 'Grifols', domain: 'grifols.com', logo: 'https://logo.clearbit.com/grifols.com', sector: 'Healthcare', riskScore: 87, employees: 30000, status: 'Active', trend: 'up', history: generateHistory(87, 'up'), renewal: 'Sep 2026', premium: 700000, contact: 'Compliance' },
  { id: '45', name: 'ACS', domain: 'grupoacs.com', logo: 'https://logo.clearbit.com/grupoacs.com', sector: 'Construction', riskScore: 79, employees: 200000, status: 'Active', trend: 'stable', history: generateHistory(79, 'stable'), renewal: 'Oct 2026', premium: 1100000, contact: 'Security Ops' },
  { id: '46', name: 'Ferrovial', domain: 'ferrovial.com', logo: 'https://logo.clearbit.com/ferrovial.com', sector: 'Infrastructure', riskScore: 82, employees: 60000, status: 'Active', trend: 'up', history: generateHistory(82, 'up'), renewal: 'Nov 2026', premium: 650000, contact: 'IT Director' },
  { id: '47', name: 'Aena', domain: 'aena.es', logo: 'https://logo.clearbit.com/aena.es', sector: 'Aviation', riskScore: 91, employees: 12000, status: 'Active', trend: 'stable', history: generateHistory(91, 'stable'), renewal: 'Dec 2026', premium: 500000, contact: 'Cyber Security' },
  { id: '48', name: 'Endesa', domain: 'endesa.com', logo: 'https://logo.clearbit.com/endesa.com', sector: 'Energy', riskScore: 84, employees: 10000, status: 'Active', trend: 'up', history: generateHistory(84, 'up'), renewal: 'Jan 2027', premium: 420000, contact: 'Security Manager' },
  { id: '49', name: 'Acciona', domain: 'acciona.com', logo: 'https://logo.clearbit.com/acciona.com', sector: 'Energy', riskScore: 83, employees: 45000, status: 'Active', trend: 'up', history: generateHistory(83, 'up'), renewal: 'Feb 2027', premium: 680000, contact: 'Risk Ops' },
  { id: '50', name: 'Cellnex', domain: 'cellnex.com', logo: 'https://logo.clearbit.com/cellnex.com', sector: 'Telecom', riskScore: 88, employees: 3000, status: 'Active', trend: 'stable', history: generateHistory(88, 'stable'), renewal: 'Mar 2027', premium: 380000, contact: 'Tech Security' }
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
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeSegment, searchQuery]);

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
                 {paginatedCompanies.map((c, i) => (
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
             
             {/* Pagination */}
             {totalPages > 1 && (
                 <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                     <div className="text-[12px] text-slate-600">
                         Showing <span className="font-semibold text-slate-900">{startIndex + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(endIndex, filteredCompanies.length)}</span> of <span className="font-semibold text-slate-900">{filteredCompanies.length}</span> companies
                     </div>
                     <div className="flex items-center gap-2">
                         <button
                             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                             disabled={currentPage === 1}
                             className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[12px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                         >
                             <ChevronLeft className="w-3.5 h-3.5" />
                             Previous
                         </button>
                         
                         <div className="flex items-center gap-1">
                             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                 // Show first page, last page, current page, and pages around current
                                 if (
                                     page === 1 ||
                                     page === totalPages ||
                                     (page >= currentPage - 1 && page <= currentPage + 1)
                                 ) {
                                     return (
                                         <button
                                             key={page}
                                             onClick={() => setCurrentPage(page)}
                                             className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                                                 currentPage === page
                                                     ? 'bg-blue-600 text-white shadow-sm'
                                                     : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                             }`}
                                         >
                                             {page}
                                         </button>
                                     );
                                 } else if (
                                     page === currentPage - 2 ||
                                     page === currentPage + 2
                                 ) {
                                     return (
                                         <span key={page} className="px-2 text-slate-400">
                                             ...
                                         </span>
                                     );
                                 }
                                 return null;
                             })}
                         </div>
                         
                         <button
                             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                             disabled={currentPage === totalPages}
                             className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[12px] font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                         >
                             Next
                             <ChevronRight className="w-3.5 h-3.5" />
                         </button>
                     </div>
                 </div>
             )}
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
