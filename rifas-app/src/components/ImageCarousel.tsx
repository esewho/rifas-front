import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
	images: string[]
	alt: string
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0)

	const goToPrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		)
	}

	const goToNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		)
	}

	if (images.length === 0) {
		return (
			<div className="aspect-square bg-gray-200 dark:bg-zinc-700 rounded-2xl flex items-center justify-center">
				<span className="text-gray-400">Sin imagen</span>
			</div>
		)
	}

	return (
		<div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800">
			<img
				src={images[currentIndex] || "/placeholder.svg"}
				alt={alt}
				className="w-full h-full object-cover"
			/>

			{images.length > 1 && (
				<>
					<button
						onClick={goToPrevious}
						className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
					>
						<ChevronLeft size={20} />
					</button>

					<button
						onClick={goToNext}
						className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
					>
						<ChevronRight size={20} />
					</button>

					<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
						{images.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentIndex(index)}
								className={`w-2 h-2 rounded-full transition-all duration-200 ${
									index === currentIndex
										? "bg-white"
										: "bg-white/50 hover:bg-white/70"
								}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	)
}
