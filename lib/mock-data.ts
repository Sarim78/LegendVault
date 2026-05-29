import { Legend, Comment } from './types'

export const mockLegends: Legend[] = [
  {
    id: '1',
    title: 'The Whispering Bridge of Hollow Creek',
    excerpt: 'Locals say if you stand on the old stone bridge at midnight, you can hear the voices of children who disappeared in 1923...',
    content: `Locals say if you stand on the old stone bridge at midnight, you can hear the voices of children who disappeared in 1923. The bridge was built in the late 1800s, spanning a narrow but deep creek that runs through the woods.

In the spring of 1923, three children from the nearby village went to play by the creek and never returned. Search parties scoured the woods for weeks, but no trace of them was ever found. The creek was dredged, the forest searched inch by inch, but it was as if they had simply vanished into thin air.

Since then, travelers crossing the bridge at night have reported hearing faint whispers—children's voices calling out names, sometimes laughing, sometimes crying. Some have claimed to see small figures standing at the water's edge, only to disappear when approached.

A local historian investigated the bridge in 1978 and recorded what he claimed were voices on his tape recorder. The recording was never released to the public, and he refused to speak about what he heard until his death in 2001.

To this day, parents in the area warn their children to stay away from Hollow Creek after dark.`,
    category: 'haunted',
    location: {
      name: 'Hollow Creek, Vermont',
      lat: 44.2601,
      lng: -72.5754,
    },
    upvotes: 342,
    commentCount: 47,
    author: {
      id: 'user1',
      username: 'NightWatcher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NightWatcher',
      joinDate: '2023-06-15',
      bio: 'Collecting stories from the shadows since 2019.',
      legendsCount: 12,
    },
    createdAt: '2024-01-15T20:30:00Z',
  },
  {
    id: '2',
    title: 'The Mothman of Point Pleasant Returns',
    excerpt: 'Multiple witnesses report seeing a large winged creature with glowing red eyes near the old TNT plant area...',
    content: `Multiple witnesses report seeing a large winged creature with glowing red eyes near the old TNT plant area. The sightings began in late October and have continued through the winter months.

The original Mothman sightings occurred in 1966-1967, culminating in the tragic Silver Bridge collapse. For decades, the creature seemed to have vanished, becoming a local legend and tourist attraction. But now, something has changed.

First it was a group of teenagers who saw it perched on an abandoned water tower. Then a truck driver reported something flying alongside his vehicle on Route 62. Then came the photographs—blurry, yes, but showing something with an enormous wingspan.

Local researcher Sarah Chen has been documenting the new sightings. "The descriptions are remarkably consistent with the original reports," she notes. "A humanoid figure, roughly seven feet tall, with wings that span at least fifteen feet. And those eyes—everyone mentions the eyes."

Some fear that history is about to repeat itself. Others believe the Mothman is a harbinger, trying to warn the town of some impending disaster. Whatever the truth, the people of Point Pleasant are watching the skies once again.`,
    category: 'cryptid',
    location: {
      name: 'Point Pleasant, West Virginia',
      lat: 38.8445,
      lng: -82.1371,
    },
    upvotes: 528,
    commentCount: 89,
    author: {
      id: 'user2',
      username: 'CryptoHunter',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoHunter',
      joinDate: '2022-03-21',
      bio: 'Searching for what science cannot explain.',
      legendsCount: 28,
    },
    createdAt: '2024-02-28T14:15:00Z',
  },
  {
    id: '3',
    title: 'The Vanishing Hitchhiker of Route 666',
    excerpt: 'Drivers on the infamous highway report picking up a young woman who disappears before reaching her destination...',
    content: `Drivers on the infamous highway report picking up a young woman who disappears before reaching her destination. The stretch of road, once known as Route 666 before being renamed, has long been associated with mysterious disappearances and unexplained accidents.

The hitchhiker is always described the same way: a young woman in her early twenties, wearing a white dress, standing by the roadside at mile marker 47. She asks for a ride to the next town, speaks little during the journey, and then simply... isn't there anymore.

One trucker, Mike Reeves, shared his experience: "She was right there in my passenger seat. I looked away for maybe two seconds to check my mirrors, and when I looked back, the seat was empty. Not even warm. Like she'd never been there at all."

Some say she was a victim of a hit-and-run decades ago, forever trying to make it home. Others believe she's a warning—a spirit trying to slow down drivers on one of the most dangerous roads in the region.

The state renamed the highway in 2003, hoping to reduce its dark reputation. But the woman in white still appears, waiting for her next ride.`,
    category: 'paranormal',
    location: {
      name: 'Former Route 666, Arizona',
      lat: 35.2741,
      lng: -109.8345,
    },
    upvotes: 276,
    commentCount: 31,
    author: {
      id: 'user3',
      username: 'RoadMystic',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RoadMystic',
      joinDate: '2023-09-10',
      bio: 'Every road has a story. I find them.',
      legendsCount: 7,
    },
    createdAt: '2024-03-05T08:45:00Z',
  },
  {
    id: '4',
    title: 'The Lost Expedition of Deadman\'s Peak',
    excerpt: 'In 1987, eight experienced hikers set out to summit Deadman\'s Peak. Their camp was found, but they never were...',
    content: `In 1987, eight experienced hikers set out to summit Deadman's Peak. Their camp was found intact—food still on the stove, tents still standing—but the hikers were never seen again.

The expedition was led by Marcus Webb, a renowned mountaineer with over 50 successful climbs. His team included survival experts, a geologist, and a documentary filmmaker. They were prepared for everything—or so they thought.

When they failed to check in after day five, a search and rescue team was dispatched. What they found was baffling. The camp was perfectly preserved, as if the occupants had simply stepped away for a moment. Coffee cups sat half-full. A journal entry from the night before their disappearance mentioned "strange lights on the eastern ridge."

The search continued for three weeks. Dogs lost the scent at a ring of unusual stone formations about a mile from camp. No bodies were ever recovered. No trace of the hikers was ever found beyond that circle of stones.

The peak was closed to hikers after 1987. It remains closed to this day. Locals say on clear nights, you can still see lights moving along the ridge.`,
    category: 'disappearance',
    location: {
      name: "Deadman's Peak, Colorado",
      lat: 39.7392,
      lng: -104.9903,
    },
    upvotes: 412,
    commentCount: 56,
    author: {
      id: 'user4',
      username: 'TrailSeeker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TrailSeeker',
      joinDate: '2022-11-30',
      bio: 'Documenting the wilderness and its secrets.',
      legendsCount: 19,
    },
    createdAt: '2024-01-28T16:20:00Z',
  },
  {
    id: '5',
    title: 'The Cursed Mirror of Blackwood Manor',
    excerpt: 'An antique mirror passed down through generations brings misfortune to all who gaze into it at midnight...',
    content: `An antique mirror passed down through generations brings misfortune to all who gaze into it at midnight. The Blackwood family has owned the mirror since 1847, and their history is marked by tragedy after tragedy.

The mirror was reportedly crafted in Venice by an artisan who practiced dark arts. It found its way to America through an estate sale after its original owner died under mysterious circumstances. The Blackwoods purchased it for their newly built manor in Massachusetts.

Within a year of the mirror's arrival, the family patriarch drowned in the nearby lake. His wife fell down the stairs. Their eldest son was thrown from his horse. Each death occurred exactly one week after the victim was last seen looking into the mirror past midnight.

The surviving family members tried to destroy it—but the glass wouldn't break. They tried to sell it—but buyers returned it within days, complaining of nightmares. They tried to bury it—but it was found back in the manor the next morning.

The mirror now hangs in a locked room in what remains of Blackwood Manor, covered by a heavy cloth. The last Blackwood heir vanished in 2019. The manor stands empty, but sometimes visitors report seeing candlelight flickering in that locked room's window.`,
    category: 'cursed',
    location: {
      name: 'Blackwood Manor, Massachusetts',
      lat: 42.3601,
      lng: -71.0589,
    },
    upvotes: 389,
    commentCount: 62,
    author: {
      id: 'user5',
      username: 'AntiqueDread',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AntiqueDread',
      joinDate: '2023-01-05',
      bio: 'History hides the darkest tales.',
      legendsCount: 15,
    },
    createdAt: '2024-02-14T22:00:00Z',
  },
  {
    id: '6',
    title: 'The Singing Caves of Devil\'s Hollow',
    excerpt: 'Deep in the Appalachian Mountains, a network of caves produces sounds that resemble human voices singing hymns...',
    content: `Deep in the Appalachian Mountains, a network of caves produces sounds that resemble human voices singing hymns in a language no one can identify. Geologists attribute it to wind patterns, but locals know better.

The caves were discovered by settlers in the 1700s, who named them "Devil's Hollow" after hearing the unearthly sounds emanating from within. Early explorers who ventured too deep reported feeling watched, and some never returned at all.

In 1952, a university team attempted to map the caves using the latest equipment. Their recordings captured what sounded like a choir of voices singing in harmony. When the recordings were analyzed, linguists couldn't identify the language—it matched no known tongue, living or dead.

One member of that expedition, Dr. Ellen Marsh, became obsessed with the caves. She returned dozens of times over the following decades, each time venturing deeper. In her final journal entry, dated 1989, she wrote: "I finally understand the words. They're calling me home."

Her body was never found. But hikers near the cave entrance still report hearing a woman's voice among the choir, singing louder and clearer than the rest.`,
    category: 'paranormal',
    location: {
      name: "Devil's Hollow, Kentucky",
      lat: 37.8393,
      lng: -84.2700,
    },
    upvotes: 298,
    commentCount: 43,
    author: {
      id: 'user1',
      username: 'NightWatcher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NightWatcher',
      joinDate: '2023-06-15',
      bio: 'Collecting stories from the shadows since 2019.',
      legendsCount: 12,
    },
    createdAt: '2024-03-10T19:30:00Z',
  },
]

