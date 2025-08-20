// src/components/MediaCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/css";
import "swiper/css/pagination";
import "react-lazy-load-image-component/src/effects/blur.css";

const MediaCarousel = ({ images = [], videos = [], title }) => {
  const media = [...images, ...videos];

  if (media.length > 0) {
    // Case 1: multiple media → show Swiper
    return (
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-56"
      >
        {media.map((m, idx) => (
          <SwiperSlide key={idx}>
            {/\.(mp4|webm|ogg|mkv|mov|avi)$/i.test(m.secure_url) ? (
              <video
                controls
                src={m.secure_url}
                muted
                loop
                playsInline
                className="w-full h-56 object-cover"
              />
            ) : (
              <LazyLoadImage
                src={m.secure_url}
                alt={title}
                effect="blur"
                className="w-full h-56 object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  if (images.length === 1) {
    // Case 2: single image
    return (
      <LazyLoadImage
        src={images[0]?.secure_url}
        alt={title}
        effect="blur"
        className="w-full h-56 object-cover"
      />
    );
  }

  if (videos.length === 1) {
    // Case 3: single video
    return (
      <video
        controls
        src={videos[0]?.secure_url}
        muted
        loop
        playsInline
        className="w-full h-56 object-cover"
      />
    );
  }

  // Case 4: nothing
  return (
    <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No media available</span>
    </div>
  );
};

export default MediaCarousel;
