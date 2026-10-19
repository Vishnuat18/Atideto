import React, { useState } from 'react';
import { 
  Home, 
  GraduationCap, 
  Briefcase, 
  User, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  ArrowRight, 
  ArrowLeft, 
  Play, 
  CheckCircle2, 
  Clock, 
  Star, 
  FileText, 
  Download, 
  Layers, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Award
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import atidetoLogo from '@/assets/atideto/logo.png';
import atidetoWordmark from '@/assets/atideto/atideto.png';

interface StudentProps {
  user: {
    uid?: string;
    name: string;
    email: string;
    role: string;
  };
  onSwitchToAdmin?: () => void;
}

interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  rating: number;
  progress: number;
  category: string;
  lessons: { id: number; title: string; duration: string; completed: boolean }[];
}

const SAMPLE_COURSES: CourseItem[] = [
  {
    id: 'gen-ai',
    title: 'Generative AI & LLM Systems Engineering',
    instructor: 'Atideto AI Engineering Lead',
    duration: '12 Weeks',
    rating: 4.95,
    progress: 72,
    category: 'AI & Machine Learning',
    lessons: [
      { id: 1, title: 'Foundations of Transformers & Attention Mechanisms', duration: '45 min', completed: true },
      { id: 2, title: 'LangChain & LlamaIndex Production Pipelines', duration: '55 min', completed: true },
      { id: 3, title: 'Advanced RAG with Vector DBs (Pinecone & Qdrant)', duration: '60 min', completed: true },
      { id: 4, title: 'Fine-Tuning Open Source LLMs with LoRA / QLoRA', duration: '65 min', completed: false },
      { id: 5, title: 'Multi-Agent Workflows with CrewAI & LangGraph', duration: '50 min', completed: false },
      { id: 6, title: 'Deploying Scalable AI Services via FastAPI & Docker', duration: '40 min', completed: false },
    ]
  },
  {
    id: 'fullstack-next',
    title: 'Next.js 15, React 19 & TypeScript Systems',
    instructor: 'Principal Frontend Architect',
    duration: '10 Weeks',
    rating: 4.92,
    progress: 88,
    category: 'Full Stack & Web',
    lessons: [
      { id: 1, title: 'Server Components, Actions & Streaming SSR', duration: '40 min', completed: true },
      { id: 2, title: 'State Architecture with Zustand & TanStack Query', duration: '50 min', completed: true },
      { id: 3, title: 'Database Modeling with PostgreSQL & Prisma', duration: '55 min', completed: true },
      { id: 4, title: 'Micro-Animations with Framer Motion & Tailwind', duration: '45 min', completed: true },
      { id: 5, title: 'Authentication & RBAC with Firebase / NextAuth', duration: '50 min', completed: false },
    ]
  },
  {
    id: 'cloud-devops',
    title: 'AWS & GCP Cloud Native Architecture with Kubernetes',
    instructor: 'Cloud Operations Lead',
    duration: '12 Weeks',
    rating: 4.88,
    progress: 40,
    category: 'Cloud & DevOps',
    lessons: [
      { id: 1, title: 'Cloud Infrastructure with Terraform (IaC)', duration: '45 min', completed: true },
      { id: 2, title: 'Containerization & Multi-Stage Docker Builds', duration: '50 min', completed: true },
      { id: 3, title: 'Kubernetes Pods, Services, Ingress & Helm', duration: '70 min', completed: false },
      { id: 4, title: 'CI/CD Automated Pipelines with GitHub Actions', duration: '50 min', completed: false },
    ]
  },
  {
    id: 'cyber-sec',
    title: 'Offensive Cyber Security & Penetration Testing',
    instructor: 'Certified Ethical Hacker Lead',
    duration: '14 Weeks',
    rating: 4.90,
    progress: 25,
    category: 'Cyber Security',
    lessons: [
      { id: 1, title: 'Network Protocols & Vulnerability Reconnaissance', duration: '60 min', completed: true },
      { id: 2, title: 'Web App Security & OWASP Top 10 Exploitation', duration: '75 min', completed: false },
      { id: 3, title: 'Privilege Escalation & Linux/Windows Post-Exploit', duration: '65 min', completed: false },
    ]
  }
];

