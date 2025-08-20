import React, { useState } from "react";
import Modal from "../../components/dashboard/Modal";
import ProductForm from "../../components/dashboard/ProductForm";
import MediaUploader from "../../components/dashboard/MediaUploader";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const EditProductModal = ({ product, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: product.title || "",
    description: product.description || "",
    category: product.category || ""
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`/products/${product.id}`, formData);
      toast.success("Product updated");
      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Modal onClose={onClose} title={`Edit Product - ${product.title}`}>
      <div className="space-y-4">
        <ProductForm formData={formData} setFormData={setFormData} />

        <MediaUploader
          collection="products"
          documentId={product.id}
          folder="products"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};
export default EditProductModal;
