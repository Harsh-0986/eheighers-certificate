import { Navigate } from "react-router-dom";
import { useAdminContext } from "../../contexts/AdminContext";

const AdminDashboard = () => {
  const admin = useAdminContext();

  if (!admin.isLoggedIn) return <Navigate to="/admin/login" />;

  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
