# LegendVault 🕯️

> *Every Place Has a Secret*

LegendVault is a location-based urban legend social platform where users submit, discover, and explore creepy stories tied to real-world locations.

---

## What It Is

LegendVault lets anyone drop a pin on the map and attach an urban legend to it. Whether it's a haunted house on your street, a cryptid sighting in the woods, or a cursed location from local folklore, LegendVault is where those stories live. Users can upvote legends, leave comments, and explore an interactive map of eerie pins from around the world.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, shadcn/ui |
| Database | AWS DynamoDB |
| Auth | Clerk |
| Map | Mapbox GL JS |
| Deployment | Vercel |
| UI Scaffold | Vercel v0 |

---

## Features

- Submit urban legends tied to a real-world location
- Browse a dark, atmospheric feed of legends sorted by newest or most upvoted
- Filter legends by category: Haunted, Cryptid, Paranormal, Disappearance, Cursed
- Explore an interactive map with custom eerie location pins
- Upvote and comment on legends
- Public user profiles showing all submitted legends

---

## Data Model (DynamoDB)

**Legends Table** — legendId (PK), createdAt (SK), title, story, authorId, location, category, upvotes, commentCount

**Users Table** — userId (PK), username, email, bio, avatarUrl, legendsSubmitted, joinedAt

**Votes Table** — userId (PK), legendId (SK), createdAt

**Comments Table** — legendId (PK), commentId (SK), authorId, authorName, content, createdAt

---

## Getting Started

### Prerequisites

- Node.js 18+
- AWS Account with DynamoDB access
- Vercel account
- Clerk account
- Mapbox account

### Installation

```bash
git clone https://github.com/yourusername/legendvault
cd legendvault
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Deployment

This project is deployed on Vercel. To deploy your own instance:

1. Push your repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy

---

## Hackathon

Built for the [H0: Hack the Zero Stack Hackathon]([https://hackathon.devpost.com](https://h01.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio&_gl=1*141ny3p*_gcl_au*MjAwMzIyMTY2NC4xNzc4MTEzMDgw*_ga*MTE0NzQ2NjY2MC4xNzY5OTYzMjc3*_ga_0YHJK3Y10M*czE3ODAwOTc4MTYkbzQ0JGcxJHQxNzgwMDk3ODM4JGozOCRsMCRoMA..)) for Track 3: Million-scale Global App.

AWS Database used: **Amazon DynamoDB**

---

## License

MIT
