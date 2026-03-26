"use client";

import { motion } from "framer-motion";

export function About() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const techNodes = [
    {
      icon: "terminal",
      color: "text-primary",
      title: "C/C++ & Python",
      desc: "Building the backbone of high-performance computation and modern scripting interfaces."
    },
    {
      icon: "hub",
      color: "text-secondary-container",
      title: "Neo4j & Knowledge Graphs",
      desc: "Structuring unstructured data into actionable, relational intelligence networks."
    },
    {
      icon: "layers",
      color: "text-tertiary",
      title: "Mendix Low-Code",
      desc: "Accelerating enterprise delivery without compromising on complex logic or integration."
    },
    {
      icon: "auto_awesome",
      color: "text-secondary-fixed",
      title: "AI/LLM Integration",
      desc: "Deploying state-of-the-art models for real-world automated decision making."
    }
  ];

  return (
    <section className="py-24 bg-surface-container-lowest" id="engineering">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/3 sticky top-32"
          >
            <h2 className="text-sm font-label uppercase tracking-[0.3em] text-secondary-container mb-4">
              Foundation
            </h2>
            <h3 className="text-4xl font-headline font-bold text-on-surface mb-6">
              15+ Years of Architectural Precision
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              From low-level C++ optimization to high-level AI orchestration, my journey has been defined by a relentless pursuit of system elegance and scalability.
            </p>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {techNodes.map((tech, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                className="p-8 rounded-2xl bg-surface-container border border-outline-variant/10 group hover:border-secondary-container/30 transition-all cursor-default"
              >
                <span className={`material-symbols-outlined text-3xl mb-4 block ${tech.color}`} data-icon={tech.icon}>
                  {tech.icon}
                </span>
                <h4 className="text-xl font-bold text-on-surface mb-2">{tech.title}</h4>
                <p className="text-sm text-on-surface-variant">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
