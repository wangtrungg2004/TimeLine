"use client"

import { useMemo, useState } from "react"

type MetricId = "prod" | "finish" | "recycle" | "co2" | "defense"

interface Material {
  name: string
  emoji: string
  desc: string

  // Chi phí sản xuất
  prodCostValue: number         // dùng chuẩn hoá vẽ thanh
  prodCostText: string          // hiển thị nhãn

  // Giá trị hoàn thiện
  finishValue: number
  finishText: string            // có thể khác đơn vị (tấn/wafer/kWh)

  // Tái chế
  recycleValuePct: number
  recycleText: string

  // CO2
  co2Value: number              // quy hết về "kg CO2 trên đơn vị chức năng"
  co2Text: string

  // Ứng dụng quốc phòng
  defenseValuePct: number
  defenseText: string
}

const MATERIALS: Material[] = [
  {
    name: "Sắt/Thép",
    emoji: "🏗️",
    desc: "Trụ cột hạ tầng & chế tạo toàn cầu.",
    prodCostValue: 120,
    prodCostText: "120 (quặng) → 600 (thép) USD/tấn",
    finishValue: 600,
    finishText: "600 USD/tấn (thép)",
    recycleValuePct: 90,
    recycleText: "≈ 90% toàn cầu",
    co2Value: 1800,
    co2Text: "≈ 1.8 t CO₂/t thép",
    defenseValuePct: 70,
    defenseText: "Tàu sân bay, xe tăng (≈70%)",
  },
  {
    name: "Than đá/Dầu mỏ",
    emoji: "🛢️",
    desc: "Nền tảng năng lượng & hoá dầu thế kỷ 20–21.",
    prodCostValue: 110,
    prodCostText: "80–110 (thô) → 1,200 (xăng/nhựa) USD/tấn",
    finishValue: 1200,
    finishText: "1,200 USD/tấn (sản phẩm tinh)",
    recycleValuePct: 0,
    recycleText: "≈0% (năng lượng) / ≈30% (nhựa)",
    co2Value: 2500, // dùng kịch bản than để vẽ thanh
    co2Text: "≈ 2.5 (than) / 0.4 (dầu) t CO₂",
    defenseValuePct: 99,
    defenseText: "Nhiên liệu máy bay, tên lửa (≈99%)",
  },
  {
    name: "Xi măng",
    emoji: "🧱",
    desc: "VLXD phổ biến nhất (sau nước) trong đô thị hoá.",
    prodCostValue: 30,
    prodCostText: "30 (đá vôi) → 120 USD/tấn",
    finishValue: 120,
    finishText: "120 USD/tấn (xi măng)",
    recycleValuePct: 70,
    recycleText: "0% (xi măng) / ≈70% (bê tông tái sử dụng)",
    co2Value: 900,
    co2Text: "≈ 0.9 t CO₂/t xi măng",
    defenseValuePct: 50,
    defenseText: "Hầm ngầm, căn cứ (≈50%)",
  },
  {
    name: "Nhựa/Hóa dầu",
    emoji: "🧪",
    desc: "VL nhẹ–rẻ cho tiêu dùng & công nghiệp.",
    prodCostValue: 80,
    prodCostText: "80 (dầu) → 1,500 (PE) USD/tấn",
    finishValue: 1500,
    finishText: "1,500 USD/tấn (PE)",
    recycleValuePct: 9,
    recycleText: "≈ 9% toàn cầu",
    co2Value: 2000,
    co2Text: "≈ 2.0 t CO₂/t nhựa",
    defenseValuePct: 30,
    defenseText: "Drone, bảo hộ (≈30%)",
  },
  {
    name: "Silicon/Bán dẫn",
    emoji: "💻",
    desc: "Hạ tầng lõi cho điện toán, viễn thông & AI.",
    prodCostValue: 2.5,
    prodCostText: "2.5 (cát) → 150,000 (wafer 3nm) USD",
    finishValue: 150000,
    finishText: "150,000 USD/wafer 3nm",
    recycleValuePct: 1,
    recycleText: "< 1%",
    co2Value: 50,
    co2Text: "≈ 50 kg CO₂/wafer",
    defenseValuePct: 90,
    defenseText: "Radar, AI, tên lửa (≈90%)",
  },
  {
    name: "Pin Lithium",
    emoji: "🔋",
    desc: "Trụ cột điện hoá giao thông & lưu trữ lưới.",
    prodCostValue: 12000,
    prodCostText: "12,000 USD/t Li₂CO₃",
    finishValue: 120000,          // theo bảng bạn đưa (USD/kWh)
    finishText: "120,000 USD/kWh",
    recycleValuePct: 5,
    recycleText: "≈5% → mục tiêu ~95% (2030)",
    co2Value: 150,
    co2Text: "≈ 60–150 kg CO₂/kWh",
    defenseValuePct: 60,
    defenseText: "Drone, tàu ngầm điện (≈60%)",
  },
  {
    name: "Nano/Composite",
    emoji: "🚀",
    desc: "Nhẹ–bền–tính năng cao cho hàng không & quốc phòng.",
    prodCostValue: 5000,
    prodCostText: "5,000 (đất hiếm) → 2.5 triệu (graphene) USD/tấn",
    finishValue: 2_500_000,
    finishText: "2,500,000 USD/tấn (graphene)",
    recycleValuePct: 0,
    recycleText: "≈ 0%",
    co2Value: 100,
    co2Text: "≈ 10–100 kg (tuỳ quy trình)",
    defenseValuePct: 20,
    defenseText: "Áo giáp, vũ khí năng lượng (≈20%)",
  },
]

