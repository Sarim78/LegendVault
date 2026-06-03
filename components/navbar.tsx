'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Menu, MapPin, Ghost } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: '/feed', label: 'Explore' },
    { href: '/map', label: 'Map', icon: MapPin },
    { href: '/submit', label: 'Submit' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex min-h-11 min-w-11 items-center gap-2 transition-smooth hover:opacity-80"
        >
          <Ghost className="h-7 w-7 shrink-0 text-primary" />
          <span className="font-serif text-lg font-bold tracking-tight text-foreground sm:text-xl">
            LegendVault
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center gap-1.5 text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground"
            >
              {link.icon && <link.icon className="h-4 w-4" />}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="min-h-11" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button
            size="sm"
            className="min-h-11 bg-primary hover:bg-primary/90 glow-violet transition-smooth"
            asChild
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-foreground md:hidden"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-[min(100vw-2rem,320px)] border-border/40 bg-background/95 backdrop-blur-xl"
        >
          <SheetHeader className="border-b border-border/40 pb-4 text-left">
            <SheetTitle className="font-serif text-xl">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-base font-medium text-foreground transition-smooth hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 border-t border-border/40 pt-4">
            <Button
              variant="ghost"
              className="min-h-11 justify-start"
              asChild
            >
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button className="min-h-11 bg-primary hover:bg-primary/90" asChild>
              <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
