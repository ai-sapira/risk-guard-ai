
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  X, 
  Calendar, 
  Target,
  Mail,
  Zap,
  Shield,
  MessageSquare,
  Smartphone,
  Ban,
  Clock,
  Bot,
  CheckCircle2,
  ArrowRight,
  LayoutList,
  SlidersHorizontal,
  ChevronDown,
  MoreHorizontal,
  UserCheck,
  AlertTriangle,
  Eye,
  MousePointer,
  Lock
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, CartesianGrid } from 'recharts';

// Expanded Mock Data (12+ Items)
const initialCampaigns = [
  { id: 1, name: "Q3 Spear Phishing", target: "Finance Dept", status: "Active", type: "Manual", date: "Oct 12", rate: "2.4%", channel: "Email", sent: 450, opened: 320, clicked: 24, compromised: 12 },
  { id: 2, name: "AI-Pilot: Invoice Fraud", target: "High Risk Users", status: "Scheduled", type: "AI-Pilot", date: "Oct 24", rate: "-", channel: "Email", sent: 0, opened: 0, clicked: 0, compromised: 0 },
  { id: 3, name: "Credential Harvest", target: "All Staff", status: "Draft", type: "Manual", date: "-", rate: "0%", channel: "Email", sent: 0, opened: 0, clicked: 0, compromised: 0 },
  { id: 4, name: "CEO Fraud", target: "Executives", status: "Completed", type: "Manual", date: "Sep 15", rate: "5.1%", channel: "SMS", sent: 15, opened: 14, clicked: 2, compromised: 0 },
  { id: 5, name: "Ransomware Simulation", target: "IT Admins", status: "Active", type: "AI-Pilot", date: "Oct 26", rate: "1.1%", channel: "Slack", sent: 1200, opened: 890, clicked: 15, compromised: 2 },
  { id: 6, name: "Cloud Storage Lure", target: "Engineering", status: "Completed", type: "Manual", date: "Sep 01", rate: "8.3%", channel: "Email", sent: 200, opened: 180, clicked: 45, compromised: 15 },
  { id: 7, name: "AI-Pilot: Urgency Test", target: "Sales Dept", status: "Active", type: "AI-Pilot", date: "Oct 10", rate: "4.2%", channel: "SMS", sent: 50, opened: 45, clicked: 5, compromised: 1 },
  { id: 8, name: "VPN Update", target: "Remote Workers", status: "Draft", type: "Manual", date: "-", rate: "-", channel: "Email", sent: 0, opened: 0, clicked: 0, compromised: 0 },
  { id: 9, name: "Payroll Diversion", target: "HR Dept", status: "Scheduled", type: "Manual", date: "Nov 01", rate: "-", channel: "Email", sent: 0, opened: 0, clicked: 0, compromised: 0 },
  { id: 10, name: "AI-Pilot: Deepfake Audio", target: "Executives", status: "Completed", type: "AI-Pilot", date: "Aug 20", rate: "12.5%", channel: "Voice", sent: 10, opened: 8, clicked: 2, compromised: 1 },
  { id: 11, name: "Supply Chain Compromise", target: "Procurement", status: "Active", type: "Manual", date: "Oct 18", rate: "3.1%", channel: "Email", sent: 30, opened: 25, clicked: 3, compromised: 1 },
  { id: 12, name: "Gift Card Scam", target: "All Staff", status: "Completed", type: "AI-Pilot", date: "Jul 15", rate: "1.8%", channel: "Email", sent: 1500, opened: 1200, clicked: 50, compromised: 12 },
  { id: 13, name: "Office 365 Re-auth", target: "New Hires", status: "Scheduled", type: "Manual", date: "Oct 30", rate: "-", channel: "Email", sent: 0, opened: 0, clicked: 0, compromised: 0 },
];

