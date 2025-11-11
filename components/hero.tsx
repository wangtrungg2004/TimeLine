"use client"

interface HeroProps {
  scrollY: number
}

export default function Hero({ scrollY }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.3}px)` }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
            Lịch sử vật liệu
            <span className="block text-primary">định hình kinh tế</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Khám phá cách các loại vật liệu từ đá, kim loại, gỗ đến nhựa đã thay đổi nền kinh tế toàn cầu và tạo nên thế
            giới hiện đại
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition">
              Khám phá ngay
            </button>
            <button className="px-8 py-3 border border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition">
              Tìm hiểu thêm
            </button>
          </div>
        </div>

        {/* Floating Material Icons */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { icon: "🪨", label: "Đá" },
            { icon: "⚙️", label: "Kim loại" },
            { icon: "🌳", label: "Gỗ" },
            { icon: "♻️", label: "Nhựa" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 bg-card/50 backdrop-blur border border-border rounded-lg hover:border-primary transition animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
