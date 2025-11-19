
import React, { useState } from 'react';
import { 
  Building, 
  Globe, 
  Shield, 
  Bell, 
  Database, 
  ToggleLeft, 
  ToggleRight,
  Save,
  CreditCard,
  Users,
  Lock
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'privacy' | 'notifications'>('general');

  const renderGeneral = () => (
    <div className="space-y-6 animate-enter">
       <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Company Name</label>
             <input type="text" defaultValue="Acme Corp" className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <div className="space-y-2">
             <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Industry Sector</label>
             <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option>Finance</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Manufacturing</option>
             </select>
          </div>
       </div>

       <div className="space-y-2">
          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Brand Color (Primary)</label>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-md bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"></div>
             <div className="w-10 h-10 rounded-md bg-emerald-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-emerald-600 transition-all"></div>
             <div className="w-10 h-10 rounded-md bg-violet-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-violet-600 transition-all"></div>
             <div className="w-10 h-10 rounded-md bg-rose-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-rose-600 transition-all"></div>
          </div>
       </div>

       <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[13px] font-bold text-slate-900 mb-4">Localization</h3>
          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Default Language</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900">
                   <option>English (US)</option>
                   <option>Spanish (ES)</option>
                   <option>French (FR)</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Timezone</label>
                <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900">
                   <option>UTC-05:00 Eastern Time</option>
                   <option>UTC+00:00 London</option>
                   <option>UTC+01:00 Paris</option>
                </select>
             </div>
          </div>
       </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6 animate-enter">
       <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex gap-3">
          <Database className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
             <h4 className="text-[13px] font-bold text-blue-900">Context Data Sync</h4>
             <p className="text-[12px] text-blue-800/80 mt-1 leading-relaxed">
                Connect your ERP and CRM to enable high-context spear phishing simulations (e.g., fake invoices from real vendors).
                Data is processed securely and minimized.
             </p>
          </div>
       </div>

       <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-bold">
                   M365
                </div>
                <div>
                   <h4 className="text-[13px] font-bold text-slate-900">Microsoft 365 / Azure AD</h4>
                   <p className="text-[12px] text-slate-500">User sync and directory access.</p>
                </div>
             </div>
             <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[12px] font-medium flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Connected
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-bold">
                   SAP
                </div>
                <div>
                   <h4 className="text-[13px] font-bold text-slate-900">SAP S/4HANA (ERP)</h4>
                   <p className="text-[12px] text-slate-500">Sync vendor lists and invoice schedules.</p>
                </div>
             </div>
             <button className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded text-[12px] font-medium hover:bg-slate-50 transition-colors">
                Connect
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-bold">
                   SF
                </div>
                <div>
                   <h4 className="text-[13px] font-bold text-slate-900">Salesforce (CRM)</h4>
                   <p className="text-[12px] text-slate-500">Sync high-value client contacts.</p>
                </div>
             </div>
             <button className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded text-[12px] font-medium hover:bg-slate-50 transition-colors">
                Connect
             </button>
          </div>
       </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6 animate-enter">
       <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
             <div>
                <h4 className="text-[13px] font-bold text-slate-900">Employee Anonymization</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Hide individual names in reports. Only show aggregate group data.</p>
             </div>
             <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1 shadow-sm" />
             </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
             <div>
                <h4 className="text-[13px] font-bold text-slate-900">Data Retention Period</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Automatically delete simulation data after X months.</p>
             </div>
             <select className="h-8 px-2 bg-slate-50 border border-slate-200 rounded text-[12px] font-medium">
                <option>12 Months</option>
                <option>24 Months</option>
                <option>Indefinite</option>
             </select>
          </div>
       </div>

       <div className="pt-6 border-t border-slate-100">
          <h3 className="text-[13px] font-bold text-slate-900 mb-4">Access Control</h3>
          <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
             <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <span className="text-[11px] font-semibold text-slate-500 uppercase">Admin Users</span>
                <button className="text-[11px] font-medium text-blue-600">Manage Roles</button>
             </div>
             <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">JD</div>
                      <div>
                         <p className="text-[13px] font-medium text-slate-900">Jane Doe</p>
                         <p className="text-[11px] text-slate-500">Super Admin</p>
                      </div>
                   </div>
                   <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Active</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-full bg-dot-pattern pb-12">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10">
         <div className="max-w-3xl mx-auto flex items-center justify-between">
             <div>
                <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Global Settings</h1>
                <p className="text-[13px] text-slate-500 mt-1">Manage your workspace configuration and policies.</p>
             </div>
             <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-slate-800 transition-colors shadow-sm">
                 <Save className="w-3.5 h-3.5" /> Save Changes
             </button>
         </div>
       </div>

       <div className="max-w-3xl mx-auto px-8 mt-8">
          <div className="flex gap-8 mb-8 border-b border-slate-200">
             <button 
                onClick={() => setActiveTab('general')}
                className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
                   activeTab === 'general' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
             >
                <Building className="w-4 h-4" /> General
             </button>
             <button 
                onClick={() => setActiveTab('integrations')}
                className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
                   activeTab === 'integrations' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
             >
                <Database className="w-4 h-4" /> Integrations
             </button>
             <button 
                onClick={() => setActiveTab('privacy')}
                className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
                   activeTab === 'privacy' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
             >
                <Shield className="w-4 h-4" /> Privacy & Security
             </button>
             <button 
                onClick={() => setActiveTab('notifications')}
                className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
                   activeTab === 'notifications' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
                }`}
             >
                <Bell className="w-4 h-4" /> Notifications
             </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
             {activeTab === 'general' && renderGeneral()}
             {activeTab === 'integrations' && renderIntegrations()}
             {activeTab === 'privacy' && renderPrivacy()}
             {activeTab === 'notifications' && <div className="text-center text-slate-500 py-10">Notification settings coming soon...</div>}
          </div>
       </div>
    </div>
  );
};

export default Settings;
