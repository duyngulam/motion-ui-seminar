"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MotionPlayground({ type }: { type: string }) {
  const [key, setKey] = useState(0); // 🔁 thay đổi key để reset animation

  const variants: Record<string, any> = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 1 },
    },
    scale: {
      initial: { scale: 0.5, rotate: 0 },
      animate: { scale: 1, rotate: 360 },
      transition: { duration: 1 },
    },
    slide: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const v = variants[type] ?? variants.fade;

  const handleReplay = () => {
    // khi đổi key, motion.div sẽ render lại => chạy lại animation
    setKey((prev) => prev + 1);
  };

return (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
    <motion.div
      key={key}
      className="w-32 h-32 bg-cyan-500 rounded-2xl shadow-lg"
      initial={v.initial}
      animate={v.animate}
      transition={v.transition}
    />
    <button
      onClick={handleReplay}
      className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors duration-300"
    >
      play Animation
    </button>
  </div>
);

}
