"use client"

export default function Materials() {
  const materials = [
    {
      name: "Đá",
      period: "3000 TCN - Hiện tại",
      impact: "Xây dựng, trang trí, công cụ",
      color: "from-slate-600 to-slate-400",
      stats: "5000+ năm sử dụng",
    },
    {
      name: "Kim loại",
      period: "1200 TCN - Hiện tại",
      impact: "Công nghiệp, giao thông, năng lượng",
      color: "from-amber-600 to-yellow-400",
      stats: "3200+ năm phát triển",
    },
    {
      name: "Gỗ",
      period: "10000 TCN - Hiện tại",
      impact: "Xây dựng, năng lượng, nội thất",
      color: "from-amber-900 to-amber-600",
      stats: "12000+ năm lịch sử",
    },
    {
      name: "Nhựa",
      period: "1950 - Hiện tại",
      impact: "Công nghệ, tiêu dùng, y tế",
      color: "from-blue-600 to-cyan-400",
      stats: "70+ năm cách mạng",
    },
  ]

  return (
    <section id="materials" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Các loại vật liệu chính</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mỗi vật liệu đã đóng vai trò quan trọng trong phát triển kinh tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {materials.map((material, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-border hover:border-primary transition animate-slide-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${material.color} opacity-10 group-hover:opacity-20 transition`}
              />

              {/* Content */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{material.name}</h3>
                    <p className="text-sm text-muted-foreground">{material.period}</p>
                  </div>
                  <div
                    className={`text-3xl font-bold bg-gradient-to-br ${material.color} bg-clip-text text-transparent`}
                  >
                    {material.name.charAt(0)}
                  </div>
                </div>

                <p className="text-foreground mb-4">{material.impact}</p>

                <div className="pt-4 border-t border-border">
                  <p className="text-primary font-semibold text-sm">{material.stats}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
