import React, { useEffect, useState } from "react";
import { getProjectsPreview } from "../../services/projectsApi";
import MediaCard from "../../features/MediaCard";

// Import local static image
import projectsBanner from "../../assets/P1.avif";

const ProjectsUI = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <section className="py-16 bg-[#fdfaf5]">
      <div className="container mx-auto px-4">
        {/* ✅ Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-[#0b1c3d] tracking-wide relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-[#f5e6c8] after:mx-auto after:mt-3">
          Our Projects
        </h2>

        {/* ✅ Banner with Image */}
        <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto mb-16">
          {/* Text */}
          <div className="bg-white shadow-md rounded-xl border-l-4 border-[#f5e6c8] p-6 md:p-10">
            <p className="text-base md:text-lg text-gray-700 leading-loose">
              At{" "}
              <span className="font-semibold text-[#0b1c3d]">
                Anees Habib Technical Services
              </span>
              , we take pride in delivering{" "}
              <strong className="text-[#0b1c3d]">
                projects that combine functionality, durability, and style
              </strong>
              . Based in <strong>Dubai</strong>, our team works closely with
              both homeowners and builders to bring residential and commercial
              spaces to life with precision and care.
            </p>
            <p className="mt-6 text-base md:text-lg text-gray-700 leading-loose">
              From{" "}
              <strong className="text-[#0b1c3d]">
                luxury villas and apartments
              </strong>{" "}
              to{" "}
              <strong className="text-[#0b1c3d]">
                modern offices and commercial developments
              </strong>
              , we specialize in creating interiors and finishes that stand the
              test of time. Whether it’s flooring, marble installations, or
              complete fit-outs, our focus remains on delivering workmanship
              that meets the highest standards of quality.
            </p>
            <p className="mt-6 text-base md:text-lg text-gray-700 leading-loose">
              Every project is approached with a commitment to detail,
              reliability, and timely execution. While we are a growing company,
              our portfolio already reflects the{" "}
              <strong className="text-[#0b1c3d]">
                successful completion of diverse projects in Dubai
              </strong>
              . With each step, we aim to strengthen our reputation as a trusted
              partner for residential and commercial clients alike.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src={projectsBanner}
              alt="Our Projects"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* ✅ Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#f5e6c8] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <MediaCard
                key={project.id}
                title={project.title}
                images={project.images}
                videos={project.videos}
                category={project.category}
                client={project.client}
                description={project.description}
                partners={project.partners}
                type="project"
                link="/projects"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsUI;
