"use client"

import { useState } from "react"

export default function MaterialComparison() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["Đá", "Kim loại"])

  const materials = [
    {
      name: "Đá",
      strength: 80,
      durability: 95,
      cost: 20,
      innovation: 30,
      era: "3000 TCN",
      color: "slate",
    },
    {
      name: "Kim loại",
      strength: 90,
      durability: 85,
      cost: 60,
      innovation: 70,
      era: "1200 TCN",
      color: "amber",
    },
    {
      name: "Gỗ",
      strength: 60,
      durability: 50,
      cost: 30,
      innovation: 40,
      era: "10000 TCN",
      color: "orange",
    },
    {
      name: "Nhựa",
      strength: 70,
      durability: 40,
      cost: 40,
      innovation: 95,
      era: "1950",
      color: "blue",
    },
  ]

  const toggleMaterial = (name: string) => {
    setSelectedMaterials((prev) => (prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]))
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">So sánh vật liệu</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Chọn các vật liệu để so sánh các đặc tính của chúng
        </p>
      </div>

      {/* Material Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {materials.map((material) => (
          <button
            key={material.name}
            onClick={() => toggleMaterial(material.name)}
            className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
              selectedMaterials.includes(material.name)
                ? "border-primary bg-primary/10 scale-105"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="font-semibold mb-1">{material.name}</div>
            <div className="text-xs text-muted-foreground">{material.era}</div>
          </button>
        ))}
      </div>

      {/* Comparison Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {["strength", "durability", "cost", "innovation"].map((metric) => (
          <div key={metric} className="bg-card/50 border border-border rounded-lg p-6 animate-scale-up">
            <h3 className="font-semibold mb-4 capitalize">
              {metric === "strength"
                ? "Độ bền"
                : metric === "durability"
                  ? "Tuổi thọ"
                  : metric === "cost"
                    ? "Chi phí"
                    : "Đổi mới"}
            </h3>
            <div className="space-y-3">
              {materials
                .filter((m) => selectedMaterials.includes(m.name))
                .map((material) => {
                  const value = material[metric as keyof typeof material] as number
                  return (
                    <div key={material.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{material.name}</span>
                        <span className="text-sm text-primary">{value}%</span>
                      </div>
                      <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
