export interface Image {
  url: string
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