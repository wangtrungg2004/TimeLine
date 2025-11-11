"use client";

import { useEffect, useState } from "react";

type EventItem = {
  year: string;
  title: string;
  description: string;
  icon: string;
  iconLabel: string;
  details: string;
  impact: string;
  materials?: { name: string; note: string }[];
};

const EVENTS: EventItem[] = [
  {
    year: "2,5 triệu năm TCN → 3300 TCN",
    title: "Thời kỳ Đá",
    description:
      "Công cụ đá, lửa và gốm nung sơ khai; định cư – sản xuất tự cung tự cấp.",
    icon: "🪨",
    iconLabel: "Đá",
    details:
      "Công cụ đá cho phép săn bắt, chế biến, bảo vệ và xây trú ẩn. Gốm nung mở đầu lưu trữ & nấu chín.",
    impact: "Đặt nền móng lao động sản xuất – phân công đơn giản.",
    materials: [
      { name: "Đá lửa / obsidian", note: "Sắc bén → dao, nạo, mũi nhọn." },
      { name: "Đất sét & gốm nung", note: "Dụng cụ chứa, nấu, bảo quản." },
      { name: "Gỗ, tre/nứa", note: "Khung, cán, nhà ở đơn giản." },
      { name: "Xương/sừng & da thuộc", note: "Kim, lưỡi câu, dây buộc." },
      { name: "Nhựa cây, hắc ín (bitumen)", note: "Kết dính, chống thấm." },
    ],
  },
  {
    year: "3300 TCN → 500 TCN",
    title: "Thời kỳ Đồng & Sắt",
    description:
      "Luyện kim và hợp kim; đô thị cổ & thương mại đường bộ/đường thủy.",
    icon: "⚒️",
    iconLabel: "Búa thợ rèn",
    details:
      "Bronze (đồng-thiếc) cứng bền; tiếp đó Iron (sắt) phổ biến hơn, thay đổi nông nghiệp & quân sự.",
    impact: "Thặng dư sản xuất, mầm mống kinh tế hàng hóa & đô thị hóa.",
    materials: [
      { name: "Đồng thiếc (bronze)", note: "Cứng hơn đồng đỏ → vũ khí/nông cụ." },
      { name: "Đồng kẽm (brass)", note: "Chống ăn mòn, nhạc cụ/đồ trang trí." },
      { name: "Sắt rèn, gang", note: "Dụng cụ bền, chi phí thấp hơn đồng." },
      { name: "Gốm chịu lửa, than củi", note: "Luyện kim, đúc khuôn." },
      { name: "Vữa vôi, gạch nung", note: "Kiến trúc đô thị cổ." },
    ],
  },
  {
    year: "TK 18 → đầu TK 20",
    title: "Vật liệu công nghiệp (CMCN 1.0–2.0)",
    description:
      "Thép, bê tông, đường sắt, nhà máy; năng suất bùng nổ & thương mại toàn cầu.",
    icon: "🏭",
    iconLabel: "Nhà máy",
    details:
      "Bessemer/Open-Hearth cho thép rẻ; xi măng Portland + bê tông cốt thép → công trình lớn.",
    impact: "Công nghiệp hóa thay nông nghiệp; hình thành mạng lưới toàn cầu.",
    materials: [
      { name: "Thép carbon/hợp kim", note: "Cầu, đường ray, máy móc." },
      { name: "Xi măng Portland, bê tông", note: "Hạ tầng bền, rẻ." },
      { name: "Kính công nghiệp", note: "Nhà xưởng, đô thị hiện đại." },
      { name: "Than đá/cốc; dầu mỏ", note: "Năng lượng & hóa dầu." },
      { name: "Cao su, Bakelite/Celluloid", note: "Sản xuất hàng loạt." },
    ],
  },
  {
    year: "Giữa TK 20 → nay",
    title: "Vật liệu hiện đại (3.0–4.0)",
    description:
      "Bán dẫn, polymer kỹ thuật & composite; internet, điện toán đám mây, AI.",
    icon: "💡",
    iconLabel: "Bóng đèn",
    details:
      "Silicon nền tảng bán dẫn; polymer kỹ thuật & composite cho nhẹ-bền; vật liệu nano & quang.",
    impact: "Kinh tế số & đổi mới sáng tạo dẫn dắt tăng trưởng.",
    materials: [
      { name: "Silicon, GaN, SiC", note: "Vi điện tử, công suất cao." },
      { name: "PC/ABS, PEEK/PEI, PTFE", note: "Nhựa kỹ thuật chịu nhiệt/cơ." },
      { name: "CFRP/Kevlar, GFRP", note: "Nhẹ bền: hàng không, xe thể thao." },
      { name: "Graphene, CNT, ITO", note: "Nano/hiển thị/màng dẫn trong." },
      { name: "Pin Li-ion, màng PEM", note: "Năng lượng di động & H₂." },
    ],
  },
  {
    year: "Thế kỷ 21+",
    title: "Vật liệu xanh & tuần hoàn",
    description:
      "Tái chế/sinh học/thấp carbon; kinh tế tuần hoàn & năng lượng sạch.",
    icon: "🌍",
    iconLabel: "Trái đất",
    details:
      "Giảm phát thải vòng đời, thay thế vật liệu hiếm, đóng vòng tái chế.",
    impact: "Bền vững trở thành lợi thế cạnh tranh.",
    materials: [
      { name: "Nhôm tái chế; thép xanh", note: "Tiết kiệm năng lượng lớn." },
      { name: "rPET/rHDPE; PLA/PHA", note: "Nhựa tái chế/sinh học." },
      { name: "CLT/LVL; tre ép; mycelium", note: "Xây dựng sinh học." },
      { name: "Geopolymer; xi măng hấp thụ CO₂", note: "Giảm CO₂ xây dựng." },
      { name: "PV perovskite; Na-ion/solid-state", note: "Điện mặt trời & lưu trữ." },
    ],
  },
];

