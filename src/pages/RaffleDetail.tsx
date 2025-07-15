
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Clock, Users, Ticket, ShoppingCart, CheckCircle, Info, X } from "lucide-react"
import TicketNumber from "../components/rafflesComponents/TicketNumber"
import TicketLegend from "../components/rafflesComponents/TicketLegend"
import SelectedTicketsSummary from "../components/rafflesComponents/SelectedTicketSummary"

export default function RaffleDetail() {
  const [selectedTickets, setSelectedTickets] = useState<Set<number>>(new Set())
  const [showMobileModal, setShowMobileModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Mock data - reemplazar con props
  const raffleData = {
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

  const soldTickets = new Set([1, 3, 7, 12, 15, 23, 28, 34, 41, 45, 52, 67, 73, 78, 89, 92, 95])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-32 h-32 bg-blue-200 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 lg:p-6 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none px-4 py-2 text-slate-600 hover:text-blue-600 bg-transparent hover:bg-slate-100">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver
          </button>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verificado
          </span>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-4 lg:p-6">
        {isMobile ? (
          /* Mobile Layout */
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={raffleData.image || "/placeholder.svg"}
                  alt={raffleData.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute top-3 left-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                  {raffleData.category}
                </span>
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-3">{raffleData.name}</h1>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <Ticket className="h-4 w-4 mr-2 text-blue-600" />
                    <div>
                      <p className="font-semibold text-blue-600">${raffleData.price}</p>
                      <p className="text-slate-500">por boleto</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-slate-500" />
                    <div>
                      <p className="font-semibold text-slate-800">{availableTickets}</p>
                      <p className="text-slate-500">disponibles</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4 text-sm">
                  <Clock className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-slate-600">Finaliza el {raffleData.deadline}</span>
                </div>

                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{raffleData.description}</p>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">Incluye:</h3>
                  <ul className="space-y-1">
                    {raffleData.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-slate-600 text-sm">
                        <CheckCircle className="h-3 w-3 mr-2 text-emerald-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                    {raffleData.features.length > 3 && (
                      <li className="text-slate-500 text-sm">+{raffleData.features.length - 3} más incluidos</li>
                    )}
                  </ul>
                </div>

                <button
                  onClick={() => setShowMobileModal(true)}
                  className="w-full inline-flex items-center justify-center rounded-md  transition-colors focus:outline-none px-4 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  Comprar Boletos
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Raffle Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={raffleData.image || "/placeholder.svg"}
                    alt={raffleData.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-slate-700">
                    {raffleData.category}
                  </span>
                </div>

                <div className="p-8">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Rifa de {raffleData.name}</h1>

                  <div className="flex flex-wrap items-center gap-6 text-lg text-slate-600 mb-6">
                    <div className="flex items-center">
                      <Ticket className="h-5 w-5 mr-2 text-blue-600" />
                      <span className="font-semibold text-blue-600">${raffleData.price}</span>
                      <span className="ml-1">por boleto</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-slate-500" />
                      <span>{raffleData.totalTickets} boletos en total</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-slate-500" />
                      <span>Finaliza el {raffleData.deadline}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 leading-relaxed">{raffleData.description}</p>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-3">Incluye:</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {raffleData.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-slate-600">
                          <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Number Selector */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-slate-200 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Selecciona tus números</h2>

                <TicketLegend />

                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3 mb-6">
                  {Array.from({ length: raffleData.totalTickets }, (_, i) => i + 1).map((number) => (
					<TicketNumber
						key={number}
						number={number}
						selected={selectedTickets.has(number)}
						sold={soldTickets.has(number)}
						onClick={toggleTicket}
					/>
					))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Información importante:</p>
                      <p>Puedes seleccionar múltiples números para aumentar tus posibilidades de ganar.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Resumen de compra</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Boletos disponibles:</span>
                      <span className="font-semibold text-slate-800">{availableTickets}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Precio por boleto:</span>
                      <span className="font-semibold text-slate-800">${raffleData.price}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <AnimatePresence>
                      {selectedTickets.size > 0 ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4"
                        >
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2">Números seleccionados:</h4>
                            <div className="flex flex-wrap gap-2">
                              {Array.from(selectedTickets)
                                .sort((a, b) => a - b)
                                .map((number) => (
                                  <motion.span
                                    key={number}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                                  >
                                    #{number}
                                  </motion.span>
                                ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Cantidad:</span>
                              <span className="font-semibold">{selectedTickets.size} boletos</span>
                            </div>
                            <div className="flex justify-between items-center text-lg">
                              <span className="font-semibold text-slate-800">Total:</span>
                              <span className="font-bold text-blue-600">${totalPrice}</span>
                            </div>
                          </div>

                          <button className="w-full inline-flex items-center justify-center rounded-md transition-colors focus:outline-none px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Proceder al pago
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                          <Ticket className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 mb-2">No has seleccionado números</p>
                          <p className="text-sm text-slate-400">Haz clic en los números disponibles</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Modal */}
      <AnimatePresence>
        {showMobileModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileModal(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-hidden lg:hidden flex flex-col"
            >
              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Selecciona tus números</h2>
                  <button
                    onClick={() => setShowMobileModal(false)}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none px-4 py-2 text-slate-600 bg-transparent hover:bg-slate-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <TicketLegend />

                <div className="grid grid-cols-5 gap-3 mb-6">
                  {Array.from({ length: raffleData.totalTickets }, (_, i) => i + 1).map((number) => (
					<TicketNumber
					key={number}
					number={number}
					selected={selectedTickets.has(number)}
					sold={soldTickets.has(number)}
					onClick={toggleTicket}
					/>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Información importante:</p>
                      <p>Puedes seleccionar múltiples números para aumentar tus posibilidades.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer */}
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
                        <p className="text-sm text-slate-600 font-medium">Números seleccionados:</p>
                        <SelectedTicketsSummary tickets={Array.from(selectedTickets)} />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">{selectedTickets.size} boletos</p>
                        <p className="text-xl font-bold text-blue-600">${totalPrice}</p>
                      </div>
                    </div>
                    <button className="w-full inline-flex items-center justify-center rounded-md transition-colors focus:outline-none px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Proceder al pago (${totalPrice})
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-slate-50 border-t border-slate-200 p-6 text-center"
                  >
                    <Ticket className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">Selecciona números para continuar</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
