'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  Phone,
  MapPin,
  ChevronRight,
  Star,
  MessageCircle,
  Menu,
  X,
  Award,
  Zap,
  Target,
  Heart,
  Dumbbell,
  TrendingUp,
  Users,
  CheckCircle2,
  ArrowRight,
  Play,
} from 'lucide-react';
import Link from 'next/link';
import { Transformations, EquipmentGallery, Location } from '@/components/GymSections';

// ─── Icons ───────────────────────────────────────────────────────────────────
const IGIcon = ({ size = 22, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const WAIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
const Tilt3D = ({
  children,
  className,
  depth = 12,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * depth * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -depth * 2;
    el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.03,1.03,1.03)`;
  };
  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transition: 'transform 0.4s cubic-bezier(.03,.98,.52,.99)',
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

// ─── Animated Counter ────────────────────────────────────────────────────────
const Counter = ({ to, suffix = '' }: { to: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start = 0;
        const step = Math.ceil(to / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= to) {
            setCount(to);
            clearInterval(timer);
          } else setCount(start);
        }, 20);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#services' },
    { label: 'Transformations', href: '#transformations' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* ── Logo — fades in only after scroll ── */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Icon badge */}
          <div
            className="relative flex items-center justify-center transition-all duration-500"
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? 'translateY(0px) scale(1)' : 'translateY(-8px) scale(0.85)',
            }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-lg transition-opacity duration-500"
              style={{
                background: scrolled ? 'rgba(255,90,31,0.25)' : 'transparent',
                filter: 'blur(8px)',
                opacity: scrolled ? 1 : 0,
              }}
            />
            {/* Badge */}
            <div
              className="relative w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FF5A1F 0%, #FF3B30 100%)',
                boxShadow: scrolled ? '0 0 20px rgba(255,90,31,0.5)' : 'none',
              }}
            >
              {/* Custom dumbbell SVG */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="10" width="3" height="4" rx="1" fill="white" />
                <rect x="3" y="8" width="2.5" height="8" rx="1" fill="white" />
                <rect x="5.5" y="11" width="13" height="2" rx="1" fill="white" />
                <rect x="18.5" y="8" width="2.5" height="8" rx="1" fill="white" />
                <rect x="20" y="10" width="3" height="4" rx="1" fill="white" />
              </svg>
            </div>
          </div>

          {/* Text wordmark */}
          <div
            className="flex flex-col leading-none transition-all duration-500"
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? 'translateY(0px)' : 'translateY(-8px)',
            }}
          >
            <span className="brawn-oswald font-bold tracking-[0.18em] text-white text-xl leading-none">
              BRAWN<span className="text-[#FF5A1F]">GYM</span>
            </span>
            <span
              className="brawn-montserrat text-[8px] tracking-[0.35em] uppercase mt-0.5"
              style={{ color: 'rgba(255,90,31,0.7)' }}
            >
              ROHTAK
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="brawn-montserrat text-sm font-semibold tracking-widest uppercase text-white/70 hover:text-[#FF5A1F] transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:07272076000"
            className="flex items-center gap-2 px-4 py-2.5 border border-white/20 text-white brawn-montserrat text-sm font-bold tracking-wider hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all duration-300"
          >
            <Phone size={14} /> 07272-076000
          </a>
          <a
            href="#services"
            className="px-6 py-2.5 bg-[#FF5A1F] text-white brawn-montserrat text-sm font-black tracking-wider hover:bg-[#FF3B30] transition-colors"
          >
            JOIN NOW
          </a>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0B0B] border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="brawn-oswald text-xl font-bold tracking-widest text-white hover:text-[#FF5A1F] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="tel:07272076000"
                className="flex items-center justify-center gap-2 py-4 border border-white/20 text-white font-bold tracking-wider"
              >
                <Phone size={16} /> CALL: 07272-076000
              </a>
              <a
                href="#services"
                className="py-4 bg-[#FF5A1F] text-white text-center font-black tracking-widest text-lg"
              >
                JOIN NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────
// Slow-motion workout video (generated) — fallback image shows until loaded
const HERO_VIDEO_URL = 'https://raw.createusercontent.com/94149055-a5c7-4619-ab71-7d2f9cde6780/';

const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 160]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.45;
    }
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* ── Parallax BG layer ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        {/* Fallback 4K image always sits beneath the video */}
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="BRAWN GYM"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />

        {/* Slow-motion video — renders on top once it loads */}
        {HERO_VIDEO_URL ? (
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => {
              if (videoRef.current) videoRef.current.playbackRate = 0.45;
            }}
            className="absolute inset-0 w-full h-full object-cover scale-110"
          />
        ) : null}

        {/* ── Cinematic layered overlays ── */}
        {/* Primary dark gradient top→bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0B0B0B] z-10" />
        {/* Orange left-side glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A1F]/15 via-transparent to-transparent z-10" />
        {/* Dark vignette around edges */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.75) 100%)',
          }}
        />
        {/* Subtle scan-line film texture */}
        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
          }}
        />
        {/* Floating orange glow orb */}
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,90,31,0.12) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* ── Hero Content ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-20 text-center px-6 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-8 px-5 py-2 border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 backdrop-blur-sm"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#FF5A1F]"
              style={{ boxShadow: '0 0 8px #FF5A1F' }}
            />
            <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase">
              Rohtak's #1 Premium Fitness Destination
            </span>
            <span
              className="w-2 h-2 rounded-full bg-[#FF5A1F]"
              style={{ boxShadow: '0 0 8px #FF5A1F' }}
            />
          </motion.div>

          {/* Cinematic headline */}
          <h1 className="brawn-oswald font-bold leading-[0.92] text-white mb-8">
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-[9rem] block"
            >
              TRAIN HARD.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px #FF5A1F' }}
              className="text-5xl sm:text-7xl md:text-[9rem] block"
            >
              BUILD STRENGTH.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-[9rem] block text-[#FF5A1F]"
            >
              BECOME BRAWN.
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="brawn-inter text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Rohtak's Premium Fitness Destination For Strength, Transformation, And Peak Performance.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#services"
              className="group px-10 py-5 bg-[#FF5A1F] text-white brawn-montserrat font-black text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-[#FF3B30] transition-colors duration-300"
              style={{ boxShadow: '0 0 40px rgba(255,90,31,0.4)' }}
            >
              JOIN NOW{' '}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </a>
            <a
              href="tel:07272076000"
              className="px-10 py-5 border-2 border-white/30 text-white brawn-montserrat font-black text-sm tracking-widest uppercase flex items-center gap-3 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all duration-300 backdrop-blur-sm"
            >
              <Phone size={18} /> 07272-076000
            </a>
            <a
              href="#transformations"
              className="px-10 py-5 bg-white/5 border border-white/10 text-white brawn-montserrat font-black text-sm tracking-widest uppercase flex items-center gap-3 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Play size={18} fill="white" /> VIEW RESULTS
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-16 flex items-center justify-center gap-10 md:gap-20"
          >
            {[
              { n: '4.8', s: '★', l: 'Google Rating' },
              { n: '165', s: '+', l: 'Reviews' },
              { n: '500', s: '+', l: 'Members Trained' },
            ].map((stat, i) => (
              <div
                key={i}
                className={`text-center ${i > 0 ? 'border-l border-white/10 pl-10 md:pl-20' : ''}`}
              >
                <div className="brawn-oswald text-3xl md:text-4xl font-bold text-white">
                  {stat.n}
                  <span className="text-[#FF5A1F]">{stat.s}</span>
                </div>
                <div className="brawn-montserrat text-xs tracking-widest uppercase text-white/40 mt-1">
                  {stat.l}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="brawn-montserrat text-[10px] tracking-[0.3em] text-white/30 uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#FF5A1F] to-transparent" />
      </motion.div>
    </section>
  );
};

// ─── Social Proof ─────────────────────────────────────────────────────────────
const SocialProof = () => {
  const items = [
    {
      icon: <Star size={20} className="text-yellow-400" />,
      value: 48,
      suffix: '★',
      label: 'Google Rating',
    },
    {
      icon: <Users size={20} className="text-[#FF5A1F]" />,
      value: 165,
      suffix: '+',
      label: 'Happy Members',
    },
    {
      icon: <MessageCircle size={20} className="text-blue-400" />,
      value: 165,
      suffix: '+',
      label: 'Reviews',
    },
    {
      icon: <TrendingUp size={20} className="text-green-400" />,
      value: 500,
      suffix: '+',
      label: 'Transformations',
    },
    {
      icon: <Award size={20} className="text-purple-400" />,
      value: 100,
      suffix: '%',
      label: 'Commitment',
    },
  ];
  return (
    <section className="relative py-0 bg-[#111111] border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF5A1F]/5 via-transparent to-[#FF5A1F]/5" />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
        {items.map((item, i) => (
          <Tilt3D
            key={i}
            depth={6}
            className="flex flex-col items-center text-center p-5 rounded-xl bg-white/3 border border-white/5 hover:border-[#FF5A1F]/30 transition-colors cursor-default"
          >
            <div className="mb-3">{item.icon}</div>
            <div className="brawn-oswald text-3xl md:text-4xl font-bold text-white">
              <Counter to={item.value} suffix={item.suffix} />
            </div>
            <div className="brawn-montserrat text-[11px] tracking-widest uppercase text-white/40 mt-1">
              {item.label}
            </div>
          </Tilt3D>
        ))}
      </div>
    </section>
  );
};

// ─── About ───────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-28 px-6 bg-[#0B0B0B]">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute -inset-6 bg-[#FF5A1F]/10 blur-3xl rounded-full" />
        <div className="relative grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
            className="rounded-2xl h-64 w-full object-cover border border-white/10"
            alt="gym"
          />
          <img
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
            className="rounded-2xl h-64 w-full object-cover border border-white/10 mt-8"
            alt="gym"
          />
          <div className="col-span-2 relative rounded-2xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop"
              className="h-52 w-full object-cover"
              alt="gym interior"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div className="p-5 bg-black/70 backdrop-blur-md border border-white/10 rounded-xl w-full">
                <p className="brawn-inter text-white/80 italic text-sm leading-relaxed">
                  "BRAWN GYM is where ordinary people achieve extraordinary results."
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-5 block">
          Our Story
        </span>
        <h2 className="brawn-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          FORGED IN
          <br />
          <span className="text-[#FF5A1F]">STRENGTH.</span>
        </h2>
        <p className="brawn-inter text-white/60 text-lg leading-relaxed mb-10">
          BRAWN GYM isn't just a fitness center — it's a transformation hub. Built for those who
          want more than average. Every rep, every set, every drop of sweat here is part of a bigger
          story: yours.
        </p>
        <div className="space-y-4 mb-10">
          {[
            {
              icon: <Zap size={20} />,
              title: 'Modern Equipment',
              desc: 'World-class machinery for every muscle group and training style.',
            },
            {
              icon: <Award size={20} />,
              title: 'Expert Trainers',
              desc: 'Certified coaches dedicated to your peak performance and safety.',
            },
            {
              icon: <Target size={20} />,
              title: 'Results-Driven',
              desc: 'Science-backed programs designed for real, lasting transformations.',
            },
            {
              icon: <Users size={20} />,
              title: 'Powerful Community',
              desc: 'A tribe of motivated individuals who push each other to excellence.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#FF5A1F]/40 transition-all group"
            >
              <div className="w-11 h-11 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] shrink-0 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all">
                {item.icon}
              </div>
              <div>
                <h4 className="brawn-montserrat text-white font-bold text-sm">{item.title}</h4>
                <p className="brawn-inter text-white/40 text-xs mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        <a
          href="tel:07272076000"
          className="inline-flex items-center gap-3 px-8 py-5 bg-[#FF5A1F] text-white brawn-montserrat font-black tracking-widest uppercase text-sm hover:bg-[#FF3B30] transition-colors"
          style={{ boxShadow: '0 0 30px rgba(255,90,31,0.3)' }}
        >
          CALL NOW: 07272-076000 <Phone size={16} />
        </a>
      </motion.div>
    </div>
  </section>
);

// ─── Services ────────────────────────────────────────────────────────────────
const Services = () => {
  const services: {
    Icon: React.FC<{ size?: number }>;
    title: string;
    desc: string;
    tag: string;
  }[] = [
    {
      Icon: Dumbbell,
      title: 'Strength Training',
      desc: 'Build raw power and muscle density with progressive overload programs.',
      tag: 'POPULAR',
    },
    {
      Icon: Zap,
      title: 'Bodybuilding',
      desc: 'Sculpt your physique with expert-designed splits and periodization.',
      tag: '',
    },
    {
      Icon: TrendingUp,
      title: 'Fat Loss Programs',
      desc: 'Scientific approach to burning fat while preserving hard-earned muscle.',
      tag: 'HOT',
    },
    {
      Icon: Users,
      title: 'Personal Training',
      desc: 'One-on-one coaching tailored to your goals, schedule and fitness level.',
      tag: '',
    },
    {
      Icon: Target,
      title: 'Functional Training',
      desc: 'Improve athletic performance, mobility, and real-world strength.',
      tag: '',
    },
    {
      Icon: Heart,
      title: 'Body Transformation',
      desc: 'Complete lifestyle coaching for total physical and mental transformation.',
      tag: 'TOP PICK',
    },
    {
      Icon: Dumbbell,
      title: 'Cardio Fitness',
      desc: 'Endurance and cardiovascular programs for stamina and heart health.',
      tag: '',
    },
    {
      Icon: Award,
      title: 'Muscle Building',
      desc: 'Hypertrophy-focused programs for maximum muscle size and strength.',
      tag: '',
    },
  ];
  return (
    <section id="services" className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-5 block">
              What We Offer
            </span>
            <h2 className="brawn-oswald text-5xl md:text-8xl font-bold text-white mb-6">
              SIGNATURE <span className="text-[#FF5A1F]">PROGRAMS</span>
            </h2>
            <p className="brawn-inter text-white/40 text-lg max-w-2xl mx-auto">
              Every program is crafted to deliver real results. Pick your weapon.
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Tilt3D
                depth={10}
                className="relative h-full p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#FF5A1F]/60 transition-all duration-500 group cursor-pointer"
              >
                <div className="bg-[#111111] rounded-2xl p-7 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#FF5A1F]/0 group-hover:bg-[#FF5A1F]/15 blur-2xl rounded-full transition-all duration-700" />
                  {s.tag && (
                    <span className="absolute top-4 right-4 brawn-montserrat text-[9px] font-black tracking-widest bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full">
                      {s.tag}
                    </span>
                  )}
                  <div className="w-14 h-14 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] mb-6 group-hover:bg-[#FF5A1F] group-hover:text-white transition-all duration-500">
                    <s.Icon size={26} />
                  </div>
                  <h3 className="brawn-oswald text-xl font-bold text-white mb-3 group-hover:text-[#FF5A1F] transition-colors">
                    {s.title}
                  </h3>
                  <p className="brawn-inter text-white/40 text-sm leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between">
                    <span className="brawn-montserrat text-[11px] font-bold tracking-widest text-[#FF5A1F] uppercase">
                      Explore
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-[#FF5A1F] group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Why Choose ──────────────────────────────────────────────────────────────
const WhyChoose = () => {
  const features = [
    { title: 'Modern Equipment', desc: 'World-class machinery from top fitness brands.' },
    { title: 'Expert Trainers', desc: 'Certified coaches with proven track records.' },
    { title: 'Motivating Environment', desc: 'A space designed to push you to your best.' },
    { title: 'Hygiene Standards', desc: 'Clean, safe, and sanitized at all times.' },
    { title: 'Strength-Focused', desc: 'Programs built around real performance goals.' },
    { title: 'Proven Results', desc: '500+ successful transformations and counting.' },
  ];
  return (
    <section className="py-28 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-5 block">
            Why Choose Us
          </span>
          <h2 className="brawn-oswald text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            BUILT FOR THOSE
            <br />
            WHO WANT <span className="text-[#FF5A1F]">MORE.</span>
          </h2>
          <p className="brawn-inter text-white/50 text-lg mb-12 leading-relaxed">
            We don't just provide a space to lift. We provide the environment, the expertise, and
            the community needed for real transformation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <Tilt3D
                key={i}
                depth={6}
                className="flex gap-3 p-4 rounded-xl bg-white/3 border border-white/5 hover:border-[#FF5A1F]/30 transition-all cursor-default"
              >
                <CheckCircle2 className="text-[#FF5A1F] shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="brawn-montserrat text-white font-bold text-sm">{f.title}</h4>
                  <p className="brawn-inter text-white/35 text-xs mt-0.5">{f.desc}</p>
                </div>
              </Tilt3D>
            ))}
          </div>
          <a
            href="#services"
            className="mt-10 inline-flex items-center gap-3 px-8 py-5 border border-[#FF5A1F]/40 text-[#FF5A1F] brawn-montserrat font-black text-sm tracking-widest uppercase hover:bg-[#FF5A1F] hover:text-white transition-all duration-300"
          >
            VIEW ALL PROGRAMS <ArrowRight size={16} />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-8 bg-[#FF5A1F]/8 blur-3xl rounded-full" />
          <div className="relative grid grid-cols-2 gap-4">
            {[
              'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
            ].map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl border border-white/10 group ${i % 2 === 1 ? 'mt-6' : ''}`}
              >
                <img
                  src={src}
                  alt="gym"
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── Testimonials ────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    {
      name: 'Karan Mehra',
      role: 'Member since 2024',
      text: 'Best gym in Rohtak without question. The energy is unmatched, the trainers actually care about your progress.',
      stars: 5,
    },
    {
      name: 'Simran Kaur',
      role: 'Member since 2025',
      text: 'Lost 12kg in 4 months with expert guidance. The personal training program completely changed my life!',
      stars: 5,
    },
    {
      name: 'Rohan Sharma',
      role: 'Member since 2023',
      text: 'Equipment quality is top-notch. Always clean, always maintained. Premium gym experience in Rohtak.',
      stars: 5,
    },
    {
      name: 'Ankit Yadav',
      role: 'Member since 2024',
      text: 'BRAWN GYM gave me the discipline I needed. 6 months and already competing. Incredible community!',
      stars: 5,
    },
    {
      name: 'Priya Agarwal',
      role: 'Member since 2025',
      text: 'Felt completely safe and supported here. The trainers are professional and the results speak for themselves.',
      stars: 5,
    },
    {
      name: 'Deepak Singh',
      role: 'Member since 2023',
      text: 'Trained at many gyms in Haryana. BRAWN stands above everything — the culture, equipment, and results.',
      stars: 4,
    },
  ];
  return (
    <section className="py-28 px-6 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-5 block">
            Testimonials
          </span>
          <h2 className="brawn-oswald text-5xl md:text-8xl font-bold text-white mb-4">
            TRUSTED BY <span className="text-[#FF5A1F]">165+</span> MEMBERS
          </h2>
          <div className="flex justify-center gap-1.5 mt-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} fill="#FF5A1F" color="#FF5A1F" />
            ))}
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Tilt3D
                depth={8}
                className="h-full p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-[#FF5A1F]/40 transition-all duration-500 cursor-default"
              >
                <div className="bg-[#111111] rounded-2xl p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-white/3">
                    <Star size={70} fill="currentColor" />
                  </div>
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star key={j} size={14} fill="#FF5A1F" color="#FF5A1F" />
                    ))}
                  </div>
                  <p className="brawn-inter text-white/65 text-sm leading-relaxed flex-1 mb-8 italic">
                    "{r.text}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FF5A1F] to-[#FF3B30] flex items-center justify-center brawn-oswald text-white font-bold text-lg">
                      {r.name[0]}
                    </div>
                    <div>
                      <h4 className="brawn-montserrat text-white font-bold text-sm">{r.name}</h4>
                      <p className="brawn-inter text-white/30 text-xs">{r.role}</p>
                    </div>
                  </div>
                </div>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Instagram ───────────────────────────────────────────────────────────────
