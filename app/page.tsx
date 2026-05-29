import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LegendCard } from '@/components/legend-card'
import { mockLegends } from '@/lib/mock-data'
import { ChevronRight, Compass, MapPin, Users } from 'lucide-react'

export default function HomePage() {
  const previewLegends = mockLegends.slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="noise-overlay relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        
        {/* Fog Layers */}
        <div className="fog-layer absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="fog-layer absolute inset-0 bg-gradient-to-t from-destructive/5 via-transparent to-transparent" style={{ animationDelay: '-10s' }} />
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            <span className="text-balance">Every Place Has a</span>{' '}
            <span className="text-primary">Secret</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Discover the legends buried in your backyard. Explore haunted locations, 
            cryptid sightings, and mysterious disappearances tied to real-world places.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="glow-violet bg-primary px-8 text-base font-medium transition-smooth hover:bg-primary/90"
              asChild
            >
              <Link href="/feed">
                <Compass className="mr-2 h-5 w-5" />
                Explore Legends
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border/60 px-8 text-base font-medium transition-smooth hover:border-primary/50 hover:bg-primary/10"
              asChild
            >
              <Link href="/submit">
                Submit a Legend
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-wider">Scroll to discover</span>
            <div className="h-12 w-px animate-pulse bg-gradient-to-b from-primary/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Preview Legends Section */}
      <section className="border-t border-border/40 bg-card/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                Recent Discoveries
              </h2>
              <p className="mt-2 text-muted-foreground">
                The latest legends shared by our community
              </p>
            </div>
            <Button variant="ghost" className="hidden text-primary sm:flex" asChild>
              <Link href="/feed">
                View all
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="scrollbar-hide -mx-4 flex gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {previewLegends.map((legend) => (
              <div key={legend.id} className="min-w-[300px] flex-shrink-0 md:min-w-0">
                <LegendCard legend={legend} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center sm:hidden">
            <Button variant="ghost" className="text-primary" asChild>
              <Link href="/feed">
                View all legends
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Uncover the Unknown
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of explorers documenting the mysterious and unexplained
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="glass-card rounded-xl p-8 text-center transition-smooth hover:border-primary/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-foreground">
                Location-Based Stories
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Every legend is tied to a real-world location. Explore the interactive 
                map to discover what lurks near you.
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 text-center transition-smooth hover:border-primary/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10">
                <Compass className="h-7 w-7 text-destructive" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-foreground">
                Curated Categories
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                From haunted houses to cryptid sightings, from mysterious 
                disappearances to cursed objects—find your fear.
              </p>
            </div>

            <div className="glass-card rounded-xl p-8 text-center transition-smooth hover:border-primary/30">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-foreground">
                Community Driven
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Upvote the most chilling tales, share your own experiences, and 
                connect with fellow legend hunters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="noise-overlay relative overflow-hidden border-t border-border/40 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Have a Story to Tell?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every location has secrets waiting to be shared. Submit your own 
            legend and become part of the vault.
          </p>
          <Button
            size="lg"
            className="glow-violet mt-8 bg-primary px-10 text-base font-medium transition-smooth hover:bg-primary/90"
            asChild
          >
            <Link href="/submit">
              Submit Your Legend
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/20 py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-serif text-lg font-bold text-foreground">LegendVault</span>
            <span className="text-sm">© 2024</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/feed" className="transition-smooth hover:text-foreground">
              Explore
            </Link>
            <Link href="/map" className="transition-smooth hover:text-foreground">
              Map
            </Link>
            <Link href="/submit" className="transition-smooth hover:text-foreground">
              Submit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
