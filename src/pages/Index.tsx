import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import { SERVICES } from '@/constants';

import WhatWeBuildBento from '@/components/features/WhatWeBuildBento';
import SectionHeader from '@/components/ui/SectionHeader';
import CrystallineGrid from '@/components/layout/CrystallineGrid';
import { Target, Zap, Shield, Globe, Headphones, TrendingUp, ArrowRight } from 'lucide-react';
import ContactFormSection from './home/components/ContactFormSection';
import HomeHeroSection from './home/components/HomeHeroSection';

const WHY_US = [
  { icon: Target, title: 'Precision Engineering', desc: 'Every line of code crafted with intention, tested with rigor.' },
  { icon: Zap, title: 'Lightning Fast Delivery', desc: 'Agile sprints, transparent timelines, on-time delivery every time.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade security protocols across all our applications.' },
  { icon: Globe, title: 'Global Expertise', desc: 'Serving clients across 15+ countries with cultural intelligence.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Dedicated support team ensuring zero downtime for your business.' },
  { icon: TrendingUp, title: 'Scalable Architecture', desc: 'Systems built to grow from startup to enterprise without re-architecture.' },
];


export default function Index() {
  const navigate = useNavigate();

  // Intersection Observer for reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] page-container transition-colors duration-300">
      <SEO 
        title="Atideto | Premium Software, Web, Mobile & AI Solutions"
        description="We build intelligent software, AI automation, premium web experiences, mobile applications, and scalable digital platforms."
        url="https://atideto.in/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": "https://atideto.in",
              "name": "Atideto",
              "url": "https://atideto.in",
              "logo": "https://atideto.in/assets/atideto-logo.png",
              "image": "https://atideto.in/assets/home.png",
              "description": "Atideto is a premium software company delivering web, mobile, AI, and cloud solutions, alongside a world-class tech academy.",
              "telephone": "+916379000598",
              "email": "mailto:vishnurajan24766@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "",
                "addressLocality": "Salem",
                "addressRegion": "Tamil Nadu",
                "postalCode": "",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "13.0827",
                "longitude": "80.2707"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.linkedin.com/company/atideto",
                "https://github.com/Vishnuat18"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://atideto.in/#website",
              "url": "https://atideto.in",
              "name": "Atideto",
              "publisher": {
                "@id": "https://atideto.in/#organization"
              }
            }
          ]
        }}
      />
      {/* ── HERO SECTION WITH RUNNING SOLUTIONS CAROUSEL ── */}
      <HomeHeroSection />

      {/* ── CORE PHILOSOPHY (Editorial Manifesto Left-Side Style & Background) ── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#05070E] text-white border-b border-white/5">
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
          {/* Eyebrow: 02 ─── CORE PHILOSOPHY */}
          <div className="flex items-center gap-3 mb-4 text-xs font-mono tracking-[0.22em] text-[#38BDF8] uppercase font-bold">
            <span>02</span>
            <span className="w-10 h-px bg-gradient-to-r from-[#0066FF] to-[#38BDF8]" />
            <span>CORE PHILOSOPHY</span>
          </div>

          {/* Left-Aligned Typography Block */}
          <div className="space-y-6 max-w-3xl text-left">
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

            <div className="pt-2">
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#0052FF] to-[#0066FF] hover:from-[#0066FF] hover:to-[#2EA8FF] text-white font-semibold text-sm shadow-[0_0_24px_rgba(0,102,255,0.4)] transition-all duration-300 cursor-pointer"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span>Explore our services</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD (Restored Old Design Style) ── */}
      <section className="py-20 lg:py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Section Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            {/* Glowing capsule badge */}
            <div className="glass-pill rounded-full px-5 py-1.5 inline-flex items-center gap-2 mb-5 border border-[#005DFF]/25 shadow-[0_0_15px_rgba(0,93,255,0.25)] animate-pulseGlow">
              <span className="text-[#2EA8FF] text-[11px] font-bold tracking-[0.2em] uppercase font-montserrat">
                WHAT WE BUILD
              </span>
            </div>

            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl editorial-title font-extrabold text-white mb-6 leading-tight tracking-tight max-w-3xl"
            >
              Building Intelligent Digital Products for the Future.
            </h2>
            
            <p 
              className="text-[#A7B3C7] text-base md:text-lg max-w-2xl mx-auto leading-relaxed editorial-sub"
            >
              From AI-powered automation to enterprise software, we transform complex challenges into scalable, high-performance digital products.
            </p>
          </div>

          {/* Bento Grid */}
          <WhatWeBuildBento />

          {/* Bottom CTA (Explore Our Services →) */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/services')}
              className="btn-outline rounded-full px-8 py-3.5 text-sm font-bold tracking-wide uppercase glass inline-flex items-center gap-2 hover:border-[#2EA8FF]/40 hover:shadow-[0_0_20px_rgba(46,168,255,0.25)] transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <span>Explore Our Services</span>
              <span className="text-[#2EA8FF]">→</span>
            </button>
          </div>

        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader
            number="03"
            category="WHY CHOOSE US"
            title="Engineering That"
            highlight="Scales"
            subtitle="We don't just write code. We engineer high-performance systems with thoughtful design and powerful technology."
            align="center"
          />

          {/* Desktop Layout: 3 columns with full card details */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="reveal glass rounded-2xl p-6 card-hover"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#005DFF]/15 border border-[#2EA8FF]/20 flex items-center justify-center text-[#2EA8FF] mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#AFAFAF] text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Mobile Layout: 3x2 Table with Icon (without borders) and Name only */}
          <div className="grid grid-cols-3 md:hidden rounded-2xl border border-white/10 bg-[#0A0D14]/70 backdrop-blur-md overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)]">
            {WHY_US.map((item, index) => {
              const Icon = item.icon;
              const isNotLastCol = index % 3 !== 2;
              const isFirstRow = index < 3;
              return (
                <div
                  key={item.title}
                  className={`p-3.5 sm:p-4 flex flex-col items-center justify-center text-center transition-colors hover:bg-white/[0.04] min-h-[96px] ${
                    isNotLastCol ? 'border-r border-white/10' : ''
                  } ${isFirstRow ? 'border-b border-white/10' : ''}`}
                >
                  {/* Clean icon without borders */}
                  <Icon size={22} className="text-[#2EA8FF] mb-2 shrink-0 drop-shadow-[0_0_8px_rgba(46,168,255,0.45)]" />
                  <span className="text-white font-semibold text-[11px] sm:text-xs leading-tight font-montserrat">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {/* <TestimonialsSection /> */}
      
      {/* ── CONTACT FORM ── */}
      <ContactFormSection />

      <section className="py-24 relative overflow-hidden">
        {/* Enormous crystalline grid background */}
        <CrystallineGrid />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="section-tag mx-auto">Ready to Begin?</div>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.02em' }}>
            Let's Build Something
            <br />
            <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="text-[#AFAFAF] text-lg mb-10 max-w-xl mx-auto">
            From idea to launch, we're your engineering partner for the digital future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/client-connect')}
              className="btn-primary text-base px-10 py-4 animate-pulseGlow"
            >
              Start Your Project →
            </button>
            <button
              onClick={() => navigate('/academy')}
              className="btn-outline text-base px-10 py-4"
            >
              Join the Academy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
