import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  TrendingUp, 
  Filter,
  Download,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ShieldAlert,
  Building2,
  Activity,
  Map,
  Briefcase,
  X,
  Check,
  Shield,
  CreditCard,
  FileText,
  Loader2,
  ChevronRight,
  PieChart as PieIcon,
  Mail,
  Copy
} from 'lucide-react';
import { 
  ComposedChart,
  Area, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Company } from '../../types';
import { Select } from '../../components/ui/Select';

// --- Dynamic Data Generators ---

const generateTrendData = (range: string) => {
  const months = range === '3M' ? 3 : range === '6M' ? 6 : 12;
  const data = [];
  let baseScore = 68;
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = new Date().getMonth();

  for (let i = 0; i < months; i++) {
    const monthIndex = (startMonth - (months - 1) + i + 12) % 12;
    // Smoother random walk
    const change = (Math.random() - 0.45) * 2.5; 
    baseScore = Math.min(95, Math.max(50, baseScore + change));
    
    data.push({
      month: monthNames[monthIndex],
      score: Number(baseScore.toFixed(1)),
      benchmark: 65 + (i * 0.1), // Stable market baseline
      event: i === months - 2 ? "Policy Update" : null
    });
  }
  return data;
};

const distributionData = [
  { name: 'Safe (>80)', value: 45, color: '#10b981' }, // Emerald 500
  { name: 'Monitor (50-80)', value: 55, color: '#f59e0b' }, // Amber 500
  { name: 'Critical (<50)', value: 24, color: '#f43f5e' }, // Rose 500
];

const sectorRiskData = [
  { name: 'Finance', score: 55, exposure: 'High' },
  { name: 'Healthcare', score: 42, exposure: 'Critical' },
  { name: 'Tech', score: 88, exposure: 'Low' },
  { name: 'Retail', score: 65, exposure: 'Medium' },
  { name: 'Manuf.', score: 48, exposure: 'High' },
];

// Real Spanish Companies Mock
const spanishCompanies: Company[] = [
  { id: '1', name: 'Cabify', sector: 'Mobility', riskScore: 92, employees: 1200, status: 'Active', trend: 'up', logo: 'https://logo.clearbit.com/cabify.com' },
  { id: '2', name: 'Factorial', sector: 'HR Tech', riskScore: 88, employees: 850, status: 'Active', trend: 'stable', logo: 'https://logo.clearbit.com/factorialhr.com' },
  { id: '3', name: 'Wallapop', sector: 'Marketplace', riskScore: 74, employees: 350, status: 'Active', trend: 'up', logo: 'https://logo.clearbit.com/wallapop.com' },
  { id: '4', name: 'Holaluz', sector: 'Energy', riskScore: 65, employees: 500, status: 'Active', trend: 'down', logo: 'https://logo.clearbit.com/holaluz.com' },
  { id: '5', name: 'TravelPerk', sector: 'Travel SaaS', riskScore: 81, employees: 1100, status: 'Active', trend: 'up', logo: 'https://logo.clearbit.com/travelperk.com' },
  { id: '6', name: 'Filmin', sector: 'Media', riskScore: 55, employees: 120, status: 'Active', trend: 'down', logo: 'https://logo.clearbit.com/filmin.es' },
  { id: '7', name: 'Idealista', sector: 'Real Estate', riskScore: 78, employees: 800, status: 'Active', trend: 'up', logo: 'https://logo.clearbit.com/idealista.com' },
  { id: '8', name: 'Heura', sector: 'Food Tech', riskScore: 62, employees: 150, status: 'Onboarding', trend: 'stable', logo: 'https://logo.clearbit.com/heurafoods.com' },
];

