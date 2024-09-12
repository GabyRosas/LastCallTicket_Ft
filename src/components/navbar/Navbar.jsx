const Navbar = () => {
    return (
      <nav className="flex justify-end items-center p-4 border-b-4" style={{ borderColor: '#5A1D49'}}>
        <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold font-chalkboard text-custom-purple">LastCallTicket</h2>
            <img
            src="/public/images/logolct.png"
            alt="Logo del sitio"
            className="w-14 h-14" // 58px * 58px
            />
        </div>
      </nav>
    );
  };
  
  export default Navbar;