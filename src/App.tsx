import { Route, Routes } from "react-router-dom";
import { AdminLogin, AdminDashboard } from "./components/custom";

function App() {
  return (
    <main className="flex h-screen w-screen">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
