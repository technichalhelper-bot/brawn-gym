'use client';

import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Instagram SVG icon (not available in this lucide-react version)
const InstagramIcon = ({
  size = 24,
  color = 'currentColor',
}: {
  size?: number;
  color?: string;
}) => (
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

// 3D Tilt Card — mouse-tracking perspective transform
const Tilt3DCard = ({
  children,
  className,
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -intensity;
    const rotY = ((x - cx) / cx) * intensity;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.3s ease', transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </div>
  );
};

// --- Transformation Section ---

export const Transformations = () => {
  const transformations = [
    {
      name: 'Amit Singh',
      before:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
      result: '-15kg Fat Loss',
    },
    {
      name: 'Priya Verma',
      before:
        'https://images.unsplash.com/photo-1548690312-e3b507d17a47?q=80&w=2069&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop',
      result: '+8kg Lean Muscle',
    },
    {
      name: 'Rahul Dev',
      before:
        'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop',
      after:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
      result: 'Competition Ready',
    },
  ];

  return (
    <section id="transformations" className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            REAL RESULTS. REAL PEOPLE.
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Witness the incredible transformations of our members. Your journey starts with a single
            rep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={item.after}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h4 className="text-white font-black text-2xl mb-1">{item.name}</h4>
                  <p className="text-[#FF5A1F] font-bold text-sm tracking-widest uppercase">
                    {item.result}
                  </p>
                </div>

                {/* Hover overlay for Before/After comparison hint */}
                <div className="absolute top-6 right-6">
                  <div className="bg-[#FF5A1F] text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest">
                    SUCCESS
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button
            variant="outline"
            className="border-[#FF5A1F]/50 text-[#FF5A1F] hover:bg-[#FF5A1F] hover:text-white px-8 py-6 font-bold"
          >
            VIEW ALL TRANSFORMATIONS
          </Button>
        </div>
      </div>
    </section>
  );
};

// --- Equipment Gallery ---

export const EquipmentGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const equipment = [
    {
      title: 'Hammer Strength',
      category: 'Free Weights',
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Cardio Deck',
      category: 'Endurance',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Functional Zone',
      category: 'Crossfit',
      img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop',
    },
    {
      title: 'Legacy Racks',
      category: 'Powerlifting',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      title: 'Recovery Area',
      category: 'Wellness',
      img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 bg-[#1A1A1A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
            Our Arsenal
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white">WORLD-CLASS EQUIPMENT</h2>
        </div>
        <div className="hidden md:flex gap-2">
          <div className="w-12 h-[2px] bg-[#FF5A1F]" />
          <div className="w-4 h-[2px] bg-white/20" />
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-12 px-6 no-scrollbar"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {equipment.map((item, i) => (
          <motion.div
            key={i}
            className="min-w-[300px] md:min-w-[450px] aspect-[16/10] relative group rounded-2xl overflow-hidden border border-white/10"
            style={{ scrollSnapAlign: 'start' }}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[#FF5A1F] text-xs font-black tracking-widest uppercase mb-2 block">
                {item.category}
              </span>
              <h3 className="text-2xl font-black text-white">{item.title}</h3>
              <p className="text-white/40 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Professional grade machinery for maximum results.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- Why Choose Section ---

export const WhyChoose = () => {
  const features = [
    { title: 'Certified Trainers', desc: 'Expert coaches with international certifications.' },
    { title: '24/7 Access', desc: 'Train on your own schedule with our extended hours.' },
    { title: 'Modern Equipment', desc: 'The latest machinery from top fitness brands.' },
    { title: 'Hygiene Standards', desc: 'Clean, sanitized environment for your safety.' },
    { title: 'Supportive Community', desc: 'A tribe that motivates you to push harder.' },
    { title: 'Affordable Plans', desc: 'Premium fitness accessible to everyone in Rohtak.' },
  ];

  return (
    <section className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
            BUILT FOR THOSE WHO WANT MORE.
          </h2>
          <p className="text-white/50 text-lg mb-10 leading-relaxed">
            We don't just provide a space to lift; we provide the environment, the tools, and the
            mindset required for peak physical performance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <Tilt3DCard
                key={i}
                intensity={6}
                className="flex gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-[#FF5A1F]/30 transition-colors"
              >
                <CheckCircle2 className="text-[#FF5A1F] shrink-0 mt-0.5" size={22} />
                <div>
                  <h4 className="text-white font-bold text-base">{feature.title}</h4>
                  <p className="text-white/40 text-xs mt-1">{feature.desc}</p>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-[#FF5A1F]/10 blur-[100px] rounded-full" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
                className="rounded-2xl border border-white/10"
                alt="Gym detail"
              />
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
                className="rounded-2xl border border-white/10"
                alt="Gym detail"
              />
            </div>
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
                className="rounded-2xl border border-white/10"
                alt="Gym detail"
              />
              <img
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop"
                className="rounded-2xl border border-white/10"
                alt="Gym detail"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---

export const Testimonials = () => {
  const reviews = [
    {
      name: 'Karan Mehra',
      role: 'Member since 2024',
      text: 'Best gym in Rohtak. The atmosphere is electric and the trainers actually care about your form.',
      rating: 5,
    },
    {
      name: 'Simran Kaur',
      role: 'Member since 2025',
      text: 'Clean, professional, and great equipment. The personal training program transformed my life.',
      rating: 5,
    },
    {
      name: 'Rohan Sharma',
      role: 'Member since 2023',
      text: 'I have tried many gyms, but BRAWN is different. The equipment quality is unmatched.',
      rating: 4,
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            TRUSTED BY 165+ MEMBERS
          </h2>
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#FF5A1F" color="#FF5A1F" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <Tilt3DCard
              key={i}
              intensity={8}
              className="bg-[#0B0B0B] border border-white/10 p-8 rounded-2xl relative overflow-hidden hover:border-[#FF5A1F]/50 transition-colors cursor-default"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Star size={80} />
              </div>
              <p className="text-white/70 italic mb-8 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF5A1F]/20 flex items-center justify-center font-black text-[#FF5A1F]">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <p className="text-white/30 text-xs">{review.role}</p>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Instagram Feed Section ---

export const InstagramFeed = () => {
  const posts = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1974&auto=format&fit=crop',
  ];

  return (
    <section className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
              Get Social
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white">#BRAWNGYMROHTAK</h2>
          </div>
          <a href="https://instagram.com/brawngymrohtak" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-black hover:bg-[#FF5A1F] hover:text-white px-8 py-6 font-bold flex items-center gap-2">
              <InstagramIcon size={20} /> FOLLOW US
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="aspect-square relative group overflow-hidden rounded-2xl border border-white/10 cursor-pointer"
            >
              <img
                src={post}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#FF5A1F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <InstagramIcon size={40} color="white" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Location Section ---

export const Location = () => {
  return (
    <section id="location" className="py-24 px-6 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#FF5A1F] font-bold tracking-widest text-sm mb-4 block uppercase">
              Our Location
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 italic uppercase tracking-tighter">
              FIND YOUR <br /> STRENGTH.
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#FF5A1F] border border-white/10">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Address</h4>
                  <p className="text-white/50">
                    3rd Floor, Sonipat Rd, above Red Tape Showroom, Jhang Colony, Rohtak, Haryana
                    124001
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#FF5A1F] border border-white/10">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Contact</h4>
                  <p className="text-white/50">07272-076000</p>
                  <p className="text-white/50">@brawngymrohtak</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://maps.google.com/?q=3rd+Floor+Sonipat+Rd+Rohtak+Haryana+124001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#FF5A1F] hover:bg-[#FF3B30] text-white font-black tracking-widest text-sm transition-colors"
                  style={{ boxShadow: '0 0 20px rgba(255,90,31,0.3)' }}
                >
                  GET DIRECTIONS
                </a>
                <a
                  href="tel:07272076000"
                  className="px-8 py-4 border border-white/20 text-white hover:border-[#FF5A1F] hover:text-[#FF5A1F] font-black tracking-widest text-sm transition-all"
                >
                  CALL NOW
                </a>
              </div>
            </div>
          </div>

          <div className="h-[400px] md:h-[600px] bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/10 relative group">
            {/* Mock Map with dynamic elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover grayscale opacity-50 transition-transform duration-[20s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#FF5A1F] blur-2xl rounded-full animate-pulse" />
                <div className="relative w-12 h-12 bg-[#FF5A1F] rounded-full flex items-center justify-center shadow-2xl border-4 border-black">
                  <MapPin color="white" fill="white" size={24} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl">
              <p className="text-white font-bold text-sm">BRAWN GYM ROHTAK</p>
              <p className="text-white/50 text-xs mt-1">Visit us today for a free trial.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
