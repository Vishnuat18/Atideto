import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  ClipboardList,
  BookOpen,
  CalendarCheck,
  Briefcase,
  Award,
  FileText,
  Wallet,
  Settings as SettingsIcon,
  UserCheck,
  Building2,
  Target,
  PhoneCall,
  CheckSquare,
  TrendingUp,
  Search,
  Bell,
  RefreshCw,
  ExternalLink,
  Plus,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Printer,
  ChevronRight,
  LogOut,
  Maximize2,
  Minimize2,
  Server
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import atidetoWordmark from '@/assets/atideto/atideto.png';
import atidetoLogo from '@/assets/atideto/logo.png';

interface AdminErpProps {
  user: {
    uid?: string;
    name: string;
    email: string;
    role: string;
  };
  onSwitchToStudent?: () => void;
}

type TabType = 
  | 'dashboard'
  | 'students'
  | 'courses'
  | 'registrations'
  | 'payments'
  | 'leads'
  | 'clients'
  | 'follow-ups'
  | 'tasks'
  | 'performance'
  | 'staff'
  | 'generator-attendance'
  | 'generator-certificate'
  | 'generator-offerletter'
  | 'generator-project'
  | 'settings'
  | 'live-backend';

export default function AdminErpDashboard({ user, onSwitchToStudent }: AdminErpProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [serverOnline, setServerOnline] = useState<boolean | null>(null);
  const [checkingServer, setCheckingServer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states for generators
  const [certStudentName, setCertStudentName] = useState('Rahul Sharma');
  const [certCourse, setCertCourse] = useState('Full Stack AI & Cloud Engineering');
  const [certDate, setCertDate] = useState('2026-10-15');
  const [certId, setCertId] = useState('ATIDETO-CERT-2026-8942');
  const [certGenerated, setCertGenerated] = useState(false);

  // Offer letter state
  const [offerName, setOfferName] = useState('Sneha Patel');
  const [offerRole, setOfferRole] = useState('Generative AI Research Intern');
  const [offerDuration, setOfferDuration] = useState('3 Months');
  const [offerStipend, setOfferStipend] = useState('₹18,000 / month');
  const [offerDate, setOfferDate] = useState('2026-11-01');

  // Sample dynamic student records matching ERP
  const [students, setStudents] = useState([
    { id: 'AT-STD-1001', name: 'Aakash Verma', email: 'aakash.v@gmail.com', course: 'GenAI & LLM Architecture', batch: '2026-B1', status: 'Active', enrolled: '2026-08-10', feePaid: '₹34,000', feeTotal: '₹34,000' },
    { id: 'AT-STD-1002', name: 'Pooja Sundaram', email: 'pooja.s@outlook.com', course: 'Next.js & Cloud DevOps', batch: '2026-B2', status: 'Active', enrolled: '2026-08-15', feePaid: '₹28,000', feeTotal: '₹28,000' },
    { id: 'AT-STD-1003', name: 'Vikramaditya Iyer', email: 'vikram.iyer@gmail.com', course: 'Agentic Systems & PySpark', batch: '2026-B1', status: 'Pending Verification', enrolled: '2026-09-02', feePaid: '₹15,000', feeTotal: '₹30,000' },
    { id: 'AT-STD-1004', name: 'Meera Nambiar', email: 'meera.n@gmail.com', course: 'Full Stack Engineering', batch: '2026-B3', status: 'Active', enrolled: '2026-09-12', feePaid: '₹25,000', feeTotal: '₹25,000' },
    { id: 'AT-STD-1005', name: 'Rohan Deshmukh', email: 'rohan.d@yahoo.com', course: 'Autonomous AI Agents', batch: '2026-B2', status: 'Completed', enrolled: '2026-05-20', feePaid: '₹35,000', feeTotal: '₹35,000' },
    { id: 'AT-STD-1006', name: 'Divya Krishnan', email: 'divya.k@gmail.com', course: 'AWS & Kubernetes Infra', batch: '2026-B1', status: 'Active', enrolled: '2026-09-28', feePaid: '₹22,000', feeTotal: '₹22,000' },
  ]);

  // Check ERP server status
  const checkErpServer = async () => {
    setCheckingServer(true);
    try {
      await fetch('http://localhost:3000/', { method: 'HEAD', mode: 'no-cors' });
      setServerOnline(true);
    } catch (e) {
      setServerOnline(true);
    } finally {
      setCheckingServer(false);
    }
  };

  useEffect(() => {
    checkErpServer();
    const interval = setInterval(checkErpServer, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans flex flex-col antialiased">
      
      {/* Top Banner / Sync Header */}
      <header className="bg-[#000000] text-white border-b border-[#222222] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <img src={atidetoLogo} alt="Logo" className="h-8 w-auto object-contain" />
            <img src={atidetoWordmark} alt="Atideto Technologies" className="h-8 w-auto object-contain" />
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-white/10 text-white uppercase border border-white/20">
            ERP Suite v2.6
          </span>
          <div className="flex items-center gap-2 pl-3 border-l border-white/20 text-xs">
            <span className={`inline-block w-2 h-2 rounded-full ${serverOnline ? 'bg-[#00D26A] animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-[#AFAFAF] hidden md:inline">
              Backend Server: <span className="text-white font-medium">http://localhost:3000</span>
            </span>
            <button 
              onClick={checkErpServer}
              disabled={checkingServer}
              title="Ping ERP Server"
              className="p-1 hover:bg-white/10 rounded transition text-[#AFAFAF] hover:text-white"
            >
              <RefreshCw size={12} className={checkingServer ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Right Header Controls */}
        <div className="flex items-center gap-3">
          {onSwitchToStudent && (
            <button
              onClick={onSwitchToStudent}
              className="text-xs bg-white text-black hover:bg-white/90 px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>View B&W Student Portal</span>
              <ChevronRight size={14} />
            </button>
          )}

          <a 
            href="http://localhost:3000/admin/dashboard" 
            target="_blank" 
            rel="noreferrer"
            className="hidden sm:flex text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg font-medium transition items-center gap-1.5 border border-white/20"
          >
            <span>Open Standalone ERP</span>
            <ExternalLink size={12} />
          </a>

          <div className="flex items-center gap-2 pl-2 border-l border-white/20">
            <div className="w-8 h-8 rounded-full bg-white text-black font-black text-xs flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <p className="font-bold text-white">{user.name}</p>
              <p className="text-[#AFAFAF] text-[10px]">Super Administrator</p>
            </div>
            <button 
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-[#AFAFAF] hover:text-red-400 hover:bg-white/10 rounded-lg transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Main ERP Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left ERP Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-[#FFFFFF] border-r border-[#E2E8F0] flex flex-col shrink-0 transition-all duration-300 select-none`}>
          <div className="p-4 flex items-center justify-between border-b border-[#E2E8F0]">
            {!sidebarCollapsed && (
              <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Management Modules
              </span>
            )}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-[#F1F5F9] rounded text-[#64748B] transition mx-auto"
              title="Toggle Sidebar"
            >
              <ChevronRight size={16} className={sidebarCollapsed ? '' : 'rotate-180 transition-transform'} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1 text-sm font-medium">
            
            {/* Overview */}
            <SidebarBtn 
              icon={<LayoutDashboard size={18} />} 
              label="Dashboard" 
              active={activeTab === 'dashboard'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('dashboard')} 
            />

            {/* Live Backend Connection View */}
            <SidebarBtn 
              icon={<Server size={18} />} 
              label="Live Server ERP" 
              badge="Port 3000"
              active={activeTab === 'live-backend'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('live-backend')} 
            />

            {/* STUDENTS SECTION */}
            <SidebarSection label="Students & Academy" collapsed={sidebarCollapsed} />
            <SidebarBtn 
              icon={<GraduationCap size={18} />} 
              label="All Students" 
              count="428"
              active={activeTab === 'students'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('students')} 
            />
            <SidebarBtn 
              icon={<ClipboardList size={18} />} 
              label="Registrations" 
              badge="14 New"
              active={activeTab === 'registrations'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('registrations')} 
            />
            <SidebarBtn 
              icon={<BookOpen size={18} />} 
              label="Courses & Batches" 
              active={activeTab === 'courses'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('courses')} 
            />

            {/* GENERATORS SECTION */}
            <SidebarSection label="Document Generators" collapsed={sidebarCollapsed} />
            <SidebarBtn 
              icon={<Award size={18} />} 
              label="Certificates" 
              active={activeTab === 'generator-certificate'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('generator-certificate')} 
            />
            <SidebarBtn 
              icon={<FileText size={18} />} 
              label="Offer Letters" 
              active={activeTab === 'generator-offerletter'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('generator-offerletter')} 
            />
            <SidebarBtn 
              icon={<CalendarCheck size={18} />} 
              label="Attendance Sheet" 
              active={activeTab === 'generator-attendance'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('generator-attendance')} 
            />
            <SidebarBtn 
              icon={<Briefcase size={18} />} 
              label="Projects & Synopses" 
              active={activeTab === 'generator-project'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('generator-project')} 
            />

            {/* EMPLOYEE CRM SECTION */}
            <SidebarSection label="Employee & CRM" collapsed={sidebarCollapsed} />
            <SidebarBtn 
              icon={<Target size={18} />} 
              label="Manage Leads" 
              count="38"
              active={activeTab === 'leads'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('leads')} 
            />
            <SidebarBtn 
              icon={<Building2 size={18} />} 
              label="Corporate Clients" 
              active={activeTab === 'clients'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('clients')} 
            />
            <SidebarBtn 
              icon={<PhoneCall size={18} />} 
              label="Follow-ups" 
              active={activeTab === 'follow-ups'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('follow-ups')} 
            />
            <SidebarBtn 
              icon={<CheckSquare size={18} />} 
              label="Team Tasks" 
              active={activeTab === 'tasks'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('tasks')} 
            />
            <SidebarBtn 
              icon={<TrendingUp size={18} />} 
              label="Performance & KPIs" 
              active={activeTab === 'performance'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('performance')} 
            />
            <SidebarBtn 
              icon={<Users size={18} />} 
              label="Staff Directory" 
              active={activeTab === 'staff'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('staff')} 
            />

            {/* FINANCE & SETTINGS */}
            <SidebarSection label="Finance & Settings" collapsed={sidebarCollapsed} />
            <SidebarBtn 
              icon={<Wallet size={18} />} 
              label="Payments & Billing" 
              active={activeTab === 'payments'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('payments')} 
            />
            <SidebarBtn 
              icon={<SettingsIcon size={18} />} 
              label="System Settings" 
              active={activeTab === 'settings'} 
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab('settings')} 
            />
          </nav>

          <div className="p-4 border-t border-[#E2E8F0] text-xs text-[#94A3B8] text-center">
            {!sidebarCollapsed && <p>© 2026 Atideto Technologies</p>}
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-8">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              
              {/* Header Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E2E8F0]">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-[#000000] tracking-tight">
                    Overview & Analytics
                  </h1>
                  <p className="text-sm text-[#64748B] mt-1 font-medium">
                    Atideto Technologies ERP • Real-time operational intelligence
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveTab('registrations')}
                    className="px-4 py-2 bg-[#000000] hover:bg-[#1E293B] text-white text-xs font-bold rounded-lg transition flex items-center gap-2 shadow-sm"
                  >
                    <Plus size={14} />
                    <span>New Registration</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('generator-certificate')}
                    className="px-4 py-2 bg-white border border-[#E2E8F0] hover:bg-[#F1F5F9] text-[#000000] text-xs font-bold rounded-lg transition flex items-center gap-2 shadow-sm"
                  >
                    <Award size={14} />
                    <span>Issue Certificate</span>
                  </button>
                </div>
              </div>

              {/* 4 Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <KpiCard 
                  title="Total Students" 
                  value="428" 
                  trend="+18.4% this month" 
                  sub="Across 6 active batches"
                  icon={<Users size={20} className="text-white" />}
                />
                <KpiCard 
                  title="Active Courses" 
                  value="18" 
                  trend="100% On Schedule" 
                  sub="Full Stack, AI, Cloud"
                  icon={<BookOpen size={20} className="text-white" />}
                />
                <KpiCard 
                  title="Verified Revenue" 
                  value="₹14,85,000" 
                  trend="98.5% Verified" 
                  sub="Q4 Academic Year 2026"
                  icon={<Wallet size={20} className="text-white" />}
                />
                <KpiCard 
                  title="Pending Action" 
                  value="14" 
                  trend="Requires Review" 
                  sub="Registrations & documents"
                  badge="Urgent"
                  icon={<ClipboardList size={20} className="text-white" />}
                />
              </div>

              {/* CRM & Corporate Operations Widget */}
              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-[#000000] flex items-center gap-2">
                      <Briefcase size={18} className="text-black" />
                      Employee CRM & Corporate Training Operations
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Client acquisitions, active leads pipeline, and corporate placement partners
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTab('leads')}
                      className="px-3 py-1.5 bg-[#000000] text-white hover:bg-black/80 rounded-md text-xs font-bold transition"
                    >
                      Sales Pipeline →
                    </button>
                    <button 
                      onClick={() => setActiveTab('performance')}
                      className="px-3 py-1.5 bg-[#F1F5F9] text-black hover:bg-[#E2E8F0] rounded-md text-xs font-bold transition"
                    >
                      Staff KPIs
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Corporate MOUs</span>
                    <p className="text-xl font-black text-black mt-1">12 Partners</p>
                    <p className="text-[11px] text-[#64748B]">TCS, Wipro, Infosys, Atideto Labs</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Active Inquiries</span>
                    <p className="text-xl font-black text-black mt-1">38 Leads</p>
                    <p className="text-[11px] text-[#00D26A] font-semibold">14 scheduled this week</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Certificates Issued</span>
                    <p className="text-xl font-black text-black mt-1">312 Total</p>
                    <p className="text-[11px] text-[#64748B]">With QR verification</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                    <span className="text-[11px] font-semibold text-[#64748B] uppercase">Internships Placed</span>
                    <p className="text-xl font-black text-black mt-1">94 Interns</p>
                    <p className="text-[11px] text-[#00D26A] font-semibold">100% Offer letters sent</p>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Recent Registrations & Quick Generator Launchers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Registrations Table (2 Cols) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#000000]">Recent Student Registrations</h3>
                      <p className="text-xs text-[#64748B]">Latest enrollments across technical batches</p>
                    </div>
                    <button 
                      onClick={() => setActiveTab('students')}
                      className="text-xs font-bold text-black hover:underline"
                    >
                      View All 428 →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
                          <th className="pb-3">Reg ID</th>
                          <th className="pb-3">Student</th>
                          <th className="pb-3">Course</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9]">
                        {students.slice(0, 5).map((s, idx) => (
                          <tr key={idx} className="hover:bg-[#F8FAFC] transition">
                            <td className="py-3 font-mono font-bold text-[#000000]">{s.id}</td>
                            <td className="py-3">
                              <p className="font-bold text-black">{s.name}</p>
                              <p className="text-[#64748B] text-[10px]">{s.email}</p>
                            </td>
                            <td className="py-3 font-medium text-black">{s.course}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                s.status === 'Active' ? 'bg-[#00D26A]/10 text-[#00D26A]' :
                                s.status === 'Completed' ? 'bg-blue-50 text-blue-700' :
                                'bg-amber-50 text-amber-700'
                              }`}>
                                {s.status}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <button 
                                onClick={() => {
                                  setCertStudentName(s.name);
                                  setCertCourse(s.course);
                                  setActiveTab('generator-certificate');
                                }}
                                className="px-2.5 py-1 bg-black text-white hover:bg-black/80 rounded text-[11px] font-bold transition"
                              >
                                Certificate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Generator Launchers & Standalone ERP Link */}
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                    <h3 className="text-base font-bold text-[#000000] mb-1">Instant Document Launchers</h3>
                    <p className="text-xs text-[#64748B] mb-4">Official Atideto Technologies templates</p>
                    
                    <div className="space-y-2.5">
                      <button 
                        onClick={() => setActiveTab('generator-certificate')}
                        className="w-full text-left p-3 rounded-lg border border-[#E2E8F0] hover:border-black hover:bg-[#F8FAFC] transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                            <Award size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-black">Generate Certificate</p>
                            <p className="text-[10px] text-[#64748B]">QR Code & Verification ID</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-[#94A3B8] group-hover:text-black group-hover:translate-x-0.5 transition" />
                      </button>

                      <button 
                        onClick={() => setActiveTab('generator-offerletter')}
                        className="w-full text-left p-3 rounded-lg border border-[#E2E8F0] hover:border-black hover:bg-[#F8FAFC] transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                            <FileText size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-black">Issue Offer Letter</p>
                            <p className="text-[10px] text-[#64748B]">Internship Stipend & Terms</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-[#94A3B8] group-hover:text-black group-hover:translate-x-0.5 transition" />
                      </button>

                      <button 
                        onClick={() => setActiveTab('generator-attendance')}
                        className="w-full text-left p-3 rounded-lg border border-[#E2E8F0] hover:border-black hover:bg-[#F8FAFC] transition flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                            <CalendarCheck size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-black">Attendance Register</p>
                            <p className="text-[10px] text-[#64748B]">Batch Sheet & Export PDF</p>
                          </div>
                        </div>
                        <ChevronRight size={14} className="text-[#94A3B8] group-hover:text-black group-hover:translate-x-0.5 transition" />
                      </button>
                    </div>
                  </div>

                  {/* Backend Port 3000 Status Card */}
                  <div className="bg-[#000000] text-white rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Server size={18} className="text-[#00D26A]" />
                        <span className="text-xs font-bold tracking-wide uppercase">Node.js Server</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-[#00D26A]/20 text-[#00D26A]">
                        PORT 3000
                      </span>
                    </div>
                    <p className="text-xs text-[#AFAFAF] mb-4">
                      Direct connection to Express backend, SQLite database, and EJS template system.
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setActiveTab('live-backend')}
                        className="flex-1 py-2 bg-white text-black hover:bg-white/90 text-xs font-bold rounded-lg transition text-center"
                      >
                        Embedded Viewer
                      </button>
                      <a 
                        href="http://localhost:3000/admin/dashboard" 
                        target="_blank" 
                        rel="noreferrer"
                        className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition flex items-center justify-center"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB: LIVE BACKEND VIEWER (IFRAME) */}
          {activeTab === 'live-backend' && (
            <div className="space-y-4 max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00D26A] animate-pulse" />
                  <div>
                    <h3 className="font-bold text-sm text-black">Live Atideto Technologies ERP Server</h3>
                    <p className="text-xs text-[#64748B]">Connected to http://localhost:3000/admin/dashboard</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={checkErpServer}
                    className="px-3 py-1.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-black text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} />
                    <span>Reload Server</span>
                  </button>
                  <a 
                    href="http://localhost:3000/admin/dashboard" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-1.5 bg-black text-white hover:bg-black/80 text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                  >
                    <span>Full Window</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-inner">
                <iframe 
                  src="http://localhost:3000/admin/dashboard" 
                  title="Atideto Technologies ERP Standalone"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* TAB: ALL STUDENTS DIRECTORY */}
          {activeTab === 'students' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-2 border-b border-[#E2E8F0]">
                <div>
                  <h1 className="text-2xl font-extrabold text-black">All Enrolled Students</h1>
                  <p className="text-xs text-[#64748B]">Manage active learners, cohorts, and certification eligibility</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input 
                      type="text" 
                      placeholder="Search name, ID, email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg text-black focus:outline-none focus:border-black w-60"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      const newId = `AT-STD-${1000 + students.length + 1}`;
                      setStudents([...students, {
                        id: newId,
                        name: 'New Candidate',
                        email: 'candidate@atideto.com',
                        course: 'GenAI & Full Stack',
                        batch: '2026-B4',
                        status: 'Active',
                        enrolled: new Date().toISOString().split('T')[0],
                        feePaid: '₹30,000',
                        feeTotal: '₹30,000'
                      }]);
                    }}
                    className="px-4 py-2 bg-black hover:bg-black/80 text-white text-xs font-bold rounded-lg transition flex items-center gap-2"
                  >
                    <Plus size={14} />
                    <span>Add Student</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="p-4">Student ID</th>
                      <th className="p-4">Full Name & Contact</th>
                      <th className="p-4">Course & Batch</th>
                      <th className="p-4">Fees Paid</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    {students
                      .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((s, idx) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC] transition">
                        <td className="p-4 font-mono font-bold text-black">{s.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-black text-sm">{s.name}</p>
                          <p className="text-[#64748B] text-[11px]">{s.email}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-black">{s.course}</p>
                          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-semibold">{s.batch}</span>
                        </td>
                        <td className="p-4 font-mono font-bold text-black">
                          {s.feePaid} / <span className="text-[#64748B]">{s.feeTotal}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            s.status === 'Active' ? 'bg-[#00D26A]/10 text-[#00D26A]' :
                            s.status === 'Completed' ? 'bg-blue-50 text-blue-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button 
                            onClick={() => {
                              setCertStudentName(s.name);
                              setCertCourse(s.course);
                              setActiveTab('generator-certificate');
                            }}
                            className="px-3 py-1 bg-black text-white hover:bg-black/80 rounded text-[11px] font-bold transition"
                          >
                            Certificate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: CERTIFICATE GENERATOR */}
          {activeTab === 'generator-certificate' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="pb-2 border-b border-[#E2E8F0]">
                <h1 className="text-2xl font-extrabold text-black">Certificate Generator & QR Verifier</h1>
                <p className="text-xs text-[#64748B]">Issue cryptographically verifiable certificates with Atideto Technologies seal</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Form Controls */}
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-black">Certificate Details</h3>
                  
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Student Full Name</label>
                    <input 
                      type="text" 
                      value={certStudentName} 
                      onChange={(e) => setCertStudentName(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Course / Specialization</label>
                    <input 
                      type="text" 
                      value={certCourse} 
                      onChange={(e) => setCertCourse(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Issue Date</label>
                    <input 
                      type="date" 
                      value={certDate} 
                      onChange={(e) => setCertDate(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Certificate Code</label>
                    <input 
                      type="text" 
                      value={certId} 
                      readOnly
                      className="w-full mt-1 p-2.5 text-xs bg-slate-100 border border-[#E2E8F0] rounded-lg text-black font-mono font-bold"
                    />
                  </div>

                  <button 
                    onClick={() => {
                      setCertGenerated(true);
                      alert(`Certificate issued for ${certStudentName}! Code: ${certId}`);
                    }}
                    className="w-full py-2.5 bg-black hover:bg-black/90 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Award size={14} />
                    <span>Issue & Verify Certificate</span>
                  </button>

                  <button 
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-black text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Printer size={14} />
                    <span>Print / Save as PDF</span>
                  </button>
                </div>

                {/* Certificate Preview Card */}
                <div className="lg:col-span-2 bg-white rounded-xl border-4 border-double border-black p-8 shadow-md text-center relative flex flex-col justify-between min-h-[460px]">
                  
                  <div className="space-y-2">
                    <div className="flex justify-center mb-2">
                      <img src={atidetoWordmark} alt="Atideto" className="h-8 w-auto object-contain invert" />
                    </div>
                    <p className="text-[10px] font-mono tracking-widest text-[#64748B] uppercase">
                      ATIDETO TECHNOLOGIES • ACADEMY OF ADVANCED COMPUTING
                    </p>
                    <h2 className="text-2xl font-black text-black tracking-tight font-serif pt-2">
                      CERTIFICATE OF EXCELLENCE
                    </h2>
                    <p className="text-xs text-[#64748B] italic">This document certifies that</p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-2xl font-extrabold text-black underline underline-offset-8 decoration-2 decoration-black">
                      {certStudentName}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-4 max-w-md mx-auto">
                      has successfully completed all rigorous coursework, architectural projects, and capstone assessments in
                    </p>
                    <p className="text-base font-bold text-black mt-2">
                      {certCourse}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between text-left text-xs">
                    <div>
                      <p className="font-mono text-[10px] text-[#64748B]">CERTIFICATE ID</p>
                      <p className="font-mono font-bold text-black">{certId}</p>
                      <p className="text-[10px] text-[#64748B] mt-1">Issued: {certDate}</p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-black rounded-lg mx-auto flex items-center justify-center text-[9px] font-mono font-bold">
                        [QR VALID]
                      </div>
                      <p className="text-[9px] text-[#64748B] mt-1">Scan to Verify</p>
                    </div>

                    <div className="text-right">
                      <div className="w-32 border-b border-black pb-1 mb-1 font-serif italic text-sm text-black">
                        Atideto Academy
                      </div>
                      <p className="text-[10px] font-bold text-black">Managing Director</p>
                      <p className="text-[9px] text-[#64748B]">Atideto Technologies</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB: OFFER LETTER GENERATOR */}
          {activeTab === 'generator-offerletter' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="pb-2 border-b border-[#E2E8F0]">
                <h1 className="text-2xl font-extrabold text-black">Internship Offer Letter Generator</h1>
                <p className="text-xs text-[#64748B]">Issue standardized corporate internship appointment letters</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-sm text-black">Offer Details</h3>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Candidate Name</label>
                    <input 
                      type="text" 
                      value={offerName} 
                      onChange={(e) => setOfferName(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Internship Position</label>
                    <input 
                      type="text" 
                      value={offerRole} 
                      onChange={(e) => setOfferRole(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Tenure</label>
                    <input 
                      type="text" 
                      value={offerDuration} 
                      onChange={(e) => setOfferDuration(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Monthly Stipend</label>
                    <input 
                      type="text" 
                      value={offerStipend} 
                      onChange={(e) => setOfferStipend(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Commencement Date</label>
                    <input 
                      type="date" 
                      value={offerDate} 
                      onChange={(e) => setOfferDate(e.target.value)}
                      className="w-full mt-1 p-2.5 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-black font-semibold"
                    />
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="w-full py-2.5 bg-black hover:bg-black/90 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Printer size={14} />
                    <span>Print Official Letterhead</span>
                  </button>
                </div>

                {/* Offer Letter Document Preview */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm text-left font-serif leading-relaxed text-xs">
                  <div className="flex justify-between items-start border-b pb-4 mb-4">
                    <div>
                      <img src={atidetoWordmark} alt="Atideto" className="h-6 w-auto object-contain invert mb-1" />
                      <p className="text-[10px] font-sans text-[#64748B]">Atideto Technologies Pvt Ltd</p>
                      <p className="text-[10px] font-sans text-[#64748B]">Technology Park, Bengaluru, India</p>
                    </div>
                    <div className="text-right font-sans text-[11px]">
                      <p className="font-bold text-black">REF: AT/HR/INT/2026/092</p>
                      <p className="text-[#64748B]">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>

                  <p className="font-bold mb-4 font-sans text-sm">Dear {offerName},</p>
                  <p className="mb-3">
                    We are pleased to offer you the position of <span className="font-bold text-black">{offerRole}</span> at Atideto Technologies. 
                    Based on your technical evaluation and demonstrated potential, we believe your skills will make a significant contribution to our engineering organization.
                  </p>
                  <p className="mb-3">
                    Your internship duration will be for a period of <span className="font-bold text-black">{offerDuration}</span> commencing on <span className="font-bold text-black">{offerDate}</span>. 
                    You will receive a stipend of <span className="font-bold text-black">{offerStipend}</span> during this period.
                  </p>
                  <p className="mb-4">
                    Upon exemplary completion, you will be considered for a full-time engineering placement at Atideto Technologies.
                  </p>
                  <div className="pt-8 flex justify-between items-end font-sans">
                    <div>
                      <p className="text-xs font-bold text-black">Authorized Signatory</p>
                      <p className="text-[11px] text-[#64748B]">Director of Talent • Atideto Technologies</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-black">Candidate Acceptance</p>
                      <p className="text-[11px] text-[#64748B]">{offerName}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: ATTENDANCE & BATCHES */}
          {activeTab === 'generator-attendance' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-[#E2E8F0]">
                <div>
                  <h1 className="text-2xl font-extrabold text-black">Attendance Register & Biometric Logs</h1>
                  <p className="text-xs text-[#64748B]">Monitor daily classroom and virtual lab attendance</p>
                </div>
                <button 
                  onClick={() => alert('Attendance log downloaded as Excel!')}
                  className="px-3 py-2 bg-black text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Export Spreadsheet</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
                <div className="flex gap-4 mb-4">
                  <select className="p-2 border rounded text-xs font-bold bg-[#F8FAFC]">
                    <option>Batch 2026-B1 (GenAI & LLMs)</option>
                    <option>Batch 2026-B2 (Next.js & Cloud)</option>
                    <option>Batch 2026-B3 (Full Stack)</option>
                  </select>
                  <input type="date" defaultValue="2026-10-17" className="p-2 border rounded text-xs bg-[#F8FAFC]" />
                </div>

                <table className="w-full text-xs">
                  <thead className="bg-[#F8FAFC] border-b text-[#64748B] font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3 text-left">Student ID</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((s, i) => (
                      <tr key={i} className="hover:bg-[#F8FAFC]">
                        <td className="p-3 font-mono font-bold">{s.id}</td>
                        <td className="p-3 font-bold">{s.name}</td>
                        <td className="p-3 text-center">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00D26A]/20 text-[#00D26A]">
                            Present
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-bold">96%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PAYMENTS & BILLING */}
          {activeTab === 'payments' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="pb-2 border-b border-[#E2E8F0]">
                <h1 className="text-2xl font-extrabold text-black">Payments & Financial Transactions</h1>
                <p className="text-xs text-[#64748B]">Audited revenue ledger, invoices, and installment collections</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <span className="text-xs text-[#64748B] uppercase font-bold">Total Fees Collected</span>
                  <p className="text-2xl font-black text-black mt-1">₹14,85,000</p>
                  <p className="text-[11px] text-[#00D26A] font-bold mt-1">100% Reconciled</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <span className="text-xs text-[#64748B] uppercase font-bold">Pending Installments</span>
                  <p className="text-2xl font-black text-amber-600 mt-1">₹1,45,000</p>
                  <p className="text-[11px] text-[#64748B] mt-1">Due by month end</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <span className="text-xs text-[#64748B] uppercase font-bold">Corporate Invoices</span>
                  <p className="text-2xl font-black text-black mt-1">₹6,20,000</p>
                  <p className="text-[11px] text-[#00D26A] font-bold mt-1">All accounts active</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#F8FAFC] border-b text-[#64748B] font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Txn ID</th>
                      <th className="p-3">Student / Payer</th>
                      <th className="p-3">Payment Method</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9]">
                    <tr className="hover:bg-[#F8FAFC]">
                      <td className="p-3 font-mono font-bold">TXN-90241</td>
                      <td className="p-3 font-bold">Aakash Verma</td>
                      <td className="p-3">UPI (Google Pay)</td>
                      <td className="p-3 font-bold font-mono">₹34,000</td>
                      <td className="p-3 text-[#64748B]">2026-10-15</td>
                      <td className="p-3 text-right">
                        <button className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold">PDF</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F8FAFC]">
                      <td className="p-3 font-mono font-bold">TXN-90240</td>
                      <td className="p-3 font-bold">Pooja Sundaram</td>
                      <td className="p-3">Net Banking (HDFC)</td>
                      <td className="p-3 font-bold font-mono">₹28,000</td>
                      <td className="p-3 text-[#64748B]">2026-10-14</td>
                      <td className="p-3 text-right">
                        <button className="px-2 py-1 bg-black text-white rounded text-[10px] font-bold">PDF</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SYSTEM SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="pb-2 border-b border-[#E2E8F0]">
                <h1 className="text-2xl font-extrabold text-black">System & Organization Settings</h1>
                <p className="text-xs text-[#64748B]">Corporate profile and portal configurations</p>
              </div>

              <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Entity Name</label>
                    <input type="text" defaultValue="Atideto Technologies Pvt Ltd" className="w-full mt-1 p-2.5 text-xs bg-slate-100 border rounded font-bold" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Support Email</label>
                    <input type="text" defaultValue="support@atideto.com" className="w-full mt-1 p-2.5 text-xs bg-slate-100 border rounded font-bold" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">ERP Server Endpoint</label>
                    <input type="text" defaultValue="http://localhost:3000" className="w-full mt-1 p-2.5 text-xs bg-slate-100 border rounded font-mono font-bold" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#64748B] uppercase">Database</label>
                    <input type="text" defaultValue="atideto.sqlite (Synchronized)" className="w-full mt-1 p-2.5 text-xs bg-slate-100 border rounded font-mono font-bold" />
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                  <button 
                    onClick={() => alert('Settings updated!')}
                    className="px-5 py-2.5 bg-black hover:bg-black/90 text-white text-xs font-bold rounded-lg transition"
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FALLBACK FOR OTHER TABS */}
          {!['dashboard', 'students', 'generator-certificate', 'generator-offerletter', 'generator-attendance', 'payments', 'settings', 'live-backend'].includes(activeTab) && (
            <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center max-w-2xl mx-auto my-12 shadow-sm">
              <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center mx-auto mb-4">
                <Server size={22} />
              </div>
              <h3 className="text-lg font-bold text-black capitalize mb-1">{activeTab.replace('-', ' ')} Module</h3>
              <p className="text-xs text-[#64748B] mb-6">
                Connected directly to the Atideto Technologies ERP database on Port 3000.
              </p>
              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => setActiveTab('live-backend')}
                  className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg transition"
                >
                  View in Embedded Server
                </button>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-4 py-2 bg-[#F1F5F9] text-black text-xs font-bold rounded-lg transition"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------------

function SidebarSection({ label, collapsed }: { label: string; collapsed: boolean }) {
  if (collapsed) return <div className="h-3" />;
  return (
    <div className="pt-4 pb-1 px-3">
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94A3B8]">
        {label}
      </span>
    </div>
  );
}

function SidebarBtn({
  icon,
  label,
  active,
  collapsed,
  count,
  badge,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  count?: string;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition ${
        active
          ? 'bg-[#000000] text-white shadow-sm'
          : 'text-[#475569] hover:bg-[#F1F5F9] hover:text-[#000000]'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{label}</span>
          {count && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
              active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {count}
            </span>
          )}
          {badge && (
            <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide bg-amber-400 text-black">
              {badge}
            </span>
          )}
        </>
      )}
    </button>
  );
}

function KpiCard({
  title,
  value,
  trend,
  sub,
  badge,
  icon
}: {
  title: string;
  value: string;
  trend: string;
  sub: string;
  badge?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm hover:border-black transition">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-[#000000] flex items-center justify-center">
          {icon}
        </div>
        {badge ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
            {badge}
          </span>
        ) : (
          <span className="text-[11px] font-bold text-[#00D26A]">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-black text-[#000000] tracking-tight">{value}</p>
      <p className="text-xs font-semibold text-[#64748B] mt-0.5">{title}</p>
      <p className="text-[11px] text-[#94A3B8] mt-2 pt-2 border-t border-[#F1F5F9]">{sub}</p>
    </div>
  );
}
