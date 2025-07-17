import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react"
import { loginService, registerService } from "../lib/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const response = await loginService(formData.email, formData.password)
        if (response.success && response.user && response.accessToken) {
          // Guardar usuario y token, ejemplo en localStorage
          onClose()
        } else {
          setError(response.error || "Error desconocido al iniciar sesión")
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Las contraseñas no coinciden")
          setLoading(false)
          return
        }
        
        const username = formData.email.split("@")[0] // Username antes del @ del email pa hacerlo facil ahora si quiere luego la cambia shurrita ¯\_( ❛ ͜ʖ ❛ )_/¯
        const role = "admin"

        const response = await registerService(formData.email, formData.password, username, role)
        if (response.success && response.user && response.accessToken) {
          localStorage.setItem("raffle_user", JSON.stringify(response.user))
          localStorage.setItem("raffle_token", response.accessToken)
          onClose()
        } else {
          setError(response.error || "Error desconocido al registrar")
        }
      }
    } catch (err) {
      setError("Error en la comunicación con el servidor")
    } finally {
      setLoading(false)
    }
  }


  const switchMode = () => {
    setIsLogin(!isLogin)
    setFormData({ email: "", password: "", confirmPassword: "" })
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-xl"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>

              {/* Header */}
              <div className="relative z-10 pt-8 pb-6 px-8 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <Sparkles className="h-8 w-8 text-white" />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? "login" : "register"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                      {isLogin ? "¡Bienvenido de vuelta!" : "¡Únete a nosotros!"}
                    </h2>
                    <p className="text-slate-600">
                      {isLogin
                        ? "Inicia sesión para acceder a las mejores rifas"
                        : "Crea tu cuenta y comienza a ganar premios increíbles"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Form */}
              <div className="relative z-10 px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-slate-700">Correo electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="tu@email.com"
                        className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label className="block text-sm font-semibold text-slate-700">Contraseña</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password Input (Register only) */}
                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, x: -20 }}
                        animate={{ opacity: 1, height: "auto", x: 0 }}
                        exit={{ opacity: 0, height: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-semibold text-slate-700">Confirmar contraseña</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => updateField("confirmPassword", e.target.value)}
                            placeholder="••••••••"
                            className="w-full pl-10 pr-12 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <motion.span
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
                    </motion.span>
                  </motion.button>

                  {/* Forgot Password (Login only) */}
                  <AnimatePresence>
                    {isLogin && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center"
                      >
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">o</span>
                  </div>
                </div>

                {/* Switch Mode */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <p className="text-slate-600 mb-3">{isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</p>
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors relative group"
                  >
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                      {isLogin ? "Crear cuenta nueva" : "Iniciar sesión"}
                    </motion.span>
                    <motion.div
                      className="absolute inset-0 bg-blue-100 rounded-lg -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-6 border-t border-slate-100"
                >
                  <div className="flex items-center justify-center space-x-6 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Seguro</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Verificado</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Confiable</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
