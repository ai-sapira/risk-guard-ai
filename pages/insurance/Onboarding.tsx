
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  UserPlus, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  Shield, 
  Zap,
  FileText,
  Server,
  Globe,
  Users,
  Check,
  X,
  MoreHorizontal,
  AlertTriangle,
  Clock,
  Plus
} from 'lucide-react';

const pipelineClients = [
    { id: 1, name: 'Cobee', logo: 'https://logo.clearbit.com/cobee.io', stage: 'Technical Setup', status: 'Blocked', issue: 'DNS Validation Failed', time: '2d' },
    { id: 2, name: 'Wallbox', logo: 'https://logo.clearbit.com/wallbox.com', stage: 'User Sync', status: 'Active', issue: null, time: '4h' },
    { id: 3, name: 'Housfy', logo: 'https://logo.clearbit.com/housfy.com', stage: 'Policy Check', status: 'Active', issue: null, time: '10m' },
    { id: 4, name: 'Scalpers', logo: 'https://logo.clearbit.com/scalperscompany.com', stage: 'Live', status: 'Completed', issue: null, time: '1w' },
    { id: 5, name: 'Civitatis', logo: 'https://logo.clearbit.com/civitatis.com', stage: 'Policy Check', status: 'Pending', issue: null, time: '30m' },
    { id: 6, name: 'PcComponentes', logo: 'https://logo.clearbit.com/pccomponentes.com', stage: 'Technical Setup', status: 'Active', issue: null, time: '1d' },
    { id: 7, name: 'Typeform', logo: 'https://logo.clearbit.com/typeform.com', stage: 'User Sync', status: 'Warning', issue: 'Okta API Rate Limit', time: '2h' },
    { id: 8, name: 'Vicio', logo: 'https://logo.clearbit.com/ganasdevicio.com', stage: 'Technical Setup', status: 'Blocked', issue: 'SPF Record Missing', time: '3d' },
    { id: 9, name: 'PdPaola', logo: 'https://logo.clearbit.com/pdpaola.com', stage: 'Live', status: 'Completed', issue: null, time: '2w' },
    { id: 10, name: 'Freepik', logo: 'https://logo.clearbit.com/freepik.com', stage: 'User Sync', status: 'Active', issue: null, time: '1h' },
    { id: 11, name: 'Kave Home', logo: 'https://logo.clearbit.com/kavehome.com', stage: 'Policy Check', status: 'Active', issue: null, time: '5m' },
    { id: 12, name: 'Jeff', logo: 'https://logo.clearbit.com/wearejeff.com', stage: 'Technical Setup', status: 'Active', issue: null, time: '5h' }
];

