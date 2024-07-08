import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAdminContext } from "../../contexts/AdminContext";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const admin = useAdminContext();

  if (admin.isLoggedIn) return <Navigate to="/admin" />;

  const handleLogin = () => {
    admin.loginAdmin(username, password);
  };

  return (
    <section
      className="flex items-center justify-center w-screen"
      id="admin-login"
    >
      <div className="px-4 py-12 w-1/4 flex flex-col gap-2 border rounded-md border-zinc-800">
        <Input
          type="text"
          name="Username"
          id="username"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          name="Password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => handleLogin()}>Login</Button>
      </div>
    </section>
  );
};

export default AdminLogin;
