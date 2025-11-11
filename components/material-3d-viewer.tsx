"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface Material3D {
  name: string
  color: string
  icon: string
  description: string
  properties: {
    strength: number
    flexibility: number
    durability: number
    cost: number
  }
}

const materials: Material3D[] = [
  {
    name: "Stone",
    color: "from-gray-600 to-gray-800",
    icon: "🪨",
    description: "Vật liệu xây dựng cơ bản của nhân loại",
    properties: { strength: 90, flexibility: 10, durability: 95, cost: 20 },
  },
  {
    name: "Bronze",
    color: "from-amber-600 to-amber-800",
    icon: "🔔",
    description: "Hợp kim đầu tiên của con người",
    properties: { strength: 85, flexibility: 30, durability: 80, cost: 60 },
  },
  {
    name: "Iron",
    color: "from-slate-600 to-slate-800",
    icon: "⚙️",
    description: "Cách mạng công nghiệp bắt đầu từ đây",
    properties: { strength: 95, flexibility: 40, durability: 70, cost: 40 },
  },
  {
    name: "Plastic",
    color: "from-blue-500 to-blue-700",
    icon: "🧪",
    description: "Vật liệu hiện đại thay đổi thế giới",
    properties: { strength: 50, flexibility: 80, durability: 40, cost: 10 },
  },
]

export default function Material3DViewer() {
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  const material = materials[selectedMaterial]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientY - rect.top) / rect.height - 0.5
      const y = (e.clientX - rect.left) / rect.width - 0.5
      setRotation({ x: x * 30, y: y * 30 })
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)
    return () => container?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setScale((prev) => Math.max(0.5, Math.min(2, prev + (e.deltaY > 0 ? -0.1 : 0.1))))
  }

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Khám Phá Vật Liệu 3D</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Di chuyển chuột để xoay, cuộn để phóng to/thu nhỏ
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* 3D Viewer */}
          <div
            ref={containerRef}
            onWheel={handleWheel}
            className="relative h-96 bg-gradient-to-br from-card to-background rounded-2xl border border-border/50 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
          >
            <div
              className={`text-9xl transition-transform duration-100 ease-out bg-gradient-to-br ${material.color} bg-clip-text text-transparent`}
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
              }}
            >
              {material.icon}
            </div>
          </div>

          {/* Material Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-2">{material.name}</h3>
              <p className="text-muted-foreground text-lg">{material.description}</p>
            </div>

            {/* Properties Bars */}
            <div className="space-y-4">
              {Object.entries(material.properties).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium capitalize">
                      {key === "strength"
                        ? "Độ Cứng"
                        : key === "flexibility"
                          ? "Tính Dẻo"
                          : key === "durability"
                            ? "Độ Bền"
                            : "Chi Phí"}
                    </span>
                    <span className="text-sm font-bold text-primary">{value}%</span>
                  </div>
                  <div className="w-full bg-card rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Material Selector */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              {materials.map((mat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedMaterial(idx)
                    setScale(1)
                    setRotation({ x: 0, y: 0 })
                  }}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedMaterial === idx
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-3xl mb-2">{mat.icon}</div>
                  <div className="text-sm font-medium">{mat.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
