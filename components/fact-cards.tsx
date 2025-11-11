"use client"

import { useState } from "react"

interface Fact {
  title: string
  description: string
  icon: string
  details: string[]
  year?: string
  impact: string
}

const facts: Fact[] = [
  {
    title: "Thép Thay Đổi Thế Giới",
    description: "Cách mạng công nghiệp bắt đầu từ thép",
    icon: "🏗️",
    year: "1856",
    details: [
      "Quy trình Bessemer cho phép sản xuất thép hàng loạt",
      "Giá thép giảm 90% trong 30 năm",
      "Tàu, cầu, tòa nhà cao tầng trở thành khả năng",
    ],
    impact: "Tăng GDP toàn cầu 300%",
  },
  {
    title: "Nhựa Thay Đổi Cuộc Sống",
    description: "Vật liệu rẻ tiền, dễ sản xuất",
    icon: "🧪",
    year: "1907",
    details: [
      "Bakelite - nhựa tổng hợp đầu tiên",
      "Thay thế ngà voi, cao su tự nhiên",
      "Mở ra kỷ nguyên tiêu dùng hàng loạt",
    ],
    impact: "Tạo ngành công nghiệp 500 tỷ USD",
  },
  {
    title: "Bán Dẫn Tạo Kỷ Nguyên Số",
    description: "Từ máy tính đến smartphone",
    icon: "💻",
    year: "1947",
    details: [
      "Transistor được phát minh tại Bell Labs",
      "Thay thế các ống chân không khổng lồ",
      "Cho phép máy tính nhỏ gọn, mạnh mẽ",
    ],
    impact: "Tạo ngành 1.5 nghìn tỷ USD",
  },
  {
    title: "Composite - Vật Liệu Tương Lai",
    description: "Kết hợp sức mạnh của nhiều vật liệu",
    icon: "🚀",
    year: "1960s",
    details: [
      "Sợi carbon + nhựa = vật liệu siêu nhẹ",
      "Dùng trong máy bay, tàu vũ trụ, ô tô",
      "Giảm trọng lượng 50% so với thép",
    ],
    impact: "Tiết kiệm nhiên liệu 30%",
  },
  {
    title: "Graphene - Vật Liệu Kỳ Diệu",
    description: "Mỏng nhất nhưng mạnh nhất",
    icon: "⚛️",
    year: "2004",
    details: ["Một lớp nguyên tử carbon", "Mạnh hơn thép 200 lần", "Dẫn điện tốt hơn đồng"],
    impact: "Sẽ cách mạng hóa công nghệ",
  },
  {
    title: "Vật Liệu Sinh Học",
    description: "Tương lai bền vững",
    icon: "🌱",
    year: "2020s",
    details: ["Nhựa từ nấm, tảo, rơm rạ", "Phân hủy hoàn toàn trong tự nhiên", "Giảm phát thải carbon 80%"],
    impact: "Cứu hành tinh",
  },
]

export default function FactCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Những Sự Kiện Thay Đổi Lịch Sử</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Nhấp vào các thẻ để khám phá những phát minh vĩ đại
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              className={`cursor-pointer transition-all duration-300 ${
                expandedCard === idx ? "md:col-span-2 lg:col-span-3" : ""
              }`}
            >
              <div
                className={`bg-gradient-to-br from-card to-background border-2 rounded-xl p-6 hover:border-primary/50 transition-all ${
                  expandedCard === idx ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{fact.icon}</div>
                  {fact.year && (
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {fact.year}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{fact.description}</p>

                {expandedCard === idx && (
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-4 animate-scale-up">
                    <div>
                      <p className="text-sm font-medium mb-3">Chi Tiết:</p>
                      <ul className="space-y-2">
                        {fact.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">→</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary">Ảnh Hưởng:</p>
                      <p className="text-sm mt-1">{fact.impact}</p>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {expandedCard === idx ? "Nhấp để đóng" : "Nhấp để xem chi tiết"}
                  </span>
                  <span className={`transition-transform ${expandedCard === idx ? "rotate-180" : ""}`}>▼</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
