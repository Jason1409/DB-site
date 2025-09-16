import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const MediaCarousel = ({ images = [], videos = [], title }) => {
  const normalizeUrl = (item) => (typeof item === "string" ? item : item?.secure_url);
  const media = [...images, ...videos];

  // If we have multiple media -> Swiper (fills parent via absolute inset-0)
  if (media.length > 0) {
    return (
      <div className="absolute inset-0 w-full h-full">
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
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={url}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  // Single image fallback (keeps same visual height)
  if (images.length === 1) {
    const url = normalizeUrl(images[0]);
    return (
      <img
        src={url}
        alt={title}
        className="w-full h-full object-cover"
        style={{ minHeight: "12rem" }}
      />
    );
  }

  // Single video fallback
  if (videos.length === 1) {
    const url = normalizeUrl(videos[0]);
    return (
      <video
        controls
        src={url}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{ minHeight: "12rem" }}
      />
    );
  }

  // No media
  return (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-500">No media available</span>
    </div>
  );
};

export default MediaCarousel;
