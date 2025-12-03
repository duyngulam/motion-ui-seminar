"use client";

import React from "react";

export default function CSSDemo() {
  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <style>{`
        .demo-btn {
          background: #ec4899;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease-in-out;
        }

        .demo-btn:hover {
          transform: scale(1.05);
          background: #06b6d4;
        }

        .demo-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
      `}</style>

      <div className="demo-wrapper">
        <button className="demo-btn">Hover me</button>
        <div className="text-gray-200 text-center max-w-xs">
          Kết quả: khi di chuột vào nút, nút sẽ hơi phóng to (scale 1.05) và đổi màu.
        </div>
      </div>
    </div>
  );
}
