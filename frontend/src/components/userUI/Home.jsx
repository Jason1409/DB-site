import { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import { getProductsPreview } from "../../services/productsService";
import { getProjectsPreview } from "../../services/projectsApi";
import MediaCard from "../../features/MediaCard";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navB=[{name:"Get Quote", type:"route", to:"/contact"},
              {name:"View Our Work",type:"section", to:"#work"},
  ];
  useEffect(() => {
    Promise.all([getProductsPreview(), getProjectsPreview()])
      .then(([productsData, projectsData]) => {
        setProducts(productsData);
        setProjects(projectsData);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-xl font-semibold text-midnightBlue">Loading...</div>;

  return (
    <div className="font-[Inter] bg-[#FAF8F0] text-gray-800">

      {/* ===== Hero Section ===== */}
      <section className="bg-buttercream py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-midnightBlue mb-4">
              Transform Your Space <br /> with <span className="text-gold">Premium Flooring</span>
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              Discover expert insights, trends, and tips from our specialists. Your dream floors are one click away.
            </p>
            <div className="flex gap-4">
             {navB.map((link) => (
               link.type==="route"?(
                <NavLink
                key={link.name}
                to={link.to}
                className="border border-MidnightBlue text-midnightBlue px-5 py-3 rounded-lg hover:bg-[#f4bc15] hover:text-midnightBlue"                >
                  {link.name}
                </NavLink>
               ):(
                <a
                key={link.name}
                href={link.to}
                className="border border-MidnightBlue text-midnightBlue px-5 py-3 rounded-lg hover:bg-[#f4bc15] hover:text-midnightBlue"                >

                
                  {link.name}
                </a>
               )
             ))}
            </div>
          </div>
          <div className="flex-1">
            <img
 src="/hero5.jpg" alt="Hero"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ===== Products Section ===== */}
<section className="py-15 bg-[#FAF8F0]">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-midnightBlue mb-10 text-center">
      Our services
    </h2>
   <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
   {products.map((product) => (
     <a key={product.id} href="/products">
     <MediaCard
  key={product.id}
  title={product.title}
  images={product.images}
  videos={product.videos}
  category={product.category}
  description={product.description}
  type="service"
  link="/products"
/>

     </a>
   ))}
   </div>
    </div>
    </section>
    <section className="bg-white py-16 px-6" id="about">
  <div className="max-w-5xl mx-auto">
    <div className="inline-flex items-center gap-3 mb-4">
      <span className="h-[2px] w-8 bg-gold" />
      <span className="uppercase tracking-widest text-[20] text-midnight/70">Who We Are</span>
    </div>

    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight text-midnight">
      ANEES HABIB TECHNICAL SERVICES CO.L.L.C
    </h2>

    <p className="mt-6 text-base sm:text-lg text-midnight/80 font-sans leading-relaxed">
      At <span className="font-semibold text-midnight">ANEES HABIB TECHNICAL SERVICES CO.L.L.C</span>, we’re driven by
      a passion for excellence and a commitment to delivering top-tier solutions. With deep experience in marbles,
      tiling, and electrical services, our team blends  craftsmanship with modern techniques and innovation to achieve
      remarkable results. We pride ourselves on reliability, integrity, and an unwavering focus on client satisfaction—
      building not just projects, but a Artistry of excellence.
    </p>

    <div className="mt-10 grid sm:grid-cols-3 gap-6">
      <div className="bg-buttercream rounded-xl p-5">
        <p className="text-sm tracking-wide text-midnight/70 uppercase">Core Value</p>
        <h4 className="font-display text-xl text-midnight mt-1">Integrity</h4>
      </div>
      <div className="bg-buttercream rounded-xl p-5">
        <p className="text-sm tracking-wide text-midnight/70 uppercase">Core Value</p>
        <h4 className="font-display text-xl text-midnight mt-1">Craftsmanship</h4>
      </div>
      <div className="bg-buttercream rounded-xl p-5">
        <p className="text-sm tracking-wide text-midnight/70 uppercase">Core Value</p>
        <h4 className="font-display text-xl text-midnight mt-1">Reliability</h4>
      </div>
    </div>
  </div>
</section>

      {/* ===== Services Section ===== */}
      <section className="py-16 bg-buttercream" id="services">
        <div className="container mx-auto px-6">
<h2 className="text-3xl font-bold text-midnightBlue mb-6 text-center font-serif">
  What We Do
</h2>

<p className="mt-4 text-base sm:text-lg text-midnight/80 font-serif leading-relaxed  max-w-4xl mx-auto mb-12">
  We bring craftsmanship and precision to every project we undertake. From sourcing and installing premium marbles to delivering flawless tiling work, we transform spaces with elegance and durability.
  <br /><br />
  Our skilled electrical team ensures every connection is safe, efficient, and built to last.
  <br /><br />
  Whether it’s enhancing the beauty of interiors or ensuring seamless functionality, we combine quality materials, expert techniques, and attention to detail to bring your vision to life.
</p>


  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Professional Installation",
          desc: "Expert installation with precision and attention to detail.",
          points: ["Experienced Craftsmen", "Licensed & Insured", "Quality Guarantee"],
          icon: "🔨",
        },
        {
          title: "Electrical Excellence",
          desc: "Safe, efficient, and reliable electrical installations and repairs.",
          points: ["Certified Electricians", "Safety Guaranteed", "Modern Equipment"],
          icon: "⚡",
        },
        {
          title: "Marble Mastery",
          desc: "Precision cutting, polishing, and installation of premium marbles.",
          points: ["Custom Designs", "High-Grade Materials", "Flawless Finish"],
          icon: "🏛️",
        },
        {
          title: "Elegant Flooring Solutions",
          desc: "Durable and stylish flooring for residential and commercial spaces.",
          points: ["Tile & Vinyl", "Expert Installation", "Seamless Finish"],
          icon: "🪵",
        },
        {
          title: "Custom Design & Renovation",
          desc: "Complete transformation of spaces with design and technical expertise.",
          points: ["Tailored Solutions", "Premium Craftsmanship", "On-Time Delivery"],
          icon: "🎯",
        },
      ].map((service, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="text-4xl mb-4">{service.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.desc}</p>
          <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
            {service.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  </div>
</section>
{/* ===== Projects Section ===== */}
<section className="py-16 bg-[#FAF8F0]" id="work">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-midnightBlue mb-10 text-center">
      Our Projects
    </h2>
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <MediaCard
          key={project.id}
          title={project.title}
          images={project.images}
          videos={project.videos}
          category={project.category}
          client={project.client}
          type="project"
          link="/projects"
        />
      ))}
    </div>
  </div>
</section>



   
    </div>
  );
}
