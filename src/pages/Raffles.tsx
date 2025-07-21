import { motion } from "framer-motion"
import { Ticket, Users, Clock, ShoppingCart } from "lucide-react"

export default function Raffles() {
	const raffles = [
		{
			id: 1,
			name: "iPhone 15 Pro Max 256GB",
			image: "/placeholder.svg?height=250&width=350",
			price: "$12",
			totalTickets: 2500,
			remainingTickets: 847,
			deadline: "15 Feb 2024",
			category: "Tecnología",
			featured: true,
			status: "Activa",
		},
		{
			id: 2,
			name: "Tesla Model 3 2024",
			image: "/placeholder.svg?height=250&width=350",
			price: "$25",
			totalTickets: 5000,
			remainingTickets: 1234,
			deadline: "28 Feb 2024",
			category: "Automóvil",
			featured: true,
			status: "Activa",
		},
		{
			id: 3,
			name: "MacBook Pro M3 Max",
			image: "/placeholder.svg?height=250&width=350",
			price: "$18",
			totalTickets: 1800,
			remainingTickets: 456,
			deadline: "22 Feb 2024",
			category: "Tecnología",
			featured: false,
			status: "Activa",
		},
		{
			id: 4,
			name: "Rolex Submariner",
			image: "/placeholder.svg?height=250&width=350",
			price: "$35",
			totalTickets: 3000,
			remainingTickets: 789,
			deadline: "10 Mar 2024",
			category: "Lujo",
			featured: false,
			status: "Activa",
		},
		{
			id: 5,
			name: "PlayStation 5 Pro Bundle",
			image: "/placeholder.svg?height=250&width=350",
			price: "$8",
			totalTickets: 1200,
			remainingTickets: 234,
			deadline: "18 Feb 2024",
			category: "Gaming",
			featured: false,
			status: "Activa",
		},
		{
			id: 6,
			name: "Vacaciones en Maldivas",
			image: "/placeholder.svg?height=250&width=350",
			price: "$22",
			totalTickets: 2000,
			remainingTickets: 567,
			deadline: "05 Mar 2024",
			category: "Viajes",
			featured: false,
			status: "Activa",
		},
	]
	return (
		<section className="relative z-10 py-20 px-6 bg-white">
			<div className="max-w-7xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
						Rifas Activas
					</h2>
					<p className="text-xl text-slate-600 max-w-2xl mx-auto">
						Selección curada de premios excepcionales con sorteos transparentes
						y entregas garantizadas
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{raffles.map((raffle, index) => (
						<motion.div
							key={raffle.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							whileHover={{ y: -5 }}
							className="group relative"
						>
							{raffle.featured && (
								<div className="absolute -top-3 -right-3 z-10">
									<div className="bg-amber-100 text-amber-700 border border-amber-200 text-sm font-medium px-3 py-1 rounded-md">
										⭐ Destacado
									</div>
								</div>
							)}

							<div className="bg-white border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl">
								<div className="relative">
									<img
										src={raffle.image}
										alt={raffle.name}
										width={350}
										height={250}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

									<div className="absolute top-4 left-4 bg-white/90 text-slate-700 text-sm font-medium px-3 py-1 rounded-md">
										{raffle.category}
									</div>

									<div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
										<div className="text-lg font-bold text-slate-800">
											{raffle.price}
										</div>
										<div className="text-xs text-slate-600">por boleto</div>
									</div>
								</div>

								<div className="p-6">
									<h3 className="text-lg font-semibold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
										{raffle.name}
									</h3>

									<div className="space-y-3 mb-6 text-sm">
										<div className="flex justify-between items-center">
											<span className="text-slate-500 flex items-center">
												<Ticket className="h-4 w-4 mr-1" />
												Total de boletos:
											</span>
											<span className="text-slate-800 font-medium">
												{raffle.totalTickets.toLocaleString()}
											</span>
										</div>

										<div className="flex justify-between items-center">
											<span className="text-slate-500 flex items-center">
												<Users className="h-4 w-4 mr-1" />
												Disponibles:
											</span>
											<span className="text-blue-600 font-medium">
												{raffle.remainingTickets.toLocaleString()}
											</span>
										</div>

										<div className="flex justify-between items-center">
											<span className="text-slate-500 flex items-center">
												<Clock className="h-4 w-4 mr-1" />
												Sorteo:
											</span>
											<span className="text-slate-800 font-medium">
												{raffle.deadline}
											</span>
										</div>

										<div className="space-y-2">
											<div className="flex justify-between">
												<span className="text-slate-500">
													Progreso de venta
												</span>
												<span className="text-slate-700 font-medium">
													{Math.round(
														((raffle.totalTickets - raffle.remainingTickets) /
															raffle.totalTickets) *
															100
													)}
													%
												</span>
											</div>
											<div className="w-full bg-slate-200 rounded-full h-2">
												<div
													className="bg-blue-600 h-2 rounded-full transition-all duration-300"
													style={{
														width: `${
															((raffle.totalTickets - raffle.remainingTickets) /
																raffle.totalTickets) *
															100
														}%`,
													}}
												></div>
											</div>
										</div>
									</div>

									<button className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-2.5 rounded-md flex items-center justify-center transition-all duration-300">
										<ShoppingCart className="h-4 w-4 mr-2" />
										Comprar Boletos
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
