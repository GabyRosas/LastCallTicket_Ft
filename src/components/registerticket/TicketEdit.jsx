import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";

const TicketEdit = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      departure_place: "",
      arrival_place: "",
      departure_date: "",
      return_date: "",
      original_price: "",
      proposed_price: "",
      note: "",
      transport: null,
      user: null, 
    });
  
    const { data: ticketData, request: fetchTicket } = useApi({
      apiEndpoint: `${API_BASE_URL}tickets/${ticketId}/`,
      method: "GET",
    });
    console.log(ticketData)
    const { request: updateTicket } = useApi({
      apiEndpoint: `${API_BASE_URL}tickets/${ticketId}/`,
      method: "PUT",
      requiresAuth: true,
    });
  
    useEffect(() => {
      const fetchDetails = async () => {
        try {
          const response = await fetchTicket();                 
          const formatDateTimeLocal = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 16); 
          };
  
          setFormData({
            departure_place: response.data.departure_place,
            arrival_place: response.data.arrival_place,
            departure_date: formatDateTimeLocal(response.data.departure_date),
            return_date: response.data.return_date ? formatDateTimeLocal(response.data.return_date) : "",
            original_price: response.data.original_price,
            proposed_price: response.data.proposed_price,
            note: response.data.note,
            transport_id: response.data.transport.id, 
            user: response.data.user, 
          });
        } catch (error) {
          console.error("Error al obtener los detalles del ticket:", error);
        }
      };
  
      fetchDetails();
    }, [fetchTicket]);
  
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
        const formatDate = (dateString) => {
            return dateString ? new Date(dateString).toISOString().slice(0, 16) : null;
        };

        const updatedTicket = {
          ...formData,
          departure_date: formatDate(formData.departure_date),
          return_date: formatDate(formData.return_date),
          transport: formData.transport_id !== undefined ? formData.transport_id : null,
        };
        console.log("Actualizando ticket con:", updatedTicket); 
        await updateTicket(updatedTicket);
        navigate(`/ticket-details/${ticketId}`);  
      } catch (error) {
        console.error("Error al actualizar el ticket:", error);
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Editar Boleto</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block mb-1">Transporte</label>
            <select
              name="transport_id"  
              value={formData.transport_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value={1}>FlixBus</option>
              <option value={2}>Vueling</option>
              <option value={3}>Volotea</option>
              <option value={4}>Ryanair</option>
              <option value={5}>BlablaBus</option>
              <option value={6}>Italia Air</option>
              <option value={7}>Iberia</option>
              <option value={8}>Air france</option>
              <option value={9}>Alsa</option>
              <option value={10}>Eurolines</option>
            </select>
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Actualizar Boleto
          </button>
        </form>
      </div>
    );
  };
  
  export default TicketEdit;
