export default function TicketLegend() {
  return (
    <div className="flex items-center justify-center space-x-4 text-sm bg-slate-50 p-3 rounded-lg mb-6">
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
  )
}
