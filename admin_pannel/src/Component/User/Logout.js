import React from "react";

function Logout() {
  const handleLogout = () => {
    // Remove all items from local storage
    localStorage.clear();
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="content-body">
      <section id="main-content mt-5">
        <section className="wrapper">
       
      <center>
      <button className="logout btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
      </center>
        </section>
      </section>
    </div>
  );
}

export default Logout;
