import React from "react";

const ItemCard = ({ item, onView, onEdit, onDelete }) => {
  const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  const firstMedia = item.images?.[0];
  const url = firstMedia?.secure_url || firstMedia;

  return (
    <div className="border rounded-lg p-4 shadow bg-white dark:bg-gray-800 dark:text-white">
      {url && (
        <>
          {isImage(url) && (
            <img
              src={url}
              alt={item.title || "item"}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}
          {isVideo(url) && (
            <video
              controls
              src={url}
              className="w-full h-64 object-cover rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </>
      )}

      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>

      {/* Optional fields with fallback */}
      {item.client && <p className="text-sm text-gray-600 dark:text-gray-300">{item.client}</p>}
      {item.description && <p className="mt-2 text-sm">{item.description}</p>}
      {item.status && <p className="mt-1 text-xs italic text-blue-600">{item.status}</p>}
      {item.category && <p className="mt-1 text-xs italic text-blue-600">{item.category}</p>}
      {item.Overview && <p className="mt-1 text-xs italic text-gray-500">{item.Overview}</p>}
      {item.Partners && <p className="mt-1 text-xs italic text-gray-500">{item.Partners}</p>}

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onView(item)}
        >
          View
        </button>
        <button
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => onDelete(item)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
