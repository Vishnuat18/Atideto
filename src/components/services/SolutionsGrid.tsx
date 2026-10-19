import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Layers,
  Smartphone,
  TrendingUp,
  Globe,
  Code2,
  Palette,
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Direct ES6 imports guarantee 100% reliable bundling and zero broken images
import aiAutomationMockup from '@/assets/solutions/sol/ai_automation.png';
import businessSystemsMockup from '@/assets/solutions/sol/business_systems.png';
import appDevelopmentMockup from '@/assets/solutions/sol/app_development.png';
import digitalMarketingMockup from '@/assets/solutions/sol/digital_marketing.png';
import webDevelopmentMockup from '@/assets/solutions/sol/web_development.png';
import customSoftwareMockup from '@/assets/solutions/sol/custom_software.png';
import uiuxDesigningMockup from '@/assets/solutions/sol/uiux_designing.png';

interface SubServiceCategory {
  name: string;
  count: string;
  desc: string;
  pills: string[];
}

interface ServiceSectionData {
  id: string;
  num: string;
  title: string;
  subDay: string;
  isUniqueBadge?: boolean;
  lead: string;
  mockup: string;
  scope: string;
  groups: SubServiceCategory[];
}

const CORE_SERVICES: ServiceSectionData[] = [
  // ── 01. AI & AUTOMATION ────────────────────────────────────────────────
  {
    id: 'service-01',
    num: '01',
    title: 'AI & Automation',
    subDay: 'Intelligent Systems',
    lead: 'Spend less time on repetitive manual work and respond to customers with sub-second consistency through autonomous AI agents and automated multi-app pipelines.',
    mockup: aiAutomationMockup,
    scope: 'Conversational bots, business automation pipelines, and custom machine learning modules.',
    groups: [
      {
        name: 'Customer conversations',
        count: '05',
        desc: 'Automate inbound customer inquiries, support auto-triaging, and booking appointments.',
        pills: [
          'WhatsApp Automation',
          'Customer Support Automation',
          'AI Chatbots',
          'Website Chatbots',
          'Appointment & Reminder Automation'
        ]
      },
      {
        name: 'Everyday operations',
        count: '03',
        desc: 'Reduce the manual handoffs between tools and tasks.',
        pills: [
          'Business Process Automation',
          'CRM Automation',
          'Workflow Automation'
        ]
      },
      {
        name: 'Content and custom work',
        count: '03',
        desc: 'Scale content pipelines and develop bespoke machine learning models for unique workflows.',
        pills: [
          'Email Automation',
          'YouTube Automation',
          'Custom AI Solutions'
        ]
      }
    ]
  },

  // ── 02. BUSINESS SYSTEMS ───────────────────────────────────────────────
  {
    id: 'service-02',
    num: '02',
    title: 'Business Systems',
    subDay: 'Enterprise Operations',
    lead: 'Unify finance, operations, stock, and personnel into one cohesive engine with enterprise role-based governance and audit trails.',
    mockup: businessSystemsMockup,
    scope: 'Departmental ERP workflows, CRM sales pipelines, and automated financial billing systems.',
    groups: [
      {
        name: 'Core operations & ERP',
        count: '03',
        desc: 'Connect procurement, sales, stock, and distribution in one single-source-of-truth dashboard.',
        pills: [
          'Enterprise ERP Systems',
          'Multi-Warehouse Inventory Sync',
          'Supply Chain Management (SCM)'
        ]
      },
      {
        name: 'Revenue & financial ledgers',
        count: '03',
        desc: 'Automate recurring billing, POS checkouts, and customer relationship pipelines.',
        pills: [
          'Custom CRM Platforms',
          'Billing & POS Invoicing Engines',
          'Chit Fund & Subscriber Ledgers'
        ]
      },
      {
        name: 'Institutional & facility portals',
        count: '03',
        desc: 'Specialized administrative software designed for campuses, hotels, and wellness clubs.',
        pills: [
          'School & Campus Portals',
          'Hotel & Hospitality Booking POS',
          'Gym & Fitness Club Automation'
        ]
      },
      {
        name: 'Fleet telematics & executive BI',
        count: '03',
        desc: 'Real-time route GPS, self-service client bookings, and executive telemetry dashboards.',
        pills: [
          'Fleet Telematics & Route GPS',
          'Appointment & Self-Service Booking',
          'Real-Time Executive BI Dashboards'
        ]
      }
    ]
  },

  // ── 03. APP DEVELOPMENT ────────────────────────────────────────────────
  {
    id: 'service-03',
    num: '03',
    title: 'App Development',
    subDay: 'Mobile Systems',
    lead: 'High-performance iOS and Android applications crafted for scale, offline sync, biometric security, and fluid 120Hz native interactions.',
    mockup: appDevelopmentMockup,
    scope: 'Cross-platform Flutter, native Swift & Kotlin development, and zero-latency backend APIs.',
    groups: [
      {
        name: 'Cross-platform & native engineering',
        count: '03',
        desc: 'Engineered for iOS and Android with single codebase efficiency and platform-native performance.',
        pills: [
          'Flutter App Development',
          'React Native Development',
          'Native iOS & Android Systems'
        ]
      },
      {
        name: 'Backend APIs & cloud databases',
        count: '03',
        desc: 'Zero-latency real-time backends with offline sync, automated backups, and push notifications.',
        pills: [
          'Node.js & Go Microservices',
          'Firebase & Supabase Sync',
          'PostgreSQL & MongoDB Clusters'
        ]
      },
      {
        name: 'Specialized mobile capabilities',
        count: '03',
        desc: 'Integrated payment gateways, real-time geolocation tracking, and biometric authentication.',
        pills: [
          'Real-Time Chat & VoIP',
          'Offline-First Architecture',
          'In-App Payments & Invoicing'
        ]
      },
      {
        name: 'Mobile app store launch & support',
        count: '03',
        desc: 'Complete store deployment, App Store Optimization (ASO), and continuous performance monitoring.',
        pills: [
          'Apple App Store Publishing',
          'Google Play Console Setup',
          'Continuous Feature Releases'
        ]
      }
    ]
  },

  // ── 04. DIGITAL MARKETING ──────────────────────────────────────────────
  {
    id: 'service-04',
    num: '04',
    title: 'Digital Marketing',
    subDay: 'Growth Engine',
    lead: 'Reach people who are more likely to need what you offer through precision paid ad funnels, high-converting creatives, and end-to-end attribution tracking.',
    mockup: digitalMarketingMockup,
    scope: 'Paid advertising engines across Meta and Google, technical SEO audits, and creative ad production.',
    groups: [
      {
        name: 'Paid performance media',
        count: '03',
        desc: 'Laser-focused media buying across Meta and Google that lowers customer acquisition cost.',
        pills: ['Meta Ads', 'Google Ads', 'Social Media Ads']
      },
      {
        name: 'Creative video & AI generation',
        count: '04',
        desc: 'Dynamic ad variations and AI video creatives generated to capture attention on feeds.',
        pills: [
          'AI Ad Generation',
          'Video Ads',
          'Promotional Videos',
          'Product Video Generation'
        ]
      },
      {
        name: 'Copywriting & conversion assets',
        count: '03',
        desc: 'Direct-response copywriting, high-converting product ads, and image creatives.',
        pills: ['Image Ads', 'Product Ads', 'Ad Copywriting']
      }
    ]
  },

  // ── 05. WEBSITE DEVELOPMENT ────────────────────────────────────────────
  {
    id: 'service-05',
    num: '05',
    title: 'Website Development',
    subDay: 'Modern Platforms',
    lead: 'High-speed web platforms built with React, Next.js, and TypeScript, engineered to convert visitors into loyal customers with sub-second load times.',
    mockup: webDevelopmentMockup,
    scope: 'Modern headless web platforms, custom CMS portals, and e-commerce architectures.',
    groups: [
      {
        name: 'Modern web platforms',
        count: '04',
        desc: 'Engineered with React, Next.js, and TypeScript for rapid page transitions and global scalability.',
        pills: [
          'Next.js 15 & React 19 Platforms',
          'Full Stack Web Engineering',
          'Responsive Corporate Websites',
          'Customer & Client Portals'
        ]
      },
      {
        name: 'E-commerce & high-converting pages',
        count: '03',
        desc: 'High-speed headless commerce storefronts and landing pages optimized for maximum conversions.',
        pills: ['E-commerce Websites', 'Landing Pages', 'Service Websites']
      },
      {
        name: 'Payment & API integrations',
        count: '03',
        desc: 'Seamless API connections, WhatsApp click-to-chat widgets, and multi-currency payment checkouts.',
        pills: [
          'Payment Gateway Integration',
          'WhatsApp Integration',
          'API Integration'
        ]
      },
      {
        name: 'Performance & continuous care',
        count: '03',
        desc: 'Core Web Vitals tuning, technical SEO compliance, and SLA-backed continuous maintenance.',
        pills: [
          'SEO-ready Development',
          'Website Redesign',
          'Website Maintenance'
        ]
      }
    ]
  },

  // ── 06. CUSTOM SOFTWARE ────────────────────────────────────────────────
  {
    id: 'service-06',
    num: '06',
    title: 'Custom Software',
    subDay: '',
    isUniqueBadge: true,
    lead: 'Organize the work that spreadsheets and disconnected tools make difficult with bespoke platforms built around your exact business processes.',
    mockup: customSoftwareMockup,
    scope: 'Bespoke platforms designed around your exact workflows with specialized ERP and POS engines.',
    groups: [
      {
        name: 'Billing & financial invoicing',
        count: '04',
        desc: 'Automate invoice generation, recurring collections, expense management, and executive reports.',
        pills: [
          'Billing Software',
          'Invoice Management Systems',
          'Expense Management Systems',
          'Reporting Dashboards'
        ]
      },
      {
        name: 'Operations & warehouse logistics',
        count: '03',
        desc: 'End-to-end tracking from customer bookings to warehouse pick-pack-ship operations.',
        pills: [
          'Inventory Management Systems',
          'Order Management Systems',
          'ERP Solutions'
        ]
      },
      {
        name: 'Customer & appointment portals',
        count: '03',
        desc: 'Centralized CRM, customer accounts, and real-time self-service appointment scheduling.',
        pills: [
          'CRM Systems',
          'Customer Management Systems',
          'Appointment Management Systems'
        ]
      },
      {
        name: 'HR & administrative control',
        count: '04',
        desc: 'Biometric attendance logging, staff scheduling, and secure master admin consoles.',
        pills: [
          'Employee Management Systems',
          'Attendance Management Systems',
          'Admin Dashboards',
          'Custom SaaS Architecture'
        ]
      }
    ]
  },

  // ── 07. UI & UX DESIGN ─────────────────────────────────────────────────
  {
    id: 'service-07',
    num: '07',
    title: 'UI & UX Design',
    subDay: 'Product Experience',
    lead: 'Make digital products easier for real people to use through thorough user research, high-fidelity Figma prototypes, and comprehensive design systems.',
    mockup: uiuxDesigningMockup,
    scope: 'Enterprise design systems, interactive Figma prototypes, SaaS analytics dashboards, and 3D visual assets.',
    groups: [
      {
        name: 'User research & flow architecture',
        count: '03',
        desc: 'Deep customer journey mapping, low-fidelity wireframing, and problem validation.',
        pills: [
          'User Flow Design',
          'Wireframing',
          'Product Experience Design'
        ]
      },
      {
        name: 'Digital product UI & UX design',
        count: '03',
        desc: 'Modern interfaces crafted for SaaS web apps, native platforms, and high-density screens.',
        pills: ['UI Design', 'UX Design', 'Software UI/UX']
      },
      {
        name: 'Multi-platform & ergonomics',
        count: '03',
        desc: 'Touch ergonomics, responsive layouts, and existing product modernization redesigns.',
        pills: [
          'Website UI/UX',
          'Mobile App UI/UX',
          'Existing Product Redesign'
        ]
      },
      {
        name: 'Design systems & prototypes',
        count: '03',
        desc: 'Reusable auto-layout component kits in Figma and production design tokens for developer sync.',
        pills: [
          'Design Systems',
          'Interactive Prototypes',
          'Responsive Interface Design'
        ]
      }
    ]
  }
];

