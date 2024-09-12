import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";  

const Logout = () => {
  const navigate = useNavigate();
  const { request: logoutRequest, loading, error } = useApi({
    apiEndpoint: `${API_BASE_URL}logout/`,
    method: "POST",
    requiresAuth: true,
  });

  useEffect(() => {
    const logout = async () => {
      try {
        await logoutRequest();  

        localStorage.removeItem("token");

        navigate("/login");
      } catch (err) {
        console.error("Logout error:", err);
        navigate("/login");
      }
    };

    logout();
  }, [logoutRequest, navigate]);

  if (loading) {
    return <div>Loading...</div>;  
  }

  if (error) {
    console.error("Logout error:", error);
  }

  return null;
};

export default Logout;
