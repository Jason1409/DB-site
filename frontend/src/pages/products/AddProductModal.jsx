import React, { useState } from "react";
import Modal from "../../components/dashboard/Modal";
import ProductForm from "../../components/dashboard/ProductForm";
import MediaUploader from "../../components/dashboard/MediaUploader";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const AddProductModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: undefined
  });

  const [saving, setSaving] = useState(false);
  const [createdProductId, setCreatedProductId] = useState(null);
  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.post("/products", formData);
      toast.success("Product created");
      setCreatedProductId(res.data.id);
      onAdded(res.data);
    } catch (err) {
      toast.error("Failed to create product");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Add New Product">
      <div className="space-y-4">
        <ProductForm formData={formData} setFormData={setFormData} />

        {/* Show MediaUploader only if product is created */}
        {createdProductId && (
          <MediaUploader
            collection="products"
            documentId={createdProductId}
            folder="products"
          />
        )}

        <button
          onClick={handleCreate}
          disabled={saving || createdProductId !== null}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {saving
            ? "Creating..."
            : createdProductId
            ? "Product Created"
            : "Create Product"}
        </button>
      </div>
    </Modal>
  );
};

export default AddProductModal;
