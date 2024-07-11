import { Route, Routes } from "react-router-dom";
import {
  AdminLogin,
  AdminDashboard,
  VerifyDashboard,
} from "./components/custom";

function App() {
  return (
    <main className="flex h-screen w-screen">
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/verify" element={<VerifyDashboard />} />
      </Routes>
    </main>
  );
}

export default App;