const INTERNSHIP_RECORDS = [
  {
    id: 'INT-2026-089',
    role: 'AI & Automation Engineering Intern',
    company: 'Atideto Technologies Pvt. Ltd.',
    mentor: 'Chief Technology Officer',
    status: 'Active · In Progress',
    startDate: '01 Nov 2026',
    endDate: '31 Jan 2027',
    attendancePercent: 96,
    stipend: '₹15,000 / month',
    offerLetterUrl: '#',
    certStatus: 'Eligible upon completion'
  },
  {
    id: 'INT-2026-042',
    role: 'Full Stack Web Platform Intern',
    company: 'Atideto Technologies Pvt. Ltd.',
    mentor: 'Lead Solutions Architect',
    status: 'Completed · Verified',
    startDate: '01 Jul 2026',
    endDate: '30 Sep 2026',
    attendancePercent: 100,
    stipend: '₹12,000 / month',
    offerLetterUrl: '#',
    certStatus: 'Certificate Issued & Verified'
  }
];

export default function StudentBlackWhiteDashboard({ user, onSwitchToAdmin }: StudentProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'courses' | 'internships' | 'profile' | 'player'>('home');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>(SAMPLE_COURSES[0]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCourses = SAMPLE_COURSES.filter(c => {
    const matchCat = categoryFilter === 'All' || c.category === categoryFilter;
    const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full bg-[#FFFFFF] text-[#000000] font-sans rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
      <div className="flex min-h-[880px]">
        
        {/* ── LEFT VERTICAL BLACK PILL SIDEBAR (Image 2 Style) ── */}
        <aside className="w-20 md:w-24 bg-[#0A0A0A] text-white flex flex-col items-center justify-between py-8 px-2 shrink-0 select-none m-3 rounded-2xl">
          {/* Top Logo Initial */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-lg shadow-md font-mono">
              A.
            </div>
            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-bold">
              STUDENT
            </span>
          </div>

          {/* Navigation Pill Stack */}
          <nav className="flex flex-col items-center gap-5 my-auto">
            <button
              onClick={() => setActiveTab('home')}
              title="Overview Dashboard"
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white text-black shadow-md scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home size={20} strokeWidth={2.2} />
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              title="My Courses"
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'courses' || activeTab === 'player'
                  ? 'bg-white text-black shadow-md scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap size={20} strokeWidth={2.2} />
            </button>

            <button
              onClick={() => setActiveTab('internships')}
              title="My Internships"
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'internships'
                  ? 'bg-white text-black shadow-md scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Briefcase size={20} strokeWidth={2.2} />
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              title="Profile & Certificates"
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-white text-black shadow-md scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <User size={20} strokeWidth={2.2} />
            </button>

            <button
              onClick={() => navigate('/services')}
              title="Browse Services"
              className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Layers size={20} strokeWidth={2.2} />
            </button>
          </nav>

          {/* Bottom Logout */}
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LogOut size={20} strokeWidth={2.2} />
          </button>
        </aside>

        {/* ── RIGHT MAIN WORKSPACE (Pure Black & White Minimalist Design) ── */}
        <main className="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
          
          {/* Top Bar: Search, Notifications & Student Avatar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search courses, modules, internships, or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:border-black transition-all"
              />
            </div>

            {/* Right Tools */}
            <div className="flex items-center gap-3">
              {onSwitchToAdmin && (
                <button
                  onClick={onSwitchToAdmin}
                  className="text-xs bg-black text-white hover:bg-black/85 px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Admin ERP</span>
                  <ChevronRight size={14} />
                </button>
              )}

              <button 
                title="Notifications"
                className="p-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-black transition-colors relative cursor-pointer"
              >
                <Bell size={18} strokeWidth={2} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-black" />
              </button>

              <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                <div className="w-10 h-10 rounded-full bg-black text-white font-bold flex items-center justify-center text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-black leading-tight">
                    {user.name || 'Student'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {user.email || 'student@atideto.in'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ══════════ TAB 1: OVERVIEW HOME (Exact Image 2 Style) ══════════ */}
          {activeTab === 'home' && (
            <div className="py-6 space-y-8 animate-in fade-in duration-300">
              
              {/* Row 1: Welcome Banner + Metric Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Greeting Card with B&W Vector Character */}
                <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex items-center justify-between shadow-sm relative overflow-hidden">
                  <div className="space-y-2 z-10 max-w-[280px]">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Hello {user.name ? user.name.split(' ')[0] : 'Student'}!
                    </h2>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      It's good to see you again. Track your active courses, assignments, and industry internships.
                    </p>
                  </div>

                  {/* Minimalist Black & White Character Vector Illustration */}
                  <div className="relative shrink-0 flex items-center justify-center w-32 h-32 select-none pointer-events-none">
                    <svg viewBox="0 0 160 160" className="w-full h-full" fill="none">
                      {/* Character outline */}
                      <circle cx="80" cy="55" r="32" stroke="#000000" strokeWidth="3" fill="#FFFFFF" />
                      {/* Glasses */}
                      <rect x="58" y="48" width="18" height="14" rx="4" stroke="#000000" strokeWidth="2.5" />
                      <rect x="84" y="48" width="18" height="14" rx="4" stroke="#000000" strokeWidth="2.5" />
                      <line x1="76" y1="55" x2="84" y2="55" stroke="#000000" strokeWidth="2.5" />
                      {/* Eyes */}
                      <circle cx="67" cy="55" r="2.5" fill="#000000" />
                      <circle cx="93" cy="55" r="2.5" fill="#000000" />
                      {/* Smile */}
                      <path d="M 72 68 Q 80 74 88 68" stroke="#000000" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Hair */}
                      <path d="M 52 42 Q 80 18 108 42" stroke="#000000" strokeWidth="3" fill="#000000" />
                      {/* Body & Shirt */}
                      <path d="M 38 140 C 44 100, 116 100, 122 140" stroke="#000000" strokeWidth="3" fill="#000000" />
                      {/* Waving Hand */}
                      <path d="M 46 112 Q 30 92 34 80 Q 42 76 46 88" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
                      <path d="M 34 80 L 32 74 M 36 78 L 36 70 M 40 79 L 42 72" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* 2 Metric Stats Cards */}
                <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-sm">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Completed
                  </div>
                  <div className="my-auto py-2">
                    <div className="text-4xl sm:text-5xl font-black text-black font-mono">
                      11
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-1">
                      Courses & modules completed
                    </div>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-black rounded-full" />
                  </div>
                </div>

                <div className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 flex flex-col justify-between shadow-sm">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    In Progress
                  </div>
                  <div className="my-auto py-2">
                    <div className="text-4xl sm:text-5xl font-black text-black font-mono">
                      4
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-1">
                      Programs & tracks active
                    </div>
                  </div>
                  <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* Row 2: Active Continue Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black text-white font-mono font-bold flex items-center justify-center text-sm shrink-0">
                    AI
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      {selectedCourse.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      by {selectedCourse.instructor} · Next: Lesson {activeLessonIndex + 1}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                  {/* Progress Ring Badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-black">{selectedCourse.progress}%</span>
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${selectedCourse.progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('player')}
                    className="px-6 py-2.5 rounded-full bg-black hover:bg-slate-800 text-white text-xs font-bold tracking-wide transition-all cursor-pointer shadow-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>

              {/* Row 3: 2 Columns - Courses Directory (Left 7) & Learning Statistics + Upgrade (Right 5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT: Courses List (Image 2 style) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Courses
                    </h3>
                    {/* Category tabs */}
                    <div className="flex items-center gap-2 text-xs">
                      {['All', 'AI & Machine Learning', 'Full Stack & Web'].map(cat => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                            categoryFilter === cat ? 'bg-black text-white font-bold' : 'text-slate-400 hover:text-black'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {filteredCourses.map(course => (
                      <div
                        key={course.id}
                        className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between shadow-sm hover:border-black/50 transition-all group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-black flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                            {course.title.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-black group-hover:underline">
                              {course.title}
                            </div>
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                              <span>by {course.instructor}</span>
                              <span>·</span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} /> {course.duration}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1 font-semibold text-black">
                                <Star size={11} className="fill-black text-black" /> {course.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setActiveTab('player');
                          }}
                          className="px-4 py-2 rounded-lg bg-black hover:bg-slate-800 text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                        >
                          View course
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Learning Statistics Chart & "Learn even more!" card */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* "Your statistics" Clean Spline Chart (Image 2 style) */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Your statistics
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span className="font-bold text-black">Learning Hours</span>
                        <span>·</span>
                        <span className="text-slate-400">Weekly ▾</span>
                      </div>
                    </div>

                    {/* SVG Spline Graph in pure Black & White */}
                    <div className="w-full h-36 pt-2 select-none">
                      <svg viewBox="0 0 320 120" className="w-full h-full" fill="none">
                        {/* Horizontal Grid lines */}
                        <line x1="20" y1="20" x2="300" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="20" y1="50" x2="300" y2="50" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="20" y1="80" x2="300" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                        <line x1="20" y1="110" x2="300" y2="110" stroke="#F1F5F9" strokeWidth="1" />

                        {/* Spline Path */}
                        <path
                          d="M 30 110 C 60 95, 80 75, 110 50 C 140 30, 160 90, 190 70 C 220 50, 240 20, 270 20 C 285 20, 295 50, 300 65"
                          stroke="#000000"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Data Points with tooltips */}
                        <circle cx="30" cy="110" r="4" fill="#000000" />
                        <circle cx="110" cy="50" r="4" fill="#000000" />
                        <text x="110" y="42" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000000">2.5h</text>

                        <circle cx="190" cy="70" r="4" fill="#000000" />
                        <text x="190" y="62" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000000">1h</text>

                        <circle cx="270" cy="20" r="4" fill="#000000" />
                        <text x="270" y="14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000000">4h</text>

                        <circle cx="300" cy="65" r="4" fill="#000000" />
                      </svg>
                      {/* Weekday Labels */}
                      <div className="flex justify-between px-2 text-[10px] text-slate-400 font-mono">
                        <span>mon</span>
                        <span>tue</span>
                        <span>wed</span>
                        <span>thu</span>
                        <span>fri</span>
                        <span>sat</span>
                        <span>sun</span>
                      </div>
                    </div>
                  </div>

                  {/* "Learn even more!" Card (Image 2 style) */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Learn even more!
                      </h4>
                      <p className="text-xs text-slate-500">
                        Unlock live corporate internships, 1-on-1 mentor code reviews & verified certificates.
                      </p>
                      <button
                        onClick={() => setActiveTab('internships')}
                        className="px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Explore Internships
                      </button>
                    </div>

                    {/* Minimalist Brain / Book Vector */}
                    <div className="shrink-0 w-16 h-16 select-none opacity-80">
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                        <path d="M 20 70 Q 50 60 50 85 Q 50 60 80 70 L 80 30 Q 50 20 50 45 Q 50 20 20 30 Z" stroke="#000000" strokeWidth="3" fill="#FFFFFF" />
                        <circle cx="50" cy="35" r="16" stroke="#000000" strokeWidth="2.5" strokeDasharray="3 3" />
                        <line x1="50" y1="45" x2="50" y2="85" stroke="#000000" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ══════════ TAB 2: COURSE & LESSON VIDEO PLAYER (Image 1 Style) ══════════ */}
          {activeTab === 'player' && (
            <div className="py-4 space-y-6 animate-in fade-in duration-200">
              {/* Back to Overview */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('courses')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-black hover:underline cursor-pointer"
                >
                  <ArrowLeft size={14} /> Back to Courses
                </button>
                <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  Lesson {activeLessonIndex + 1} of {selectedCourse.lessons.length}
                </span>
              </div>

              {/* Title Header */}
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-black tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Course – {selectedCourse.title}
                </h2>
              </div>

              {/* Grid: Main Video Player (Left 8) + Lessons List (Right 4) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Main Video Screen */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="relative aspect-video w-full rounded-2xl bg-black text-white flex flex-col justify-between p-6 overflow-hidden shadow-lg border border-slate-300">
                    {/* Simulated Player Ambient Screen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-black to-slate-800 opacity-90" />
                    
                    {/* Top Status */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-white border border-white/20">
                        HD 1080p · 60fps
                      </span>
                      <span className="text-xs text-slate-300 font-mono">
                        Atideto Academy Player
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer">
                        <Play size={24} className="ml-1 fill-black" />
                      </div>
                      <span className="text-xs font-medium text-slate-300">
                        {selectedCourse.lessons[activeLessonIndex]?.title}
                      </span>
                    </div>

                    {/* Bottom Video Controls Bar */}
                    <div className="relative z-10 space-y-2">
                      {/* Timeline Slider */}
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                        <div className="w-1/3 h-full bg-white rounded-full" />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>14:20 / {selectedCourse.lessons[activeLessonIndex]?.duration}</span>
                        <span>Auto Next</span>
                      </div>
                    </div>
                  </div>

                  {/* Lesson Meta Details (Image 1 style) */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center font-mono">
                          L{activeLessonIndex + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-black">
                            Lesson {activeLessonIndex + 1} – {selectedCourse.lessons[activeLessonIndex]?.title}
                          </h4>
                          <span className="text-[11px] text-slate-500 font-mono">
                            @{selectedCourse.instructor} · Verified Instructor
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-50 cursor-pointer">
                          ★ Bookmark
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-black text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer">
                          Next Lesson →
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      In this module, you build direct production-ready systems using the official Atideto curriculum. Complete all code walkthroughs and submit lab results to achieve verified accreditation.
                    </p>
                  </div>
                </div>

                {/* Right Lessons Drawer (Image 1 style) */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center justify-between pb-1">
                    <h3 className="text-sm font-bold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                      Lessons ({selectedCourse.lessons.length})
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      Progress: {selectedCourse.progress}%
                    </span>
                  </div>

                  <div className="space-y-2">
                    {selectedCourse.lessons.map((lesson, idx) => {
                      const isActive = activeLessonIndex === idx;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isActive
                              ? 'bg-black text-white border-black shadow-md'
                              : 'bg-white text-black border-slate-200 hover:border-black'
                          }`}
                        >
                          <div className="flex items-center gap-3 truncate pr-2">
                            <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-mono font-bold shrink-0 ${
                              isActive ? 'bg-white text-black' : 'bg-slate-100 text-black'
                            }`}>
                              0{lesson.id}
                            </span>
                            <div className="truncate">
                              <div className="text-xs font-bold truncate">
                                {lesson.title}
                              </div>
                              <div className={`text-[10px] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                                Lesson {lesson.id} · {lesson.duration}
                              </div>
                            </div>
                          </div>

                          {lesson.completed ? (
                            <CheckCircle2 size={16} className={isActive ? 'text-white shrink-0' : 'text-black shrink-0'} />
                          ) : (
                            <span className={`text-[10px] font-mono shrink-0 ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                              Start
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Attached Resources Card */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-black">Lesson Resources</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black text-white">+4 Files</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <a href="#" className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-slate-700 hover:text-black">
                        <span className="flex items-center gap-2"><FileText size={13} /> Starter_Project.zip</span>
                        <Download size={13} />
                      </a>
                      <a href="#" className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 text-slate-700 hover:text-black">
                        <span className="flex items-center gap-2"><FileText size={13} /> Architecture_Diagram.pdf</span>
                        <Download size={13} />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ══════════ TAB 3: ALL COURSES DIRECTORY ══════════ */}
          {activeTab === 'courses' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    All Enrolled & Available Courses
                  </h2>
                  <p className="text-xs text-slate-500">
                    Master industry tools with production labs and structured syllabi.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {['All', 'AI & Machine Learning', 'Full Stack & Web', 'Cloud & DevOps', 'Cyber Security'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        categoryFilter === cat ? 'bg-black text-white' : 'bg-slate-100 text-slate-700 hover:text-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCourses.map(c => (
                  <div key={c.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-4 hover:border-black transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="font-bold text-black uppercase">{c.category}</span>
                        <span>{c.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold text-black">{c.title}</h3>
                      <p className="text-xs text-slate-500">Instructor: {c.instructor}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Modules Completed</span>
                        <span className="font-bold font-mono">{c.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${c.progress}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="flex items-center gap-1 text-xs font-bold font-mono">
                        <Star size={13} className="fill-black text-black" /> {c.rating}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedCourse(c);
                          setActiveTab('player');
                        }}
                        className="px-5 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Enter Course Player →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ TAB 4: INTERNSHIPS DASHBOARD ══════════ */}
          {activeTab === 'internships' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    My Internship Records & Workflows
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live tracking of active corporate internships, attendance sheets & certificates.
                  </p>
                </div>

                <button
                  onClick={() => navigate('/academy')}
                  className="px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Apply For New Track +
                </button>
              </div>

              <div className="space-y-4">
                {INTERNSHIP_RECORDS.map(rec => (
                  <div key={rec.id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                      <div>
                        <div className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                          Record #{rec.id} · {rec.company}
                        </div>
                        <h3 className="text-lg font-bold text-black mt-0.5">
                          {rec.role}
                        </h3>
                        <div className="text-xs text-slate-500 mt-1">
                          Assigned Mentor: <strong className="text-black">{rec.mentor}</strong>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-black text-xs font-bold border border-slate-300">
                          {rec.status}
                        </span>
                        <div className="text-[11px] font-mono text-slate-500 mt-2">
                          {rec.startDate} → {rec.endDate}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 block mb-1">Attendance Record</span>
                        <span className="text-lg font-extrabold font-mono text-black">{rec.attendancePercent}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 block mb-1">Monthly Stipend</span>
                        <span className="text-lg font-extrabold font-mono text-black">{rec.stipend}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 block mb-1">Accreditation</span>
                        <span className="text-xs font-bold text-black">{rec.certStatus}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer">
                        <FileText size={13} /> View Offer Letter
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer">
                        <Award size={13} /> Request Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════════ TAB 5: PROFILE & VERIFICATIONS ══════════ */}
          {activeTab === 'profile' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <h2 className="text-2xl font-extrabold text-black" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Student Profile & Account Settings
              </h2>
              
              <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-6 max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-black text-white text-2xl font-bold flex items-center justify-center font-mono">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black">{user.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{user.email}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-black text-[10px] font-mono font-bold border border-slate-200">
                      STUDENT ACCREDITATION · VERIFIED
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Student Database ID:</span>
                    <span className="font-mono font-bold text-black">ATD-STU-{user.uid?.slice(0, 8) || '2026-99'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Affiliation:</span>
                    <span className="font-semibold text-black">Atideto Academy Graduate Track</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Total Courses Enrolled:</span>
                    <span className="font-mono font-bold text-black">{SAMPLE_COURSES.length} Programs</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Security Credentials:</span>
                    <span className="text-black font-medium">Firebase Auth & Verified Session</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer inside workspace */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>© {new Date().getFullYear()} Atideto Technologies · Student Learning Platform</span>
            <span className="font-mono">Black & White Edition · v2.4</span>
          </div>

        </main>

      </div>
    </div>
  );
}
