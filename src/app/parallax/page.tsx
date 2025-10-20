"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxPage() {
  const { scrollY } = useScroll();

  // các lớp di chuyển khác nhau
  const ySky = useTransform(scrollY, [0, 1000], [0, -100]);
  const yMountains = useTransform(scrollY, [0, 1000], [0, -200]);
  const yGround = useTransform(scrollY, [0, 1000], [0, -400]);

  return (
    <main className="relative w-full bg-black text-white overflow-x-hidden">
      {/* Sky layer */}
      <motion.div
        style={{ y: ySky }}
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"
      />

      {/* Mountain layer */}
      <motion.div
        style={{ y: yMountains }}
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay"
      />

      {/* Ground layer */}
      <motion.div
        style={{ y: yGround }}
        className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-90 mix-blend-multiply"
      />

      {/* Content */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold text-cyan-400 mb-4 drop-shadow-lg">
          Parallax Scrolling
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Cuộn trang để thấy các lớp nền di chuyển ở tốc độ khác nhau.
        </p>
      </section>

      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center">
        <p className="text-2xl text-cyan-300 max-w-3xl leading-relaxed drop-shadow-md">
          Các lớp nền (trời, núi, mặt đất) di chuyển với tốc độ khác nhau, tạo
          cảm giác không gian 3D tự nhiên — giống cách Apple dùng để kể chuyện
          sản phẩm.
        </p>
      </section>

      <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-semibold text-cyan-400 mb-6">
          Ứng dụng của Parallax
        </h2>
        <ul className="text-lg text-gray-300 space-y-2">
          <li>✨ Trang landing page sản phẩm (Apple, Tesla,...)</li>
          <li>🎨 Website kể chuyện (Storytelling)</li>
          <li>🧭 Hiệu ứng trình chiếu sản phẩm, portfolio</li>
        </ul>
      </section>

      <section className="relative z-10 h-screen flex items-center justify-center text-center">
        <p className="text-gray-400">— Hết —</p>
      </section>
    </main>
  );
}