export const mockComments: Comment[] = [
  {
    id: 'c1',
    content: 'I grew up near Hollow Creek. My grandmother used to tell us stories about those children. She said on foggy nights, you could see their lanterns by the water.',
    author: {
      id: 'user6',
      username: 'LocalLore',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LocalLore',
    },
    createdAt: '2024-01-16T10:30:00Z',
  },
  {
    id: 'c2',
    content: 'Has anyone actually tried recording at the bridge? I have some professional audio equipment and would love to investigate.',
    author: {
      id: 'user7',
      username: 'AudioGhost',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AudioGhost',
    },
    createdAt: '2024-01-17T15:45:00Z',
  },
  {
    id: 'c3',
    content: 'The detail about the historian\'s recording is fascinating. Does anyone know what happened to those tapes after his death?',
    author: {
      id: 'user8',
      username: 'ArchiveDigger',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ArchiveDigger',
    },
    createdAt: '2024-01-18T09:15:00Z',
  },
  {
    id: 'c4',
    content: 'I drove through that area last summer and felt an overwhelming sense of dread near the bridge. Even in daylight, something felt wrong.',
    author: {
      id: 'user9',
      username: 'RoadTripper',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RoadTripper',
    },
    createdAt: '2024-01-20T20:00:00Z',
  },
]
