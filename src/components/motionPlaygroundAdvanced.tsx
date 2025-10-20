"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

export default function MotionPlaygroundAdvanced() {
  const [liked, setLiked] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-12 p-8 w-full">
      {/* 1️⃣ Transition */}
      <div className="flex flex-col items-center text-center w-56">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Transition</h3>
        <motion.button
          whileHover={{ scale: 1.2, backgroundColor: "#0891b2" }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="px-6 py-3 bg-cyan-600 rounded-xl shadow-md text-white font-semibold"
        >
          Hover Me
        </motion.button>
      </div>

      {/* 2️⃣ Animation */}
      <div className="flex flex-col items-center text-center w-56">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Animation</h3>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto"
        />
        <p className="text-sm text-gray-400 mt-2">Loading...</p>
      </div>

      {/* 3️⃣ Microinteraction */}
      <div className="flex flex-col items-center text-center w-56">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Microinteraction</h3>
        <motion.button
          onClick={() => setLiked(!liked)}
          whileTap={{ scale: 0.8 }}
          animate={{
            scale: liked ? 1.3 : 1,
            color: liked ? "#f43f5e" : "#a3a3a3",
          }}
          transition={{ type: "spring", stiffness: 400 }}
          className="text-5xl select-none"
        >
          ❤️
        </motion.button>
        <p className="text-sm text-gray-400 mt-2">
          {liked ? "You liked this!" : "Tap to like"}
        </p>
      </div>

      {/* 5️⃣ Morphing */}
      <div className="flex flex-col items-center text-center w-56">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Morphing</h3>
        <motion.div
          animate={{
            borderRadius: ["20%", "50%", "20%"],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 mx-auto shadow-lg"
        />
      </div>
    </div>
  );
}
