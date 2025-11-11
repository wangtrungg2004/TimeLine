"use client"

import { useState } from "react"

interface EvolutionData {
  period: string
  materials: { name: string; percentage: number; color: string }[]
}

const evolutionData: EvolutionData[] = [
  {
    period: "Thời Đá (3M - 3000 TCN)",
    materials: [{ name: "Đá", percentage: 100, color: "bg-gray-600" }],
  },
  {
    period: "Thời Đồng (3000 - 1200 TCN)",
    materials: [
      { name: "Đá", percentage: 70, color: "bg-gray-600" },
      { name: "Đồng", percentage: 30, color: "bg-amber-600" },
    ],
  },
  {
    period: "Thời Sắt (1200 TCN - 500 CN)",
    materials: [
      { name: "Đá", percentage: 40, color: "bg-gray-600" },
      { name: "Sắt", percentage: 50, color: "bg-slate-600" },
      { name: "Gỗ", percentage: 10, color: "bg-amber-900" },
    ],
  },
  {
    period: "Thời Trung Cổ (500 - 1500)",
    materials: [
      { name: "Gỗ", percentage: 50, color: "bg-amber-900" },
      { name: "Sắt", percentage: 40, color: "bg-slate-600" },
      { name: "Đá", percentage: 10, color: "bg-gray-600" },
    ],
  },
  {
    period: "Cách Mạng Công Nghiệp (1760 - 1840)",
    materials: [
      { name: "Thép", percentage: 60, color: "bg-slate-500" },
      { name: "Gỗ", percentage: 30, color: "bg-amber-900" },
      { name: "Khác", percentage: 10, color: "bg-gray-500" },
    ],
  },
  {
    period: "Thế Kỷ 20 (1900 - 2000)",
    materials: [
      { name: "Thép", percentage: 40, color: "bg-slate-500" },
      { name: "Nhựa", percentage: 35, color: "bg-blue-500" },
      { name: "Aluminum", percentage: 15, color: "bg-gray-400" },
      { name: "Khác", percentage: 10, color: "bg-gray-500" },
    ],
  },
  {
    period: "Hiện Đại (2000 - 2024)",
    materials: [
      { name: "Bán Dẫn", percentage: 30, color: "bg-purple-600" },
      { name: "Nhựa", percentage: 25, color: "bg-blue-500" },
      { name: "Thép", percentage: 20, color: "bg-slate-500" },
      { name: "Composite", percentage: 15, color: "bg-cyan-500" },
      { name: "Khác", percentage: 10, color: "bg-gray-500" },
    ],
  },
]

export default function InteractiveEvolutionChart() {
  const [selectedPeriod, setSelectedPeriod] = useState(6)

  const current = evolutionData[selectedPeriod]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Tiến Hóa Vật Liệu Qua Thời Đại</h2>
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
            {selectedPeriod === 0 && "Con người bắt đầu sử dụng đá để tạo công cụ và xây dựng"}
            {selectedPeriod === 1 && "Phát hiện hợp kim đồng đánh dấu bước ngoặt trong lịch sử"}
            {selectedPeriod === 2 && "Sắt trở thành vật liệu chủ đạo, thay đổi chiến tranh và xây dựng"}
            {selectedPeriod === 3 && "Gỗ vẫn là vật liệu chính, nhưng sắt ngày càng quan trọng"}
            {selectedPeriod === 4 && "Thép cách mạng hóa xây dựng, giao thông và công nghiệp"}
            {selectedPeriod === 5 && "Nhựa xuất hiện, thép vẫn thống trị, aluminum phát triển"}
            {selectedPeriod === 6 && "Bán dẫn dẫn đầu, nhựa phổ biến, composite mới nổi"}
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
      </div>
    </section>
  )
}
