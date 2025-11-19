import React from 'react';
import { 
  Shield, 
  Play, 
  CheckCircle2, 
  Clock,
  BookOpen,
  Lock,
  Circle
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Phishing Fundamentals",
    type: "Training",
    duration: "5 min",
    status: "Pending",
    priority: "High",
    description: "Learn to identify suspicious email headers."
  },
  {
    id: 2,
    title: "Password Security Policy",
    type: "Policy",
    duration: "2 min",
    status: "Pending",
    priority: "Medium",
    description: "Review the updated quarterly requirements."
  },
  {
    id: 3,
    title: "Q3 Security Quiz",
    type: "Assessment",
    duration: "10 min",
    status: "Completed",
    priority: "Medium",
    description: "Test your knowledge on recent tactics."
  }
];

const TaskItem: React.FC<{ task: any }> = ({ task }) => (
  <div className={`group flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer ${task.status === 'Completed' ? 'opacity-60' : ''}`}>
    <div className="mt-0.5">
        {task.status === 'Completed' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-indigo-500 transition-colors"></div>
        )}
    </div>
    
    <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
            <h4 className={`text-[14px] font-medium ${task.status === 'Completed' ? 'text-slate-500 line-through' : 'text-slate-900'}`}>{task.title}</h4>
            {task.priority === 'High' && task.status !== 'Completed' && (
                <span className="px-1.5 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded border border-rose-100 uppercase tracking-wide">Urgent</span>
            )}
        </div>
        <p className="text-[13px] text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
        
        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
               <Clock className="w-3 h-3" /> {task.duration}
            </span>
            <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
               <BookOpen className="w-3 h-3" /> {task.type}
            </span>
        </div>
    </div>

    <div className="opacity-0 group-hover:opacity-100 transition-opacity self-center">
        {task.status !== 'Completed' && (
            <button className="px-3 py-1.5 bg-slate-900 text-white text-[11px] font-bold rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1">
                Start <Play className="w-3 h-3 fill-current" />
            </button>
        )}
    </div>
  </div>
);

const EmployeeDashboard: React.FC = () => {
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const progress = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
         <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Your Security Checklist</h1>
         <p className="text-[13px] text-slate-500 mt-1 leading-relaxed">Complete these tasks to maintain compliance.</p>
      </div>

      {/* Progress Ring Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-8 shadow-sm flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
               <Shield className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
               <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">{progress}%</div>
               <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Compliance Score</div>
            </div>
         </div>
         <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }}></div>
         </div>
      </div>

      {/* Tasks */}
      <div className="space-y-6">
        <div>
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">To Do</h3>
            <div className="space-y-3">
                {tasks.filter(t => t.status === 'Pending').map(task => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </div>
        </div>

        {/* Future Items */}
        <div className="opacity-75">
             <div className="flex items-center p-4 bg-slate-50/50 border border-dashed border-slate-300 rounded-lg">
                <div className="mr-4">
                     <Lock className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                    <h4 className="text-[14px] font-medium text-slate-500">Advanced Engineering</h4>
                    <p className="text-[12px] text-slate-400 leading-relaxed">Unlocks after completing fundamentals</p>
                </div>
            </div>
        </div>

        {completedCount > 0 && (
            <div>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 mt-6">Completed</h3>
                <div className="space-y-3">
                    {tasks.filter(t => t.status === 'Completed').map(task => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;