"use client";

import Slide from "@/components/slide";
import MotionPlayground from "@/components/motionPlayground";
import MotionPlaygroundAdvanced from "@/components/motionPlaygroundAdvanced";

export default function Page() {
  return (
    <main className="w-full">
      <Slide index={1} bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="SEMINAR: Tìm hiểu về Motion UI - Giao diện chuyển động trong thiết kế hiện đại">
        <p className="mt-4 text-cyan-100">
          <b>SE347.Q13 - Nhóm 15</b><br/>
          23520378 Nguyễn Lê Duy<br/>
          23521472 Nguyễn Anh Thi<br/>
          23521626 Lê Nữ Khánh Trang
        </p>
      </Slide>

      <Slide index={2} bgColor="bg-gradient-to-b from-black to-gray-900"
        title="Bối cảnh & Lịch sử của Motion UI">
        <p>
          Motion UI xuất phát từ thiết kế game và phim ảnh, sau đó lan sang web để mang lại
          trải nghiệm tự nhiên, hướng dẫn người dùng trực quan hơn.
        </p>
      </Slide>

      <Slide index={3} bgColor="bg-gradient-to-b from-gray-900 to-black"
        title="Vai trò của Motion UI">
        <ul className="text-left list-disc max-w-2xl mx-auto space-y-3">
          <li>Hướng dẫn người dùng qua chuyển động</li>
          <li>Tăng cảm xúc và tính tương tác</li>
          <li>Phản hồi hành động tức thì</li>
          <li>Tạo thương hiệu và sự chuyên nghiệp</li>
        </ul>
      </Slide>

      <Slide index={4} bgColor="bg-gradient-to-b from-black to-cyan-900"
        title="Playground: Fade / Scale / Slide">
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <MotionPlayground type="fade" />
          <MotionPlayground type="scale" />
          <MotionPlayground type="slide" />
        </div>
      </Slide>

      <Slide index={5} bgColor="bg-gradient-to-b from-cyan-900 to-black"
        title="Playground: Motion UI nâng cao">
        <MotionPlaygroundAdvanced/>
        <a
  href="/parallax"
  className="px-6 py-3 mt-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl font-semibold transition-colors"
>
  🚀 Xem Demo Parallax Toàn Trang
</a>

      </Slide>

    </main>
  );
}
