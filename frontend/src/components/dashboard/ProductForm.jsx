const ProductForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <label className="block font-semibold text-white">Product Details</label>
      <div className="flex-col items-center gap-4">
        <label className="block font-semibold text-white">Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full text-white bg-transparent"
          required
        />

        <label className="block font-semibold text-white">Description</label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          className="border p-2 w-full text-white bg-transparent"
        />

        <label className="block font-semibold text-white">Category</label>
        <input
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          className="border p-2 w-full text-white bg-transparent"
        />
      </div>
    </>
  );
};

export default ProductForm;
