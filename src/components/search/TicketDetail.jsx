import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";
import { useNavigate } from "react-router-dom";
import ContactButton from '../../components/search/ContactUser';

const TicketDetails = () => {
    const phoneNumber = '1234567890';
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState(null);
    const [currentUsername, setCurrentUsername] = useState(null);
    const { data, loading, error, request } = useApi({
      apiEndpoint: `${API_BASE_URL}tickets/${ticketId}/`,
      method: "GET",
    });

    useEffect(() => {
      const fetchTicket = async () => {
        try {
          const response = await request();
          setTicket(response.data);
        } catch (err) {
          console.error("Error fetching ticket details:", err);
        }
      };

      fetchTicket();
    }, [request, ticketId]);

    useEffect(() => {
      const username = localStorage.getItem("username");
      console.log("Current username:", username);
      if (username) {
        setCurrentUsername(username);
      }
    }, []);
    useEffect(() => {
        console.log("Ticket user:", ticket?.username);
      }, [ticket]);     
      
    if (loading) return <p>Cargando detalles del boleto...</p>;
    if (error) return <p>Error al cargar los detalles: {error}</p>;

   
    const isSeller = ticket?.username === currentUsername;
    console.log("Is Seller:", isSeller);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/detailsfondo.jpg')`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
      {ticket ? (
        <div className="bg-custom-yellow p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
          <h2 className="text-2xl font-bold text-custom-purple mb-4">{ticket.departure_place} to {ticket.arrival_place}</h2>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Precio: ${ticket.proposed_price}</p>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Fecha de salida: {ticket.departure_date}</p>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Fecha de regreso: {ticket.return_date}</p>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Fecha de registro: {ticket.register_date}</p>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Precio original: ${ticket.original_price}</p>
          <p className="text-2 font-bold text-custom-purple-light mb-3">Nota: {ticket.note}</p>
          <p className="text-2xl font-bold text-custom-purple flex justify-end mb-4">Vendedor: {ticket.username}</p>

          {isSeller ? (
            <button className="bg-custom-purple text-white px-4 py-2 mt-4 rounded-lg"
              onClick={() => navigate(`/ticketupdate/${ticket.id}`)}>
              Editar Boleto
            </button>
          ) : (
            <ContactButton phoneNumber={phoneNumber} />
          )}
        </div>
      ) : (
        <p>No se encontraron detalles del boleto.</p>
      )}
    </div>
  );
};

export default TicketDetails;
