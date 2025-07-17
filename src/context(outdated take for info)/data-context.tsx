"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createRaffleService } from "../lib/raffle-organizer"
import { getRaffleParticipantService, getRafflesParticipantsService } from "../lib/raffle-participant"

export interface Image {
  url: string
  raffleId: string
}

export interface Ticket {
  id: string
  number: number
  raffleId: string
  userId: string
  userName: string
  purchaseDate: Date
  price: number
}

export interface Raffle {
  id: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  price: number
  maxTickets: number
  images: Image[]
  tickets: Ticket[]
  userId: string
  organizerName: string
  createdAt: Date
}

// Agregar datos simulados al inicio del archivo, después de las interfaces:
const mockRaffles: Raffle[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description:
      "Último modelo de iPhone con 256GB de almacenamiento, color titanio natural. Incluye cargador y audífonos originales.",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    price: 50,
    maxTickets: 1000,
    userId: "2",
    organizerName: "María García",
    createdAt: new Date("2024-01-15"),
    images: [
      { url: "/placeholder.svg?height=400&width=400&text=iPhone+15+Pro", raffleId: "1" },
      { url: "/placeholder.svg?height=400&width=400&text=iPhone+Box", raffleId: "1" },
      { url: "/placeholder.svg?height=400&width=400&text=iPhone+Colors", raffleId: "1" },
    ],
    tickets: Array.from({ length: 234 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      raffleId: "1",
      userId: `user-${Math.floor(Math.random() * 50)}`,
      userName: `Usuario ${Math.floor(Math.random() * 50)}`,
      purchaseDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      price: 50,
    })),
  },
  {
    id: "2",
    name: "MacBook Air M3",
    description:
      "MacBook Air con chip M3, 16GB RAM, 512GB SSD. Perfecta para trabajo y estudios. Incluye cargador y funda protectora.",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-06-30"),
    price: 75,
    maxTickets: 800,
    userId: "2",
    organizerName: "María García",
    createdAt: new Date("2024-01-20"),
    images: [
      { url: "/placeholder.svg?height=400&width=400&text=MacBook+Air", raffleId: "2" },
      { url: "/placeholder.svg?height=400&width=400&text=MacBook+Open", raffleId: "2" },
    ],
    tickets: Array.from({ length: 156 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      raffleId: "2",
      userId: `user-${Math.floor(Math.random() * 30)}`,
      userName: `Usuario ${Math.floor(Math.random() * 30)}`,
      purchaseDate: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000),
      price: 75,
    })),
  },
  {
    id: "3",
    name: "PlayStation 5",
    description:
      "Consola PS5 con control DualSense y juego Spider-Man 2 incluido. Perfecta para gaming de nueva generación.",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-15"),
    price: 40,
    maxTickets: 1200,
    userId: "3",
    organizerName: "Carlos López",
    createdAt: new Date("2024-02-01"),
    images: [
      { url: "/placeholder.svg?height=400&width=400&text=PlayStation+5", raffleId: "3" },
      { url: "/placeholder.svg?height=400&width=400&text=PS5+Controller", raffleId: "3" },
      { url: "/placeholder.svg?height=400&width=400&text=Spider-Man+2", raffleId: "3" },
    ],
    tickets: Array.from({ length: 678 }, (_, i) => ({
      id: `ticket-${i}`,
      number: i + 1,
      raffleId: "3",
      userId: `user-${Math.floor(Math.random() * 80)}`,
      userName: `Usuario ${Math.floor(Math.random() * 80)}`,
      purchaseDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000),
      price: 40,
    })),
  },
]

// Actualizar la interfaz DataContextType para incluir todas las funciones:
interface DataContextType {
  raffles: Raffle[]
  addRaffle: (raffle: Omit<Raffle, "id">) => void
  getRaffleById: (id: string) => Raffle | undefined
  getAvailableTickets: (raffleId: string) => number[]
  buyTickets: (raffleId: string, userId: string, userName: string, ticketNumbers: number[]) => boolean
  getUserRaffles: (userId: string) => Raffle[]
  getRaffleTickets: (raffleId: string) => Ticket[]
}

const DataContext = createContext<DataContextType | undefined>(undefined)

// Actualizar el DataProvider para inicializar con datos simulados:
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [raffles, setRaffles] = useState<Raffle[]>(mockRaffles)

  useEffect(() => {
    getRafflesParticipantsService().then((data) => {
      console.log(data)
      setRaffles(data)
    })
  }, [])

  const addRaffle =  async (raffle: Omit<Raffle, "id">) => {
    await createRaffleService(raffle)

    const newRaffle: Raffle = {
      ...raffle,
      id: Date.now().toString(),
    }
    setRaffles((prev) => [...prev, newRaffle])
  }

  const getRaffleById = (id: string): Raffle | undefined => {
    return raffles.find((raffle) => raffle.id === id)
  }

  const getAvailableTickets = (raffleId: string): number[] => {
    const raffle = getRaffleById(raffleId)
    if (!raffle) return []

    const occupiedNumbers = raffle.tickets.map((ticket) => ticket.number)
    const availableNumbers = []

    for (let i = 1; i <= raffle.maxTickets; i++) {
      if (!occupiedNumbers.includes(i)) {
        availableNumbers.push(i)
      }
    }

    return availableNumbers
  }

  const buyTickets = (raffleId: string, userId: string, userName: string, ticketNumbers: number[]): boolean => {
    const raffle = getRaffleById(raffleId)
    if (!raffle) return false

    const availableNumbers = getAvailableTickets(raffleId)
    const canBuyAll = ticketNumbers.every((num) => availableNumbers.includes(num))

    if (!canBuyAll) return false

    const newTickets: Ticket[] = ticketNumbers.map((number) => ({
      id: `${raffleId}-${number}-${Date.now()}`,
      number,
      raffleId,
      userId,
      userName,
      purchaseDate: new Date(),
      price: raffle.price,
    }))

    setRaffles((prev) => prev.map((r) => (r.id === raffleId ? { ...r, tickets: [...r.tickets, ...newTickets] } : r)))

    return true
  }

  const getUserRaffles = (userId: string): Raffle[] => {
    return raffles.filter((raffle) => raffle.userId === userId)
  }

  const getRaffleTickets = (raffleId: string): Ticket[] => {
    const raffle = getRaffleById(raffleId)
    return raffle?.tickets || []
  }

  return (
    <DataContext.Provider
      value={{
        raffles,
        addRaffle,
        getRaffleById,
        getAvailableTickets,
        buyTickets,
        getUserRaffles,
        getRaffleTickets,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
