import React, { useState } from "react";
import Modal from "../../components/dashboard/Modal";
import ProjectForm from "../../components/dashboard/ProjectForm";
import MediaUploader from "../../components/dashboard/MediaUploader";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const EditProjectModal = ({ project, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: project.title || "",
    client: project.client || "",
    description: project.description || "",
    category: project.category || "",
    Overview: project.Overview || "",
    Partners: project.Partners || [],
    status: project.status || "ongoing",
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`/projects/${project.id}`, formData);
      toast.success("Project updated");
      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.error("Failed to update project");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title={`Edit Project - ${project.title}`}>
      <div className="space-y-4">
        <ProjectForm formData={formData} setFormData={setFormData} />
        <MediaUploader collection="projects"
         documentId={project.id}
         folder="projects" />
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

export default EditProjectModal;
