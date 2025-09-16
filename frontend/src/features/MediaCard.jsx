import MediaCarousel from "../features/MediaCarousel";

export default function MediaCard({
  title,
  images = [],
  videos = [],
  category,
  description,
  client,
  type = "service",
  link,
}) {
  return (
    <a href={link || "#"}>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#f5e6c8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full">

        {/* Parent MUST be relative so carousel (absolute) can fill it.
            We include aspect-* classes AND a hard fallback height so it works
            even if plugin is not present or purged. */}
        <div className="relative w-full aspect-w-4 aspect-h-3 h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
          <MediaCarousel
            images={images}
            videos={videos}
            title={title}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col">
          <h3 className="text-xl font-bold text-[#0b1c3d] mb-3 border-l-4 border-[#f5e6c8] pl-3">
            {title}
          </h3>

          {type === "service" && (
            <>
              {category && <p className="text-sm text-gray-600">Service Type: {category}</p>}
              {description && <p className="text-base text-gray-600 leading-relaxed mt-2 line-clamp-3">{description}</p>}
            </>
          )}

          {type === "project" && (
            <>
              {category && <p className="text-sm text-gray-600">Project Type: {category}</p>}
              {client && <p className="text-base text-gray-600 leading-relaxed mt-2 line-clamp-3">Client: {client}</p>}
            </>
          )}
        </div>
      </div>
    </a>
  );
}
