import React from 'react';

interface SectionHeaderProps {
  number?: string;
  category: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  italicWord?: string;
}

export default function SectionHeader({
  number = '02',
  category,
  title,
  highlight,
  subtitle,
  align = 'left',
  className = '',
  italicWord,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 sm:mb-14 text-left flex flex-col items-start ${className}`}>
      {/* Eyebrow: 02 ─── CATEGORY */}
      <div className="inline-flex items-center gap-3 mb-3.5 text-xs font-mono tracking-[0.22em] text-[#38BDF8] uppercase font-bold select-none text-left">
        <span className="text-white/80 font-bold">{number}</span>
        <span className="w-10 h-px bg-gradient-to-r from-[#0066FF] to-[#38BDF8]/40" />
        <span className="text-[#38BDF8]">{category}</span>
      </div>

      {/* Main Heading: MANROPE — Bold, Modern, Distinctive */}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 leading-[1.16] text-left"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        {title}{' '}
        {highlight && (
          <span className="text-[#0066FF] drop-shadow-[0_0_24px_rgba(0,102,255,0.4)]">
            {highlight}
          </span>
        )}
        {italicWord && (
          <span className="font-serif italic font-normal text-[#38BDF8] ml-2">
            {italicWord}
          </span>
        )}
      </h2>

      {/* Subtitle: INTER — Always starts at the left end */}
      {subtitle && (
        <p
          className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal text-left max-w-2xl"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
