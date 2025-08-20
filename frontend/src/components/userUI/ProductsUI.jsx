import React, { useEffect, useState } from "react";
import { getProductsPreview } from "../../services/productsService";
import MediaCarousel from "../../features/MediaCarousel";

const ProductsUI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsPreview(3); // Fetch 3 for preview
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-[#fdfaf5]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#0b1c3d]">
          Our Products
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#f5e6c8] hover:shadow-2xl transition-all duration-300"
            >
              {/* ✅ Reusable Swiper Component */}
              <MediaCarousel
                images={product.images || []}
                videos={product.videos || []}
                title={product.title}
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0b1c3d]">
                  {product.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsUI;
