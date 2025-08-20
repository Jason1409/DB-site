import React, { useState } from "react";
import Modal from "../../components/dashboard/Modal";
import ProjectForm from "../../components/dashboard/ProjectForm";
import MediaUploader from "../../components/dashboard/MediaUploader";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

const AddProjectModal = ({ onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    description: "",
    category: "",
    Overview: "",
    Partners: [],
    status: "ongoing",
  });

  const [saving, setSaving] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState(null);

  const handleCreate = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.post("/projects", formData);
      toast.success("Project created");
      setCreatedProjectId(res.data.id);
      onAdded(res.data);
      // Now you can upload media because you have project ID
    } catch (err) {
      toast.error("Failed to create project");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Add New Project">
      <div className="space-y-4">
        <ProjectForm formData={formData} setFormData={setFormData} />

        {/* Only show media uploader if project created */}
        {createdProjectId && <MediaUploader projectId={createdProjectId} />}

        <button
          onClick={handleCreate}
          disabled={saving || createdProjectId !== null}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Creating..." : createdProjectId ? "Project Created" : "Create Project"}
        </button>
      </div>
    </Modal>
  );
};

export default AddProjectModal;
