'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, MapPin, Ghost } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
          <Ghost className="h-7 w-7 text-primary" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            LegendVault
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/feed"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Explore
          </Link>
          <Link
            href="/map"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            <MapPin className="h-4 w-4" />
            Map
          </Link>
          <Link
            href="/submit"
            className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
          >
            Submit
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90 glow-violet transition-smooth" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link
              href="/feed"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/map"
              className="flex items-center gap-2 text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <MapPin className="h-4 w-4" />
              Map
            </Link>
            <Link
              href="/submit"
              className="text-base font-medium text-foreground"
              onClick={() => setIsOpen(false)}
            >
              Submit
            </Link>
            <div className="mt-4 flex flex-col gap-3 border-t border-border/40 pt-4">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
