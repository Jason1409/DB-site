import axiosInstance from "../axiosInstance";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch products");
  }
};

// Fetch limited products for homepage preview
export const getProductsPreview = async (limit = 4) => {
  try {
    const response = await axiosInstance.get(`/products/?limit=${limit}`);
    return response.data;
    
  } 
  catch (error) {
    console.error("Error fetching products preview:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch preview");
  }
};
