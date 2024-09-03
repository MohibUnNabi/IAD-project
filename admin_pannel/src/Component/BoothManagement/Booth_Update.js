import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate ,} from "react-router-dom";
import { useState,useEffect } from 'react';

function Event_Edit() {
    const navigate=useNavigate();
    const { id } = useParams();
    const url = `http://localhost:8000/api/BoothManagement/${id}`;
    console.log(url)
    const [newUserData, setUserData] = useState(null);
 
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user details:", error));
    }, [url]);
  
    if (!newUserData) {
      return 
      
      <div >Loading...</div>;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
      const Click = () => {
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
          })
            .then((res) => res.json())
            .then((updatedData) => {
              console.log(updatedData)
                alert("Data updated successfully");
         navigate("/Booth_Show");
            })
            .catch((error) => {
              console.error('Error updating user data:', error);
              alert('Error updating user data. Please try again.');
            });
      };





















    return (
















      <div className="content-body">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">User</h4>
            <p className="text-muted m-b-15 f-s-12">Use the input classes on an <code>.input-default, input-flat, .input-rounded</code> for Default input.</p>
            <div className="basic-form">
              <form>
              <label>Event Name</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Event Name" name="Event_Name" value={newUserData.Event_Name} onChange={handleInputChange} />
                  </div>
                <label>Event Location</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Event Location" name="Event_Location" value={newUserData.Event_Location} onChange={handleInputChange} />
                </div>
                <label>Event Date</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Event Date" name="Event_Date" value={newUserData.Event_Date} onChange={handleInputChange} />
                </div>
                <label>Booth Count</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Booth Count" name="Booth_Count" value={newUserData.Booth_Count} onChange={handleInputChange} />
                </div>
                <label> Booth Space</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Booth Space" name="Booth_Space" value={newUserData.Booth_Space} onChange={handleInputChange} />
                </div>
                <label>Booth Price</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Booth_Price" name="Booth_Price" value={newUserData.Booth_Price} onChange={handleInputChange} />
                </div>
                <button type="button" class="btn mb-1 btn-primary" onClick={Click}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>




      );
}


export default Event_Edit