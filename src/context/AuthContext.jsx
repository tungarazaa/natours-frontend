import { createContext, useEffect, useState } from "react";
import { fetchUser } from "../utils/apiTours";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function checkAuth() {
    try {
      const user = await fetchUser();

      if (user?.status === "fail") {
        setIsAuth(false);
      } else {
        setIsAuth(true);
      }
    } catch (err) {
      console.log(err);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
