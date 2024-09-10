import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

  

const Footer = () => {
    const location = useLocation();  
    
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;  
    }

    return (
        <footer className="flex justify-around items-center bg-custom-purple-dark p-4 fixed bottom-0 w-full">
            <NavLink to="/search" className="flex flex-col items-center">
                <img src="/images/icons/Search.png" alt="Busquedade boletos" className="w-6 h-6" />
                <span className="text-white text-xs">Buscar</span>
            </NavLink>
            <NavLink to="/ticketcreate" className="flex flex-col items-center">
                <img src="/images/icons/Upload.png" alt="Publicar boletos" className="w-6 h-6" />
                <span className="text-white text-xs">Publicar</span>
            </NavLink>
            <NavLink to="/" className="flex flex-col items-center">
                <img src="/images/icons/letter.png" alt="Enviar mensajes" className="w-6 h-6" />
                <span className="text-white text-xs">Mensajes</span>
            </NavLink>
            <NavLink to="/register" className="flex flex-col items-center">
                <img src="/images/icons/Avatar.png" alt="Perfil usuario" className="w-6 h-6" />
                <span className="text-white text-xs">Perfil</span>
            </NavLink>
        </footer>
    );
}

export default Footer;
