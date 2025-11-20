
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  GitBranch, 
  Plus, 
  ArrowRight, 
  Clock, 
  Save, 
  X, 
  Activity, 
  Zap, 
  CheckCircle2, 
  Trash2
} from 'lucide-react';
import { Select } from '../../components/ui/Select';

const initialRules = [
  { id: 1, name: 'Critical Risk Drop', trigger: 'Risk Score', condition: '< 50', action: 'Notify Broker + Trigger Audit', status: 'Active', runs: 12, lastRun: '2 mins ago' },
  { id: 2, name: 'Phishing Spike', trigger: 'Click Rate', condition: '> 15%', action: 'Launch Remediation Campaign', status: 'Active', runs: 5, lastRun: '1 day ago' },
  { id: 3, name: 'Renewal Upsell', trigger: 'Days to Renewal', condition: '< 90', action: 'Send Discount Offer', status: 'Paused', runs: 0, lastRun: '-' }
];

const executionLog = [
  { id: 101, rule: 'Critical Risk Drop', target: 'Acme Corp', time: 'Oct 24, 14:30', status: 'Success', outcome: 'Audit Triggered' },
  { id: 102, rule: 'Phishing Spike', target: 'FinServe Ltd', time: 'Oct 24, 09:15', status: 'Success', outcome: 'Campaign Launched' },
  { id: 103, rule: 'Critical Risk Drop', target: 'MediCare Plus', time: 'Oct 23, 16:45', status: 'Failed', outcome: 'API Timeout' },
  { id: 104, rule: 'Renewal Upsell', target: 'Global Logistics', time: 'Oct 22, 10:00', status: 'Success', outcome: 'Email Sent' }
];

const templates = [
  { title: "Churn Prevention", desc: "Detects low engagement and high risk scores prior to renewal.", icon: Activity },
  { title: "Rapid Response", desc: "Automatically isolates users who fail 3 consecutive simulations.", icon: Zap },
  { title: "Compliance Nudge", desc: "Reminds admins if training completion drops below 80%.", icon: CheckCircle2 }
];

