import { useState, useCallback } from "react";
import axios from "axios";

const useApi = ({ apiEndpoint, method = "GET", requiresAuth = false }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const request = useCallback(
      async (body = null) => {
        setLoading(true);
        setError(null);
  
        try {
          const headers = { "Content-Type": "application/json" };
  
          // Solo agregar el token si requiresAuth es verdadero
          if (requiresAuth) {
            const token = localStorage.getItem("token");
            if (token) {
              headers["Authorization"] = `Token ${token}`;
            }
          }
  
          const response = await axios({
            url: apiEndpoint,
            method,
            data: body,
            headers,
          });
  
          setData(response.data);
          setLoading(false);
          return response;
        } catch (err) {
          setError(err.response ? err.response.data : err.message);
          setLoading(false);
          throw err;
        }
      },
      [apiEndpoint, method, requiresAuth]
    );
  
    return {
      data,
      loading,
      error,
      request,
    };
  };
  
  export default useApi;
  