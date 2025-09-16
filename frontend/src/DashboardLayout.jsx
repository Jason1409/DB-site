import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./features/authSlice";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    localStorage.removeItem("auth");
    navigate("/login-ahts");
  }

  return (
    <div className="flex h-screen font-sans bg-[#f8fafc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] text-white flex flex-col justify-between p-6">
        <div>
          <h2 className="text-lg font-bold mb-8 tracking-wide text-gray-100">
            Admin Dashboard
          </h2>
          <nav className="flex flex-col gap-4 text-sm">
            <NavLink
              to="projects"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-semibold"
                  : "text-gray-300 hover:text-[#FFD700] transition"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-semibold"
                  : "text-gray-300 hover:text-[#FFD700] transition"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="contacts"
              className={({ isActive }) =>
                isActive
                  ? "text-[#FFD700] font-semibold"
                  : "text-gray-300 hover:text-[#FFD700] transition"
              }
            >
              Contacts
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm shadow transition self-center"
        >
          Logout
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center font-bold text-gray-700">
              AH
            </div>
            <span className="font-semibold tracking-wide text-gray-800">
              ANEES HABIB TECHNICAL SERVICES CO.L.L.C
            </span>
          </div>
        </header>

        {/* Dynamic content */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#f9fafb]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
