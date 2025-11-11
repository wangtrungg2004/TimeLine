"use client";

import { useEffect, useState } from "react";

interface TimelineEvent {
  year: number;          // để sắp xếp/nội bộ
  yearLabel: string;     // nhãn hiển thị (VD: "2,5 triệu năm TCN", "1856 CN")
  isBCE?: boolean;       // mốc trước CN
  title: string;
  description: string;
  material: string;
  icon: string;          // emoji
  iconLabel: string;     // aria-label cho emoji
  details: {
    discovery: string;
    impact: string;
    technology: string;
    legacy: string;
  };
  color: string;         // tailwind gradient from-... to-...
}

const timelineEvents: TimelineEvent[] = [
  {
    year: -2500000,
    yearLabel: "≈ 2,5 triệu năm TCN",
    isBCE: true,
    title: "Thời Đá",
    description: "Con người bắt đầu sử dụng đá",
    material: "Đá",
    icon: "🪨",
    iconLabel: "Đá",
    details: {
      discovery: "Con người tìm thấy đá có thể được đẽo để tạo công cụ sắc nhọn",
      impact: "Cho phép con người săn bắt, xây dựng nơi trú ẩn",
      technology: "Công cụ đá, mũi tên, dao",
      legacy: "Nền tảng của tất cả công nghệ sau này",
    },
    color: "from-gray-600 to-gray-800",
  },
  {
    year: -3000,
    yearLabel: "≈ 3000 TCN",
    isBCE: true,
    title: "Thời Đồng",
    description: "Phát hiện hợp kim đồng",
    material: "Đồng",
    icon: "🔔",
    iconLabel: "Chuông đồng",
    details: {
      discovery: "Người cổ đại phát hiện trộn đồng và thiếc tạo ra đồng thiếc (bronze) cứng hơn",
      impact: "Vũ khí tốt hơn, công cụ bền hơn, thương mại phát triển",
      technology: "Kiếm, mũi tên, đồng tiền",
      legacy: "Đánh dấu sự bùng nổ nghề luyện kim và giao thương",
    },
    color: "from-amber-600 to-amber-800",
  },
  {
    year: -1200,
    yearLabel: "≈ 1200 TCN",
    isBCE: true,
    title: "Thời Sắt",
    description: "Sắt dần thay thế đồng",
    material: "Sắt",
    icon: "⚙️",
    iconLabel: "Bánh răng",
    details: {
      discovery: "Người cổ đại học cách luyện sắt từ quặng",
      impact: "Sắt phong phú hơn đồng, vũ khí mạnh hơn, nông nghiệp phát triển",
      technology: "Kiếm sắt, cày sắt, công cụ",
      legacy: "Mở rộng quy mô nông nghiệp và quân sự, hình thành các đế chế",
    },
    color: "from-slate-600 to-slate-800",
  },
  {
    year: 1856,
    yearLabel: "1856 CN",
    title: "Cách Mạng Thép",
    description: "Quy trình Bessemer",
    material: "Thép",
    icon: "🏗️",
    iconLabel: "Cẩu tháp xây dựng",
    details: {
      discovery: "Henry Bessemer phát minh quy trình sản xuất thép hàng loạt",
      impact: "Giá thép giảm mạnh; tàu, cầu, tòa nhà cao tầng bùng nổ",
      technology: "Lò Bessemer, đường ray, cầu thép",
      legacy: "Tăng tốc công nghiệp hoá và hạ tầng hiện đại",
    },
    color: "from-slate-500 to-slate-700",
  },
  {
    year: 1907,
    yearLabel: "1907 CN",
    title: "Nhựa Tổng Hợp",
    description: "Bakelite - nhựa đầu tiên",
    material: "Nhựa",
    icon: "🧪",
    iconLabel: "Ống nghiệm",
    details: {
      discovery: "Leo Baekeland tạo ra Bakelite, nhựa tổng hợp đầu tiên",
      impact: "Thay thế nhiều vật liệu tự nhiên; mở ra kỷ nguyên tiêu dùng",
      technology: "Bakelite, Celluloid, Nylon",
      legacy: "Đặt nền móng ngành nhựa quy mô toàn cầu",
    },
    color: "from-blue-500 to-blue-700",
  },
  {
    year: 1947,
    yearLabel: "1947 CN",
    title: "Transistor",
    description: "Bán dẫn thay đổi thế giới",
    material: "Bán Dẫn",
    icon: "💻",
    iconLabel: "Máy tính",
    details: {
      discovery: "Transistor được phát minh tại Bell Labs",
      impact: "Thay thế ống chân không; máy tính nhỏ gọn, mạnh mẽ",
      technology: "Transistor, IC, vi xử lý",
      legacy: "Kỷ nguyên số và công nghiệp bán dẫn",
    },
    color: "from-purple-600 to-pink-600",
  },
  {
    year: 2004,
    yearLabel: "2004 CN",
    title: "Graphene",
    description: "Vật liệu 2D nổi bật",
    material: "Graphene",
    icon: "⚛️",
    iconLabel: "Nguyên tử",
    details: {
      discovery: "Graphene được tách từ graphite bằng phương pháp băng dính",
      impact: "Cường độ vượt trội, dẫn điện/nhiệt cao; mỏng nhất",
      technology: "Graphene, Nanotubes, vật liệu 2D",
      legacy: "Ứng dụng tiềm năng: điện tử linh hoạt, cảm biến, năng lượng",
    },
    color: "from-cyan-600 to-blue-600",
  },
  {
    year: 2024,
    yearLabel: "2024 CN",
    title: "Vật Liệu Bền Vững",
    description: "Tương lai xanh",
    material: "Bio-Materials",
    icon: "🌱",
    iconLabel: "Mầm cây",
    details: {
      discovery: "Vật liệu từ nấm, tảo, phụ phẩm nông nghiệp được thương mại hóa",
      impact: "Giảm phát thải vòng đời, phân hủy sinh học, hỗ trợ kinh tế tuần hoàn",
      technology: "Mycelium leather, algae plastics, bio-composites",
      legacy: "Định hình tiêu chuẩn sản xuất xanh & chuỗi cung ứng bền vững",
    },
    color: "from-green-600 to-emerald-600",
  },
];

