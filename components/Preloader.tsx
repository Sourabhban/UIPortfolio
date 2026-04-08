'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  const words = [
    "INITIALIZING",
    "LOADING ASSETS",
    "CALIBRATING PIXELS",
    "READY TO LAUNCH",
    "SOURABH BAN",
    "2026"
  ];

  useEffect(() => {
    if (index === words.length - 1) {
      setTimeout(() => setComplete(true), 1000);
      return;
    }
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, 200 + (Math.random() * 200));
    return () => clearTimeout(timeout);
  }, [index, words.length]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="mb-8 flex gap-4"
            >
               {[...Array(4)].map((_, i) => (
                 <motion.div
                   key={i}
                   animate={{ 
                     scale: [1, 1.2, 1],
                     rotate: [0, 90, 0],
                     backgroundColor: ["#29FF7E", "#FF2E97", "#2E5BFF", "#FFF133"][i]
                   }}
                   transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                   className="h-8 w-8 brutal-border border-white"
                 />
               ))}
            </motion.div>
            
            <div className="h-20 overflow-hidden text-center">
              <motion.p
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="font-display text-4xl font-black uppercase italic text-white"
              >
                {words[index]}_
              </motion.p>
            </div>
            
            <div className="mt-12 w-64 h-2 bg-white/20 brutal-border border-white relative overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(index + 1) / words.length * 100}%` }}
                 className="h-full bg-neo-green"
               />
            </div>
          </div>
          


        </motion.div>
      )}
    </AnimatePresence>
  );
}
