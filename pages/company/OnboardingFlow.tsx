import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Check, 
  ArrowRight, 
  Shield, 
  Users, 
  Database, 
  Loader2, 
  Mail, 
  FileText,
  CheckCircle2,
  Globe,
  Lock,
  Plus,
  Trash2,
  MapPin,
  Briefcase,
  AlertTriangle,
  Server,
  Eye,
  EyeOff,
  FileSpreadsheet,
  User,
  LayoutGrid,
  Sliders
} from 'lucide-react';
import { Select } from '../../components/ui/Select';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  
  // Step 1 State
  const [importMethod, setImportMethod] = useState<'idp' | 'csv' | 'manual' | null>(null);
  const [manualEmails, setManualEmails] = useState('');

  // Step 2 State (Organization)
  const [importedUsers] = useState([
    { name: 'Sarah Connor', email: 'sarah.c@acme.com', dept: 'Finance', role: 'CFO' },
    { name: 'John Smith', email: 'john.s@acme.com', dept: 'IT Admins', role: 'SysAdmin' },
    { name: 'Emily Chen', email: 'emily.c@acme.com', dept: 'Sales', role: 'Account Exec' },
    { name: 'Michael Wong', email: 'michael.w@acme.com', dept: 'New York HQ', role: 'Director' },
    { name: 'David Miller', email: 'david.m@acme.com', dept: 'Finance', role: 'Controller' },
    { name: 'Jessica Day', email: 'jess.d@acme.com', dept: 'Remote Workers', role: 'Associate' },
    { name: 'Robert Fox', email: 'rob.f@acme.com', dept: 'IT', role: 'Helpdesk' },
    { name: 'Lisa Wang', email: 'lisa.w@acme.com', dept: 'Sales', role: 'VP Sales' },
  ]);

  const [groups, setGroups] = useState([
    { id: 'g1', name: 'Finance', type: 'Department', count: 12, risk: 'High' },
    { id: 'g2', name: 'IT Admins', type: 'Function', count: 5, risk: 'Critical' },
    { id: 'g3', name: 'New York HQ', type: 'Location', count: 85, risk: 'Medium' },
    { id: 'g4', name: 'Remote Workers', type: 'Location', count: 22, risk: 'High' },
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupType, setNewGroupType] = useState('Function');

  // Step 3 State (Context Intelligence)
  const [emailLevel, setEmailLevel] = useState<'level1' | 'level2'>('level1');
  const [erpConnection, setErpConnection] = useState<'none' | 'api' | 'csv'>('none');

  // Step 4 State (Baseline)
  const [campaignConfig, setCampaignConfig] = useState({
    name: 'Baseline Risk Assessment',
    exclusion: 'None',
    channels: 'Email Only'
  });

  // Mock Sync Effect
  useEffect(() => {
    if (isSyncing) {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSyncing(false);
            setStep(2); // Move to next step
            return 100;
          }
          return prev + 5; // Speed of sync
        });
      }, 80); // Duration
      return () => clearInterval(interval);
    }
  }, [isSyncing]);

  const handleStartImport = (method: 'idp' | 'csv' | 'manual') => {
    setImportMethod(method);
    if (method === 'manual' && !manualEmails) return; // Don't start if empty
    setIsSyncing(true);
    setSyncProgress(0);
  };

  const handleAddGroup = () => {
      if (!newGroupName) return;
      const newGroup = {
          id: `g${groups.length + 1}`,
          name: newGroupName,
          type: newGroupType,
          count: 0,
          risk: 'Low' // Default for new groups
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
  };

  const handleComplete = () => {
     navigate('/company');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 flex flex-col">
      {/* Header - Cleaner, Attio Style */}
      <div className="h-16 border-b border-slate-200 flex items-center px-8 shrink-0 bg-white sticky top-0 z-10 justify-between">
         <div className="flex items-center gap-3">
            {/* Telefónica Logo Small */}
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm">
                 <div className="grid grid-cols-3 gap-0.5">
                     <div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div>
                     <div className="w-1 h-1 bg-transparent"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-transparent"></div>
                     <div className="w-1 h-1 bg-transparent"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-transparent"></div>
                 </div>
            </div>
            <div>
               <span className="font-bold text-sm tracking-tight text-slate-900 block leading-none">RiskGuard HQ</span>
               <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Telefónica Tech</span>
            </div>
         </div>
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
               <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Step {step} of 5</span>
               <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-500 ease-out" style={{ width: `${(step / 5) * 100}%` }}></div>
               </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8 bg-dot-pattern overflow-y-auto">
         <div className="w-full max-w-5xl animate-enter my-auto">
            
            {/* Step 1: Integration Strategy */}
            {step === 1 && (
               <div className="space-y-10">
                  <div className="text-center max-w-xl mx-auto">
                     <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Connect your workforce</h1>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        Import your employee directory to personalize simulations. 
                        Connecting your Identity Provider ensures data stays up-to-date.
                     </p>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                     {/* Option 1: M365 / Google */}
                     <div 
                        onClick={() => handleStartImport('idp')}
                        className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:ring-1 hover:ring-blue-500 hover:shadow-md transition-all relative group flex flex-col h-64"
                     >
                        <div className="absolute top-4 right-4">
                           <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Recommended</span>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                           <Globe className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-[14px] font-bold text-slate-900 mb-2">Microsoft 365 / Google</h3>
                        <p className="text-[12px] text-slate-500 mb-6 leading-relaxed">
                           Automatically sync users, departments, and groups via Azure AD or Google Workspace. Supports SSO.
                        </p>
                        <div className="mt-auto">
                           <span className="text-[12px] font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                              Connect via OAuth <ArrowRight className="w-3.5 h-3.5" />
                           </span>
                        </div>
                     </div>

                     {/* Option 2: CSV Upload */}
                     <div 
                        onClick={() => handleStartImport('csv')}
                        className="bg-white border border-slate-200 rounded-xl p-6 cursor-pointer hover:border-slate-400 hover:shadow-md transition-all group flex flex-col h-64"
                     >
                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors">
                           <FileText className="w-6 h-6 text-slate-500" />
                        </div>
                        <h3 className="text-[14px] font-bold text-slate-900 mb-2">Upload CSV</h3>
                        <p className="text-[12px] text-slate-500 mb-6 leading-relaxed">
                           Manually upload a list of employees using our standard template. Good for pilots or legacy systems.
                        </p>
                        <div className="mt-auto">
                            <span className="text-[12px] font-medium text-slate-600 flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                               Select File
                            </span>
                        </div>
                     </div>

                     {/* Option 3: Manual Invite */}
                     <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-slate-400 hover:shadow-md transition-all group flex flex-col h-64">
                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-slate-100 transition-colors">
                           <Mail className="w-6 h-6 text-slate-500" />
                        </div>
                        <h3 className="text-[14px] font-bold text-slate-900 mb-2">Manual Invite</h3>
                        <div className="flex-1 mb-4 flex flex-col">
                            <textarea 
                                className="w-full flex-1 p-2 text-[11px] border border-slate-200 rounded-md resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-slate-600 placeholder:text-slate-300"
                                placeholder="jane@acme.com, bob@acme.com..."
                                value={manualEmails}
                                onChange={(e) => setManualEmails(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mt-auto">
                             <button 
                                onClick={() => handleStartImport('manual')}
                                disabled={!manualEmails}
                                className="text-[12px] font-medium text-slate-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-slate-600 transition-colors"
                             >
                                Send Invites
                             </button>
                        </div>
                     </div>
                  </div>

                  {/* Syncing Overlay */}
                  {isSyncing && (
                     <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fade-in">
                        <div className="w-72 space-y-5 text-center">
                           <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                                <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                           </div>
                           <div>
                                <h3 className="text-[15px] font-bold text-slate-900">
                                    {importMethod === 'idp' ? 'Syncing Directory' : 'Processing Data'}
                                </h3>
                                <p className="text-[13px] text-slate-500 mt-1">
                                    {importMethod === 'idp' ? 'Connecting to Azure AD' : 'Validating entries'} and structuring groups...
                                </p>
                           </div>
                           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-600 transition-all duration-100 ease-linear" style={{ width: `${syncProgress}%` }}></div>
                           </div>
                        </div>
                     </div>
                  )}
               </div>
            )}

            {/* Step 2: Organize & Groups */}
            {step === 2 && (
               <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                     <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-5 h-5" />
                     </div>
                     <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Organization structure</h1>
                     <p className="text-slate-500 text-sm">
                        We detected <strong className="text-slate-900">124 employees</strong>. Review the auto-detected groups or create custom segments for risk policies.
                     </p>
                  </div>

                  <div className="grid grid-cols-12 gap-8 max-w-6xl mx-auto">
                      {/* Left: Employee Preview */}
                      <div className="col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-[500px]">
                         <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Imported Users</span>
                            <span className="text-[11px] text-slate-400 font-medium bg-white border border-slate-200 px-2 py-0.5 rounded">124 Total</span>
                         </div>
                         <div className="flex-1 overflow-y-auto p-1 space-y-0.5">
                            {importedUsers.map((u, i) => (
                               <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 rounded-md transition-colors group cursor-default border border-transparent hover:border-slate-100">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600 group-hover:bg-white group-hover:shadow-sm transition-all border border-slate-200">
                                        {u.name.substring(0,2).toUpperCase()}
                                     </div>
                                     <div>
                                        <p className="text-[13px] font-medium text-slate-900">{u.name}</p>
                                        <p className="text-[11px] text-slate-500">{u.email}</p>
                                     </div>
                                  </div>
                                  <span className="inline-flex items-center px-2 py-1 rounded bg-slate-50 text-slate-600 text-[10px] font-medium border border-slate-200 group-hover:border-slate-300">
                                    {u.dept}
                                  </span>
                               </div>
                            ))}
                         </div>
                      </div>

                      {/* Right: Group Management */}
                      <div className="col-span-5 space-y-4">
                          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm h-[340px] flex flex-col">
                              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Risk Groups</span>
                                <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                    <Sliders className="w-3 h-3" /> Auto-Detect
                                </button>
                              </div>
                              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                                  {groups.map(g => (
                                      <div key={g.id} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 transition-all group shadow-sm">
                                          <div className="flex justify-between items-start mb-2">
                                              <div className="flex items-center gap-2">
                                                  {g.type === 'Department' && <Briefcase className="w-3.5 h-3.5 text-slate-400" />}
                                                  {g.type === 'Location' && <MapPin className="w-3.5 h-3.5 text-slate-400" />}
                                                  {g.type === 'Function' && <Shield className="w-3.5 h-3.5 text-slate-400" />}
                                                  <span className="text-[13px] font-semibold text-slate-900">{g.name}</span>
                                              </div>
                                              <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                                                  g.risk === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                                                  g.risk === 'Critical' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                                                  g.risk === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                  'bg-slate-50 text-slate-500 border-slate-200'
                                              }`}>{g.risk} Risk</span>
                                          </div>
                                          <p className="text-[11px] text-slate-500 flex items-center gap-1 ml-6">
                                              {g.type} • <Users className="w-3 h-3" /> {g.count} Members
                                          </p>
                                      </div>
                                  ))}
                              </div>
                          </div>

                          {/* Add Group Form */}
                          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                              <div className="flex items-center gap-2 mb-3">
                                  <Plus className="w-3.5 h-3.5 text-slate-400" />
                                  <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Create Custom Group</h4>
                              </div>
                              <div className="space-y-3">
                                  <input 
                                    type="text" 
                                    placeholder="Group Name (e.g. Contractors)" 
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    className="w-full h-9 px-3 text-[13px] border border-slate-200 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                                  />
                                  <div className="flex gap-2">
                                      <div className="flex-1">
                                          <Select
                                              value={newGroupType}
                                              onChange={setNewGroupType}
                                              options={['Function', 'Department', 'Location']}
                                              className="w-full"
                                          />
                                      </div>
                                      <button 
                                        onClick={handleAddGroup}
                                        disabled={!newGroupName}
                                        className="bg-slate-900 text-white w-10 h-10 rounded-md flex items-center justify-center hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:hover:bg-slate-900"
                                      >
                                          <ArrowRight className="w-4 h-4" />
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="flex justify-center pt-6 gap-4">
                     <button onClick={() => setStep(1)} className="text-slate-500 text-[13px] font-medium hover:text-slate-800 px-4 py-2">Back</button>
                     <button 
                        onClick={() => setStep(3)}
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md shadow-blue-100"
                     >
                        Confirm Structure <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            )}

            {/* Step 3: Deep context intelligence */}
            {step === 3 && (
                <div className="space-y-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Deep context intelligence</h1>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Enhance simulation realism by connecting business data. 
                            Choose how deep the AI should analyze for personalization.
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
                        {/* Left: Email Analysis */}
                        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900">Email Analysis Depth</h3>
                                    <p className="text-[11px] text-slate-500">Define AI access limits for inbox integration.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4 flex-1">
                                {/* Level 1 Option */}
                                <div 
                                    onClick={() => setEmailLevel('level1')}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                                        emailLevel === 'level1' 
                                        ? 'border-blue-600 bg-blue-50/20 ring-1 ring-blue-600 shadow-sm' 
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex justify-between mb-2 items-center">
                                        <span className="text-[13px] font-bold text-slate-900">Level 1: Metadata Only</span>
                                        {emailLevel === 'level1' && <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                                    </div>
                                    <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                                        AI reads <strong>Sender</strong>, <strong>Subject</strong>, and <strong>Timestamp</strong>. 
                                        Used to map vendor relationships. 
                                        <span className="block mt-1 font-semibold text-emerald-600 flex items-center gap-1"><Shield className="w-3 h-3" /> Body content is never accessed.</span>
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] border border-slate-200 font-medium">Safe Default</span>
                                    </div>
                                </div>

                                {/* Level 2 Option */}
                                <div 
                                    onClick={() => setEmailLevel('level2')}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                                        emailLevel === 'level2' 
                                        ? 'border-amber-500 bg-amber-50/20 ring-1 ring-amber-500 shadow-sm' 
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="flex justify-between mb-2 items-center">
                                        <span className="text-[13px] font-bold text-slate-900">Level 2: Content Patterns</span>
                                        {emailLevel === 'level2' && <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                                    </div>
                                    <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
                                        AI analyzes snippets of <strong>Business Emails</strong> to learn tone and vocabulary. 
                                        Enables highly realistic impersonation (CEO Fraud).
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] border border-amber-200 font-medium flex items-center gap-1">
                                            <Lock className="w-3 h-3" /> Requires Privacy Addendum
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Business Data */}
                        <div className="col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                                    <Database className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-slate-900">Business Data (ERP/CRM)</h3>
                                    <p className="text-[11px] text-slate-500">Connect high-value targets (Invoices, Deals).</p>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 mb-6">
                                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                                        Connecting data enables <strong>Contextual Spear Phishing</strong>:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2 text-[11px] text-slate-700">
                                            <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-slate-400"></div>
                                            <span>Fake invoices from <strong>actual vendors</strong>.</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-[11px] text-slate-700">
                                            <div className="mt-0.5 min-w-[4px] h-[4px] rounded-full bg-slate-400"></div>
                                            <span>Urgent document requests for <strong>active deals</strong>.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <div 
                                        onClick={() => setErpConnection(erpConnection === 'api' ? 'none' : 'api')}
                                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                                            erpConnection === 'api' ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600">
                                                <Server className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-slate-900">API Connect</p>
                                                <p className="text-[10px] text-slate-500">Real-time sync (OAuth/Key)</p>
                                            </div>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                            erpConnection === 'api' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                                        }`}>
                                            {erpConnection === 'api' && <Check className="w-3 h-3" />}
                                        </div>
                                    </div>

                                    <div 
                                        onClick={() => setErpConnection(erpConnection === 'csv' ? 'none' : 'csv')}
                                        className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                                            erpConnection === 'csv' ? 'border-emerald-500 bg-emerald-50/20 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-600">
                                                <FileSpreadsheet className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-[12px] font-bold text-slate-900">Secure Drop</p>
                                                <p className="text-[10px] text-slate-500">Weekly CSV upload</p>
                                            </div>
                                        </div>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                            erpConnection === 'csv' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 bg-white'
                                        }`}>
                                            {erpConnection === 'csv' && <Check className="w-3 h-3" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4 gap-4">
                        <button onClick={() => setStep(2)} className="text-slate-500 text-[13px] font-medium hover:text-slate-800 px-4 py-2">Back</button>
                        <button 
                            onClick={() => setStep(4)}
                            className="bg-blue-600 text-white px-8 py-2.5 rounded-lg text-[13px] font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-md shadow-blue-100"
                        >
                            Save Context Settings <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Baseline Config (Previously Step 3) */}
            {step === 4 && (
               <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto">
                     <h1 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Configure baseline assessment</h1>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        We'll launch a silent "Risk Snapshot" campaign to establish your organization's initial Human Risk Score.
                     </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-2xl mx-auto shadow-sm">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Campaign Name</label>
                           <input 
                              type="text" 
                              value={campaignConfig.name}
                              onChange={(e) => setCampaignConfig({...campaignConfig, name: e.target.value})}
                              className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <Select
                                 label="Channels"
                                 value={campaignConfig.channels}
                                 onChange={(val) => setCampaignConfig({...campaignConfig, channels: val})}
                                 options={['Email Only', 'Email + SMS']}
                              />
                           </div>
                           <div className="space-y-2">
                              <Select
                                 label="Exclude Groups"
                                 value={campaignConfig.exclusion}
                                 onChange={(val) => setCampaignConfig({...campaignConfig, exclusion: val})}
                                 options={['None', 'C-Level Executives', 'IT Admins', 'New Hires']}
                              />
                           </div>
                        </div>

                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg flex gap-3">
                           <Shield className="w-5 h-5 text-amber-600 shrink-0" />
                           <div>
                              <h4 className="text-[13px] font-bold text-amber-900">Silent Mode Active</h4>
                              <p className="text-[11px] text-amber-800 mt-1 leading-relaxed">
                                 This campaign will not trigger "You've been phished" training pages. It is purely for measurement. Training will be enabled in future campaigns.
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                        <button onClick={() => setStep(3)} className="text-[13px] font-medium text-slate-500 hover:text-slate-900">Back</button>
                        <button 
                           onClick={() => setStep(5)}
                           className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
                        >
                           Launch Snapshot <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* Step 5: Go Live (Previously Step 4) */}
            {step === 5 && (
               <div className="text-center max-w-md mx-auto space-y-6 animate-enter">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-blue-200 mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
                     <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">You're all set!</h1>
                  <p className="text-slate-500 text-sm leading-relaxed">
                     The <strong>Baseline Risk Assessment</strong> has been scheduled. Your dashboard is now live and collecting data.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-xl p-6 text-left space-y-3 shadow-sm">
                     <div className="flex items-center justify-between text-[13px]">
                        <span className="text-slate-500 font-medium">Tenant Status</span>
                        <span className="font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> Active</span>
                     </div>
                     <div className="flex items-center justify-between text-[13px]">
                        <span className="text-slate-500 font-medium">Employees</span>
                        <span className="font-bold text-slate-900">124</span>
                     </div>
                     <div className="flex items-center justify-between text-[13px]">
                        <span className="text-slate-500 font-medium">Intelligence</span>
                        <span className="font-bold text-slate-900">{emailLevel === 'level1' ? 'Basic' : 'Advanced'} + {erpConnection === 'none' ? 'No ERP' : 'ERP Sync'}</span>
                     </div>
                     <div className="flex items-center justify-between text-[13px]">
                        <span className="text-slate-500 font-medium">Next Report</span>
                        <span className="font-bold text-slate-900">7 Days</span>
                     </div>
                  </div>

                  <button 
                     onClick={handleComplete}
                     className="w-full py-3 bg-slate-900 text-white rounded-lg text-[14px] font-bold hover:bg-slate-800 transition-all shadow-lg"
                  >
                     Go to Dashboard
                  </button>
               </div>
            )}

         </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;