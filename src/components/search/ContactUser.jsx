import React from 'react';

const ContactButton = ({ phoneNumber }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola%20me%20interesa%20el%20boleto`;

  return (
    <div>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button className="bg-custom-purple text-white px-4 py-2 rounded-lg">
          Contactar al Vendedor
        </button>
      </a>
    </div>
  );
};

export default ContactButton;