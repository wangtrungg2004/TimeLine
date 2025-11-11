"use client"

import GameItemCard from "./game-item-card"

const materials = [
  {
    id: "stone",
    icon: "🪨",
    title: "Stone Age Material",
    description: "Đá - Nền tảng của nền văn minh",
    rarity: "common" as const,
    stats: [
      { label: "Độ cứng", value: "8/10" },
      { label: "Tuổi", value: "3M năm" },
      { label: "Ảnh hưởng", value: "Cao" },
      { label: "Hiếm", value: "Phổ biến" },
    ],
  },
  {
    id: "bronze",
    icon: "🔔",
    title: "Bronze - Thời Đại Đồng",
    description: "Hợp kim đầu tiên của con người",
    rarity: "uncommon" as const,
    stats: [
      { label: "Độ cứng", value: "9/10" },
      { label: "Tuổi", value: "5000 năm" },
      { label: "Ảnh hưởng", value: "Rất cao" },
      { label: "Hiếm", value: "Hiếm" },
    ],
  },
  {
    id: "iron",
    icon: "⚙️",
    title: "Iron - Thời Đại Sắt",
    description: "Kim loại thay đổi lịch sử",
    rarity: "rare" as const,
    stats: [
      { label: "Độ cứng", value: "9.5/10" },
      { label: "Tuổi", value: "3000 năm" },
      { label: "Ảnh hưởng", value: "Cực cao" },
      { label: "Hiếm", value: "Rất hiếm" },
    ],
  },
  {
    id: "steel",
    icon: "🗡️",
    title: "Steel - Cách Mạng Công Nghiệp",
    description: "Vật liệu của tương lai hiện đại",
    rarity: "epic" as const,
    stats: [
      { label: "Độ cứng", value: "10/10" },
      { label: "Tuổi", value: "500 năm" },
      { label: "Ảnh hưởng", value: "Tối cao" },
      { label: "Hiếm", value: "Rất rất hiếm" },
    ],
  },
  {
    id: "plastic",
    icon: "♻️",
    title: "Plastic - Thế Kỷ 20",
    description: "Vật liệu tổng hợp thay đổi thế giới",
    rarity: "epic" as const,
    stats: [
      { label: "Độ cứng", value: "6/10" },
      { label: "Tuổi", value: "100 năm" },
      { label: "Ảnh hưởng", value: "Tối cao" },
      { label: "Hiếm", value: "Rất rất hiếm" },
    ],
  },
  {
    id: "graphene",
    icon: "💎",
    title: "Graphene - Tương Lai",
    description: "Vật liệu kỳ diệu của thế kỷ 21",
    rarity: "legendary" as const,
    stats: [
      { label: "Độ cứng", value: "10+/10" },
      { label: "Tuổi", value: "20 năm" },
      { label: "Ảnh hưởng", value: "Huyền thoại" },
      { label: "Hiếm", value: "Huyền thoại" },
    ],
  },
]

export default function GameMaterialsInventory() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">⚔️ MATERIALS INVENTORY</h2>
          <p className="text-gray-400 text-lg">Khám phá các vật liệu huyền thoại đã thay đổi lịch sử nhân loại</p>
        </div>

        <div className="inventory-grid">
          {materials.map((material) => (
            <GameItemCard key={material.id} {...material} onClick={() => console.log(`Clicked: ${material.title}`)} />
          ))}
        </div>

        <div className="mt-16 p-8 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-600/30 rounded-lg">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">🏆 LEGENDARY COLLECTION BONUS</h3>
          <p className="text-gray-300">Sưu tập tất cả 6 vật liệu để mở khóa bí mật về tương lai của nhân loại!</p>
        </div>
      </div>
    </section>
  )
}
