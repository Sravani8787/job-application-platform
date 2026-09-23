import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const AddApplication = lazy(() => import("./pages/AddApplication"));
const EditApplication = lazy(() => import("./pages/EditApplication"));
const ApplicationDetails = lazy(
  () => import("./pages/ApplicationDetails")
);
const Settings = lazy(() => import("./pages/Settings"));

function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      Loading...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="applications" element={<Applications />} />
              <Route
                path="applications/add"
                element={<AddApplication />}
              />
              <Route
                path="applications/:id"
                element={<ApplicationDetails />}
              />
              <Route
                path="applications/edit/:id"
                element={<EditApplication />}
              />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;