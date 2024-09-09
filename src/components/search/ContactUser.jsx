import React from 'react';

const ContactButton = ({ phoneNumber }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola%20me%20interesa%20el%20boleto`;

  return (
    <div>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Contactar al Vendedor
        </button>
      </a>
    </div>
  );
};

export default ContactButton;