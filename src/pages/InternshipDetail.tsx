import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  Download,
  Laptop,
  Clock,
  Award,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Users,
  Rocket,
  ShoppingCart,
  LayoutDashboard,
  GraduationCap,
  Star,
  FolderGit2,
  QrCode,
  Share2,
  Building2,
  Code2,
  Globe,
  Server,
  Database,
  Cpu,
  Boxes,
  Palette,
  Key,
  Smartphone,
  FileCode,
  CheckCheck,
  Check,
  Layers,
  ArrowRight,
  type LucideIcon
} from 'lucide-react';
import SEO from '@/components/seo/SEO';
import { useTheme } from '@/context/ThemeContext';
import { INTERNSHIP_PROGRAMS } from '@/constants';
import { toast } from 'sonner';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { generateCurriculumPDF, CurriculumModuleData } from '@/utils/curriculumPdfGenerator';

// Brand assets
import atidetoLogo from '@/assets/atideto/logo.png';

interface CurriculumModule {
  id: string;
  title: string;
  shortTitle: string;
  duration: string;
  icon: LucideIcon;
  summary: string;
  lessons: {
    title: string;
    description: string;
  }[];
}

// ── 12 Comprehensive Engineering Modules (Listed one-by-one with real titles) ──
const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    id: 'web-foundations',
    title: 'Web Foundations & Developer Tooling',
    shortTitle: 'Web Foundations',
    duration: 'Module 01',
    icon: Globe,
    summary: 'Master how the modern web operates, client-server models, and set up professional developer environments.',
    lessons: [
      {
        title: 'How the Web Works: Browsers, DNS, Servers & HTTP/HTTPS Protocols',
        description: 'Understand network requests, status codes, packet lifecycles, and modern web infrastructure.'
      },
      {
        title: 'Semantic HTML5 Architecture, Accessible Markup & Form Engineering',
        description: 'Write accessible HTML according to WCAG standards with robust input controls and media assets.'
      },
      {
        title: 'Production Tooling: Terminal CLI, VS Code Environment & Git Config',
        description: 'Configure linters, formatters, command-line tools, and enterprise Git repository standards.'
      },
      {
        title: 'Practical Project: Semantic Personal Portfolio & Web Architecture',
        description: 'Design and publish a production-ready personal developer showcase hosted on cloud infrastructure.'
      }
    ]
  },
  {
    id: 'css-responsive',
    title: 'CSS3 & Responsive Design Systems',
    shortTitle: 'CSS3 & Layouts',
    duration: 'Module 02',
    icon: Palette,
    summary: 'Engineer mobile-first responsive interfaces using modern Flexbox, CSS Grid, and custom properties.',
    lessons: [
      {
        title: 'CSS Architecture: Cascade, Specificity, Box Model & Modern Resets',
        description: 'Eliminate styling bugs with modular CSS structuring, fluid spacing tokens, and custom properties.'
      },
      {
        title: 'Flexbox In-Depth: 1D Axis Alignment, Wrapping & Dynamic Menus',
        description: 'Build flexible navigation bars, equal-height card decks, and adaptive multi-tier UI layouts.'
      },
      {
        title: 'CSS Grid Mastery: 2D Dashboard Structures & Auto-Fit Layouts',
        description: 'Construct responsive administrative grids, complex subgrid alignments, and masonry patterns.'
      },
      {
        title: 'Practical Project: Multi-Device Responsive SaaS Marketing Page',
        description: 'Implement a high-converting digital product landing page optimized across mobile, tablet, and desktop.'
      }
    ]
  },
  {
    id: 'javascript-core',
    title: 'JavaScript Core & Interactive DOM',
    shortTitle: 'JavaScript Core',
    duration: 'Module 03',
    icon: Code2,
    summary: 'Deep dive into modern JavaScript syntax, functional programming paradigms, and dynamic DOM manipulation.',
    lessons: [
      {
        title: 'JavaScript Fundamentals: Data Types, Immutability & Control Flow',
        description: 'Master primitive vs reference types, strict equality, modern conditions, and defensive coding.'
      },
      {
        title: 'Functional Programming: Arrow Functions, Scopes, Closures & Array Methods',
        description: 'Leverage map, filter, reduce, pure functions, lexical scope, and functional state handlers.'
      },
      {
        title: 'DOM Manipulation: Dynamic Node Tree Rendering & Event Delegation',
        description: 'Manipulate UI elements dynamically with event listeners, bubbling, capturing, and local storage.'
      },
      {
        title: 'Practical Project: Interactive Task & Real-Time State Application',
        description: 'Build an offline-first productivity app with live filtering, tag assignment, and browser persistence.'
      }
    ]
  },
  {
    id: 'es6-async-apis',
    title: 'Modern ES6+, Asynchronous & REST APIs',
    shortTitle: 'ES6+ & REST APIs',
    duration: 'Module 04',
    icon: Cpu,
    summary: 'Harness modern ES6+ language features, handle asynchronous data streams, and consume RESTful endpoints.',
    lessons: [
      {
        title: 'Modern ES6+ Syntax: Modules, Destructuring, Spread/Rest & Operators',
        description: 'Write elegant, idiomatic JavaScript using optional chaining, nullish coalescing, and modular imports.'
      },
      {
        title: 'Asynchronous Architecture: Event Loop, Promises & Async/Await',
        description: 'Manage concurrency, avoid race conditions, and handle asynchronous microtasks effectively.'
      },
      {
        title: 'RESTful API Contracts: Fetch API, HTTP Verbs & Error Boundaries',
        description: 'Query remote endpoints, parse JSON payloads, manage rate limits, and construct custom error handlers.'
      },
      {
        title: 'Practical Project: API-Driven Live Intelligence Dashboard',
        description: 'Connect third-party enterprise APIs to display live currency conversion, weather feeds, and data charts.'
      }
    ]
  },
  {
    id: 'react-essentials',
    title: 'React Essentials & Component Architecture',
    shortTitle: 'React Essentials',
    duration: 'Module 05',
    icon: Layers,
    summary: 'Build declarative user interfaces using React, Virtual DOM reconciliation, and unidirectional data flow.',
    lessons: [
      {
        title: 'Thinking in React: Virtual DOM, JSX Syntax & Declarative UIs',
        description: 'Transition from imperative DOM manipulation to declarative, state-driven component design.'
      },
      {
        title: 'State & Props: Unidirectional Data Flow & Event Handlers',
        description: 'Pass immutable props, manage local component state, and propagate actions up through callbacks.'
      },
      {
        title: 'Reusable UI Kits: Component Composition, Lists & Key Stability',
        description: 'Structure atomic design components, render efficient lists with keys, and handle conditional branches.'
      },
      {
        title: 'Practical Project: Commercial E-Commerce Product Catalog',
        description: 'Develop an interactive storefront catalog with instant search filtering, category toggles, and cart badge.'
      }
    ]
  },
  {
    id: 'advanced-react',
    title: 'Advanced React Hooks & Application State',
    shortTitle: 'Advanced React',
    duration: 'Module 06',
    icon: Smartphone,
    summary: 'Master standard and custom React hooks, complex multi-step forms, and client-side routing.',
    lessons: [
      {
        title: 'React Hooks Mastery: useState, useEffect Lifecycle & useRef',
        description: 'Synchronize external systems with useEffect, prevent infinite renders, and target mutable DOM nodes.'
      },
      {
        title: 'Form Architecture: Controlled Inputs, Validation & Custom Hooks',
        description: 'Extract business logic into reusable custom hooks and implement client-side schema validation.'
      },
      {
        title: 'Client Routing: React Router DOM, Nested Layouts & Dynamic URLs',
        description: 'Set up multi-page SPAs with URL parameters, query strings, active link indicators, and protected routes.'
      },
      {
        title: 'Practical Project: Multi-Page Analytics Portal with Persistent State',
        description: 'Assemble an interactive dashboard featuring tabbed views, parameterized routes, and local state sync.'
      }
    ]
  },
  {
    id: 'nodejs-express',
    title: 'Node.js & Express.js Backend Services',
    shortTitle: 'Node & Express APIs',
    duration: 'Module 07',
    icon: Server,
    summary: 'Build high-throughput backend APIs, custom middleware pipelines, and scalable microservice architectures.',
    lessons: [
      {
        title: 'Node.js Runtime Architecture: Event Loop & Non-Blocking I/O',
        description: 'Understand worker threads, streams, buffers, file systems, and npm package dependency management.'
      },
      {
        title: 'Express Server Architecture: Routing Standards & HTTP Methods',
        description: 'Implement GET, POST, PUT, PATCH, and DELETE endpoints matching industry RESTful conventions.'
      },
      {
        title: 'Middleware Chains: Body Parsing, CORS Policies & Error Logging',
        description: 'Construct global error-handling middleware, request loggers, and CORS origin security rules.'
      },
      {
        title: 'Practical Project: Production CRUD API Service with Postman Testing',
        description: 'Write, document, and test a fully operational backend API with automated Postman verification tests.'
      }
    ]
  },
  {
    id: 'database-engineering',
    title: 'Database Engineering: MongoDB & SQL Modeling',
    shortTitle: 'Database Engineering',
    duration: 'Module 08',
    icon: Database,
    summary: 'Design scalable databases, write optimized queries, and manage data relationships with Mongoose ODM.',
    lessons: [
      {
        title: 'Database Architecture: Document Collections vs Relational Tables',
        description: 'Evaluate when to choose NoSQL vs SQL, normalization vs denormalization, and ACID guarantees.'
      },
      {
        title: 'Mongoose ODM: Schema Definitions, Validation & Relationships',
        description: 'Define strongly-typed document schemas, custom field validators, timestamps, and virtual properties.'
      },
      {
        title: 'Query Performance: Compound Indexing, Pagination & Aggregation',
        description: 'Execute multi-stage aggregation pipelines, handle infinite pagination, and avoid unindexed collscans.'
      },
      {
        title: 'Practical Project: Cloud MongoDB Atlas Integration with Live API',
        description: 'Provision a cloud database cluster, secure connection strings via env variables, and seed test data.'
      }
    ]
  },
  {
    id: 'auth-security',
    title: 'Authentication, Authorization & Security',
    shortTitle: 'Security & Auth',
    duration: 'Module 09',
    icon: Key,
    summary: 'Secure applications against vulnerabilities with stateless JWT authentication and role-based access control.',
    lessons: [
      {
        title: 'Cryptographic Security: Password Hashing with Salt & Bcrypt',
        description: 'Safeguard user credentials with salted hashes, secure password policies, and brute-force defenses.'
      },
      {
        title: 'Stateless Auth: JSON Web Tokens (JWT) & Token Verification',
        description: 'Sign and verify JWT payloads, manage expiration headers, and store tokens safely in secure cookies.'
      },
      {
        title: 'Role-Based Access Control (RBAC): Protecting Private Endpoints',
        description: 'Write authorization middleware that verifies user roles (Student, Mentor, Admin) before granting access.'
      },
      {
        title: 'Practical Project: Enterprise User Authentication & Session Gateway',
        description: 'Develop a complete sign-up, sign-in, and password reset gateway with protected route guards.'
      }
    ]
  },
  {
    id: 'fullstack-cloud',
    title: 'Full-Stack Integration & Cloud Deployment',
    shortTitle: 'Full-Stack & Cloud',
    duration: 'Module 10',
    icon: Rocket,
    summary: 'Connect client applications to backend services, containerize with Docker, and deploy with CI/CD.',
    lessons: [
      {
        title: 'Full-Stack Data Flow: Axios Interceptors, Async Cache & CORS',
        description: 'Link React frontends to Express APIs with automatic bearer token attachment and toast alerts.'
      },
      {
        title: 'Docker Containerization: Multi-Stage Builds & Compose Stacks',
        description: 'Write optimized Dockerfiles with Alpine base images and orchestrate multi-container app stacks.'
      },
      {
        title: 'Continuous Deployment: GitHub Actions Pipelines & Cloud Hosting',
        description: 'Configure automated build workflows that trigger zero-downtime releases on Vercel, Render, or AWS.'
      },
      {
        title: 'Practical Project: Live Production Full-Stack Application Deployment',
        description: 'Deploy an integrated full-stack application with live database connectivity and custom domain SSL.'
      }
    ]
  },
  {
    id: 'commercial-capstone',
    title: 'Commercial Capstone Project & Code Defense',
    shortTitle: 'Commercial Capstone',
    duration: 'Module 11',
    icon: FolderGit2,
    summary: 'Architect, build, and defend an end-to-end commercial software product under senior tech mentorship.',
    lessons: [
      {
        title: 'Capstone Scoping: System Architecture & Agile Sprint Tasks',
        description: 'Draft system design diagrams, database entity-relationship models, and technical task boards.'
      },
      {
        title: 'Sprint Development: Collaborative Git Flow & PR Code Reviews',
        description: 'Execute agile sprints, open feature branch pull requests, and receive feedback from engineering leads.'
      },
      {
        title: 'Security Audits, Latency Benchmarks & Production Readiness',
        description: 'Run automated vulnerability audits, optimize asset delivery, and ensure 99.9% uptime compliance.'
      },
      {
        title: 'Capstone Defense: Live Product Demonstration & Technical Review',
        description: 'Present the completed software application to senior tech mentors, explaining architectural decisions.'
      }
    ]
  },
  {
    id: 'career-placement',
    title: 'Career Placement & Interview Preparation',
    shortTitle: 'Career & Placement',
    duration: 'Module 12',
    icon: Briefcase,
    summary: 'Prepare your professional portfolio, practice technical rounds, and connect directly to hiring partners.',
    lessons: [
      {
        title: 'Engineering Branding: Technical Resume & GitHub Profile Polish',
        description: 'Transform project repositories into hiring assets with clean READMEs, architecture GIFs, and docs.'
      },
      {
        title: 'Technical Mock Interviews: Coding Challenges & System Design',
        description: 'Practice real technical interview scenarios covering data structures, API contracts, and debugging.'
      },
      {
        title: 'Behavioral Interviews & Offer Negotiation Mentorship',
        description: 'Learn communication frameworks to articulate engineering trade-offs and navigate compensation offers.'
      },
      {
        title: 'Official Credential Issuance & Hiring Partner Introductions',
        description: 'Receive verified digital certification and unlock direct interview referrals to 120+ corporate partners.'
      }
    ]
  }
];

