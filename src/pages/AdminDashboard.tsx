import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	Plus,
	Edit3,
	Trash2,
	Trophy,
	Users,
	DollarSign,
	Eye,
	MoreVertical,
	Search,
	Filter,
	Ticket,
} from "lucide-react"
import type { Raffle } from "../types/raffle"
import { useNavigate } from "react-router-dom"
import { getRafflesParticipantsService } from "../lib/raffle-participant"
import { deleteRaffleService } from "../lib/raffle-organizer"

export default function AdminDashboard() {
	const [searchTerm, setSearchTerm] = useState("")
	const [filterStatus, setFilterStatus] = useState("all")
	const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null)
	const [raffles, setRaffles] = useState<Raffle[]>()

	const navigate = useNavigate()

	useEffect(() => {
		const fetchRaffles = async () => {
			try {
				const data = await getRafflesParticipantsService(filterStatus)
				setRaffles(data)
			} catch (error) {
				console.error("Error fetching raffles:", error)
			}
		}
		fetchRaffles()
	}, [filterStatus])
	console.log(raffles)
	const getStatusColor = (status: string) => {
		switch (status) {
			case "active":
				return "bg-green-100 text-green-800 border-green-200"
			case "completed":
				return "bg-blue-100 text-blue-800 border-blue-200"
			case "draft":
				return "bg-yellow-100 text-yellow-800 border-yellow-200"
			default:
				return "bg-slate-100 text-slate-800 border-slate-200"
		}
	}

	const getStatusText = (status: string) => {
		switch (status) {
			case "active":
				return "Activa"
			case "completed":
				return "Completada"
			case "draft":
				return "Borrador"
			default:
				return "Desconocido"
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await deleteRaffleService(id)
			console.log("Rifa eliminada con éxito")
		} catch (error) {
			console.error("Error al eliminar la rifa:", error)
		}

		console.log("Eliminar rifa:", id)
		setShowDeleteModal(null)
		// Aquí iría la lógica de eliminación
	}

	const filteredRaffles = raffles?.filter((raffle) =>
		raffle.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const totalRaffles = raffles?.length ?? 0
	const activeRaffles = raffles?.filter((r) => r.isActive).length ?? 0

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Background */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{ y: [0, 20, 0], opacity: [0.1, 0.15, 0.1] }}
					transition={{
						duration: 10,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut",
					}}
					className="absolute bottom-32 left-16 w-40 h-40 bg-emerald-200 rounded-full blur-3xl"
				/>
			</div>

			{/* Header */}
			<header className="relative z-10 p-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold text-slate-800">
								Panel de Administración
							</h1>
							<p className="text-slate-600 mt-1">
								Gestiona todas tus rifas desde aquí
							</p>
						</div>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => navigate("/raffles/admin/create")}
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center"
						>
							<Plus className="h-5 w-5 mr-2" />
							Nueva Rifa
						</motion.button>
					</div>

					{/* Filters */}
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
							<input
								type="text"
								placeholder="Buscar rifas..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400"
							/>
						</div>
						<div className="relative">
							<Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
							<select
								value={filterStatus}
								onChange={(e) => setFilterStatus(e.target.value)}
								className="pl-10 pr-8 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 appearance-none cursor-pointer"
							>
								<option value="">Todas las rifas</option>
								<option value="draft">Borradores</option>
								<option value="active">Activas</option>
								<option value="completed">Completadas</option>
							</select>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="relative z-10 max-w-7xl mx-auto p-6">
				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
					{[
						{
							icon: Trophy,
							label: "Total Rifas",
							value: totalRaffles,
							color: "blue",
						},
						{
							icon: Ticket,
							label: "Rifas Activas",
							value: activeRaffles,
							color: "green",
						},
						{
							icon: Users,
							label: "Participantes",
							value: "2,847",
							color: "purple",
						},
						{
							icon: DollarSign,
							label: "Ingresos",
							value: "$45,230",
							color: "emerald",
						},
					].map(({ icon: Icon, label, value, color }, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6"
						>
							<div className="flex items-center justify-between">
								<div>
									<p className="text-slate-600 text-sm font-medium">{label}</p>
									<p className="text-2xl font-bold text-slate-800 mt-1">
										{value}
									</p>
								</div>
								<div
									className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}
								>
									<Icon className={`h-6 w-6 text-${color}-600`} />
								</div>
							</div>
						</motion.div>
					))}
				</div>

				{/* Raffles Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<AnimatePresence>
						{filteredRaffles?.map((raffle, index) => (
							<motion.div
								key={raffle.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -30 }}
								transition={{ delay: index * 0.1 }}
								className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
							>
								{/* Image */}
								<div className="relative">
									<img
										src={
											"http://localhost:3000" + raffle.images[0].url ||
											"/placeholder.svg"
										}
										alt={raffle.name}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
									<div className="absolute top-3 left-3">
										<span
											className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(
												raffle.status
											)}`}
										>
											{getStatusText(raffle.status)}
										</span>
									</div>
									<div className="absolute top-3 right-3">
										<div className="relative group/menu">
											<button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors">
												<MoreVertical className="h-4 w-4 text-slate-600" />
											</button>
										</div>
									</div>
								</div>

								{/* Content */}
								<div className="p-6">
									<div className="flex items-start justify-between mb-3">
										<div className="flex-1">
											<h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
												{raffle.name}
											</h3>
											<p className="text-sm text-slate-600 line-clamp-2">
												{raffle.description}
											</p>
										</div>
									</div>

									<div className="space-y-3 mb-4">
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-500">Progreso:</span>
											<span className="font-semibold text-slate-800">
												{raffle.soldTickets}/{raffle.maxTickets} boletos
											</span>
										</div>
										<div className="w-full bg-slate-200 rounded-full h-2">
											<div
												className="bg-blue-600 h-2 rounded-full transition-all duration-300"
												style={{
													width: `${
														(raffle.soldTickets / raffle.maxTickets) * 100
													}%`,
												}}
											/>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-500">Precio:</span>
											<span className="font-semibold text-blue-600">
												${raffle.price} por boleto
											</span>
										</div>
										<div className="flex items-center justify-between text-sm">
											<span className="text-slate-500">Finaliza:</span>
											<span className="font-semibold text-slate-800">
												{new Date(raffle.endDate).toLocaleDateString()}
											</span>
										</div>
									</div>

									{/* Actions */}
									<div className="flex items-center space-x-2">
										<button
											onClick={() => navigate(`/raffles/${raffle.id}`)}
											className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2 px-3 rounded-lg transition-colors inline-flex items-center justify-center text-sm"
										>
											<Eye className="h-4 w-4 mr-1" />
											Ver
										</button>
										<button
											onClick={() => navigate(`/management/edit/${raffle.id}`)}
											className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-3 rounded-lg transition-colors inline-flex items-center justify-center text-sm"
										>
											<Edit3 className="h-4 w-4 mr-1" />
											Editar
										</button>
										<button
											onClick={() => setShowDeleteModal(raffle.id)}
											className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-3 rounded-lg transition-colors inline-flex items-center justify-center text-sm"
										>
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Empty State */}
				{filteredRaffles?.length === 0 && (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center py-16"
					>
						<div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<Trophy className="h-12 w-12 text-slate-400" />
						</div>
						<h3 className="text-xl font-semibold text-slate-800 mb-2">
							No se encontraron rifas
						</h3>
						<p className="text-slate-600 mb-6">
							{searchTerm || filterStatus !== "all"
								? "Intenta ajustar tus filtros de búsqueda"
								: "Comienza creando tu primera rifa"}
						</p>
						<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center">
							<Plus className="h-5 w-5 mr-2" />
							Crear Primera Rifa
						</button>
					</motion.div>
				)}
			</main>

			{/* Delete Modal */}
			<AnimatePresence>
				{showDeleteModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md"
						>
							<div className="text-center">
								<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Trash2 className="h-8 w-8 text-red-600" />
								</div>
								<h3 className="text-xl font-bold text-slate-800 mb-2">
									¿Eliminar rifa?
								</h3>
								<p className="text-slate-600 mb-6">
									Esta acción no se puede deshacer. La rifa y todos sus datos
									asociados serán eliminados permanentemente.
								</p>
								<div className="flex items-center space-x-3">
									<button
										onClick={() => setShowDeleteModal(null)}
										className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors"
									>
										Cancelar
									</button>
									<button
										onClick={() => handleDelete(showDeleteModal)}
										className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
									>
										Eliminar
									</button>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
