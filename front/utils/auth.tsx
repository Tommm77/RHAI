import { useEffect, useState } from "react";
import cookie from "cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookies = cookie.parse(document.cookie || "");
    setIsAuthenticated(!!cookies.token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
