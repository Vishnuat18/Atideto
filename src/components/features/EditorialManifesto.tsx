import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function EditorialManifesto() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#05070E] text-white">
      {/* Background Radial Glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 85% 50%, rgba(0, 102, 255, 0.15), transparent 55%), radial-gradient(ellipse at 15% 50%, rgba(46, 168, 255, 0.1), transparent 50%)',
        }}
      />

      {/* Sweeping Dynamic Electric Blue Lines (Matching Image 2 Reference) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
          {Array.from({ length: 32 }).map((_, i) => (
            <path
              key={i}
              d={`M -80 ${440 + i * 16} C 300 ${390 + i * 12}, 700 ${270 + i * 10}, 1300 ${160 + i * 8}`}
              stroke="#0066FF"
              strokeWidth={0.8 + (i % 4) * 0.4}
              strokeOpacity={0.1 + (i / 32) * 0.45}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Image 1 Reference Subtitle Pattern: 02 ─── CORE SERVICES / PHILOSOPHY */}
        <div className="flex items-center gap-3 mb-4 text-xs font-mono tracking-[0.22em] text-[#38BDF8] uppercase font-bold">
          <span>02</span>
          <span className="w-10 h-px bg-gradient-to-r from-[#0066FF] to-[#38BDF8]" />
          <span>CORE PHILOSOPHY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-6">
            {/* MANROPE — Bold, Modern, Distinctive Headings */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Build something{' '}
              <span className="font-editorial-italic italic font-normal text-[#2EA8FF] drop-shadow-[0_0_30px_rgba(46,168,255,0.45)]">
                exceptional
              </span>
              .
            </h2>

            {/* INTER — Highly Readable & Clean Body Text */}
            <p
              className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-normal"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Create clean, intuitive digital experiences with{' '}
              <span className="text-white font-medium underline decoration-[#0066FF] decoration-2 underline-offset-4">
                thoughtful design
              </span>{' '}
              and{' '}
              <span className="font-editorial-italic italic text-[#38BDF8]">
                powerful technology
              </span>
              . Engineered for operational efficiency, enterprise security, and measurable growth.
            </p>

            {/* CTA & Badges */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#2EA8FF] text-white font-semibold text-sm shadow-[0_0_24px_rgba(0,102,255,0.4)] transition-all duration-300 cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Explore our services</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs text-slate-400">
                <Sparkles className="size-3.5 text-[#38BDF8]" />
                <span>Inter + Manrope Typography</span>
              </div>
            </div>
          </div>

          {/* Right Card: Use Case & Pairing Highlights */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl p-6 bg-[#0A0F1D]/80 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-[#0066FF]/40 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-[11px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold mb-3">
                Typography Matrix · Best Overall
              </div>

              <div className="space-y-3 mb-5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-0.5">
                    MANROPE — HEADINGS
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    Bold, modern, distinctive.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-0.5">
                    INTER — BODY TEXT
                  </div>
                  <div className="text-sm font-normal text-slate-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Highly readable, ergonomic, and clean.
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06] pt-3.5">
                <div className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="size-3.5 text-[#00D26A]" />
                  <span>Best for SaaS, Startups & Corporate Portfolios</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Engineered for maximum reading retention and contemporary authority.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
