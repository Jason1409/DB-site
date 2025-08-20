import React, { useState } from "react";
import Home from "./Home";
import WhoWeAre from "./WhoWeAre";
import WhatWeDo from "./WhatWeDo";
import Products from "./Products";
import Projects from "./Projects";
import {RouterProvider} from "react-router-dom";
import router from "./router";

const sections = ["home", "who", "what", "products", "projects"];

export default function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50 to-white text-gray-900 font-sans">
      <RouterProvider router={router} />
      <header className="sticky top-0 bg-white shadow-md z-50">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <div className="text-2xl font-bold text-teal-700 cursor-pointer">
            TileFloor Co.
          </div>
          <ul className="flex space-x-6 text-gray-700">
            {sections.map((sec) => (
              <li
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`cursor-pointer hover:text-teal-600 transition ${
                  activeSection === sec ? "text-teal-700 font-semibold" : ""
                }`}
              >
                {sec === "home" && "Home"}
                {sec === "who" && "Who We Are"}
                {sec === "what" && "What We Do"}
                {sec === "products" && "Products"}
                {sec === "projects" && "Projects"}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        {activeSection === "home" && <Home />}
        {activeSection === "who" && <WhoWeAre />}
        {activeSection === "what" && <WhatWeDo />}
        {activeSection === "products" && <Products />}
        {activeSection === "projects" && <Projects />}
      </main>

      <footer className="text-center p-6 text-sm text-gray-400">
        &copy; 2025 TileFloor Co. All rights reserved.
      </footer>
    </div>
  );
}
