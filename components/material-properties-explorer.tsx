"use client"

import { useState } from "react"

interface MaterialProperty {
  name: string
  description: string
  examples: string[]
  icon: string
}

const properties: Record<string, MaterialProperty[]> = {
  physical: [
    {
      name: "Độ Cứng",
      description: "Khả năng chống lại sự biến dạng hoặc xước",
      examples: ["Kim cương: 10/10", "Thép: 8/10", "Nhựa: 3/10"],
      icon: "💎",
    },
    {
      name: "Tính Dẻo",
      description: "Khả năng uốn cong mà không bị gãy",
      examples: ["Cao su: 9/10", "Thép: 6/10", "Gỗ: 5/10"],
      icon: "🔄",
    },
    {
      name: "Độ Bền",
      description: "Khả năng chịu được lực tác động",
      examples: ["Thép: 9/10", "Đá: 8/10", "Nhựa: 4/10"],
      icon: "🛡️",
    },
  ],
  thermal: [
    {
      name: "Dẫn Nhiệt",
      description: "Khả năng truyền nhiệt qua vật liệu",
      examples: ["Đồng: 9/10", "Aluminum: 8/10", "Gỗ: 2/10"],
      icon: "🔥",
    },
    {
      name: "Chịu Nhiệt",
      description: "Khả năng chịu được nhiệt độ cao",
      examples: ["Gốm: 9/10", "Thép: 7/10", "Nhựa: 3/10"],
      icon: "🌡️",
    },
  ],
  chemical: [
    {
      name: "Chống Ăn Mòn",
      description: "Khả năng chống lại phản ứng hóa học",
      examples: ["Titanium: 9/10", "Thép không gỉ: 8/10", "Sắt: 3/10"],
      icon: "⚗️",
    },
    {
      name: "Độ Bền Hóa Học",
      description: "Khả năng giữ nguyên tính chất khi tiếp xúc hóa chất",
      examples: ["Nhựa: 8/10", "Gỗ: 4/10", "Đá: 9/10"],
      icon: "🧬",
    },
  ],
}

export default function MaterialPropertiesExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof properties>("physical")
  const [expandedProperty, setExpandedProperty] = useState(0)

  const currentProperties = properties[selectedCategory]

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Khám Phá Tính Chất Vật Liệu</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Tìm hiểu các tính chất vật lý, nhiệt và hóa học
        </p>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 justify-center flex-wrap">
          {Object.keys(properties).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat as keyof typeof properties)
                setExpandedProperty(0)
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {cat === "physical" && "Vật Lý"}
              {cat === "thermal" && "Nhiệt"}
              {cat === "chemical" && "Hóa Học"}
            </button>
          ))}
        </div>

        {/* Properties List */}
        <div className="space-y-3">
          {currentProperties.map((prop, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-card to-background border border-border/50 rounded-xl overflow-hidden hover:border-primary/50 transition-all"
            >
              <button
                onClick={() => setExpandedProperty(expandedProperty === idx ? -1 : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-card/50 transition-colors"
              >
                <div className="flex items-center gap-4 text-left">
                  <span className="text-3xl">{prop.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg">{prop.name}</h3>
                    <p className="text-sm text-muted-foreground">{prop.description}</p>
                  </div>
                </div>
                <div className={`text-2xl transition-transform ${expandedProperty === idx ? "rotate-180" : ""}`}>▼</div>
              </button>

              {expandedProperty === idx && (
                <div className="px-6 pb-6 border-t border-border/50 bg-background/50">
                  <p className="text-sm text-muted-foreground mb-4">Ví dụ thực tế:</p>
                  <div className="space-y-2">
                    {prop.examples.map((example, exIdx) => (
                      <div key={exIdx} className="flex items-center gap-3 p-3 bg-card/50 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
