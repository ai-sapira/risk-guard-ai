
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Play, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Trophy, 
  Star, 
  Search, 
  Zap, 
  BrainCircuit, 
  X, 
  MessageSquare, 
  ThumbsUp, 
  Award, 
  Flame, 
  ArrowRight
} from 'lucide-react';

// --- Mock Data ---

const learningModules = [
  { 
    id: 1, 
    title: "The Art of Password Management", 
    type: "Video", 
    duration: "4 min", 
    xp: 50, 
    category: "Basics", 
    thumbnail: "bg-gradient-to-br from-blue-500 to-indigo-600",
    progress: 0,
    description: "Stop reusing passwords. Learn how to set up a vault and generate entropy-rich credentials that hackers can't crack."
  },
  { 
    id: 2, 
    title: "Spotting AI Deepfakes", 
    type: "Interactive", 
    duration: "8 min", 
    xp: 120, 
    category: "Advanced", 
    thumbnail: "bg-gradient-to-br from-purple-500 to-fuchsia-600",
    progress: 0,
    description: "Audio and video impersonation is on the rise. Test your senses in this interactive challenge to spot the glitched pixels."
  },
  { 
    id: 3, 
    title: "Public Wi-Fi Dangers", 
    type: "Article", 
    duration: "3 min", 
    xp: 30, 
    category: "Remote Work", 
    thumbnail: "bg-gradient-to-br from-emerald-400 to-teal-600",
    progress: 100,
    description: "Why your coffee shop Wi-Fi isn't safe, and how to use a VPN to tunnel your traffic securely."
  },
  { 
    id: 4, 
    title: "Social Engineering 101", 
    type: "Video", 
    duration: "6 min", 
    xp: 75, 
    category: "Phishing", 
    thumbnail: "bg-gradient-to-br from-orange-400 to-rose-500",
    progress: 45,
    description: "Hackers don't hack systems; they hack people. Learn the psychological triggers used to manipulate you."
  },
  { 
    id: 5, 
    title: "Clean Desk Policy", 
    type: "Quiz", 
    duration: "2 min", 
    xp: 25, 
    category: "Compliance", 
    thumbnail: "bg-slate-600",
    progress: 0,
    description: "Quick check: Did you leave confidential papers on your desk? Let's review the physical security rules."
  },
];

const featuredCampaign = { 
    id: 10, 
    title: "Holiday Shopping Security", 
    type: "Course", 
    duration: "10 min", 
    xp: 200, 
    category: "Seasonal", 
    description: "Black Friday is peak season for credit card fraud. Learn how to verify e-commerce sites and spot fake shipping notifications in this seasonal special."
};

const surveys = [
  {
    id: 's1',
    title: "Security Culture Pulse",
    questions: 3,
    time: "1 min",
    reward: "Double XP Boost",
    status: "Pending"
  }
];

