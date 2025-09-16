import React, { useEffect, useState } from "react";
import { getProductsPreview } from "../../services/productsService";
import MediaCard from "../../features/MediaCard";


import servicesBanner from "../../assets/P2.avif";

const ProductsUI = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

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
    <section className="py-16 bg-[#fdfaf5]">
      <div className="container mx-auto px-4">
        {/* ✅ Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-[#0b1c3d] tracking-wide relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-[#f5e6c8] after:mx-auto after:mt-3">
          Our Services
        </h2>

        {/* ✅ Banner with Image */}
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mb-16">
          {/* Text */}
          <div className="bg-white shadow-md rounded-xl border-l-4 border-[#f5e6c8] p-6 md:p-10">
            <p className="text-base md:text-lg text-gray-700 leading-loose">
              At <span className="font-semibold text-[#0b1c3d]">Anees Habib Technical Services</span>, 
              we take pride in offering{" "}
              <strong className="text-[#0b1c3d]">
                comprehensive solutions in marble, tiling, and flooring works
              </strong>, delivering craftsmanship that blends durability with
              style. Whether it’s a new installation or a complete makeover, our
              team ensures every detail is finished to perfection.
            </p>
            <p className="mt-6 text-base md:text-lg text-gray-700 leading-loose">
              We also specialize in{" "}
              <strong className="text-[#0b1c3d]">renovation and refurbishing</strong>,
              helping clients transform outdated spaces into modern, functional,
              and elegant environments. From upgrading flooring to restoring
              marble and reworking interiors, we bring new life to every project.
            </p>
            <p className="mt-6 text-base md:text-lg text-gray-700 leading-loose">
              Our expertise further extends to{" "}
              <strong className="text-[#0b1c3d]">
                professional electrical services
              </strong>, making us a trusted partner for both residential and
              commercial projects. With a commitment to precision, reliability,
              and timely delivery, we create spaces that truly stand the test of
              time.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src={servicesBanner}
              alt="Our Services"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* ✅ Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#f5e6c8] hover:shadow-2xl transition-all duration-300"
            >
              <MediaCard
                key={product.id}
                title={product.title}
                images={product.images}
                videos={product.videos}
                category={product.category}
                description={product.description}
                type="service"
                link="/products"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsUI;
