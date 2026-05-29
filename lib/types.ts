export type Category = 'haunted' | 'cryptid' | 'paranormal' | 'disappearance' | 'cursed'

export interface Legend {
  id: string
  title: string
  excerpt: string
  content: string
  category: Category
  location: {
    name: string
    lat: number
    lng: number
  }
  upvotes: number
  commentCount: number
  author: {
    id: string
    username: string
    avatar: string
    joinDate: string
    bio?: string
    legendsCount: number
  }
  createdAt: string
  hasUpvoted?: boolean
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
  }
  createdAt: string
}

export const CATEGORIES: { value: Category; label: string; color: string }[] = [
  { value: 'haunted', label: 'Haunted', color: 'bg-haunted' },
  { value: 'cryptid', label: 'Cryptid', color: 'bg-cryptid' },
  { value: 'paranormal', label: 'Paranormal', color: 'bg-paranormal' },
  { value: 'disappearance', label: 'Disappearance', color: 'bg-disappearance' },
  { value: 'cursed', label: 'Cursed', color: 'bg-cursed' },
]

export const getCategoryColor = (category: Category): string => {
  const categoryMap: Record<Category, string> = {
    haunted: 'bg-[#dc2626]',
    cryptid: 'bg-[#16a34a]',
    paranormal: 'bg-[#7c3aed]',
    disappearance: 'bg-[#0891b2]',
    cursed: 'bg-[#ea580c]',
  }
  return categoryMap[category]
}

export const getCategoryBorderColor = (category: Category): string => {
  const categoryMap: Record<Category, string> = {
    haunted: 'border-[#dc2626]/50',
    cryptid: 'border-[#16a34a]/50',
    paranormal: 'border-[#7c3aed]/50',
    disappearance: 'border-[#0891b2]/50',
    cursed: 'border-[#ea580c]/50',
  }
  return categoryMap[category]
}
