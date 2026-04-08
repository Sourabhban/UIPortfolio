// Developed By Sourabh Ban
'use client';

import { motion, useScroll, useSpring, useTransform, useInView } from 'motion/react';
import { ArrowRight, Star, Sparkles, Disc, Zap, Target, Trophy, TrendingUp, Cpu, Globe, Mail, Phone, ExternalLink, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const UptimeCounter = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const format = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return <>{format(time)}</>;
};

const Marquee = ({ text, color = "bg-neo-green", textColor = "text-black", speed = 20 }: { text: string, color?: string, textColor?: string, speed?: number }) => (
  <div className={`overflow-hidden whitespace-nowrap border-y-[3px] border-black ${color} py-4`}>
    <div className="flex animate-marquee" style={{ animationDuration: `${speed}s` }}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className={`mx-4 font-display text-2xl font-black uppercase italic ${textColor}`}>
          {text} •
        </span>
      ))}
    </div>
  </div>
);

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target && target instanceof Element) {
        setIsHovering(
          window.getComputedStyle(target).cursor === 'pointer' || 
          ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(target.tagName)
        );
      }
    };
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-10 w-10 border-[3px] border-black bg-white mix-blend-difference md:block"
      animate={{
        x: position.x - 20,
        y: position.y - 20,
        rotate: isHovering ? 90 : (isClicking ? -45 : 0),
        scale: isHovering ? 1.5 : (isClicking ? 0.8 : 1),
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="h-2 w-2 bg-black" />
      </div>
    </motion.div>
  );
};

const Sticker = ({ children, color, className, rotate = 0 }: { children: React.ReactNode, color: string, className?: string, rotate?: number }) => (
  <motion.div
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    dragElastic={0.2}
    whileHover={{ scale: 1.1, rotate: rotate + 5, zIndex: 100 }}
    whileDrag={{ scale: 1.2, rotate: rotate - 10, cursor: 'grabbing' }}
    initial={{ rotate }}
    animate={{ rotate: [rotate, rotate + 360] }}
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    className={`absolute z-10 px-4 py-2 brutal-border font-display font-black uppercase text-sm ${color} ${className} cursor-grab active:cursor-grabbing select-none`}
  >
    {children}
  </motion.div>
);

const RevealText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "circOut" }}
          className="mr-2"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: "circOut" }}
    >
      {children}
    </motion.div>
  );
};


