import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), '.env.local')
  if (!existsSync(envPath)) {
    console.warn('Warning: .env.local not found. Using existing process.env.')
    return
  }
  const contents = readFileSync(envPath, 'utf-8')
  for (const line of contents.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim()
    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvLocal()

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const docClient = DynamoDBDocumentClient.from(client, {
  marshallOptions: { removeUndefinedValues: true },
})

const TABLE = 'legends'

type SeedLegend = {
  legendId: string
  createdAt: string
  title: string
  story: string
  authorId: string
  authorName: string
  location: { name: string; lat: number; lng: number }
  category: string
  upvotes: number
  commentCount: number
}

const legends: SeedLegend[] = [
  {
    legendId: 'a1f0e8c2-4b3d-4f91-9c2e-8d1a6b5c4e01',
    createdAt: '2024-01-15T20:30:00Z',
    title: 'The Whispering Bridge of Hollow Creek',
    story:
      "Locals say if you stand on the old stone bridge at midnight, you can hear the voices of children who disappeared in 1923. Search parties dredged the creek and combed every acre of forest, yet no trace was ever found. Travelers still report faint whispers—names called, laughter, crying—and small figures at the water's edge that vanish when approached. A historian's 1978 recording was never released; he refused to speak of it until his death. Parents still warn children to stay away from Hollow Creek after dark.",
    authorId: 'guest',
    authorName: 'NightWatcher',
    location: { name: 'Hollow Creek, Vermont', lat: 44.26, lng: -72.57 },
    category: 'Haunted',
    upvotes: 342,
    commentCount: 47,
  },
  {
    legendId: 'b2e1f9d3-5c4e-4a02-ad3f-9e2b7c6d5f02',
    createdAt: '2024-02-28T14:15:00Z',
    title: 'The Mothman of Point Pleasant Returns',
    story:
      'Multiple witnesses report a large winged creature with glowing red eyes near the old TNT plant. Sightings began in late October and continued through winter—first teenagers on a water tower, then a trucker on Route 62, then blurry photos of a fifteen-foot wingspan. Researcher Sarah Chen notes descriptions match 1966 reports: a seven-foot humanoid and eyes everyone remembers. Some fear history will repeat after the Silver Bridge collapse; others believe the Mothman is trying to warn the town. Point Pleasant watches the skies again.',
    authorId: 'guest',
    authorName: 'CryptoHunter',
    location: { name: 'Point Pleasant, West Virginia', lat: 38.84, lng: -82.14 },
    category: 'Cryptid',
    upvotes: 528,
    commentCount: 89,
  },
  {
    legendId: 'c3d2a0e4-6d5f-4b13-be40-af3c8d7e6a03',
    createdAt: '2024-03-05T08:45:00Z',
    title: 'The Vanishing Hitchhiker of Route 666',
    story:
      "Drivers on the infamous highway report picking up a young woman in a white dress at mile marker 47 who disappears before reaching her destination. Truck driver Mike Reeves looked away for two seconds at his mirrors; when he looked back, the passenger seat was empty and cold, as if she had never been there. Some say she died in a hit-and-run decades ago; others call her a spirit warning drivers on one of the region's deadliest roads. The highway was renamed in 2003, but the woman in white still waits.",
    authorId: 'guest',
    authorName: 'RoadMystic',
    location: { name: 'Former Route 666, Arizona', lat: 35.27, lng: -109.83 },
    category: 'Paranormal',
    upvotes: 276,
    commentCount: 31,
  },
  {
    legendId: 'd4c3b1f5-7e6a-4c24-cf51-b04d9e8f7b04',
    createdAt: '2024-01-28T16:20:00Z',
    title: "The Lost Expedition of Deadman's Peak",
    story:
      'In 1987, eight experienced hikers led by Marcus Webb set out to summit Deadman\'s Peak. Their camp was found intact—food on the stove, tents standing—but the hikers were gone. A journal entry mentioned strange lights on the eastern ridge. Search dogs lost the scent at a ring of stone formations a mile from camp. No bodies were recovered. The peak remains closed; locals say on clear nights you can still see lights moving along the ridge.',
    authorId: 'guest',
    authorName: 'TrailSeeker',
    location: { name: "Deadman's Peak, Colorado", lat: 39.74, lng: -104.99 },
    category: 'Disappearance',
    upvotes: 412,
    commentCount: 56,
  },
  {
    legendId: 'e5d4c2a6-8f7b-4d35-d062-c15e0f9a8c05',
    createdAt: '2024-02-14T22:00:00Z',
    title: 'The Cursed Mirror of Blackwood Manor',
    story:
      "An antique mirror at Blackwood Manor brings misfortune to anyone who gazes into it at midnight. Crafted in Venice by an artisan rumored to practice dark arts, it arrived in 1847; within a year the patriarch drowned, his wife fell down the stairs, and their son was thrown from his horse—each exactly one week after a midnight viewing. The glass would not break, buyers returned it within days, and burial failed: it reappeared in the manor by morning. The last heir vanished in 2019; visitors still report candlelight in the locked room.",
    authorId: 'guest',
    authorName: 'AntiqueDread',
    location: { name: 'Blackwood Manor, Massachusetts', lat: 42.36, lng: -71.06 },
    category: 'Cursed',
    upvotes: 389,
    commentCount: 62,
  },
  {
    legendId: 'f6e5d3b7-9a8c-4e46-e173-d26f1a0b9d06',
    createdAt: '2024-03-10T19:30:00Z',
    title: "The Singing Caves of Devil's Hollow",
    story:
      "Deep in the Appalachian Mountains, caves at Devil's Hollow produce sounds like human voices singing hymns in an unknown language. Settlers named the place in the 1700s after unearthly music; explorers who went too deep felt watched and some never returned. In 1952, university recordings captured a choir linguists could not classify. Dr. Ellen Marsh obsessed over the caves for decades; her 1989 journal entry read: \"I finally understand the words. They're calling me home.\" Her body was never found, but hikers still hear a woman's voice in the choir.",
    authorId: 'guest',
    authorName: 'NightWatcher',
    location: { name: "Devil's Hollow, Kentucky", lat: 37.84, lng: -84.27 },
    category: 'Paranormal',
    upvotes: 298,
    commentCount: 43,
  },
]

async function seed() {
  const required = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION'] as const
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`)
  }

  console.log(`Seeding ${legends.length} legends into DynamoDB table "${TABLE}"...\n`)

  for (const legend of legends) {
    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: legend,
      })
    )
    console.log(`  ✓ ${legend.title} (${legend.category})`)
  }

  console.log('\nDone! All 6 legends inserted.\n')
  console.log('--- Vercel environment variables ---')
  console.log('Add these in your Vercel project settings (Settings → Environment Variables):')
  console.log('')
  console.log('  AWS_ACCESS_KEY_ID')
  console.log('  AWS_SECRET_ACCESS_KEY')
  console.log('  AWS_REGION')
  console.log('')
  console.log('Use the same values as in your local .env.local file.')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
