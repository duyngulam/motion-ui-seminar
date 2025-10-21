"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideProps {
  title?: string;
  children?: ReactNode;
  index: number;
  bgColor?: string;
}

export default function Slide({ title, children, index, bgColor }: SlideProps) {
  return (
    <section
      className={`min-h-screen flex flex-col justify-center items-center text-center p-8 snap-start ${
        bgColor ?? "bg-black"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-cyan-400">
            {title}
          </h1>
        )}
        <div className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-200">
          {children}
        </div>
        <p className="mt-12 text-sm text-gray-600">Slide {index}</p>
      </motion.div>
    </section>
  );
}
