import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { request, loading, error } = useApi({
    apiEndpoint: `${API_BASE_URL}register/`,
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
      await request(formData); 
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const renderError = () => {
    if (!error) return null;
    if (typeof error === "object") {
      return (
        <ul className="text-red-500">
          {Object.entries(error).map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-red-500">{error}</p>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{backgroundImage: `url('/images/registerfondo.jpg')`,}}>      
      <div className="w-full max-w-md p-8 rounded-lg shadow-md">
        {renderError()}
        <form onSubmit={handleSubmit} className="space-y-4">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="mx-auto mb-4"
          style={{ width: "208px", height: "206px" }}
        />
        <h2 className="text-3xl font-bold font-chalkboard text-center text-custom-purple mb-6">LastCallTicket</h2>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            className="w-full p-3 rounded-full border border-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-purple-dark"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            className="w-full p-3 rounded-full border border-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-purple-dark"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full p-3 rounded-full border border-custom-purple focus:outline-none focus:ring-2 focus:ring-custom-purple-dark"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-custom-purple text-white py-3 rounded-full hover:bg-custom-purple-light transition duration-300"
          >
            {loading ? "Signing Up..." : "Registrarse"}
          </button>
        </form>
        <p className="text-center mt-4">
          <a href="/login" className="text-custom-purple-light font-bold hover:underline">
            Ya tienes una cuenta? Ingresar
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
