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
    <div className="flex h-screen font-sans bg-[#f7f9fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1e293b] text-white flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl font-semibold mb-6 tracking-wide">Admin Dashboard</h2>
          <nav className="flex flex-col gap-3 text-sm">
            <NavLink
              to="projects"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="contacts"
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
              }
            >
              Contacts
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
        >
          Logout
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full" /> {/* Placeholder Logo */}
            <span className="font-semibold tracking-wide">ANEES HABIB TECHNICAL SERVICES CO.L.L.C</span>
          </div>
        </header>

        {/* Dynamic content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
