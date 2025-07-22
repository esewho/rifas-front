import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import { Button } from "./ui/Button"
import { useAuth } from "../context/AuthContext"

export default function Navbar({ onAuthOpen }: { onAuthOpen: () => void }) {
  const { user, logout } = useAuth()
  console.log("Navbar user:", user)
  return (
    <nav className="relative z-10 p-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-800">PremiumRifas</span>
            <div className="text-xs text-slate-500 font-medium">Sorteos Oficiales</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-x-4"
        >
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-slate-700 font-semibold">Hola, {user.username}</span>
              <Button onClick={logout} variant="outline">Cerrar sesión</Button>
            </div>
          ) : (
            <Button onClick={onAuthOpen} variant="primary">Iniciar sesión</Button>
          )}
        </motion.div>
      </div>
    </nav>
  )
}
