import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAdminContext } from "../../contexts/AdminContext";
import { Navigate } from "react-router-dom";
import GoogleIcon from "../../assets/google.svg";

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
      className="flex flex-col items-center justify-center w-screen p-4"
      id="admin-login"
    >
      <div className="px-4 py-8 w-full md:w-1/3 shadow-2xl gap-2 rounded-md  border-zinc-900 flex flex-col items-center justify-center">
        <img src="/logo.png" alt="logo" className="h-32 w-32" />
        <span className="text-xl pb-3 font-semibold">Admin Login</span>
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

        <div className="flex items-center justify-center w-full gap-1.5 mt-3">
          <div className="w-[95%] flex-grow  bg-zinc-800/[0.9] h-[1.9px] rounded-md"></div>
          <div className="text-bg-zinc-400 font-sm">OR</div>
          <div className="flex-grow h-[1.9px] w-[95%] rounded-md  bg-zinc-800/[0.9]"></div>
        </div>

        <Button className="flex w-full px-4 py-2 items-center justify-center rounded-md gap-2">
          <img src={GoogleIcon} className="h-6 w-6" />
          <span> Sign In with Google</span>
        </Button>
      </div>
    </section>
  );
};

export default AdminLogin;
