import React, { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const TicketSearch = () => {
  const [departurePlace, setDeparturePlace] = useState("");
  const { request, data, loading, error } = useApi({
    apiEndpoint: `${API_BASE_URL}tickets/`,
    method: "GET",
  });

  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((ticket) =>
        ticket.departure_place
          .toLowerCase()
          .includes(departurePlace.toLowerCase())
      );
      setFilteredTickets(filtered);
    }
  }, [data, departurePlace]);

  const handleChange = (e) => {
    setDeparturePlace(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      await request();
    } catch (err) {
      console.error("Error searching tickets:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: `url('/images/vuelosfondo.png')`, height: "100vh" }}>
      
      {/* Contenedor del formulario */}
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <form onSubmit={handleSearch}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              id="departure_place"
              value={departurePlace}
              onChange={handleChange}
              placeholder="Lugar de salida"
              className="w-full p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-600"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>
      </div>

      {/* Resultados de búsqueda */}
      <div className="mt-8 w-11/12 max-w-md text-white">
        {error && <p className="text-red-500">Error: {error}</p>}
        {filteredTickets.length > 0 ? (
          <ul>
            {filteredTickets.map((ticket) => (
              <li key={ticket.id} className="border-b py-2">
                {ticket.departure_place} to {ticket.arrival_place} - ${ticket.proposed_price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron tickets.</p>
        )}
      </div>
    </div>
  );
};

export default TicketSearch;
