// src/PublicLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

export default function PublicLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", type: "route", to: "/" },
    { name: "Who We Are", type: "section", to: "#about" },
    { name: "What We Do", type: "section", to: "#services" },
    { name: "Services", type: "route", to: "/products" },
    { name: "Projects", type: "route", to: "/projects" },
    { name: "Contact Us", type: "route", to: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F0]">
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 bg-[#0A1F44] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <HashLink
            smooth
            to="/#about"
            className="text-2xl font-display font-bold text-[#FFD700] tracking-wide hover:scale-105 transition-transform duration-300"
          >
            ANEES HABIB TECHNICAL SERVICES CO.L.L.C
          </HashLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <ul className="flex gap-5 text-[#fffefd]">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300"
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <HashLink
                    key={link.name}
                    smooth
                    to={`/${link.to}`}
                    className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300"
                  >
                    {link.name}
                  </HashLink>
                )
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-[#0A1F44] px-6 py-4 shadow-lg">
            <ul className="flex flex-col gap-4 text-white">
              {navLinks.map((link) =>
                link.type === "route" ? (
                  <NavLink
                    key={link.name}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#FFD700] transition duration-200"
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <HashLink
                    key={link.name}
                    smooth
                    to={`/${link.to}`}
                    onClick={() => setIsOpen(false)}
                    className="hover:text-[#FFD700] transition duration-200"
                  >
                    {link.name}
                  </HashLink>
                )
              )}
            </ul>
          </div>
        )}
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0A1F44] text-gray-300 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
          {/* Column 1 */}
          <div>
            <p className="text-1xl font-bold text-[#FFD700] mb-4">
              ANEES HABIB TECHNICAL SERVICES CO.L.L.C
            </p>
            <p>
              DUBAI REAL ESTATE CORPORATION OFFICE OF13 621 Um Hurair Second
              Dubai
            </p>
            <br />
            <a href="mailto:aneeshabib899@gmail.com">
              aneeshabib899@gmail.com
            </a>
            <br />
            <a href="tel:+971521136657"> +971 521 136 657 </a>
            <br />
          
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-[#FFD700] transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className="hover:text-[#FFD700] transition"
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className="hover:text-[#FFD700] transition"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="hover:text-[#FFD700] transition"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-white mb-4">Business Hours</h4>
            <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
            <p>Sat: 10:00 AM - 4:00 PM</p>
            <p>Sun: Closed</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ANEES HABIB TECHNICAL SERVICES CO.L.L.C
        </div>
      </footer>
    </div>
  );
}