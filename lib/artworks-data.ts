import { resolveAsset } from "@/lib/asset-registry"

export interface ArtworkPiece {
  id: string
  title: string
  file: string
  medium: string
  description: string
  width: number
  height: number
  aspectRatio: number
  src: string
  artistName: string
  artistDepartment: string
  artistDeptShort: string
  artistSemester: string
  artistAvatar: string
  ticketId: string
  featured?: boolean
}

export interface Artist {
  id: string
  name: string
  department: string
  deptShort: string
  semester: string
  ticketId: string
  avatar: string
  avatarSrc: string
  avatarWidth: number
  avatarHeight: number
  artworks: ArtworkPiece[]
}

export const ARTISTS_DATA: Artist[] = [
  {
    id: "adil-roshan",
    name: "Adil Roshan",
    department: "Computer Science & Engineering",
    deptShort: "CSE",
    semester: "Semester 4",
    ticketId: "MAG-332623",
    avatar: "art-adil-roshan-avatar.webp",
    avatarSrc: resolveAsset("art-adil-roshan-avatar.webp"),
    avatarWidth: 873,
    avatarHeight: 871,
    artworks: [
      {
        id: "samurai-1",
        title: "Samurai · Lone Blade",
        file: "art-adil-roshan-samurai-1.webp",
        medium: "Pencil & Sketch",
        description: "A fierce tribute to the bushido code, capturing the poised calm before the storm.",
        width: 2868,
        height: 2711,
        aspectRatio: 1.058,
        src: resolveAsset("art-adil-roshan-samurai-1.webp"),
        artistName: "Adil Roshan",
        artistDepartment: "Computer Science & Engineering",
        artistDeptShort: "CSE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-adil-roshan-avatar.webp"),
        ticketId: "MAG-332623",
        featured: true
      },
      {
        id: "samurai-2",
        title: "Samurai · Honor & Valor",
        file: "art-adil-roshan-samurai-2.webp",
        medium: "Ink Illustration",
        description: "Striking dynamic lines embodying discipline, speed, and precision.",
        width: 2259,
        height: 3057,
        aspectRatio: 0.739,
        src: resolveAsset("art-adil-roshan-samurai-2.webp"),
        artistName: "Adil Roshan",
        artistDepartment: "Computer Science & Engineering",
        artistDeptShort: "CSE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-adil-roshan-avatar.webp"),
        ticketId: "MAG-332623"
      }
    ]
  },
  {
    id: "akshaya-sajeevan",
    name: "Akshaya Sajeevan",
    department: "Computer Science & Engineering",
    deptShort: "CSE",
    semester: "Semester 2",
    ticketId: "MAG-156699",
    avatar: "art-akshaya-sajeevan-avatar.webp",
    avatarSrc: resolveAsset("art-akshaya-sajeevan-avatar.webp"),
    avatarWidth: 679,
    avatarHeight: 680,
    artworks: [
      {
        id: "moment-among-leaves",
        title: "A Moment Among the Leaves",
        file: "art-akshaya-sajeevan-moment-among-leaves.webp",
        medium: "Pencil & Color Study",
        description: "A tiny bird, a leafy perch, and a moment of calm. Sometimes, simplicity creates the most beautiful art 🐦.",
        width: 2592,
        height: 3548,
        aspectRatio: 0.731,
        src: resolveAsset("art-akshaya-sajeevan-moment-among-leaves.webp"),
        artistName: "Akshaya Sajeevan",
        artistDepartment: "Computer Science & Engineering",
        artistDeptShort: "CSE",
        artistSemester: "Semester 2",
        artistAvatar: resolveAsset("art-akshaya-sajeevan-avatar.webp"),
        ticketId: "MAG-156699",
        featured: true
      }
    ]
  },
  {
    id: "anushree-k",
    name: "Anushree K",
    department: "Computer Science & Engineering",
    deptShort: "CSE",
    semester: "Semester 8",
    ticketId: "MAG-603145",
    avatar: "art-anushree-k-avatar.webp",
    avatarSrc: resolveAsset("art-anushree-k-avatar.webp"),
    avatarWidth: 901,
    avatarHeight: 903,
    artworks: [
      {
        id: "divine-flame",
        title: "The Divine Flame",
        file: "art-anushree-k-divine-flame.webp",
        medium: "Portrait & Tone Study",
        description: "An ethereal visual ode to sacred light, divinity, and the transcendent spark within humanity.",
        width: 2781,
        height: 3947,
        aspectRatio: 0.705,
        src: resolveAsset("art-anushree-k-divine-flame.webp"),
        artistName: "Anushree K",
        artistDepartment: "Computer Science & Engineering",
        artistDeptShort: "CSE",
        artistSemester: "Semester 8",
        artistAvatar: resolveAsset("art-anushree-k-avatar.webp"),
        ticketId: "MAG-603145",
        featured: true
      }
    ]
  },
  {
    id: "drawing-club",
    name: "Drawing Club",
    department: "Electronics & Communication Engineering",
    deptShort: "ECE",
    semester: "Semester 6",
    ticketId: "MAG-336329",
    avatar: "art-drawing-club-avatar.webp",
    avatarSrc: resolveAsset("art-drawing-club-avatar.webp"),
    avatarWidth: 640,
    avatarHeight: 640,
    artworks: [
      {
        id: "piece-of-art-1",
        title: "A Piece of Our Art · Opus I",
        file: "art-drawing-club-opus-1.webp",
        medium: "Fine Art & Mixed Media",
        description: "A collective masterpiece woven with imagination, technical finesse, and collaborative passion.",
        width: 2925,
        height: 3934,
        aspectRatio: 0.744,
        src: resolveAsset("art-drawing-club-opus-1.webp"),
        artistName: "Drawing Club",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 6",
        artistAvatar: resolveAsset("art-drawing-club-avatar.webp"),
        ticketId: "MAG-336329",
        featured: true
      },
      {
        id: "piece-of-art-2",
        title: "A Piece of Our Art · Opus II",
        file: "art-drawing-club-opus-2.webp",
        medium: "Fine Art & Mixed Media",
        description: "A rich visual harmony exploring textured depth, creative courage, and campus spirit.",
        width: 3009,
        height: 4011,
        aspectRatio: 0.75,
        src: resolveAsset("art-drawing-club-opus-2.webp"),
        artistName: "Drawing Club",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 6",
        artistAvatar: resolveAsset("art-drawing-club-avatar.webp"),
        ticketId: "MAG-336329"
      }
    ]
  },
  {
    id: "gokul-p",
    name: "Gokul P",
    department: "Electronics & Communication Engineering",
    deptShort: "ECE",
    semester: "Semester 4",
    ticketId: "MAG-820349",
    avatar: "art-gokul-p-avatar.webp",
    avatarSrc: resolveAsset("art-gokul-p-avatar.webp"),
    avatarWidth: 2501,
    avatarHeight: 2507,
    artworks: [
      {
        id: "thattathin-marayathu",
        title: "Thattathin Marayathu",
        file: "art-gokul-p-thattathin-marayathu.webp",
        medium: "Digital Illustration",
        description: "A nostalgic, cinematic digital canvas breathing life into warmth, memory, and cinematic romance.",
        width: 606,
        height: 1077,
        aspectRatio: 0.563,
        src: resolveAsset("art-gokul-p-thattathin-marayathu.webp"),
        artistName: "Gokul P",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-gokul-p-avatar.webp"),
        ticketId: "MAG-820349",
        featured: true
      }
    ]
  },
  {
    id: "gowrinanda-ms",
    name: "Gowrinanda MS",
    department: "Civil Engineering",
    deptShort: "Civil",
    semester: "Semester 8",
    ticketId: "MAG-321966",
    avatar: "art-gowrinanda-ms-avatar.webp",
    avatarSrc: resolveAsset("art-gowrinanda-ms-avatar.webp"),
    avatarWidth: 576,
    avatarHeight: 575,
    artworks: [
      {
        id: "just-go-with-the-flow",
        title: "Just Go With The Flow",
        file: "art-gowrinanda-ms-just-go-with-the-flow.webp",
        medium: "Vector Illustration & Fine Graphics",
        description: "A free-spirited, rhythmic composition celebrating effortless movement and serene balance.",
        width: 1653,
        height: 2339,
        aspectRatio: 0.707,
        src: resolveAsset("art-gowrinanda-ms-just-go-with-the-flow.webp"),
        artistName: "Gowrinanda MS",
        artistDepartment: "Civil Engineering",
        artistDeptShort: "Civil",
        artistSemester: "Semester 8",
        artistAvatar: resolveAsset("art-gowrinanda-ms-avatar.webp"),
        ticketId: "MAG-321966",
        featured: true
      }
    ]
  },
  {
    id: "navami-p-m",
    name: "Navami P M",
    department: "Computer Science & Engineering",
    deptShort: "CSE",
    semester: "Semester 2",
    ticketId: "MAG-882025",
    avatar: "art-navami-p-m-avatar.webp",
    avatarSrc: resolveAsset("art-navami-p-m-avatar.webp"),
    avatarWidth: 2424,
    avatarHeight: 2413,
    artworks: [
      {
        id: "eyes-masterpiece",
        title: "Eyes · Windows of the Soul",
        file: "art-navami-p-m-eyes-masterpiece.webp",
        medium: "Charcoal & Fine Pencil",
        description: "A piercing gaze rendered with subtle tonal gradients, capturing raw vulnerability and deep emotion.",
        width: 1170,
        height: 1464,
        aspectRatio: 0.8,
        src: resolveAsset("art-navami-p-m-eyes-masterpiece.webp"),
        artistName: "Navami P M",
        artistDepartment: "Computer Science & Engineering",
        artistDeptShort: "CSE",
        artistSemester: "Semester 2",
        artistAvatar: resolveAsset("art-navami-p-m-avatar.webp"),
        ticketId: "MAG-882025",
        featured: true
      }
    ]
  },
  {
    id: "sifna-ameesha-vk",
    name: "Sifna Ameesha VK",
    department: "Electrical & Electronics Engineering",
    deptShort: "EEE",
    semester: "Semester 4",
    ticketId: "MAG-591245",
    avatar: "art-sifna-ameesha-vk-avatar.webp",
    avatarSrc: resolveAsset("art-sifna-ameesha-vk-avatar.webp"),
    avatarWidth: 565,
    avatarHeight: 567,
    artworks: [
      {
        id: "water-lily",
        title: "Glimpse of Water Lily",
        file: "art-sifna-ameesha-vk-water-lily.webp",
        medium: "Oil on Canvas",
        description: "A delicate study of blossoms resting on tranquil waters, capturing subtle ripples and petals in bloom.",
        width: 2064,
        height: 2660,
        aspectRatio: 0.776,
        src: resolveAsset("art-sifna-ameesha-vk-water-lily.webp"),
        artistName: "Sifna Ameesha VK",
        artistDepartment: "Electrical & Electronics Engineering",
        artistDeptShort: "EEE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-sifna-ameesha-vk-avatar.webp"),
        ticketId: "MAG-591245",
        featured: true
      },
      {
        id: "pair-of-cherries",
        title: "Pair of Cherries",
        file: "art-sifna-ameesha-vk-pair-of-cherries.webp",
        medium: "Oil Painting Study",
        description: "An oil painting study of cherries that emphasizes their vivid colour and simple beauty.",
        width: 3152,
        height: 2292,
        aspectRatio: 1.375,
        src: resolveAsset("art-sifna-ameesha-vk-pair-of-cherries.webp"),
        artistName: "Sifna Ameesha VK",
        artistDepartment: "Electrical & Electronics Engineering",
        artistDeptShort: "EEE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-sifna-ameesha-vk-avatar.webp"),
        ticketId: "MAG-358804"
      },
      {
        id: "above-the-canopy",
        title: "Above the Canopy",
        file: "art-sifna-ameesha-vk-above-the-canopy.webp",
        medium: "Oil Painting & Landscape",
        description: "A tower emerging from the lush greenery, evoking solitude, height, and nature’s embrace.",
        width: 2868,
        height: 2196,
        aspectRatio: 1.306,
        src: resolveAsset("art-sifna-ameesha-vk-above-the-canopy.webp"),
        artistName: "Sifna Ameesha VK",
        artistDepartment: "Electrical & Electronics Engineering",
        artistDeptShort: "EEE",
        artistSemester: "Semester 4",
        artistAvatar: resolveAsset("art-sifna-ameesha-vk-avatar.webp"),
        ticketId: "MAG-685606"
      }
    ]
  },
  {
    id: "sreenandana-k",
    name: "Sreenandana K",
    department: "Electronics & Communication Engineering",
    deptShort: "ECE",
    semester: "Semester 6",
    ticketId: "MAG-131312",
    avatar: "art-sreenandana-k-avatar.webp",
    avatarSrc: resolveAsset("art-sreenandana-k-avatar.webp"),
    avatarWidth: 676,
    avatarHeight: 680,
    artworks: [
      {
        id: "colors-of-the-soul",
        title: "Colors of the Soul",
        file: "art-sreenandana-k-colors-of-the-soul.webp",
        medium: "Acrylic & Abstract Impressionism",
        description: "A symphony of colours and emotions, where abstraction meets the quiet elegance of the human spirit.",
        width: 2438,
        height: 2576,
        aspectRatio: 0.946,
        src: resolveAsset("art-sreenandana-k-colors-of-the-soul.webp"),
        artistName: "Sreenandana K",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 6",
        artistAvatar: resolveAsset("art-sreenandana-k-avatar.webp"),
        ticketId: "MAG-131312",
        featured: true
      }
    ]
  },
  {
    id: "vishnu-pv",
    name: "Vishnu PV",
    department: "Electronics & Communication Engineering",
    deptShort: "ECE",
    semester: "Semester 2",
    ticketId: "MAG-598327",
    avatar: "art-vishnu-pv-avatar.webp",
    avatarSrc: resolveAsset("art-vishnu-pv-avatar.webp"),
    avatarWidth: 1916,
    avatarHeight: 1915,
    artworks: [
      {
        id: "radha-krishn-1",
        title: "Radha Krishn · Divine Harmony",
        file: "art-vishnu-pv-radha-krishn-1.webp",
        medium: "Digital Fine Art",
        description: "Lyrical devotion rendered in vibrant divine palettes and expressive spiritual motifs.",
        width: 1079,
        height: 1488,
        aspectRatio: 0.725,
        src: resolveAsset("art-vishnu-pv-radha-krishn-1.webp"),
        artistName: "Vishnu PV",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 2",
        artistAvatar: resolveAsset("art-vishnu-pv-avatar.webp"),
        ticketId: "MAG-598327",
        featured: true
      },
      {
        id: "radha-krishn-2",
        title: "Radha Krishn · Eternal Bond",
        file: "art-vishnu-pv-radha-krishn-2.webp",
        medium: "Digital Art & Mandala",
        description: "A sacred visual celebration of eternal companionship, music, and divine romance.",
        width: 1080,
        height: 1527,
        aspectRatio: 0.707,
        src: resolveAsset("art-vishnu-pv-radha-krishn-2.webp"),
        artistName: "Vishnu PV",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 2",
        artistAvatar: resolveAsset("art-vishnu-pv-avatar.webp"),
        ticketId: "MAG-598327"
      },
      {
        id: "radha-krishn-3",
        title: "Radha Krishn · Celestial Aura",
        file: "art-vishnu-pv-radha-krishn-3.webp",
        medium: "Digital Fine Art",
        description: "An ornate celebration of folklore, devotion, and vibrant colour rhythms.",
        width: 1080,
        height: 1438,
        aspectRatio: 0.751,
        src: resolveAsset("art-vishnu-pv-radha-krishn-3.webp"),
        artistName: "Vishnu PV",
        artistDepartment: "Electronics & Communication Engineering",
        artistDeptShort: "ECE",
        artistSemester: "Semester 2",
        artistAvatar: resolveAsset("art-vishnu-pv-avatar.webp"),
        ticketId: "MAG-598327"
      }
    ]
  }
]

export const ALL_ARTWORKS: ArtworkPiece[] = ARTISTS_DATA.flatMap(artist => artist.artworks)

export const FEATURED_ARTWORKS: ArtworkPiece[] = ALL_ARTWORKS.filter(art => art.featured)

export const DEPARTMENTS = ["ALL", "CSE", "ECE", "Civil", "EEE"]