export default function InteractiveTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [selectedMaterial, setSelectedMaterial] = useState<{ name: string; note: string } | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Emoji component với font-stack để tránh “ô vuông”
  const Emoji = ({ symbol, label }: { symbol: string; label: string }) => (
    <span
      role="img"
      aria-label={label}
      className="inline-block select-none"
      style={{
        fontFamily:
          '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Segoe UI Symbol","Noto Emoji",system-ui,sans-serif',
        fontSize: "1.75rem",
        lineHeight: 1,
      }}
    >
      {symbol}
    </span>
  );

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Dòng thời gian tương tác</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Nhấp để mở mốc – chạm vào “vật liệu tiêu biểu” để xem vì sao chúng quan trọng.
        </p>
      </div>

      <div className="relative">
        {/* Trục timeline */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary rounded-full" />

        <div className="space-y-8">
          {EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isOpen = expandedIndex === index;

            return (
              <div
                key={index}
                className={`flex gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Nội dung */}
                <div
                  className={`w-full sm:w-5/12 ${
                    reduceMotion ? "" : "motion-safe:animate-[slide-in-up_0.6s_ease]"
                  }`}
                  style={{ animationDelay: reduceMotion ? undefined : `${index * 0.08}s` }}
                >
                  <article
                    className={`bg-card border rounded-lg p-6 transition-all duration-300 ${
                      isOpen ? "border-primary bg-card/80 shadow-lg shadow-primary/20" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <header className="flex items-start justify-between mb-3">
                      <Emoji symbol={event.icon} label={event.iconLabel} />
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                        {event.year}
                      </span>
                    </header>

                    <button
                      className="text-left w-full"
                      onClick={() => setExpandedIndex(isOpen ? null : index)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setExpandedIndex(isOpen ? null : index);
                      }}
                      aria-expanded={isOpen}
                    >
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {isOpen ? "Nhấp để đóng" : "Nhấp để xem chi tiết"}
                      </div>
                    </button>

                    {/* Nội dung mở rộng */}
                    {isOpen && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-foreground mb-3">{event.details}</p>
                        <p className="text-primary font-semibold text-sm mb-3">💡 {event.impact}</p>

                        {event.materials && (
                          <div>
                            <p className="text-sm font-medium mb-2">Vật liệu tiêu biểu:</p>
                            <div className="flex flex-wrap gap-2">
                              {event.materials.map((m, i) => (
                                <button
                                  key={i}
                                  className={`text-xs px-2 py-1 rounded border transition ${
                                    selectedMaterial?.name === m.name
                                      ? "border-primary text-primary bg-primary/10"
                                      : "border-border hover:border-primary/50 text-muted-foreground"
                                  }`}
                                  onClick={() => setSelectedMaterial(m)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") setSelectedMaterial(m);
                                  }}
                                  aria-pressed={selectedMaterial?.name === m.name}
                                  title={m.note}
                                >
                                  {m.name}
                                </button>
                              ))}
                            </div>

                            {/* Gợi ý vì sao quan trọng */}
                            {selectedMaterial && (
                              <div className="mt-3 text-sm bg-muted/50 border border-border rounded p-3">
                                <strong>{selectedMaterial.name}:</strong> {selectedMaterial.note}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                </div>

                {/* Nút mốc */}
                <div className="w-2/12 flex justify-center">
                  <div
                    className={`w-4 h-4 bg-primary rounded-full border-4 border-background mt-6 transition-all ${
                      isOpen ? "animate-pulse scale-125" : ""
                    }`}
                    aria-hidden="true"
                  />
                </div>

                {/* Cột trống đối xứng */}
                <div className="w-5/12 hidden sm:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Thêm (nếu chưa có) vào globals.css:
@keyframes slide-in-up { 0% {opacity:0; transform: translateY(12px);} 100% {opacity:1; transform: translateY(0);} }
.motion-safe\:animate-\[slide-in-up_0.6s_ease] { animation: slide-in-up 0.6s ease both; }
*/
