import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const MediaCarousel = ({ images = [], videos = [], title }) => {
  const normalizeUrl = (item) =>
    typeof item === "string" ? item : item?.secure_url;

  const media = [...images, ...videos];

  if (media.length > 0) {
    return (
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        loop
        className="w-full h-full"
      >
        {media.map((m, idx) => {
          const url = normalizeUrl(m);
          if (!url) return null;

          const isVideo = /\.(mp4|webm|ogg|mkv|mov|avi)$/i.test(url);

          return (
            <SwiperSlide key={idx} className="w-full h-full">
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
                <img
                  src={url}
                  alt={title}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  // Single image
  if (images.length === 1) {
    const url = normalizeUrl(images[0]);
    return (
      <img
        src={url}
        alt={title}
        className="w-full h-64 object-cover rounded-t-xl"
      />
    );
  }

  // Single video
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

  // No media
  return (
    <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No media available</span>
    </div>
  );
};

export default MediaCarousel;
