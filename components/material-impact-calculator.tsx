"use client"

import { useState } from "react"

export default function MaterialImpactCalculator() {
  const [year, setYear] = useState(1950)
  const [selectedMaterial, setSelectedMaterial] = useState("steel")

  const materialData: Record<string, Record<number, { gdp: number; production: number; jobs: number }>> = {
    steel: {
      1950: { gdp: 2.5, production: 190, jobs: 500 },
      1970: { gdp: 8.5, production: 595, jobs: 1200 },
      1990: { gdp: 18.5, production: 730, jobs: 1800 },
      2010: { gdp: 35.2, production: 1200, jobs: 2500 },
      2024: { gdp: 52.8, production: 1900, jobs: 3200 },
    },
    plastic: {
      1950: { gdp: 0.1, production: 2, jobs: 50 },
      1970: { gdp: 1.2, production: 25, jobs: 300 },
      1990: { gdp: 8.5, production: 110, jobs: 1000 },
      2010: { gdp: 25.3, production: 265, jobs: 2000 },
      2024: { gdp: 48.5, production: 420, jobs: 3500 },
    },
    semiconductor: {
      1950: { gdp: 0, production: 0, jobs: 0 },
      1970: { gdp: 0.5, production: 5, jobs: 100 },
      1990: { gdp: 12.5, production: 85, jobs: 800 },
      2010: { gdp: 45.2, production: 350, jobs: 2200 },
      2024: { gdp: 125.8, production: 1050, jobs: 4500 },
    },
  }

  const years = [1950, 1970, 1990, 2010, 2024]
  const data = materialData[selectedMaterial][year as keyof (typeof materialData)[string]]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Máy Tính Ảnh Hưởng Kinh Tế</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Khám phá cách các vật liệu thay đổi nền kinh tế toàn cầu
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Material Selector */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-3">Chọn Vật Liệu</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(materialData).map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedMaterial === mat ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  {mat === "steel" && "🔩 Thép"}
                  {mat === "plastic" && "🧪 Nhựa"}
                  {mat === "semiconductor" && "💻 Bán Dẫn"}
                </button>
              ))}
            </div>
          </div>

          {/* Year Slider */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-3">
              Năm: <span className="text-primary font-bold">{year}</span>
            </label>
            <input
              type="range"
              min="1950"
              max="2024"
              step="20"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full h-2 bg-card rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              {years.map((y) => (
                <span key={y}>{y}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all hover:scale-105">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-muted-foreground text-sm mb-2">Đóng Góp GDP</p>
            <p className="text-3xl font-bold text-primary">${data.gdp}T</p>
            <p className="text-xs text-muted-foreground mt-2">Tỷ USD</p>
          </div>

          <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6 hover:border-accent/50 transition-all hover:scale-105">
            <div className="text-4xl mb-2">🏭</div>
            <p className="text-muted-foreground text-sm mb-2">Sản Xuất Toàn Cầu</p>
            <p className="text-3xl font-bold text-accent">{data.production}M</p>
            <p className="text-xs text-muted-foreground mt-2">Tấn/Năm</p>
          </div>

          <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6 hover:border-chart-2/50 transition-all hover:scale-105">
            <div className="text-4xl mb-2">👷</div>
            <p className="text-muted-foreground text-sm mb-2">Việc Làm Toàn Cầu</p>
            <p className="text-3xl font-bold" style={{ color: "var(--chart-2)" }}>
              {data.jobs}K
            </p>
            <p className="text-xs text-muted-foreground mt-2">Người</p>
          </div>
        </div>
      </div>
    </section>
  )
}
