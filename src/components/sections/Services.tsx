"use client";

import { motion } from "framer-motion";

export function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const services = [
    {
      icon: "architecture",
      title: "System Architecture",
      desc: "Designing resilient, distributed backends that handle massive throughput with sub-millisecond latency."
    },
    {
      icon: "smart_toy",
      title: "AI Workflows",
      desc: "Developing multi-agent systems that autonomously research, execute, and refine business tasks."
    },
    {
      icon: "database",
      title: "Data Engineering",
      desc: "Architecting robust data pipelines and graph databases to fuel intelligent applications."
    },
    {
      icon: "integration_instructions",
      title: "Legacy Migration",
      desc: "Strategically modernizing complex legacy systems into cloud-native, AI-ready frameworks."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="ai-systems">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-container/5 rounded-full blur-[120px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-label uppercase tracking-[0.3em] text-primary mb-4">Strategic Services</h2>
          <h3 className="text-5xl font-headline font-extrabold text-on-surface tracking-tighter">Engineering the Future</h3>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              className="glass-card p-8 rounded-2xl border-b-2 border-b-transparent hover:border-b-secondary-container transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl text-secondary-container mb-6" data-icon={svc.icon}>
                {svc.icon}
              </span>
              <h4 className="text-xl font-bold text-on-surface mb-4">{svc.title}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
