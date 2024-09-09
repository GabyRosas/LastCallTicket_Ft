import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { request, loading, error } = useApi({
    apiEndpoint: `${API_BASE_URL}login/`,
    method: "POST",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", formData.username);
      navigate("/search");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === "object") {
      return (
        <ul className="text-red-600">
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-red-600">{error}</p>;
  };

  return (
    <div className="min-h-screen flex flex-col mx-auto p-6"
    style={{backgroundImage: `url('/images/loginfondo.jpg')`,}}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl text-custom-white text-center font-bold mb-4">Iniciar sesión</h1>
        <img
          src="/images/logo.png"
          alt="Logo"
          className="mx-auto mb-4"
          style={{ width: "208px", height: "206px" }}
        />
        {renderError()}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-3 rounded-full border border-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-purple text-custom-purple-dark"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 rounded-full border border-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-purple-dark"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-custom-purple text-white py-3 px-4 hover:bg-custom-purple-light"
        >
          {loading ? "Validando cuenta..." : "Ingresar"}
        </button>
        <a
          href="/register"
          className="text-custom-purple-light font-bold hover:underline block text-center mt-4"
        >
          Aún no tienes una cuenta?
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
