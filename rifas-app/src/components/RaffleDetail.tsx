import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	ArrowLeft,
	Clock,
	Users,
	Ticket,
	ShoppingCart,
	Lock,
	CheckCircle,
	Info,
	X,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

// Mock data for the raffle
const raffleData = {
	id: 1,
	name: "PlayStation 5 Pro Bundle",
	image: "/placeholder.svg?height=400&width=600",
	price: 8,
	totalTickets: 100,
	deadline: "30 de Julio, 2024",
	category: "Gaming",
	description:
		"PlayStation 5 Pro con 2 controles DualSense, 5 juegos premium y 1 año de PlayStation Plus Premium incluido.",
	features: [
		"PlayStation 5 Pro 1TB",
		"2 Controles DualSense",
		"5 Juegos Premium",
		"PlayStation Plus Premium (1 año)",
		"Auriculares PULSE 3D",
	],
}

// Generate sold tickets (random for demo)
const soldTickets = new Set([
	1, 3, 7, 12, 15, 23, 28, 34, 41, 45, 52, 67, 73, 78, 89, 92, 95,
])

export default function RafflePage() {
	const [selectedTickets, setSelectedTickets] = useState<Set<number>>(new Set())
	const [showMobileModal, setShowMobileModal] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 1024)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	const toggleTicket = (ticketNumber: number) => {
		if (soldTickets.has(ticketNumber)) return

		const newSelected = new Set(selectedTickets)
		if (newSelected.has(ticketNumber)) {
			newSelected.delete(ticketNumber)
		} else {
			newSelected.add(ticketNumber)
		}
		setSelectedTickets(newSelected)
	}

	const totalPrice = selectedTickets.size * raffleData.price
	const availableTickets = raffleData.totalTickets - soldTickets.size

	const getTicketStatus = (ticketNumber: number) => {
		if (soldTickets.has(ticketNumber)) return "sold"
		if (selectedTickets.has(ticketNumber)) return "selected"
		return "available"
	}

	const handleProceedToPayment = () => {
		if (isMobile) {
			setShowMobileModal(false)
		}
		// Aquí iría la lógica de pago
		console.log("Proceder al pago con boletos:", Array.from(selectedTickets))
	}

	// Badge simple con Tailwind
	const Badge = ({
		children,
		className = "",
	}: {
		children: React.ReactNode
		className?: string
	}) => (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
		>
			{children}
		</span>
	)

	// Button simple con Tailwind
	const Button = ({
		children,
		onClick,
		className = "",
		size = "md",
		variant = "solid",
		disabled = false,
	}: {
		children: React.ReactNode
		onClick?: () => void
		className?: string
		size?: "sm" | "md" | "lg"
		variant?: "solid" | "outline" | "ghost"
		disabled?: boolean
	}) => {
		const base =
			"inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
		const sizeClass =
			size === "sm"
				? "px-3 py-1.5 text-sm"
				: size === "lg"
				? "px-8 py-4 text-lg"
				: "px-4 py-2 text-base"

		const variantClass =
			variant === "solid"
				? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
				: variant === "outline"
				? "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-blue-500 disabled:border-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
				: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-blue-500 disabled:text-slate-400 disabled:cursor-not-allowed"

		return (
			<button
				onClick={onClick}
				disabled={disabled}
				className={`${base} ${sizeClass} ${variantClass} ${className}`}
			>
				{children}
			</button>
		)
	}

	// Card simple con Tailwind
	const Card = ({
		children,
		className = "",
	}: {
		children: React.ReactNode
		className?: string
	}) => (
		<div
			className={`bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden ${className}`}
		>
			{children}
		</div>
	)

	// CardContent simple con Tailwind
	const CardContent = ({
		children,
		className = "",
	}: {
		children: React.ReactNode
		className?: string
	}) => <div className={`p-6 ${className}`}>{children}</div>

	// Componente individual para cada número con animación optimizada
	const TicketNumber = ({ number }: { number: number }) => {
		const status = getTicketStatus(number)

		const getBaseStyles = () => {
			switch (status) {
				case "sold":
					return "bg-slate-300 text-slate-500 cursor-not-allowed border-slate-300"
				case "available":
					return "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
				default:
					return "bg-blue-600 text-white border-blue-600 cursor-pointer"
			}
		}

		return (
			<motion.button
				onClick={() => toggleTicket(number)}
				disabled={status === "sold"}
				className={`relative h-12 w-12 rounded-lg border-2 font-semibold text-sm transition-all duration-200 overflow-hidden ${getBaseStyles()}`}
				whileHover={status !== "sold" ? { scale: 1.05 } : {}}
				whileTap={status !== "sold" ? { scale: 0.95 } : {}}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: 1,
					scale: 1,
				}}
				transition={{ duration: 0.2, delay: number * 0.005 }}
			>
				{/* Animación de relleno para números seleccionados */}
				<AnimatePresence>
					{status === "selected" && (
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeOut",
								type: "spring",
								stiffness: 300,
								damping: 20,
							}}
							className="absolute inset-0 bg-blue-600 rounded-md"
							style={{ transformOrigin: "center" }}
						/>
					)}
				</AnimatePresence>

				{/* Ícono de candado para números vendidos */}
				{status === "sold" && (
					<Lock className="h-3 w-3 absolute top-1 right-1" />
				)}

				{/* Número - siempre visible */}
				<span className="relative z-10">{number}</span>
			</motion.button>
		)
	}

	const NumberSelector = ({ isModal = false }: { isModal?: boolean }) => (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl md:text-2xl font-bold text-slate-800">
					Selecciona tus números
				</h2>
				{isModal && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setShowMobileModal(false)}
						className="text-slate-600"
					>
						<X className="h-5 w-5" />
					</Button>
				)}
			</div>

			<div className="flex items-center justify-center space-x-4 text-sm bg-slate-50 p-3 rounded-lg">
				<div className="flex items-center">
					<div className="w-3 h-3 bg-white border-2 border-slate-200 rounded mr-2"></div>
					<span className="text-slate-600">Disponible</span>
				</div>
				<div className="flex items-center">
					<div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
					<span className="text-slate-600">Seleccionado</span>
				</div>
				<div className="flex items-center">
					<div className="w-3 h-3 bg-slate-300 rounded mr-2"></div>
					<span className="text-slate-600">Vendido</span>
				</div>
			</div>

			<div
				className={`grid gap-3 ${
					isModal ? "grid-cols-5" : "grid-cols-5 sm:grid-cols-8 md:grid-cols-10"
				}`}
			>
				{Array.from({ length: raffleData.totalTickets }, (_, i) => i + 1).map(
					(number) => (
						<TicketNumber key={number} number={number} />
					)
				)}
			</div>

			{!isModal && (
				<div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
					<div className="flex items-start space-x-2">
						<Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
						<div className="text-sm text-blue-800">
							<p className="font-medium mb-1">Información importante:</p>
							<p>
								Puedes seleccionar múltiples números para aumentar tus
								posibilidades de ganar. Los números vendidos aparecen
								bloqueados.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)

	// Componente del resumen de compra para el modal y sidebar
	const PurchaseSummary = () => (
		<AnimatePresence>
			{selectedTickets.size > 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className="bg-white border-t border-slate-200 p-4 shadow-lg"
				>
					<div className="flex items-center justify-between mb-3">
						<div>
							<p className="text-sm text-slate-600 font-medium">
								Números seleccionados:
							</p>
							<div className="flex flex-wrap gap-1 mt-1 max-w-[200px]">
								{Array.from(selectedTickets)
									.sort((a, b) => a - b)
									.slice(0, 8)
									.map((number) => (
										<motion.span
											key={number}
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0, opacity: 0 }}
											transition={{ duration: 0.2 }}
											className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium"
										>
											#{number}
										</motion.span>
									))}
								{selectedTickets.size > 8 && (
									<span className="text-blue-600 text-xs font-medium">
										+{selectedTickets.size - 8}
									</span>
								)}
							</div>
						</div>
						<div className="text-right">
							<p className="text-sm text-slate-600">
								{selectedTickets.size} boletos
							</p>
							<motion.p
								key={totalPrice}
								initial={{ scale: 1.1 }}
								animate={{ scale: 1 }}
								className="text-xl font-bold text-blue-600"
							>
								${totalPrice}
							</motion.p>
						</div>
					</div>
					<Button
						onClick={handleProceedToPayment}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 shadow-lg"
						size="lg"
					>
						<ShoppingCart className="h-5 w-5 mr-2" />
						Proceder al pago (${totalPrice})
					</Button>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="bg-slate-50 border-t border-slate-200 p-6 text-center"
				>
					<Ticket className="h-8 w-8 text-slate-300 mx-auto mb-2" />
					<p className="text-slate-500 text-sm">
						Selecciona números para continuar
					</p>
				</motion.div>
			)}
		</AnimatePresence>
	)

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Background Elements */}
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
			</div>

			{/* Header */}
			<header className="relative z-10 p-4 lg:p-6 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between max-w-7xl mx-auto">
				<Button
					variant="ghost"
					className="text-slate-600 hover:text-blue-600 font-medium flex items-center"
					onClick={() => navigate(-1)}
				>
					<ArrowLeft className="h-5 w-5 mr-2" />
					Volver
				</Button>
				<Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs flex items-center">
					<CheckCircle className="h-3 w-3 mr-1" />
					Verificado
				</Badge>
			</header>

			<main className="relative z-10 max-w-7xl mx-auto p-4 lg:p-6">
				{/* Mobile Layout */}
				{isMobile ? (
					<div className="space-y-6">
						{/* Mobile Raffle Info */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<Card>
								<div className="relative">
									<img
										src={raffleData.image || "/placeholder.svg"}
										alt={raffleData.name}
										width={600}
										height={300}
										className="w-full h-48 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
									<Badge className="absolute top-3 left-3 bg-white/90 text-slate-700 font-medium text-xs">
										{raffleData.category}
									</Badge>
								</div>

								<CardContent className="p-6">
									<h1 className="text-2xl font-bold text-slate-800 mb-3">
										{raffleData.name}
									</h1>

									<div className="grid grid-cols-2 gap-4 mb-4 text-sm">
										<div className="flex items-center">
											<Ticket className="h-4 w-4 mr-2 text-blue-600" />
											<div>
												<p className="font-semibold text-blue-600">
													${raffleData.price}
												</p>
												<p className="text-slate-500">por boleto</p>
											</div>
										</div>
										<div className="flex items-center">
											<Users className="h-4 w-4 mr-2 text-slate-500" />
											<div>
												<p className="font-semibold text-slate-800">
													{availableTickets}
												</p>
												<p className="text-slate-500">disponibles</p>
											</div>
										</div>
									</div>

									<div className="flex items-center mb-4 text-sm">
										<Clock className="h-4 w-4 mr-2 text-slate-500" />
										<span className="text-slate-600">
											Finaliza el {raffleData.deadline}
										</span>
									</div>

									<p className="text-slate-700 mb-4">
										{raffleData.description}
									</p>

									<ul className="list-disc list-inside mb-6 text-sm text-slate-600 space-y-1">
										{raffleData.features.map((feature, i) => (
											<li key={i}>{feature}</li>
										))}
									</ul>

									<Button
										onClick={() => setShowMobileModal(true)}
										className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
										size="lg"
										disabled={availableTickets === 0}
									>
										Seleccionar números
									</Button>
								</CardContent>
							</Card>
						</motion.div>

						{/* Modal para selección de números */}
						<AnimatePresence>
							{showMobileModal && (
								<motion.div
									key="modal"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
								>
									<motion.div
										initial={{ y: 300, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										exit={{ y: 300, opacity: 0 }}
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
										className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6"
									>
										<NumberSelector isModal />
										<PurchaseSummary />
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				) : (
					/* Desktop layout */
					<div className="flex gap-12">
						{/* Left info */}
						<div className="w-2/3">
							<Card>
								<div className="relative">
									<img
										src={raffleData.image || "/placeholder.svg"}
										alt={raffleData.name}
										width={600}
										height={400}
										className="w-full h-64 object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
									<Badge className="absolute top-4 left-4 bg-white/90 text-slate-700 font-medium text-xs">
										{raffleData.category}
									</Badge>
								</div>

								<CardContent>
									<h1 className="text-3xl font-bold text-slate-800 mb-4">
										{raffleData.name}
									</h1>

									<div className="grid grid-cols-3 gap-6 mb-6 text-sm">
										<div className="flex items-center">
											<Ticket className="h-5 w-5 mr-2 text-blue-600" />
											<div>
												<p className="font-semibold text-blue-600">
													${raffleData.price}
												</p>
												<p className="text-slate-500">por boleto</p>
											</div>
										</div>
										<div className="flex items-center">
											<Users className="h-5 w-5 mr-2 text-slate-500" />
											<div>
												<p className="font-semibold text-slate-800">
													{availableTickets}
												</p>
												<p className="text-slate-500">disponibles</p>
											</div>
										</div>
										<div className="flex items-center">
											<Clock className="h-5 w-5 mr-2 text-slate-500" />
											<span className="text-slate-600">
												Finaliza el {raffleData.deadline}
											</span>
										</div>
									</div>

									<p className="text-slate-700 mb-6">
										{raffleData.description}
									</p>

									<ul className="list-disc list-inside mb-8 text-sm text-slate-600 space-y-1">
										{raffleData.features.map((feature, i) => (
											<li key={i}>{feature}</li>
										))}
									</ul>
								</CardContent>
							</Card>

							<div className="mt-8">
								<NumberSelector />
							</div>
						</div>

						{/* Right sidebar */}
						<aside className="w-1/3 sticky top-24 self-start">
							<PurchaseSummary />
						</aside>
					</div>
				)}
			</main>
		</div>
	)
}
