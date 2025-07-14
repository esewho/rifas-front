import { useState, useEffect } from "react"
import { X, CreditCard, Ticket } from "lucide-react"

interface BuyTicketModalProps {
	raffleId: string
	isOpen: boolean
	onClose: () => void
	onSuccess?: () => void
}

export default function BuyTicketModal({
	raffleId,
	isOpen,
	onClose,
	onSuccess,
}: BuyTicketModalProps) {
	const [selectedTickets, setSelectedTickets] = useState<number[]>([])
	const [isProcessing, setIsProcessing] = useState(false)
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const { getRaffleById, getAvailableTickets, buyTickets } = useData()

	const raffle = getRaffleById(raffleId)
	const availableTickets = getAvailableTickets(raffleId)

	useEffect(() => {
		if (!isOpen) {
			setSelectedTickets([])
			setShowSuccess(false)
		}
	}, [isOpen])

	if (!raffle) return null

	const totalPrice = selectedTickets.length * raffle.price
	const occupiedTickets = raffle.tickets.map((t) => t.number)

	const toggleTicket = (ticketNumber: number) => {
		setSelectedTickets((prev) =>
			prev.includes(ticketNumber)
				? prev.filter((n) => n !== ticketNumber)
				: [...prev, ticketNumber].sort((a, b) => a - b)
		)
	}

	const handlePurchase = async () => {
		if (!isAuthenticated) {
			setShowLoginModal(true)
			return
		}

		if (selectedTickets.length === 0 || !user) return

		setIsProcessing(true)

		// Simular procesamiento de pago
		await new Promise((resolve) => setTimeout(resolve, 2000))

		const success = buyTickets(
			raffleId,
			user.id,
			user.username,
			selectedTickets
		)

		if (success) {
			setShowSuccess(true)
			setTimeout(() => {
				onClose()
				onSuccess?.()
			}, 2000)
		}

		setIsProcessing(false)
	}

	const renderTicketGrid = () => {
		const tickets = []
		for (let i = 1; i <= raffle.maxTickets; i++) {
			const isOccupied = occupiedTickets.includes(i)
			const isSelected = selectedTickets.includes(i)

			tickets.push(
				<button
					key={i}
					onClick={() => !isOccupied && toggleTicket(i)}
					disabled={isOccupied}
					className={`
            w-12 h-12 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center
            ${
							isOccupied
								? "bg-gray-200 dark:bg-zinc-700 text-gray-400 cursor-not-allowed"
								: isSelected
								? "bg-indigo-600 text-white shadow-lg scale-105"
								: "bg-white dark:bg-zinc-800 border-2 border-gray-200 dark:border-zinc-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-gray-900 dark:text-white hover:shadow-md"
						}
          `}
				>
					{i}
				</button>
			)
		}
		return tickets
	}

	if (!isOpen) return null

	return (
		<>
			<div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center">
				<div className="bg-white dark:bg-zinc-900 w-full sm:max-w-2xl sm:mx-4 rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col">
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800 flex-shrink-0">
						<div>
							<h3 className="text-xl font-bold text-gray-900 dark:text-white">
								Seleccionar Tickets
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
								{raffle.name}
							</p>
						</div>
						<button
							onClick={onClose}
							className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
						>
							<X size={20} />
						</button>
					</div>

					{/* Success State */}
					{showSuccess && (
						<div className="p-6 text-center">
							<div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
								<Ticket
									className="text-green-600 dark:text-green-400"
									size={24}
								/>
							</div>
							<h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
								¡Compra Exitosa!
							</h4>
							<p className="text-gray-600 dark:text-gray-400 mb-4">
								Has adquirido {selectedTickets.length} ticket
								{selectedTickets.length > 1 ? "s" : ""}
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								{selectedTickets.map((num) => (
									<span
										key={num}
										className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-sm font-medium"
									>
										#{num}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Content */}
					{!showSuccess && (
						<>
							{/* Info */}
							<div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex-shrink-0">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
										<span className="w-4 h-4 bg-indigo-600 rounded"></span>
										<span>Seleccionado</span>
										<span className="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded ml-4"></span>
										<span>Ocupado</span>
										<span className="w-4 h-4 bg-white dark:bg-zinc-800 border-2 border-gray-300 dark:border-zinc-700 rounded ml-4"></span>
										<span>Disponible</span>
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										${raffle.price} c/u
									</div>
								</div>

								{selectedTickets.length > 0 && (
									<div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl">
										<div className="flex justify-between items-center">
											<span className="font-medium text-gray-900 dark:text-white">
												{selectedTickets.length} ticket
												{selectedTickets.length > 1 ? "s" : ""} seleccionado
												{selectedTickets.length > 1 ? "s" : ""}
											</span>
											<span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
												${totalPrice}
											</span>
										</div>
									</div>
								)}
							</div>

							{/* Ticket Grid */}
							<div className="flex-1 overflow-y-auto p-6">
								<div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
									{renderTicketGrid()}
								</div>
							</div>

							{/* Footer */}
							<div className="p-6 border-t border-gray-200 dark:border-zinc-800 flex-shrink-0">
								<button
									onClick={handlePurchase}
									disabled={selectedTickets.length === 0 || isProcessing}
									className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-4 rounded-2xl transition-colors flex items-center justify-center gap-2"
								>
									{isProcessing ? (
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
									) : (
										<>
											<CreditCard size={20} />
											{isAuthenticated
												? `Comprar ${
														selectedTickets.length > 0
															? `(${selectedTickets.length})`
															: ""
												  }`
												: "Iniciar Sesión para Comprar"}
										</>
									)}
								</button>
							</div>
						</>
					)}
				</div>
			</div>

			<LoginModal
				isOpen={showLoginModal}
				onClose={() => setShowLoginModal(false)}
				onSuccess={() => {
					setShowLoginModal(false)
					handlePurchase()
				}}
			/>
		</>
	)
}
