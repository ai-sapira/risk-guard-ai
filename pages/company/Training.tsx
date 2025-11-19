
import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Plus, 
  FileText, 
  BrainCircuit,
  ArrowRight,
  Users,
  Zap,
  Trophy,
  Target,
  ShieldCheck,
  FileCheck,
  Download,
  X,
  Send,
  Eye,
  Crown,
  Calendar,
  Star,
  MessageSquare,
  Share2,
  ThumbsUp,
  List,
  Layout
} from 'lucide-react';

// --- Mock Data ---

// Expanded Learning Paths
const aiPaths = [
  { 
    id: 'p1', 
    title: "Finance Shield Path", 
    role: "Finance", 
    progress: "65%", 
    modules: 4, 
    icon: CreditCardIcon,
    description: "A specialized curriculum designed for finance professionals to detect advanced payment fraud, BEC, and invoice manipulation.",
    skills: ["Invoice Verification", "BEC Detection", "Wire Transfer Protocol"],
    curriculum: [
       { title: "The Anatomy of Invoice Fraud", type: "Video", duration: "8 min", status: "Completed" },
       { title: "Identifying Spoofed Vendor Emails", type: "Interactive", duration: "12 min", status: "Completed" },
       { title: "Wire Transfer Verification Steps", type: "Article", duration: "5 min", status: "In Progress" },
       { title: "Final Assessment: Finance Guard", type: "Quiz", duration: "15 min", status: "Locked" }
    ]
  },
  { 
    id: 'p2', 
    title: "Executive Defense", 
    role: "C-Level", 
    progress: "12%", 
    modules: 6, 
    icon: ShieldCheck,
    description: "High-level strategic security training for executives targeted by Whaling and sophisticated social engineering.",
    skills: ["Crisis Management", "Personal Device Security", "Travel Safety"],
    curriculum: [
       { title: "Whaling: Attacks on Executives", type: "Video", duration: "6 min", status: "Completed" },
       { title: "Securing Personal Devices", type: "Video", duration: "10 min", status: "Not Started" },
       { title: "Travel Security Protocol", type: "Article", duration: "7 min", status: "Not Started" },
       { title: "Crisis Comms Simulation", type: "Interactive", duration: "20 min", status: "Locked" }
    ]
  },
  { 
    id: 'p3', 
    title: "Remote Work Secure", 
    role: "All Staff", 
    progress: "88%", 
    modules: 3, 
    icon: Zap,
    description: "Essential security practices for the modern hybrid workforce. Securing home networks and public Wi-Fi usage.",
    skills: ["VPN Usage", "Home Network Sec", "Physical Security"],
    curriculum: [
       { title: "Setting up a Secure Home Office", type: "Video", duration: "12 min", status: "Completed" },
       { title: "Public Wi-Fi Dangers", type: "Quiz", duration: "5 min", status: "Completed" },
       { title: "VPN Best Practices", type: "Video", duration: "8 min", status: "Completed" }
    ]
  },
];

// Expanded Library Items
const libraryItems = [
  { 
    id: 1, 
    title: "Phishing Fundamentals", 
    type: "Video", 
    duration: "5 min", 
    roles: "All Employees", 
    completions: 1240, 
    rating: 4.8, 
    thumbnail: "bg-blue-100",
    description: "Learn the core indicators of a phishing email. This module covers header analysis, URL inspection, and emotional manipulation tactics.",
    transcript: "Welcome to Phishing Fundamentals. In this session, we will breakdown the anatomy of a malicious email...",
    reviews: [
       { user: "Jane D.", comment: "Very clear and concise.", rating: 5 },
       { user: "Mike R.", comment: "Good examples, liked the interactive parts.", rating: 4 }
    ]
  },
  { 
    id: 2, 
    title: "Password Hygiene", 
    type: "Article", 
    duration: "3 min", 
    roles: "All Employees", 
    completions: 850, 
    rating: 4.5, 
    thumbnail: "bg-emerald-100",
    description: "Why 'Password123' isn't enough. Best practices for creating memorable yet complex passphrases and using password managers.",
    transcript: "Standard password policies are evolving. NIST now recommends length over complexity...",
    reviews: [
       { user: "Sarah C.", comment: "I finally set up a manager after reading this.", rating: 5 }
    ]
  },
  { id: 3, title: "CEO Fraud Defense", type: "Interactive", duration: "10 min", roles: "Finance, Execs", completions: 45, rating: 4.9, thumbnail: "bg-amber-100", description: "Interactive simulation: Spot the fake CEO request.", transcript: "Simulation Module.", reviews: [] },
  { id: 4, title: "GDPR Data Handling", type: "Video", duration: "15 min", roles: "HR, Legal", completions: 120, rating: 4.2, thumbnail: "bg-purple-100", description: "Legal requirements for handling PII under GDPR.", transcript: "GDPR Article 5 outlines the principles...", reviews: [] },
  { id: 5, title: "Secure Remote Work", type: "Article", duration: "7 min", roles: "Remote", completions: 320, rating: 4.6, thumbnail: "bg-sky-100", description: "Securing your home router and workspace.", transcript: "Step 1: Change default admin credentials...", reviews: [] },
  { id: 6, title: "Identifying Smishing", type: "Quiz", duration: "4 min", roles: "Sales", completions: 210, rating: 4.7, thumbnail: "bg-rose-100", description: "SMS-based phishing attacks and how to spot them.", transcript: "Quiz Content.", reviews: [] },
];

