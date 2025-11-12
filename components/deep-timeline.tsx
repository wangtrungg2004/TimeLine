"use client";

import { useEffect, useState } from "react";

interface TimelineEvent {
  year: number;          // mốc khởi phát/biểu tượng của thời kỳ
  yearLabel: string;     // nhãn hiển thị (VD: "1824–nay")
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
    year: 1856,
    yearLabel: "1856–nay",
    title: "Sắt/Thép – Xương sống công nghiệp",
    description: "Vật liệu kỹ thuật cốt lõi của hạ tầng, vận tải và chế tạo.",
    material: "Sắt/Thép",
    icon: "🏗️",
    iconLabel: "Kết cấu thép",
    details: {
      discovery:
        "Quy trình Bessemer (1856) mở đường sản xuất thép hàng loạt; ngày nay thép hiện diện ở mọi khu vực kinh tế.",
      impact:
        "Thép chiếm phần lớn trong xây dựng & hạ tầng, cơ khí, ô tô; sản lượng toàn cầu ~1,9 tỷ tấn/năm.",
      technology:
        "Quặng sắt → gang → (BOF/EAF) → thép; AHSS, thép không gỉ; kinh tế tuần hoàn nhờ tái chế.",
      legacy:
        "‘Xương sống’ của công nghiệp hiện đại, tiếp tục nâng cấp bằng công nghệ luyện thép xanh và tái chế."
    },
    color: "from-slate-600 to-slate-800",
  },
  {
    year: 1859,
    yearLabel: "CN hoá: 1859–nay",
    title: "Than đá/Dầu mỏ – Năng lượng hoá thạch",
    description: "Nguồn năng lượng nền tảng của công nghiệp và giao thông thế kỷ 20–21.",
    material: "Than đá & Dầu mỏ",
    icon: "🛢️",
    iconLabel: "Thùng dầu",
    details: {
      discovery:
        "Giếng dầu thương mại đầu tiên (Drake, 1859) đánh dấu kỷ nguyên dầu mỏ; than là trụ cột điện lực và luyện kim.",
      impact:
        "Trong nhiều thập kỷ, ~80% cung năng lượng đến từ dầu/than/khí; than vẫn là nguồn điện lớn nhất toàn cầu.",
      technology:
        "Khai thác & lọc dầu, cracking, hoá dầu; nhiệt điện than/khí; CCS/CCUS đang được thử nghiệm.",
      legacy:
        "Vừa là nền tảng tăng trưởng, vừa là áp lực giảm phát thải—chuyển dịch năng lượng đang diễn ra."
    },
    color: "from-amber-700 to-amber-900",
  },
  {
    year: 1824,
    yearLabel: "1824–nay",
    title: "Xi măng/Bê tông – Cơ sở hạ tầng",
    description: "Vật liệu nhân tạo được dùng nhiều thứ nhì sau nước.",
    material: "Xi măng & Bê tông",
    icon: "🧱",
    iconLabel: "Khối bê tông/gạch",
    details: {
      discovery:
        "Portland cement được cấp bằng sáng chế năm 1824; bê tông hiện diện trong hầu hết công trình xây dựng.",
      impact:
        "Thế giới dùng ~30 tỷ tấn bê tông/năm; sản xuất xi măng đóng góp >7% CO₂ do con người.",
      technology:
        "Clinker (CaCO₃ → CaO) + phụ gia (SCM), bê tông cốt thép, UHPC; tối ưu phối liệu, thay nhiên liệu, và bắt giữ carbon.",
      legacy:
        "Trụ cột đô thị hóa; trọng tâm cải tiến là giảm phát thải chuỗi giá trị xi măng-bê tông."
    },
    color: "from-zinc-600 to-neutral-800",
  },
  {
    year: 1907,
    yearLabel: "1907–nay",
    title: "Nhựa/Hóa dầu – Tiêu dùng đại trà",
    description: "Vật liệu nhẹ, rẻ, gia công linh hoạt cho hàng hóa toàn cầu.",
    material: "Nhựa & Hoá dầu",
    icon: "🧴",
    iconLabel: "Chai nhựa",
    details: {
      discovery:
        "Bakelite (1907) mở kỷ nguyên nhựa tổng hợp; sau đó là polyethylene, PVC, PET, nylon…",
      impact:
        "Sản lượng nhựa đã tăng gấp đôi 2000–2019 lên ~460 triệu tấn; tái chế còn hạn chế → áp lực môi trường.",
      technology:
        "Cracking dầu/khí → monomer → polymer; tái chế cơ học/hóa học; vật liệu sinh học/thay thế đang nổi.",
      legacy:
        "Xương sống bao bì, dệt may, y tế, ô tô… đồng thời là ưu tiên hàng đầu của kinh tế tuần hoàn."
    },
    color: "from-blue-500 to-indigo-600",
  },
  {
    year: 1947,
    yearLabel: "1947–nay",
    title: "Silicon/Bán dẫn – Kinh tế số",
    description: "Con chip là nền tảng của máy tính, viễn thông và AI.",
    material: "Bán dẫn",
    icon: "💻",
    iconLabel: "Máy tính/chip",
    details: {
      discovery:
        "Transistor (1947) và vi mạch tích hợp mở ra thời đại số; chuỗi cung ứng toàn cầu phức tạp.",
      impact:
        "Ngành bán dẫn >600 tỷ USD/năm, kích hoạt hàng nghìn tỷ USD hoạt động số và sản xuất công nghệ cao.",
      technology:
        "Wafer silicon, EUV, đóng gói tiên tiến; bộ xử lý, bộ nhớ, cảm biến; vật liệu & node tiến tới 2 nm.",
      legacy:
        "Hạ tầng cốt lõi của AI/điện toán/5G; năng lực chip quyết định năng suất và an ninh kinh tế."
    },
    color: "from-purple-600 to-pink-600",
  },
  {
    year: 1991,
    yearLabel: "1991–nay",
    title: "Pin Lithium – Chuyển đổi năng lượng",
    description: "Nguồn trữ điện chủ đạo cho thiết bị, xe điện và lưới điện.",
    material: "Pin Li-ion",
    icon: "🔋",
    iconLabel: "Pin sạc",
    details: {
      discovery:
        "Sony thương mại hóa pin Li-ion năm 1991; chi phí và mật độ năng lượng cải thiện mạnh.",
      impact:
        "Pin lưu trữ là công nghệ năng lượng sạch tăng nhanh nhất; Li-ion thống trị EV và lưu trữ điện.",
      technology:
        "NMC/NCA/LFP, cathode/anode, gigafactory; LFP giá thấp nổi trội ở EV & ESS; chuỗi cung ứng toàn cầu.",
      legacy:
        "Trụ cột điện hoá giao thông và tích trữ tái tạo; đổi mới hoá học & tái chế sẽ quyết định quy mô thị trường."
    },
    color: "from-emerald-600 to-teal-600",
  },
  {
    year: 2004,
    yearLabel: "2004–nay",
    title: "Vật liệu nano/Composite – Công nghệ tương lai",
    description: "Nhẹ–bền–tính năng cao cho hàng không, năng lượng, y sinh.",
    material: "Nano/Composite",
    icon: "🧬",
    iconLabel: "Vật liệu tiên tiến",
    details: {
      discovery:
        "Bước ngoặt graphene (2004) và bùng nổ composite sợi carbon; thương mại hoá sâu trong hàng không.",
      impact:
        "Máy bay thế hệ mới dùng ~50% vật liệu composite; nano-vật liệu mở đường cho cảm biến, pin, y sinh.",
      technology:
        "CFRP, GFRP, prepreg, in-situ curing; graphene, CNT, vật liệu 2D; ứng dụng cánh gió, ô tô, điện tử linh hoạt.",
      legacy:
        "Nâng hiệu suất – giảm khối lượng – tiết kiệm năng lượng; là nền tảng cho thiết kế thế hệ tiếp theo."
    },
    color: "from-cyan-600 to-sky-700",
  },
];

export default function DeepTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(4); // mặc định chọn Silicon/Bán dẫn
  const event = timelineEvents[selectedEvent];

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          7 Nhóm Vật Liệu Chi Phối Kinh Tế Hiện Đại
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Mỗi mốc gồm nguồn gốc – tác động – công nghệ – di sản/triển vọng.
        </p>

        {/* Timeline Visualization */}
        <div className="mb-12">
          <div className="relative h-2 bg-card rounded-full overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-slate-600 via-blue-600 via-purple-600 to-green-600 opacity-30" />
            <div
              className="absolute h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{
                width: `${((selectedEvent + 1) / timelineEvents.length) * 100}%`,
                transitionDuration: reduceMotion ? "0ms" : "300ms",
              }}
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
              <h4 className="font-bold mb-3 text-primary">Phát Hiện / Khởi phát</h4>
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
                Di Sản / Thực tiễn
              </h4>
              <p className="text-sm leading-relaxed">{event.details.legacy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

