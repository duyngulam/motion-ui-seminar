"use client";

import { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";

import moon from "./moon.png";
import land from "./land.png";
import cat from "./cat.gif";
import { ConfettiFinale } from "../page";

export default function ParallaxCatDemo() {
  // Khai báo ref có kiểu IParallax để được autocomplete & tránh lỗi TS
  const ref = useRef<IParallax>(null);

  return (
    <div className="w-full h-screen text-white">
      <Parallax pages={3} ref={ref}>
        {/* 🌕 Layer 1 - Background moon */}
        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${moon.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* 🌍 Layer 2 - Ground (land) */}
        <ParallaxLayer
          offset={1}
          speed={1}
          factor={3}
          style={{
            backgroundImage: `url(${land.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
          }}
        />

        {/* 🐱 Layer 3 - Cat sticky (cố định trong khoảng scroll) */}
        <ParallaxLayer
          sticky={{ start: 0.2, end: 2 }}
          style={{ textAlign: "center", pointerEvents: "none" }}
        >
          <img
            src={cat.src}
            alt="Cat"
            className="inline-block w-64 h-auto drop-shadow-lg"
          />
        </ParallaxLayer>

        {/* 👋 Welcome text */}
        <ParallaxLayer
          offset={0.2}
          speed={0.05}
          className="flex items-center justify-center"
          onClick={() => ref.current?.scrollTo(2)}
        >
          <h2 className="mt-4 text-cyan-100 text-5xl font-bold">
            Welcome to my website
          </h2>
        </ParallaxLayer>

        {/* 👋 Final text */}
        <ParallaxLayer
          offset={2}
          speed={2}
          className="flex items-center justify-center"
          onClick={() => ref.current?.scrollTo(0)}
        >
          {/* <h2 className="mt-4 text-cyan-100 text-5xl font-bold">
            Scroll back to top
          </h2> */}
          {/* <ConfettiFinale /> */}
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
