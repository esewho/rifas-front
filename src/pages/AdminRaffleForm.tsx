import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	Upload,
	X,
	Calendar,
	Ticket,
	DollarSign,
	Trophy,
	Save,
	ArrowLeft,
} from "lucide-react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { createRaffleService } from "../lib/raffle-organizer"
import { useNavigate } from "react-router-dom"

export default function AdminRaffleForm() {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		startDate: "",
		endDate: "",
		maxTickets: "",
		price: "",
		images: [] as File[],
	})

	const [dragActive, setDragActive] = useState(false)
	const [previewImages, setPreviewImages] = useState<string[]>([])
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const navigate = useNavigate()

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(e.type === "dragenter" || e.type === "dragover")
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setDragActive(false)
		const files = Array.from(e.dataTransfer.files).filter((file) =>
			file.type.startsWith("image/")
		)
		if (files.length > 0) addImages(files)
	}

	const addImages = (files: File[]) => {
		setFormData((prev) => ({
			...prev,
			images: [...prev.images, ...files],
		}))

		// Para previsualizar las imágenes
		files.forEach((file) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				const url = e.target?.result as string
				setPreviewImages((prev) => [...prev, url])
			}
			reader.readAsDataURL(file)
		})
	}

	const removeImage = (index: number) => {
		setFormData((prev) => ({
			...prev,
			images: prev.images.filter((_, i) => i !== index),
		}))
		setPreviewImages((prev) => prev.filter((_, i) => i !== index))
	}
	const handleSubmit = async () => {
		setLoading(true)
		setError(null)
		setSuccess(false)

		try {
			const formDataToSend = new FormData()
			formDataToSend.append("name", formData.name)
			formDataToSend.append("description", formData.description)
			formDataToSend.append("startDate", formData.startDate)
			formDataToSend.append("endDate", formData.endDate)
			formDataToSend.append("maxTickets", formData.maxTickets)
			formDataToSend.append("price", formData.price)
			formDataToSend.append("organizerName", "Admin")
			formDataToSend.append("createdAt", new Date().toISOString())

			// Añadir todos los archivos con la clave 'images'
			formData.images.forEach((file) => {
				formDataToSend.append("images", file)
			})

			const createdRaffle = await createRaffleService(formDataToSend)

			console.log("Raffle created successfully:", createdRaffle)
			setSuccess(true)
		} catch (err) {
			console.error("Error creating raffle:", err)
			setError(
				"Error al crear la rifa. Por favor, inténtalo de nuevo más tarde."
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
					transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
					className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl"
				/>
			</div>

			<header className="relative z-10 p-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Button
							className="cursor-pointer"
							onClick={() => navigate("/raffles/admin")}
							variant="outline"
						>
							<ArrowLeft className="h-4 w-4 mr-2" />
							Volver
						</Button>
						<div>
							<h1 className="text-2xl font-bold text-slate-800">
								Panel de Administración
							</h1>
							<p className="text-slate-600">Crear nueva rifa</p>
						</div>
					</div>
				</div>
			</header>

			<main className="relative z-10 max-w-4xl mx-auto p-6">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8"
				>
					<div className="flex items-center space-x-3 mb-8">
						<div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
							<Trophy className="h-6 w-6 text-white" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-slate-800">
								Información de la Rifa
							</h2>
							<p className="text-slate-600">
								Completa los detalles para crear una nueva rifa
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-6">
							<Input
								label="Nombre del Premio"
								value={formData.name}
								onChange={(value: string) =>
									setFormData((prev) => ({ ...prev, name: value }))
								}
								placeholder="Ej: iPhone 15 Pro Max 256GB"
								icon={Trophy}
								required
							/>

							<Input
								label="Descripción"
								value={formData.description}
								onChange={(value: string) =>
									setFormData((prev) => ({ ...prev, description: value }))
								}
								placeholder="Descripción detallada del premio..."
								required
							/>

							<div className="grid grid-cols-2 gap-4">
								<Input
									label="Máximo de Boletos"
									type="number"
									value={formData.maxTickets}
									onChange={(value: string) =>
										setFormData((prev) => ({ ...prev, maxTickets: value }))
									}
									placeholder="100"
									icon={Ticket}
									required
								/>
								<Input
									label="Precio por Boleto"
									type="number"
									value={formData.price}
									onChange={(value: string) =>
										setFormData((prev) => ({ ...prev, price: value }))
									}
									placeholder="8.00"
									icon={DollarSign}
									required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<Input
									label="Fecha de Inicio"
									type="datetime-local"
									value={formData.startDate}
									onChange={(value: string) =>
										setFormData((prev) => ({ ...prev, startDate: value }))
									}
									icon={Calendar}
								/>
								<Input
									label="Fecha de Finalización"
									type="datetime-local"
									value={formData.endDate}
									onChange={(value: string) =>
										setFormData((prev) => ({ ...prev, endDate: value }))
									}
									icon={Calendar}
								/>
							</div>
						</div>

						<div className="space-y-6">
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-2">
									Imágenes del Premio{" "}
									<span className="text-slate-500">(Opcional)</span>
								</label>
								<div
									onDragEnter={handleDrag}
									onDragLeave={handleDrag}
									onDragOver={handleDrag}
									onDrop={handleDrop}
									className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
										dragActive
											? "border-blue-500 bg-blue-50"
											: "border-slate-300 hover:border-slate-400 bg-slate-50"
									}`}
								>
									<input
										ref={fileInputRef}
										type="file"
										multiple
										accept="image/*"
										onChange={(e) =>
											addImages(Array.from(e.target.files || []))
										}
										className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									/>
									<div className="space-y-4">
										<div
											className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
												dragActive ? "bg-blue-100" : "bg-slate-200"
											}`}
										>
											<Upload
												className={`h-8 w-8 ${
													dragActive ? "text-blue-600" : "text-slate-500"
												}`}
											/>
										</div>
										<div>
											<p className="text-lg font-medium text-slate-700">
												{dragActive
													? "Suelta las imágenes aquí"
													: "Arrastra imágenes aquí"}
											</p>
											<p className="text-sm text-slate-500 mt-1">
												o{" "}
												<button
													type="button"
													onClick={() => fileInputRef.current?.click()}
													className="text-blue-600 hover:text-blue-700 font-medium"
												>
													selecciona archivos
												</button>
											</p>
										</div>
									</div>
								</div>
							</div>

							<AnimatePresence>
								{previewImages.length > 0 && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										exit={{ opacity: 0, height: 0 }}
										className="space-y-3"
									>
										<h4 className="text-sm font-semibold text-slate-700">
											Imágenes seleccionadas ({previewImages.length})
										</h4>
										<div className="grid grid-cols-2 gap-3">
											{previewImages.map((src, index) => (
												<motion.div
													key={index}
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													className="relative group"
												>
													<img
														src={src || "/placeholder.svg"}
														alt={`Preview ${index + 1}`}
														className="w-full h-24 object-cover rounded-lg border border-slate-200"
													/>
													{formData.images[index]?.default && (
														<div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-2 py-1 rounded">
															Principal
														</div>
													)}
													<button
														onClick={() => removeImage(index)}
														className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
													>
														<X className="h-3 w-3" />
													</button>
												</motion.div>
											))}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					<div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
						<div className="text-sm text-slate-500">
							Los campos marcados con * son obligatorios
						</div>
						<div className="flex items-center space-x-4">
							<Button variant="outline">Cancelar</Button>
							<Button onClick={handleSubmit}>
								<Save className="h-5 w-5 mr-2" />
								Crear Rifa
							</Button>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 p-6"
				>
					<h3 className="text-lg font-bold text-slate-800 mb-4">Resumen</h3>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
						{[
							{
								icon: Trophy,
								label: "Premio",
								value: formData.name || "Sin especificar",
							},
							{
								icon: Ticket,
								label: "Boletos",
								value: `${formData.maxTickets || "0"} máximo`,
							},
							{
								icon: DollarSign,
								label: "Precio",
								value: `$${formData.price || "0"} c/u`,
							},
							{
								icon: Upload,
								label: "Imágenes",
								value: `${formData.images.length} subidas`,
							},
						].map(({ icon: Icon, label, value }, index) => (
							<div key={index} className="bg-slate-50 rounded-lg p-4">
								<div className="flex items-center space-x-2 mb-2">
									<Icon className="h-4 w-4 text-slate-600" />
									<span className="text-sm font-medium text-slate-600">
										{label}
									</span>
								</div>
								<p className="text-slate-800 font-semibold">{value}</p>
							</div>
						))}
					</div>
				</motion.div>
			</main>
		</div>
	)
}
