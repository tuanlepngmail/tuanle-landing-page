"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[921px] flex items-center px-6 lg:px-12 hero-gradient">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span className="text-xs font-label uppercase tracking-widest text-secondary">
              Available for Strategic Projects
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter leading-none text-on-surface">
            Tuan Le PN — Senior Software Engineer <span className="text-primary">&amp;</span> <span className="text-secondary-container">AI Systems Builder</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
            Architecting high-performance digital ecosystems for 15+ years. Specializing in the intersection of Knowledge Graphs, Generative AI, and mission-critical Engineering.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg shadow-xl"
            >
              View Expertise
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(221, 252, 255, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-secondary/20 backdrop-blur-md text-secondary font-bold rounded-lg transition-colors"
            >
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-outline-variant/10 aspect-[4/5] bg-surface-container">
            <Image 
              alt="Tuan Le PN" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf18g5YmE1dTjRN3RXh89TZl3YlYuppmk_QqPe93o9ElKbY_RYOZT7LMhGlwE1_kLEd1zYNeAls3LMPuq8vGi4TDmDxxY8-Pt7dj8zkLRJ63rePz9lk9glSTjbwgr8DTk9-C0eGorR1NWfFlOpmMjf4nCy8oML2CscIXkkMRJ_Q-EqaUsTvy6ZoKxPN1D---_IeaeIuMIH7XpLwOqdpB1ygVmzefdcp0RpE16qaFT_2LWcWeAEI3v6frjS4r7576cAwgaIMnN2Rx4"
              width={800}
              height={1000}
              priority
            />
          </div>
          
          {/* Decorative Data Node */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute -bottom-6 -left-6 z-20 glass-card p-6 rounded-xl neon-glow-secondary max-w-[240px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary-container" data-icon="psychology">psychology</span>
              <span className="text-sm font-bold text-on-surface">AI Strategy</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-tight">Implementing Multi-Agent Workflows &amp; RAG architectures for enterprise scale.</p>
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
