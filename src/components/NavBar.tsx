import { motion } from "framer-motion"
import { Trophy } from "lucide-react"

export default function Navbar() {
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
						<span className="text-2xl font-bold text-slate-800">
							PremiumRifas
						</span>
						<div className="text-xs text-slate-500 font-medium">
							Sorteos Oficiales
						</div>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					className="space-x-4"
				>
					<button className="text-slate-600 hover:text-blue-600 font-medium">
						Iniciar Sesión
					</button>
					<button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6">
						Crear Cuenta
					</button>
				</motion.div>
			</div>
		</nav>
	)
}
