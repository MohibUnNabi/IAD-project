import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Corrected import statement to match the file name
function Contact_Insert() {
    const navigate = useNavigate();
    const [newContactData, setNewUserData] = useState({
        Name: "",
        Email: "",
        Subject: "",
        Msg: "",
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
      fetch("http://localhost:8000/api/Contact", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
         
          body: JSON.stringify(newContactData),
      })
      .then((res) => {
          if (res.status === 201) {
              return res.json().then((data) => {
                  alert("Your Mesage Send successfully");
                  navigate("/User_Show");
              });
          } else {
              return res.json().then((data) => {
                  throw new Error(data.error || "Error adding user");
              });
          }
      })
      .catch((error) => {
          console.error("Error adding User:", error);
          alert("Error adding user data: " + error.message);
      });
  };
  

    return (
    




<>
<div>
  <section className="hero-wrap hero-wrap-2 js-fullheight  contact" style={{backgroundImage: 'url("images/bg_2.jpg")'}} data-stellar-background-ratio="0.5">
    <div className="overlay" />
    <div className="container">
      <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
        <div className="col-md-9  pb-5">
          <h1 className="mb-3 bread">Contact Us</h1>
          <p className="breadcrumbs"><span className="mr-2"><a href="index.html">Home <i className="ion-ios-arrow-forward" /></a></span> <span>Contact <i className="ion-ios-arrow-forward" /></span></p>
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-section contact-section">
    <div className="container">
      <div className="row d-flex mb-5 contact-info">
        <div className="col-md-12 mb-4">
          <h2 className="h3">Contact Information</h2>
        </div>
        <div className="w-100" />
        <div className="col-md-3">
          <p><span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016</p>
        </div>
        <div className="col-md-3">
          <p><span>Phone:</span> <a href="tel://1234567920">+ 1235 2355 98</a></p>
        </div>
        <div className="col-md-3">
          <p><span>Email:</span> <a href="mailto:info@yoursite.com">info@yoursite.com</a></p>
        </div>
        <div className="col-md-3">
          <p><span>Website</span> <a href="#">yoursite.com</a></p>
        </div>
      </div>
      <div className="row block-9">
        <div className="col-md-6 order-md-last d-flex">
          <form className="bg-light p-5 contact-form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Your Name" name="Name" value={newContactData.Name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Your Email" name="Email" value={newContactData.Email} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Subject" name="Subject" value={newContactData.Subject} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
              <textarea  id cols={30} rows={7} className="form-control" placeholder="Message" name="Msg" value={newContactData.Msg} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary py-3 px-5" onClick={handleAddUser} />
            </div>
          </form>
        </div>
        <div className="col-md-6 d-flex">
          <div id="map" className="bg-white" />
        </div>
      </div>
    </div>
  </section>
  <section className="ftco-section-parallax">
    <div className="parallax-img d-flex align-items-center">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 text-center heading-section heading-section-white ">
            <h2>Subcribe to our Newsletter</h2>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in</p>
            <div className="row d-flex justify-content-center mt-4 mb-4">
              <div className="col-md-8">
                <form action="#" className="subscribe-form">
                  <div className="form-group d-flex">
                    <input type="text" className="form-control" placeholder="Enter email address" />
                    <input type="submit" defaultValue="Subscribe" className="submit px-3" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

</>
    );
}

export default Contact_Insert;
