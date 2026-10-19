import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  X
} from 'lucide-react';
import SEO from '@/components/seo/SEO';
import { useTheme } from '@/context/ThemeContext';
import {
  CATEGORIZED_SERVICES,
  getCategorizedServiceById,
  CategorizedService,
  getServiceSubtitle
} from '@/constants/categorizedServices';

// High-resolution 3D Solution Assets for Capability Cards
import crmImg from '@/assets/solutions/crm.png';
import billingImg from '@/assets/solutions/billing.png';
import erpImg from '@/assets/solutions/erp.png';
import inventoryImg from '@/assets/solutions/inventory_management.png';
import schoolErpImg from '@/assets/solutions/school_erp.png';
import hotelImg from '@/assets/solutions/hotel management.png';
import gymImg from '@/assets/solutions/gym_management.png';
import businessPortfolioImg from '@/assets/solutions/business_portfolio.png';
import transportImg from '@/assets/solutions/transport_management.png';
import scmImg from '@/assets/solutions/scm.png';
import lmsImg from '@/assets/solutions/lms.png';
import studentMgmtImg from '@/assets/solutions/student_management.png';
import expenseImg from '@/assets/solutions/expense.png';
import ecommerceImg from '@/assets/solutions/ecommerce.png';
import apiImg from '@/assets/solutions/api.png';
import appointmentImg from '@/assets/solutions/appointment.png';
import digitalMarketingImg from '@/assets/solutions/digital_marketing.png';
import chitImg from '@/assets/solutions/chit.png';

// Intelligent 3D illustration resolver for capability cards
function getCapabilityImage(name: string, categoryId: string): string {
  const n = name.toLowerCase();
  if (n.includes('whatsapp')) return appointmentImg;
  if (n.includes('crm')) return crmImg;
  if (n.includes('billing') || n.includes('invoice') || n.includes('payment') || n.includes('expense')) return billingImg;
  if (n.includes('erp')) return erpImg;
  if (n.includes('inventory') || n.includes('order') || n.includes('warehouse')) return inventoryImg;
  if (n.includes('support') || n.includes('customer') || n.includes('employee') || n.includes('attendance')) return studentMgmtImg;
  if (n.includes('email') || n.includes('youtube') || n.includes('ad') || n.includes('marketing') || n.includes('social') || n.includes('copywriting')) return digitalMarketingImg;
  if (n.includes('chat') || n.includes('bot') || n.includes('ai') || n.includes('model')) return apiImg;
  if (n.includes('ecommerce') || n.includes('store')) return ecommerceImg;
  if (n.includes('appointment') || n.includes('reminder') || n.includes('booking')) return appointmentImg;
  if (n.includes('website') || n.includes('landing') || n.includes('portfolio') || n.includes('corporate') || n.includes('redesign') || n.includes('maintenance')) return businessPortfolioImg;
  if (n.includes('transport') || n.includes('fleet') || n.includes('logistics') || n.includes('scm') || n.includes('flow')) return scmImg;
  if (n.includes('campus') || n.includes('school') || n.includes('course') || n.includes('lms')) return schoolErpImg;
  if (n.includes('hotel') || n.includes('hospitality')) return hotelImg;
  if (n.includes('gym') || n.includes('fitness')) return gymImg;
  if (n.includes('chit')) return chitImg;
  if (n.includes('ui') || n.includes('ux') || n.includes('wirefram') || n.includes('prototype') || n.includes('design')) return businessPortfolioImg;
  if (n.includes('cloud') || n.includes('devops') || n.includes('docker') || n.includes('kubernetes') || n.includes('security') || n.includes('api')) return apiImg;
  
  if (categoryId === 'ai-automation') return apiImg;
  if (categoryId === 'business-systems') return erpImg;
  if (categoryId === 'app-development') return appointmentImg;
  if (categoryId === 'marketing-advertising' || categoryId === 'digital-marketing') return digitalMarketingImg;
  if (categoryId === 'website-development') return businessPortfolioImg;
  if (categoryId === 'custom-software-development') return crmImg;
  if (categoryId === 'ui-ux-design') return businessPortfolioImg;
  return erpImg;
}