const Onboarding: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProvision = () => {
    setIsProcessing(true);
    setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
    }, 2000);
  };

  const renderWizardModal = () => {
    if (!isWizardOpen) return null;
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsWizardOpen(false)} />
           <div className="relative bg-white rounded-lg shadow-modal w-full max-w-3xl overflow-hidden ring-1 ring-black/5 animate-slide-up flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                 <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">New Client Provisioning</h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">Add a new tenant linked to an insurance policy</p>
                 </div>
                 <button onClick={() => setIsWizardOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                 </button>
              </div>

              {/* Wizard Content */}
              <div className="p-8 overflow-y-auto">
                  {/* Steps Indicator */}
                  <div className="mb-8 flex items-center justify-between relative px-4">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
                      {[1, 2, 3].map(s => (
                          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors z-10 ${
                              step >= s ? 'bg-blue-600 text-white ring-4 ring-white' : 'bg-slate-200 text-slate-500 ring-4 ring-white'
                          }`}>
                              {step > s ? <Check className="w-5 h-5" /> : s}
                          </div>
                      ))}
                  </div>

                  {step === 1 && (
                      <div className="animate-enter">
                          <div className="space-y-6">
                              <div className="space-y-2">
                                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Policy ID / Contract #</label>
                                  <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="text" placeholder="POL-2023-XXXX" className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Company Legal Name</label>
                                  <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="text" placeholder="Acme Corp Ltd." className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                                  </div>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded border border-amber-100 text-[12px]">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>Ensure Policy ID matches the core underwriting system for automatic coverage validation.</span>
                              </div>
                          </div>
                          <div className="mt-8 flex justify-end">
                              <button onClick={() => setStep(2)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-blue-700 flex items-center gap-2">
                                  Verify & Continue <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                          </div>
                      </div>
                  )}

                  {step === 2 && (
                      <div className="animate-enter">
                          <div className="grid grid-cols-2 gap-6">
                              <div className="border-2 border-blue-600 bg-blue-50/30 rounded-lg p-5 cursor-pointer relative shadow-sm">
                                  <div className="absolute top-3 right-3">
                                      <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
                                  </div>
                                  <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600 mb-3">
                                    <Shield className="w-5 h-5" />
                                  </div>
                                  <h3 className="text-[14px] font-bold text-slate-900 mb-2">Standard SME</h3>
                                  <p className="text-[12px] text-slate-600 mb-4">Best for small businesses &lt; 500 employees.</p>
                                  <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Quarterly Phishing Sims</li>
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Basic Training Library</li>
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Email Support</li>
                                  </ul>
                              </div>
                              <div className="border border-slate-200 hover:border-blue-400 rounded-lg p-5 cursor-pointer bg-white transition-all opacity-70 hover:opacity-100 group">
                                  <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mb-3">
                                    <Zap className="w-5 h-5" />
                                  </div>
                                  <h3 className="text-[14px] font-bold text-slate-900 mb-2">Enterprise Defense</h3>
                                  <p className="text-[12px] text-slate-600 mb-4">For high-risk or regulated entities.</p>
                                  <ul className="space-y-2 text-[11px] text-slate-600 font-medium">
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-slate-400 group-hover:text-blue-500" /> Monthly AI Simulations</li>
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-slate-400 group-hover:text-blue-500" /> Full Compliance Hub</li>
                                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-slate-400 group-hover:text-blue-500" /> Dedicated CSM</li>
                                  </ul>
                              </div>
                          </div>
                          <div className="mt-8 flex justify-between">
                              <button onClick={() => setStep(1)} className="text-slate-500 text-[13px] font-medium hover:text-slate-800">Back</button>
                              <button onClick={() => setStep(3)} className="bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-blue-700 flex items-center gap-2">
                                  Confirm Blueprint <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                          </div>
                      </div>
                  )}

                  {step === 3 && (
                      <div className="animate-enter text-center">
                           <div className="bg-slate-50 border border-slate-200 rounded p-6 mb-8 text-left max-w-md mx-auto">
                              <h4 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Summary</h4>
                              <div className="flex justify-between text-[13px] mb-3">
                                  <span className="text-slate-500">Client Name</span>
                                  <span className="font-bold text-slate-900">Acme Corp Ltd.</span>
                              </div>
                              <div className="flex justify-between text-[13px] mb-3">
                                  <span className="text-slate-500">Policy ID</span>
                                  <span className="font-mono text-slate-900">POL-2023-9921</span>
                              </div>
                              <div className="flex justify-between text-[13px]">
                                  <span className="text-slate-500">Blueprint</span>
                                  <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">Standard SME</span>
                              </div>
                           </div>
                           <button 
                              onClick={handleProvision}
                              disabled={isProcessing}
                              className="w-full max-w-md mx-auto bg-emerald-600 text-white py-3 rounded-md text-[13px] font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                           >
                              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                              {isProcessing ? 'Provisioning Environment...' : 'Activate Tenant & Send Invites'}
                           </button>
                      </div>
                  )}

                  {step === 4 && (
                      <div className="animate-enter text-center py-8">
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50">
                              <Check className="w-8 h-8" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-900 mb-2">Tenant Live</h2>
                          <p className="text-sm text-slate-500 mb-8">Invitation email sent to admin. Dashboard access is now active.</p>
                          <button onClick={() => { setIsWizardOpen(false); setStep(1); }} className="text-blue-600 text-[13px] font-bold hover:underline">
                              Close Window
                          </button>
                      </div>
                  )}
              </div>
           </div>
        </div>,
        document.body
    );
  };

  return (
    <div className="min-h-full bg-dot-pattern pb-12 relative">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
             <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Deployment Ops</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Onboarding Pipeline</h1>
             </div>
             <button 
                onClick={() => setIsWizardOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all"
             >
                 <UserPlus className="w-3.5 h-3.5" /> New Client
             </button>
          </div>
       </div>

       <div className="max-w-6xl mx-auto px-8 mt-8">
           {/* Pipeline Dashboard */}
           <div className="grid grid-cols-4 gap-6">
               {['Policy Check', 'Technical Setup', 'User Sync', 'Live'].map((stage, i) => {
                   const clientsInStage = pipelineClients.filter(c => {
                       if (c.stage === stage) return true;
                       if (stage === 'Live' && c.status === 'Completed') return true;
                       return false;
                   });

                   return (
                       <div key={stage} className="flex flex-col h-full">
                           <div className={`pb-3 border-b-2 mb-4 flex justify-between items-center ${
                               i === 3 ? 'border-emerald-500 text-emerald-700' : 'border-blue-500 text-blue-700'
                           }`}>
                               <h3 className="text-[13px] font-bold uppercase tracking-wider">{stage}</h3>
                               <span className="text-[11px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-sm text-slate-500">
                                   {clientsInStage.length}
                               </span>
                           </div>
                           
                           <div className="space-y-3">
                               {clientsInStage.map(client => (
                                   <div key={client.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-blue-300 transition-all cursor-pointer group">
                                       <div className="flex justify-between items-start mb-3">
                                           <img 
                                                src={client.logo} 
                                                alt={client.name}
                                                className="w-8 h-8 rounded bg-white border border-slate-100 object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                }}
                                           />
                                           <div className="hidden w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                                               {client.name.substring(0, 2).toUpperCase()}
                                           </div>
                                           <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                                       </div>
                                       <h4 className="text-[14px] font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{client.name}</h4>
                                       <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-3">
                                            <Clock className="w-3 h-3" /> In stage: {client.time}
                                       </div>
                                       
                                       {/* Technical Health Indicators */}
                                       <div className="pt-3 border-t border-slate-100 flex gap-2">
                                           <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                               client.issue ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                                           }`} title="DNS Status">
                                               <Globe className="w-3 h-3" />
                                           </div>
                                           <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border bg-slate-50 text-slate-400 border-slate-100" title="AD Sync">
                                               <Users className="w-3 h-3" />
                                           </div>
                                           <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border bg-slate-50 text-slate-400 border-slate-100" title="SMTP">
                                               <Server className="w-3 h-3" />
                                           </div>
                                       </div>

                                       {client.issue && (
                                           <div className="mt-3 bg-rose-50 text-rose-700 text-[10px] font-medium px-2 py-1.5 rounded flex items-center gap-1.5">
                                               <AlertTriangle className="w-3 h-3" /> {client.issue}
                                           </div>
                                       )}
                                   </div>
                               ))}
                               <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-[12px] font-medium text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors flex items-center justify-center gap-1">
                                   <Plus className="w-3.5 h-3.5" /> Add Task
                               </button>
                           </div>
                       </div>
                   )
               })}
           </div>
       </div>

       {renderWizardModal()}
    </div>
  );
};

export default Onboarding;
