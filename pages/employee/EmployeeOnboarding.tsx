
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Mail,
  User,
  Loader2,
  Lock,
  Info,
  Check
} from 'lucide-react';

const EmployeeOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
      setIsConnecting(true);
      // Simulate OAuth Pop-up delay
      setTimeout(() => {
          setIsConnecting(false);
          setStep(2); // Success state
      }, 2000);
  };

  const handleFinish = () => {
      navigate('/employee');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">R</div>
              <span className="font-bold text-sm tracking-tight">RiskGuard Employee Portal</span>
          </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 bg-dot-pattern">
          <div className="w-full max-w-md animate-enter">
              
              {/* Step 1: Welcome & Connect */}
              {step === 1 && (
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                      <div className="bg-slate-50 p-6 text-center border-b border-slate-100">
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                              <User className="w-6 h-6 text-slate-600" />
                          </div>
                          <h1 className="text-xl font-bold text-slate-900">Welcome, Sarah!</h1>
                          <p className="text-sm text-slate-500 mt-1">Setup your security profile for <span className="font-semibold text-slate-700">Acme Corp</span>.</p>
                      </div>

                      <div className="p-8 space-y-6">
                          <div className="space-y-4">
                              <div className="flex gap-4">
                                  <div className="mt-1">
                                      <Shield className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                      <h3 className="text-[13px] font-bold text-slate-900">Why connect my email?</h3>
                                      <p className="text-[12px] text-slate-500 leading-relaxed mt-1">
                                          RiskGuard analyzes email metadata (sender, subject, timestamps) to personalize your training and alert you to suspicious activity. 
                                          <br/><br/>
                                          <span className="text-emerald-600 font-medium flex items-center gap-1">
                                              <Check className="w-3 h-3" /> We do not read your email body content.
                                          </span>
                                      </p>
                                  </div>
                              </div>
                          </div>

                          <div className="pt-4 border-t border-slate-100">
                              <button 
                                  onClick={handleConnect}
                                  disabled={isConnecting}
                                  className="w-full bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-700 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all shadow-sm group"
                              >
                                  {isConnecting ? (
                                      <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                                  ) : (
                                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" alt="Microsoft" className="w-5 h-5" />
                                  )}
                                  <span className="text-[13px] font-bold">{isConnecting ? 'Connecting...' : 'Connect Work Account'}</span>
                              </button>
                              <p className="text-[10px] text-slate-400 text-center mt-3">
                                  Redirects to Microsoft Secure Login
                              </p>
                          </div>
                      </div>
                  </div>
              )}

              {/* Step 2: Success */}
              {step === 2 && (
                  <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden text-center p-8 animate-enter">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50">
                          <Check className="w-8 h-8" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 mb-2">You're all set!</h2>
                      <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                          Your profile has been created and your email is protected. 
                          You have <strong>2 pending training tasks</strong>.
                      </p>
                      <button 
                          onClick={handleFinish}
                          className="w-full bg-slate-900 text-white py-3 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                      >
                          Go to Dashboard <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
              )}

          </div>
      </main>
    </div>
  );
};

export default EmployeeOnboarding;
