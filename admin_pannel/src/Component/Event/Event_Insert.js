import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Event_Insert() {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    Event_Name: "",
    Event_Location: "",
    Event_Date: "",
    Event_Time: "",
    Total_Days: "",
    Booth_Count: "",
    Booth_Space: "",
    Booth_Price: "",
    Ticket_Price: "",
    Event_Description: "",
    Cat_id_FK: "",
    Guest_Speaker: [],
    Event_Images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const imageFile = e.target.files[0];
    setNewUserData((prevData) => ({
      ...prevData,
      Event_Images: imageFile,
    }));
  };
  const handleSpeakerChange = (e) => {
    const { value } = e.target;
    

    const Guest_Speaker=value.split(",").map((Guest_Speaker)=>Guest_Speaker.trim())
    setNewUserData((prevData) => ({
      ...prevData,
      Guest_Speaker: Guest_Speaker,
    }));
  };

  const Click = () => {
    if (!newUserData.Cat_id_FK) {
      alert("Please select a category");
      return;
    }


    const formData = new FormData();
    formData.append("Event_Name", newUserData.Event_Name);
    formData.append("Event_Date", newUserData.Event_Date);
    formData.append("Event_Location", newUserData.Event_Location);
    formData.append("Event_Time", newUserData.Event_Time);
    formData.append("Total_Days", newUserData.Total_Days);
    formData.append("Booth_Count", newUserData.Booth_Count);
    formData.append("Booth_Space", newUserData.Booth_Space);
    formData.append("Booth_Price", newUserData.Booth_Price);
    formData.append("Ticket_Price", newUserData.Ticket_Price);
    formData.append("Event_Description", newUserData.Event_Description);
    formData.append("Cat_id_FK", newUserData.Cat_id_FK);
    formData.append("Guest_Speaker", newUserData.Guest_Speaker);
    formData.append("Event_Images", newUserData.Event_Images);

    fetch("http://localhost:8000/api/Event", {
      method: "POST",
      body: formData,
    })
    
      .then((res) => {
        
        if (res.status === 201) {
          return res.json().then((data) => {
            alert("Data Inserted successfully");
            navigate("/Event_Show");
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.error || "Error adding Event");
          });
        }
      })
      .catch((error) => console.error("Error adding User:", error));
  };

  const url1 = "http://localhost:8000/api/Category";
  const [data1, setData1] = useState([]);

  useEffect(() => {
    fetch(url1)
      .then((res) => res.json())
      .then((d) => setData1(d))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <>
      <div className="content-body">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Event</h4>
              <p className="text-muted m-b-15 f-s-12">
          <code> Enter the Event details below. </code> 
          </p>
              <div className="basic-form">
                <form encType="multipart/form-data"> 
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
                    <input type="date"  min={today}   className="form-control input-default" placeholder="Enter Your Event Date" name="Event_Date" value={newUserData.Event_Date} onChange={handleInputChange} />
                  </div>
                  <label>Event Time</label>
                  <div className="form-group">
                    <input type="time" className="form-control input-default" placeholder="Enter Your Event Time" name="Event_Time" value={newUserData.Event_Time} onChange={handleInputChange} />
                  </div>
                  <label>Total Days</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Total Days Of Event" name="Total_Days" value={newUserData.Total_Days} onChange={handleInputChange} />
                  </div>
                  <label>Event Description</label>
                  <div className="form-group">
                    <textarea className="form-control input-default" placeholder="Enter Your Event Description" name="Event_Description" value={newUserData.Event_Description} onChange={handleInputChange} />
                  </div>
                  <label>Guest Speaker</label>
                  <div class="form-group">
                      <input type="text" class="form-control input-default" placeholder="Enter Your Guest Speaker" name="Guest_Speaker
                      " value={newUserData.Guest_Speaker.join(","
                      )} onChange={handleSpeakerChange} />
                    </div>
                    <label>Event Category</label>
                  <select className="form-control input-default" name="Cat_id_FK" value={newUserData.Cat_id_FK} onChange={handleInputChange}>
                    <option value="">Select a Category</option>
                    {data1.map((Category) => (
                      <option key={Category._id} value={Category._id}>
                        {Category.Category_Name}
                      </option>
                    ))}
                  </select>
                  <br></br>
                  <label>Booth Count</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Booth Count" name="Booth_Count" value={newUserData.Booth_Count} onChange={handleInputChange} />
                  </div>
                  <label>Booth Space</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Booth Space" name="Booth_Space" value={newUserData.Booth_Space} onChange={handleInputChange} />
                  </div>
                  <label>Booth Price</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Booth Price" name="Booth_Price" value={newUserData.Booth_Price} onChange={handleInputChange} />
                  </div>
                
                  <label>Ticket Price</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Ticket Price" name="Ticket_Price" value={newUserData.Ticket_Price} onChange={handleInputChange} />
                  </div>
                 

                
            
                  <label>Event Image</label>
                  <div className="form-group">
                    <input type="file" className="form-control input-default" name="Event_Images" onChange={handleFileChange} />
                  </div>
                  <br />
                  <button type="button" className="btn mb-1 btn-primary" onClick={Click}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event_Insert;
