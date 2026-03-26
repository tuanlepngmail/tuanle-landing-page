"use client";

import { motion } from "framer-motion";

export function Contact() {
  return (
    <section className="py-24 relative" id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 md:p-20 rounded-[2rem] relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-container/10 rounded-full blur-[80px]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-sm font-label uppercase tracking-[0.3em] text-secondary-container mb-6">Connect</h2>
              <h3 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter mb-8 leading-tight">Ready to build the next system?</h3>
              <p className="text-lg text-on-surface-variant mb-12 max-w-md leading-relaxed">
                Whether you're looking for an architectural audit, AI strategy, or high-level engineering leadership, let's discuss your vision.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-on-surface">
                  <span className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary" data-icon="alternate_email">alternate_email</span>
                  </span>
                  <span className="font-bold">hello@tuanlepn.dev</span>
                </div>
                <div className="flex items-center gap-4 text-on-surface">
                  <span className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/20">
                    <span className="material-symbols-outlined text-secondary" data-icon="location_on">location_on</span>
                  </span>
                  <span className="font-bold">Engineering HQ | Remote Globally</span>
                </div>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Name</label>
                  <input className="w-full bg-surface-container-highest/50 border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-secondary-container transition-all p-4 text-on-surface rounded-t-lg outline-none" placeholder="John Doe" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Email</label>
                  <input className="w-full bg-surface-container-highest/50 border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-secondary-container transition-all p-4 text-on-surface rounded-t-lg outline-none" placeholder="john@company.com" type="email" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Project Inquiry</label>
                <textarea className="w-full bg-surface-container-highest/50 border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-secondary-container transition-all p-4 text-on-surface rounded-t-lg outline-none max-h-48 min-h-[120px]" placeholder="Tell me about your architectural needs..." rows={4}></textarea>
              </div>
              
              <motion.button 
                whileHover={{ filter: "brightness(1.1)", scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary-fixed font-bold rounded-lg shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                Initialize Connection
                <span className="material-symbols-outlined" data-icon="send">send</span>
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
