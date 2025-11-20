import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Mail,
  User,
  Building2,
  Loader2,
  Check
} from 'lucide-react';

const CompanyInviteLanding: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      fullName: '',
      password: '',
      terms: false
  });
  
  // Get email and company name from URL query parameters
  const inviteEmail = searchParams.get('email') || 'admin@acme.com';
  const companyName = searchParams.get('company') || 'Acme Corp Ltd.';

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call to register admin
      setTimeout(() => {
          setIsLoading(false);
          navigate('/company/setup'); // Redirect to Onboarding Flow (Sync/Config)
      }, 1500);
  };

  return (
    <div className="min-h-screen bg-dot-pattern flex flex-col font-sans">
      {/* Simple Header */}
      <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-sm flex items-center px-8 sticky top-0 z-10 justify-between">
          <div className="flex items-center gap-3">
               {/* Telefónica Logo */}
               <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-sm">
                    <div className="grid grid-cols-3 gap-0.5">
                        <div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-transparent"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-transparent"></div>
                        <div className="w-1 h-1 bg-transparent"></div><div className="w-1 h-1 bg-white rounded-full"></div><div className="w-1 h-1 bg-transparent"></div>
                    </div>
               </div>
               <div className="flex flex-col">
                   <span className="font-bold text-sm text-slate-900 leading-none">RiskGuard</span>
                   <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">Powered by Telefónica</span>
               </div>
          </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl grid grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Context */}
              <div className="col-span-5 space-y-8 animate-enter">
                  <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                          <Shield className="w-3 h-3" /> Policy Benefit Included
                      </div>
                      <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
                          Activate your <br/> 
                          <span className="text-blue-600">Cyber Defense</span> Policy
                      </h1>
                      <p className="text-slate-500 text-sm leading-relaxed">
                          As part of your insurance coverage with <strong>Telefónica</strong>, you have access to RiskGuard.
                          This platform helps reduce premiums by actively training employees and detecting threats.
                      </p>
                  </div>

                  <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                              <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                              <h3 className="text-sm font-bold text-slate-900">Automated Employee Sync</h3>
                              <p className="text-xs text-slate-500 mt-1">Connect Microsoft 365 or Google Workspace in minutes.</p>
                          </div>
                      </div>
                      <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                              <Shield className="w-5 h-5" />
                          </div>
                          <div>
                              <h3 className="text-sm font-bold text-slate-900">Baseline Risk Assessment</h3>
                              <p className="text-xs text-slate-500 mt-1">Launch a silent snapshot campaign to measure current exposure.</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right Side: Form Card */}
              <div className="col-span-7 bg-white border border-slate-200 rounded-2xl shadow-xl p-8 relative overflow-hidden animate-slide-in-right">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                  
                  <div className="mb-8">
                      <h2 className="text-xl font-bold text-slate-900">Complete Account Setup</h2>
                      <p className="text-sm text-slate-500 mt-1">For: <span className="font-medium text-slate-700">{companyName}</span></p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                          <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  required
                                  type="text" 
                                  placeholder="Jane Doe"
                                  value={formData.fullName}
                                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                  className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                          </div>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Work Email</label>
                          <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  type="email" 
                                  value={inviteEmail}
                                  disabled
                                  className="w-full h-10 pl-10 pr-3 bg-slate-50 border border-slate-200 rounded-md text-[13px] font-medium text-slate-500 cursor-not-allowed"
                              />
                          </div>
                      </div>

                      <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Create Password</label>
                          <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                  required
                                  type="password" 
                                  placeholder="••••••••"
                                  value={formData.password}
                                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                                  className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-md text-[13px] font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              />
                          </div>
                          <p className="text-[10px] text-slate-400">Min 8 chars, 1 uppercase, 1 special character.</p>
                      </div>

                      <div className="pt-2">
                          <label className="flex items-start gap-3 cursor-pointer group">
                              <div className="relative flex items-center">
                                  <input 
                                      type="checkbox" 
                                      required
                                      checked={formData.terms}
                                      onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                                      className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 shadow-sm checked:border-blue-600 checked:bg-blue-600 transition-all" 
                                  />
                                  <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                              </div>
                              <span className="text-[12px] text-slate-500 group-hover:text-slate-700 transition-colors">
                                  I agree to the <span className="text-blue-600 font-medium hover:underline">Terms of Service</span> and acknowledge the <span className="text-blue-600 font-medium hover:underline">Privacy Policy</span>.
                              </span>
                          </label>
                      </div>

                      <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-slate-900 text-white h-11 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
                      >
                          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account & Continue'} 
                          {!isLoading && <ArrowRight className="w-4 h-4" />}
                      </button>
                  </form>
              </div>
          </div>
      </main>
    </div>
  );
};

export default CompanyInviteLanding;