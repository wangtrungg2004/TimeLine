"use client"

export default function Impact() {
  const impacts = [
    {
      title: "GDP Toàn cầu",
      value: "+300%",
      description: "Tăng trưởng kinh tế từ khi công nghiệp hóa",
      icon: "📈",
    },
    {
      title: "Dân số",
      value: "8 tỷ",
      description: "Hỗ trợ bởi vật liệu và công nghệ",
      icon: "👥",
    },
    {
      title: "Công nghệ",
      value: "∞",
      description: "Vật liệu mới mở ra khả năng vô hạn",
      icon: "🔬",
    },
    {
      title: "Bền vững",
      value: "↑",
      description: "Tập trung vào vật liệu tái chế",
      icon: "🌍",
    },
  ]

  return (
    <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Ảnh hưởng kinh tế</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Những con số cho thấy tác động sâu sắc của vật liệu đến nền kinh tế
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition text-center animate-slide-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{impact.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-2">{impact.value}</h3>
              <p className="font-semibold mb-2">{impact.title}</p>
              <p className="text-sm text-muted-foreground">{impact.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Tương lai của vật liệu</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Các vật liệu bền vững và công nghệ mới sẽ tiếp tục định hình nền kinh tế trong thế kỷ 21
          </p>
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition">
            Tìm hiểu về vật liệu tương lai
          </button>
        </div>
      </div>
    </section>
  )
}