// Định nghĩa các chỉ số có thể chọn
const METRICS: { id: MetricId; label: string; hint?: string; value: (m: Material) => number; text: (m: Material) => string; isPercent?: boolean; lowerIsBetter?: boolean }[] = [
  { id: "prod", label: "Chi phí sản xuất", value: m => m.prodCostValue, text: m => m.prodCostText },
  { id: "finish", label: "Giá trị hoàn thiện", value: m => m.finishValue, text: m => m.finishText },
  { id: "recycle", label: "Tái chế toàn cầu", value: m => m.recycleValuePct, text: m => m.recycleText, isPercent: true, hint: "↑ cao hơn là tốt" },
  { id: "co2", label: "CO₂", value: m => m.co2Value, text: m => m.co2Text, lowerIsBetter: true, hint: "↓ thấp hơn là tốt" },
  { id: "defense", label: "Ứng dụng quốc phòng", value: m => m.defenseValuePct, text: m => m.defenseText, isPercent: true },
]

// Chuẩn hoá thanh theo căn bậc hai để tránh mục quá lớn lấn át
function useNormalizer(vals: number[]) {
  const max = Math.max(...vals.map(v => (v > 0 ? v : 0.0001)))
  return (v: number) => Math.round(Math.sqrt(v / max) * 100) // 0–100
}

export default function MaterialMetricsDrilldown() {
  const [metric, setMetric] = useState<MetricId>("prod")
  const current = METRICS.find(x => x.id === metric)!

  const values = useMemo(() => MATERIALS.map(current.value), [metric])
  const toPct = useNormalizer(values)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-3">So sánh địa chính trị về vật liệu</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Chọn <b>chỉ số</b> bên dưới để xem ngay danh sách vật liệu với <b>mô tả ngắn</b> và <b>thanh so sánh</b> cho chỉ số đó.
        </p>
      </div>

      {/* Thanh chọn CHỈ SỐ (segmented buttons) */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {METRICS.map(m => {
          const active = m.id === metric
          return (
            <button
              key={m.id}
              onClick={() => setMetric(m.id)}
              className={`px-4 py-2 rounded-full border transition-all text-sm
                ${active ? "border-primary bg-primary/10 font-semibold" : "border-border bg-card hover:border-primary/50"}`}
              title={m.hint ?? ""}
              aria-pressed={active}
            >
              {m.label}
            </button>
          )
        })}
      </div>

      {/* Danh sách vật liệu cho CHỈ SỐ đang chọn */}
      <div className="space-y-4">
        {MATERIALS.map((m) => {
          const raw = current.value(m)
          // Nếu là CO₂ và "lower is better", có thể tô nhãn khác; thanh vẫn thể hiện độ lớn tuyệt đối
          const widthPct = toPct(Math.max(raw, 0.0001))
          return (
            <div key={m.name} className="bg-card/50 border border-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{m.emoji}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </div>

                {/* Giá trị & đơn vị gốc */}
                <div className="text-right min-w-[220px]">
                  <p className="text-xs text-muted-foreground">{current.label}</p>
                  <p className="text-sm font-semibold">
                    {current.text(m)}
                    {current.id === "recycle" || current.id === "defense" ? "" : ""}
                  </p>
                </div>
              </div>

              {/* Thanh so sánh */}
              <div className="mt-3">
                <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r from-primary to-accent h-full`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
                {current.hint && (
                  <p className="text-xs text-muted-foreground mt-1">{current.hint}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        *Thanh so sánh là <i>tương đối</i> trong từng chỉ số; giá trị/đơn vị hiển thị theo từng vật liệu. Thiết kế dùng{" "}
        <span className="font-medium">segmented buttons</span> & <span className="font-medium">progressive disclosure</span> để giảm tải nhận thức khi so sánh nhiều chiều.
      </p>
    </section>
  )
}
