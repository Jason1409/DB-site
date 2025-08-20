const ProjectForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <label className="block font-semibold text-white">Project Details</label>
      <div className="flex-col items-center gap-4">
      <label className="block font-semibold text-white fle">Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      />

      <label className="block font-semibold text-white">Client</label>
      <input
        name="client"
        value={formData.client}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      />

      <label className="block font-semibold text-white">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      />

      <label className="block font-semibold text-white">Category</label>
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      />

      <label className="block font-semibold text-white">Overview</label>
      <textarea
        name="Overview"
        value={formData.Overview}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      />

      <label className="block font-semibold text-white">Partners</label>
      <input
        name="Partners"
        value={formData.Partners.join(", ")}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            Partners: e.target.value.split(",").map((p) => p.trim()),
          }))
        }
        className="border p-2 w-full text-white bg-transparent"
      />
</div>
      <label className="block font-semibold text-white">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full text-white bg-transparent"
      >
      
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
    
    </>
  );
};

export default ProjectForm;