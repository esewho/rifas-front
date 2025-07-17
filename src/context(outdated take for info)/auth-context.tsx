import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loginService, registerService } from "../lib/auth"
import CookiesRepository from "../common/utils/CookiesRepository"

export type UserRole = "participant" | "organizer"

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (email: string, password: string, username?: string, role?: UserRole) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  loading: boolean
  requireAuth: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Usuarios simulados para demo
const mockUsers: User[] = [
  {
    id: "1",
    username: "Juan Pérez",
    email: "juan@example.com",
    role: "participant",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2", 
    username: "María García",
    email: "maria@example.com",
    role: "organizer",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    username: "Carlos López",
    email: "carlos@example.com", 
    role: "organizer",
    createdAt: new Date("2024-01-05"),
  }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem("raffle_user")
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser({
          ...parsedUser,
          createdAt: new Date(parsedUser.createdAt)
        })
      } catch {
        localStorage.removeItem("raffle_user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    const response = await loginService(email, password)
    console.log(response)
    if (response?.user && response?.accessToken) {
      setUser(response.user)
      localStorage.setItem("raffle_user", JSON.stringify(response.user))
      CookiesRepository.setCookie("access_token", response.accessToken, 20)
      return { success: true, user: response.user }
    }

    return { success: false, error: response?.error }
  }

  const register = async (email: string, password: string, username?: string, role?: UserRole): Promise<{ success: boolean; user?: User; error?: string }> => {

    if (!username) {
      username = email.split('@')[0]
    }

    const response = await registerService(email, password, username, role)

    if (response?.user && response?.accessToken) {
      setUser(response.user)
      localStorage.setItem("raffle_user", JSON.stringify(response.user))
      CookiesRepository.setCookie("access_token", response.accessToken, 20)
      return { success: true, user: response.user }
    }

    return { success: false, error: response?.error }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("raffle_user")
  }

  const requireAuth = (): boolean => {
    return !!user
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        loading,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
