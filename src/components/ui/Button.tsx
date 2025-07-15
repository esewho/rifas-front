import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  variant?: "primary" | "outline"
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
    outline:
      "border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50",
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 px-6 py-3 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
