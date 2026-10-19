import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import SEO from '@/components/seo/SEO';
import InternshipExplorer from '@/components/InternshipExplorer';
import CoursesExplorer from '@/components/academy/CoursesExplorer';
import academyBg from '@/assets/hero/academy.png';
import { COURSES, INTERNSHIP_PROGRAMS } from '@/constants';
import { ACADEMY_COURSES } from '@/constants/academyCourses';
import { BookOpen, Briefcase, Sparkles, Award, ArrowUpRight } from 'lucide-react';

interface AcademyProps {
  defaultTab?: 'courses' | 'internships';
}

export default function Academy({ defaultTab }: AcademyProps) {
  const location = useLocation();
  const initialTab = defaultTab || (location.pathname === '/upskill' ? 'internships' : 'courses');
  const [activeTab, setActiveTab] = useState<'courses' | 'internships'>(initialTab);

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    } else if (location.pathname === '/upskill') {
      setActiveTab('internships');
    } else if (location.pathname === '/courses') {
      setActiveTab('courses');
    }
  }, [location.pathname, defaultTab]);

  const academySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://atideto.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Academy",
            "item": "https://atideto.in/academy"
          }
        ]
      },
      ...ACADEMY_COURSES.map(course => ({
        "@type": "Course",
        "name": course.title,
        "description": course.shortDesc,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://atideto.in/#organization",
          "name": "Atideto Academy",
          "url": "https://atideto.in/academy"
        }
      })),
      ...INTERNSHIP_PROGRAMS.map(prog => ({
        "@type": "Course",
        "name": `${prog.title} Internship`,
        "description": `Industry-aligned tech internship in ${prog.title} at Atideto Academy.`,
        "provider": {
          "@type": "LocalBusiness",
          "@id": "https://atideto.in/#organization",
          "name": "Atideto Academy",
          "url": "https://atideto.in/academy"
        }
      }))
    ]
  };

  return (
    <div className="bg-[#05070B] min-h-screen relative overflow-x-clip text-white font-sans selection:bg-[#0066FF]/30">
      <SEO 
        title="Atideto Academy | Industry Courses & Tech Internships"
        description="Accelerate your tech career with Atideto Academy. Specialized courses in Generative AI, Full Stack MERN, Cloud DevOps, Cyber Security, Mobile Apps & Data Science with hands-on projects."
        url="https://atideto.in/academy"
        keywords="tech academy, software engineering courses, generative ai, full stack, kubernetes, cybersecurity, flutter, Atideto academy"
        schema={academySchema}
      />
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Static Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[#050505]" />

      {/* Hero Section with Background Image (100% Height) */}
      <section 
        className="relative min-h-screen w-full px-6 sm:px-8 lg:px-16 pt-28 sm:pt-36 pb-16 text-left z-10 flex flex-col items-start justify-center border-b border-[#0066FF]/20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.85) 75%, #050505 100%), url(${academyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-4xl text-left flex flex-col items-start">
          {/* Top Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-[0.22em] text-[#38BDF8] uppercase font-bold select-none px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/20 text-left"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
            <span>ATIDETO TALENT ACCELERATOR · COURSES & INTERNSHIPS</span>
          </motion.div>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight text-white drop-shadow-2xl text-left"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Engineering{' '}
            <span className="font-serif italic text-[#38BDF8] drop-shadow-[0_0_30px_rgba(56,189,248,0.45)]">
              Excellence.
            </span>
          </h1>
          <p
            className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl text-left leading-relaxed font-normal mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Master the tools that shape the future. Comprehensive industry programs in Generative AI, Cloud DevOps, Full Stack Systems, and Cyber Security with real-world project portfolios.
          </p>

          {/* Dual Tab Switcher (Courses vs Internships) */}
          <div className="relative flex w-full max-w-[440px] bg-[#0A0F1D]/90 border border-white/[0.08] p-1.5 rounded-full backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'courses'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {activeTab === 'courses' && (
                <motion.div
                  layoutId="academyTabBubble"
                  className="absolute inset-0 bg-gradient-to-r from-[#0052FF] to-[#0066FF] rounded-full shadow-[0_2px_14px_rgba(0,102,255,0.45)] border border-[#38BDF8]/30 -z-10"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                />
              )}
              <BookOpen size={15} className={activeTab === 'courses' ? 'text-[#A5F3FC]' : 'text-slate-400'} />
              <span>Courses</span>
            </button>

            <button
              onClick={() => setActiveTab('internships')}
              className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'internships'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {activeTab === 'internships' && (
                <motion.div
                  layoutId="academyTabBubble"
                  className="absolute inset-0 bg-gradient-to-r from-[#0052FF] to-[#0066FF] rounded-full shadow-[0_2px_14px_rgba(0,102,255,0.45)] border border-[#38BDF8]/30 -z-10"
                  transition={{ type: 'spring', bounce: 0.18, duration: 0.35 }}
                />
              )}
              <Briefcase size={15} className={activeTab === 'internships' ? 'text-[#A5F3FC]' : 'text-slate-400'} />
              <span>Internships</span>
            </button>
          </div>
        </div>

      </section>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'courses' ? (
            <motion.div
              key="courses-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <CoursesExplorer />
            </motion.div>
          ) : (
            <motion.div
              key="internships-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <InternshipExplorer />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
