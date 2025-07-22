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
  status: "draft" | "active" | "completed"
  maxTickets: number
  images: Image[]
  tickets: Ticket[]
  userId: string
  organizerName: string
  createdAt: Date
}

// Agregar datos simulados al inicio del archivo, después de las interfaces:


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
