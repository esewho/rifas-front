import type { Raffle } from "../common/types/common"

export const mockRaffles: Raffle[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description:
      "Último modelo de iPhone con 256GB de almacenamiento, color titanio natural. Incluye cargador y audífonos originales.",
    startDate: new Date("2025-07-07"),
    endDate: new Date("2025-07-15"),
    maxTickets: 1000,
    price: 25.99,
    organizerName: "TechStore MX",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    images: [
      { id: "1", url: "/placeholder.svg?height=400&width=400", raffleId: "1" },
      { id: "2", url: "/placeholder.svg?height=400&width=400", raffleId: "1" },
      { id: "3", url: "/placeholder.svg?height=400&width=400", raffleId: "1" },
    ],
    tickets: Array.from({ length: 750 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      userId: `user-${Math.floor(Math.random() * 100)}`,
      raffleId: "1",
    })),
  },
  {
    id: "2",
    name: "MacBook Air M3",
    description: "MacBook Air con chip M3, 16GB RAM, 512GB SSD. Perfecta para trabajo y estudios.",
    startDate: new Date("2024-01-10"),
    endDate: new Date("2024-03-01"),
    maxTickets: 2000,
    price: 45.5,
    organizerName: "Apple Premium",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    images: [
      { id: "4", url: "/placeholder.svg?height=400&width=400", raffleId: "2" },
      { id: "5", url: "/placeholder.svg?height=400&width=400", raffleId: "2" },
    ],
    tickets: Array.from({ length: 1200 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      userId: `user-${Math.floor(Math.random() * 100)}`,
      raffleId: "2",
    })),
  },
  {
    id: "3",
    name: "PlayStation 5 + Juegos",
    description: "Consola PS5 nueva con 3 juegos incluidos: Spider-Man 2, FIFA 24 y Call of Duty.",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-02-28"),
    maxTickets: 800,
    price: 35.0,
    organizerName: "GameZone",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    images: [
      { id: "6", url: "/placeholder.svg?height=400&width=400", raffleId: "3" },
      { id: "7", url: "/placeholder.svg?height=400&width=400", raffleId: "3" },
      { id: "8", url: "/placeholder.svg?height=400&width=400", raffleId: "3" },
    ],
    tickets: Array.from({ length: 450 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      userId: `user-${Math.floor(Math.random() * 100)}`,
      raffleId: "3",
    })),
  },
  {
    id: "4",
    name: "Tesla Model 3",
    description: "Tesla Model 3 2024, color blanco perla, autopilot incluido. El auto del futuro.",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-04-30"),
    maxTickets: 10000,
    price: 99.99,
    organizerName: "AutoLux",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    images: [
      { id: "9", url: "/placeholder.svg?height=400&width=400", raffleId: "4" },
      { id: "10", url: "/placeholder.svg?height=400&width=400", raffleId: "4" },
      { id: "11", url: "/placeholder.svg?height=400&width=400", raffleId: "4" },
    ],
    tickets: Array.from({ length: 3500 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      userId: `user-${Math.floor(Math.random() * 100)}`,
      raffleId: "4",
    })),
  },
  {
    id: "5",
    name: "Viaje a París",
    description: "Viaje todo incluido para 2 personas a París por 7 días. Hotel 5 estrellas, vuelos y tours incluidos.",
    startDate: new Date("2024-01-20"),
    endDate: new Date("2024-03-15"),
    maxTickets: 500,
    price: 55.0,
    organizerName: "Travel Dreams",
    organizerAvatar: "/placeholder.svg?height=40&width=40",
    images: [
      { id: "12", url: "/placeholder.svg?height=400&width=400", raffleId: "5" },
      { id: "13", url: "/placeholder.svg?height=400&width=400", raffleId: "5" },
    ],
    tickets: Array.from({ length: 280 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      userId: `user-${Math.floor(Math.random() * 100)}`,
      raffleId: "5",
    })),
  },
]

export function getRaffleById(id: string): Raffle | undefined {
  return mockRaffles.find((raffle) => raffle.id === id)
}
