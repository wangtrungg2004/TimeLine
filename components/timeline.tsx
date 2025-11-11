"use client"

export default function Timeline() {
  const events = [
    {
      year: "3000 TCN",
      title: "Thời đại Đá",
      description: "Con người bắt đầu sử dụng đá để tạo công cụ, nền tảng của nền văn minh đầu tiên",
      icon: "🪨",
    },
    {
      year: "1200 TCN",
      title: "Thời đại Đồng",
      description: "Phát hiện hợp kim đồng, mở ra kỷ nguyên mới của công nghệ và thương mại",
      icon: "⚙️",
    },
    {
      year: "1200 SCN",
      title: "Thời đại Sắt",
      description: "Sắt trở thành vật liệu chủ đạo, cách mạng nông nghiệp và quân sự",
      icon: "🔨",
    },
    {
      year: "1760",
      title: "Cách mạng Công nghiệp",
      description: "Thép được sản xuất hàng loạt, xây dựng cơ sở hạ tầng hiện đại",
      icon: "🏭",
    },
    {
      year: "1950",
      title: "Kỷ nguyên Nhựa",
      description: "Nhựa tổng hợp thay đổi sản xuất, tiêu dùng và kinh tế toàn cầu",
      icon: "♻️",
    },
    {
      year: "2000+",
      title: "Vật liệu Tương lai",
      description: "Composite, graphene, và vật liệu bền vững định hình tương lai",
      icon: "🚀",
    },
  ]

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Dòng thời gian lịch sử</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Từ những công cụ đá đơn giản đến các vật liệu tương lai
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary" />

        {/* Timeline Events */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex gap-8 animate-slide-in-up ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Content */}
              <div className="w-full sm:w-5/12">
                <div className="bg-card border border-border rounded-lg p-6 hover:border-primary transition">
                  <div className="text-3xl mb-3">{event.icon}</div>
                  <p className="text-primary font-semibold text-sm mb-2">{event.year}</p>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="w-2/12 flex justify-center">
                <div className="w-4 h-4 bg-primary rounded-full border-4 border-background mt-6" />
              </div>

              {/* Spacer */}
              <div className="w-5/12 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
