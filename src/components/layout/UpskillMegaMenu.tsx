import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { preloadRoute } from '@/utils/preload';

interface UpskillMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const UPSKILL_COLUMN_1 = [
  { id: 'fullstack', name: 'Full Stack Software Engineering' },
  { id: 'ai-cloud', name: 'AI Engineering & Cloud DevOps' },
  { id: 'mobile', name: 'Mobile Applications Engineering' },
];

export const UPSKILL_COLUMN_2 = [
  { id: 'ui-ux', name: 'Product Design & Creative Branding' },
  { id: 'marketing', name: 'Growth Marketing & Performance Ads' },
];

export const UPSKILL_FEATURED_ITEM = {
  id: 'automation',
  name: 'Enterprise Business Automation'
};

export default function UpskillMegaMenu({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave
}: UpskillMegaMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      id="upskill-mega-menu"
      role="menu"
      aria-label="Upskill Mega Menu"
      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Mega Menu Container matching reference image (Black Left + Dark Charcoal Right in Blue Theme) */}
      <div className="w-[840px] max-w-[96vw] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col md:flex-row text-white">
        
        {/* ── LEFT PANEL: Pitch Black with Giant Blue Title, Tagline & Pill Button ── */}
        <div className="w-full md:w-[320px] bg-black p-8 sm:p-10 flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-white/10 text-left">
          <div>
            {/* Giant Title in Signature Blue Theme */}
            <h2 
              className="text-4xl sm:text-5xl font-black text-[#0066FF] tracking-tight mb-4"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Upskill
            </h2>

            {/* Subtitle / Description */}
            <p 
              className="text-sm text-slate-300 leading-relaxed font-normal"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Launch your engineering career with real client projects and corporate tech internships.
            </p>
          </div>

          {/* Liquid Blobs Menu Button: Go to Upskill */}
          <div className="pt-8">
            <button
              onClick={() => {
                onClose();
                navigate('/upskill');
              }}
              className="menu-blob-btn"
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Explore</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL: Charcoal Contrast with 2-Column Links, Divider & Featured Item ── */}
        <div className="flex-1 bg-[#161B26] p-8 sm:p-10 flex flex-col justify-between text-left">
          <div>
            {/* Section Header */}
            <div 
              className="text-slate-400 font-semibold text-sm mb-6 tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Upskill Programs
            </div>

            {/* 2-Column Programs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              
              {/* Column 1 */}
              <div className="space-y-3.5">
                {UPSKILL_COLUMN_1.map((item) => (
                  <Link
                    key={item.id}
                    to="/upskill"
                    onClick={onClose}
                    onMouseEnter={() => preloadRoute('/upskill')}
                    className="block text-slate-200 hover:text-[#38BDF8] text-sm font-medium transition-colors cursor-pointer py-0.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-3.5">
                {UPSKILL_COLUMN_2.map((item) => (
                  <Link
                    key={item.id}
                    to="/upskill"
                    onClick={onClose}
                    onMouseEnter={() => preloadRoute('/upskill')}
                    className="block text-slate-200 hover:text-[#38BDF8] text-sm font-medium transition-colors cursor-pointer py-0.5"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Divider Line */}
                <div className="w-full h-px bg-white/10 my-3" />

                {/* Featured Highlighted Item */}
                <Link
                  to="/upskill"
                  onClick={onClose}
                  onMouseEnter={() => preloadRoute('/upskill')}
                  className="block text-white font-bold text-sm hover:text-[#38BDF8] transition-colors cursor-pointer py-0.5"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {UPSKILL_FEATURED_ITEM.name}
                </Link>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
