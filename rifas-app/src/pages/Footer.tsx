import { Trophy } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Footer() {
	const navigate = useNavigate()
	return (
		<footer className="relative z-10 bg-slate-900 py-16 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="col-span-1 md:col-span-2">
						<div className="flex items-center space-x-3 mb-6">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
								<Trophy className="h-6 w-6 text-white" />
							</div>
							<div>
								<span className="text-xl font-bold text-white">
									PremiumRifas
								</span>
								<div className="text-sm text-slate-400">Sorteos Oficiales</div>
							</div>
						</div>
						<p className="text-slate-400 mb-6 leading-relaxed">
							Nueva plataforma de rifas comprometida con la transparencia y la
							confiabilidad. Sorteos verificables y premios garantizados.
						</p>
						<div className="flex space-x-4">
							<button className="text-slate-400 hover:text-white">
								Facebook
							</button>
							<button className="text-slate-400 hover:text-white">
								Instagram
							</button>
							<button className="text-slate-400 hover:text-white">
								Twitter
							</button>
						</div>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-6">Información</h4>
						<div className="space-y-3">
							<button
								onClick={() => navigate("/info")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Cómo Funciona
							</button>
							<button
								onClick={() => navigate("/about")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Términos y Condiciones
							</button>
							<button
								onClick={() => navigate("/privacy")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Política de Privacidad
							</button>
							<button
								onClick={() => navigate("/faq")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Preguntas Frecuentes
							</button>
						</div>
					</div>

					<div>
						<h4 className="text-white font-semibold mb-6">Soporte</h4>
						<div className="space-y-3">
							<button
								onClick={() => navigate("/help")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Centro de Ayuda
							</button>
							<button
								onClick={() => navigate("/contact")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Contacto
							</button>
							<button
								onClick={() => navigate("/support")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Soporte Técnico
							</button>
							<button
								onClick={() => navigate("/report")}
								className="block text-slate-400 hover:text-white transition-colors"
							>
								Reportar Problema
							</button>
						</div>
					</div>
				</div>

				<div className="border-t border-slate-700 mt-12 pt-8 text-center">
					<p className="text-slate-400">
						© {new Date().getFullYear()} PremiumRifas. Todos los derechos
						reservados.
					</p>
				</div>
			</div>
		</footer>
	)
}
