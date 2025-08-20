// src/components/DeleteMediaModal.jsx
import axiosInstance from "../../axiosInstance";
import Modal from "./Modal";
import { toast } from "react-toastify";

const DeleteMediaModal = ({ item, type, onClose, onUpdated }) => {
  if (!item) return null;

  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  // Delete a single image or video
  const handleDeleteMedia = async (mediaType, publicId) => {
    const encodedPublicId = encodeURIComponent(publicId);
    if (!window.confirm(`Are you sure you want to delete this ${mediaType}?`)) return;

    try {
      await axiosInstance.delete(
        `/media/delete/${mediaType}/${encodedPublicId}?document_id=${item.id || item._id}&collection=${type}`
      );

      toast.success(`${mediaType} deleted successfully`);
      onUpdated(); // Refresh parent data
    } catch (err) {
      toast.error(`Failed to delete ${mediaType}`);
      console.error(err);
    }
  };

  // Delete the entire item (project or product)
  const handleDeleteItem = async () => {
    if (
      !window.confirm(
        `⚠️ This will permanently delete the ${type} and all associated media. Continue?`
      )
    )
      return;

    try {
      await axiosInstance.delete(`/${type}/${item.id || item._id}`);
      toast.success(`${capitalizedType} deleted successfully`);
      onUpdated(true); // Tell parent item is gone
      onClose();
    } catch (err) {
      toast.error(`Failed to delete ${type}`);
      console.error(err);
    }
  };

  return (
    <Modal onClose={onClose} maxWidth="max-w-4xl">
      <h2 className="text-xl font-bold mb-4">
        Manage Media – {item.title}
      </h2>

      {/* Images */}
      {item.images?.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Images</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {item.images.map((img) => (
              <div key={img.public_id} className="relative group">
                <img
                  src={img.secure_url || img.url}
                  alt=""
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => handleDeleteMedia("image", img.public_id)}
                  className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Videos */}
      {item.videos?.length > 0 && (
        <>
          <h3 className="font-semibold mb-2">Videos</h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {item.videos.map((vid) => (
              <div key={vid.public_id} className="relative group">
                <video
                  src={vid.secure_url || vid.url}
                  className="w-full h-32 object-cover rounded"
                  controls
                />
                <button
                  onClick={() => handleDeleteMedia("video", vid.public_id)}
                  className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Entire Item */}
      <div className="mt-8">
        <button
          onClick={handleDeleteItem}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          🗑 Delete Entire {capitalizedType}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteMediaModal;
