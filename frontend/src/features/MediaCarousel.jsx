// src/components/MediaCarousel.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const MediaCarousel = ({ images = [], videos = [], title }) => {
  // Normalize media: handle both strings and objects with secure_url
  const normalizeUrl = (item) =>
    typeof item === "string" ? item : item?.secure_url;

  const media = [...images, ...videos];

  if (media.length > 0) {
    // Case 1: multiple media → show Swiper
    return (
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-64" // fixed consistent height
      >
        {media.map((m, idx) => {
          const url = normalizeUrl(m);
          if (!url) return null;

          // Detect video by extension
          const isVideo = /\.(mp4|webm|ogg|mkv|mov|avi)$/i.test(url);

          return (
            <SwiperSlide key={idx} className="w-full h-64">
              {isVideo ? (
                <video
                  src={url}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover rounded-t-xl"
                />
              ) : (
                <div
                  className="w-full h-full bg-center bg-cover rounded-t-xl"
                  style={{ backgroundImage: `url(${url})` }}
                  role="img"
                  aria-label={title}
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  // Case 2: single image
  if (images.length === 1) {
    const url = normalizeUrl(images[0]);
    return (
      <div
        className="w-full h-64 bg-center bg-cover rounded-t-xl"
        style={{ backgroundImage: `url(${url})` }}
        role="img"
        aria-label={title}
      />
    );
  }

  // Case 3: single video
  if (videos.length === 1) {
    const url = normalizeUrl(videos[0]);
    return (
      <video
        controls
        src={url}
        muted
        loop
        playsInline
        className="w-full h-64 object-cover rounded-t-xl"
      />
    );
  }

  // Case 4: nothing
  return (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No media available</span>
    </div>
  );
};

export default MediaCarousel;
