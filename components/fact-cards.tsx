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
  // 1) SẮT/THÉP
  {
    title: "Sắt/Thép – Xương sống công nghiệp",
    description: "Từ lò rèn cổ đại tới lò thổi oxy hiện đại",
    icon: "🏗️",
    year: "1200 TCN → nay",
    details: [
      "Sắt meteorit được người Ai Cập dùng làm đồ trang sức; luyện sắt kiểu bloomery lan từ Anatolia/Hittite thời kỳ đầu Thời Sắt (~1200 TCN).",
      "Thế kỷ 18–19: puddling (1784) → Bessemer converter (1856) → open-hearth Siemens–Martin (cuối 1800s) cho thép giá rẻ, sản xuất hàng loạt.",
      "Từ 1950s: lò thổi oxy (BOF) và sau đó thép điện hồ quang (EAF) chi phối; nay xuất hiện thép “xanh” dùng hydro (HYBRIT).",
    ],
    impact:
      "Thép là nền tảng hạ tầng và chế tạo: 2023 thế giới sản xuất ~1,888 tấn triệu (Mt); Trung Quốc làm hơn một nửa (~1.02 tỷ tấn).",
  },

  // 2) THAN ĐÁ/DẦU MỎ
  {
    title: "Than đá/Dầu mỏ – Năng lượng hoá thạch",
    description: "Nhiên liệu thúc đẩy Cách mạng Công nghiệp",
    icon: "🛢️",
    year: "thế kỷ 13 → nay",
    details: [
      "Than dùng sớm ở Trung Quốc; cải tiến máy hơi nước của James Watt (1769) giúp dùng than hiệu quả, khởi động công nghiệp hoá.",
      "Dầu mỏ: giếng Drake (1859) mở kỷ nguyên khoan dầu; mỏ Spindletop (1901) làm giá dầu sụt mạnh, thúc đẩy ô tô đại trà.",
      "Khủng hoảng dầu 1973 cho thấy rủi ro địa chính trị; shale oil & LNG từ thập niên 2000s thay đổi thương mại năng lượng.",
    ],
    impact:
      "Năm 2023, nhiên liệu hoá thạch vẫn đáp ứng ~80% nhu cầu năng lượng toàn cầu; điện của Mỹ năm 2023 ~60% vẫn từ hoá thạch.",
  },

  // 3) XI MĂNG/BÊ TÔNG
  {
    title: "Xi măng/Bê tông – Cơ sở hạ tầng",
    description: "Từ pozzolana La Mã tới xi măng Portland",
    icon: "🧱",
    year: "6500 TCN → nay",
    details: [
      "Bê tông sơ khai ở Syria/Jordan (~6500 TCN); La Mã dùng pozzolana (tro núi lửa) cho các công trình như Pantheon (126 SCN).",
      "1824: Joseph Aspdin đăng ký xi măng Portland, mở đường cho bê tông cốt thép và hạ tầng hiện đại.",
      "Thập niên gần đây: xi măng carbon thấp, CO₂-cured & CCUS (ví dụ dự án HYBRIT cho thép; cement có Carbicrete, Solidia, CCS Brevik).",
    ],
    impact:
      "Xi măng là vật liệu xây dựng chủ chốt nhưng gây phát thải lớn (khoảng 7–8% CO₂ toàn cầu); Trung Quốc chiếm phần lớn sản lượng thế giới.",
  },

  // 4) NHỰA/HÓA DẦU
  {
    title: "Nhựa/Hóa dầu – Tiêu dùng đại trà",
    description: "Từ celluloid, Bakelite đến PET chai",
    icon: "🧪",
    year: "1869 → nay",
    details: [
      "1869: Celluloid (Hyatt) thay thế ngà; 1907: Bakelite (Baekeland) – nhựa nhiệt rắn đầu tiên.",
      "1930s: Nylon, PVC, polystyrene…; 1973: Nathaniel Wyeth phát minh chai PET chịu áp lực cho đồ uống có gas.",
      "Sản xuất nhựa đã vượt 400 Mt/năm; tái chế toàn cầu còn thấp, hóa dầu là động lực tăng trưởng nhu cầu dầu.",
    ],
    impact:
      "Nguồn cung nhựa dựa nhiều vào dầu/khí: feedstock hóa dầu chiếm ≈12% nhu cầu dầu toàn cầu và còn tăng, kéo theo thách thức rác thải & khí thải.",
  },

  // 5) SILICON/BÁN DẪN
  {
    title: "Silicon/Bán dẫn – Kinh tế số",
    description: "Từ transistor tới vi xử lý và AI",
    icon: "💻",
    year: "1947 → nay",
    details: [
      "1947: transistor tại Bell Labs; 1958/59: mạch tích hợp (Kilby & Noyce) thu nhỏ linh kiện mạnh mẽ.",
      "1971: Intel 4004 – vi xử lý thương mại đầu tiên; định luật Moore (1965) dẫn dắt chi phí/hiệu năng hàng thập kỷ.",
      "Chuỗi cung ứng hiện đại đạt cực nhỏ nanomet; thị trường chip phục hồi mạnh sau 2023.",
    ],
    impact:
      "WSTS ước tính doanh thu bán dẫn 2024 ≈ 627 tỷ USD (tăng ~19% YoY), là nền hạ tầng của điện thoại, cloud, ô tô và AI.",
  },

  // 6) PIN LITHIUM
  {
    title: "Pin Lithium – Chuyển đổi năng lượng",
    description: "Hoá học xen kẽ mở ra xe điện",
    icon: "🔋",
    year: "1970s → nay",
    details: [
      "Whittingham (1970s) → Goodenough (1980, cathode LiCoO₂) → Yoshino (1985, anode carbon) đặt nền tảng Li-ion; Nobel Hóa học 2019.",
      "Sony thương mại hóa pin Li-ion năm 1991; sau đó LFP & NMC thống trị, quy mô sản xuất bùng nổ.",
      "EV toàn cầu tăng nhanh; chuỗi tinh luyện vật liệu tập trung ở châu Á, đồng thời xuất hiện hướng Na-ion & solid-state.",
    ],
    impact:
      "IEA: doanh số ô tô điện ~14 triệu (2023) và tiếp tục tăng 2024; pin là trụ cột điện hoá giao thông và lưu trữ lưới.",
  },

  // 7) VẬT LIỆU NANO/COMPOSITE
  {
    title: "Vật liệu nano/composite – Công nghệ tương lai",
    description: "Từ fullerene, CNT đến graphene & CFRP",
    icon: "🚀",
    year: "1985 → nay",
    details: [
      "1985: fullerene C60; 1991: Iijima phát hiện ống nano carbon (CNT).",
      "2004: Geim & Novoselov cô lập graphene (Nobel 2010) – lớp carbon 2D siêu bền, dẫn điện tốt.",
      "Composite sợi carbon (CFRP) vào máy bay: Boeing 787 có ~50% khối lượng cấu trúc là composite → tiết kiệm nhiên liệu đáng kể.",
    ],
    impact:
      "Nano & composite đang thâm nhập điện tử linh hoạt, y-sinh, hàng không – hứa hẹn thị trường trăm tỷ USD trong thập kỷ tới.",
  },
]

export default function FactCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-balance">Những Sự Kiện Vật Liệu Chi Phối Kinh Tế Hiện Đại</h2>
        <p className="text-center text-muted-foreground mb-12 text-balance">
          Nhấp vào từng thẻ để xem các mốc & tác động chi tiết
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, idx) => (
            <div
              key={idx}
              onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
              className={`cursor-pointer transition-all duration-300 ${expandedCard === idx ? "md:col-span-2 lg:col-span-3" : ""}`}
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
                      <p className="text-sm font-medium mb-3">Chi tiết:</p>
                      <ul className="space-y-2">
                        {fact.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">→</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm font-medium text-primary">Tác động:</p>
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