const clickData = [
   { time: '09:00', clicks: 0 },
   { time: '10:00', clicks: 12 },
   { time: '11:00', clicks: 45 },
   { time: '12:00', clicks: 20 },
   { time: '13:00', clicks: 8 },
   { time: '14:00', clicks: 15 },
   { time: '15:00', clicks: 5 },
];

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creationMode, setCreationMode] = useState<'select' | 'manual' | 'auto'>('select');
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

  // Form State
  const [manualForm, setManualForm] = useState({ name: '', target: 'All Employees', channel: 'Email' });
  const [aiObjective, setAiObjective] = useState('General Awareness');

  const handleLaunch = () => {
    const newId = campaigns.length + 1;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    
    let newCampaign;
    
    if (creationMode === 'manual') {
        newCampaign = {
            id: newId,
            name: manualForm.name || "Untitled Campaign",
            target: manualForm.target,
            status: "Active",
            type: "Manual",
            date: date,
            rate: "0%",
            channel: manualForm.channel,
            sent: 100, opened: 0, clicked: 0, compromised: 0
        };
    } else {
        newCampaign = {
            id: newId,
            name: `AI-Generated: ${aiObjective}`,
            target: "Dynamic Segment",
            status: "Scheduled",
            type: "AI-Pilot",
            date: date,
            rate: "-",
            channel: "Multi-channel",
            sent: 0, opened: 0, clicked: 0, compromised: 0
        };
    }

    setCampaigns([newCampaign, ...campaigns]);
    setIsModalOpen(false);
    setCreationMode('select');
    setManualForm({ name: '', target: 'All Employees', channel: 'Email' });
  };

  // Renderers
  const renderDetailDrawer = () => {
     if (!selectedCampaign) return null;

     return (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedCampaign(null)} />
           <div className="relative w-[600px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col overflow-hidden">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-start shrink-0">
                 <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${
                            selectedCampaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${selectedCampaign.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            {selectedCampaign.status}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                           <Calendar className="w-3 h-3" /> {selectedCampaign.date}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedCampaign.name}</h2>
                    <p className="text-[13px] text-slate-500 mt-1 flex items-center gap-1">
                       Target: <span className="font-medium text-slate-700">{selectedCampaign.target}</span>
                    </p>
                 </div>
                 <button onClick={() => setSelectedCampaign(null)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                 {/* The Funnel */}
                 <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                       <Filter className="w-3.5 h-3.5 text-blue-600" /> Attack Funnel
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                       <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-center">
                          <div className="text-[11px] font-semibold text-slate-500 uppercase mb-1">Sent</div>
                          <div className="text-xl font-bold text-slate-900">{selectedCampaign.sent}</div>
                          <div className="w-full h-1 bg-slate-200 mt-2 rounded-full"></div>
                       </div>
                       <div className="bg-blue-50 border border-blue-100 p-3 rounded-md text-center relative">
                          <ArrowRight className="w-4 h-4 text-blue-200 absolute -left-3 top-1/2 -translate-y-1/2" />
                          <div className="text-[11px] font-semibold text-blue-600 uppercase mb-1">Opened</div>
                          <div className="text-xl font-bold text-blue-700">{selectedCampaign.opened}</div>
                          <div className="w-full h-1 bg-blue-200 mt-2 rounded-full">
                             <div className="h-full bg-blue-500 rounded-full" style={{width: '70%'}}></div>
                          </div>
                       </div>
                       <div className="bg-amber-50 border border-amber-100 p-3 rounded-md text-center relative">
                          <ArrowRight className="w-4 h-4 text-amber-200 absolute -left-3 top-1/2 -translate-y-1/2" />
                          <div className="text-[11px] font-semibold text-amber-600 uppercase mb-1">Clicked</div>
                          <div className="text-xl font-bold text-amber-700">{selectedCampaign.clicked}</div>
                          <div className="w-full h-1 bg-amber-200 mt-2 rounded-full">
                             <div className="h-full bg-amber-500 rounded-full" style={{width: '15%'}}></div>
                          </div>
                       </div>
                       <div className="bg-rose-50 border border-rose-100 p-3 rounded-md text-center relative">
                          <ArrowRight className="w-4 h-4 text-rose-200 absolute -left-3 top-1/2 -translate-y-1/2" />
                          <div className="text-[11px] font-semibold text-rose-600 uppercase mb-1">Failed</div>
                          <div className="text-xl font-bold text-rose-700">{selectedCampaign.compromised}</div>
                          <div className="w-full h-1 bg-rose-200 mt-2 rounded-full">
                             <div className="h-full bg-rose-500 rounded-full" style={{width: '5%'}}></div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Payload Preview */}
                 <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                       <Eye className="w-3.5 h-3.5 text-blue-600" /> Payload Preview
                    </h3>
                    <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                       <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
                          <div className="flex gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                          </div>
                          <div className="flex-1 text-center text-[11px] text-slate-500 font-medium">Mail Client - Inbox</div>
                       </div>
                       <div className="bg-white p-5">
                          <div className="border-b border-slate-100 pb-3 mb-3 space-y-1">
                             <div className="flex text-[12px]">
                                <span className="text-slate-500 w-16">From:</span>
                                <span className="text-slate-900 font-medium">IT Support &lt;support@microsoft-security-update.com&gt;</span>
                             </div>
                             <div className="flex text-[12px]">
                                <span className="text-slate-500 w-16">Subject:</span>
                                <span className="text-slate-900 font-medium">Action Required: Password Expiry Notification</span>
                             </div>
                          </div>
                          <div className="text-[13px] text-slate-700 leading-relaxed space-y-3 font-serif">
                             <p>Dear User,</p>
                             <p>Your corporate account password is set to expire in 24 hours. To avoid locking your account, please update your credentials immediately.</p>
                             <div className="py-2">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium pointer-events-none">Update Password Now</button>
                             </div>
                             <p className="text-slate-500 text-[11px]">IT Security Team</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Timeline & Log */}
                 <div className="space-y-4">
                    <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                       <MousePointer className="w-3.5 h-3.5 text-blue-600" /> Activity Timeline
                    </h3>
                    <div className="h-48 w-full bg-white border border-slate-200 rounded-lg p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={clickData}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} fill="url(#colorClicks)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                 <div className="space-y-2">
                     <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-wider">Compromised Users (Live)</h3>
                     <div className="border border-slate-200 rounded-md overflow-hidden">
                         {[1, 2, 3].map(i => (
                             <div key={i} className="flex justify-between items-center p-3 bg-white border-b border-slate-100 last:border-0">
                                 <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center text-[10px] font-bold">
                                         JD
                                     </div>
                                     <div>
                                         <p className="text-[13px] font-medium text-slate-900">John Doe</p>
                                         <p className="text-[11px] text-slate-500">Finance • 10:24 AM</p>
                                     </div>
                                 </div>
                                 <span className="text-[11px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 font-medium">Submitted Data</span>
                             </div>
                         ))}
                     </div>
                 </div>
              </div>
           </div>
        </div>
     );
  };

  const renderOverview = () => (
    <div className="space-y-6 animate-enter pb-20">
      {/* Filters Bar */}
      <div className="flex items-center gap-2 sticky top-24 z-10 bg-dot-pattern py-2">
        <div className="relative group">
           <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors" />
           <input 
              type="text" 
              placeholder="Filter campaigns..." 
              className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] w-64 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium text-slate-700 placeholder:text-slate-400 transition-all tabular-nums"
           />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
           <Filter className="w-3.5 h-3.5" />
           Type
           <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
           <LayoutList className="w-3.5 h-3.5" />
           Status
           <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
        <div className="flex-1"></div>
        <button className="flex items-center justify-center w-8 h-8 bg-white border border-slate-200 rounded-md text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all">
            <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Data Grid */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
         {/* Table Header */}
         <div className="grid grid-cols-12 px-4 py-2.5 bg-slate-50/50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider sticky top-0">
            <div className="col-span-4 flex items-center">Name</div>
            <div className="col-span-2 flex items-center">Strategy</div>
            <div className="col-span-2 flex items-center">Target</div>
            <div className="col-span-2 flex items-center">Schedule</div>
            <div className="col-span-2 flex items-center justify-end">Status</div>
         </div>

         {/* Table Body */}
         <div className="divide-y divide-slate-100">
            {campaigns.map((campaign, i) => (
               <div 
                  key={campaign.id} 
                  onClick={() => setSelectedCampaign(campaign)}
                  className="grid grid-cols-12 px-4 py-3 hover:bg-sky-50/30 transition-colors cursor-pointer group items-center animate-enter" 
                  style={{ animationDelay: `${i * 30}ms` }}
               >
                  {/* Name Column */}
                  <div className="col-span-4 flex items-center gap-3">
                     <div className={`w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${
                        campaign.type === 'AI-Pilot' 
                        ? 'bg-blue-50 border-blue-100 text-blue-600' 
                        : 'bg-white border-slate-200 text-slate-400'
                     }`}>
                        {campaign.type === 'AI-Pilot' ? <Bot className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                     </div>
                     <div>
                        <span className="text-[13px] font-medium text-slate-900 block group-hover:text-blue-700 transition-colors">{campaign.name}</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                           via {campaign.channel}
                        </span>
                     </div>
                  </div>
                  
                  {/* Type Column */}
                  <div className="col-span-2">
                     <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                        campaign.type === 'AI-Pilot' 
                        ? 'bg-sky-50 text-sky-700 border-sky-100' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                     }`}>
                        {campaign.type === 'Manual' ? 'One-off' : 'Auto-Pilot'}
                     </span>
                  </div>

                  {/* Target Column */}
                  <div className="col-span-2 text-[13px] text-slate-600 font-medium flex items-center gap-1.5">
                     <Target className="w-3 h-3 text-slate-400" />
                     {campaign.target}
                  </div>
                  
                  {/* Schedule Column */}
                  <div className="col-span-2 flex items-center gap-2 text-[13px] text-slate-500 tabular-nums font-medium">
                     <Calendar className="w-3.5 h-3.5 text-slate-400" />
                     {campaign.date}
                  </div>
                  
                  {/* Status Column */}
                  <div className="col-span-2 flex justify-end">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        campaign.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                        campaign.status === 'Draft' ? 'bg-slate-50 text-slate-600 border-slate-200' : 
                        campaign.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                     }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                           campaign.status === 'Active' ? 'bg-emerald-500' : 
                           campaign.status === 'Draft' ? 'bg-slate-400' : 
                           campaign.status === 'Scheduled' ? 'bg-blue-500' :
                           'bg-amber-500'
                        }`}></span>
                        {campaign.status}
                     </span>
                  </div>
               </div>
            ))}
         </div>
         {/* Pagination / Footer */}
         <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50/30 flex items-center justify-between sticky bottom-0 backdrop-blur-sm">
            <span className="text-[11px] text-slate-500 font-medium">Showing {campaigns.length} campaigns</span>
            <div className="flex gap-2">
               <button className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 rounded transition-all">Previous</button>
               <button className="px-2 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-200 rounded transition-all">Next</button>
            </div>
         </div>
      </div>
    </div>
  );

  const renderGlobalSettings = () => (
    <div className="max-w-3xl mx-auto space-y-8 animate-enter">
       {/* Intro */}
       <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex gap-3">
          <Shield className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
             <h4 className="text-[13px] font-semibold text-blue-900">Global Safety Guardrails (3.4.1)</h4>
             <p className="text-[12px] text-blue-800/80 mt-1 leading-relaxed">
                These settings apply to both Manual and AI-Pilot campaigns to ensure simulations remain productive and non-disruptive.
             </p>
          </div>
       </div>

       <div className="space-y-6">
          {/* Frequency */}
          <div className="bg-white border border-slate-200 rounded-md p-6">
             <h3 className="text-[14px] font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" /> Frequency Caps
             </h3>
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Max Simulations per User / Month</label>
                   <select className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all">
                      <option>1 Simulation</option>
                      <option selected>2 Simulations</option>
                      <option>4 Simulations</option>
                      <option>Unlimited (Aggressive)</option>
                   </select>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Simultaneous Campaigns</label>
                   <input type="number" value="3" className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-[13px] text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
             </div>
          </div>

          {/* Channels */}
          <div className="bg-white border border-slate-200 rounded-md p-6">
             <h3 className="text-[14px] font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-400" /> Allowed Channels
             </h3>
             <div className="space-y-3">
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors group">
                   <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-[13px] font-medium text-slate-900">Corporate Email</span>
                   </div>
                   <div className="w-9 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                   </div>
                </label>
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors group">
                   <div className="flex items-center gap-3">
                      <MessageSquare className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-[13px] font-medium text-slate-900">Slack / Teams Integration</span>
                   </div>
                   <div className="w-9 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                   </div>
                </label>
                <label className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer transition-colors group">
                   <div className="flex items-center gap-3">
                      <Smartphone className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-colors" />
                      <span className="text-[13px] font-medium text-slate-900">SMS (Smishing)</span>
                   </div>
                   <div className="w-9 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                   </div>
                </label>
             </div>
          </div>

          {/* Restrictions */}
          <div className="bg-white border border-slate-200 rounded-md p-6">
             <h3 className="text-[14px] font-semibold text-slate-900 mb-5 flex items-center gap-2">
                <Ban className="w-4 h-4 text-slate-400" /> Content Restrictions
             </h3>
             <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                   {['Health Records', 'Layoffs / HR', 'Political Content', 'Religious'].map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 border border-slate-200 rounded text-[12px] font-medium text-slate-700">
                         {tag} <X className="w-3 h-3 cursor-pointer hover:text-rose-500" />
                      </span>
                   ))}
                   <button className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-dashed border-slate-300 rounded text-[12px] font-medium text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors">
                      <Plus className="w-3 h-3" /> Add Topic
                   </button>
                </div>
                <div className="flex items-center gap-2 pt-2">
                   <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                   <span className="text-[13px] text-slate-700">Restrict simulations to business hours (09:00 - 18:00 Local)</span>
                </div>
             </div>
          </div>
          
          <div className="flex justify-end pt-4">
             <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all">
                Save Global Settings
             </button>
          </div>
       </div>
    </div>
  );

  const renderCreationModal = () => {
     if (!isModalOpen) return null;

     return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
           
           <div className="relative bg-white rounded-lg shadow-modal w-full max-w-3xl overflow-hidden ring-1 ring-black/5 animate-slide-up flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                 <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">New Campaign Configuration</h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">Select your strategy (3.4.2 or 3.4.3)</p>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                 {/* Step 1: Mode Selection */}
                 {creationMode === 'select' && (
                    <div className="p-8">
                       <div className="grid grid-cols-2 gap-6">
                          {/* Manual Option */}
                          <button 
                             onClick={() => setCreationMode('manual')}
                             className="flex flex-col items-start p-6 rounded-lg border border-slate-200 hover:border-blue-600 hover:ring-1 hover:ring-blue-600 bg-white hover:bg-blue-50/10 transition-all group text-left h-full"
                          >
                             <div className="w-10 h-10 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                                <SlidersHorizontal className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                             </div>
                             <h4 className="text-[14px] font-semibold text-slate-900 mb-2">Manual Mode (3.4.2)</h4>
                             <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                                Design specific, one-off campaigns. You control the exact template, target group, and launch time.
                             </p>
                             <ul className="space-y-2 mt-auto">
                                <li className="text-[11px] text-slate-600 flex items-center gap-2">
                                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Granular Control
                                </li>
                                <li className="text-[11px] text-slate-600 flex items-center gap-2">
                                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> A/B Testing
                                </li>
                             </ul>
                          </button>

                          {/* AI Auto Option */}
                          <button 
                             onClick={() => setCreationMode('auto')}
                             className="flex flex-col items-start p-6 rounded-lg border border-slate-200 hover:border-blue-600 hover:ring-1 hover:ring-blue-600 bg-gradient-to-b from-white to-blue-50/20 transition-all group text-left h-full relative overflow-hidden"
                          >
                             <div className="absolute top-0 right-0 p-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[10px] font-bold border border-sky-200 uppercase tracking-wide">Recommended</span>
                             </div>
                             <div className="w-10 h-10 rounded-md bg-blue-100 border border-blue-200 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <Bot className="w-5 h-5 text-blue-600 group-hover:text-white" />
                             </div>
                             <h4 className="text-[14px] font-semibold text-slate-900 mb-2">AI Auto-Pilot (3.4.3)</h4>
                             <p className="text-[12px] text-slate-500 leading-relaxed mb-4">
                                Define the objectives and intensity. Our AI engine continuously plans and launches personalized simulations.
                             </p>
                             <ul className="space-y-2 mt-auto">
                                <li className="text-[11px] text-slate-600 flex items-center gap-2">
                                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Dynamic Planning
                                </li>
                                <li className="text-[11px] text-slate-600 flex items-center gap-2">
                                   <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Context Aware
                                </li>
                             </ul>
                          </button>
                       </div>
                    </div>
                 )}

                 {/* Manual Form */}
                 {creationMode === 'manual' && (
                    <div className="p-6 space-y-6 animate-slide-up">
                       <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Campaign Name</label>
                          <input 
                            type="text" 
                            value={manualForm.name} 
                            onChange={(e) => setManualForm({...manualForm, name: e.target.value})}
                            placeholder="e.g. Finance Dept - Invoice Fraud" 
                            className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                           />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-5">
                          <div className="space-y-1.5">
                             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Target Group</label>
                             <select 
                                value={manualForm.target}
                                onChange={(e) => setManualForm({...manualForm, target: e.target.value})}
                                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                             >
                                <option>All Employees</option>
                                <option>Finance Team</option>
                                <option>IT Administrators</option>
                                <option>Executives</option>
                             </select>
                          </div>
                          <div className="space-y-1.5">
                             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Attack Vector</label>
                             <select 
                                value={manualForm.channel}
                                onChange={(e) => setManualForm({...manualForm, channel: e.target.value})}
                                className="w-full h-9 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                             >
                                <option value="Email">Phishing (Email)</option>
                                <option value="SMS">Smishing (SMS)</option>
                                <option value="Contextual">Spear Phishing (Contextual)</option>
                             </select>
                          </div>
                       </div>

                       <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Template Selection</label>
                          <div className="grid grid-cols-3 gap-3">
                             {['Fake Invoice', 'Password Reset', 'Urgent CEO Request'].map(t => (
                                <div key={t} className="border border-slate-200 rounded-md p-3 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all text-center group">
                                   <div className="w-full h-16 bg-slate-100 rounded mb-2 group-hover:bg-white transition-colors"></div>
                                   <span className="text-[11px] font-medium text-slate-700 group-hover:text-blue-700">{t}</span>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 )}

                 {/* AI Form */}
                 {creationMode === 'auto' && (
                    <div className="p-6 space-y-8 animate-slide-up">
                       <div className="bg-sky-50 border border-sky-100 rounded-md p-4 flex gap-3">
                          <Zap className="w-5 h-5 text-sky-600 shrink-0" />
                          <p className="text-[12px] text-sky-800 leading-relaxed">
                             You are configuring the <strong>Rules of Engagement</strong>. The AI will automatically generate, schedule, and adapt campaigns within these bounds.
                          </p>
                       </div>

                       <div className="space-y-6">
                          <div className="space-y-3">
                             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Program Objective</label>
                             <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/30 transition-colors">
                                   <input 
                                    type="radio" 
                                    name="objective" 
                                    checked={aiObjective === 'General Awareness'}
                                    onChange={() => setAiObjective('General Awareness')}
                                    className="mt-1 text-blue-600 focus:ring-blue-500" 
                                   />
                                   <div>
                                      <span className="text-[13px] font-semibold text-slate-900 block">General Awareness</span>
                                      <span className="text-[11px] text-slate-500">Broad coverage of common threats. Good for baseline.</span>
                                   </div>
                                </label>
                                <label className="flex items-start gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:bg-slate-50 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50/30 transition-colors">
                                   <input 
                                    type="radio" 
                                    name="objective" 
                                    checked={aiObjective === 'Targeted Fraud'}
                                    onChange={() => setAiObjective('Targeted Fraud')}
                                    className="mt-1 text-blue-600 focus:ring-blue-500" 
                                   />
                                   <div>
                                      <span className="text-[13px] font-semibold text-slate-900 block">Targeted Fraud Prevention</span>
                                      <span className="text-[11px] text-slate-500">Focus on Finance/Execs with high-sophistication attacks.</span>
                                   </div>
                                </label>
                             </div>
                          </div>

                          <div className="space-y-4">
                             <div className="flex justify-between">
                                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Campaign Intensity</label>
                                <span className="text-[11px] font-medium text-blue-600">Medium (Recommended)</span>
                             </div>
                             <input type="range" className="w-full accent-blue-600" />
                             <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Passive</span>
                                <span>Aggressive</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center shrink-0">
                 {creationMode !== 'select' ? (
                    <button onClick={() => setCreationMode('select')} className="text-[13px] font-medium text-slate-500 hover:text-slate-800">Back</button>
                 ) : <div></div>}
                 
                 {creationMode === 'select' ? (
                    <span className="text-[11px] text-slate-400">Select a strategy to continue</span>
                 ) : (
                    <button 
                       onClick={handleLaunch}
                       className="bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all flex items-center gap-2"
                    >
                       {creationMode === 'manual' ? 'Launch Campaign' : 'Activate Auto-Pilot'} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                 )}
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-full bg-dot-pattern pb-12">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200 px-8 pt-6 sticky top-0 z-20 shadow-sm">
         <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Attack Simulation</span>
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Campaigns Engine</h1>
               </div>
               <button 
                  onClick={() => { setCreationMode('select'); setIsModalOpen(true); }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm hover:shadow transition-all"
               >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Campaign</span>
               </button>
            </div>

            {/* Navigation Tabs (Attio Style) */}
            <div className="flex gap-6">
               <button 
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 text-[13px] font-medium transition-all border-b-2 ${
                     activeTab === 'overview' 
                     ? 'text-blue-600 border-blue-600' 
                     : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`}
               >
                  Active Campaigns
               </button>
               <button 
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 text-[13px] font-medium transition-all border-b-2 ${
                     activeTab === 'settings' 
                     ? 'text-blue-600 border-blue-600' 
                     : 'text-slate-500 border-transparent hover:text-slate-800'
                  }`}
               >
                  Global Settings (3.4.1)
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8">
         {activeTab === 'overview' ? renderOverview() : renderGlobalSettings()}
      </div>

      {renderCreationModal()}
      {renderDetailDrawer()}
    </div>
  );
};

export default Campaigns;
