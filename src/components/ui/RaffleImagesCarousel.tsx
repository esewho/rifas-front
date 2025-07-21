import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import "swiper/swiper-bundle.css";
import type { RaffleImagesCarouselProps } from "../../types/raffle";


export function RaffleImagesCarousel({ images }: RaffleImagesCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      {/* Carrusel principal */}
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        spaceBetween={15}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="w-full h-96 rounded-lg shadow-lg"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <img
              src={`http://localhost:3000${img.url}`}
              alt="Imagen rifa"
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        _swiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={Math.min(images.length, 6)}
        freeMode={true}
        watchSlidesProgress={true}
        className="mt-6 h-24 cursor-pointer"
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.id} className="rounded-lg overflow-hidden border-2 transition-transform duration-200 hover:scale-110">
            <img
              src={`http://localhost:3000${img.url}`}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
