import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import ItemCard from "../../components/dashboard/ItemCard"; // Reuse this with prop name fix
import ViewItemModal from "../../components/dashboard/ViewItemModal"; // Reuse this with prop name
import EditProjectModal from "../Projects/EditProjectModal";
import DeleteMediaModal from "../../components/dashboard/DeleteMediaModal"; // Reuse this with prop name
import AddProjectModal from "./AddProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [viewProject, setViewProject] = useState(null); 
  const [editProject, setEditProject] = useState(null); 
  const [deleteModalOpen, setShowDelete] = useState(false); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Open delete modal
  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setShowDelete(true);
  };

  const handleProjectAdded = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onView={() => setViewProject(item)}
              onEdit={() => setEditProject(item)}
              onDelete={() => openDeleteModal(item)}
            />
          ))}
        </div>
      )}

      {/* View Modal */}
      {viewProject && (
        <ViewItemModal
          item={viewProject}
          onClose={() => setViewProject(null)}
        />
      )}

      {/* Edit Modal */}
      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onUpdated={(updated) => {
            setProjects((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
          }}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedProject && (
        <DeleteMediaModal
          item={selectedProject}
          type="projects"
          onClose={() => setShowDelete(false)}
          onUpdated={(fetchProjects) => {
            fetchProjects();
            if (fetchProjects) {
              console.log("Project deleted successfully");
            } else {
              console.error("Failed to delete project");
            }
          }}
        />
      )}

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Add Project
        </button>
      </div>

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onAdded={handleProjectAdded}
        />
      )}
    </div>
  );
};

export default Projects;
