"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Portfolio() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } }
  };

  return (
    <section className="py-24 bg-surface-container-lowest" id="architecture">
      <div className="max-w-7xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div className="max-w-xl">
            <h2 className="text-sm font-label uppercase tracking-[0.3em] text-secondary mb-4">Selected Works</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-on-surface tracking-tighter">Architectural Showcases</h3>
          </div>
          <a className="group flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors" href="#">
            View All Projects
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform" data-icon="arrow_forward">arrow_forward</span>
          </a>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Project 1 */}
          <motion.div variants={item} className="md:col-span-8 group relative rounded-3xl overflow-hidden bg-surface-container aspect-video md:aspect-auto md:h-[500px]">
            <Image 
              alt="Cybersecurity Network" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDK6LgZ5yYsfvYtKyjYx7PF9vTh07dol4IJE4J78bea0_kD6s975ZB6UG3YRxF80JLoezAZvCiRZrqEjpP-V5Y1t6qNKwP5d-LVzBFLztvKPgJY_sfs6M1Jxy1OpRQE6ndx-yXFNK_MCKpKrSiU-xweYiM27OEjZl_dOIwvHz8FOtXEl5H3p97YK-7hS5YayduzdK8Gd3fTa8HTjhR73vbYAPu4H_sa8oxDemWDtd4npMziNk_YZfrhhfiJ2eKx6k04nikpSNBbUw"
              width={1600}
              height={1000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent p-10 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-container text-xs font-bold uppercase tracking-wider">AI Knowledge Graph</span>
                </div>
                <h4 className="text-3xl font-headline font-extrabold text-on-surface">Neural-Graph Intelligence Hub</h4>
                <p className="text-on-surface-variant max-w-lg leading-relaxed">
                  A massive-scale Neo4j implementation connecting disparate enterprise data silos into a unified intelligence layer for LLM querying.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div variants={item} className="md:col-span-4 group relative rounded-3xl overflow-hidden bg-surface-container min-h-[400px]">
            <Image 
              alt="Blockchain Tech" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwlI8Xb4Weh-Jl72eKLQpfGMWz7Z75J2UzwX4M1xs6jbnC4pYuVkK0V2VhULmRWQ4gwQFtqGqqS5bGFU1Uq_mcU0oERe5hNO3iDwhz7z-jLKMbvh8svHJsO1Rm9_k94F4QIcZ1q1jxuiTtgiXspSy_YUrByPOym2eEAKebVyUvs82FSgA49Mi71bLHCiUcf7oRUATM1Efp2SqShvK8PdpPTbuEz6oKeI0EduYTVSioV8owv3nFqn9j3bHJNvz5NAo-sN9YViVAsKo"
              width={800}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent p-10 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-primary-container text-primary text-xs font-bold uppercase tracking-wider">Agents</span>
                </div>
                <h4 className="text-2xl font-headline font-extrabold text-on-surface">Multi-Agent Workflow Orchestrator</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Automated decision engine using LangChain and specialized sub-agents.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div variants={item} className="md:col-span-12 group relative rounded-3xl overflow-hidden bg-surface-container h-[400px]">
            <Image 
              alt="Tech Background" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_G5mFhzKHOflZiwDDE2wj6GQb0CqHJ2c8dNoWiAACxd1OvJFz7tQSxEJ8K82ZC22mXzymXzksQO3BxLKkUf6cEXiXienw22F6hFclJ7gchUJhYL0ApTEzIDqVTJYKdge9npa3UqFFfOJlRcLFXlOQKonw0kbnDbxnBrqJJG2RdJ3qRcawR47OBOGHGqmoi1r0L55PtlXvhIgDavCyQBXWrRy2Zr9qcXno6aWxtKSIHQxvue9-Qxc43MdAZGg_zst1CVJeCFPzyDI"
              width={2000}
              height={800}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent p-10 flex flex-col justify-end">
              <div className="max-w-2xl space-y-4">
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-tertiary-container text-tertiary text-xs font-bold uppercase tracking-wider">Engineering</span>
                </div>
                <h4 className="text-3xl font-headline font-extrabold text-on-surface">High-Performance Compute Engine</h4>
                <p className="text-on-surface-variant leading-relaxed">
                  Optimized C++ core for real-time financial data processing, reducing latency by 45% across legacy infrastructure.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
