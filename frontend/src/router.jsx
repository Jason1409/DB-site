import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./features/PrivateRoute";
import DashboardLayout from "./DashboardLayout";
import PublicLayout from "./PublicLayout";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";

// Public pages - lazy load
const Home = lazy(() => import("./components/userUI/Home"));
const ProductsUI = lazy(() => import("./components/userUI/ProductsUI"));
const ProjectsUI = lazy(() => import("./components/userUI/ProjectsUI"));
const Contacts = lazy(() => import("./components/userUI/Contacts"));

// Dashboard pages - normal imports
import Projects from "./pages/Projects/Projects";
import Products from "./pages/products/Products";
import ContactsList from "./pages/Contacts/ContactsList";

const Loader = <div>Loading...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Suspense fallback={Loader}><Home /></Suspense> },
      { path: "products", element: <Suspense fallback={Loader}><ProductsUI /></Suspense> },
      { path: "projects", element: <Suspense fallback={Loader}><ProjectsUI /></Suspense> },
      { path: "contact", element: <Suspense fallback={Loader}><Contacts /></Suspense> },
    ],
  },
  {
    path: "/login-ahts",
    element: <Login />,
  },
  {
    path: "/dashboard-admin-ahts",
    element: <PrivateRoute />,   // 🔒 Guard
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "projects", element: <Projects /> },
          { path: "products", element: <Products /> },
          { path: "contacts", element: <ContactsList /> },
        ],
      },
    ],
  },
]);

export default router;