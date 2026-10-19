import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/constants';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import PullChain from './PullChain';
import ServicesMegaMenu from './ServicesMegaMenu';
import CoursesMegaMenu from './CoursesMegaMenu';
import UpskillMegaMenu from './UpskillMegaMenu';
import { useTheme } from '@/context/ThemeContext';
import atidetoLogo from '@/assets/atideto/logo.png';
import atidetoWordmark from '@/assets/atideto/atideto.png';
import { preloadRoute } from '@/utils/preload';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      const isCourseSection = 
        location.pathname.startsWith('/courses') || 
        location.pathname.startsWith('/academy') || 
        location.pathname.startsWith('/upskill') ||
        location.pathname.startsWith('/internships');

      const isServicesPage = 
        location.pathname.startsWith('/services');

      // Check if user is currently inside the enterprise solutions / services section
      const solutionsEl = document.getElementById('solutions-grid');
      let isInSolutionsSection = false;
      if (solutionsEl) {
        const rect = solutionsEl.getBoundingClientRect();
        isInSolutionsSection = rect.top <= 120 && rect.bottom >= 80;
      }

      if (isCourseSection || isServicesPage || isInSolutionsSection) {
        // In course section or enterprise services section, strictly hide when scrolling up or down
        if (currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false); // scrolling down
        } else {
          setIsVisible(true); // scrolling up
        }
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const { user: currentUser } = useAuth();

  // Mega-menu state for Services
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const closeServicesTimer = useRef<number | null>(null);

  // Mega-menu state for Courses
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const closeCoursesTimer = useRef<number | null>(null);

  // Mega-menu state for Upskill (Internships)
  const [isUpskillMenuOpen, setIsUpskillMenuOpen] = useState(false);
  const closeUpskillTimer = useRef<number | null>(null);

  // Handlers for Services
  const handleServicesMouseEnter = () => {
    if (closeServicesTimer.current) clearTimeout(closeServicesTimer.current);
    setIsServicesMenuOpen(true);
    setIsCoursesMenuOpen(false);
    setIsUpskillMenuOpen(false);
  };
  const handleServicesMouseLeave = () => {
    closeServicesTimer.current = window.setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 200);
  };

  // Handlers for Courses
  const handleCoursesMouseEnter = () => {
    if (closeCoursesTimer.current) clearTimeout(closeCoursesTimer.current);
    setIsCoursesMenuOpen(true);
    setIsServicesMenuOpen(false);
    setIsUpskillMenuOpen(false);
  };
  const handleCoursesMouseLeave = () => {
    closeCoursesTimer.current = window.setTimeout(() => {
      setIsCoursesMenuOpen(false);
    }, 200);
  };

  // Handlers for Upskill
  const handleUpskillMouseEnter = () => {
    if (closeUpskillTimer.current) clearTimeout(closeUpskillTimer.current);
    setIsUpskillMenuOpen(true);
    setIsServicesMenuOpen(false);
    setIsCoursesMenuOpen(false);
  };
  const handleUpskillMouseLeave = () => {
    closeUpskillTimer.current = window.setTimeout(() => {
      setIsUpskillMenuOpen(false);
    }, 200);
  };

  // Close mega menus on route change
  useEffect(() => {
    setIsServicesMenuOpen(false);
    setIsCoursesMenuOpen(false);
    setIsUpskillMenuOpen(false);
  }, [location.pathname]);

  // Close mega menus when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#services-mega-menu') && !target.closest('[aria-label="Toggle Services Mega Menu"]')) {
        setIsServicesMenuOpen(false);
      }
      if (!target.closest('#courses-mega-menu') && !target.closest('[aria-label="Toggle Courses Mega Menu"]')) {
        setIsCoursesMenuOpen(false);
      }
      if (!target.closest('#upskill-mega-menu') && !target.closest('[aria-label="Toggle Upskill Mega Menu"]')) {
        setIsUpskillMenuOpen(false);
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  if (location.pathname === '/login' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Glass fade background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 pointer-events-none -z-10 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
            background: theme === 'light' 
              ? 'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(244,245,247,0.75) 100%)'
              : 'linear-gradient(to bottom, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.3) 100%)'
          }}
        />
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 w-full">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 sm:gap-3 group"
            onMouseEnter={() => preloadRoute('/')}
            aria-label="Atideto Home"
          >
            <img 
              src={atidetoLogo} 
              alt="Atideto Logo" 
              className={`h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                theme === 'light'
                  ? 'filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
                  : 'filter drop-shadow-[0_0_15px_rgba(0,102,255,0.55)]'
              }`} 
            />
            <img 
              src={atidetoWordmark} 
              alt="Atideto Technologies" 
              className={`h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
                theme === 'light'
                  ? 'filter invert brightness-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
                  : 'filter drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]'
              }`} 
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {/* 1. Home */}
            <Link
              to="/"
              onMouseEnter={() => preloadRoute('/')}
              className={`text-sm font-medium transition-colors duration-200 relative group font-sans ${
                location.pathname === '/' 
                  ? 'text-[#2EA8FF] font-bold'
                  : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
              }`}
            >
              Home
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            {/* 2. Services Dropdown (6 Categories, No numbers) */}
            {/* 2. Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <div className="inline-flex items-center gap-1">
                <Link
                  to="/services"
                  onMouseEnter={() => preloadRoute('/services')}
                  className={`text-sm font-medium transition-colors duration-200 relative group font-sans inline-flex items-center cursor-pointer py-1 ${
                    location.pathname.startsWith('/services') || isServicesMenuOpen
                      ? 'text-[#2EA8FF] font-bold'
                      : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
                  }`}
                >
                  <span>Services</span>
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                    location.pathname.startsWith('/services') || isServicesMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsServicesMenuOpen((prev) => !prev);
                  }}
                  aria-expanded={isServicesMenuOpen}
                  aria-label="Toggle Services Mega Menu"
                  className="p-1 rounded-md text-slate-400 hover:text-[#2EA8FF] transition-colors cursor-pointer"
                >
                  <ChevronDown 
                    size={13} 
                    className={`transition-transform duration-200 ${
                      isServicesMenuOpen ? 'rotate-180 text-[#2EA8FF]' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* 3. Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            >
              <div className="inline-flex items-center gap-1">
                <Link
                  to="/courses"
                  onMouseEnter={() => preloadRoute('/courses')}
                  className={`text-sm font-medium transition-colors duration-200 relative group font-sans inline-flex items-center cursor-pointer py-1 ${
                    location.pathname === '/courses' || isCoursesMenuOpen
                      ? 'text-[#2EA8FF] font-bold'
                      : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
                  }`}
                >
                  <span>Courses</span>
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                    location.pathname === '/courses' || isCoursesMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsCoursesMenuOpen((prev) => !prev);
                  }}
                  aria-expanded={isCoursesMenuOpen}
                  aria-label="Toggle Courses Mega Menu"
                  className="p-1 rounded-md text-slate-400 hover:text-[#2EA8FF] transition-colors cursor-pointer"
                >
                  <ChevronDown 
                    size={13} 
                    className={`transition-transform duration-200 ${
                      isCoursesMenuOpen ? 'rotate-180 text-[#2EA8FF]' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* 4. Upskill Dropdown (Internships & Programs) */}
            <div
              className="relative"
              onMouseEnter={handleUpskillMouseEnter}
              onMouseLeave={handleUpskillMouseLeave}
            >
              <div className="inline-flex items-center gap-1">
                <Link
                  to="/upskill"
                  onMouseEnter={() => preloadRoute('/upskill')}
                  className={`text-sm font-medium transition-colors duration-200 relative group font-sans inline-flex items-center cursor-pointer py-1 ${
                    location.pathname === '/upskill' || isUpskillMenuOpen
                      ? 'text-[#2EA8FF] font-bold'
                      : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
                  }`}
                >
                  <span>Upskill</span>
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                    location.pathname === '/upskill' || isUpskillMenuOpen ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsUpskillMenuOpen((prev) => !prev);
                  }}
                  aria-expanded={isUpskillMenuOpen}
                  aria-label="Toggle Upskill Mega Menu"
                  className="p-1 rounded-md text-slate-400 hover:text-[#2EA8FF] transition-colors cursor-pointer"
                >
                  <ChevronDown 
                    size={13} 
                    className={`transition-transform duration-200 ${
                      isUpskillMenuOpen ? 'rotate-180 text-[#2EA8FF]' : ''
                    }`} 
                  />
                </button>
              </div>
            </div>

            {/* ── UNIFIED MEGA MENUS (Symmetrically Centered Under Nav Bar) ── */}
            <ServicesMegaMenu 
              isOpen={isServicesMenuOpen} 
              onClose={() => setIsServicesMenuOpen(false)} 
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            />

            <CoursesMegaMenu 
              isOpen={isCoursesMenuOpen} 
              onClose={() => setIsCoursesMenuOpen(false)} 
              onMouseEnter={handleCoursesMouseEnter}
              onMouseLeave={handleCoursesMouseLeave}
            />

            <UpskillMegaMenu 
              isOpen={isUpskillMenuOpen} 
              onClose={() => setIsUpskillMenuOpen(false)} 
              onMouseEnter={handleUpskillMouseEnter}
              onMouseLeave={handleUpskillMouseLeave}
            />

            {/* 5. About */}
            <Link
              to="/about"
              onMouseEnter={() => preloadRoute('/about')}
              className={`text-sm font-medium transition-colors duration-200 relative group font-sans ${
                location.pathname === '/about' 
                  ? 'text-[#2EA8FF] font-bold'
                  : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
              }`}
            >
              About
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>

            {/* 6. Contact */}
            <Link
              to="/client-connect"
              onMouseEnter={() => preloadRoute('/client-connect')}
              className={`text-sm font-medium transition-colors duration-200 relative group font-sans ${
                location.pathname === '/client-connect' 
                  ? 'text-[#2EA8FF] font-bold'
                  : (theme === 'light' ? 'text-zinc-700 hover:text-[#2EA8FF]' : 'text-slate-300 hover:text-white')
              }`}
            >
              Contact
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#0066FF] transition-all duration-300 ${
                location.pathname === '/client-connect' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          </div>

          {/* Right Area: Start a project + Login */}
          <div className="flex items-center gap-3 sm:gap-4">
            


            {/* Profile or Login */}
            {currentUser ? (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/dashboard"
                  onMouseEnter={() => preloadRoute('/dashboard')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all font-sans flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00D26A]" />
                  <span>{currentUser.role === 'admin' ? 'ERP Admin' : 'Dashboard'}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                onMouseEnter={() => preloadRoute('/login')}
                className="hidden lg:inline-flex kingfress-btn font-sans"
                aria-label="Login"
              >
                <span className="span-mother">
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>i</span>
                  <span>n</span>
                </span>
                <span className="span-mother2">
                  <span>L</span>
                  <span>o</span>
                  <span>g</span>
                  <span>i</span>
                  <span>n</span>
                </span>
              </Link>
            )}

            {/* Mobile / Global Pull-Chain Menu Trigger */}
            <PullChain />
          </div>
        </div>
      </nav>
    </>
  );
}