// Pipeline Data (Drill-down)
const pipelineUsers = {
  'Sim Failed': [
    { id: 101, name: "Alice Johnson", dept: "Finance", lure: "Fake Invoice #992", time: "2 hrs ago" },
    { id: 102, name: "Bob Smith", dept: "Sales", lure: "Urgent PO", time: "5 hrs ago" },
    { id: 103, name: "Charlie Davis", dept: "IT", lure: "VPN Reset", time: "1 day ago" },
  ],
  'Auto-Assign': [
    { id: 201, name: "Diana Prince", dept: "Marketing", pill: "Social Media Safety", status: "Assigned" },
  ],
  'Learning': [
    { id: 301, name: "Evan Wright", dept: "Legal", pill: "Data Privacy", progress: "50%", stuck: true },
    { id: 302, name: "Fiona Gallagher", dept: "HR", pill: "Phishing Basics", progress: "10%", stuck: false },
  ],
  'Quiz Pass': [
    { id: 401, name: "George Michael", dept: "Finance", score: "100%", restored: true },
  ]
};

// Gamification Data
const leagueData = [
  { rank: 1, dept: "Engineering", score: 980, members: 45, trend: "up" },
  { rank: 2, dept: "Legal", score: 945, members: 12, trend: "stable" },
  { rank: 3, dept: "Finance", score: 890, members: 24, trend: "down" },
  { rank: 4, dept: "Sales", score: 750, members: 32, trend: "up" },
];

// Compliance Data
const complianceData = [
  { standard: "ISO 27001", status: "Ready", coverage: "98%", gaps: 2 },
  { standard: "GDPR / LOPD", status: "Review", coverage: "92%", gaps: 15 },
  { standard: "NIS2 Directive", status: "Attention", coverage: "65%", gaps: 42 },
];

// Helper Icons
function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  );
}

