"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Slide from "@/components/slide";
import MotionPlayground from "@/components/motionPlayground";
import MotionPlaygroundAdvanced from "@/components/motionPlaygroundAdvanced";
import CSSDemo from "@/components/CSSDemo";
import confetti from "canvas-confetti";
import { useInView } from "framer-motion";

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      {/* Nút mở modal */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-cyan-600 rounded-xl shadow-md text-white font-semibold"
      >
        ✨ Xem thêm
      </motion.button>

      {/* Overlay + Modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* Nền mờ */}
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />

            {/* Hộp nội dung chính */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="bg-gray-900 text-cyan-100 rounded-2xl p-8 max-w-md w-full shadow-xl text-center border border-cyan-700/50">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">
                  Hiệu ứng tăng tương tác ✨
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Khi modal xuất hiện, nền mờ đi giúp người dùng tập trung vào
                  nội dung chính — tăng cảm xúc, giảm nhiễu, và làm rõ trọng tâm
                  hành động.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShakeButton() {
  const [error, setError] = useState(false);

  const handleClick = () => {
    // Giả lập lỗi dữ liệu
    setError(true);
    setTimeout(() => setError(false), 600);
  };

  return (
    <div className="mt-4">
      <motion.button
        onClick={handleClick}
        animate={
          error
            ? {
                x: [0, -10, 10, -10, 10, 0], // rung qua lại
              }
            : { x: 0 }
        }
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md"
      >
        Gửi dữ liệu
      </motion.button>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-red-400 mt-2 text-sm"
          >
            ❌ Dữ liệu không hợp lệ!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function BankTransferDemo() {
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    if (state === "loading") {
      const timer = setTimeout(() => setState("success"), 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Nút Chuyển tiền */}
      <motion.button
        onClick={() => setState("loading")}
        disabled={state !== "idle"}
        animate={{
          backgroundColor:
            state === "idle"
              ? "#1e293b"
              : state === "loading"
              ? "#0891b2"
              : "#16a34a",
          scale: state === "success" ? [1, 1.1, 1] : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="px-6 py-3 rounded-xl text-white font-semibold shadow-md"
      >
        {state === "idle" && "Chuyển tiền"}
        {state === "loading" && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                ease: "linear",
              }}
            />
            <span>Đang xử lý...</span>
          </motion.div>
        )}
        {state === "success" && "✅ Giao dịch thành công"}
      </motion.button>

      {/* Thông báo */}
      <AnimatePresence>
        {state === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-green-400 mt-4 text-lg font-medium"
          >
            💰 Tiền đã được chuyển thành công!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ConfettiFinale() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) {
      // 🎉 BẮN PHÁO GIẤY MẠNH KHI VÀO SLIDE
      const duration = 2 * 1000; // thời gian pháo bắn (2s)
      const animationEnd = Date.now() + duration;

      (function frame() {
        // mỗi frame bắn 2 bên
        confetti({
          particleCount: 10,
          startVelocity: 50,
          spread: 70,
          angle: 60,
          origin: { x: 0 },
          colors: ["#22d3ee", "#06b6d4", "#67e8f9"],
        });
        confetti({
          particleCount: 10,
          startVelocity: 50,
          spread: 70,
          angle: 120,
          origin: { x: 1 },
          colors: ["#22d3ee", "#06b6d4", "#67e8f9"],
        });

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold text-cyan-300 drop-shadow-lg"
      >
        Cảm ơn thầy và các bạn đã lắng nghe 💙
      </motion.h1>

      <div className="mt-8 text-gray-300 text-2xl">
        <p className="font-semibold text-cyan-300">Nhóm 15 - SE347.Q13</p>
        <p>Nguyễn Lê Duy • Nguyễn Anh Thi • Lê Nữ Khánh Trang</p>
      </div>
    </div>
  );
}

function ExpandableCard({
  title,
  info,
}: {
  title: string;
  info: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const closedWidth = 320; // px (~w-80)
  const openWidth = 480; // px (~w-120)
  
  return (
    <div className="flex justify-center">
      <motion.div
        onClick={() => setOpen((s) => !s)}
        initial={false}
        animate={{ width: open ? openWidth : closedWidth }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{ width: closedWidth, originX: 0.5 }}
        className="bg-gray-800 text-gray-100 p-4 rounded-xl cursor-pointer shadow-lg overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {!open ? (
                <motion.h4
                  key="title"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="font-semibold whitespace-nowrap"
                >
                  {title}
                </motion.h4>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="text-sm text-gray-200 space-y-1"
                >
                  <div className="text-[28px] font-semibold text-lg">{info}</div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.28 }}
            className="ml-4 text-cyan-300"
          >
            ▾
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

function SidebarCollapseDemo() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex items-start gap-6">
      <motion.div
        animate={{ width: collapsed ? 56 : 200 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setCollapsed((c) => !c)}
        className="h-56 bg-gray-800 rounded-xl overflow-hidden text-white shadow-lg cursor-pointer"
        role="button"
        aria-pressed={collapsed}
      >
        <div className="h-full flex flex-col">
          <div className="p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">☰</div>
            {!collapsed && <div className="font-semibold">Navigation</div>}
          </div>

          <div className="mt-2 flex-1 p-3 text-sm">
            {!collapsed ? (
              <ul className="space-y-2">
                <li className="p-2 rounded-md hover:bg-gray-700">Dashboard</li>
                <li className="p-2 rounded-md hover:bg-gray-700">Orders</li>
                <li className="p-2 rounded-md hover:bg-gray-700">Products</li>
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">D</div>
                <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">O</div>
                <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">P</div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MorphToggle() {
  const [dark, setDark] = useState(false);
  const transition = { duration: 0.6, ease: [0.42, 0, 0.58, 1] as any };

  return (
    <div className="flex flex-col items-center">
      <p className="text-gray-200 mb-3">Dark mode</p>
      <button
        onClick={() => setDark((s) => !s)}
        aria-pressed={dark}
        className="w-32 h-16 p-1 rounded-full focus:outline-none"
      >
        <motion.svg
          viewBox="0 0 64 40"
          width="160"
          height="100"
          initial={false}
          animate={dark ? "moon" : "sun"}
        >
          <defs>
            <mask id="mMask">
              <rect x="0" y="0" width="64" height="40" fill="white" />
              <motion.circle
                cx={80}
                cy={20}
                r={12}
                fill="black"
                animate={{ cx: dark ? 40 : 80 }}
                transition={transition}
              />
            </mask>
          </defs>

          {/* main disk that becomes sun or moon (masked for moon crescent) */}
          <motion.circle
            cx="24"
            cy="20"
            r="12"
            fill={dark ? "#f8fafc" : "#facc15"}
            animate={{ fill: dark ? "#f8fafc" : "#facc15" }}
            transition={transition}
            mask="url(#mMask)"
          />

          {/* sun rays - fade/scale out when moon */}
          <g>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              return (
                <motion.line
                  key={i}
                  x1="24"
                  y1="3"
                  x2="24"
                  y2="0"
                  stroke="#facc15"
                  strokeWidth={2}
                  transform={`rotate(${angle} 24 20)`}
                  initial={false}
                  animate={{ opacity: dark ? 0 : 1, scale: dark ? 0.3 : 1 }}
                  transition={transition}
                />
              );
            })}
          </g>
        </motion.svg>
      </button>
    </div>
  );
}

function AnimationSequence() {
  const logoControls = useAnimation();
  const contentControls = useAnimation();
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  const handlePlay = async () => {
    if (playing) return;
    setPlaying(true);

    // 1) Logo scale in (bigger)
    await logoControls.start({
      scale: [0, 1],
      opacity: [0, 1],
      transition: { duration: 0.5, ease: "easeOut" },
    });

    // 2) Move the logo away from center using transform so it doesn't collide
    await logoControls.start({
      x: -420,
      y: -240,
      scale: 0.7,
      transition: { duration: 0.8, ease: "easeInOut" },
    });

    // leave the logo positioned by transform (no instant snap) so it moves smoothly

    // 3) Reveal center content (appears where logo originally was)
    await contentControls.start({ opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } });

    setPlaying(false);
    setHasPlayed(true);
  };

  // autoplay when in view; reset when out of view so it can replay
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => {
        handlePlay();
      }, 120);
      return () => clearTimeout(t);
    } else {
      // reset animation state so it can replay next time
      logoControls.set({ left: '50%', top: '50%', x: '-50%', y: '-80%', scale: 0, opacity: 0 });
      contentControls.set({ opacity: 0, scale: 0.95, y: 8 });
      setPlaying(false);
      setHasPlayed(false);
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-[70vh] md:h-[80vh] relative">
      {/* Logo - centered initially, will fly to top-left of the slide */}
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 50, pointerEvents: hasPlayed ? 'none' : 'auto' }}>
        <motion.div initial={{ x: 0, y: 0, scale: 0, opacity: 0 }} animate={logoControls}>
          <svg width="140" height="140" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 22H22L12 2Z" fill="#ffffff" />
          </svg>
        </motion.div>
      </div>

      {/* Play button removed per request */}

      {/* Center content appears after logo moves away: Swing + Bounce */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 0 }}
        animate={contentControls}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
          className="w-40 h-40 bg-cyan-500 rounded-xl flex items-center justify-center text-white text-lg font-semibold"
        >
          Swing
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 bg-pink-500 rounded-full flex items-center justify-center text-white text-lg font-semibold"
        >
          Bounce
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Page() {
  const [added, setAdded] = useState(false);
  return (
    <main className="w-full">
      <Slide
        index={1}
        bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="SEMINAR: Tìm hiểu về Motion UI"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="italic text-xl md:text-2xl text-cyan-200 mt-2">
            Giao diện chuyển động trong thiết kế hiện đại
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto">
          <div className="text-left text-cyan-100 leading-relaxed md:w-1/2 space-y-1">
            <p>
              <b>SE347.Q13 - Nhóm 15</b>
            </p>
            <p>23520378 Nguyễn Lê Duy</p>
            <p>23521472 Nguyễn Anh Thi</p>
            <p>23521626 Lê Nữ Khánh Trang</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-8 md:mt-0 md:w-1/2 flex justify-center"
          >
            <img
              src="/image.png"
              alt="Motion UI Illustration"
              className="w-64 md:w-80 rounded-2xl shadow-lg border border-cyan-700/50"
            />
          </motion.div>
        </div>
      </Slide>

      <Slide
        index={2}
        bgColor="bg-gradient-to-b from-black to-gray-900"
        title="Giới thiệu về Motion UI"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-5xl mx-auto mt-6">
          {/* Cột 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">Khái niệm</h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                Motion UI (Motion User Interface) là nghệ thuật sử dụng chuyển
                động, hiệu ứng động, và hoạt ảnh trong giao diện người dùng.
              </li>
              <li>
                Nó giúp tăng khả năng tương tác, dẫn hướng người dùng, và tạo
                trải nghiệm hấp dẫn.
              </li>
            </ul>
          </motion.div>

          {/* Cột 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">
              Bối cảnh ra đời
            </h3>
            <ul className="space-y-3 text-gray-200">
              <li>
                Khi web và app ngày càng phong phú, người dùng không chỉ muốn
                “xem” mà còn muốn “cảm nhận”.
              </li>
              <li>
                Các nhà thiết kế UI/UX nhận ra: chuyển động là ngôn ngữ tự nhiên
                nhất để truyền tải ý nghĩa và cảm xúc trong giao diện.
              </li>
            </ul>
          </motion.div>
        </div>
      </Slide>

      <Slide
        index={3}
        bgColor="bg-gradient-to-b from-gray-900 to-black"
        title="Vai trò của Motion UI"
      >
        <ul className="text-left list-disc max-w-2xl mx-auto space-y-3">
          <li>
            <strong>Hướng dẫn người dùng qua chuyển động:</strong> Khi bấm{" "}
            <em>“Thêm vào giỏ hàng”</em>, sản phẩm bay vào giỏ
            <div className="mt-3 flex items-center gap-6">
              <motion.div
                className="relative w-12 h-12 bg-pink-500 rounded-xl cursor-pointer flex items-center justify-center overflow-visible"
                onClick={() => {
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200);
                }}
              >
                🛍️
                <AnimatePresence>
                  {added && (
                    <motion.div
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: [0, 65, 85], // bay sang phải vừa phải
                        y: [0, -40, -5], // bay cong lên rồi rơi
                        opacity: [1, 1, 0],
                        scale: [1, 1.1, 0.5],
                      }}
                      transition={{
                        duration: 1.1,
                        ease: "easeInOut",
                      }}
                      // 🧭 đặt túi hàng ở chính giữa nút gốc
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      🛍️
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="relative w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center ml-8">
                🛒
              </div>
            </div>
          </li>
          <li>
            <strong>Tăng cảm xúc và tính tương tác:</strong>
            <ModalDemo />
          </li>
          <li>
            <strong>Phản hồi hành động tức thì:</strong>
            <ShakeButton />
          </li>
          <li>
            <strong>Tạo thương hiệu và sự chuyên nghiệp:</strong> Logo Google
            biến đổi khi tải
            <video
              src="/Google Loading.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="mt-4 rounded-2xl shadow-lg border border-cyan-700/40 w-72 h-40 object-cover"
            />
          </li>
        </ul>
      </Slide>

      {/* Slide group split: Transition, Animation, Microinteraction, Morphing */}
      <Slide
        index={4}
        bgColor="bg-gradient-to-b from-black to-cyan-900"
        title="Transition"
      >
        <div className="max-w-5xl mx-auto mt-10 flex flex-row items-center gap-8">
          <div>
          <p className="text-cyan-300 text-lg font-semibold">Hover:</p>
            <motion.div
              initial={{ backgroundColor: "#ec4899", scale: 1 }}
              whileHover={{ scale: 1.08, backgroundColor: "#06b6d4", transition: { duration: 0.28, ease: "easeOut" } }}
              className="w-40 h-24 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
              style={{ backgroundColor: "#ec4899" }}
            >
              Submit
            </motion.div>
          </div>
            <div>
              <h4 className="text-cyan-200 font-semibold mb-3 flex-2">expandable card</h4>
              <ExpandableCard
                title="Product: Iphone"
                info= {<p>Vỏ nguyên khối. <br /> Tạo nên một tổng thể <br /> mạnh vô đối.</p>}
              />
            </div>

            <div>
              <h4 className="text-cyan-200 font-semibold mb-3">Sidebar collapse</h4>
              <SidebarCollapseDemo />
            </div>
        </div>
      </Slide>

      <Slide
        index={5}
        bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="Animation"
      >
     <AnimationSequence/>
      </Slide>

      <Slide
        index={6}
        bgColor="bg-gradient-to-b from-black to-gray-900"
        title="Microinteraction"
      >
        <div className="max-w-4xl mx-auto mt-8 space-y-8">
          <p className="text-cyan-300 text-lg font-semibold text-center">Microinteraction — phản hồi nhỏ nhưng quan trọng</p>

          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div>
              <h4 className="text-cyan-200 font-semibold mb-2 text-center">Shake on error</h4>
              <ShakeButton />
            </div>

            <div>
              <h4 className="text-cyan-200 font-semibold mb-2 text-center">Modal feedback</h4>
              <ModalDemo />
            </div>

            <div>
              <h4 className="text-cyan-200 font-semibold mb-2 text-center">Transaction flow</h4>
              <BankTransferDemo />
            </div>
          </div>
        </div>
      </Slide>

      <Slide
        index={7}
        bgColor="bg-gradient-to-b from-gray-900 to-black"
        title="Morphing"
      >
        <div className="max-w-5xl mx-auto mt-12 flex flex-col items-center gap-8">
          <p className="text-cyan-300 text-lg font-semibold">Morphing — chuyển đổi hình dạng hoặc biểu tượng</p>

          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              whileHover={{ borderRadius: "9999px" }}
              transition={{ duration: 0.45 }}
              className="w-40 h-40 bg-cyan-600 rounded-2xl flex items-center justify-center text-white"
            >
              Hover to round
            </motion.div>

              {/* <div className="flex flex-col items-center">
                <p className="text-gray-200 mb-3">Advanced morphing</p>
                <MotionPlaygroundAdvanced />
              </div> */}

              <div className="flex flex-col items-center">
                <MorphToggle />
              </div>
          </div>
        </div>
      </Slide>

      <Slide
        index={8}
        bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="Một số Motion UI nâng cao"
      >
        <div className="max-w-5xl mx-auto mt-8 flex flex-col items-center">
          {/* <MotionPlaygroundAdvanced /> */}

          <a
            href="/parallax"
            className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold transition-colors"
          >
            🚀 Xem Parallax Toàn Trang
          </a>
        </div>
      </Slide>

      <Slide
        index={9}
        bgColor="bg-gradient-to-b from-black to-gray-900"
        title="Nguyên tắc thiết kế"
      >
        <div className="text-left max-w-4xl mx-auto space-y-8 mt-6">
          <div>
            <h3 className="text-cyan-400 text-2xl font-semibold mb-2">
              Tự nhiên & có mục đích
            </h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                Hiệu ứng phải có lý do: hướng dẫn, phản hồi hoặc làm rõ mối quan
                hệ.
              </li>
              <li>Không nên chỉ để “cho đẹp”.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan-400 text-2xl font-semibold mb-2">
              Nhịp độ phù hợp (Timing & Easing)
            </h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Thời lượng: 200–500ms thường là “vàng”.</li>
              <li>
                “Ease-in” và “ease-out” giúp chuyển động mượt và tự nhiên.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan-400 text-2xl font-semibold mb-2">
              Giản lược & tinh tế
            </h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>Ít nhưng chất: dùng hiệu ứng vừa đủ để thu hút.</li>
              <li>Tránh làm người dùng phân tâm.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-cyan-400 text-2xl font-semibold mb-2">
              Nhất quán trong hệ thống
            </h3>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              <li>
                Mọi hiệu ứng nên tuân theo cùng quy tắc: tốc độ, hướng, phong
                cách.
              </li>
            </ul>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <h3 className="text-cyan-400 text-2xl font-semibold mb-4">
              Ví dụ thực tế 💳
            </h3>
            <p className="text-gray-300 mb-4">
              Trong ứng dụng ngân hàng, khi người dùng bấm{" "}
              <em>“Chuyển tiền”</em>:
              <br /> Nút đổi màu xanh → hiển thị loading → hiện dấu check ✅ →
              thông báo “Giao dịch thành công” mượt mà.
            </p>

            <BankTransferDemo />
          </div>
        </div>
      </Slide>

      <Slide
        index={10}
        bgColor="bg-gradient-to-b from-gray-900 to-black"
        title="Công cụ và công nghệ dùng trong Motion UI"
      >
        <div className="max-w-4xl mx-auto mt-10 text-gray-200 space-y-6">
          <p className="text-cyan-300 text-lg font-semibold">Giới thiệu</p>
          <p>
            Hiện nay, nhờ các công cụ như <strong>GSAP</strong> hay <strong>Framer Motion</strong>, việc thêm
            chuyển động vào giao diện trở nên cực kỳ dễ dàng — và hiệu ứng lại rất mượt mà.
          </p>

          <ul className="list-disc list-inside">
            <li>GSAP — mạnh mẽ cho animation phức tạp (canvas, SVG, DOM).</li>
            <li>Framer Motion — thư viện React, API khai báo, dễ dùng cho UI.</li>
            <li>Anime.js, Lottie, và các công cụ thiết kế như Figma / After Effects.</li>
          </ul>
        </div>
      </Slide>

      <Slide
        index={11}
        bgColor="bg-gradient-to-b from-black to-gray-900"
        title="CSS & JavaScript cơ bản"
      >
        <div className="max-w-4xl mx-auto mt-8 text-gray-200 space-y-6">
          <p className="text-cyan-300 text-lg font-semibold text-center">Các kỹ thuật nền tảng</p>

          <ul className="list-disc list-inside">
            <li><code className="text-cyan-300">transition</code></li>
            <li><code className="text-cyan-300">transform</code></li>
            <li><code className="text-cyan-300">@keyframes</code></li>
            <li><code className="text-cyan-300">animation</code></li>
          </ul>

          <div className="bg-gray-800 p-4 rounded-md">
            <pre className="text-sm text-gray-100 overflow-auto"><code>{`button:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}`}</code></pre>
          </div>
          {/* Live demo */}
          <CSSDemo />
        </div>
      </Slide>

      <Slide
        index={12}
        bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="GSAP (GreenSock)"
      >
        <div className="max-w-4xl mx-auto mt-8 text-gray-200 space-y-4">
          <p className="text-cyan-300 text-lg font-semibold">Một thư viện animation mạnh mẽ</p>

          <p>
            GSAP là một trong những thư viện animation mạnh mẽ và hiệu năng cao nhất. Nó hỗ trợ
            timeline phức tạp, dễ điều khiển tuần tự các animation và làm việc tốt trên canvas, SVG
            và DOM. GSAP còn có plugin như <em>ScrollTrigger</em> hay <em>MotionPath</em> để tạo animation theo cuộn và theo đường đi.
          </p>
        </div>
      </Slide>

      <Slide
        index={13}
        bgColor="bg-gradient-to-b from-black to-gray-900"
        title="Ứng dụng thực tế"
      >
        <div className="text-left max-w-5xl mx-auto mt-10">
          <motion.table
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="min-w-full text-gray-200 border border-gray-700 rounded-xl overflow-hidden shadow-xl"
          >
            <thead className="bg-gray-800 text-cyan-300">
              <tr>
                <th className="py-3 px-4 text-left text-lg font-semibold">
                  Ứng dụng
                </th>
                <th className="py-3 px-4 text-left text-lg font-semibold">
                  Cách sử dụng Motion UI
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {/* === HÀNG 1 === */}
              <motion.tr
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                  backgroundColor: "rgba(30,41,59,0.6)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
                className="cursor-pointer transition-transform"
              >
                <td className="py-3 px-4 font-semibold text-cyan-200 flex items-center gap-3">
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    🛒
                  </motion.span>
                  <span>Website thương mại điện tử</span>
                </td>
                <td className="py-3 px-4">
                  Hiệu ứng hover sản phẩm, loading khi thêm vào giỏ hàng
                </td>
              </motion.tr>

              {/* === HÀNG 2 === */}
              <motion.tr
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                  backgroundColor: "rgba(30,41,59,0.6)",
                }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="cursor-pointer transition-transform"
              >
                <td className="py-3 px-4 font-semibold text-cyan-200 flex items-center gap-3">
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    📱
                  </motion.span>
                  <span>Ứng dụng di động</span>
                </td>
                <td className="py-3 px-4">
                  Menu trượt, hiệu ứng chuyển trang, loading screen
                </td>
              </motion.tr>

              {/* === HÀNG 3 === */}
              <motion.tr
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                  backgroundColor: "rgba(30,41,59,0.6)",
                }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="cursor-pointer transition-transform"
              >
                <td className="py-3 px-4 font-semibold text-cyan-200 flex items-center gap-3">
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    💰
                  </motion.span>
                  <span>Ứng dụng tài chính</span>
                </td>
                <td className="py-3 px-4">
                  Biểu đồ động, hiệu ứng xác nhận giao dịch
                </td>
              </motion.tr>

              {/* === HÀNG 4 === */}
              <motion.tr
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                  backgroundColor: "rgba(30,41,59,0.6)",
                }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="cursor-pointer transition-transform"
              >
                <td className="py-3 px-4 font-semibold text-cyan-200 flex items-center gap-3">
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    🎬
                  </motion.span>
                  <span>Giới thiệu thương hiệu (Branding)</span>
                </td>
                <td className="py-3 px-4">
                  Logo animation, video intro ứng dụng
                </td>
              </motion.tr>
            </tbody>
          </motion.table>
        </div>
      </Slide>

      <Slide
        index={14}
        bgColor="bg-gradient-to-b from-gray-900 to-black"
        title="Ưu & Nhược điểm của Motion UI"
      >
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 perspective-[1000px]">
          {/* === CARD 1 === */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-56 transform-style-preserve-3d cursor-pointer"
          >
            {/* Mặt trước */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 to-gray-800/80 border border-cyan-500/40 rounded-2xl shadow-lg p-6 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">
                Tăng tính tương tác
              </h3>
              <p className="text-gray-100">
                Làm giao diện sinh động và hấp dẫn người dùng.
              </p>
            </div>

            {/* Mặt sau */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-800/60 to-gray-900/80 border border-red-500/40 rounded-2xl shadow-lg p-6 rotateY-180 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-red-300 mb-3">
                Nhược điểm
              </h3>
              <p className="text-gray-100">
                Nếu lạm dụng dễ gây rối mắt và mất tập trung.
              </p>
            </div>
          </motion.div>

          {/* === CARD 2 === */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-56 transform-style-preserve-3d cursor-pointer"
          >
            {/* Mặt trước */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 to-gray-800/80 border border-cyan-500/40 rounded-2xl shadow-lg p-6 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">
                Cải thiện trải nghiệm
              </h3>
              <p className="text-gray-100">
                Giúp người dùng hiểu rõ trạng thái & hành động.
              </p>
            </div>

            {/* Mặt sau */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-800/60 to-gray-900/80 border border-red-500/40 rounded-2xl shadow-lg p-6 rotateY-180 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-red-300 mb-3">
                Nhược điểm
              </h3>
              <p className="text-gray-100">
                Tốn nhiều tài nguyên và công sức khi triển khai.
              </p>
            </div>
          </motion.div>

          {/* === CARD 3 === */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full h-56 transform-style-preserve-3d cursor-pointer"
          >
            {/* Mặt trước */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-800/60 to-gray-800/80 border border-cyan-500/40 rounded-2xl shadow-lg p-6 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-cyan-300 mb-3">
                Tạo phong cách thương hiệu
              </h3>
              <p className="text-gray-100">
                Giúp sản phẩm nổi bật và nhất quán hình ảnh.
              </p>
            </div>

            {/* Mặt sau */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-800/60 to-gray-900/80 border border-red-500/40 rounded-2xl shadow-lg p-6 rotateY-180 backface-hidden flex flex-col justify-center text-center">
              <h3 className="text-xl font-bold text-red-300 mb-3">
                Nhược điểm
              </h3>
              <p className="text-gray-100">
                Khó duy trì nhất quán khi sản phẩm mở rộng.
              </p>
            </div>
          </motion.div>
        </div>
      </Slide>

      <Slide
        index={15}
        bgColor="bg-gradient-to-b from-black to-cyan-950"
        title="Tổng kết"
      >
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mt-16 space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-100 italic leading-relaxed"
          >
            Motion UI không chỉ là <span className="text-cyan-300">“hiệu ứng đẹp”</span>
            mà là <span className="text-cyan-400 font-semibold">“ngôn ngữ thị giác”</span>
            giúp giao diện truyền đạt thông tin hiệu quả.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-xl md:text-2xl text-gray-100 italic leading-relaxed"
          >
            Trong kỷ nguyên <span className="text-cyan-400">trải nghiệm người dùng</span>,
            Motion UI là <span className="text-cyan-300">“chiếc cầu nối”</span> giữa
            <span className="font-semibold text-cyan-200"> công nghệ </span> và
            <span className="font-semibold text-cyan-200"> cảm xúc</span>.
          </motion.p>
        </div>
      </Slide>

      <Slide
        index={16}
        bgColor="bg-gradient-to-b from-cyan-950 via-black to-cyan-950"
        title="Demo Parallax Toàn Trang"
      >
        <a
          href="/parallax"
          className="px-6 py-3 mt-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold transition-colors"
        >
          🚀 Xem Demo Parallax Toàn Trang
        </a>
      </Slide>

      {/* <Slide
        index={12}
        bgColor="bg-gradient-to-b from-cyan-950 via-black to-cyan-950"
        title=""
      >
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6">
          <ConfettiFinale />
        </div>
      </Slide> */}
    </main>
  );
}
