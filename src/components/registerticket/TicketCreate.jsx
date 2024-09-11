import { useState, useEffect } from "react";
import useApi from "../../services/useApi";
import { API_BASE_URL } from "../../config/urls";
import axios from "axios";

const TicketCreate = () => {
  // Estado para almacenar el username desde el localStorage
  const username = localStorage.getItem("username");

  // Estado para los datos del formulario
  const [ticketData, setTicketData] = useState({
    departure_place: "",
    arrival_place: "",
    departure_date: "",
    return_date: "",
    original_price: "",
    proposed_price: "",
    note: "",
    transport_id: "",  // ID del transporte seleccionado
  });

  // Estado para almacenar el ID del usuario
  const [userId, setUserId] = useState(null);

  // Hook personalizado para hacer la solicitud de creación del ticket
  const {
    data: createTicketData,
    loading: createLoading,
    error: createError,
    request: createTicketRequest,
  } = useApi({
    apiEndpoint: `${API_BASE_URL}tickets/`,
    method: "POST",
    requiresAuth: true,  // Usamos autenticación
  });

  // Función para obtener el ID del usuario basado en el username
  const fetchUserId = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}user-id/${username}/`
      );
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error al obtener el ID del usuario:", error);
    }
  };

  // Obtener el ID del usuario al cargar el componente
  useEffect(() => {
    if (username) {
      fetchUserId();
    }
  }, [username]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userId) {
      console.error("El ID del usuario no está disponible");
      return;
    }

    const newTicketData = {
      ...ticketData,
      user: userId,  // Usar el ID del usuario
      transport: ticketData.transport_id,
    };

    try {
      await createTicketRequest(newTicketData);
      alert("Ticket creado exitosamente!");
      // Puedes redirigir o limpiar el formulario después de la creación
    } catch (error) {
      console.error("Error al crear el ticket:", error);
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({
      ...ticketData,
      [name]: value,
    });
  };
console.log(ticketData)
  return (
    <div>
      <h2>Crear Ticket</h2>
      {createError && <p>Error: {createError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Departure Place</label>
          <input
            type="text"
            name="departure_place"
            value={ticketData.departure_place}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Arrival Place</label>
          <input
            type="text"
            name="arrival_place"
            value={ticketData.arrival_place}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Departure Date</label>
          <input
            type="datetime-local"
            name="departure_date"
            value={ticketData.departure_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Return Date (Opcional)</label>
          <input
            type="datetime-local"
            name="return_date"
            value={ticketData.return_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Original Price</label>
          <input
            type="number"
            name="original_price"
            value={ticketData.original_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Proposed Price</label>
          <input
            type="number"
            name="proposed_price"
            value={ticketData.proposed_price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Note</label>
          <textarea
            name="note"
            value={ticketData.note}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Transport</label>
          <select
            name="transport_id"
            value={ticketData.transport_id}
            onChange={handleChange}
            required
          >            
            <option value="1">FlixBus</option>
            <option value="2">Vueling</option>
            <option value="3">Volotea</option>
            <option value="4">Ryanair</option>
            <option value="5">BlablaBus</option>
            <option value="6">Italia Air</option>
            <option value="7">Iberia</option>
            <option value="8">Air france</option>
            <option value="9">Alsa</option>
            <option value="10">Eurolines</option>
          </select>
        </div>
        <button type="submit" disabled={createLoading}>
          {createLoading ? "Creando Ticket..." : "Crear Ticket"}
        </button>
      </form>
    </div>
  );
};

export default TicketCreate;
