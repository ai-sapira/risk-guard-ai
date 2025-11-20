
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Search, 
  X, 
  RotateCcw,
  ChevronDown, 
  Info,
  Eye
} from 'lucide-react';

const SimulationResult: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'alert' | 'analysis' | 'quiz' | 'complete'>('alert');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showHotspots, setShowHotspots] = useState(false);

  // Mock Data
  const simulation = {
    type: "Phishing",
    lure: "Urgent Invoice Overdue",
    sender: "accounts@pay-vendor.net",
    subject: "Invoice #INV-2023-991 OVERDUE",
    redFlags: [
      { id: 1, x: 20, y: 15, label: "External Sender", desc: "The domain @pay-vendor.net does not match our known supplier list." },
      { id: 2, x: 60, y: 25, label: "High Urgency", desc: "Subject line uses caps and 'OVERDUE' to induce panic." },
      { id: 3, x: 40, y: 60, label: "Generic Greeting", desc: "Addressed to 'Customer' instead of your name." },
      { id: 4, x: 50, y: 80, label: "Suspicious Link", desc: "The button leads to 'bit.ly/...' instead of a secure portal." }
    ],
    quiz: [
      { id: 1, q: "What was the biggest giveaway in the sender address?", options: ["It was misspelled", "It was an external domain", "It had numbers"], correct: 1 },
      { id: 2, q: "What should you do if an invoice seems urgent?", options: ["Pay it immediately", "Verify via internal chat/phone", "Reply asking for details"], correct: 1 },
      { id: 3, q: "Why are generic greetings suspicious?", options: ["They are rude", "Attackers often lack specific data", "They violate company policy"], correct: 1 }
    ]
  };

  const handleQuizSelect = (qId: number, optIdx: number) => {
    setQuizAnswers({...quizAnswers, [qId]: optIdx});
  };

  const isQuizComplete = Object.keys(quizAnswers).length === simulation.quiz.length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col items-center py-12 px-4">
      
      {/* Step 1: The "Gotcha" Alert */}
      {step === 'alert' && (
        <div className="max-w-md w-full bg-white border border-rose-100 rounded-xl shadow-xl overflow-hidden animate-enter text-center">
           <div className="h-2 bg-rose-500 w-full"></div>
           <div className="p-8">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertTriangle className="w-10 h-10 text-rose-600" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Whoops! That was a simulation.</h1>
              <p className="text-sm text-slate-500 leading-relaxed mb-8">
                 You just clicked on a simulated phishing email sent by your security team. 
                 Don't worry—your credentials are safe, but this is a learning opportunity.
              </p>
              
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 mb-8 text-left">
                 <div className="flex justify-between text-xs text-rose-800 font-bold uppercase tracking-wider mb-2">
                    <span>Risk Impact</span>
                    <span>-15 Pts</span>
                 </div>
                 <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[85%]"></div>
                 </div>
                 <p className="text-[11px] text-rose-700 mt-2">Complete the quick training to restore your score.</p>
              </div>

              <button 
                onClick={() => setStep('analysis')}
                className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all"
              >
                 Review the Email
              </button>
           </div>
        </div>
      )}

      {/* Step 2: Forensic Analysis */}
      {step === 'analysis' && (
        <div className="max-w-4xl w-full grid grid-cols-12 gap-8 animate-slide-in-right">
           {/* Left: Email View */}
           <div className="col-span-7 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">The Email You Received</span>
                 <button 
                    onClick={() => setShowHotspots(!showHotspots)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-bold border transition-colors ${
                        showHotspots ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    }`}
                 >
                    {showHotspots ? <Eye className="w-3 h-3" /> : <Search className="w-3 h-3" />}
                    {showHotspots ? 'Hide Red Flags' : 'Spot Red Flags'}
                 </button>
              </div>
              <div className="p-8 relative flex-1">
                 {/* Email Mock */}
                 <div className="space-y-4 opacity-90">
                    <div className="border-b border-slate-100 pb-4 space-y-1">
                        <p className="text-sm"><span className="text-slate-400 w-16 inline-block">From:</span> <span className="font-medium text-slate-900">{simulation.sender}</span></p>
                        <p className="text-sm"><span className="text-slate-400 w-16 inline-block">Subject:</span> <span className="font-medium text-slate-900">{simulation.subject}</span></p>
                    </div>
                    <div className="font-serif text-slate-700 space-y-4 text-sm leading-relaxed">
                        <p>Dear Customer,</p>
                        <p>We have not received payment for the attached invoice. Service will be suspended in 24 hours.</p>
                        <div className="py-2">
                           <button className="bg-blue-600 text-white px-6 py-2 rounded font-sans text-sm font-medium pointer-events-none">
                              View Invoice
                           </button>
                        </div>
                        <p className="text-slate-400 text-xs">Billing Dept.</p>
                    </div>
                 </div>

                 {/* Hotspots Overlay */}
                 {showHotspots && simulation.redFlags.map(flag => (
                    <div 
                        key={flag.id}
                        className="absolute w-6 h-6 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center cursor-help animate-pulse"
                        style={{ top: `${flag.y}%`, left: `${flag.x}%` }}
                    >
                        <div className="relative group">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs p-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                <p className="font-bold text-rose-300 mb-1">{flag.label}</p>
                                <p className="leading-snug">{flag.desc}</p>
                            </div>
                        </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Right: Guidance */}
           <div className="col-span-5 space-y-6">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                       <Info className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-blue-900">What you missed</h3>
                 </div>
                 <ul className="space-y-3">
                    {simulation.redFlags.map(flag => (
                        <li key={flag.id} className="flex gap-3 text-sm text-blue-800">
                            <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>{flag.desc}</span>
                        </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                 <div className="bg-slate-900 aspect-video flex items-center justify-center cursor-pointer hover:bg-slate-800 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white ml-0.5 fill-current" />
                    </div>
                 </div>
                 <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-900">Micro-Lesson: Spotting Fake Invoices</h4>
                    <p className="text-xs text-slate-500 mt-1">2 min video • Recommended</p>
                 </div>
              </div>

              <button 
                 onClick={() => setStep('quiz')}
                 className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
              >
                 Take Quiz to Restore Score <ArrowRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      )}

      {/* Step 3: Quiz */}
      {step === 'quiz' && (
         <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-slide-up">
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
               <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-bold text-slate-900">Quick Verification</h2>
                  <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-slate-200 text-slate-500">
                     {Object.keys(quizAnswers).length} / {simulation.quiz.length} Answered
                  </span>
               </div>
               <p className="text-sm text-slate-500">Answer correctly to prove you know how to spot this threat next time.</p>
            </div>

            <div className="p-8 space-y-8">
               {simulation.quiz.map((q, qIdx) => (
                  <div key={q.id} className="space-y-3">
                     <h3 className="text-sm font-bold text-slate-900">{qIdx + 1}. {q.q}</h3>
                     <div className="space-y-2">
                        {q.options.map((opt, oIdx) => (
                           <label 
                              key={oIdx} 
                              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                                 quizAnswers[q.id] === oIdx 
                                 ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                                 : 'border-slate-200 hover:bg-slate-50'
                              }`}
                           >
                              <input 
                                 type="radio" 
                                 name={`q-${q.id}`} 
                                 className="hidden" 
                                 onChange={() => handleQuizSelect(q.id, oIdx)}
                              />
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                 quizAnswers[q.id] === oIdx ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                              }`}>
                                 {quizAnswers[q.id] === oIdx && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                              </div>
                              <span className="text-sm text-slate-700">{opt}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-end">
               <button 
                  onClick={() => setStep('complete')}
                  disabled={!isQuizComplete}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
               >
                  Submit Answers
               </button>
            </div>
         </div>
      )}

      {/* Step 4: Complete */}
      {step === 'complete' && (
        <div className="max-w-md w-full bg-white border border-emerald-200 rounded-xl shadow-xl overflow-hidden animate-enter text-center p-8">
           <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
           </div>
           <h2 className="text-xl font-bold text-slate-900 mb-2">Training Complete</h2>
           <p className="text-sm text-slate-500 mb-8">
              Great job! Your risk score has been restored. Keep an eye out for suspicious emails in the future.
           </p>
           <button 
              onClick={() => navigate('/employee')}
              className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg"
           >
              Return to Dashboard
           </button>
        </div>
      )}

    </div>
  );
};

export default SimulationResult;
