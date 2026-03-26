"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e141a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(221,252,255,0.05)]">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#b9c7e4]" data-icon="terminal">
            terminal
          </span>
          <span className="text-xl font-black tracking-tighter text-[#dde3ec] font-headline">
            Tuan Le PN
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-headline tracking-tighter font-bold">
          <a className="text-[#dde3ec]/70 hover:text-[#ddfcff] transition-colors" href="#architecture">Architecture</a>
          <a className="text-[#dde3ec]/70 hover:text-[#ddfcff] transition-colors" href="#ai-systems">AI Systems</a>
          <a className="text-[#dde3ec]/70 hover:text-[#ddfcff] transition-colors" href="#engineering">Engineering</a>
          <a className="text-[#dde3ec]/70 hover:text-[#ddfcff] transition-colors" href="#contact">Contact</a>
        </nav>
        
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-on-surface">
            <span className="material-symbols-outlined" data-icon="menu">menu</span>
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-surface overflow-hidden border-t border-outline-variant/20"
          >
            <div className="flex flex-col px-6 py-4 gap-4 font-headline tracking-tighter font-bold">
              <a onClick={() => setIsMenuOpen(false)} className="text-[#dde3ec]" href="#architecture">Architecture</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-[#dde3ec]" href="#ai-systems">AI Systems</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-[#dde3ec]" href="#engineering">Engineering</a>
              <a onClick={() => setIsMenuOpen(false)} className="text-[#dde3ec]" href="#contact">Contact</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <div className="bg-gradient-to-b from-[#1a2027] to-transparent h-px w-full"></div>
    </header>
  );
}
