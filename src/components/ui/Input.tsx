import type { ChangeEvent } from "react"
import { type FC } from "react"
import type { LucideIcon } from "lucide-react"

type InputProps = {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  icon?: LucideIcon
  required?: boolean
}

export const Input: FC<InputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  required = false,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
      )}
      <input
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${
          Icon ? "pl-10" : "pl-4"
        } pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-slate-800 placeholder-slate-400`}
      />
    </div>
  </div>
)