const InstagramSection = () => {
  const posts = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop',
  ];
  return (
    <section className="py-28 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-3 block">
              Get Social
            </span>
            <h2 className="brawn-oswald text-4xl md:text-6xl font-bold text-white">
              #BRAWNGYM<span className="text-[#FF5A1F]">ROHTAK</span>
            </h2>
          </motion.div>
          <motion.a
            href="https://instagram.com/brawngymrohtak"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white brawn-montserrat font-bold text-sm tracking-widest uppercase hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all duration-300"
          >
            <IGIcon size={18} /> @brawngymrohtak
          </motion.a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {posts.map((p, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/brawngymrohtak"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
              className="aspect-square relative group overflow-hidden rounded-xl border border-white/5"
            >
              <img
                src={p}
                alt="Instagram"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#FF5A1F]/0 group-hover:bg-[#FF5A1F]/30 transition-all duration-300 flex items-center justify-center">
                <IGIcon size={28} color="white" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Final CTA ───────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section className="relative py-40 px-6 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-black/60 to-[#0B0B0B] z-10" />
      <div className="absolute inset-0 bg-[#FF5A1F]/20 z-10" />
      <img
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
        className="w-full h-full object-cover"
        alt="CTA"
      />
    </div>
    <div className="absolute inset-0 z-10 pointer-events-none">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF5A1F]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF3B30]/20 blur-[120px] rounded-full" />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative z-20 max-w-5xl mx-auto text-center"
    >
      <span className="brawn-montserrat text-xs font-bold tracking-[0.3em] text-[#FF5A1F] uppercase mb-6 block">
        Start Today
      </span>
      <h2 className="brawn-oswald text-5xl md:text-9xl font-bold text-white leading-tight mb-6">
        YOUR
        <br />
        <span className="text-[#FF5A1F]">TRANSFORMATION</span>
        <br />
        STARTS TODAY.
      </h2>
      <p className="brawn-inter text-xl text-white/60 mb-14 max-w-2xl mx-auto">
        Join Rohtak's highest-rated fitness community. Take the first step toward the best version
        of yourself.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <a
          href="tel:07272076000"
          className="flex items-center gap-3 px-12 py-6 bg-[#FF5A1F] text-white brawn-montserrat font-black text-lg tracking-widest uppercase hover:bg-[#FF3B30] transition-colors"
          style={{ boxShadow: '0 0 60px rgba(255,90,31,0.5)' }}
        >
          <Phone size={20} /> CALL NOW
        </a>
        <a
          href="#location"
          className="flex items-center gap-3 px-12 py-6 border-2 border-white/30 text-white brawn-montserrat font-black text-lg tracking-widest uppercase hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-all"
        >
          <MapPin size={20} /> VISIT GYM
        </a>
        <a
          href="https://instagram.com/brawngymrohtak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-12 py-6 bg-white/5 border border-white/10 text-white brawn-montserrat font-black text-lg tracking-widest uppercase hover:bg-white/10 transition-all backdrop-blur-sm"
        >
          <IGIcon size={20} /> INSTAGRAM
        </a>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3 mb-6">
          <div
            className="relative w-10 h-10 flex items-center justify-center rounded-lg overflow-hidden shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF5A1F 0%, #FF3B30 100%)',
              boxShadow: '0 0 20px rgba(255,90,31,0.4)',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="10" width="3" height="4" rx="1" fill="white" />
              <rect x="3" y="8" width="2.5" height="8" rx="1" fill="white" />
              <rect x="5.5" y="11" width="13" height="2" rx="1" fill="white" />
              <rect x="18.5" y="8" width="2.5" height="8" rx="1" fill="white" />
              <rect x="20" y="10" width="3" height="4" rx="1" fill="white" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="brawn-oswald text-2xl font-bold tracking-[0.18em] text-white leading-none">
              BRAWN<span className="text-[#FF5A1F]">GYM</span>
            </span>
            <span
              className="brawn-montserrat text-[8px] tracking-[0.35em] uppercase mt-0.5"
              style={{ color: 'rgba(255,90,31,0.7)' }}
            >
              ROHTAK
            </span>
          </div>
        </div>
        <p className="brawn-inter text-white/40 text-sm leading-relaxed max-w-sm mb-8">
          Premium fitness destination in Rohtak. World-class equipment, expert trainers, and the
          community needed to build strength and lasting transformation.
        </p>
        <div className="flex gap-3">
          {[
            {
              icon: <IGIcon size={18} />,
              href: 'https://instagram.com/brawngymrohtak',
              label: 'Instagram',
            },
            { icon: <Phone size={18} />, href: 'tel:07272076000', label: 'Phone' },
            {
              icon: <MapPin size={18} />,
              href: 'https://maps.google.com/?q=BRAWN+GYM+Rohtak',
              label: 'Map',
            },
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#FF5A1F] hover:border-[#FF5A1F] transition-all duration-300"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <h4 className="brawn-montserrat text-sm font-bold tracking-[0.2em] uppercase text-white mb-8">
          Quick Links
        </h4>
        <ul className="space-y-4">
          {[
            ['Home', '#'],
            ['About Us', '#about'],
            ['Programs', '#services'],
            ['Transformations', '#transformations'],
            ['Location', '#location'],
          ].map(([label, href]) => (
            <li key={label}>
              <Link
                href={href}
                className="brawn-inter text-white/40 hover:text-[#FF5A1F] transition-colors text-sm flex items-center gap-2 group"
              >
                <span className="w-0 group-hover:w-4 h-px bg-[#FF5A1F] transition-all duration-300 inline-block" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-4">
        <h4 className="brawn-montserrat text-sm font-bold tracking-[0.2em] uppercase text-white mb-8">
          Contact Us
        </h4>
        <div className="space-y-5">
          <a href="tel:07272076000" className="flex items-start gap-4 group">
            <div className="w-9 h-9 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] shrink-0">
              <Phone size={16} />
            </div>
            <div>
              <p className="brawn-montserrat text-xs text-white/30 uppercase tracking-wider mb-1">
                Phone
              </p>
              <p className="brawn-inter text-white/70 text-sm group-hover:text-[#FF5A1F] transition-colors">
                07272-076000
              </p>
            </div>
          </a>
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] shrink-0">
              <MapPin size={16} />
            </div>
            <div>
              <p className="brawn-montserrat text-xs text-white/30 uppercase tracking-wider mb-1">
                Address
              </p>
              <p className="brawn-inter text-white/60 text-sm leading-relaxed">
                3rd Floor, Sonipat Rd,
                <br />
                Above Red Tape Showroom,
                <br />
                Jhang Colony, Rohtak,
                <br />
                Haryana 124001
              </p>
            </div>
          </div>
          <a
            href="https://instagram.com/brawngymrohtak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 flex items-center justify-center text-[#FF5A1F] shrink-0">
              <IGIcon size={16} />
            </div>
            <div>
              <p className="brawn-montserrat text-xs text-white/30 uppercase tracking-wider mb-1">
                Instagram
              </p>
              <p className="brawn-inter text-white/60 text-sm group-hover:text-[#FF5A1F] transition-colors">
                @brawngymrohtak
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="brawn-montserrat text-white/20 text-xs tracking-widest uppercase">
        © 2026 BRAWN GYM ROHTAK. ALL RIGHTS RESERVED.
      </p>
      <div className="flex gap-6">
        <Link
          href="#"
          className="brawn-montserrat text-white/20 text-xs tracking-wider hover:text-white/50 transition-colors uppercase"
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          className="brawn-montserrat text-white/20 text-xs tracking-wider hover:text-white/50 transition-colors uppercase"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  </footer>
);

// ─── Floating Buttons ─────────────────────────────────────────────────────────
const FloatingButtons = () => (
  <>
    <a
      href="https://wa.me/917272076000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-10 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
      style={{ boxShadow: '0 0 30px rgba(37,211,102,0.4)' }}
    >
      <div className="absolute right-full mr-3 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl">
        Chat on WhatsApp
      </div>
      <WAIcon size={28} />
    </a>
    <div className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden bg-[#0B0B0B] border-t border-white/10">
      <a
        href="tel:07272076000"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white brawn-montserrat font-bold text-sm border-r border-white/10 hover:bg-[#FF5A1F]/10 transition-colors"
      >
        <Phone size={18} /> CALL
      </a>
      <a
        href="https://wa.me/917272076000"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white brawn-montserrat font-bold text-sm border-r border-white/10 hover:bg-green-500/10 transition-colors"
      >
        <MessageCircle size={18} /> WHATSAPP
      </a>
      <a
        href="#services"
        className="flex-1 bg-[#FF5A1F] flex items-center justify-center gap-2 py-4 text-white brawn-montserrat font-black text-sm hover:bg-[#FF3B30] transition-colors"
      >
        <Zap size={18} /> JOIN NOW
      </a>
    </div>
  </>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function BrawnGym() {
  return (
    <main className="bg-[#0B0B0B] min-h-screen overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');
        html {
          scroll-behavior: smooth;
        }
        .brawn-oswald {
          font-family: 'Oswald', sans-serif;
        }
        .brawn-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .brawn-inter {
          font-family: 'Inter', sans-serif;
        }
        ::selection {
          background: rgba(255, 90, 31, 0.4);
          color: white;
        }
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: #0b0b0b;
        }
        ::-webkit-scrollbar-thumb {
          background: #ff5a1f;
          border-radius: 2px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <Navbar />
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <Transformations />
      <EquipmentGallery />
      <WhyChoose />
      <Testimonials />
      <InstagramSection />
      <Location />
      <FinalCTA />
      <Footer />
      <FloatingButtons />
    </main>
  );
}
