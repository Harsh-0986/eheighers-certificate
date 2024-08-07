import { useContext, useState } from "react";
import { createContext } from "react";

const INITIAL_ADMIN_STATE = {
  username: null,
  password: null,
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
};

type INITIAL_ADMIN_STATE_TYPE = {
  username: null | string;
  password: null | string;
  isLoggedIn: boolean;
};

const INITIAL_STATE = {
  ...INITIAL_ADMIN_STATE,
  //@ts-ignore
  loginAdmin: (username: string, password: string) => {},
};

type AdminContextType = {
  username: null | string;
  password: null | string;
  isLoggedIn: boolean;
  loginAdmin: (username: string, password: string) => void;
};

const AdminContext = createContext<AdminContextType>(INITIAL_STATE);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] =
    useState<INITIAL_ADMIN_STATE_TYPE>(INITIAL_ADMIN_STATE);

  const loginAdmin = (username: string, password: string) => {
    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      setAdmin({
        username,
        password,
        isLoggedIn: true,
      });
      localStorage.setItem("isLoggedIn", "true");
      return;
    }

    if (username === "" && password === "") {
      setAdmin({
        username,
        password,
        isLoggedIn: false,
      });
      localStorage.setItem("isLoggedIn", "false");
      return;
    }
  };

  const value = {
    ...admin,
    loginAdmin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
