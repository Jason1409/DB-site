// src/PublicLayout.jsx
import { Outlet, Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaInstagram } from 'react-icons/fa';
export default function PublicLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const navLinks=[{
        name:"Home", type:"route",to:"/"},
        {name:"Who We Are", type:"section", to:"#about"},
        {name:"What We Do", type:"section", to:"#services"},
        {name:"Products",type:"route", to:"/products"},
        {name:"Projects",type:"route", to:"/projects"},
        {name:"Contact",type:"route", to:"/contact"},

    ];
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F0]">
      
      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-50 bg-[#0A1F44] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#about"
            
            className="text-2xl font-display weight-bold font- text-[#FFD700] tracking-wide hover:scale-105 transition-transform duration-300"
          >
            ANEES HABIB TECHNICAL SERVICES CO.L.L.C
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
           <ul className="flex gap-5 text-[#fffefd] ">
            {navLinks.map((link) => (
             link.type === "route" ? (
            <NavLink key={link.name} to={link.to} className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300">
              {link.name}
            </NavLink>
          ) : (
            <a key={link.name} href={link.to} className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300">
              {link.name}
            </a>
          )
            ))}
            </ul>

             {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
      
      

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#F5EFEB] px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <ul className="flex flex-col gap-5 text-[#1a1a40]">
            {navLinks.map((link) => (
              link.type === "route" ? (
                <NavLink key={link.name} to={link.to} className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300">
                  {link.name}
                </NavLink>
              ) : (
                <a key={link.name} href={link.to} className="hover:text-[#FFD700] hover:scale-105 transition-transform duration-300">
                  {link.name}
                </a>
              )
            ))}
          </ul>
        </div>
      )}
          
          </nav>

        </div>
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
            <p className="text-1xl font-bold text-[#FFD700] mb-4">ANEES HABIB TECHNICAL SERVICES CO.L.L.C
</p>
            <p>DUBAI REAL ESTATE CORPORATION OFFICE OF13 621 Um Hurair Second Dubai</p>
            <br></br>
            <a href="mailto:aneeshabib899@gmail.com">aneeshabib899@gmail.com</a>
            <br></br>
            <a href="tel:+971521136657"> +971 521 136 657 </a>
            <br></br>
            <a
              href="https://instagram.com/tileco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-gray-400 hover:text-[#ff006f] transition-colors duration-300"
            >
              <FaInstagram size={28}/>
            </a>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[#FFD700] transition">Home</a></li>
              <li><a href="/products" className="hover:text-[#FFD700] transition">Products</a></li>
              <li><a href="/projects" className="hover:text-[#FFD700] transition">Projects</a></li>
              <li><a href="/contact" className="hover:text-[#FFD700] transition">Contact</a></li>
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
