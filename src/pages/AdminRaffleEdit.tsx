import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Upload,
  X,
  Calendar,
  Ticket,
  DollarSign,
  Trophy,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { getRaffleParticipantService } from "../lib/raffle-participant"
import { updateRaffleService } from "../lib/raffle-organizer";

export default function AdminRaffleEdit() {
  const { id: raffleId } = useParams<{ id: string }>() // Si lo pasas por prop, elimínalo

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    endDate: "",
    maxTickets: "",
    price: "",
    status: "",
    newImages: [] as File[],
    existingImages: [] as { id: string; url: string; toDelete?: boolean }[],
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const loadRaffleData = async () => {
      try {
        setInitialLoading(true)

        if (!raffleId) throw new Error("ID no válido")

        const raffleData = await getRaffleParticipantService(raffleId)
        console.log("Datos de la rifa:", raffleData)
        setFormData({
          name: raffleData.name ?? "",
          description: raffleData.description ?? "",
          endDate: raffleData.endDate ? new Date(raffleData.endDate).toISOString().split("T")[0] : "", // convierte a 'YYYY-MM-DD'
          
          maxTickets: String(raffleData.maxTickets ?? ""),
          price: String(raffleData.price ?? ""),
          status: raffleData.status ?? "",
          newImages: [],
          existingImages:
            raffleData.images?.map((img: any) => ({
              id: img.id,
              url: "http://localhost:3000" + img.url,
              toDelete: false,
            })) ?? [],
        })
      } catch (err) {
        console.error(err)
        setError("No se pudo cargar la información de la rifa.")
      } finally {
        setInitialLoading(false)
      }
    }
    
    loadRaffleData()
  }, [raffleId])
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = Array.from(e.dataTransfer.files).filter((file) => file.type.startsWith("image/"))
    if (files.length > 0) addImages(files)
  }

  const addImages = (files: File[]) => {
    setFormData((prev) => ({ ...prev, newImages: [...prev.newImages, ...files] }))
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImages((prev) => [...prev, e.target?.result as string])
      reader.readAsDataURL(file)
    })
  }

  const removeNewImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      newImages: prev.newImages.filter((_, i) => i !== index),
    }))
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleExistingImageDelete = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      existingImages: prev.existingImages.map((img) =>
        img.id === id ? { ...img, toDelete: !img.toDelete } : img
      ),
    }))
  }

const handleSubmit = async () => {
  setLoading(true)
  setError(null)
  setSuccess(false)

  try {
    const formDataToSend = new FormData()

    // Solo añadir campos si tienen contenido válido
    if (formData.name) formDataToSend.append("name", formData.name)
    if (formData.description) formDataToSend.append("description", formData.description)
    if (formData.endDate) formDataToSend.append("endDate", formData.endDate)

    if (formData.maxTickets !== "") {
      formDataToSend.append("maxTickets", String(Number(formData.maxTickets)))
    }

    if (formData.price !== "") {
      formDataToSend.append("price", String(Number(formData.price)))
    }

    if (formData.status) formDataToSend.append("status", formData.status)

    // Imágenes nuevas
    formData.newImages.forEach((file) => {
      formDataToSend.append("newImages", file)
    })

    // IDs de imágenes para eliminar
    const imagesToDelete = formData.existingImages
      .filter((img) => img.toDelete)
      .map((img) => img.id)

    if (imagesToDelete.length > 0) {
      formDataToSend.append("deleteImages", JSON.stringify(imagesToDelete))
    }

    await updateRaffleService(raffleId!, formDataToSend)

    setSuccess(true)
  } catch (err) {
    console.error(err)
    setError("Error al actualizar la rifa.")
  } finally {
    setLoading(false)
  }
}

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 flex items-center space-x-4">
          <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
          <p className="text-slate-700 font-medium">Cargando información de la rifa...</p>
        </div>
      </div>
    )
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
        <div className="max-w-4xl mx-auto flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Panel de Administración</h1>
            <p className="text-slate-600">Editar rifa existente</p>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto p-6">
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start space-x-3"
            >
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start space-x-3"
            >
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">¡Actualización exitosa!</h3>
                <p className="text-green-700 text-sm">La rifa ha sido actualizada correctamente.</p>
              </div>
              <button onClick={() => setSuccess(false)} className="text-green-500 hover:text-green-700">
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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
              <h2 className="text-2xl font-bold text-slate-800">Editar Información de la Rifa</h2>
              <p className="text-slate-600">Actualiza los detalles de la rifa existente</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Nombre del Premio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Trophy className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: iPhone 15 Pro Max 256GB"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Descripción <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción detallada del premio..."
                  rows={3}
                  className="w-full pl-4 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Máximo de Boletos <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={formData.maxTickets}
                      onChange={(e) => setFormData((prev) => ({ ...prev, maxTickets: e.target.value }))}
                      placeholder="100"
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Precio por Boleto <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                      placeholder="8.00"
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full pl-4 pr-8 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800"
                  >
                    <option value="">Selecciona un estado</option>
                    <option value="draft">Borrador</option>
                    <option value="active">Activo</option>
                    <option value="completed">Completado</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Fecha de Finalización <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {formData.existingImages.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-slate-700">Imágenes actuales</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {formData.existingImages.map((img) => (
                      <motion.div
                        key={img.id}
                        animate={{ opacity: img.toDelete ? 0.5 : 1, scale: img.toDelete ? 0.95 : 1 }}
                        className="relative group"
                      >
                        <img
                          src={img.url || "/placeholder.svg"}
                          alt="Imagen de la rifa"
                          className={`w-full h-24 object-cover rounded-lg border-2 ${
                            img.toDelete ? "border-red-300 filter grayscale" : "border-slate-200"
                          }`}
                        />
                        <button
                          onClick={() => toggleExistingImageDelete(img.id)}
                          className={`absolute -top-2 -right-2 w-6 h-6 ${
                            img.toDelete ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                          } text-white rounded-full flex items-center justify-center`}
                        >
                          {img.toDelete ? <CheckCircle className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Añadir Nuevas Imágenes</label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400 bg-slate-50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => addImages(Array.from(e.target.files || []))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        dragActive ? "bg-blue-100" : "bg-slate-200"
                      }`}
                    >
                      <Upload className={`h-8 w-8 ${dragActive ? "text-blue-600" : "text-slate-500"}`} />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-slate-700">
                        {dragActive ? "Suelta las imágenes aquí" : "Arrastra imágenes aquí"}
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

              {previewImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-3"
                >
                  <h4 className="text-sm font-semibold text-slate-700">Nuevas imágenes</h4>
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
                          alt={`Nueva imagen ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200"
                        />
                        <button
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-200">
            <div className="text-sm text-slate-500">
              Los campos marcados con <span className="text-red-500">*</span> son obligatorios
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-semibold rounded-lg transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Actualizando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
