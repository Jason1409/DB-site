// src/components/ViewItemModal.jsx
import React from "react";
import Modal from "./Modal";

const ViewItemModal = ({ item, onClose }) => {
  const isImage = (url) => /\.(jpg|jpeg|png|webp|gif|bmp|svg)$/i.test(url);
  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

  if (!item) return null;
  return (
    <Modal onClose={onClose} maxWidth="max-w-3xl">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
        {item.title}
      </h2>
      {item.description && <p className="text-gray-700 dark:text-gray-300">{item.description}</p>}

      {item.Partners && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-800 dark:text-white">Partners:</h4>
          <p className="text-gray-700 dark:text-gray-300">{item.Partners}</p>
        </div>
      )}

{[...(item.images || []), ...(item.videos ||[])].map((media, idx) => {
  const url = media?.secure_url || media;

  if (isImage(url)) {
    return (
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mx-auto max-w-md"
      >
        <img
          src={url}
          alt={`media-${idx}`}
          className="w-full h-48 object-cover rounded cursor-pointer"
          loading="lazy"
        />
      </a>
    );
  } else if (isVideo(url)) {
    return (
      <div key={idx} className="block mx-auto max-w-md">
        <video
          controls
          src={url}
          className="w-full h-64 object-contain rounded"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else {
    return (
      <p key={idx} className="text-red-500">
        Unsupported media format: {url}
      </p>
    );
  }
})}

    </Modal>
  );
};  

export default ViewItemModal;
