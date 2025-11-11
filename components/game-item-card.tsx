"use client"

import { useState } from "react"

interface GameItemCardProps {
  id: string
  icon: string
  title: string
  description: string
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
  stats: Array<{ label: string; value: string | number }>
  onClick?: () => void
}

export default function GameItemCard({ id, icon, title, description, rarity, stats, onClick }: GameItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)

  const rarityColors = {
    common: "rarity-common",
    uncommon: "rarity-uncommon",
    rare: "rarity-rare",
    epic: "rarity-epic",
    legendary: "rarity-legendary",
  }

  const rarityTextColors = {
    common: "rarity-text-common",
    uncommon: "rarity-text-uncommon",
    rare: "rarity-text-rare",
    epic: "rarity-text-epic",
    legendary: "rarity-text-legendary",
  }

  const rarityBgColors = {
    common: "rarity-bg-common",
    uncommon: "rarity-bg-uncommon",
    rare: "rarity-bg-rare",
    epic: "rarity-bg-epic",
    legendary: "rarity-bg-legendary",
  }

  const glowAnimations = {
    common: "animate-rarity-glow-common",
    uncommon: "animate-rarity-glow-uncommon",
    rare: "animate-rarity-glow-rare",
    epic: "animate-rarity-glow-epic",
    legendary: "animate-rarity-glow-legendary",
  }

  return (
    <div
      className={`game-item ${rarityColors[rarity]} ${glowAnimations[rarity]} h-80 ${isHovered ? "animate-item-hover-lift" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        setIsFlipped(!isFlipped)
        onClick?.()
      }}
    >
      <div className="game-item-border" />

      <div className="game-item-content">
        <div>
          <div className="game-item-header">
            <div className={`game-item-icon ${rarityBgColors[rarity]}`}>{icon}</div>
            <div className="flex-1">
              <h3 className={`game-item-title ${rarityTextColors[rarity]}`}>{title}</h3>
              <p className={`game-item-rarity ${rarityBgColors[rarity]} ${rarityTextColors[rarity]}`}>
                {rarity.toUpperCase()}
              </p>
            </div>
          </div>
          <p className="game-item-description">{description}</p>
        </div>

        <div className="game-item-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="game-item-stat">
              <span className="game-item-stat-label">{stat.label}</span>
              <span className={`game-item-stat-value ${rarityTextColors[rarity]}`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="game-tooltip">Click to flip</div>
    </div>
  )
}
