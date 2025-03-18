import { Navigate, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { ProfilePage } from "./pages/ProfilePage";
import { EditTaskPage } from "./pages/EditTaskPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";
import { TasksPage } from "./pages/TasksPage";
import { useContext } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const { loggedInUser, fetchUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loggedInUser === null) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="create" element={<CreateTaskPage />} />
            <Route path="/Tasks">
              <Route path="List" element={<TasksPage />}>
                <Route path=":taskId" element={<TaskDetailsPage />} />
              </Route>
              <Route path="edit/:taskId" element={<EditTaskPage />} />
            </Route>
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
