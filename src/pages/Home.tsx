import { motion } from "framer-motion"

import { Shield, CheckCircle, Award } from "lucide-react"
import Navbar from "../components/NavBar"
import Hero from "../components/Hero"
import Raffles from "./Raffles"
import Footer from "../components/Footer"

const steps = [
	{
		icon: Award,
		title: "Selecciona tu premio",
		description:
			"Explora nuestra selección curada de premios de alta calidad y elige el que más te interese",
	},
	{
		icon: Shield,
		title: "Compra segura",
		description:
			"Proceso de pago protegido con confirmación instantánea de tus boletos",
	},
	{
		icon: CheckCircle,
		title: "Sorteo transparente",
		description:
			"Sorteos públicos verificables con entrega garantizada del premio",
	},
]

export default function RaffleLanding() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Subtle Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{
						y: [0, -20, 0],
						opacity: [0.1, 0.2, 0.1],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						y: [0, 20, 0],
						opacity: [0.1, 0.15, 0.1],
					}}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="absolute bottom-32 left-16 w-40 h-40 bg-emerald-200 rounded-full blur-3xl"
				/>
			</div>

			{/* Navigation */}
			<Navbar />
			{/* Hero Section */}
			<Hero />

			{/* Active Raffles Section */}
			<Raffles />

			{/* How It Works Section */}
			<section className="relative z-10 py-20 px-6 bg-slate-50">
				<div className="max-w-6xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="text-center mb-16"
					>
						<h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
							¿Cómo Funciona?
						</h2>
						<p className="text-xl text-slate-600 max-w-2xl mx-auto">
							Proceso simple y transparente para participar en nuestros sorteos
							oficiales
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.2 }}
								className="relative group"
							>
								<div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-slate-200">
									<div className="relative mb-6">
										<div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
											<step.icon className="h-8 w-8 text-white" />
										</div>
										<div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
											{index + 1}
										</div>
									</div>

									<h3 className="text-xl font-semibold text-slate-800 mb-4">
										{step.title}
									</h3>
									<p className="text-slate-600 leading-relaxed">
										{step.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Trust Section */}
			<section className="relative z-10 py-16 px-6 bg-blue-600">
				<div className="max-w-4xl mx-auto text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
							Confianza y Transparencia
						</h2>
						<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Todos nuestros sorteos son públicos, verificables y están
							regulados por las autoridades competentes
						</p>
						<div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
							<div className="flex items-center text-white">
								<Shield className="h-6 w-6 mr-2" />
								<span className="font-medium">Sorteos Verificados</span>
							</div>
							<div className="flex items-center text-white">
								<CheckCircle className="h-6 w-6 mr-2" />
								<span className="font-medium">Premios Garantizados</span>
							</div>
							<div className="flex items-center text-white">
								<Award className="h-6 w-6 mr-2" />
								<span className="font-medium">Proceso Transparente</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<Footer />
		</div>
	)
}
