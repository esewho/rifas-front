interface ProgressBarProps {
	progress: number
	className?: string
}

export default function ProgressBar({
	progress,
	className = "",
}: ProgressBarProps) {
	return (
		<div
			className={`w-full bg-gray-200 dark:bg-zinc-700 rounded-full h-2 ${className}`}
		>
			<div
				className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
				style={{ width: `${Math.min(progress, 100)}%` }}
			/>
		</div>
	)
}
