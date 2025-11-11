"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-balance">Materials History</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#timeline" className="text-muted-foreground hover:text-foreground transition">
              Timeline
            </a>
            <a href="#materials" className="text-muted-foreground hover:text-foreground transition">
              Materials
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground transition">
              Impact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-card rounded-lg transition">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#timeline" className="text-muted-foreground hover:text-foreground transition">
              Timeline
            </a>
            <a href="#materials" className="text-muted-foreground hover:text-foreground transition">
              Materials
            </a>
            <a href="#impact" className="text-muted-foreground hover:text-foreground transition">
              Impact
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
