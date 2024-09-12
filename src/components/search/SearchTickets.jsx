import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const TicketSearch = () => {
  const [departurePlace, setDeparturePlace] = useState("");
  const { request, data, loading, error } = useApi({
    apiEndpoint: `${API_BASE_URL}tickets/`,
    method: "GET",
  });

  const [filteredTickets, setFilteredTickets] = useState([]);
  const navigate = useNavigate();

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

  const handleTicketClick = (ticketId) => {
    navigate(`/ticket-details/${ticketId}`);
  };

  const userType = localStorage.getItem("user_type");

  return (
    <div
    className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
    style={{backgroundImage: `url('/images/vuelosfondo.jpg')`,}}
    >
    
    <div className="bg-yellow-100 bg-opacity-90 p-6 rounded-lg shadow-lg w-11/12 max-w-md text-center">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          id="departure_place"
          value={departurePlace}
          onChange={handleChange}
          placeholder="Lugar de salida"
          className="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-custom-purple text-white py-3 rounded-full hover:bg-custom-purple transition duration-300"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
    </div>
     
    <div className="mt-8 w-11/12 max-w-md bg-white bg-opacity-70 p-4 rounded-lg shadow-lg">
      {error && <p className="text-red-500">Error: {error}</p>}
      {filteredTickets.length > 0 ? (
        <ul className="space-y-2">
          {filteredTickets.map((ticket) => (
            <li key={ticket.id}
                onClick={() => handleTicketClick(ticket.id)}
                className="border-b py-2 text-lg cursor-pointer hover:bg-gray-200"
            >
              {ticket.departure_place} to {ticket.arrival_place} - ${ticket.proposed_price}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No se encontraron tickets.</p>
      )}
    </div>
  </div>
);
};

export default TicketSearch;