const Automations: React.FC = () => {
  const [rules, setRules] = useState(initialRules);
  const [activeTab, setActiveTab] = useState<'rules' | 'history' | 'templates'>('rules');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  // Builder State
  const [newRule, setNewRule] = useState({ name: '', trigger: 'Risk Score', condition: '<', value: '', action: 'Notify Broker' });

  const handleToggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Paused' : 'Active' } : r));
  };

  const handleSaveRule = () => {
    const rule = {
        id: rules.length + 1,
        name: newRule.name || 'Untitled Rule',
        trigger: newRule.trigger,
        condition: `${newRule.condition} ${newRule.value}`,
        action: newRule.action,
        status: 'Active',
        runs: 0,
        lastRun: 'Just now'
    };
    setRules([...rules, rule]);
    setIsBuilderOpen(false);
  };

  const renderBuilderModal = () => {
    if (!isBuilderOpen) return null;
    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsBuilderOpen(false)} />
            <div className="relative bg-white rounded-lg shadow-modal w-full max-w-4xl overflow-hidden ring-1 ring-black/5 animate-slide-up flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                    <div>
                        <h3 className="text-[15px] font-semibold text-slate-900">Automation Logic Builder</h3>
                        <p className="text-[12px] text-slate-500 mt-0.5">Define IF/THEN logic for portfolio events</p>
                    </div>
                    <button onClick={() => setIsBuilderOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-8 space-y-8 overflow-y-auto bg-dot-pattern">
                    <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Rule Name</label>
                        <input 
                            type="text" 
                            placeholder="e.g. High Risk Remediation" 
                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={newRule.name}
                            onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                        />
                    </div>

                    {/* Visual Logic Flow */}
                    <div className="flex items-center gap-4">
                        {/* IF Block */}
                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-5 relative group hover:border-blue-300 transition-colors">
                            <div className="absolute -top-3 left-4 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                IF Trigger
                            </div>
                            <div className="space-y-3">
                                <Select
                                    label="Metric"
                                    value={newRule.trigger}
                                    onChange={(val) => setNewRule({...newRule, trigger: val})}
                                    options={['Risk Score', 'Phishing Rate', 'Days to Renewal', 'Training Completion']}
                                />
                                <div className="flex gap-2">
                                    <div className="w-24">
                                        <Select
                                            value={newRule.condition}
                                            onChange={(val) => setNewRule({...newRule, condition: val})}
                                            options={['<', '>', '=', 'Changes by']}
                                        />
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Value (e.g. 50)" 
                                        className="flex-1 h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                        value={newRule.value}
                                        onChange={(e) => setNewRule({...newRule, value: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <ArrowRight className="w-6 h-6 text-slate-300 shrink-0" />

                        {/* THEN Block */}
                        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-5 relative group hover:border-emerald-300 transition-colors">
                            <div className="absolute -top-3 left-4 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                                THEN Action
                            </div>
                            <div className="space-y-3">
                                <Select
                                    label="Execute"
                                    value={newRule.action}
                                    onChange={(val) => setNewRule({...newRule, action: val})}
                                    options={['Notify Broker', 'Trigger Audit', 'Send Discount Offer', 'Launch Campaign', 'Adjust Premium Factor']}
                                />
                                <div className="p-3 bg-white border border-slate-200 rounded-md">
                                    <p className="text-[11px] text-slate-500">
                                        Action will be logged in the Audit Trail and notified via email to the account manager.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                    <button onClick={() => setIsBuilderOpen(false)} className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900">Cancel</button>
                    <button onClick={handleSaveRule} className="px-4 py-2 bg-slate-900 text-white rounded-md text-[13px] font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
                        <Save className="w-3.5 h-3.5" /> Create Automation
                    </button>
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
          <div className="max-w-6xl mx-auto">
             <div className="flex items-center justify-between mb-6">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Portfolio Watchdog</span>
                   </div>
                   <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Automations Engine</h1>
                </div>
                <button 
                   onClick={() => setIsBuilderOpen(true)}
                   className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all"
                >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Rule</span>
                </button>
             </div>

             {/* Navigation Tabs */}
             <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                 <button 
                    onClick={() => setActiveTab('rules')}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'rules' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Active Rules
                 </button>
                 <button 
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'history' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Execution Log
                 </button>
                 <button 
                    onClick={() => setActiveTab('templates')}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'templates' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                 >
                    Library
                 </button>
             </div>
          </div>
       </div>

       <div className="max-w-6xl mx-auto px-8 mt-8">
           
           {/* Rules Tab */}
           {activeTab === 'rules' && (
               <div className="space-y-4 animate-enter">
                   {rules.map(rule => (
                       <div key={rule.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:border-blue-300 transition-all group">
                           <div className="flex items-center justify-between mb-4">
                               <div className="flex items-center gap-3">
                                   <div className="p-2 bg-blue-50 text-blue-600 rounded-md border border-blue-100">
                                       <GitBranch className="w-5 h-5" />
                                   </div>
                                   <div>
                                       <h3 className="text-[14px] font-bold text-slate-900">{rule.name}</h3>
                                       <p className="text-[11px] text-slate-500 flex items-center gap-2">
                                           Last run: {rule.lastRun} • Total runs: {rule.runs}
                                       </p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-4">
                                   <button onClick={() => handleToggleRule(rule.id)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                                       rule.status === 'Active' 
                                       ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                                       : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                                   }`}>
                                       <div className={`w-2 h-2 rounded-full ${rule.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                       {rule.status}
                                   </button>
                                   <button className="text-slate-300 hover:text-rose-500 transition-colors">
                                       <Trash2 className="w-4 h-4" />
                                   </button>
                               </div>
                           </div>
                           
                           <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded border border-slate-100 text-[12px] font-mono text-slate-700">
                               <span className="font-bold text-blue-600">IF</span>
                               <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{rule.trigger} {rule.condition}</span>
                               <span className="font-bold text-emerald-600">THEN</span>
                               <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{rule.action}</span>
                           </div>
                       </div>
                   ))}
               </div>
           )}

           {/* History Tab */}
           {activeTab === 'history' && (
               <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm animate-enter">
                   <table className="w-full text-left border-collapse">
                       <thead>
                           <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                               <th className="px-6 py-3">Timestamp</th>
                               <th className="px-6 py-3">Rule Name</th>
                               <th className="px-6 py-3">Target Entity</th>
                               <th className="px-6 py-3">Outcome</th>
                               <th className="px-6 py-3 text-right">Status</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 text-[13px]">
                           {executionLog.map(log => (
                               <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                                   <td className="px-6 py-3 font-mono text-slate-500 text-[11px]">{log.time}</td>
                                   <td className="px-6 py-3 font-medium text-slate-900">{log.rule}</td>
                                   <td className="px-6 py-3 text-slate-600">{log.target}</td>
                                   <td className="px-6 py-3 text-slate-600">{log.outcome}</td>
                                   <td className="px-6 py-3 text-right">
                                       <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                           log.status === 'Success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                                       }`}>
                                           {log.status === 'Success' ? <CheckCircle2 className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                           {log.status}
                                       </span>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
           )}

           {/* Templates Tab */}
           {activeTab === 'templates' && (
               <div className="grid grid-cols-3 gap-6 animate-enter">
                   {templates.map((tpl, i) => (
                       <div key={i} className="bg-white border border-slate-200 rounded-lg p-6 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group">
                           <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                               <tpl.icon className="w-5 h-5" />
                           </div>
                           <h3 className="text-[14px] font-bold text-slate-900 mb-2">{tpl.title}</h3>
                           <p className="text-[12px] text-slate-500 mb-4 leading-relaxed">{tpl.desc}</p>
                           <button className="w-full py-2 border border-slate-200 rounded-md text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                               Use Template
                           </button>
                       </div>
                   ))}
               </div>
           )}

       </div>

       {renderBuilderModal()}
    </div>
  );
};

export default Automations;
