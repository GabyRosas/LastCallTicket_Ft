import React from 'react';
const Homepage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">      
          <div className="w-full max-w-md p-8 rounded-lg shadow-md">
                      
            <img
              src="/images/logo.png"
              alt="Logo"
              className="mx-auto mb-4"
              style={{ width: "208px", height: "206px" }}
            />
            <h2 className="text-3xl font-bold font-chalkboard text-center text-custom-purple mb-6">LastCallTicket</h2>
              
              <button
                type="submit"
             
                className="w-full bg-custom-purple text-white py-3 rounded-full hover:bg-custom-purple-light transition duration-300"
              >
           
              </button>       
            
          </div>
        </div>
      );


}
export default Homepage;
