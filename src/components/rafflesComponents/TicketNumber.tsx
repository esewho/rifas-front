import { motion, AnimatePresence } from "framer-motion"
import { Lock } from "lucide-react"

type TicketNumberProps = {
  number: number
  selected: boolean
  sold: boolean
  onClick: (number: number) => void
}

export default function TicketNumber({ number, selected, sold, onClick }: TicketNumberProps) {
  const getStyles = () => {
    if (sold) return "bg-slate-300 text-slate-500 cursor-not-allowed border-slate-300"
    if (selected) return "bg-blue-600 text-white border-blue-600 cursor-pointer"
    return "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer"
  }

  return (
    <motion.button
      onClick={() => onClick(number)}
      disabled={sold}
      className={`relative h-12 w-12 rounded-lg border-2 font-semibold text-sm transition-all duration-200 overflow-hidden ${getStyles()}`}
      whileHover={!sold ? { scale: 1.05 } : {}}
      whileTap={!sold ? { scale: 0.95 } : {}}
    >
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 bg-blue-600 rounded-md"
            style={{ transformOrigin: "center" }}
          />
        )}
      </AnimatePresence>
      {sold && <Lock className="h-3 w-3 absolute top-1 right-1" />}
      <span className="relative z-10">{number}</span>
    </motion.button>
  )
}
