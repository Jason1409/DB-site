import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const MediaUploader = ({ collection, documentId }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleMediaUpload = async (type, files) => {
    if (!files.length) return;
    setUploading(true);
    try {
      const form = new FormData();
      files.forEach((file) => form.append("files", file));
      // Add folder param as required in body

      await axiosInstance.post(
        `/media/upload/${collection}?type=${type}&collection=${collection}&document_id=${documentId}`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success(`${type} upload successful`);
      setImageFiles([]);
      setVideoFiles([]);
    } catch (err) {
      toast.error(`Failed to upload ${type}`);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div>
        <label className="block font-semibold text-white">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImageFiles(Array.from(e.target.files))}
          className="text-white"
        />
        <button
          onClick={() => handleMediaUpload("image", imageFiles)}
          disabled={uploading || !imageFiles.length}
          className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </div>
      <div>
        <label className="block font-semibold text-white">Upload Videos</label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={(e) => setVideoFiles(Array.from(e.target.files))}
          className="text-white"
        />
        <button
          onClick={() => handleMediaUpload("video", videoFiles)}
          disabled={uploading || !videoFiles.length}
          className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
        >
          {uploading ? "Uploading..." : "Upload Videos"}
        </button>
      </div>
    </>
  );
};

export default MediaUploader;
