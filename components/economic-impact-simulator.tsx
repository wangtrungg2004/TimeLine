"use client"

import { useState } from "react"

interface SimulationResult {
  year: number
  gdp: number
  employment: number
  innovation: number
  sustainability: number
}

export default function EconomicImpactSimulator() {
  const [materialFocus, setMaterialFocus] = useState("balanced")
  const [results, setResults] = useState<SimulationResult[]>([])
  const [simulated, setSimulated] = useState(false)

  const scenarios: Record<string, { name: string; description: string; color: string }> = {
    balanced: {
      name: "Cân Bằng",
      description: "Phát triển đều tất cả vật liệu",
      color: "from-blue-500 to-cyan-500",
    },
    steel: {
      name: "Tập Trung Thép",
      description: "Đầu tư chủ yếu vào thép",
      color: "from-slate-500 to-slate-700",
    },
    plastic: {
      name: "Tập Trung Nhựa",
      description: "Đầu tư chủ yếu vào nhựa",
      color: "from-blue-400 to-blue-600",
    },
    semiconductor: {
      name: "Tập Trung Bán Dẫn",
      description: "Đầu tư chủ yếu vào bán dẫn",
      color: "from-purple-500 to-pink-500",
    },
  }

  const runSimulation = () => {
    const baseGDP = 50
    const baseEmployment = 2000
    const baseInnovation = 60
    const baseSustainability = 40

    const multipliers: Record<string, { gdp: number; employment: number; innovation: number; sustainability: number }> =
      {
        balanced: { gdp: 1.2, employment: 1.1, innovation: 1.3, sustainability: 1.2 },
        steel: { gdp: 1.5, employment: 1.3, innovation: 0.9, sustainability: 0.7 },
        plastic: { gdp: 1.4, employment: 1.2, innovation: 1.1, sustainability: 0.5 },
        semiconductor: { gdp: 2.0, employment: 1.4, innovation: 2.0, sustainability: 1.1 },
      }

    const mult = multipliers[materialFocus]
    const newResults: SimulationResult[] = []

    for (let i = 0; i <= 30; i += 10) {
      newResults.push({
        year: 2024 + i,
        gdp: Math.round(baseGDP * Math.pow(mult.gdp, i / 10) * 10) / 10,
        employment: Math.round(baseEmployment * Math.pow(mult.employment, i / 10)),
        innovation: Math.round(baseInnovation * Math.pow(mult.innovation, i / 10) * 10) / 10,
        sustainability: Math.round(baseSustainability * Math.pow(mult.sustainability, i / 10) * 10) / 10,
      })
    }

    setResults(newResults)
    setSimulated(true)
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-card/30 to-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Mô Phỏng Ảnh Hưởng Kinh Tế</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Chọn chiến lược và xem tương lai phát triển như thế nào
        </p>

        {/* Scenario Selector */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {Object.entries(scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => {
                setMaterialFocus(key)
                setSimulated(false)
              }}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                materialFocus === key
                  ? `border-primary bg-gradient-to-br ${scenario.color} bg-opacity-10`
                  : "border-border hover:border-primary/50"
              }`}
            >
              <h3 className="font-bold text-lg mb-1">{scenario.name}</h3>
              <p className="text-sm text-muted-foreground">{scenario.description}</p>
            </button>
          ))}
        </div>

        <button
          onClick={runSimulation}
          className="w-full mb-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
        >
          Chạy Mô Phỏng
        </button>

        {/* Results */}
        {simulated && results.length > 0 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* GDP Chart */}
              <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6">
                <h3 className="font-bold mb-4">GDP Toàn Cầu (Tỷ USD)</h3>
                <div className="space-y-3">
                  {results.map((r, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{r.year}</span>
                        <span className="font-bold text-primary">${r.gdp}T</span>
                      </div>
                      <div className="w-full bg-card rounded h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${(r.gdp / 150) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment Chart */}
              <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6">
                <h3 className="font-bold mb-4">Việc Làm (Nghìn Người)</h3>
                <div className="space-y-3">
                  {results.map((r, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{r.year}</span>
                        <span className="font-bold text-accent">{r.employment}K</span>
                      </div>
                      <div className="w-full bg-card rounded h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
                          style={{ width: `${(r.employment / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Innovation Score */}
              <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6">
                <h3 className="font-bold mb-4">Điểm Đổi Mới</h3>
                <div className="space-y-3">
                  {results.map((r, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{r.year}</span>
                        <span className="font-bold" style={{ color: "var(--chart-2)" }}>
                          {r.innovation}/100
                        </span>
                      </div>
                      <div className="w-full bg-card rounded h-2 overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${r.innovation}%`,
                            background: "linear-gradient(to right, var(--chart-2), var(--chart-3))",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sustainability Score */}
              <div className="bg-gradient-to-br from-card to-background border border-border/50 rounded-xl p-6">
                <h3 className="font-bold mb-4">Điểm Bền Vững</h3>
                <div className="space-y-3">
                  {results.map((r, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{r.year}</span>
                        <span className="font-bold text-green-500">{r.sustainability}/100</span>
                      </div>
                      <div className="w-full bg-card rounded h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${r.sustainability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
              <h3 className="font-bold mb-3">Phân Tích Kết Quả</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {materialFocus === "balanced" &&
                      "Chiến lược cân bằng mang lại tăng trưởng ổn định với đổi mới và bền vững"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {materialFocus === "steel" && "Tập trung thép tạo GDP cao nhưng ảnh hưởng tiêu cực đến bền vững"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {materialFocus === "plastic" && "Nhựa mang lại tăng trưởng nhanh nhưng vấn đề bền vững lớn"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    {materialFocus === "semiconductor" &&
                      "Bán dẫn dẫn đầu về đổi mới và GDP nhưng cần cân bằng bền vững"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
