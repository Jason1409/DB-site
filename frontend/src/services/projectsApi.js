import axiosInstance from "../axiosInstance";

// Fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get("/projects/");
    return response.data;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch projects");
  }
};

// Fetch limited projects for homepage preview
export const getProjectsPreview = async (limit = 4) => {
  try {
    const response = await axiosInstance.get(`/projects/?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects preview:", error);
    throw new Error(error.response?.data?.detail || "Failed to fetch preview");
  }
};
