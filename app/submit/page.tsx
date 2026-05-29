'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, Category } from '@/lib/types'
import { cn } from '@/lib/utils'
import { MapPin, Send, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const LOCATION_SUGGESTIONS = [
  'Sleepy Hollow, New York',
  'Salem, Massachusetts',
  'New Orleans, Louisiana',
  'Gettysburg, Pennsylvania',
  'Savannah, Georgia',
  'Point Pleasant, West Virginia',
]

export default function SubmitPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [location, setLocation] = useState('')
  const [story, setStory] = useState('')
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const characterCount = story.length
  const minCharacters = 100

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!category) {
      newErrors.category = 'Please select a category'
    }
    if (!location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (story.length < minCharacters) {
      newErrors.story = `Story must be at least ${minCharacters} characters`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect to feed after submission
    router.push('/feed')
  }

  const filteredSuggestions = LOCATION_SUGGESTIONS.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  )

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Submit a Legend
          </h1>
          <p className="mt-3 text-muted-foreground">
            Share a story tied to a real-world location
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8">
          {/* Title */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Whispering Bridge of Hollow Creek..."
              className={cn(
                'w-full rounded-lg border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
                errors.title ? 'border-destructive' : 'border-border/60'
              )}
            />
            {errors.title && (
              <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="mb-6">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={cn(
                'w-full rounded-lg border bg-background/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary',
                errors.category ? 'border-destructive' : 'border-border/60',
                !category && 'text-muted-foreground'
              )}
            >
              <option value="" disabled>
                Select a category...
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.category}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="relative mb-6">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setShowLocationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                placeholder="Search for a location..."
                className={cn(
                  'w-full rounded-lg border bg-background/50 py-3 pl-11 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
                  errors.location ? 'border-destructive' : 'border-border/60'
                )}
              />
            </div>
            {showLocationSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full rounded-lg border border-border/60 bg-card shadow-xl">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => {
                      setLocation(suggestion)
                      setShowLocationSuggestions(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition-smooth hover:bg-muted"
                  >
                    <MapPin className="h-4 w-4 text-destructive" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            {errors.location && (
              <p className="mt-2 flex items-center gap-1 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {errors.location}
              </p>
            )}
          </div>

          {/* Story */}
          <div className="mb-6">
            <label
              htmlFor="story"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Your Story
            </label>
            <textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Share the legend... What happened? When? What do locals say about it?"
              rows={8}
              className={cn(
                'w-full resize-none rounded-lg border bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary',
                errors.story ? 'border-destructive' : 'border-border/60'
              )}
            />
            <div className="mt-2 flex items-center justify-between">
              {errors.story ? (
                <p className="flex items-center gap-1 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {errors.story}
                </p>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Minimum {minCharacters} characters
                </span>
              )}
              <span
                className={cn(
                  'text-sm',
                  characterCount >= minCharacters
                    ? 'text-green-500'
                    : 'text-muted-foreground'
                )}
              >
                {characterCount} / {minCharacters}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="glow-violet w-full bg-primary text-base font-medium transition-smooth hover:bg-primary/90 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Legend
              </>
            )}
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            By submitting, you agree to our community guidelines
          </p>
        </form>
      </div>
    </div>
  )
}