const Training: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'library' | 'surveys' | 'achievements'>('library');
  const [selectedModule, setSelectedModule] = useState<any | null>(null);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [surveyStep, setSurveyStep] = useState(0);
  
  // Drawer State for Level Up Ceremony
  const [drawerState, setDrawerState] = useState<'content' | 'success'>('content');

  // Stats
  const [streak, setStreak] = useState(12);
  const [totalXp, setTotalXp] = useState(1450);
  const [level, setLevel] = useState(4);

  const handleStartModule = (module: any) => {
    setDrawerState('content');
    setSelectedModule(module);
  };

  const handleCompleteModule = () => {
      setDrawerState('success');
      // In a real app, this would trigger an API call
      setTotalXp(prev => prev + (selectedModule?.xp || 0));
  };

  const closeDrawer = () => {
      setSelectedModule(null);
      setDrawerState('content');
  };

  // --- Renderers ---

  const renderHero = () => (
     <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8 shadow-sm relative overflow-hidden group">
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
        <div className="relative z-10 flex justify-between items-center">
           <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                 <Star className="w-3.5 h-3.5 fill-current" /> Featured Campaign
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{featuredCampaign.title}</h1>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                 {featuredCampaign.description}
              </p>
              <button 
                onClick={() => handleStartModule(featuredCampaign)}
                className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg group-hover:shadow-xl"
              >
                 <Play className="w-4 h-4 fill-current" /> Start Course (10 min)
              </button>
           </div>
           
           {/* Stats Card */}
           <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-lg p-5 w-64 shadow-sm">
               <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-4">Your Progress</h3>
               <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                     <Flame className="w-5 h-5 text-orange-500 fill-current animate-pulse" />
                     <span className="text-lg font-bold text-slate-900">{streak} Day Streak</span>
                  </div>
               </div>
               <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-orange-500 w-3/4 rounded-full"></div>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div className="text-center">
                     <p className="text-[10px] text-slate-400 uppercase">Level {level}</p>
                     <p className="text-sm font-bold text-slate-900">Cyber Cadet</p>
                  </div>
                  <div className="text-center">
                     <p className="text-[10px] text-slate-400 uppercase">Total XP</p>
                     <p className="text-sm font-bold text-blue-600">{totalXp}</p>
                  </div>
               </div>
           </div>
        </div>
     </div>
  );

  const renderLibrary = () => (
    <div className="animate-enter">
       <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
             {['All', 'Phishing', 'Compliance', 'Remote Work', 'Advanced'].map(cat => (
                <button key={cat} className="px-4 py-1.5 rounded-full border border-slate-200 text-[12px] font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all bg-white">
                   {cat}
                </button>
             ))}
          </div>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search library..." className="pl-9 pr-4 py-1.5 rounded-full border border-slate-200 text-[13px] focus:outline-none focus:border-blue-500 w-48 transition-all" />
          </div>
       </div>

       <div className="grid grid-cols-3 gap-6">
          {learningModules.map(module => (
             <div 
                key={module.id} 
                onClick={() => handleStartModule(module)}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full"
             >
                <div className={`h-40 ${module.thumbnail} relative p-6 flex flex-col justify-between`}>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                   <div className="relative z-10 flex justify-between items-start">
                      <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-slate-800">
                         {module.category}
                      </span>
                      {module.progress === 100 && (
                         <div className="bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                            <CheckCircle2 className="w-4 h-4" />
                         </div>
                      )}
                   </div>
                   <div className="relative z-10">
                       {module.type === 'Video' && <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm"><Play className="w-4 h-4 ml-0.5" /></div>}
                       {module.type === 'Article' && <BookOpen className="w-8 h-8 text-white" />}
                       {module.type === 'Interactive' && <BrainCircuit className="w-8 h-8 text-white" />}
                       {module.type === 'Quiz' && <CheckCircle2 className="w-10 h-10 text-slate-500/50 z-10" />}
                   </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                   <h3 className="text-[15px] font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {module.title}
                   </h3>
                   <p className="text-[12px] text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                      {module.description}
                   </p>
                   
                   <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
                         <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration}</span>
                         <span className="flex items-center gap-1 text-amber-600"><Zap className="w-3 h-3 fill-current" /> {module.xp} XP</span>
                      </div>
                      <span className="text-[11px] font-bold text-blue-600 group-hover:underline">Start</span>
                   </div>
                </div>
                
                {/* Progress Bar */}
                {module.progress > 0 && module.progress < 100 && (
                   <div className="h-1 bg-slate-100 w-full">
                      <div className="h-full bg-blue-600" style={{ width: `${module.progress}%` }}></div>
                   </div>
                )}
             </div>
          ))}
       </div>
    </div>
  );

  const renderSurveys = () => (
     <div className="animate-enter max-w-2xl mx-auto">
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mb-8 flex items-center gap-4">
           <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
           </div>
           <div>
              <h2 className="text-lg font-bold text-indigo-900">Your Voice Matters</h2>
              <p className="text-sm text-indigo-700">Help us improve security policies by sharing your honest feedback. Answers are anonymous.</p>
           </div>
        </div>

        <div className="space-y-4">
           {surveys.map(survey => (
              <div key={survey.id} className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-between hover:shadow-sm transition-shadow">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h3 className="text-[15px] font-bold text-slate-900">{survey.title}</h3>
                       <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded border border-rose-100 uppercase">New</span>
                    </div>
                    <p className="text-[12px] text-slate-500 flex items-center gap-3">
                       <span>{survey.questions} Questions</span>
                       <span>•</span>
                       <span>{survey.time} to complete</span>
                    </p>
                 </div>
                 <button 
                    onClick={() => setIsSurveyOpen(true)}
                    className="bg-slate-900 text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                 >
                    Start Survey <ArrowRight className="w-4 h-4" />
                 </button>
              </div>
           ))}
        </div>
     </div>
  );

  // --- Modals / Drawers ---

  const renderModuleDrawer = () => {
     if (!selectedModule) return null;
     return createPortal(
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />
           <div className="relative w-[800px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col">
              
              {/* Drawer Content */}
              {drawerState === 'content' ? (
                <>
                    <div className="bg-slate-900 aspect-video relative flex items-center justify-center">
                        <button onClick={closeDrawer} className="absolute top-4 right-4 text-white/50 hover:text-white z-20">
                            <X className="w-6 h-6" />
                        </button>
                        {/* Mock Player */}
                        <div className="text-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center border border-white/20 cursor-pointer hover:scale-110 transition-transform mb-4 mx-auto">
                                <Play className="w-8 h-8 text-white ml-1 fill-current" />
                            </div>
                            <h2 className="text-white font-bold text-xl">{selectedModule.title}</h2>
                            <p className="text-white/60 text-sm mt-1">{selectedModule.duration} • {selectedModule.type}</p>
                        </div>
                        {/* Progress Bar (Bottom of video) */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                            <div className="h-full bg-blue-500 w-1/3"></div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto">
                        <div className="flex gap-8">
                            <div className="flex-1 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">Key Takeaways</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {selectedModule.description} In this module, we will cover:
                                    </p>
                                    <ul className="list-disc list-inside mt-3 text-sm text-slate-600 space-y-1">
                                        <li>Identifying complex password requirements.</li>
                                        <li>Using a password manager effectively.</li>
                                        <li>Understanding Multi-Factor Authentication (MFA).</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
                                    <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                                        <Award className="w-4 h-4" /> Completion Reward
                                    </h4>
                                    <p className="text-xs text-blue-800">
                                        Finish this module to earn <strong>{selectedModule.xp} XP</strong> and the "Password Protector" badge.
                                    </p>
                                </div>
                            </div>

                            <div className="w-64 shrink-0 space-y-4">
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                    <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Related Content</h4>
                                    <div className="space-y-3">
                                        <div className="flex gap-3 items-start cursor-pointer hover:bg-white p-2 rounded transition-colors">
                                            <div className="w-8 h-8 bg-slate-200 rounded flex items-center justify-center shrink-0"><Play className="w-3 h-3" /></div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">MFA Setup Guide</p>
                                                <p className="text-[10px] text-slate-500">3 min video</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                        <button className="text-slate-500 text-sm font-medium hover:text-slate-900">Skip Intro</button>
                        <button 
                            onClick={handleCompleteModule}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
                        >
                            Complete & Claim XP <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </>
              ) : (
                  // Success State
                  <div className="flex-1 flex flex-col items-center justify-center bg-dot-pattern p-8 text-center animate-enter">
                      <div className="mb-6 relative">
                          <div className="absolute inset-0 animate-ping opacity-20 bg-yellow-400 rounded-full"></div>
                          <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-white relative z-10">
                              <Trophy className="w-12 h-12" />
                          </div>
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">Level Up!</h2>
                      <p className="text-slate-500 text-sm mb-8">You've mastered <span className="font-bold text-slate-900">{selectedModule.title}</span></p>
                      
                      <div className="flex gap-4 mb-8">
                          <div className="bg-white border border-slate-200 px-6 py-3 rounded-xl shadow-sm">
                              <p className="text-xs text-slate-400 uppercase font-bold">XP Earned</p>
                              <p className="text-2xl font-bold text-blue-600">+{selectedModule.xp}</p>
                          </div>
                          <div className="bg-white border border-slate-200 px-6 py-3 rounded-xl shadow-sm">
                              <p className="text-xs text-slate-400 uppercase font-bold">New Streak</p>
                              <p className="text-2xl font-bold text-orange-500">{streak + 1} Days</p>
                          </div>
                      </div>

                      <button 
                          onClick={closeDrawer}
                          className="bg-slate-900 text-white px-8 py-3 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all shadow-lg"
                      >
                          Continue Learning
                      </button>
                  </div>
              )}
           </div>
        </div>,
        document.body
     );
  };

  const renderSurveyModal = () => {
     if (!isSurveyOpen) return null;

     const questions = [
         { q: "How confident do you feel identifying a phishing email?", type: "scale" },
         { q: "I know where to report suspicious activity.", type: "bool" },
         { q: "Security policies hamper my productivity.", type: "scale" }
     ];

     return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSurveyOpen(false)} />
           <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up">
              <div className="bg-indigo-600 p-6 text-white text-center">
                 <MessageSquare className="w-8 h-8 mx-auto mb-3 text-indigo-200" />
                 <h2 className="text-xl font-bold">Security Culture Pulse</h2>
                 <p className="text-indigo-100 text-sm mt-1">Question {surveyStep + 1} of {questions.length}</p>
              </div>
              
              <div className="p-8 text-center">
                 <h3 className="text-lg font-medium text-slate-900 mb-8">{questions[surveyStep].q}</h3>
                 
                 {questions[surveyStep].type === 'scale' && (
                    <div className="flex justify-between gap-2 mb-8">
                       {[1, 2, 3, 4, 5].map(num => (
                          <button key={num} onClick={() => setSurveyStep(prev => prev + 1)} className="w-12 h-12 rounded-full border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-600 font-bold transition-all">
                             {num}
                          </button>
                       ))}
                    </div>
                 )}
                 
                 {questions[surveyStep].type === 'bool' && (
                    <div className="flex justify-center gap-6 mb-8">
                        <button onClick={() => setSurveyStep(prev => prev + 1)} className="px-6 py-3 border border-slate-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 text-emerald-700 font-bold transition-all w-32">
                            Yes
                        </button>
                        <button onClick={() => setSurveyStep(prev => prev + 1)} className="px-6 py-3 border border-slate-200 rounded-lg hover:bg-rose-50 hover:border-rose-200 text-rose-700 font-bold transition-all w-32">
                            No
                        </button>
                    </div>
                 )}

                 {surveyStep >= questions.length && (
                    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center animate-enter">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                           <ThumbsUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Thanks for sharing!</h3>
                        <p className="text-slate-500 text-sm mt-2 mb-6">Your feedback helps keep us safe.</p>
                        <button onClick={() => { setIsSurveyOpen(false); setSurveyStep(0); }} className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold">Close</button>
                    </div>
                 )}
              </div>
           </div>
        </div>,
        document.body
     );
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-8 pb-20">
       {/* Page Header */}
       <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Learning Center</h1>
             <p className="text-sm text-slate-500">Build your skills and earn rewards.</p>
          </div>
          
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
             <button 
                onClick={() => setActiveTab('library')} 
                className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'library' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Course Library
             </button>
             <button 
                onClick={() => setActiveTab('surveys')} 
                className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'surveys' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Surveys & Polls
             </button>
             <button 
                onClick={() => setActiveTab('achievements')} 
                className={`px-4 py-1.5 rounded-md text-[13px] font-bold transition-all ${activeTab === 'achievements' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
             >
                Achievements
             </button>
          </div>
       </div>

       {activeTab === 'library' && (
           <>
             {renderHero()}
             {renderLibrary()}
           </>
       )}
       
       {activeTab === 'surveys' && renderSurveys()}
       
       {activeTab === 'achievements' && (
           <div className="text-center py-20 text-slate-400">
               <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
               <p>Achievements & Leaderboards coming soon...</p>
           </div>
       )}

       {renderModuleDrawer()}
       {renderSurveyModal()}
    </div>
  );
};

export default Training;
