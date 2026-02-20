import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

export default function Logout() {
  const { logoutHandler } = useContext(AuthContext);

  useEffect(() => {
    logoutHandler();   // ✅ само това
  }, []);

  return null;         // или <> </>
}