export default function SolutionsGrid({ isHome = false }: { isHome?: boolean }) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Accordion state: open group keys per service index (e.g. { "0": 1 } means service 0 has group 1 open)
  const [openAccordions, setOpenAccordions] = useState<Record<string, number | null>>({
    '0': 1, // Service 01: Everyday operations open by default
    '1': 0, // Service 02: Core operations open by default
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0
  });

  const toggleAccordion = (serviceIdx: number, groupIdx: number) => {
    const key = String(serviceIdx);
    setOpenAccordions((prev) => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current === groupIdx ? null : groupIdx
      };
    });
  };

  return (
    <section
      ref={containerRef}
      id="solutions-grid"
      className="relative w-full bg-[#050505] text-[#F1F5F9] pt-12 sm:pt-20 pb-28 overflow-x-clip font-sans selection:bg-[#00F0FF] selection:text-black"
    >
      {/* Ambient Radial Lighting Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[950px] h-[450px] bg-gradient-to-b from-[#0052FF]/14 to-transparent blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[550px] h-[450px] bg-[#00F0FF]/06 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[600px] h-[400px] bg-[#0052FF]/08 blur-[160px] pointer-events-none" />

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── TOP SECTION HEADER: (Image 2 Reference Design)                  ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16 sm:mb-24">
        {/* Eyebrow: 02 ─── CORE SERVICES */}
        <div className="inline-flex items-center gap-3 mb-3.5 text-xs font-mono tracking-[0.22em] text-[#38BDF8] uppercase font-bold select-none justify-center">
          <span className="text-white/80 font-bold">02</span>
          <span className="w-10 h-px bg-gradient-to-r from-[#0052FF] to-[#38BDF8]" />
          <span className="text-[#38BDF8]">CORE SERVICES</span>
        </div>

        {/* Main Title: Enterprise Services */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          Enterprise{' '}
          <span className="text-[#0052FF] drop-shadow-[0_0_24px_rgba(0,82,255,0.45)]">
            Services
          </span>
        </h2>

        {/* Subtitle in clean Inter */}
        <p
          className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          High-performance digital products engineered for operational efficiency, security, and measurable growth.
        </p>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── ALL 8 SERVICE BLOCKS (CATEGORIZED SHOWCASE DESIGN)              ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32 relative z-10">
        {CORE_SERVICES.map((service, serviceIdx) => {
          const currentOpenGroup = openAccordions[String(serviceIdx)];

          return (
            <div
              key={service.id}
              id={service.id}
              ref={(el) => (serviceRefs.current[serviceIdx] = el)}
              className="relative scroll-mt-24 service-section-block pb-20 sm:pb-28 border-b border-white/[0.08] last:border-b-0"
            >
              {/* 1. STICKY DATE/CATEGORY HEADER (Sticks per service until complete) */}
              <div className="sticky top-0 z-30 bg-[#050505]/95 backdrop-blur-xl py-4 sm:py-5 mb-8 border-b border-white/[0.08] flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.7)]">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="text-3xl sm:text-4xl font-extrabold text-white hover:text-[#2EA8FF] transition-colors cursor-pointer tracking-tight leading-none flex items-center gap-2.5 sm:gap-3"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                    title={`View ${service.title} details`}
                  >
                    <span className="text-[#38BDF8] font-extrabold text-2xl sm:text-3xl italic tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>{service.num}</span>
                    <span>{service.title}</span>
                  </h3>

                  {service.isUniqueBadge ? (
                    <>
                      <span className="text-white/20 text-2xl font-light">/</span>
                      <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0052FF]/15 via-[#00F0FF]/10 to-[#0052FF]/15 border border-[#00F0FF]/35 shadow-[0_0_18px_rgba(0,102,255,0.25)] text-xs font-mono">
                        <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] animate-pulse" />
                        <span className="text-white font-medium">Bespoke Architecture</span>
                        <span className="text-white/30">·</span>
                        <span className="text-[#38BDF8] font-semibold">Zero-Legacy Engine</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-white/20 text-2xl font-light">/</span>
                      <span
                        className="text-base sm:text-lg font-semibold text-[#94A3B8] tracking-tight"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {service.subDay}
                      </span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors cursor-pointer"
                >
                  <span>Explore Detail</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* 2. HERO PRESENTATION ROW: Info Left, Direct Mockup Right (NO DIV WRAPPER) */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] items-center gap-8 lg:gap-12 mb-10">
                {/* Left Info Column */}
                <div className="flex flex-col items-start">
                  <p
                    className="text-sm sm:text-base text-slate-300 max-w-lg mb-6 leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {service.lead}
                  </p>

                  {/* Action Buttons: "Talk about this service" + "Explore Capabilities" */}
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => navigate(`/client-connect?service=${encodeURIComponent(service.title)}`)}
                      className="group relative inline-flex items-center justify-between gap-4 bg-[#0052FF] hover:bg-[#0042D0] text-white py-2 pl-5 pr-2 rounded-full font-bold text-xs sm:text-sm tracking-wide border border-white/20 shadow-[0_4px_18px_rgba(0,82,255,0.38)] hover:shadow-[0_6px_26px_rgba(0,82,255,0.55),0_0_16px_rgba(0,240,255,0.25)] hover:border-cyan-400/50 transition-all duration-300 active:scale-95 cursor-pointer"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      <span>Talk about this service</span>
                      <span className="w-8 h-8 rounded-full bg-[#0036B8] group-hover:bg-[#00F0FF] group-hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight
                          size={14}
                          className="text-white group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </span>
                    </button>

                    <button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#38BDF8]/40 transition-all duration-200 cursor-pointer"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>View details</span>
                      <ArrowRight size={12} className="text-[#38BDF8]" />
                    </button>
                  </div>
                </div>

                {/* Right: Standalone Mockup Image (Clickable to detail page) */}
                <img
                  src={service.mockup}
                  alt={`${service.title} 3D Showcase Mockup`}
                  className="w-full max-w-[420px] h-auto max-h-[250px] object-contain justify-self-center transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 cursor-pointer select-none"
                  loading="lazy"
                  onClick={() => navigate(`/services/${service.id}`)}
                  title={`View ${service.title} details`}
                />
              </div>

              {/* 3. SPLIT FAQ LAYOUT: Left Sticky Box + Right Accordion Rows */}
              <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 lg:gap-12 pt-7 border-t border-white/[0.08] items-start">
                
                {/* Left Column: Title + Scope */}
                <div className="md:sticky md:top-36">
                  <h4
                    className="text-xl font-bold text-white mb-2 leading-tight tracking-tight"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Explore our capabilities
                  </h4>
                  <p
                    className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {service.scope}
                  </p>
                </div>

                {/* Right Column: FAQ Accordion Groups */}
                <div className="space-y-2.5">
                  {service.groups.map((group, groupIdx) => {
                    const isOpen = currentOpenGroup === groupIdx;

                    return (
                      <div
                        key={group.name}
                        onMouseEnter={() => {
                          setOpenAccordions((prev) => ({
                            ...prev,
                            [String(serviceIdx)]: groupIdx
                          }));
                        }}
                        className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                          isOpen
                            ? 'bg-[#0A0E1A] border-[#0052FF]/40 shadow-[0_4px_24px_rgba(0,82,255,0.15)]'
                            : 'bg-[#070A14]/80 border-white/[0.08] hover:border-white/15'
                        }`}
                      >
                        {/* Accordion Trigger */}
                        <button
                          type="button"
                          onClick={() => toggleAccordion(serviceIdx, groupIdx)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors select-none"
                        >
                          <span
                            className="text-sm sm:text-base font-semibold text-white tracking-tight"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                          >
                            {group.name}
                          </span>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 border border-[#00F0FF]/25 px-2.5 py-0.5 rounded-full">
                              {group.count}
                            </span>
                            <ChevronDown
                              size={18}
                              className={`text-slate-400 group-hover:text-white transition-transform duration-300 shrink-0 ${
                                isOpen ? 'rotate-180 text-[#00F0FF]' : ''
                              }`}
                            />
                          </div>
                        </button>

                        {/* Accordion Collapsible Content */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-white/[0.06]">
                                <p
                                  className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed font-normal"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  {group.desc}
                                </p>

                                {/* Subservice Pills Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                  {group.pills.map((pill) => (
                                    <button
                                      key={pill}
                                      onClick={() => navigate(`/client-connect?service=${encodeURIComponent(pill)}`)}
                                      className="group flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/[0.025] hover:bg-[#0052FF]/15 border border-white/[0.07] hover:border-[#38BDF8]/40 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,82,255,0.2)] transition-all duration-200 text-left cursor-pointer"
                                    >
                                      <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                                        {pill}
                                      </span>
                                      <span className="w-5 h-5 rounded-full bg-white/[0.05] group-hover:bg-[#0052FF] text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 ml-2 transition-all">
                                        <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