export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [colorCycle, setColorCycle] = useState(0);
  const colors = ['bg-neo-blue', 'bg-neo-pink', 'bg-neo-green', 'bg-white'];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorCycle((prev) => (prev + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [colors.length]);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.2], [0, -2]);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F1F1F1] selection:bg-black selection:text-neo-green relative overflow-hidden">
      <div className="noise-overlay" />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className="brutal-badge">UI/UX DEVELOPER • DESIGN ENGINEER • 2026</div>
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-[500] border-b-[4px] border-black bg-white">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between px-4 sm-phone:px-6 tablet-p:px-12 py-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-display text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
          >
            <div className="h-4 w-4 bg-neo-pink brutal-border" />
            SOURABH BAN
          </motion.div>
          
          <div className="hidden space-x-8 font-display font-black uppercase md:flex text-sm">
            {['About', 'Work', 'Stack', 'Manifesto'].map((item) => (
              <Magnetic key={item}>
                <a href={`#${item.toLowerCase()}`} className="group relative py-2 px-4 border-[3px] border-transparent hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-display font-black text-sm uppercase">
                   {item}
                </a>
              </Magnetic>
            ))}
            <Magnetic>
              <a href="#contact" className="brutal-btn py-1 px-4 text-xs bg-white">Hire Me_</a>
            </Magnetic>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col justify-center border-b-[4px] border-black bg-white bg-grid overflow-hidden py-10">
        <div className="max-w-[1920px] mx-auto w-full px-4 sm-phone:px-6 tablet-p:px-12 relative z-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
              <motion.div style={{ y: heroY, rotate: heroRotate }}>
                <div className="mb-3 flex flex-wrap gap-2 text-[10px]">
                  <motion.span 
                    animate={{ backgroundColor: colorCycle === 0 ? '#3B82F6' : (colorCycle === 1 ? '#FF4FB3' : (colorCycle === 2 ? '#29FF7E' : '#FFD93D')) }}
                    className={`${colors[colorCycle]} text-white px-3 py-1 font-display font-black uppercase brutal-border transition-colors duration-500`}
                  >
                    Product Design
                  </motion.span>
                  <motion.span 
                    animate={{ backgroundColor: colors[(colorCycle + 1) % colors.length].includes('blue') ? '#3B82F6' : (colors[(colorCycle + 1) % colors.length].includes('pink') ? '#FF4FB3' : (colors[(colorCycle + 1) % colors.length].includes('green') ? '#29FF7E' : '#FFD93D')) }}
                    className={`${colors[(colorCycle + 1) % colors.length]} text-white px-3 py-1 font-display font-black uppercase brutal-border transition-colors duration-500`}
                  >
                    Frontend Magic
                  </motion.span>
                  <motion.span 
                    animate={{ backgroundColor: colors[(colorCycle + 2) % colors.length].includes('blue') ? '#3B82F6' : (colors[(colorCycle + 2) % colors.length].includes('pink') ? '#FF4FB3' : (colors[(colorCycle + 2) % colors.length].includes('green') ? '#29FF7E' : '#FFD93D')) }}
                    className={`${colors[(colorCycle + 2) % colors.length]} text-black px-3 py-1 font-display font-black uppercase brutal-border transition-colors duration-500`}
                  >
                    Design Systems
                  </motion.span>
                </div>
                
                <h1 className="font-display text-4xl font-black leading-[0.8] uppercase md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] glitch-hover cursor-default">
                  SOURABH<br />
                  <span className="text-outline">BAN</span><br />
                  <span className="bg-black text-white px-6 inline-block transform -skew-x-6">BUILDS.</span>
                </h1>
              </motion.div>
              
              <div className="max-w-md space-y-4">
                <div className="font-display text-xl lg:text-2xl font-black leading-none uppercase">
                  <RevealText text="IMPECCABLE DESIGN ENGINEERED WITH PIXEL-PERFECT PRECISION." />
                </div>
                
                <div className="flex flex-wrap gap-6 items-center">
                   <button className="brutal-btn bg-neo-green text-xl px-10 py-5 flex items-center gap-2 group">
                     VIEW PROJECTS
                     <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                   </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 relative flex items-center justify-center mt-12 lg:mt-0">
               <motion.div 
                 initial={{ x: 100, opacity: 0, rotate: -3 }}
                 animate={{ x: 0, opacity: 1 }}
                 className="brutal-border-large relative w-fit h-fit overflow-hidden bg-black z-10 p-[3px]"
               >
                  <Image 
                    src="/hero-img.webp" 
                    alt="Sourabh Ban" 
                    width={400}
                    height={500}
                    className="w-full h-auto object-contain max-w-[360px]"
                    referrerPolicy="no-referrer"
                    priority
                  />

                 <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-white p-6 brutal-border">
                     <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase text-neo-blue">
                       <div className="h-2 w-2 bg-neo-blue animate-pulse" /> Live Dossier_
                     </div>
                     <p className="font-display text-2xl font-black uppercase italic leading-none text-black">DESIGN ENGINEER</p>
                     <div className="mt-3 flex justify-between items-end">
                       <p className="font-sans text-[8px] font-black uppercase opacity-40 text-black">Serial: SB-2026-DEV</p>
                       <Disc className="h-5 w-5 animate-spin-slow text-neo-pink" />
                     </div>
                   </div>
                 </div>
               </motion.div>
               
               {/* Chaotic Accents */}
               <div className="absolute -top-8 -right-8 h-24 w-24 border-[3px] border-black bg-white rotate-12 flex items-center justify-center z-20 brutal-border animate-bounce">
                  <Zap className="text-black h-12 w-12 fill-black" />
               </div>
               <div className="absolute -bottom-8 -left-8 h-32 w-32 border-[3px] border-black bg-neo-pink -rotate-12 flex flex-col items-center justify-center font-display font-black text-white text-xl z-20 brutal-border">
                  <span>TOP</span>
                  <span className="text-3xl">1%</span>
               </div>
               <div className="absolute right-0 bottom-1/4 h-16 w-16 border-[3px] border-black bg-neo-green rounded-full translate-x-1/2 z-20 brutal-border hover:scale-125 transition-transform cursor-help">
                  <Star className="m-auto mt-3 text-black h-8 w-8 animate-spin-slow" />
               </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute -left-10 top-20 pointer-events-none opacity-[0.03] select-none font-display text-[10rem] font-black leading-none uppercase -rotate-90">
          DISRUPT
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="relative z-[100] -mt-10 overflow-visible">
        <div className="transform rotate-2 origin-center">
           <Marquee text="FRONTEND • ARCHITECTURE • UI • UX • DESIGN • SYSTEMS • MOTION • PHYSICS • REACT •" color="bg-black" textColor="text-neo-green" />
        </div>
        <div className="transform -rotate-1 origin-center -translate-y-16">
           <Marquee text="DESIGN ENGINEER • UI/UX DEVELOPER • DESIGN ENGINEER • UI/UX DEVELOPER •" color="bg-neo-pink" textColor="text-white" speed={15} />
        </div>
      </div>

      {/* About Section - The Zine Style */}
      <section id="about" className="relative bg-white border-b-[4px] border-black py-20 overflow-hidden">
        <div className="dot-pattern absolute inset-0 opacity-10" />
        <FadeIn>
          <div className="max-w-[1440px] mx-auto px-4 sm-phone:px-6 tablet-p:px-12 relative z-10">
            <div className="flex flex-col tablet-p:flex-row gap-16 items-start">
            <div className="tablet-p:w-1/3 sticky top-32">
              <span className="font-display font-black text-neo-blue text-sm uppercase italic">01 // The Identity.</span>
              <h2 className="font-display text-4xl font-black uppercase leading-none mt-4 md:text-5xl">PIXELS<br /><span className="bg-neo-green px-2 text-outline">WITH PURPOSE</span></h2>
              <p className="mt-6 font-display text-lg md:text-xl font-black uppercase leading-[1.1]">
                I BRIDGE THE GAP BETWEEN AESTHETICS AND ACCESSIBILITY THROUGH HUMAN-CENTRIC CODE.
              </p>
              <div className="mt-8 pt-8 border-t-[3px] border-black">
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex flex-wrap gap-12 items-center min-h-[180px] py-20"
                >
                  {[
                    // Unique 3D Isometric Prisms using SVG Logic
                    { id: 'square', color: '#FF2E97', type: 'cube' },
                    { id: 'circle', color: '#2E5BFF', type: 'cylinder' },
                    { id: 'star', color: '#FFF133', type: 'star' },
                    { id: 'triangle', color: '#29FF7E', type: 'prism' },
                    { id: 'hexagon', color: '#FF8A00', type: 'hexagon' },
                    { id: 'pentagon', color: '#FF3B30', type: 'pentagon' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, scale: 0, y: 100 },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          y: 0,
                          transition: { 
                            delay: i * 1,
                            type: "spring",
                            stiffness: 260,
                            damping: 15
                          }
                        }
                      }}
                      animate={{ 
                        y: [0, -40, 0],
                        scaleX: [1, 1.1, 1],
                        scaleY: [1, 0.9, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.2 // Staggered bounce wave
                      }}
                      whileHover={{ scale: 1.3, y: -60, rotateZ: 10 }}
                      className="relative h-20 w-20 flex items-center justify-center cursor-help shrink-0"
                    >
                      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[10px_10px_0px_black] filter transition-all">
                        {/* 3D Isometric Block Logic */}
                        {item.type === 'cube' && (
                          <>
                            <path d="M20 30 L50 15 L80 30 L80 70 L50 85 L20 70 Z" fill={item.color} stroke="black" strokeWidth="4" />
                            <path d="M20 30 L50 45 L80 30" fill="none" stroke="black" strokeWidth="4" />
                            <path d="M50 45 L50 85" fill="none" stroke="black" strokeWidth="4" />
                          </>
                        )}
                        {item.type === 'cylinder' && (
                          <>
                            <path d="M20 30 A30 15 0 1 0 80 30 L80 70 A30 15 0 1 1 20 70 Z" fill={item.color} stroke="black" strokeWidth="4" />
                            <ellipse cx="50" cy="30" rx="30" ry="15" fill={item.color} stroke="black" strokeWidth="4" />
                          </>
                        )}
                        {item.type === 'star' && (
                          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill={item.color} stroke="black" strokeWidth="4" />
                        )}
                        {item.type === 'prism' && (
                          <>
                            <path d="M50 15 L85 75 L15 75 Z" fill={item.color} stroke="black" strokeWidth="4" />
                            <path d="M50 15 L50 45" fill="none" stroke="black" strokeWidth="4" opacity="0.3" />
                          </>
                        )}
                        {item.type === 'hexagon' && (
                          <>
                            <path d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z" fill={item.color} stroke="black" strokeWidth="4" />
                            <path d="M20 30 L50 45 L80 30 L80 30 M50 45 L50 85" fill="none" stroke="black" strokeWidth="4" opacity="0.5" />
                          </>
                        )}
                        {item.type === 'pentagon' && (
                          <path d="M50 15 L85 45 L70 85 L30 85 L15 45 Z" fill={item.color} stroke="black" strokeWidth="4" opacity="1" />
                        )}
                      </svg>
                      {/* Dynamic Compression Shadow */}
                      <div className="absolute -bottom-8 w-16 h-2 bg-black opacity-10 blur-sm rounded-full transform scale-x-125" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            
            <div className="tablet-p:w-2/3 grid grid-cols-1 gap-8">
              <div className="brutal-card bg-neo-blue text-white p-12 rotate-1 hover:rotate-0 transition-all group neo-shadow-xl hover:shadow-none">
                <div className="flex justify-between items-start mb-6">
                   <Target className="h-12 w-12 group-hover:scale-125 transition-transform" />
                   <span className="font-display font-black text-6xl opacity-20">01</span>
                </div>
                <h3 className="font-display text-4xl font-black uppercase mb-4 italic">FLAWLESS UX.</h3>
                <p className="font-display text-xl leading-tight uppercase font-bold">
                  architecting user journeys that convert. reducing bounce rates by 40% through intuitive, physics-based interactions.
                </p>
              </div>
              
              <div className="brutal-card bg-black text-white p-12 -rotate-1 hover:rotate-0 transition-all group md:ml-20 neo-shadow-xl hover:shadow-none border-white">
                <div className="flex justify-between items-start mb-6">
                   <Trophy className="h-12 w-12 text-neo-green group-hover:scale-125 transition-transform" />
                   <span className="font-display font-black text-6xl opacity-20">02</span>
                </div>
                <h3 className="font-display text-4xl font-black uppercase mb-4 italic text-neo-green">DYNAMIC MOTION.</h3>
                <p className="font-display text-xl leading-tight uppercase font-bold">
                  Implementing physics-based animations and custom shaders. increasing engagement by 60% through meaningful micro-interactions.
                </p>
              </div>

              <div className="brutal-card bg-neo-pink text-white p-12 rotate-2 hover:rotate-0 transition-all group neo-shadow-xl hover:shadow-none">
                <div className="flex justify-between items-start mb-6">
                   <TrendingUp className="h-12 w-12 group-hover:scale-125 transition-transform" />
                   <span className="font-display font-black text-6xl opacity-20">03</span>
                </div>
                <h3 className="font-display text-4xl font-black uppercase mb-4 italic">CLEAN ARCHITECTURE.</h3>
                <p className="font-display text-xl leading-tight uppercase font-bold">
                  Building modular, scalable design systems. Reduced development cycle time by 50% for high-traffic enterprise applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>



      {/* Projects Section - Magazine Layout */}
      <section id="work" className="border-b-[4px] border-black bg-white py-20 relative z-20">
        <FadeIn>
          <div className="max-w-[1920px] mx-auto px-4 sm-phone:px-6 tablet-p:px-12 mb-10 relative z-30">
            <div className="flex flex-col tablet-p:flex-row tablet-p:items-end justify-between gap-8">
              <div>
                <span className="bg-black text-white px-3 py-1 font-display font-black uppercase text-xs mb-4 inline-block">RECENT INTELLIGENCE</span>
                <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.7] text-black">CASE_ STUDIES</h2>
              </div>
              <p className="max-w-xs font-display font-black text-lg uppercase leading-none border-l-[3px] border-black pl-4 text-black">
                Real world problems solved with unconventional logic.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg-phone:grid-cols-2 phablet:grid-cols-2 tablet-l:grid-cols-3 ultrawide:grid-cols-4 gap-0 border-t-[4px] border-black relative z-30 bg-white">
            {[
              {
                id: "01",
                title: "RIVA PERFUMES",
                client: "PERSONAL",
                outcome: "VIEW PROJECT",
                color: "bg-white",
                hoverColor: "hover:bg-neo-green",
                icon: <Globe className="h-12 w-12 text-black" />,
                link: "https://riva-olfactory.netlify.app/",
                image: "/riva_perfumes.png"
              },
              {
                id: "02",
                title: "CINEMATOGRAPHY PORTFOLIO",
                client: "SUSHANT FASE",
                outcome: "VIEW PROJECT",
                color: "bg-white",
                hoverColor: "hover:bg-neo-yellow",
                icon: <Zap className="h-12 w-12 text-black" />,
                link: "https://sushantfaseportfolio.netlify.app/",
                image: "/cinematography.png"
              },
              {
                id: "03",
                title: "MOBILE APP 2025",
                client: "ECOSYSTEM TECH",
                outcome: "VIEW PROJECT",
                color: "bg-white",
                hoverColor: "hover:bg-neo-blue",
                icon: <Cpu className="h-12 w-12 text-black" />,
                link: "#",
                image: "/macro-optics.png" // Placeholder or existing image
              }
            ].map((project, i) => (
              <motion.div 
                key={project.id}
                className={`group border-l-[4px] first:border-l-0 tablet-l:first:border-l-0 border-b-[4px] border-black p-6 sm-phone:p-8 md:p-12 transition-all ${project.color} ${project.hoverColor} cursor-pointer min-h-[500px] flex flex-col justify-between neo-card-hover relative z-40`}
              >
                <a href={project.link} target={project.link !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="flex flex-col justify-between h-full w-full">
                  <div>
                    <div className="flex justify-between items-start mb-8">
                       <span className="font-display font-black text-4xl text-black">{project.id}</span>
                       <div className="group-hover:rotate-12 transition-transform text-black">{project.icon}</div>
                    </div>
                    {project.image && (
                      <div className="mb-8 brutal-border overflow-hidden bg-black aspect-video relative group-hover:scale-[1.02] transition-transform">
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          width={480} 
                          height={270} 
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-2xl phablet:text-3xl lg:text-4xl xl:text-5xl font-black uppercase mb-4 leading-[0.9] text-black group-hover:italic transition-all tracking-tighter">{project.title}</h3>
                    <p className="font-display font-black uppercase text-xl text-black opacity-60">CLIENT: {project.client}</p>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="bg-black text-white py-4 px-8 brutal-border inline-block rotate-1 group-hover:rotate-0 transition-transform translate-y-[5px]">
                        <span className="font-display font-black uppercase text-xl sm-phone:text-2xl">{project.outcome}</span>
                     </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Expertise & Skills */}
      <section id="expertise" className="border-b-[4px] border-black bg-white grid grid-cols-1 tablet-p:grid-cols-2">
        <div className="p-4 sm-phone:p-8 tablet-p:p-12 border-b-[4px] tablet-p:border-b-0 tablet-p:border-r-[4px] border-black bg-white">
           <h2 className="font-display text-3xl md:text-5xl font-black uppercase leading-[0.7] mb-8">TECH_ STACK</h2>
           <div className="space-y-8">
              {[
                { name: "UI Architecture", val: 98, color: "bg-neo-blue" },
                { name: "Frontend Development", val: 95, color: "bg-neo-pink" },
                { name: "UX Research", val: 85, color: "bg-neo-green" },
                { name: "Motion Design", val: 92, color: "bg-black" },
              ].map((skill, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between font-display font-black uppercase text-xl">
                      <span>{skill.name}</span>
                      <span>{skill.val}%</span>
                   </div>
                   <div className="h-10 w-full brutal-border bg-white overflow-hidden p-1">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "circOut", delay: i * 0.1 }}
                        className={`h-full ${skill.color} border-[2px] border-black`}
                      />
                   </div>
                </div>
              ))}
           </div>
        </div>
        <div className="p-4 sm-phone:p-8 tablet-p:p-16 bg-black text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 h-full w-2/3 bg-neo-blue/20 -skew-x-12 translate-x-20" />
           <h2 className="font-display text-3xl md:text-5xl font-black uppercase leading-[0.7] mb-10 italic text-neo-green">TOOL_ BOX</h2>
           <div className="grid grid-cols-2 gap-x-8 gap-y-10 relative z-10">
              {['Figma', 'React/Next.js', 'Typescript', 'Git & GitHub', 'Antigravity', 'Gemini', 'Jira', 'Three.js', 'Tailwind CSS', 'Framer Motion', 'Adobe CC', 'GSAP'].map((tool, i) => (
                <div key={i} className="flex items-center gap-4 group">
                   <div className="h-4 w-4 bg-neo-green brutal-border border-white group-hover:scale-150 transition-transform" />
                   <span className="font-display font-black uppercase text-2xl group-hover:text-neo-green transition-colors">{tool}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* The Manifesto Section */}

      {/* The Manifesto Section */}
      <section id="manifesto" className="bg-neo-pink py-32 phablet:py-48 text-center border-b-[4px] border-black relative overflow-hidden">
         {/* Background Cinematic Marquee (Top - Left to Right) */}
         <div className="absolute inset-x-0 top-20 pointer-events-none opacity-[0.06] select-none scale-100">
            <motion.div 
              animate={{ x: [-2000, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap font-display text-[12rem] md:text-[20rem] font-black uppercase italic leading-none"
            >
               <span>FORM FOLLOWS FUNCTION • FORM FOLLOWS FUNCTION • </span>
            </motion.div>
         </div>

         {/* Background Cinematic Marquee (Bottom - Right to Left) */}
         <div className="absolute inset-x-0 bottom-20 pointer-events-none opacity-[0.06] select-none translate-y-10">
            <motion.div 
              animate={{ x: [0, -2000] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap font-display text-[12rem] md:text-[20rem] font-black uppercase italic leading-none"
            >
               <span>DESIGN IS THE ONLY TRUTH • DESIGN IS THE ONLY TRUTH • </span>
            </motion.div>
         </div>

         {/* Background Cinematic Marquee (Center - Depth Layer) */}
         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04] select-none">
            <motion.div 
              animate={{ x: [-2000, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap font-display text-[8rem] md:text-[12rem] font-black uppercase italic leading-none"
            >
               <span>PIXEL PERFECT PRECISION • PIXEL PERFECT PRECISION • </span>
            </motion.div>
         </div>

         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="container mx-auto px-6 relative z-10"
         >
            <motion.div
              initial={{ y: 50, rotate: 5, opacity: 0 }}
              whileInView={{ y: 0, rotate: -3, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <span className="bg-white text-black px-6 py-2 font-display font-black uppercase text-xl brutal-border mb-10 inline-block">The Masterclass</span>
            </motion.div>
            
            <h2 className="font-display text-4xl sm-phone:text-5xl md:text-7xl lg:text-[8rem] font-black uppercase text-white leading-[0.8] mb-10">
               DESIGN IS THE <br />
               <span className="bg-black px-8 py-2 inline-block transform skew-x-12 italic text-neo-green">ONLY</span> <br />
               TRUTH.
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-4xl mx-auto font-display text-2xl md:text-4xl font-black uppercase text-black leading-none italic"
            >
               &quot;DECORATION IS FOR AMATEURS. I PREFER <span className="bg-white px-2">LOGICAL</span> EXPERIENCE.&quot;
            </motion.p>
         </motion.div>
         
         {/* Stickers */}
         <Sticker color="bg-white" className="top-20 left-10 md:left-40" rotate={-15}>Unstoppable_</Sticker>
         <Sticker color="bg-neo-green" className="bottom-20 right-10 md:right-40" rotate={10}>Verified_Result</Sticker>
         <Sticker color="bg-neo-blue" className="top-1/2 left-10 text-white" rotate={5}>No_Limits</Sticker>
      </section>

      {/* Experience Timeline */}
      <section className="bg-white border-b-[4px] border-black py-20 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm-phone:px-6 tablet-p:px-12 relative z-10">
           <h2 className="font-display text-4xl md:text-6xl font-black uppercase leading-[0.7] mb-12">OPS_ LOG</h2>
           
           <div className="space-y-0">
             {[
               { date: "2024 - 2026", role: "SR. DESIGN ENGINEER", company: "CREATIVE PEAK", desc: "Leading the transition from static designs to dynamic, motion-rich web applications.", color: "bg-neo-green" },
               { date: "2021 - 2024", role: "UI/UX DESIGNER", company: "TECH STUDIO", desc: "Architected internal toolings and customer-facing dashboards for Fortune 500 clients.", color: "bg-neo-blue" },
               { date: "2019 - 2021", role: "FRONTEND DEVELOPER", company: "STARTUP LABS", desc: "Built responsive, accessible interfaces for high-growth SaaS platforms.", color: "bg-neo-pink" },
               { date: "2017 - 2019", role: "JR. DESIGNER", company: "PIXELS & CO", desc: "Assisted in branding and visual identity for emerging digital products.", color: "bg-white" },
             ].map((job, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 20 }}
                  className="group grid grid-cols-1 tablet-p:grid-cols-12 gap-8 border-t-[4px] border-black py-12 items-center hover:bg-[#F1F1F1] transition-colors relative"
                >
                   <div className="tablet-p:col-span-2">
                     <span className="font-display font-black text-2xl uppercase">{job.date}</span>
                   </div>
                   <div className="tablet-p:col-span-4">
                     <h3 className="font-display text-4xl font-black uppercase italic leading-none">{job.role}</h3>
                     <p className="font-display font-black text-xl text-neo-blue uppercase mt-2">{job.company}</p>
                   </div>
                   <div className="tablet-p:col-span-1 flex justify-center">
                     <div className={`h-12 w-12 brutal-border ${job.color} group-hover:rotate-45 transition-transform`} />
                   </div>
                   <div className="tablet-p:col-span-5">
                      <p className="font-display font-black text-xl uppercase leading-tight opacity-70 group-hover:opacity-100 transition-opacity">
                         {job.desc}
                      </p>
                   </div>
                </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* Wall of Trust (Testimonials) */}
      <section className="bg-neo-yellow border-b-[4px] border-black py-24 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none select-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] font-black uppercase text-black leading-none opacity-20">TRUST_</div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm-phone:px-6 tablet-p:px-12 relative z-10">
           <div className="flex flex-col tablet-p:flex-row justify-between items-start tablet-p:items-end mb-20 gap-8">
              <div className="max-w-2xl">

                 <h2 className="font-display text-5xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter italic">VOICE OF <br />TRUST</h2>
              </div>
              <div className="hidden tablet-p:block text-right">
                 <p className="font-display font-black text-xl uppercase max-w-xs ml-auto text-black">COLLECTED FEEDBACK FROM CLIENTS AND PARTNERS ACROSS THE GLOBE.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  quote: "SOURABH DOESN'T JUST BUILD WEBSITES; HE BUILDS HIGH-PERFORMANCE MACHINES THAT LOOK LIKE ART.", 
                  author: "ELIAS VANCE", 
                  role: "CTO @ CREATIVE PEAK",
                  color: "bg-white",
                  rotate: -2
                },
                { 
                  quote: "THE MOST DISRUPTIVE DESIGN ENGINEER I'VE WORKED WITH. PIXEL-PERFECTION IS HIS BASELINE.", 
                  author: "SARAH CHEN", 
                  role: "PRODUCT LEAD @ TECH STUDIO",
                  color: "bg-neo-green",
                  rotate: 1
                },
                { 
                  quote: "RAW, BOLD, AND TECHNICALLY SUPERIOR. HE PUSHED OUR DESIGN SYSTEM INTO THE FUTURE.", 
                  author: "MARCUS REED", 
                  role: "DESIGN DIRECTOR @ GLOBAL DEVS",
                  color: "bg-neo-blue",
                  rotate: -1,
                  textColor: "text-white"
                },
                { 
                  quote: "HIS ABILITY TO BRIDGE THE GAP BETWEEN COMPLEX UI AND SEAMLESS UX IS UNMATCHED.", 
                  author: "JESSICA BLAIR", 
                  role: "FOUNDER @ STARTUP LABS",
                  color: "bg-neo-pink",
                  rotate: 2
                }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 50,
                    transition: { type: "spring", stiffness: 300 } 
                  }}
                  style={{ rotate: `${t.rotate}deg` }}
                  className={`${t.color} ${t.textColor || 'text-black'} brutal-border p-8 h-full flex flex-col justify-between relative group cursor-default transition-shadow hover:shadow-[20px_20px_0px_black]`}
                >
                   {/* Giant Quote Icon */}
                   <span className="absolute top-4 right-4 font-display text-8xl font-black opacity-10 group-hover:opacity-30 transition-opacity">"</span>
                   
                   <p className="font-display text-xl font-black uppercase leading-tight mb-12 relative z-10">
                      &quot;{t.quote}&quot;
                   </p>
                   
                   <div>
                      <div className="h-[2px] w-12 bg-current mb-4" />
                      <h4 className="font-display text-2xl font-black uppercase italic">{t.author}</h4>
                      <p className="font-sans text-xs font-black uppercase opacity-60 tracking-widest">{t.role}</p>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="grid grid-cols-1 tablet-p:grid-cols-2 border-b-[4px] border-black">
          <div className="p-4 sm-phone:p-8 tablet-p:p-16 bg-black text-white flex flex-col justify-between border-b-[4px] tablet-p:border-b-0 tablet-p:border-r-[4px] border-black relative overflow-hidden group">
             <div className="absolute inset-0 bg-black/60 z-10" />
             <Image 
               src="/357152.jpg" 
               alt="Contact Background" 
               fill 
               className="object-cover absolute inset-0 z-0 brightness-[0.7] group-hover:scale-105 transition-all duration-700" 
               priority
             />
             <div className="relative z-20">
               <h2 className="font-display text-5xl md:text-7xl font-black uppercase leading-[0.7] mb-10 glitch-hover italic">READY_ <br />TO BUILD?</h2>
               <p className="font-display text-xl md:text-2xl font-black uppercase mb-12 text-white">ENGAGE FOR PRODUCT DESIGN, FRONTEND DEVELOPMENT, OR DESIGN SYSTEMS.</p>
             </div>
            
            <div className="space-y-8 relative z-20">
               <motion.a 
                 href="mailto:sourabhban33@gmail.com"
                 whileHover={{ x: 20 }}
                 className="flex items-center gap-6 group cursor-pointer"
               >
                  <div className="h-16 w-16 bg-white brutal-border flex items-center justify-center shrink-0">
                     <Mail className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <span className="block font-sans text-xs font-black uppercase text-white">Secure Email</span>
                    <span className="block font-display text-2xl md:text-3xl font-black uppercase text-white group-hover:text-neo-green transition-colors">SOURABHBAN33@GMAIL.COM</span>
                  </div>
               </motion.a>
               
               <motion.a 
                 href="tel:+917385421769"
                 whileHover={{ x: 20 }}
                 className="flex items-center gap-6 group cursor-pointer"
               >
                  <div className="h-16 w-16 bg-white brutal-border flex items-center justify-center shrink-0">
                     <Phone className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <span className="block font-sans text-xs font-black uppercase text-white">Direct Line</span>
                    <span className="block font-display text-2xl md:text-3xl font-black uppercase text-white group-hover:text-neo-pink transition-colors">+91 7385421769</span>
                  </div>
               </motion.a>
            </div>
         </div>
         
         <div className="p-8 md:p-16 bg-white relative">
            <div className="absolute top-0 left-0 bg-neo-yellow px-4 py-1 font-display font-black text-[10px] uppercase z-20 border-b-[3px] border-r-[3px] border-black">
               Incoming Transmission_
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
               <div className="space-y-4">
                  <label className="font-display text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block transform -skew-x-12">01_ IDENTITY</label>
                  <input type="text" className="w-full border-[4px] border-black p-5 font-display text-xl font-black uppercase outline-none focus:bg-neo-green focus:shadow-none transition-all neo-shadow-lg" placeholder="NAME / ORGANIZATION" />
               </div>
               
               <div className="space-y-4">
                  <label className="font-display text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block transform -skew-x-12">02_ MISSION</label>
                  <div className="relative">
                     <select className="w-full border-[4px] border-black p-5 font-display text-xl font-black uppercase outline-none focus:bg-neo-blue focus:text-white focus:shadow-none transition-all appearance-none cursor-pointer neo-shadow-lg">
                        <option>PRODUCT DESIGN</option>
                        <option>FRONTEND DEV</option>
                        <option>DESIGN SYSTEM</option>
                        <option>GENERAL INQUIRY</option>
                     </select>
                     <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Disc className="h-6 w-6 animate-spin-slow" />
                     </div>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <label className="font-display text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block transform -skew-x-12">03_ BRIEFING</label>
                  <textarea rows={4} className="w-full border-[4px] border-black p-5 font-display text-xl font-black uppercase outline-none focus:bg-neo-pink focus:text-white focus:shadow-none transition-all neo-shadow-lg" placeholder="DESCRIBE THE OBJECTIVE" />
               </div>
               
               <motion.button 
                 whileHover={{ scale: 1.02, x: 5, y: -5 }}
                 whileTap={{ scale: 0.98 }}
                 className="brutal-btn w-full bg-black text-neo-green text-2xl py-8 font-black uppercase italic shadow-[10px_10px_0px_0px_rgba(41,255,126,1)] hover:shadow-none transition-all flex items-center justify-center gap-4"
               >
                 SEND MESSAGE <Zap className="h-6 w-6 fill-neo-green" />
               </motion.button>
            </form>
         </div>
      </section>

      <footer className="relative border-t-[4px] border-black bg-black overflow-hidden group">
         <div className="absolute inset-0 z-0">
            <Image 
               src="/977234.png" 
               alt="Footer Background" 
               fill 
               className="object-cover object-top -translate-y-10 scale-110" 
            />
         </div>

         <div className="relative z-10 max-w-[1920px] mx-auto">
            <div className="px-4 sm-phone:px-12 tablet-p:px-16 pt-32 phablet:pt-48 pb-20">
               <div className="flex flex-col tablet-p:flex-row justify-between items-start tablet-p:items-end gap-16">
                  <div className="space-y-8 max-w-2xl">
                     <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="font-display text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.7] text-white"
                     >
                        NEXT_ <br />
                        <span className="text-outline-white">GEN.</span>
                     </motion.div>
                     <p className="font-display font-black text-2xl uppercase text-white max-w-md leading-none">
                        Architecting digital ecosystems that redefine the intersection of <span className="bg-neo-blue text-white px-2">code</span> and <span className="bg-neo-pink text-white px-2">craft</span>.
                     </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-12 w-full tablet-p:w-auto">
                     <div className="flex flex-wrap justify-end gap-4 phablet:gap-6">
                        {[
                           { name: 'LinkedIn', url: 'https://www.linkedin.com/in/sourabhban/', icon: <Linkedin className="h-10 w-10" />, color: 'hover:bg-neo-blue' },
                           { name: 'GitHub', url: 'https://github.com/Sourabhban', icon: <Github className="h-10 w-10" />, color: 'hover:bg-black' },
                           { 
                             name: 'WhatsApp', 
                             url: 'https://wa.me/917385421769', 
                             color: 'hover:bg-neo-green',
                             icon: (
                               <svg viewBox="0 0 24 24" className="h-10 w-10 fill-current">
                                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                               </svg>
                             ) 
                           }
                        ].map(social => (
                           <motion.a 
                              key={social.name}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ y: -5, rotate: 5, scale: 1.1 }}
                              className={`h-20 w-20 bg-white text-black brutal-border flex items-center justify-center ${social.color} hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none`}
                           >
                              {social.icon}
                           </motion.a>
                        ))}
                        
                        <motion.button 
                           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                           whileHover={{ y: -5 }}
                           className="h-20 w-20 bg-neo-yellow text-black brutal-border flex flex-col items-center justify-center font-display font-black group/top shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                        >
                           <ArrowUpRight className="h-8 w-8 group-hover/top:rotate-45 transition-transform" />
                           <span className="text-[10px]">TOP</span>
                        </motion.button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Strip */}
            <div className="border-t-[4px] border-black bg-white text-black py-1 px-4 sm-phone:px-8 tablet-p:px-12">
               <div className="flex flex-col tablet-p:flex-row justify-between items-center gap-2 tablet-p:gap-8 font-display font-black uppercase text-[10px]">
                  <div className="flex items-center gap-8">
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-neo-green animate-pulse rounded-full" />
                        <span>DEVELOPED BY SOURABH BAN</span>
                     </div>
                  </div>
                  
                  <div className="flex flex-col items-center phablet:items-end text-center phablet:text-right">
                     <p className="italic">DESIGNED & ENGINEERED BY SOURABH BAN</p>
                     <p className="opacity-40">© 2026 • ALL INTELLECTUAL PROPERTY RESERVED • PIXELS ALIGNED TO GRID</p>
                  </div>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
