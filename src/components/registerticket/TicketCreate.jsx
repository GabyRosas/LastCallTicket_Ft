import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const TicketCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    departure_place: "",
    arrival_place: "",
    departure_date: "",
    return_date: "",
    original_price: "",
    proposed_price: "",
    note: "",
    transport: {
      transport_type: "",  // avión o autobús
      transport_name: "",  // nombre de la compañía
    },
  });

  const [userId, setUserId] = useState(null);

  // Obtén el username del localStorage
  const username = localStorage.getItem("username");

  // Usa useApi para la API de obtener el ID del usuario
  const { request: fetchUserIdApi } = useApi({
    apiEndpoint: `${API_BASE_URL}user-id/${username}/`, // Usa el username en la URL
    method: "GET",
    requiresAuth: true,
  });
  console.log(userId)
  useEffect(() => {
    if (username) {
      fetchUserIdApi().then(response => {
        setUserId(response.data.id); // Asume que la respuesta tiene un campo 'id'
      }).catch(error => {
        console.error("Error al obtener el ID del usuario:", error);
      });
    }
  }, [username, fetchUserIdApi]);

  const { request: createTicket } = useApi({
    apiEndpoint: `${API_BASE_URL}tickets/`,
    method: "POST",
    requiresAuth: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatDate = (dateString) => {
      return dateString ? new Date(dateString).toISOString().slice(0, 16) : null;
    };

    const newTicket = {
      ...formData,
      departure_date: formatDate(formData.departure_date),
      return_date: formatDate(formData.return_date),
      user: userId, // Usa el ID del usuario
    };

    try {
      await createTicket(newTicket);
      navigate("/ticket-list"); // Redirige a la lista de boletos tras la creación
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("transport_")) {
      setFormData({
        ...formData,
        transport: {
          ...formData.transport,
          [name.split("_")[1]]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Crear Nuevo Boleto</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <div className="mb-4">
          <label className="block mb-1">Lugar de salida</label>
          <input
            type="text"
            name="departure_place"
            value={formData.departure_place}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Lugar de llegada</label>
          <input
            type="text"
            name="arrival_place"
            value={formData.arrival_place}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha de salida</label>
          <input
            type="datetime-local"
            name="departure_date"
            value={formData.departure_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Fecha de regreso (opcional)</label>
          <input
            type="datetime-local"
            name="return_date"
            value={formData.return_date}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Precio original</label>
          <input
            type="text"
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Precio propuesto</label>
          <input
            type="text"
            name="proposed_price"
            value={formData.proposed_price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Nota</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Tipo de Transporte</label>
          <select
            name="transport_type"
            value={formData.transport.transport_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccionar...</option>
            <option value="avion">Avión</option>
            <option value="autobus">Autobús</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1">Compañía de Transporte</label>
          <select
            name="transport_name"
            value={formData.transport.transport_name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Seleccionar...</option>
            {/* Aquí se deben cargar las compañías desde el backend */}
            <option value="Vueling">Vueling</option>
            <option value="Blablabus">Blablabus</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Crear Boleto
        </button>
      </form>
    </div>
  );
};

export default TicketCreate;
