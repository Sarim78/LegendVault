import Link from 'next/link'
import { Ghost } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LegendNotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center">
      <Ghost className="h-24 w-24 text-muted-foreground/30" />
      <h1 className="mt-8 font-serif text-4xl font-bold text-foreground md:text-5xl">
        Legend Not Found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        This legend seems to have disappeared into the mist. 
        It may have been removed or never existed.
      </p>
      <div className="mt-8 flex gap-4">
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link href="/feed">Explore Legends</Link>
        </Button>
        <Button variant="outline" className="border-border/60" asChild>
          <Link href="/map">View Map</Link>
        </Button>
      </div>
    </div>
  )
}
