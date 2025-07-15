import { motion } from "framer-motion"
import { Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function Hero() {
	return (
		<section className="relative z-10 py-16 px-6">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="mb-6"
						>
							<span className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-2 text-sm font-medium mb-4 rounded border border-emerald-200">
								<Shield className="h-4 w-4 mr-2" />
								Nueva Plataforma
							</span>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.1 }}
							className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight"
						>
							Gana premios <span className="text-blue-600">excepcionales</span>{" "}
							con total transparencia
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed"
						>
							Nueva plataforma de rifas con sorteos públicos, premios
							garantizados y proceso completamente transparente. ¡Únete desde el
							inicio!
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="flex flex-col sm:flex-row gap-4"
						>
							<button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 rounded">
								Explorar Rifas
								<ArrowRight className="ml-2 h-5 w-5 inline-block" />
							</button>
							<button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-medium bg-transparent rounded">
								Conocer Más
							</button>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="flex items-center space-x-6 mt-8 pt-8 border-t border-slate-200"
						>
							<div className="flex items-center text-slate-600">
								<Shield className="h-5 w-5 mr-2 text-emerald-600" />
								<span className="font-medium">Sorteos Verificados</span>
							</div>
							<div className="flex items-center text-slate-600">
								<CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
								<span className="font-medium">Premios Garantizados</span>
							</div>
						</motion.div>
					</div>

					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="relative"
					>
						<div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-slate-200">
							<div className="absolute -top-3 -right-3 w-6 h-6 bg-emerald-500 rounded-full animate-pulse"></div>

							<div className="text-center mb-6">
								<h3 className="text-xl font-semibold text-slate-800 mb-4">
									Próximo Sorteo en Vivo
								</h3>
								<div className="flex justify-center items-center space-x-4 text-2xl font-bold">
									<div className="bg-slate-800 text-white px-3 py-2 rounded-lg min-w-[3rem]">
										02
									</div>
									<span className="text-slate-400">:</span>
									<div className="bg-slate-800 text-white px-3 py-2 rounded-lg min-w-[3rem]">
										14
									</div>
									<span className="text-slate-400">:</span>
									<div className="bg-slate-800 text-white px-3 py-2 rounded-lg min-w-[3rem]">
										35
									</div>
								</div>
								<p className="text-slate-500 mt-2 text-sm">
									Días : Horas : Minutos
								</p>
							</div>

							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-slate-600">Premio:</span>
									<span className="font-semibold text-slate-800">
										iPhone 15 Pro Max
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-slate-600">Participantes:</span>
									<span className="font-semibold text-blue-600">
										1,653 / 2,500
									</span>
								</div>
								<div className="w-full bg-slate-200 rounded-full h-2">
									<div
										className="bg-blue-600 h-2 rounded-full transition-all duration-300"
										style={{ width: "66%" }}
									></div>
								</div>
								<div className="text-center pt-2">
									<span className="inline-flex items-center bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium rounded border border-blue-200">
										<CheckCircle className="h-3 w-3 mr-1" />
										Sorteo Verificado
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
