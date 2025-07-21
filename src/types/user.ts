export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

export type UserRole = "participant" | "organizer"