export default function DeepTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(4); // mặc định chọn Nhựa 1907
  const event = timelineEvents[selectedEvent];

  // Tôn trọng Reduce Motion
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Emoji fallback để tránh lỗi icon
  const Emoji = ({ symbol, label, size = "text-6xl" }: { symbol: string; label: string; size?: string }) => (
    <span
      role="img"
      aria-label={label}
      className={`${size} inline-block select-none`}
      style={{
        fontFamily:
          '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Segoe UI Symbol","Noto Emoji",system-ui,sans-serif',
        lineHeight: 1,
      }}
    >
      {symbol}
    </span>
  );

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Dòng Thời Gian Chi Tiết</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Khám phá từng bước tiến của lịch sử vật liệu
        </p>

        {/* Timeline Visualization */}
        <div className="mb-12">
          <div className="relative h-2 bg-card rounded-full overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-slate-600 via-blue-600 via-purple-600 to-green-600 opacity-30" />
            <div
              className="absolute h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${((selectedEvent + 1) / timelineEvents.length) * 100}%`, transitionDuration: reduceMotion ? "0ms" : "300ms" }}
              aria-hidden="true"
            />
          </div>

          {/* Timeline Events */}
          <div className="flex justify-between gap-2 overflow-x-auto pb-4">
            {timelineEvents.map((evt, idx) => {
              const active = selectedEvent === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedEvent(idx)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedEvent(idx); }}
                  className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all
                    ${active ? "scale-125 ring-4 ring-primary shadow-lg shadow-primary/50" : "hover:scale-110 opacity-80 hover:opacity-100"}`}
                  title={evt.title}
                  aria-pressed={active}
                >
                  <Emoji symbol={evt.icon} label={evt.iconLabel} size="text-2xl" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Event Details */}
        <div className={`bg-gradient-to-br ${event.color} bg-opacity-10 border-2 border-primary rounded-2xl p-8 ${reduceMotion ? "" : "animate-scale-up"}`}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{event.yearLabel}</p>
              <h3 className="text-4xl font-bold mb-2">{event.title}</h3>
              <p className="text-lg text-muted-foreground">{event.description}</p>
            </div>
            <Emoji symbol={event.icon} label={event.iconLabel} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-border/50">
            <div>
              <h4 className="font-bold mb-3 text-primary">Phát Hiện</h4>
              <p className="text-sm leading-relaxed">{event.details.discovery}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-accent">Ảnh Hưởng</h4>
              <p className="text-sm leading-relaxed">{event.details.impact}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: "var(--chart-2)" }}>
                Công Nghệ
              </h4>
              <p className="text-sm leading-relaxed">{event.details.technology}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3" style={{ color: "var(--chart-3)" }}>
                Di Sản
              </h4>
              <p className="text-sm leading-relaxed">{event.details.legacy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Nếu chưa có trong globals.css, thêm:
@keyframes scale-up { 0% {transform: scale(.98); opacity: .9;} 100% {transform: scale(1); opacity: 1;} }
.animate-scale-up { animation: scale-up .3s ease both; }

@media (prefers-reduced-motion: reduce) {
  .animate-scale-up { animation: none !important; }
}
*/
