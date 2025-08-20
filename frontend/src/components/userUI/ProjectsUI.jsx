import React, { useEffect, useState } from "react";
import { getProjectsPreview } from "../../services/projectsApi";
import MediaCarousel from "../../features/MediaCarousel";

const ProjectsUI = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsPreview(3); // Fetch 3 for preview
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err.message);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="py-12 bg-[#fdfaf5]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#0b1c3d]">
          Our Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#f5e6c8] hover:shadow-2xl transition-all duration-300"
            >
              {/* ✅ Reusable Swiper Component */}
              <MediaCarousel
                images={project.images}
                videos={project.videos}
                title={project.title}
              />

              {/* Card content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#0b1c3d]">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Category: {project.category}
                </p>
                <p className="text-sm text-gray-500">
                  Client: {project.client}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsUI;
