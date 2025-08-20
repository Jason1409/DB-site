import axiosInstance from "../axiosInstance";

// Submit contact form
export const sendContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post("/contact/", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw new Error(error.response?.data?.detail || "Failed to send message");
  }
};