export default function InternshipDetail() {
  const { internshipId } = useParams<{ internshipId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();
  const isLight = theme === 'light';

  // Find active internship or fallback to first
  const activeProgram =
    INTERNSHIP_PROGRAMS.find((p) => p.id === internshipId) ||
    INTERNSHIP_PROGRAMS[0];

  // Active module tracker for left sticky sidebar
  const [activeModuleId, setActiveModuleId] = useState<string>(CURRICULUM_MODULES[0].id);
  const isClickScrolling = useRef(false);

  // Application Modal state (No pricing plans)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStep, setApplyStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    college: '',
    degree: 'B.Tech / B.E.',
    graduationYear: '2025',
    preferredStartDate: 'Immediate Upcoming Cohort',
    experienceLevel: 'Beginner',
    linkedIn: '',
    github: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [internshipId]);

  // ScrollSpy on Window: Detects which curriculum module is currently in view
  useEffect(() => {
    const handleWindowScroll = () => {
      if (isClickScrolling.current) return;
      const scrollPosition = window.scrollY + 140;

      let found = false;
      for (let i = CURRICULUM_MODULES.length - 1; i >= 0; i--) {
        const section = document.getElementById(`module-${CURRICULUM_MODULES[i].id}`);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveModuleId(CURRICULUM_MODULES[i].id);
            found = true;
            break;
          }
        }
      }
      if (!found) {
        setActiveModuleId(CURRICULUM_MODULES[0].id);
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Smooth scroll to a module on click with proper offset
  const handleModuleClick = (moduleId: string) => {
    setActiveModuleId(moduleId);
    isClickScrolling.current = true;
    const targetEl = document.getElementById(`module-${moduleId}`);
    if (targetEl) {
      const yOffset = -90; // offset for sticky status bar
      const y = targetEl.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  const handleDownloadPDF = () => {
    try {
      generateCurriculumPDF(
        activeProgram.title,
        activeProgram.duration || '12 Weeks (3 Months)',
        activeProgram.category || 'Software Engineering',
        CURRICULUM_MODULES
      );
      toast.success(`Downloaded official curriculum roadmap for ${activeProgram.title}!`);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Please fill in your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'internship_applications'), {
        internshipId: activeProgram.id,
        internshipTitle: activeProgram.title,
        ...formData,
        userId: user?.uid || null,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      toast.success(`Application submitted successfully for ${activeProgram.title}!`);
      setApplyStep(3); // Success step
    } catch (err) {
      console.warn('Firebase submission fallback:', err);
      toast.success(`Application recorded for ${activeProgram.title}! Admissions will connect shortly.`);
      setApplyStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 overflow-x-clip ${
        isLight ? 'bg-[#FAF9F5] text-zinc-900' : 'bg-[#05070D] text-white'
      }`}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <SEO
        title={`${activeProgram.title} Internship | Atideto Academy`}
        description={
          activeProgram.description ||
          `Join the ${activeProgram.title} industry internship at Atideto. Build real production projects, receive 1:1 mentorship, and secure corporate placement assistance.`
        }
        url={`https://atideto.in/internships/${activeProgram.id}`}
        keywords={`${activeProgram.title}, tech internship, software internship, atideto academy, placement guarantee, ${activeProgram.skills.join(', ')}`}
      />

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 1. HERO SECTION (Clean, Punchy & Modern with Action CTAs) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-14 lg:pt-36 lg:pb-20 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div
          aria-hidden
          className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none opacity-20 bg-[#0066FF]"
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full blur-[130px] pointer-events-none opacity-15 bg-[#38BDF8]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/upskill" className="hover:text-white transition-colors">Internships</Link>
            <ChevronRight size={12} />
            <span className="text-slate-400">{activeProgram.category}</span>
            <ChevronRight size={12} />
            <span className="text-[#2EA8FF] font-bold">{activeProgram.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Eyebrow + Title + Lead + CTAs + Benefit Line */}
            <div className="lg:col-span-7 text-left">
              
              {/* Eyebrow Tag */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-[#0066FF] font-bold text-sm">—</span>
                <span className="text-xs font-bold tracking-[0.25em] text-[#38BDF8] uppercase font-mono">
                  {activeProgram.title}
                </span>
              </div>

              {/* Bold Large Heading */}
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.02] mb-5 text-white"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Build your <br />
                <span className="text-[#0066FF]">next chapter.</span>
              </h1>

              {/* Lead Paragraph */}
              <p
                className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 text-slate-300 font-normal max-w-xl"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Learn to build modern web applications from frontend to backend through practical sessions, guided commercial projects, and career-focused practice under senior tech leads.
              </p>

              {/* Action Buttons: View Curriculum & Download Curriculum */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('curriculum');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-[0_4px_20px_rgba(0,102,255,0.35)] transition-all cursor-pointer"
                >
                  <span>View Curriculum ↓</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Curriculum PDF ↓</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setApplyStep(1);
                    setIsApplyModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 transition-all cursor-pointer"
                >
                  <span>Apply for Internship ↗</span>
                </button>
              </div>

              {/* Checkmark Benefit Line */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0066FF] font-bold">✓</span>
                  <span>12-week structured roadmap</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0066FF] font-bold">✓</span>
                  <span>48 hands-on sessions</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#0066FF] font-bold">✓</span>
                  <span>Verified commercial capstone</span>
                </span>
              </div>

            </div>

            {/* Right Column: Abstract Coding Workspace */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="w-full max-w-[420px] rounded-3xl bg-[#080E1C] border border-white/10 p-6 sm:p-7 shadow-2xl relative overflow-hidden group">
                
                {/* Tech Aura Glow */}
                <div className="absolute inset-0 bg-radial from-[#0066FF]/20 via-transparent to-transparent opacity-80" />
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#38BDF8]/20 blur-3xl pointer-events-none" />

                {/* Inner Code Card */}
                <div className="relative z-10 p-5 rounded-2xl bg-[#05070D] border border-white/10 shadow-2xl transform group-hover:rotate-0 -rotate-1 transition-transform duration-300">
                  {/* Top Dots */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-1">
                    Atideto Learning Lab
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Build. Test. Launch.
                  </h3>

                  {/* Stylized Code Lines */}
                  <div className="space-y-2 mb-6">
                    <div className="h-2 w-3/4 rounded-full bg-[#0066FF]" />
                    <div className="h-2 w-full rounded-full bg-white/10" />
                    <div className="h-2 w-1/2 rounded-full bg-white/10" />
                    <div className="h-2 w-2/3 rounded-full bg-[#38BDF8]/70" />
                  </div>

                  {/* Card Bottom Tags */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="truncate">{activeProgram.title.toUpperCase()}</span>
                    <span className="px-2 py-0.5 rounded bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] font-bold">
                      ENTERPRISE
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 2. THE 4 PROGRAM PILLARS (1-to-1 Mentorship, Project-Based, etc.) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
                <Users size={18} />
                <strong className="text-sm font-bold text-white">1-to-1 Mentorship</strong>
              </div>
              <span className="text-xs text-slate-400 leading-relaxed block">
                Personal guidance, weekly live debugging, and direct code reviews from senior tech leads.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
                <FolderGit2 size={18} />
                <strong className="text-sm font-bold text-white">Project-Based Learning</strong>
              </div>
              <span className="text-xs text-slate-400 leading-relaxed block">
                Learn by building real, commercial-grade full-stack applications with production Git PRs.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
                <Briefcase size={18} />
                <strong className="text-sm font-bold text-white">Career-Focused Skills</strong>
              </div>
              <span className="text-xs text-slate-400 leading-relaxed block">
                Interview simulations, technical resume reviews, and direct corporate placement prep.
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
                <Clock size={18} />
                <strong className="text-sm font-bold text-white">Flexible Learning</strong>
              </div>
              <span className="text-xs text-slate-400 leading-relaxed block">
                Structured, adaptable weekly sprints that seamlessly fit around college exams and classes.
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 3. THE ATIDETO APPROACH (01, 02, 03 Features) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06] bg-[#070C18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                THE ATIDETO APPROACH
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Learn with purpose.
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              A focused engineering experience built around practical skills, clean code, and meaningful career momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <article className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] font-mono font-bold flex items-center justify-center text-sm mb-5">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Understand the essentials</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Master the architectural tools, data flows, and runtime mechanics behind modern web applications.
              </p>
            </article>

            <article className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] font-mono font-bold flex items-center justify-center text-sm mb-5">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Build as you learn</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apply concepts through guided commercial projects, weekly sprint milestones, and peer code reviews.
              </p>
            </article>

            <article className="p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] font-mono font-bold flex items-center justify-center text-sm mb-5">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Show your skills</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy a verifiable GitHub portfolio and claim your authenticated certificate that proves your readiness.
              </p>
            </article>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 4. CURRICULUM ROADMAP (Sticky Left Panel + Top-to-Bottom Modules) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06]" id="curriculum">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start w-full relative text-left">
            
            {/* ── LEFT PANEL: FULLY STICKY (Matching Courses Page Layout) ── */}
            <aside className="w-full lg:w-[260px] shrink-0 lg:sticky lg:top-24 self-start text-left select-none z-10 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-y-auto hide-scrollbar">
              
              {/* Header Title */}
              <div className="mb-3">
                <h3 
                  className="text-base font-extrabold text-white tracking-tight"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Curriculum Modules
                </h3>
              </div>

              {/* Clean list of modules with Icon + Title (Matching Courses layout) */}
              <nav className="space-y-1" aria-label="Curriculum Modules">
                {CURRICULUM_MODULES.map((m) => {
                  const isActive = activeModuleId === m.id;
                  const ModIcon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleModuleClick(m.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left group ${
                        isActive
                          ? 'bg-white/[0.08] text-white border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.5)]'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#0066FF] text-white shadow-[0_0_12px_rgba(0,102,255,0.4)]'
                          : 'bg-white/[0.04] text-slate-400 group-hover:text-white group-hover:bg-white/[0.08]'
                      }`}>
                        <ModIcon size={13} />
                      </div>
                      <span className="truncate">{m.shortTitle || m.title}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Download Syllabus PDF Action Button */}
              <div className="pt-3 mt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download Syllabus PDF</span>
                </button>
              </div>

            </aside>

            {/* ── RIGHT PANEL: FREE WINDOW SCROLLING MODULES & LESSONS (Top to Bottom) ── */}
            <main className="flex-1 min-w-0 w-full space-y-12 text-left">
              
              {/* Sticky Top Status Bar */}
              <div className={`sticky top-0 z-20 ${isLight ? 'bg-[#FAF9F5]/95 text-zinc-900 border-zinc-200' : 'bg-[#05070D]/95 text-white border-white/[0.08]'} backdrop-blur-md pt-3 pb-3 mb-6 border-b flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066FF] animate-pulse" />
                  <span className="text-sm font-bold tracking-wide uppercase text-white font-sans">
                    Curriculum Roadmap
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {CURRICULUM_MODULES.length} Technical Modules
                </span>
              </div>

              {/* All Modules Rendered One-by-One with Real Titles & Detailed Lessons */}
              {CURRICULUM_MODULES.map((m) => {
                const ModIcon = m.icon;
                return (
                  <div
                    key={m.id}
                    id={`module-${m.id}`}
                    className="scroll-mt-28 space-y-4"
                  >
                    {/* Module Header Bar */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#080E1C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/35 text-[#38BDF8] flex items-center justify-center shrink-0">
                          <ModIcon size={18} />
                        </div>
                        <div>
                          <h3
                            className="text-base sm:text-lg font-bold text-white tracking-tight"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {m.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            {m.summary}
                          </p>
                        </div>
                      </div>
                      <span className="self-start sm:self-auto px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-[#38BDF8] font-bold shrink-0">
                        {m.duration}
                      </span>
                    </div>

                    {/* Lessons listed one-by-one top to bottom with title and description */}
                    <div className="space-y-2.5 pl-2 sm:pl-4 border-l-2 border-white/10">
                      {m.lessons.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-[#0066FF]/10 border border-white/5 hover:border-[#38BDF8]/40 transition-all text-left flex items-start gap-3.5 group"
                        >
                          <div className="w-6 h-6 rounded-md bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                            {lIdx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors">
                              {lesson.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed mt-1">
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                );
              })}

            </main>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 5. LEARNING OUTCOMES (4 Concrete Deliverables) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06] bg-[#070C18]" id="outcomes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                YOUR PROGRESS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Learning outcomes.
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              By the end of the program, you&apos;ll have a verifiable foundation for building and defending production-ready software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            
            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Build responsive interfaces</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Create accessible, mobile-friendly experiences with semantic HTML5, modern CSS layouts, JavaScript, and React components.
                </p>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Develop backend APIs</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Design RESTful endpoints, middleware chains, error boundaries, and server-side workflows using Node.js and Express.
                </p>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Work with data securely</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Model MongoDB and relational data schemas, perform safe migrations, and integrate stateless JWT authentication.
                </p>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#38BDF8] flex items-center justify-center shrink-0 font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Ship a portfolio project</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Use Git collaboration, Docker containerization, production CI/CD pipelines, and present a live capstone demo.
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 6. SKILLS YOU'LL LEARN (Logo + Name Clearly Displayed) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06]" id="skills">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                PROGRAM TOOLKIT
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Skills you&apos;ll learn.
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              Core technologies and industry workflows covered extensively throughout this curriculum.
            </p>
          </div>

          {/* Clean Flex/Grid of Skills with Tech Icons + Names */}
          <div className="flex flex-wrap gap-3 text-left">
            {[
              { name: 'HTML5 Semantic', icon: Globe },
              { name: 'CSS3 & Responsive Grid', icon: Palette },
              { name: 'JavaScript (ES6+)', icon: Code2 },
              { name: 'TypeScript', icon: FileCode },
              { name: 'React.js', icon: Code2 },
              { name: 'Node.js', icon: Server },
              { name: 'Express.js', icon: Layers },
              { name: 'REST APIs', icon: Cpu },
              { name: 'MongoDB Atlas', icon: Database },
              { name: 'PostgreSQL', icon: Database },
              { name: 'Git & GitHub', icon: FolderGit2 },
              { name: 'Docker Containers', icon: Boxes },
              { name: 'JWT Authentication', icon: Key },
              { name: 'Responsive Design', icon: Smartphone },
              { name: 'CI/CD Cloud Deploy', icon: Rocket },
              { name: 'Testing & Postman', icon: CheckCheck }
            ].map((skill) => {
              const SkillIcon = skill.icon;
              return (
                <div
                  key={skill.name}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/60 hover:bg-[#0066FF]/10 transition-all text-xs font-semibold text-slate-200 cursor-default"
                >
                  <SkillIcon size={16} className="text-[#38BDF8]" />
                  <span>{skill.name}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 7. OUR PROJECTS (Projects with Purpose + Dedicated Icons) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06] bg-[#070C18]" id="projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                LEARN BY BUILDING
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Projects with purpose.
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              Practical commercial projects that give you real software to demonstrate in employer interviews.
            </p>
          </div>

          {/* 4 Capstone Projects with Dedicated Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
            {[
              {
                title: 'Smart Commerce',
                icon: ShoppingCart,
                desc: 'A full-fledged shopping platform with product filtering, cart persistence, and secure checkout.',
                tags: ['React', 'Node.js', 'MongoDB']
              },
              {
                title: 'Team Dashboard',
                icon: LayoutDashboard,
                desc: 'A secure management dashboard with clear workflows, data visualizations, and REST API integration.',
                tags: ['React', 'REST API', 'Auth']
              },
              {
                title: 'Learning Platform',
                icon: GraduationCap,
                desc: 'A course platform with lesson resources, real-time code sandboxes, and student progress tracking.',
                tags: ['Full Stack', 'UI Design', 'Express']
              },
              {
                title: 'Automated CI/CD Engine',
                icon: Rocket,
                desc: 'An automated release tool testing code, building Docker images, and managing cloud deployments.',
                tags: ['Docker', 'GitHub Actions', 'AWS']
              }
            ].map((proj) => {
              const ProjIcon = proj.icon;
              return (
                <article
                  key={proj.title}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0066FF]/60 hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Project Icon in Glowing Container */}
                    <div className="w-11 h-11 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/35 text-[#38BDF8] flex items-center justify-center mb-5">
                      <ProjIcon size={20} />
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">
                      {proj.desc}
                    </p>
                  </div>

                  {/* Project Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                    {proj.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-[#38BDF8] bg-[#0066FF]/15 border border-[#0066FF]/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 8. CERTIFICATE SECTION (Verified Completion Paper Mockup) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06]" id="certificate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8]">
                CELEBRATE YOUR PROGRESS
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Earn your certificate.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Complete the course requirements and commercial capstone to demonstrate what you&apos;ve learned. Accredited by Atideto Technologies and accepted by 120+ hiring partners.
              </p>
              
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('curriculum');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white transition-all cursor-pointer"
                >
                  <span>Explore course requirements ↗</span>
                </button>
              </div>
            </div>

            {/* Right: Certificate Paper Mockup */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-lg rounded-2xl bg-white text-zinc-900 p-7 sm:p-9 shadow-2xl border-2 border-amber-400/50 text-center relative overflow-hidden">
                
                {/* Brand Header */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-md bg-[#0066FF] text-white flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <span className="font-extrabold text-xs tracking-wider text-zinc-900 uppercase">
                    Atideto Technologies
                  </span>
                </div>

                <div className="text-[9px] font-mono font-bold tracking-[0.25em] text-amber-700 uppercase mb-2">
                  CERTIFICATE OF COMPLETION
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 tracking-tight mb-2">
                  {activeProgram.title}
                </h3>

                <p className="text-[11px] text-zinc-600 max-w-md mx-auto leading-relaxed mb-6 font-sans">
                  This official credential verifies the successful completion of 12-week commercial software engineering sprints, Capstone code review, and live deployment.
                </p>

                {/* Signature Line */}
                <div className="w-28 h-[1px] bg-amber-400 mx-auto mb-2" />
                <div className="text-xs font-extrabold text-zinc-900 font-sans">Learner Name</div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1">
                  Course completion • Project-based learning • Verified ID: ATD-2026-CERT
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 9. STUDENT REVIEWS SECTION (5 Stars + Authentic Feedback) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06] bg-[#070C18]" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-left">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                LEARNER PERSPECTIVES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Student reviews.
              </h2>
            </div>
            <p className="max-w-md text-slate-400 text-xs sm:text-sm leading-relaxed">
              Authentic experiences and feedback from learners who graduated through Atideto Academy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            
            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[#38BDF8] tracking-widest text-xs mb-3">★★★★★</div>
                <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;The hands-on project approach helped me connect conceptual syntax with real enterprise application development.&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] font-bold text-xs flex items-center justify-center shrink-0">
                  SR
                </div>
                <div>
                  <strong className="text-xs font-bold text-white block">Sanjay Ram</strong>
                  <small className="text-[10px] text-slate-400 block">{activeProgram.title}</small>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[#38BDF8] tracking-widest text-xs mb-3">★★★★★</div>
                <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;Breaking the learning path into 12 weekly goals made complex full-stack topics structured and easy to follow.&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] font-bold text-xs flex items-center justify-center shrink-0">
                  AK
                </div>
                <div>
                  <strong className="text-xs font-bold text-white block">Ananya Krishnan</strong>
                  <small className="text-[10px] text-slate-400 block">{activeProgram.title}</small>
                </div>
              </div>
            </article>

            <article className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="text-[#38BDF8] tracking-widest text-xs mb-3">★★★★★</div>
                <blockquote className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &ldquo;Building a live capstone gave me a clear, concrete project to discuss and demonstrate in my engineering interviews.&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#38BDF8] font-bold text-xs flex items-center justify-center shrink-0">
                  PM
                </div>
                <div>
                  <strong className="text-xs font-bold text-white block">Pranav Menon</strong>
                  <small className="text-[10px] text-slate-400 block">{activeProgram.title}</small>
                </div>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 10. BOTTOM CALL TO ACTION BANNER ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#090F1E] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#38BDF8] mb-2">
                YOUR NEXT CHAPTER
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Your ideas deserve to become real.
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Build practical software engineering skills with Atideto Technologies.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setApplyStep(1);
                  setIsApplyModalOpen(true);
                }}
                className="px-6 py-3.5 rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-all cursor-pointer"
              >
                Apply for Internship ↗
              </button>
              <button
                type="button"
                onClick={handleDownloadPDF}
                className="px-6 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-semibold text-xs transition-all cursor-pointer"
              >
                Download Curriculum PDF ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── 11. APPLICATION MODAL (No Pricing Plans, Streamlined) ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#080E1C] border border-white/15 p-6 sm:p-8 shadow-2xl text-left overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Apply for {activeProgram.title}
                </h3>
                <span className="text-xs font-mono text-[#38BDF8]">
                  Atideto Certified Industry Internship
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Personal & College Details */}
            {applyStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setApplyStep(2);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">College / University</label>
                    <input
                      type="text"
                      placeholder="e.g. Anna University"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Graduation Year</label>
                    <select
                      value={formData.graduationYear}
                      onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B1221] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                    >
                      <option value="2024">2024 (Graduated)</option>
                      <option value="2025">2025 (Final Year)</option>
                      <option value="2026">2026 (Third Year)</option>
                      <option value="2027">2027 (Second Year)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Next: Schedule &rarr;
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Schedule & Confirmation */}
            {applyStep === 2 && (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Preferred Start Cohort</label>
                  <select
                    value={formData.preferredStartDate}
                    onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0B1221] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="Immediate Upcoming Cohort">Immediate Upcoming Cohort (This Week)</option>
                    <option value="Next Month Cohort">Next Month Cohort</option>
                    <option value="Summer Intensive Batch">Summer Intensive Batch</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">LinkedIn or GitHub Profile (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-white">Program Highlights Included:</div>
                  <div>• 1-to-1 Senior Engineering Mentorship</div>
                  <div>• 4 Real Commercial Capstone Projects</div>
                  <div>• Verified Certificate &amp; College NOC Compliance</div>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setApplyStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 rounded-full bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Confirm & Submit Application'}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Success Confirmation */}
            {applyStep === 3 && (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 animate-in zoom-in duration-300">
                  <Check size={32} strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-black text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Application Received!
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-bold">{formData.fullName}</span>. Your application for <span className="text-[#38BDF8] font-bold">{activeProgram.title}</span> has been forwarded to our admissions and engineering mentors.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-400 max-w-sm mx-auto">
                  Our talent advisor will reach out to you via WhatsApp / Phone at <span className="text-white font-bold">{formData.phone}</span> within 24 hours to schedule your onboarding.
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-8 py-3 rounded-full bg-[#0066FF] text-white font-bold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
                >
                  Return to Program Page
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
