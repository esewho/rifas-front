export interface Image {
  id: string | number;
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
  images: File[]
  tickets: Ticket[]
  userId: string
  organizerName: string
  createdAt: Date
  isActive: boolean
}

export interface RaffleImagesCarouselProps {
  images: Image[];
}