const Training: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'library' | 'gamification' | 'compliance'>('overview');
  
  // Drawer States
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<any | null>(null);
  const [selectedContent, setSelectedContent] = useState<any | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Handlers
  const handleStageClick = (stage: string) => {
    setSelectedStage(stage);
  };

  const handleNudge = (userId: number) => {
    alert(`Nudge sent to user ${userId}`);
  };

  const handleAssign = () => {
      alert("Training assigned successfully.");
      setIsAssignModalOpen(false);
  }

  // --- Renderers ---

  // 1. Overview Renderer
  const renderOverview = () => (
    <div className="space-y-8 animate-enter">
      {/* Top Metrics */}
      <div className="grid grid-cols-3 gap-6">
         <div className="bg-white border border-slate-200 rounded-md p-5 hover:border-blue-300 transition-colors group cursor-default">
            <div className="flex justify-between items-start">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Training Compliance</span>
                <div className="p-1.5 bg-emerald-50 rounded-md border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
               <span className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">94.2%</span>
               <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 tabular-nums">+1.5%</span>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-md p-5 hover:border-blue-300 transition-colors group cursor-default">
            <div className="flex justify-between items-start">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Avg. Remediation Time</span>
                <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100 group-hover:bg-blue-100 transition-colors">
                    <Clock className="w-4 h-4 text-blue-600" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
               <span className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">2.4 Days</span>
               <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 tabular-nums">-0.5</span>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-md p-5 hover:border-blue-300 transition-colors group cursor-default">
            <div className="flex justify-between items-start">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Top Knowledge Gap</span>
                <div className="p-1.5 bg-amber-50 rounded-md border border-amber-100 group-hover:bg-amber-100 transition-colors">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
               <span className="text-2xl font-bold text-slate-900 tracking-tight">Password Policy</span>
               <span className="text-[11px] font-medium text-slate-500">Lowest Score</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
         {/* Interactive Reactive Pipeline */}
         <div className="col-span-3 bg-white border border-slate-200 rounded-md overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
               <div>
                  <h3 className="text-[14px] font-semibold text-slate-900 flex items-center gap-2">
                     <Zap className="w-4 h-4 text-blue-600" />
                     Reactive Training Pipeline (3.5.1)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Interactive view. Click stages to manage users.</p>
               </div>
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-100 rounded text-[11px] font-medium text-emerald-700">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                     Automated
                  </div>
               </div>
            </div>
            
            <div className="p-12">
               <div className="flex items-center justify-between relative max-w-4xl mx-auto">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

                  {/* Node 1: Sim Failed */}
                  <button 
                    onClick={() => handleStageClick('Sim Failed')}
                    className="flex flex-col items-center gap-3 group focus:outline-none"
                  >
                     <div className="w-14 h-14 rounded-full bg-white border-2 border-rose-100 flex items-center justify-center text-rose-600 shadow-sm z-10 group-hover:border-rose-400 group-hover:scale-110 transition-all relative">
                        <AlertTriangle className="w-6 h-6" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">3</div>
                     </div>
                     <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Sim Failed</p>
                        <p className="text-[11px] text-slate-400">Trigger</p>
                     </div>
                  </button>

                  <ArrowRight className="w-5 h-5 text-slate-300" />

                  {/* Node 2: Auto-Assign */}
                  <button 
                    onClick={() => handleStageClick('Auto-Assign')}
                    className="flex flex-col items-center gap-3 group focus:outline-none"
                  >
                     <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-100 flex items-center justify-center text-blue-600 shadow-sm z-10 group-hover:border-blue-400 group-hover:scale-110 transition-all">
                        <BrainCircuit className="w-6 h-6" />
                     </div>
                     <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Auto-Assign</p>
                        <p className="text-[11px] text-slate-400">Context AI</p>
                     </div>
                  </button>

                  <ArrowRight className="w-5 h-5 text-slate-300" />

                  {/* Node 3: Learning */}
                  <button 
                    onClick={() => handleStageClick('Learning')}
                    className="flex flex-col items-center gap-3 group focus:outline-none"
                  >
                     <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-100 flex items-center justify-center text-amber-600 shadow-sm z-10 group-hover:border-amber-400 group-hover:scale-110 transition-all relative">
                        <BookOpen className="w-6 h-6" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">2</div>
                     </div>
                     <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Learning</p>
                        <p className="text-[11px] text-slate-400">In Progress</p>
                     </div>
                  </button>

                   <ArrowRight className="w-5 h-5 text-slate-300" />

                  {/* Node 4: Quiz Pass */}
                  <button 
                    onClick={() => handleStageClick('Quiz Pass')}
                    className="flex flex-col items-center gap-3 group focus:outline-none"
                  >
                     <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm z-10 group-hover:border-emerald-400 group-hover:scale-110 transition-all">
                        <CheckCircle2 className="w-6 h-6" />
                     </div>
                     <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Quiz Pass</p>
                        <p className="text-[11px] text-slate-400">Score Restore</p>
                     </div>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  // 2. Library Renderer
  const renderLibrary = () => (
    <div className="space-y-8 animate-enter">
       
       {/* AI Learning Paths */}
       <div className="space-y-4">
          <div className="flex items-center gap-2">
             <BrainCircuit className="w-4 h-4 text-blue-600" />
             <h3 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider">AI Learning Paths (Role Based)</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
             {aiPaths.map(path => (
                <div 
                  key={path.id} 
                  onClick={() => setSelectedPath(path)}
                  className="bg-white border border-slate-200 rounded-lg p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
                >
                   <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                      <path.icon className="w-24 h-24 text-blue-600" />
                   </div>
                   
                   <div className="relative z-10">
                      <div className="w-10 h-10 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         <path.icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-[15px] font-bold text-slate-900 mb-1">{path.title}</h4>
                      <p className="text-[12px] text-slate-500 mb-4">Designed for: <span className="font-medium text-slate-700">{path.role}</span></p>
                      
                      <div className="space-y-2">
                         <div className="flex justify-between text-[11px] font-medium text-slate-500">
                            <span>{path.modules} Modules</span>
                            <span>{path.progress} Complete</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: path.progress }}></div>
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Standard Library */}
       <div className="space-y-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-400" />
                <h3 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider">Content Library</h3>
             </div>
             
             {/* Filter Bar */}
             <div className="flex items-center gap-2">
                <div className="relative">
                   <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                   <input 
                      type="text" 
                      placeholder="Search topics..." 
                      className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] w-48 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium tabular-nums"
                   />
                </div>
             </div>
          </div>

          {/* Library Grid */}
          <div className="grid grid-cols-4 gap-6">
             {libraryItems.map((item, i) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedContent(item)}
                  className="bg-white border border-slate-200 rounded-md overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all group cursor-pointer"
                >
                   <div className={`h-32 ${item.thumbnail} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                      {item.type === 'Video' && <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm z-10"><Play className="w-4 h-4 text-slate-900 ml-0.5" /></div>}
                      {item.type === 'Article' && <FileText className="w-10 h-10 text-slate-500/50 z-10" />}
                      {item.type === 'Interactive' && <BrainCircuit className="w-10 h-10 text-slate-500/50 z-10" />}
                      {item.type === 'Quiz' && <CheckCircle2 className="w-10 h-10 text-slate-500/50 z-10" />}
                   </div>
                   <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wide ${
                            item.type === 'Video' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            'bg-slate-50 text-slate-600 border-slate-200'
                         }`}>{item.type}</span>
                         <span className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {item.duration}
                         </span>
                      </div>
                      <h3 className="text-[14px] font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</h3>
                      <p className="text-[11px] text-slate-500 mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                         <div className="flex items-center gap-1 text-[11px] text-slate-600">
                            <Users className="w-3 h-3 text-slate-400" /> {item.completions}
                         </div>
                         <div className="flex items-center gap-1 text-[11px] text-slate-600">
                            <Star className="w-3 h-3 text-amber-400 fill-current" /> {item.rating}
                         </div>
                      </div>
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );

  // 3. Gamification Renderer
  const renderGamification = () => (
    <div className="space-y-8 animate-enter">
       {/* League Header */}
       <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
             <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" />
                Security Champions League
             </h2>
             <p className="text-blue-100 max-w-xl text-sm leading-relaxed">
                Departments are ranked based on their risk score improvement, training completion speed, and phishing reporting rate.
             </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white/5 -skew-x-12"></div>
       </div>

       <div className="grid grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="col-span-2 bg-white border border-slate-200 rounded-md overflow-hidden">
             <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/50">
                <h3 className="text-[13px] font-semibold text-slate-900 uppercase tracking-wider">Department Standings</h3>
             </div>
             <div className="divide-y divide-slate-100">
                {leagueData.map((team, i) => (
                   <div key={team.dept} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 flex items-center justify-center font-bold rounded-full ${
                            i === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                            i === 1 ? 'bg-slate-100 text-slate-700 border border-slate-200' :
                            i === 2 ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                            'text-slate-400'
                         }`}>
                            {team.rank}
                         </div>
                         <div>
                            <p className="text-[14px] font-semibold text-slate-900">{team.dept}</p>
                            <p className="text-[11px] text-slate-500">{team.members} Active Users</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <p className="text-[16px] font-bold text-slate-900 tabular-nums">{team.score}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-medium">League Points</p>
                         </div>
                         <div className={`text-[11px] font-medium px-2 py-1 rounded ${
                            team.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 
                            team.trend === 'down' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
                         }`}>
                            {team.trend === 'up' ? '▲' : team.trend === 'down' ? '▼' : '-'} Trend
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Champions */}
          <div className="col-span-1 space-y-6">
             <div className="bg-white border border-slate-200 rounded-md p-6">
                <div className="flex items-center gap-2 mb-4">
                   <Crown className="w-5 h-5 text-yellow-500" />
                   <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Top Performer</h3>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-bold text-lg">
                      SC
                   </div>
                   <div>
                      <p className="text-[14px] font-bold text-slate-900">Sarah Connor</p>
                      <p className="text-[12px] text-slate-500">Finance Dept</p>
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-medium">
                         <Target className="w-3 h-3" /> 100% Accuracy
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-blue-50 border border-blue-100 rounded-md p-6">
                <h3 className="text-[13px] font-bold text-blue-900 uppercase tracking-wider mb-2">Next Reward</h3>
                <p className="text-[12px] text-blue-800 mb-4">Reach 1000 pts to unlock "Cyber Guardian" badge and company sway.</p>
                <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 w-3/4"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  // 4. Compliance Renderer
  const renderCompliance = () => (
    <div className="space-y-8 animate-enter">
       <div className="flex items-center justify-between">
          <div>
             <h2 className="text-[18px] font-semibold text-slate-900">Audit Readiness & Certification</h2>
             <p className="text-[13px] text-slate-500">Generate evidence for ISO 27001, GDPR, and NIS2 compliance audits.</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-slate-800 transition-colors">
             <Download className="w-4 h-4" /> Export Audit Log
          </button>
       </div>

       <div className="grid grid-cols-3 gap-6">
          {complianceData.map(comp => (
             <div key={comp.standard} className="bg-white border border-slate-200 rounded-md p-6 hover:border-blue-300 transition-colors">
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-slate-400" />
                      <h3 className="text-[14px] font-bold text-slate-900">{comp.standard}</h3>
                   </div>
                   <span className={`px-2 py-0.5 rounded text-[11px] font-bold border uppercase ${
                      comp.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      comp.status === 'Attention' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                      'bg-amber-50 text-amber-700 border-amber-100'
                   }`}>{comp.status}</span>
                </div>
                
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-[12px] font-medium text-slate-500 mb-1">
                         <span>Control Coverage</span>
                         <span className="text-slate-900">{comp.coverage}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${
                            comp.status === 'Ready' ? 'bg-emerald-500' : 'bg-amber-500'
                         }`} style={{ width: comp.coverage }}></div>
                      </div>
                   </div>
                   
                   <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-[12px] text-slate-500">{comp.gaps} Identified Gaps</span>
                      <button className="text-[12px] font-medium text-blue-600 hover:text-blue-800">View Details</button>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );

  // --- Drawers ---

  const renderStageDrawer = () => {
    if (!selectedStage) return null;
    const users = pipelineUsers[selectedStage as keyof typeof pipelineUsers] || [];

    return (
       <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedStage(null)} />
          <div className="relative w-[500px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col">
             <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-start">
                <div>
                   <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                      Stage Detail
                   </span>
                   <h2 className="text-lg font-bold text-slate-900">{selectedStage}</h2>
                   <p className="text-sm text-slate-500 mt-1">Managing {users.length} users in this stage</p>
                </div>
                <button onClick={() => setSelectedStage(null)} className="text-slate-400 hover:text-slate-600">
                   <X className="w-5 h-5" />
                </button>
             </div>
             {/* ... List Content ... */}
             <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {users.map((user: any) => (
                   <div key={user.id} className="p-4 border border-slate-200 rounded-md bg-white hover:border-blue-300 transition-all">
                      <div className="flex justify-between items-start mb-2">
                         <div>
                            <p className="text-[14px] font-semibold text-slate-900">{user.name}</p>
                            <p className="text-[12px] text-slate-500">{user.dept}</p>
                         </div>
                         {selectedStage === 'Learning' && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${
                               user.stuck ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}>{user.stuck ? 'Stalled' : 'Active'}</span>
                         )}
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                         <button onClick={() => handleNudge(user.id)} className="text-[11px] font-medium text-blue-600 hover:bg-blue-50 px-2 py-1 rounded">
                            Nudge User
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    );
  };

  const renderPathDetailDrawer = () => {
     if (!selectedPath) return null;

     return (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedPath(null)} />
           <div className="relative w-[600px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="px-8 py-6 bg-blue-50 border-b border-blue-100">
                 <button onClick={() => setSelectedPath(null)} className="absolute top-4 right-4 text-blue-400 hover:text-blue-700">
                    <X className="w-6 h-6" />
                 </button>
                 <div className="w-12 h-12 bg-white rounded-lg border border-blue-100 flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                    <selectedPath.icon className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-bold text-blue-900 mb-2">{selectedPath.title}</h2>
                 <p className="text-[13px] text-blue-800 leading-relaxed max-w-md">{selectedPath.description}</p>
                 
                 <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                       <div className="w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{width: selectedPath.progress}}></div>
                       </div>
                       <span className="text-[11px] font-bold text-blue-700">{selectedPath.progress}</span>
                    </div>
                    <span className="text-[11px] text-blue-600 font-medium bg-white px-2 py-0.5 rounded border border-blue-100">
                       {selectedPath.modules} Modules
                    </span>
                 </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 {/* Skills Section */}
                 <div>
                    <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-3">Skills Acquired</h3>
                    <div className="flex flex-wrap gap-2">
                       {selectedPath.skills.map((skill: string) => (
                          <span key={skill} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[12px] font-medium text-slate-700 flex items-center gap-1.5">
                             <Zap className="w-3 h-3 text-amber-400 fill-current" />
                             {skill}
                          </span>
                       ))}
                    </div>
                 </div>

                 {/* Metro Map Curriculum */}
                 <div>
                    <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4">Journey Map</h3>
                    <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pl-8 py-2">
                       {selectedPath.curriculum.map((item: any, i: number) => (
                          <div key={i} className="relative group">
                             {/* Dot */}
                             <div className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 bg-white ${
                                item.status === 'Completed' ? 'border-emerald-500 text-emerald-500' : 
                                item.status === 'In Progress' ? 'border-blue-500 text-blue-500' : 
                                'border-slate-200 text-slate-300'
                             }`}>
                                {item.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                                {item.status === 'In Progress' && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>}
                                {item.status === 'Locked' && <div className="w-2 h-2 bg-slate-200 rounded-full"></div>}
                             </div>

                             <div className={`p-4 border rounded-lg transition-all ${
                                item.status === 'Locked' ? 'bg-slate-50 border-slate-100 opacity-70' : 
                                'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
                             }`}>
                                <div className="flex justify-between items-start mb-1">
                                   <span className={`text-[10px] font-bold uppercase tracking-wide ${
                                      item.status === 'Locked' ? 'text-slate-400' : 'text-blue-600'
                                   }`}>{item.type}</span>
                                   <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {item.duration}
                                   </span>
                                </div>
                                <h4 className={`text-[14px] font-semibold ${item.status === 'Locked' ? 'text-slate-500' : 'text-slate-900'}`}>
                                   {item.title}
                                </h4>
                                {item.status !== 'Locked' && (
                                   <button className="mt-3 text-[12px] font-medium text-blue-600 hover:underline">
                                      {item.status === 'Completed' ? 'Review' : 'Continue'}
                                   </button>
                                )}
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
     );
  };

  const renderContentDetailDrawer = () => {
     if (!selectedContent) return null;

     return (
        <div className="fixed inset-0 z-50 flex justify-end">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setSelectedContent(null)} />
           <div className="relative w-[700px] bg-white h-full shadow-2xl animate-slide-in-right border-l border-slate-200 flex flex-col overflow-hidden">
              {/* Video Player / Header */}
              <div className="bg-slate-900 aspect-video relative group">
                 <button onClick={() => setSelectedContent(null)} className="absolute top-4 right-4 text-white/50 hover:text-white z-20">
                    <X className="w-6 h-6" />
                 </button>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group-hover:bg-white/20">
                       <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-xl font-bold text-white mb-1">{selectedContent.title}</h2>
                    <p className="text-sm text-white/70 flex items-center gap-3">
                       <span>{selectedContent.duration}</span>
                       <span>•</span>
                       <span>{selectedContent.type}</span>
                    </p>
                 </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto">
                 <div className="p-8 border-b border-slate-100">
                    <div className="flex items-start gap-6">
                       <div className="flex-1">
                          <h3 className="text-[14px] font-bold text-slate-900 mb-2">Description</h3>
                          <p className="text-[13px] text-slate-600 leading-relaxed">{selectedContent.description}</p>
                       </div>
                       <div className="w-48 shrink-0 space-y-3">
                          <button className="w-full bg-blue-600 text-white py-2 rounded-md text-[13px] font-bold hover:bg-blue-700 transition-colors">Start Module</button>
                          <button className="w-full bg-white border border-slate-200 text-slate-700 py-2 rounded-md text-[13px] font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                             <Share2 className="w-3.5 h-3.5" /> Share
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-3 h-full min-h-[400px]">
                    <div className="col-span-2 p-8 border-r border-slate-100">
                       <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-2">
                          <button className="text-[13px] font-bold text-blue-600 border-b-2 border-blue-600 pb-2">Transcript</button>
                          <button className="text-[13px] font-medium text-slate-500 hover:text-slate-800 pb-2">Resources</button>
                       </div>
                       <div className="prose prose-sm max-w-none">
                          <p className="text-[13px] text-slate-600 leading-relaxed font-mono bg-slate-50 p-4 rounded border border-slate-100">
                             <span className="text-blue-600 font-bold">00:00</span> {selectedContent.transcript}
                             <br/><br/>
                             <span className="text-blue-600 font-bold">00:45</span> Phishing attacks often use urgency to bypass critical thinking...
                          </p>
                       </div>
                    </div>
                    <div className="col-span-1 bg-slate-50 p-6">
                       <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-4">Reviews</h3>
                       <div className="space-y-4">
                          {selectedContent.reviews.length > 0 ? selectedContent.reviews.map((review: any, i: number) => (
                             <div key={i} className="bg-white p-3 rounded border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-1">
                                   <span className="text-[12px] font-bold text-slate-900">{review.user}</span>
                                   <div className="flex text-amber-400">
                                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                   </div>
                                </div>
                                <p className="text-[11px] text-slate-600 italic">"{review.comment}"</p>
                             </div>
                          )) : (
                             <p className="text-[12px] text-slate-400 italic">No reviews yet.</p>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     );
  };

  const renderAssignModal = () => {
     if (!isAssignModalOpen) return null;

     return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setIsAssignModalOpen(false)} />
           <div className="relative bg-white rounded-lg shadow-modal w-full max-w-2xl overflow-hidden ring-1 ring-black/5 animate-slide-up flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                 <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">Assign Training Content</h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">Distribute materials to specific groups or departments</p>
                 </div>
                 <button onClick={() => setIsAssignModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                 </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                 <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Select Content</label>
                    <select className="w-full h-10 px-3 bg-white border border-slate-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                       <option>Phishing Fundamentals</option>
                       <option>Password Hygiene</option>
                       <option>GDPR Data Handling</option>
                    </select>
                 </div>
                 {/* ... rest of form ... */}
              </div>

              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0">
                 <button onClick={() => setIsAssignModalOpen(false)} className="px-4 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900">Cancel</button>
                 <button onClick={handleAssign} className="px-4 py-2 bg-blue-600 text-white rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all">Assign Content</button>
              </div>
           </div>
        </div>
     );
  };

  return (
    <div className="min-h-full bg-dot-pattern pb-12 relative">
       {/* Header */}
       <div className="bg-white border-b border-slate-200 px-8 pt-6 sticky top-0 z-20 shadow-sm">
         <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
               <div>
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider border border-blue-100 bg-blue-50 px-2 py-0.5 rounded-md">Culture Engine</span>
                  </div>
                  <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">Training & Awareness</h1>
               </div>
               <button 
                  onClick={() => setIsAssignModalOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] font-medium hover:bg-blue-700 shadow-sm transition-all"
               >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Training</span>
               </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-6">
               {['overview', 'library', 'gamification', 'compliance'].map((tab) => (
                  <button 
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`pb-3 text-[13px] font-medium transition-all border-b-2 capitalize ${
                        activeTab === tab 
                        ? 'text-blue-600 border-blue-600' 
                        : 'text-slate-500 border-transparent hover:text-slate-800'
                     }`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-8">
         {activeTab === 'overview' && renderOverview()}
         {activeTab === 'library' && renderLibrary()}
         {activeTab === 'gamification' && renderGamification()}
         {activeTab === 'compliance' && renderCompliance()}
      </div>

      {renderStageDrawer()}
      {renderPathDetailDrawer()}
      {renderContentDetailDrawer()}
      {renderAssignModal()}
    </div>
  );
};

export default Training;