function getCapabilityDesc(name: string, serviceTitle: string): string {
  const n = name.toLowerCase();
  if (n.includes('whatsapp')) return 'Centralize customer journeys, automated messages & alerts.';
  if (n.includes('customer support')) return 'Triage inquiries instantly with automated AI workflows & routing.';
  if (n.includes('chatbot') || n.includes('ai chat')) return 'Context-aware conversational agents powered by enterprise models.';
  if (n.includes('crm')) return 'Centralize customer journeys, sales pipelines & lifecycle tracking.';
  if (n.includes('erp') || n.includes('system')) return 'Unite enterprise operations, supply networks & financial control.';
  if (n.includes('portfolio') || n.includes('website') || n.includes('showcase')) return 'High-impact corporate showcases engineered to convert visitors.';
  if (n.includes('billing') || n.includes('invoice') || n.includes('pos')) return 'Automated recurring billing, ledger reconciliation & tax POS.';
  if (n.includes('inventory') || n.includes('warehouse')) return 'Live stock counts, automated reorder thresholds & barcode tracking.';
  if (n.includes('appointment') || n.includes('reminder') || n.includes('booking')) return 'Frictionless self-service reservations with automated reminders.';
  if (n.includes('workflow') || n.includes('process')) return 'Autonomous cross-platform pipelines eliminating manual bottlenecks.';
  if (n.includes('flutter') || n.includes('react native') || n.includes('mobile')) return 'Native iOS & Android mobile architectures engineered for speed.';
  if (n.includes('ui') || n.includes('ux') || n.includes('design')) return 'Human-centered interfaces, Figma tokens & interactive prototypes.';
  if (n.includes('cloud') || n.includes('devops') || n.includes('docker')) return 'Scalable infrastructure as code with Docker, Kubernetes & CI/CD.';
  if (n.includes('marketing') || n.includes('ad') || n.includes('campaign')) return 'Precision paid advertising funnels & automated creative generation.';
  return `Autonomous enterprise workflows engineered for scale in ${serviceTitle}.`;
}

interface ServiceFaqItem {
  num: string;
  category: string;
  question: string;
  answerParagraphs: string[];
  thumbnailImage?: string;
}

