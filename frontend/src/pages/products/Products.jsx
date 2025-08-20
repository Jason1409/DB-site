import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import ItemCard from "../../components/dashboard/ItemCard"; // Reuse this with prop name fix
import ViewItemModal from "../../components/dashboard/ViewItemModal"; // Reuse this with prop name fix
import DeleteMediaModal from "../../components/dashboard/DeleteMediaModal"; // Reuse this with prop name
import EditProductModal from "./EditProductModal";
import AddProductModal from "./AddProductModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteModalOpen, setShowDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDelete(true);
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ItemCard
              key={product.id}
              item={product} // Note: pass item, not project
              onView={() => setViewProduct(product)}
              onEdit={() => setEditProduct(product)}
              onDelete={() => openDeleteModal(product)}
            />
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewProduct && (
        <ViewItemModal item={viewProduct} onClose={() => setViewProduct(null)} />
      )}

      {/* Edit Modal */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdated={(updated) => {
            setProducts((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
          }}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedProduct && (
        <DeleteMediaModal
          item={selectedProduct} // Reuse modal, rename prop inside DeleteMediaModal if needed
            type="products"
          onClose={() => setShowDelete(false)}
          
          onUpdated={(fetchProducts) => {
            fetchProducts();
            if (fetchProducts) {
              console.log("Product deleted");
            }
          }}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdded={handleProductAdded}
        />
      )}
    </div>
  );
};

export default Products;
