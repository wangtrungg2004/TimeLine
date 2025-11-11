"use client"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Footer from "@/components/footer"

// Khối nhẹ (để static import nếu muốn):
const InteractiveTimeline = dynamic(() => import("@/components/interactive-timeline"), { ssr: false })
const Materials             = dynamic(() => import("@/components/materials"), { ssr: false })

// Khối nặng/có canvas/3D/animation/chart → luôn ssr:false
const MaterialComparison          = dynamic(() => import("@/components/material-comparison"), { ssr: false })
const MaterialQuiz                = dynamic(() => import("@/components/material-quiz"), { ssr: false })
const Impact                      = dynamic(() => import("@/components/impact"), { ssr: false })
const ParticlesBackground         = dynamic(() => import("@/components/particles-background"), { ssr: false })
const Material3DViewer            = dynamic(() => import("@/components/material-3d-viewer"), { ssr: false })
const MaterialImpactCalculator    = dynamic(() => import("@/components/material-impact-calculator"), { ssr: false })
const InteractiveEvolutionChart   = dynamic(() => import("@/components/interactive-evolution-chart"), { ssr: false })
const MaterialPropertiesExplorer  = dynamic(() => import("@/components/material-properties-explorer"), { ssr: false })
const EconomicImpactSimulator     = dynamic(() => import("@/components/economic-impact-simulator"), { ssr: false })
const FactCards                   = dynamic(() => import("@/components/fact-cards"), { ssr: false })
const DeepTimeline                = dynamic(() => import("@/components/deep-timeline"), { ssr: false })
const AdvancedQuiz                = dynamic(() => import("@/components/advanced-quiz"), { ssr: false })
const GameMaterialsInventory      = dynamic(() => import("@/components/game-materials-inventory"), { ssr: false })
const CraftingGame                = dynamic(() => import("@/components/crafting-game"), { ssr: false })

export default function Page() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <main>
  <ParticlesBackground />
  <div className="relative z-10">
    <Header />
    <Hero scrollY={scrollY} />

    {/* Timeline & Evolution */}
    <InteractiveTimeline />
    <DeepTimeline />
    <InteractiveEvolutionChart />

    {/* Materials Exploration */}
    <Materials />
    <MaterialPropertiesExplorer />
    <Material3DViewer />
    <MaterialComparison />

    {/* Impact */}
    <Impact />
    <MaterialImpactCalculator />
    <EconomicImpactSimulator />

    {/* Learning & Games */}
    <AdvancedQuiz />
    <GameMaterialsInventory />
    <CraftingGame />

    {/* Fun Facts & Footer */}
    <FactCards />
    <Footer />
  </div>
</main>
  )
}