function getServiceFaqs(service: CategorizedService): ServiceFaqItem[] {
  const serviceId = service.id;
  const serviceImg = getCapabilityImage(service.title, service.id);

  if (serviceId === 'ai-automation') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE AUTOMATE?',
        answerParagraphs: [
          'We design and deploy autonomous AI agents, WhatsApp funnels, conversational assistants, and end-to-end multi-app workflow pipelines that eliminate repetitive operational bottlenecks.',
          'From auto-triaging customer support tickets to processing PDF invoices directly into accounting ledgers, our systems run 24/7 on autopilot with zero human data entry required.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'System stage',
        question: 'NEW BUILD OR EXISTING STACK?',
        answerParagraphs: [
          'We work seamlessly with both greenfield automation setups and existing software ecosystems. If you already use CRMs, ERPs, databases, or payment gateways, we build secure API connectors and webhooks to automate your current tools without operational disruption.',
          'For businesses launching fresh, we engineer the entire automated operations infrastructure from zero, complete with automated fallback queues, telemetry logs, and role-based access controls.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We begin with a rapid operational audit to identify your highest-cost manual bottlenecks and repetitive workflows. Within 48 hours, our engineers map out an automation blueprint detailing exact time and cost savings.',
          'We then build a live sandbox prototype of your primary workflow so your team can test real interactions, measure accuracy, and approve the flow before full production rollout.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Production scale',
        question: 'FULL AUTOMATION SYSTEM?',
        answerParagraphs: [
          'Yes. We deliver complete production-ready automation engines equipped with enterprise-grade AES-256 encryption, human-in-the-loop exception routing, and 24/7 uptime monitoring.',
          'You receive comprehensive operational documentation, staff training sessions, and ongoing maintenance to ensure your bots and pipelines evolve as your business scales.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'business-systems') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE DELIVER?',
        answerParagraphs: [
          'We engineer custom enterprise operational systems including ERPs, CRMs, multi-warehouse inventory engines, billing and POS platforms, school management portals, and supply chain tracking hubs.',
          'Each platform is built to unite your fragmented spreadsheets, sales channels, and financial ledgers into one real-time command dashboard with instant executive visibility.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Data migration',
        question: 'NEW BUILD OR EXISTING DATA?',
        answerParagraphs: [
          'We handle both greenfield enterprise systems and frictionless data migration from legacy spreadsheets, desktop accounting tools, or outdated web portals.',
          'We safely migrate all customer histories, inventory SKUs, transaction records, and employee rosters without system downtime or data corruption.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We begin by analyzing your core department workflows, approval chains, and reporting needs during an interactive technical scoping session.',
          'Before writing a single line of backend code, we provide clickable UI wireframes and database architecture diagrams to ensure full alignment across finance, operations, and sales.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Enterprise scale',
        question: 'FULL ENTERPRISE DEPLOYMENT?',
        answerParagraphs: [
          'We engineer scalable multi-tenant architectures featuring granular role-based permissions, automated daily backups, GST/VAT compliant invoicing, and live executive BI reports.',
          'Your deployment includes dedicated secure cloud hosting, employee onboarding workshops, and SLA-backed continuous technical support.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'website-development') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE BUILD?',
        answerParagraphs: [
          'We craft high-converting corporate websites, interactive digital portfolios, product landing pages, and web applications optimized for speed, visual authority, and business conversions.',
          'Every website is built with clean semantic code, fluid mobile responsiveness, and headless CMS integrations so your team can update content effortlessly without developer dependencies.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Brand stage',
        question: 'NEW SITE OR REDESIGN?',
        answerParagraphs: [
          'We work with both emerging ventures building their initial online foundation and established enterprises seeking to modernize clunky, outdated web presences into sleek digital flagship assets.',
          'For redesigns, we eliminate technical debt, boost Google Lighthouse scores above 95, preserve existing SEO authority, and transform your site into an automated lead generation engine.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We start with a comprehensive structural wireframe and user journey audit based on your target audience psychology and market positioning.',
          'You review and approve interactive Figma prototypes featuring custom typography, responsive breakpoints, and modern micro-animations before frontend engineering begins.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Production standard',
        question: 'FULL WEB INFRASTRUCTURE?',
        answerParagraphs: [
          'Every build includes rigorous multi-device testing, sub-second global CDN delivery, enterprise SSL, structured Schema.org markup, and automated contact form webhooks to your CRM.',
          'Post-launch, we provide comprehensive hosting management, automated security updates, and performance monitoring to keep your website fast and secure 24/7.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'custom-software-development') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE ENGINEER?',
        answerParagraphs: [
          'We architect custom SaaS applications, internal workflow portals, proprietary business engines, and complex web software built strictly to match your specific operational models.',
          'When off-the-shelf software falls short or charges prohibitive per-user monthly licensing fees, our custom solutions provide 100% intellectual property ownership and infinite customizability.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Codebase stage',
        question: 'FROM SCRATCH OR REFACTOR?',
        answerParagraphs: [
          'We build brand-new software products from ground zero, and we also audit, modernize, and refactor legacy codebases suffering from performance bottlenecks or security vulnerabilities.',
          'Our engineers dismantle brittle monoliths into performant microservices or clean modular monoliths, optimizing database queries for high concurrent traffic.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We draft a detailed Software Requirements Specification (SRS) alongside database entity-relationship models and API interface contracts.',
          'We operate in 2-week agile sprints, deploying functional vertical slices to a private staging URL so you can test features and provide feedback iteratively.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Lifecycle & scale',
        question: 'FULL PRODUCTION DEPLOYMENT?',
        answerParagraphs: [
          'We set up automated CI/CD pipelines, Docker container orchestration, staging environments, regression test suites, and zero-downtime database migrations.',
          'Post-launch, we provide dedicated maintenance SLAs, server telemetry monitoring, and rapid feature expansion as your customer base grows.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'app-development') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT APPS WE BUILD?',
        answerParagraphs: [
          'We engineer high-performance native iOS and Android mobile applications using Flutter and React Native, delivering silky-smooth 60fps animations with a unified, cost-effective codebase.',
          'From on-demand booking tools and eCommerce apps to enterprise field-worker portals, we design ergonomic mobile experiences that drive daily user engagement.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Platform stage',
        question: 'NEW APP OR WEB EXTENSION?',
        answerParagraphs: [
          'Whether you are launching an innovative mobile-first startup or extending an existing web platform into your users\' pockets, we ensure real-time biometric and cloud data sync.',
          'We integrate offline-first SQLite/Hive caching, push notification servers, and native device capabilities (GPS, camera, Bluetooth, and biometric auth).'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We translate your product roadmap into an interactive mobile prototype that tests thumb navigation zones, touch targets, and onboarding flows.',
          'Once the UX flow is approved, we construct the state management architecture and connect production REST/GraphQL API endpoints.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'App Store launch',
        question: 'FULL PUBLISHING LIFECYCLE?',
        answerParagraphs: [
          'We manage the entire Apple App Store and Google Play Store submission process, guaranteeing compliance with developer guidelines, privacy regulations, and store policies.',
          'We also configure Sentry crash diagnostics, in-app update mechanisms, and push notification analytics to maintain top app ratings.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'digital-marketing') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE MANAGE?',
        answerParagraphs: [
          'We run performance-focused advertising campaigns across Google Search, Meta (Instagram & Facebook), YouTube, and programmatic ad exchanges focused strictly on qualified lead acquisition.',
          'Our team handles creative production, high-converting dedicated landing pages, A/B conversion rate optimization (CRO), and multi-touch revenue attribution.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Campaign stage',
        question: 'NEW ADS OR OPTIMIZATION?',
        answerParagraphs: [
          'We launch fresh ad accounts with custom conversion tracking pixels and domain verification, and we also audit and optimize underperforming existing ad spend.',
          'We ruthlessly cut budget wasted on low-intent keywords, build high-intent lookalike audiences, and test fresh creative hooks that drive down your Customer Acquisition Cost (CAC).'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We audit your historical ad data, unit economics, and competitors to establish concrete Cost Per Lead (CPL) and Return On Ad Spend (ROAS) targets.',
          'Within 5 days, we launch targeted pilot campaigns featuring multiple creative angles and dedicated landing pages to gather initial conversion benchmarks.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Growth engine',
        question: 'FULL MARKETING FUNNEL?',
        answerParagraphs: [
          'We don\'t stop at clicks; we connect your inbound ad traffic directly into automated CRM pipelines, instant WhatsApp alerts, and email retargeting sequences.',
          'You receive real-time transparent executive dashboards showing exact pipeline ROI, revenue attribution, and cost-efficiency metrics.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  if (serviceId === 'ui-ux-design') {
    return [
      {
        num: '01',
        category: 'Services overview',
        question: 'WHAT WE DESIGN?',
        answerParagraphs: [
          'We design user research-backed design systems, web and mobile product interfaces, SaaS dashboards, and cohesive digital brand identities that command industry authority.',
          'Every screen is engineered with strict typographic hierarchy, WCAG accessibility standards, and reusable Figma auto-layout token libraries.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '02',
        category: 'Brand stage',
        question: 'NEW OR EXISTING BRAND?',
        answerParagraphs: [
          'We work with both new brands that need clearer positioning and established businesses looking to eliminate visual noise and modernize product usability.',
          'For existing brands, we refine what already works, clean up UI inconsistencies, and establish scalable design guidelines across all customer touchpoints.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '03',
        category: 'First step',
        question: 'WHERE WE START?',
        answerParagraphs: [
          'We begin with stakeholder discovery workshops to understand your user personas, core task flows, and business conversion goals.',
          'We then build low-fidelity wireframes to validate layout logic before applying typography, color systems, micro-interactions, and visual polish.'
        ],
        thumbnailImage: serviceImg
      },
      {
        num: '04',
        category: 'Design system',
        question: 'FULL DESIGN SYSTEM?',
        answerParagraphs: [
          'We deliver production-ready Figma design systems with auto-layout, interactive prototypes, design tokens, and comprehensive developer handoff documentation.',
          'Our designers work closely with your engineering team during implementation to ensure 100% fidelity from design to live code.'
        ],
        thumbnailImage: serviceImg
      }
    ];
  }

  // Fallback for any other services
  return [
    {
      num: '01',
      category: 'Services overview',
      question: `WHAT WE DO IN ${service.title.toUpperCase()}?`,
      answerParagraphs: [
        service.description || service.tagline,
        `We provide end-to-end engineering, strategic consultation, and automated implementation tailored specifically for ${service.title}.`
      ],
      thumbnailImage: serviceImg
    },
    {
      num: '02',
      category: 'Project stage',
      question: 'NEW OR EXISTING SYSTEM?',
      answerParagraphs: [
        'We work with both new ventures building from scratch and existing organizations looking to upgrade, modernize, and automate their current operations.',
        'We seamlessly integrate with your existing technology stack, preserving valuable historical data while introducing high-performance modern architectures.'
      ],
      thumbnailImage: serviceImg
    },
    {
      num: '03',
      category: 'First step',
      question: 'WHERE WE START?',
      answerParagraphs: [
        'We begin with an architectural consultation to understand your business objectives, operational challenges, and technical specifications.',
        'Within 48 hours, our team delivers a clear technical roadmap, milestone estimates, and an interactive prototype for your review.'
      ],
      thumbnailImage: serviceImg
    },
    {
      num: '04',
      category: 'Complete direction',
      question: 'FULL PRODUCTION DEPLOYMENT?',
      answerParagraphs: [
        'Yes. We provide complete end-to-end delivery including automated testing, secure cloud deployment, staff onboarding, and ongoing technical maintenance.',
        'Your system is backed by high-availability architecture, comprehensive documentation, and 24/7 operational reliability.'
      ],
      thumbnailImage: serviceImg
    }
  ];
}

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Find the requested service or fallback to first
  const currentService: CategorizedService =
    (serviceId ? getCategorizedServiceById(serviceId) : undefined) || CATEGORIZED_SERVICES[0];

  // FAQ hover & selection state (Reference Image style: hover to show answer, click to toggle)
  const [hoveredFaqIdx, setHoveredFaqIdx] = useState<number | null>(null);
  const [selectedFaqIdx, setSelectedFaqIdx] = useState<number>(0);

  // Computed service-specific FAQs
  const serviceFaqs = getServiceFaqs(currentService);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Find current index to provide Next Service link
  const currentIdx = CATEGORIZED_SERVICES.findIndex((s) => s.id === currentService.id);
  const nextService = CATEGORIZED_SERVICES[(currentIdx + 1) % CATEGORIZED_SERVICES.length];

  return (
    <div className={`min-h-screen transition-colors duration-300 overflow-x-clip ${
      isLight ? 'bg-[#FAF9F5] text-zinc-900' : 'bg-[#06080E] text-white'
    }`}>
      <SEO
        title={`${currentService.title} | Atideto Technologies`}
        description={currentService.tagline}
        url={`https://atideto.in/services/${currentService.id}`}
      />

      {/* ── 1. HERO SECTION (Matching Reference Design) ── */}
      <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          aria-hidden
          className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-[#0052FF]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-black dark:hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-[#2EA8FF] font-bold">{currentService.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: Eyebrow + Title + Copy + CTA Buttons */}
            <div className="lg:col-span-7 text-left">

              {/* Big Title with Subtitle (Reference Image 4 Style: Title / Subtitle, no numbers, no eyebrow) */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-6 text-zinc-900 dark:text-white flex items-center gap-3 sm:gap-4 flex-wrap"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                <span>{currentService.title}</span>
                <span className="text-zinc-400 dark:text-white/20 font-light text-2xl sm:text-3xl lg:text-4xl select-none">/</span>
                <span
                  className="text-base sm:text-xl lg:text-2xl font-semibold text-zinc-500 dark:text-[#94A3B8] tracking-tight"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {getServiceSubtitle(currentService.id, currentService.eyebrow)}
                </span>
              </h1>

              {/* Tagline / Subtitle */}
              <p 
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-normal text-zinc-600 dark:text-slate-300"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {currentService.description || currentService.tagline}
              </p>

              {/* Action Buttons: Talk about this service ↗ + Explore Capabilities */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigate('/client-connect')}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#0052FF] hover:bg-[#0047E0] shadow-[0_4px_24px_rgba(0,82,255,0.35)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Talk about this service</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20 text-white font-mono text-xs">
                    ↗
                  </span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('capabilities-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer ${
                    isLight
                      ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Explore Capabilities</span>
                  <ChevronDown size={14} />
                </button>
              </div>

            </div>

            {/* Right Column: 3D Illustration Only (2nd & 3rd ref: No box, no names, no hover glow, neat tooltips) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
              <div className="relative group cursor-pointer inline-flex flex-col items-center">
                {/* Tooltip 1: Architecture Status (Top Floating) */}
                <div className="absolute -top-3 right-0 sm:right-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-30">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080E1C]/95 border border-[#38BDF8]/40 text-white shadow-2xl backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono tracking-wide text-slate-200">
                      Production Architecture
                    </span>
                  </div>
                </div>

                <img
                  src={currentService.visualImage}
                  alt={currentService.title}
                  className="w-56 sm:w-72 md:w-80 lg:w-96 h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Tooltip 2: Engine Name (Bottom Floating) */}
                <div className="absolute -bottom-5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-30">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#080E1C]/95 border border-white/20 text-white shadow-2xl backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2EA8FF] animate-pulse" />
                    <span className="text-xs font-mono font-semibold tracking-wide text-slate-200">
                      {currentService.title} Engine
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ── 2. CENTERPIECE CAPABILITIES CARDS GRID (Updated to Match Reference Image 1) ── */}
      <section 
        id="capabilities-grid" 
        className={`py-16 sm:py-24 border-t ${
          isLight ? 'border-zinc-200/80 bg-zinc-50/50' : 'border-white/10 bg-[#080B12]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            {currentService.capabilities.map((cap, idx) => {
              // 3 Distinct Stylings alternating identically to Reference Image:
              // Index 0: Dark navy | Index 1: Crisp white | Index 2: Vibrant royal blue
              const themeType = idx % 3 === 0 ? 'dark' : idx % 3 === 1 ? 'white' : 'blue';

              return (
                <div
                  key={cap.name}
                  onClick={() => navigate(`/client-connect?service=${encodeURIComponent(cap.name)}`)}
                  className={`group relative p-4 sm:p-5 rounded-[22px] sm:rounded-[26px] border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden aspect-square min-h-[220px] sm:min-h-[235px] ${
                    themeType === 'blue'
                      ? 'bg-gradient-to-br from-[#0047E0] to-[#0052FF] border-[#38BDF8]/30 text-white shadow-[0_12px_32px_rgba(0,82,255,0.35)] hover:border-white/50 hover:shadow-[0_16px_40px_rgba(0,82,255,0.48)]'
                      : themeType === 'white'
                      ? 'bg-white border-zinc-200 text-zinc-900 shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-zinc-300 hover:shadow-[0_14px_32px_rgba(0,0,0,0.15)]'
                      : 'bg-[#090D18] border-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-[#0052FF]/60 hover:shadow-[0_14px_36px_rgba(0,82,255,0.2)]'
                  }`}
                >
                  {/* Top Row: 3x3 Dot-Matrix on Right (Number Removed per request) */}
                  <div className="flex items-center justify-end mb-1 shrink-0">
                    <div className="grid grid-cols-3 gap-0.5 sm:gap-1 opacity-70">
                      {[...Array(9)].map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`w-1 h-1 rounded-full ${
                            themeType === 'blue'
                              ? 'bg-white/80'
                              : themeType === 'white'
                              ? 'bg-zinc-300'
                              : 'bg-[#38BDF8]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Top to Bottom: Centered 3D Visual Illustration Mockup */}
                  <div className="flex items-center justify-center my-auto shrink-0 py-1">
                    <img
                      src={getCapabilityImage(cap.name, currentService.id)}
                      alt={cap.name}
                      className="w-16 sm:w-20 h-16 sm:h-20 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Content Below Image: Name + Small Line Description (Button removed per request) */}
                  <div className="w-full text-left mt-auto pt-2">
                    <h3
                      className={`text-sm sm:text-[15px] font-extrabold tracking-tight leading-tight line-clamp-2 ${
                        themeType === 'white' ? 'text-zinc-950' : 'text-white'
                      }`}
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {cap.name}
                    </h3>
                    <p
                      className={`text-[11px] sm:text-xs leading-snug line-clamp-1 mt-1 font-normal ${
                        themeType === 'blue'
                          ? 'text-blue-100/90'
                          : themeType === 'white'
                          ? 'text-zinc-600'
                          : 'text-slate-400'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {getCapabilityDesc(cap.name, currentService.title)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ── 3. WHERE THIS CAN HELP (4 Numbered Moves in a Row) ── */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Eyebrow + Headline + Subtitle */}
          <div className="mb-14 text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#2EA8FF] font-bold text-sm">—</span>
              <span
                className="text-xs font-bold tracking-[0.25em] text-[#2EA8FF] uppercase"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                A USEFUL STARTING POINT
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2 text-zinc-900 dark:text-white"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Where this can help.
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-slate-400 font-normal">
              Four common examples, explained simply.
            </p>
          </div>

          {/* 4 Numbered Cards in a Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentService.whereThisHelps.map((item) => (
              <div
                key={item.num}
                className={`p-6 rounded-3xl border transition-all duration-200 hover:-translate-y-1 group ${
                  isLight
                    ? 'bg-white border-zinc-200 shadow-sm hover:shadow-lg hover:border-[#0052FF]/40'
                    : 'bg-[#0B0F19] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header: Number Badge + Diagonal Arrow */}
                <div className="flex items-center justify-between mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#0052FF]/10 text-[#2EA8FF] flex items-center justify-center font-mono font-bold text-xs">
                    {item.num}
                  </span>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-[#2EA8FF] transition-colors" />
                </div>

                <h3
                  className="text-base font-bold tracking-tight mb-2 text-zinc-900 dark:text-white group-hover:text-[#2EA8FF] transition-colors"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {item.title}
                </h3>

                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-zinc-600' : 'text-slate-400'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ── 4. QUESTIONS BEFORE THE FIRST STEP (FAQ Style Matching Reference Image) ── */}
      <section 
        id="faq-section"
        className="py-20 lg:py-28 border-t border-white/10 bg-black text-white relative overflow-hidden"
      >
        {/* Subtle Ambient Background Lighting */}
        <div 
          aria-hidden="true"
          className="absolute -top-32 right-1/4 w-[600px] h-[350px] bg-[#0066FF]/10 blur-[140px] rounded-full pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header: FAQ & QUESTIONS BEFORE THE FIRST STEP */}
          <div className="mb-14 sm:mb-20 text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 block mb-3 font-bold select-none">
              FAQ
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              QUESTIONS BEFORE <br className="hidden sm:block" />
              THE FIRST STEP
            </h2>
          </div>

          {/* FAQ Accordion List - Workable & Hover to Show Answer (No Red) */}
          <div className="border-t border-white/10 divide-y divide-white/10">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = hoveredFaqIdx !== null ? hoveredFaqIdx === idx : selectedFaqIdx === idx;

              return (
                <div
                  key={faq.num}
                  onMouseEnter={() => setHoveredFaqIdx(idx)}
                  onMouseLeave={() => setHoveredFaqIdx(null)}
                  onClick={() => setSelectedFaqIdx(selectedFaqIdx === idx && hoveredFaqIdx === null ? -1 : idx)}
                  className="group py-7 sm:py-9 transition-colors duration-200 cursor-pointer text-left"
                >
                  <div className="flex items-start justify-between gap-4 sm:gap-8">
                    
                    {/* Left: Number [01], [02], etc. */}
                    <div className="shrink-0 w-10 sm:w-16 font-mono text-xs sm:text-sm text-slate-400 group-hover:text-white transition-colors pt-1 select-none">
                      [{faq.num}]
                    </div>

                    {/* Middle: Category, Title and Expandable Answer */}
                    <div className="flex-1 min-w-0 pr-2 sm:pr-6">
                      
                      {/* Overline Category */}
                      <div className="text-[11px] sm:text-xs font-mono text-slate-400 tracking-wider mb-2 transition-colors group-hover:text-slate-300">
                        {faq.category}
                      </div>

                      {/* Question Title */}
                      <h3
                        className={`text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase transition-colors ${
                          isOpen ? 'text-white' : 'text-slate-200 group-hover:text-white'
                        }`}
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        {faq.question}
                      </h3>

                      {/* Expandable Answer (Revealed on Hover or Click) */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start gap-5 sm:gap-7">
                              
                              {/* Left Visual Thumbnail (Sleek Blue/Cyan Tech Aura - Strictly NO RED) */}
                              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[#0052FF]/25 via-[#080E1C] to-black border border-[#0066FF]/35 p-3 flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(0,102,255,0.25)]">
                                <img
                                  src={faq.thumbnailImage || getCapabilityImage(currentService.title, currentService.id)}
                                  alt={faq.question}
                                  className="w-full h-full object-contain drop-shadow-md"
                                  loading="lazy"
                                />
                              </div>

                              {/* Right Paragraphs */}
                              <div className="space-y-3 max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed font-normal" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {faq.answerParagraphs.map((paragraph, pIdx) => (
                                  <p key={pIdx}>
                                    {paragraph}
                                  </p>
                                ))}
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Right: Circular Toggle Button (Blue Glow when Open/Hovered - Strictly NO RED) */}
                    <div className="shrink-0 pt-1">
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#0066FF] text-white shadow-[0_0_20px_rgba(0,102,255,0.6)] scale-105'
                            : 'bg-white/5 border border-white/10 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                        }`}
                      >
                        {isOpen ? (
                          <X size={15} className="sm:size-4 transition-transform duration-200" />
                        ) : (
                          <Plus size={15} className="sm:size-4 transition-transform duration-200 group-hover:rotate-90" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Next Service Navigation Bar */}
          <div className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-slate-400">
            <span>Currently viewing: <strong className="text-white">{currentService.title}</strong></span>
            <Link
              to={`/services/${nextService.id}`}
              className="inline-flex items-center gap-2 font-bold text-sm text-[#2EA8FF] hover:underline"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <span>Next Service: {nextService.title}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