const insights = [
  { id: 1, type: 'Critical', msg: "Healthcare sector showing -12% decline in phishing resilience." },
  { id: 2, type: 'Opportunity', msg: "Tech sector score > 85. Eligible for Premium Discount." },
  { id: 3, type: 'Alert', msg: "High volume of 'CEO Fraud' failures in Manufacturing clients." },
];

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur border border-slate-200 p-3 rounded-lg shadow-xl text-[12px]">
        <p className="font-bold text-slate-900 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center justify-between gap-4 mb-1 last:mb-0">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.stroke }}></div>
                <span className="font-medium text-slate-600">{entry.name}</span>
            </div>
            <span className="font-bold tabular-nums text-slate-900">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MetricBox = ({ label, value, trend, trendValue }: { label: string, value: string, trend: 'up' | 'down' | 'neutral', trendValue: string }) => (
  <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between h-28 hover:border-blue-300 transition-colors cursor-default group shadow-sm">
    <div className="flex justify-between items-start">
       <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
       <div className="p-1.5 bg-slate-50 rounded group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <Activity className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
       </div>
    </div>
    <div>
       <span className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{value}</span>
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
  const [timeRange, setTimeRange] = useState('1Y');
  const [chartData, setChartData] = useState(generateTrendData('1Y'));
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  
  // Policy Wizard State
  const [policyStep, setPolicyStep] = useState(1);
  const [policyData, setPolicyData] = useState({
      companyName: '',
      taxId: '',
      sector: 'Technology',
      employees: '',
      adminEmail: '', // Added for invitation
      coverageTier: 'Pro',
      premium: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      setChartData(generateTrendData(timeRange));
  }, [timeRange]);

  const handlePolicySubmit = () => {
      setIsSubmitting(true);
      setTimeout(() => {
          setIsSubmitting(false);
          setPolicyStep(4); // Success Step
      }, 2000);
  };

  const closePolicyModal = () => {
      setIsPolicyModalOpen(false);
      setPolicyStep(1);
      setPolicyData({
        companyName: '',
        taxId: '',
        sector: 'Technology',
        employees: '',
        adminEmail: '',
        coverageTier: 'Pro',
        premium: 0
      });
  };

  const renderPolicyModal = () => {
      if (!isPolicyModalOpen) return null;

      return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={closePolicyModal} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden ring-1 ring-black/5 animate-slide-up flex flex-col max-h-[90vh]">
                
                {/* Modal Header */}
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-[16px] font-bold text-slate-900">Create New Policy</h3>
                        <p className="text-[12px] text-slate-500 mt-0.5">Underwriting Express Workflow</p>
                    </div>
                    <button onClick={closePolicyModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-100">
                    <div 
                        className="h-full bg-blue-600 transition-all duration-500 ease-in-out" 
                        style={{ width: `${(policyStep / 3) * 100}%` }}
                    ></div>
                </div>

                <div className="p-8 overflow-y-auto">
                    {policyStep === 1 && (
                        <div className="space-y-6 animate-enter">
                            <h4 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-600" /> Entity Information
                            </h4>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Company Legal Name</label>
                                    <input 
                                        autoFocus
                                        type="text" 
                                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="e.g. Globex Corporation"
                                        value={policyData.companyName}
                                        onChange={(e) => setPolicyData({...policyData, companyName: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tax ID / VAT</label>
                                    <input 
                                        type="text" 
                                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="A-12345678"
                                        value={policyData.taxId}
                                        onChange={(e) => setPolicyData({...policyData, taxId: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <Select
                                        label="Sector"
                                        value={policyData.sector}
                                        onChange={(val) => setPolicyData({...policyData, sector: val})}
                                        options={['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Logistics', 'Real Estate']}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Employee Count</label>
                                    <input 
                                        type="number" 
                                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        placeholder="e.g. 150"
                                        value={policyData.employees}
                                        onChange={(e) => setPolicyData({...policyData, employees: e.target.value})}
                                    />
                                </div>
                                {/* Admin Invite Field */}
                                <div className="col-span-2 space-y-2 pt-2 border-t border-slate-100">
                                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                        Primary Contact (CISO/Admin) <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input 
                                            type="email" 
                                            className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                            placeholder="admin@company.com"
                                            value={policyData.adminEmail}
                                            onChange={(e) => setPolicyData({...policyData, adminEmail: e.target.value})}
                                        />
                                    </div>
                                    <p className="text-[11px] text-slate-400">An invitation to set up the platform will be sent here.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {policyStep === 2 && (
                        <div className="space-y-6 animate-enter">
                            <h4 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-blue-600" /> Select Coverage Tier
                            </h4>
                            
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { name: 'Basic', price: 15000, desc: 'Compliance & Reporting' },
                                    { name: 'Pro', price: 35000, desc: 'Active Phishing Sims & Training' },
                                    { name: 'Enterprise', price: 85000, desc: 'Full Suite + AI Automations' }
                                ].map(tier => (
                                    <div 
                                        key={tier.name}
                                        onClick={() => setPolicyData({...policyData, coverageTier: tier.name, premium: tier.price})}
                                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                            policyData.coverageTier === tier.name 
                                            ? 'border-blue-600 bg-blue-50/30 ring-1 ring-blue-600' 
                                            : 'border-slate-200 hover:border-blue-300 bg-white'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-[13px] font-bold text-slate-900">{tier.name}</span>
                                            {policyData.coverageTier === tier.name && <Check className="w-4 h-4 text-blue-600" />}
                                        </div>
                                        <p className="text-2xl font-bold text-slate-900 mb-1">€{tier.price.toLocaleString()}</p>
                                        <p className="text-[10px] text-slate-500 mb-4">Annual Premium</p>
                                        <p className="text-[11px] text-slate-600 leading-snug">{tier.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-md flex items-start gap-3">
                                <Activity className="w-4 h-4 text-slate-400 mt-0.5" />
                                <div>
                                    <p className="text-[12px] font-bold text-slate-900">Risk-Adjusted Pricing Active</p>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                        Based on the sector <strong>{policyData.sector}</strong>, a default risk load of 1.2x has been applied to the base premium.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {policyStep === 3 && (
                        <div className="space-y-6 animate-enter">
                            <h4 className="text-[14px] font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" /> Review & Issue
                            </h4>
                            
                            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                                    <span className="text-[12px] font-medium text-slate-500">Draft Policy ID</span>
                                    <span className="font-mono text-[12px] font-bold text-slate-900">DRAFT-2023-{Math.floor(Math.random()*10000)}</span>
                                </div>
                                <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-8">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Company</p>
                                        <p className="text-[13px] font-semibold text-slate-900">{policyData.companyName}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</p>
                                        <p className="text-[13px] font-medium text-slate-700">{policyData.adminEmail || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Coverage</p>
                                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-blue-200 bg-blue-50 text-[11px] font-bold text-blue-700 mt-1">
                                            <Shield className="w-3 h-3" /> {policyData.coverageTier}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Total Premium</p>
                                        <p className="text-[16px] font-bold text-slate-900">€{policyData.premium.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {policyStep === 4 && (
                        <div className="py-8 text-center animate-enter space-y-6">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
                                <Check className="w-8 h-8" />
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Policy Issued & Tenant Created</h2>
                                <p className="text-sm text-slate-500 mt-1">The environment is ready for activation.</p>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 max-w-md mx-auto text-left">
                                <h3 className="text-[12px] font-bold text-blue-900 uppercase tracking-wider mb-3">Next Step: Client Activation</h3>
                                <p className="text-[12px] text-blue-800 mb-4 leading-relaxed">
                                    An automated invitation email has been sent to <strong>{policyData.adminEmail}</strong>. 
                                    You can also manually share the activation link below.
                                </p>
                                <div className="flex gap-2">
                                    <a 
                                       href="#/company/invite/demo-token"
                                       target="_blank"
                                       className="flex-1 bg-white border border-blue-200 rounded-md h-9 flex items-center px-3 text-[11px] font-mono text-slate-600 hover:text-blue-600 transition-colors truncate"
                                    >
                                        {window.location.origin}/#/company/invite/demo-token
                                    </a>
                                    <button className="h-9 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center" title="Copy Link">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button onClick={closePolicyModal} className="text-slate-500 text-[13px] font-medium hover:text-slate-900">
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                {policyStep < 4 && (
                    <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                        {policyStep > 1 ? (
                            <button onClick={() => setPolicyStep(s => s - 1)} className="text-[13px] font-medium text-slate-500 hover:text-slate-900">
                                Back
                            </button>
                        ) : (
                            <div></div>
                        )}
                        
                        {policyStep < 3 ? (
                            <button 
                                onClick={() => setPolicyStep(s => s + 1)}
                                disabled={policyStep === 1 && (!policyData.companyName || !policyData.adminEmail)}
                                className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-[13px] font-bold hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next Step <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button 
                                onClick={handlePolicySubmit}
                                disabled={isSubmitting}
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm disabled:opacity-70"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                                {isSubmitting ? 'Processing...' : 'Issue & Send Invite'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>,
        document.body
      );
  };

  return (
    <div className="min-h-full bg-dot-pattern pb-12">
      {/* Header Actions */}
      <div className="px-8 py-6 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {/* Mini Telefónica Logo */}
                      <div className="grid grid-cols-3 gap-0.5 w-3 h-3">
                          <div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div><div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div><div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div>
                          <div className="w-0.5 h-0.5 bg-transparent"></div><div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div><div className="w-0.5 h-0.5 bg-transparent"></div>
                          <div className="w-0.5 h-0.5 bg-transparent"></div><div className="w-0.5 h-0.5 bg-blue-600 rounded-full"></div><div className="w-0.5 h-0.5 bg-transparent"></div>
                      </div>
                      Telefónica Underwriting
                  </span>
               </div>
               <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Portfolio Risk Overview</h1>
            </div>
            <div className="flex items-center gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                  Export Report
               </button>
               <button 
                  onClick={() => setIsPolicyModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-colors"
               >
                  <Plus className="w-3.5 h-3.5" />
                  New Policy
               </button>
            </div>
         </div>

         {/* Metrics Grid */}
         <div className="grid grid-cols-4 gap-6">
            <MetricBox label="Portfolio Avg Score" value="68.4" trend="up" trendValue="+2.1" />
            <MetricBox label="Total Exposure" value="$124M" trend="down" trendValue="-4%" />
            <MetricBox label="Critical Clients" value="14" trend="down" trendValue="-2" />
            <MetricBox label="Active Policies" value="124" trend="up" trendValue="+8" />
         </div>
      </div>

      {/* Content Body */}
      <div className="px-8 mt-8 space-y-8">
         
         {/* Main Analytics Section */}
         <div className="grid grid-cols-3 gap-6">
            {/* Evolution Chart - Clearer ComposedChart */}
            <div className="col-span-2 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
               <div className="flex items-center justify-between mb-6">
                  <div>
                     <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" /> Portfolio Evolution
                     </h3>
                  </div>
                  <div className="flex bg-slate-100 p-0.5 rounded-md">
                     {['3M', '6M', '1Y'].map(t => (
                        <button 
                           key={t} 
                           onClick={() => setTimeRange(t)}
                           className={`px-3 py-1 text-[11px] font-medium rounded-sm transition-all ${
                              timeRange === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                           }`}
                        >
                           {t}
                        </button>
                     ))}
                  </div>
               </div>
               
               <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={chartData}>
                        <defs>
                           <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fill: '#64748b'}} domain={[40, 100]} />
                        <Tooltip content={<CustomTooltip />} />
                        
                        <Line 
                           type="monotone" 
                           dataKey="benchmark" 
                           stroke="#94a3b8" 
                           strokeWidth={2} 
                           strokeDasharray="4 4" 
                           dot={false}
                           name="Market Benchmark" 
                        />

                        <Area 
                           type="monotone" 
                           dataKey="score" 
                           stroke="#2563eb" 
                           strokeWidth={3} 
                           fill="url(#colorScore)" 
                           name="Portfolio Avg" 
                        />
                     </ComposedChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Risk Distribution - Standard Donut */}
            <div className="col-span-1 space-y-6">
               <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm h-[320px] flex flex-col">
                  <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <PieIcon className="w-4 h-4 text-slate-500" /> Risk Distribution
                  </h3>
                  <div className="flex-1 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {distributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                             iconSize={10} 
                             iconType="circle"
                             verticalAlign="bottom" 
                             align="center"
                             height={36}
                             wrapperStyle={{ fontSize: '11px', fontWeight: 500, paddingTop: '20px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      {/* Center Text */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 text-center pointer-events-none">
                          <div className="text-3xl font-bold text-slate-900">124</div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold">Clients</div>
                      </div>
                  </div>
               </div>

               {/* AI Insights Feed */}
               <div className="bg-white border border-slate-200 rounded-lg p-0 shadow-sm overflow-hidden flex-1">
                  <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                     <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5 text-blue-600" /> Actuarial Insights
                     </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                     {insights.map(insight => (
                        <div key={insight.id} className="p-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                           <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${
                                 insight.type === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                 insight.type === 'Opportunity' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                 'bg-amber-50 text-amber-700 border-amber-100'
                              }`}>{insight.type}</span>
                           </div>
                           <p className="text-[12px] text-slate-700 leading-snug group-hover:text-blue-700">{insight.msg}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Sector Heatmap & Company Grid */}
         <div className="grid grid-cols-12 gap-6">
             {/* Sector Heatmap */}
             <div className="col-span-4 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Map className="w-4 h-4 text-slate-500" /> Sector Performance
                   </h3>
                </div>
                <div className="p-5 space-y-5">
                   {sectorRiskData.map(sector => (
                      <div key={sector.name}>
                         <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[13px] font-medium text-slate-700">{sector.name}</span>
                            <span className={`text-[11px] font-bold ${
                               sector.score < 50 ? 'text-rose-600' : sector.score < 70 ? 'text-amber-600' : 'text-emerald-600'
                            }`}>{sector.score}/100</span>
                         </div>
                         <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                               className={`h-full rounded-full ${
                                  sector.score < 50 ? 'bg-rose-500' : sector.score < 70 ? 'bg-amber-400' : 'bg-emerald-500'
                               }`}
                               style={{ width: `${sector.score}%` }}
                            ></div>
                         </div>
                         <p className="text-[10px] text-slate-400 mt-1 text-right">{sector.exposure} Exposure</p>
                      </div>
                   ))}
                </div>
             </div>

             {/* Client List */}
             <div className="col-span-8 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/30">
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-slate-500" /> Active Policies
                   </h3>
                   <div className="flex gap-2">
                      <div className="relative">
                         <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                         <input 
                            type="text" 
                            placeholder="Filter clients..." 
                            className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[12px] w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                         />
                      </div>
                   </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="text-[11px] text-slate-500 uppercase font-semibold bg-slate-50/50 border-b border-slate-200">
                            <th className="px-5 py-3 font-semibold">Company Name</th>
                            <th className="px-5 py-3 font-semibold">Sector</th>
                            <th className="px-5 py-3 font-semibold">Risk Score</th>
                            <th className="px-5 py-3 font-semibold">Employees</th>
                            <th className="px-5 py-3 font-semibold text-right">Status</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {spanishCompanies.map(company => (
                            <tr key={company.id} className="hover:bg-sky-50/30 transition-colors cursor-pointer group">
                               <td className="px-5 py-3">
                                  <div className="flex items-center gap-3">
                                     <img 
                                        src={company.logo} 
                                        alt={company.name}
                                        className="w-6 h-6 rounded border border-slate-200 object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                     />
                                     <div className="hidden w-6 h-6 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                        {company.name.substring(0, 2).toUpperCase()}
                                     </div>
                                     <span className="text-[13px] font-medium text-slate-900 group-hover:text-blue-700 transition-colors">{company.name}</span>
                                  </div>
                               </td>
                               <td className="px-5 py-3">
                                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-[11px] font-medium text-slate-600">
                                     <Briefcase className="w-3 h-3" />
                                     {company.sector}
                                  </span>
                               </td>
                               <td className="px-5 py-3">
                                  <div className="flex items-center gap-2">
                                     <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full ${
                                           company.riskScore > 70 ? 'bg-emerald-500' : company.riskScore > 40 ? 'bg-amber-400' : 'bg-rose-500'
                                        }`} style={{ width: `${company.riskScore}%` }}></div>
                                     </div>
                                     <span className="text-[12px] font-bold text-slate-700 tabular-nums">{company.riskScore}</span>
                                  </div>
                               </td>
                               <td className="px-5 py-3 text-[12px] text-slate-600 tabular-nums font-medium">
                                  {company.employees.toLocaleString()}
                               </td>
                               <td className="px-5 py-3 text-right">
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                                     company.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                                  }`}>
                                     <span className={`w-1.5 h-1.5 rounded-full ${company.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                     {company.status}
                                  </span>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
         </div>
      </div>
      {renderPolicyModal()}
    </div>
  );
};

export default InsuranceDashboard;