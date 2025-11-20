
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Building, 
  Globe, 
  Shield, 
  Bell, 
  Database, 
  Save,
  Users,
  Lock,
  Mail,
  Phone,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Check,
  Search,
  Filter,
  Crown,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Key,
  Clock,
  Activity,
  CreditCard,
  Settings as SettingsIcon,
  Info
} from 'lucide-react';
import { Select } from '../../components/ui/Select';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Pending' | 'Suspended';
  lastActive: string;
  avatar?: string;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'team'>('settings');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditMemberModalOpen, setIsEditMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Settings state
  const [settings, setSettings] = useState({
    organizationName: 'Telefónica Underwriting',
    region: 'Europe (Madrid)',
    language: 'Spanish (ES)',
    timezone: 'UTC+01:00 Madrid',
    dataRetention: '24 Months',
    autoProvisioning: true,
    riskThreshold: 'Medium',
    notificationEmail: 'security@telefonica.com',
    apiRateLimit: '1000/hour'
  });

  // Mock team members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'María González', email: 'maria.gonzalez@telefonica.com', role: 'Super Admin', status: 'Active', lastActive: '2 hours ago', avatar: undefined },
    { id: '2', name: 'Carlos Ruiz', email: 'carlos.ruiz@telefonica.com', role: 'Admin', status: 'Active', lastActive: '1 day ago', avatar: undefined },
    { id: '3', name: 'Ana Martínez', email: 'ana.martinez@telefonica.com', role: 'Analyst', status: 'Active', lastActive: '3 hours ago', avatar: undefined },
    { id: '4', name: 'David López', email: 'david.lopez@telefonica.com', role: 'Analyst', status: 'Active', lastActive: '5 hours ago', avatar: undefined },
    { id: '5', name: 'Laura Sánchez', email: 'laura.sanchez@telefonica.com', role: 'Viewer', status: 'Pending', lastActive: 'Never', avatar: undefined },
    { id: '6', name: 'Javier Fernández', email: 'javier.fernandez@telefonica.com', role: 'Admin', status: 'Active', lastActive: '30 min ago', avatar: undefined },
    { id: '7', name: 'Sofia Torres', email: 'sofia.torres@telefonica.com', role: 'Analyst', status: 'Suspended', lastActive: '2 weeks ago', avatar: undefined },
  ]);

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Super Admin': return <Crown className="w-4 h-4" />;
      case 'Admin': return <ShieldCheck className="w-4 h-4" />;
      case 'Analyst': return <UserCheck className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Admin': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Analyst': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const renderSettings = () => (
    <div className="space-y-8 animate-enter">
      {/* Organization Settings */}
      <div>
        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-600" /> Organization Configuration
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Organization Name</label>
              <input 
                type="text" 
                value={settings.organizationName}
                onChange={(e) => setSettings({...settings, organizationName: e.target.value})}
                className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            </div>
            <div>
              <Select 
                label="Region"
                value={settings.region}
                onChange={(val) => setSettings({...settings, region: val})}
                options={['Europe (Madrid)', 'Europe (London)', 'Americas (Miami)', 'Asia Pacific (Singapore)']}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Select
                label="Default Language"
                value={settings.language}
                onChange={(val) => setSettings({...settings, language: val})}
                options={['Spanish (ES)', 'English (US)', 'English (UK)', 'Portuguese (PT)', 'French (FR)']}
              />
            </div>
            <div>
              <Select
                label="Timezone"
                value={settings.timezone}
                onChange={(val) => setSettings({...settings, timezone: val})}
                options={['UTC+01:00 Madrid', 'UTC+00:00 London', 'UTC-05:00 Miami', 'UTC+08:00 Singapore']}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" /> Security & Compliance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-md">
            <div className="flex-1">
              <h4 className="text-[13px] font-bold text-slate-900">Auto-Provisioning</h4>
              <p className="text-[12px] text-slate-500 mt-0.5">Automatically create tenant environments when policies are issued.</p>
            </div>
            <button
              onClick={() => setSettings({...settings, autoProvisioning: !settings.autoProvisioning})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoProvisioning ? 'bg-blue-600' : 'bg-slate-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm ${
                settings.autoProvisioning ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Select
                label="Risk Threshold Alert"
                value={settings.riskThreshold}
                onChange={(val) => setSettings({...settings, riskThreshold: val})}
                options={['Low', 'Medium', 'High', 'Critical']}
              />
            </div>
            <div>
              <Select
                label="Data Retention Period"
                value={settings.dataRetention}
                onChange={(val) => setSettings({...settings, dataRetention: val})}
                options={['12 Months', '24 Months', '36 Months', 'Indefinite']}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex gap-3">
            <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[13px] font-bold text-blue-900">GDPR Compliance</h4>
              <p className="text-[12px] text-blue-800/80 mt-1 leading-relaxed">
                All client data is processed in accordance with GDPR regulations. Data minimization and right-to-deletion policies are automatically enforced.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* API & Integrations */}
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-blue-600" /> API & Integrations
        </h3>
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">API Rate Limit</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Maximum API requests per hour</p>
              </div>
              <div className="w-48">
                <Select
                  value={settings.apiRateLimit}
                  onChange={(val) => setSettings({...settings, apiRateLimit: val})}
                  options={['500/hour', '1000/hour', '5000/hour', '10000/hour', 'Unlimited']}
                />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-slate-400" />
                  <span className="text-[12px] text-slate-600">API Key</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2 py-1 rounded border border-slate-200">
                    tk_live_••••••••••••••••••••••••
                  </code>
                  <button className="text-[11px] font-medium text-blue-600 hover:text-blue-700">
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-bold">
                SF
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Salesforce Integration</h4>
                <p className="text-[12px] text-slate-500">Sync policy and client data</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[12px] font-medium flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> Connected
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-bold">
                M365
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Microsoft 365 / Azure AD</h4>
                <p className="text-[12px] text-slate-500">Single sign-on and directory sync</p>
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white text-slate-600 border border-slate-200 rounded text-[12px] font-medium hover:bg-slate-50 transition-colors">
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="pt-6 border-t border-slate-100">
        <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-blue-600" /> Notifications
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Security Alerts Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                value={settings.notificationEmail}
                onChange={(e) => setSettings({...settings, notificationEmail: e.target.value})}
                className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md">
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Critical Risk Alerts</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Notify when client risk score drops below threshold</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md">
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Policy Renewal Reminders</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Email alerts 30 days before policy expiration</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6 shadow-sm" />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md">
              <div>
                <h4 className="text-[13px] font-bold text-slate-900">Weekly Summary Reports</h4>
                <p className="text-[12px] text-slate-500 mt-0.5">Automated portfolio health summaries</p>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1 shadow-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamMembers = () => (
    <div className="space-y-6 animate-enter">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" /> Team Members
          </h3>
          <p className="text-[12px] text-slate-500">Manage access and permissions for your team</p>
        </div>
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5" /> Invite Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search members..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
          />
        </div>
        <div className="w-48">
          <Select
            value={roleFilter}
            onChange={(val) => setRoleFilter(val)}
            options={['all', 'Super Admin', 'Admin', 'Analyst', 'Viewer']}
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] text-slate-500 uppercase font-semibold bg-slate-50/50 border-b border-slate-200">
                <th className="px-5 py-3 font-semibold">Member</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Last Active</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-sky-50/30 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-slate-900">{member.name}</p>
                        <p className="text-[11px] text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[11px] font-medium ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      {member.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                      member.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : member.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        member.status === 'Active' ? 'bg-emerald-500' : member.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {member.lastActive}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedMember(member);
                          setIsEditMemberModalOpen(true);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {member.role !== 'Super Admin' && (
                        <button
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-900">{teamMembers.filter(m => m.status === 'Active').length}</div>
          <div className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Active Members</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-900">{teamMembers.filter(m => m.role === 'Admin' || m.role === 'Super Admin').length}</div>
          <div className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Admins</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-900">{teamMembers.filter(m => m.status === 'Pending').length}</div>
          <div className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Pending</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-900">{teamMembers.length}</div>
          <div className="text-[11px] text-slate-500 uppercase font-semibold mt-1">Total</div>
        </div>
      </div>
    </div>
  );

  const renderInviteModal = () => {
    if (!isInviteModalOpen) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsInviteModalOpen(false)} />
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900">Invite Team Member</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">Send an invitation to join the workspace</p>
            </div>
            <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="colleague@telefonica.com"
                  className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</label>
              <Select
                value="Analyst"
                onChange={() => {}}
                options={['Viewer', 'Analyst', 'Admin', 'Super Admin']}
              />
              <p className="text-[11px] text-slate-400 mt-1">
                <strong>Analyst:</strong> Can view reports and manage clients. Cannot modify system settings.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex gap-3">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-800 leading-relaxed">
                The invitation will be sent via email. The user will need to accept the invitation to gain access.
              </p>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsInviteModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const renderEditMemberModal = () => {
    if (!isEditMemberModalOpen || !selectedMember) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditMemberModalOpen(false)} />
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-slide-up">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900">Edit Team Member</h3>
              <p className="text-[12px] text-slate-500 mt-0.5">{selectedMember.name}</p>
            </div>
            <button onClick={() => setIsEditMemberModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[13px] font-bold text-slate-600">
                {selectedMember.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-900">{selectedMember.name}</p>
                <p className="text-[12px] text-slate-500">{selectedMember.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</label>
              <Select
                value={selectedMember.role}
                onChange={() => {}}
                options={['Viewer', 'Analyst', 'Admin', 'Super Admin']}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</label>
              <Select
                value={selectedMember.status}
                onChange={() => {}}
                options={['Active', 'Pending', 'Suspended']}
              />
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button 
              onClick={() => setIsEditMemberModalOpen(false)}
              className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={() => setIsEditMemberModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-full bg-dot-pattern pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">
                Workspace Management
              </span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Settings</h1>
            <p className="text-[13px] text-slate-500 mt-1">Configure your workspace and manage team access</p>
          </div>
          {activeTab === 'settings' && (
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-slate-800 transition-colors shadow-sm">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8">
        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-slate-200">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'settings' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            <SettingsIcon className="w-4 h-4" /> Settings
          </button>
          <button 
            onClick={() => setActiveTab('team')}
            className={`pb-3 text-[13px] font-medium transition-all border-b-2 flex items-center gap-2 ${
              activeTab === 'team' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" /> Team Members
          </button>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
          {activeTab === 'settings' && renderSettings()}
          {activeTab === 'team' && renderTeamMembers()}
        </div>
      </div>

      {renderInviteModal()}
      {renderEditMemberModal()}
    </div>
  );
};

export default Settings;

