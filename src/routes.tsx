import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/layouts/auth";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import Dashboard from "./pages/app/dashboard";
import DashboardLayout from "./pages/layouts/dashboard-layout";
import { EditUser } from "./pages/app/EditUser";
import DocumentList from "./pages/app/Documents";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "/sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/profile",
    element: (
      <DashboardLayout>
        <EditUser />
      </DashboardLayout>
    ),
  },
  {
    path: "/dashboard/documents",
    element: (
      <DashboardLayout>
        <DocumentList />
      </DashboardLayout>
    ),
  },
]);
