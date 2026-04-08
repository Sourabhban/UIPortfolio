'use client';

import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

const Shape = ({ color, type, initialX, initialY, rotateSpeed }: { color: string, type: 'rect' | 'circle' | 'triangle' | 'star', initialX: string, initialY: string, rotateSpeed: number }) => {
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 }); // Default fallback

  const x = useSpring(0, { stiffness: 50, damping: 20 });
  const y = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = (e.clientX - window.innerWidth / 2) * 0.05;
      const targetY = (e.clientY - window.innerHeight / 2) * 0.05;
      x.set(targetX);
      y.set(targetY);
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{
        left: initialX,
        top: initialY,
        x,
        y,
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        rotate: {
          duration: rotateSpeed,
          repeat: Infinity,
          ease: "linear"
        }
      }}
      className={`absolute pointer-events-none opacity-[0.08] mix-blend-multiply transition-opacity duration-1000`}
    >
      {type === 'rect' && <div className={`h-24 w-24 border-[4px] border-black ${color} brutal-border`} />}
      {type === 'circle' && <div className={`h-32 w-32 border-[4px] border-black rounded-full ${color} brutal-border`} />}
      {type === 'triangle' && (
        <div 
          className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[68px] border-b-black relative"
          style={{ borderBottomColor: 'black' }}
        >
          <div 
            className="absolute -left-[32px] top-[14px] w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[54px]" 
            style={{ borderBottomColor: color.replace('bg-', '') }} 
          />
        </div>
      )}
      {type === 'star' && (
         <svg viewBox="0 0 100 100" className={`h-16 w-16 fill-black stroke-black stroke-[4px]`}>
            <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
         </svg>
      )}
    </motion.div>
  );
};

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <Shape type="rect" color="bg-neo-blue" initialX="10%" initialY="20%" rotateSpeed={20} />
      <Shape type="circle" color="bg-neo-pink" initialX="85%" initialY="15%" rotateSpeed={25} />
      <Shape type="star" color="bg-neo-green" initialX="70%" initialY="80%" rotateSpeed={18} />
      <Shape type="triangle" color="bg-neo-yellow" initialX="15%" initialY="70%" rotateSpeed={30} />
      <Shape type="rect" color="bg-neo-orange" initialX="50%" initialY="40%" rotateSpeed={35} />
    </div>
  );
}
