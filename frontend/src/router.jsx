import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./features/PrivateRoute";
import DashboardLayout from "./DashboardLayout";
import PublicLayout from "./PublicLayout";
import DashboardHome from "./pages/DashboardHome";
import Login from "./pages/Login";
// Public pages - keep lazy loading
const Home = lazy(() => import("./components/userUI/Home"));
const ProductsUI = lazy(() => import("./components/userUI/ProductsUI"));
const ProjectsUI = lazy(() => import("./components/userUI/ProjectsUI"));
const Contacts = lazy(() => import("./components/userUI/Contacts"));

// Dashboard pages - normal imports (no lazy)
import Projects from "./pages/Projects/Projects";
import Products from "./pages/products/Products";
import ContactsList from "./pages/Contacts/ContactsList";

const Loader = <div>Loading...</div>;

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/" replace /> },
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute />,
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
  }
]);

export default router;