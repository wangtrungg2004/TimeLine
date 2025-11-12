"use client"

import { useState } from "react"

interface EvolutionData {
  period: string
  materials: { name: string; percentage: number; color: string }[]
}

const evolutionData: EvolutionData[] = [
  {
    period: "Thời Đá (≈3,3M - 3300 TCN)",
    materials: [
      { name: "Đá", percentage: 80, color: "bg-gray-600" },
      { name: "Gỗ", percentage: 20, color: "bg-amber-900" },
    ],
  },
  {
    period: "Thời Đồng (3300 - 1200 TCN)",
    materials: [
      { name: "Đá", percentage: 25, color: "bg-gray-600" },
      { name: "Gỗ", percentage: 20, color: "bg-amber-900" },
      { name: "Đồng (Bronze)", percentage: 45, color: "bg-amber-600" },
      { name: "Đồng (nguyên chất)", percentage: 10, color: "bg-orange-500" },
    ],
  },
  {
    period: "Thời Sắt (1200 TCN - 500 CN)",
    materials: [
      { name: "Sắt", percentage: 50, color: "bg-slate-700" },
      { name: "Gỗ", percentage: 20, color: "bg-amber-900" },
      { name: "Đồng/Bronze", percentage: 20, color: "bg-amber-600" },
      { name: "Thủy tinh", percentage: 10, color: "bg-teal-500" },
    ],
  },
  {
    period: "Thời Trung Cổ (500 - 1500)",
    materials: [
      { name: "Gỗ", percentage: 40, color: "bg-amber-900" },
      { name: "Đá/Xây khối", percentage: 25, color: "bg-gray-600" },
      { name: "Sắt", percentage: 25, color: "bg-slate-700" },
      { name: "Thủy tinh", percentage: 10, color: "bg-teal-500" },
    ],
  },
  {
    period: "Cách Mạng Công Nghiệp (1760 - 1900)",
    materials: [
      { name: "Thép", percentage: 35, color: "bg-slate-500" },
      { name: "Xi măng/Bê tông", percentage: 25, color: "bg-neutral-500" },
      { name: "Sắt", percentage: 15, color: "bg-slate-700" },
      { name: "Thủy tinh", percentage: 10, color: "bg-teal-500" },
      { name: "Gỗ", percentage: 5, color: "bg-amber-900" },
      { name: "Nhôm", percentage: 10, color: "bg-gray-400" },
    ],
  },
  {
    period: "Thế Kỷ 20 (1900 - 2000)",
    materials: [
      { name: "Xi măng/Bê tông", percentage: 35, color: "bg-neutral-500" },
      { name: "Thép", percentage: 25, color: "bg-slate-500" },
      { name: "Nhựa/Hóa dầu", percentage: 20, color: "bg-blue-500" },
      { name: "Nhôm", percentage: 10, color: "bg-gray-400" },
      { name: "Đồng", percentage: 10, color: "bg-orange-500" },
    ],
  },
  {
    period: "Hiện Đại (2000 - 2025)",
    materials: [
      { name: "Xi măng/Bê tông", percentage: 28, color: "bg-neutral-500" },
      { name: "Nhựa/Hóa dầu", percentage: 20, color: "bg-blue-500" },
      { name: "Thép", percentage: 18, color: "bg-slate-500" },
      { name: "Bán dẫn (Silicon)", percentage: 12, color: "bg-purple-600" },
      { name: "Composite", percentage: 12, color: "bg-cyan-500" },
      { name: "Pin Lithium", percentage: 10, color: "bg-emerald-600" },
    ],
  },
]

export default function InteractiveEvolutionChart() {
  const [selectedPeriod, setSelectedPeriod] = useState(6)
  const current = evolutionData[selectedPeriod]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">
          Tiến Hóa Vật Liệu Qua Thời Đại
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Nhấp vào các giai đoạn để khám phá sự thay đổi
        </p>

        {/* Timeline Selector */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          {evolutionData.map((data, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPeriod(idx)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedPeriod === idx
                  ? "bg-primary text-primary-foreground scale-110"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {data.period.split("(")[0].trim()}
            </button>
          ))}
        </div>

        {/* Current Period Display */}
        <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-2">{current.period}</h3>
          <p className="text-muted-foreground mb-8">
            {selectedPeriod === 0 && "Công cụ đá xuất hiện rất sớm; gỗ hỗ trợ nhà ở,燃料 và thuyền mộc."}
            {selectedPeriod === 1 && "Hợp kim đồng–thiếc (bronze) mở ra công cụ/vũ khí bền, cùng gỗ và đá."}
            {selectedPeriod === 2 && "Luyện sắt phổ biến, thủy tinh bắt đầu lan rộng trong xây dựng/đồ dùng."}
            {selectedPeriod === 3 && "Kiến trúc gỗ–đá chiếm ưu thế; sắt và kính phục vụ đô thị/trade."}
            {selectedPeriod === 4 && "Bessemer + xi măng/Portland thúc đẩy kết cấu thép–bê tông; nhôm công nghiệp hoá."}
            {selectedPeriod === 5 && "Bê tông, thép, nhựa và nhôm tạo nên hạ tầng–tiêu dùng đại trà thế kỷ 20."}
            {selectedPeriod === 6 && "Bê tông/thép vẫn nền tảng; bán dẫn, composite và pin lithium định hình kỷ nguyên số & năng lượng."}
          </p>

        {/* Stacked Bar Chart */}
          <div className="space-y-4">
            <div className="flex h-16 rounded-lg overflow-hidden border border-border/50 shadow-lg">
              {current.materials.map((mat, idx) => (
                <div
                  key={idx}
                  className={`${mat.color} transition-all duration-500 flex items-center justify-center text-white font-bold text-sm hover:opacity-80 cursor-pointer group relative`}
                  style={{ width: `${mat.percentage}%` }}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">{mat.percentage}%</span>
                  <div className="absolute bottom-full mb-2 bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {mat.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {current.materials.map((mat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${mat.color}`} />
                  <span className="text-sm">{mat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          *Tỷ lệ là minh hoạ trực quan để thấy “vai trò tương đối” của vật liệu từng giai đoạn (không phải số liệu khối lượng tuyệt đối).
        </p>
      </div>
    </section>
  )
}
