import { useEffect } from 'react';
import SEO from '@/components/seo/SEO';
import CoursesExplorer from '@/components/academy/CoursesExplorer';

export default function Courses() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#05070B] min-h-screen relative text-white font-sans selection:bg-white/20 pt-20">
      <SEO 
        title="Atideto Courses | Engineering Curricula & Project Tracks"
        description="Accelerate your engineering skills with Atideto Academy. Professional courses in UI/UX Design, Web Architecture, Generative AI, Cloud DevOps, Mobile Apps, Data Science, and Cyber Security."
        url="https://atideto.in/courses"
        keywords="engineering courses, tech tracks, generative ai, full stack, kubernetes, cybersecurity, flutter, ui ux design, atideto courses"
      />

      {/* Top Header: Sleek, Left-Aligned, Minimal */}
      <div className="border-b border-white/[0.06] bg-[#070A14]/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] uppercase font-bold text-slate-400 mb-1">
              <span>ATIDETO TALENT ACCELERATOR · ALL COURSES</span>
            </div>
            <h1 
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Courses & Curricula
            </h1>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              12 Specialized Disciplines
            </span>
            <span className="text-white/20">|</span>
            <span>24+ Production Capstones</span>
          </div>
        </div>
      </div>

      {/* Main Viewport: Left Sticky Panel + Right Free-Scrolling Courses */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CoursesExplorer />
      </div>

      {/* ── NEXT SECTION: Career Accelerator Banner (matching reference design bottom banner) ── */}
      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-left">
        <div className="relative rounded-3xl border border-[#0066FF]/30 bg-gradient-to-r from-[#0052FF]/15 via-[#0066FF]/25 to-[#38BDF8]/15 p-8 sm:p-14 overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl flex flex-col items-start text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#38BDF8] block mb-3">
              ATIDETO TALENT ACCELERATOR · INDUSTRY IMMERSION
            </span>
            <h2 
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Build Production-Ready Systems with Senior Engineers
            </h2>
            <p 
              className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Accelerate your trajectory with real client capstones, 1-on-1 architecture reviews, and verified enterprise credentials recognized by industry hiring leaders.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#cat-section-programming-languages"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="creatly-btn py-3.5 px-8 text-xs sm:text-sm"
              >
                <span>Back to All Courses</span>
                <span className="button__icon-wrapper">
                  <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width="9">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                  </svg>
                  <svg viewBox="0 0 14 15" fill="none" width="9" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
                    <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor"></path>
                  </svg>
                </span>
              </a>

              <a
                href="/client-connect"
                className="px-6 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/10 text-xs font-semibold transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Schedule Career Consultation ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
