import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function Event_Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:8000/api/Event/${id}`;
  const categoryUrl = 'http://localhost:8000/api/Category';

  const [newUserData, setUserData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [url]);

  useEffect(() => {
    fetch(categoryUrl)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  if (!newUserData) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGuestSpeakerChange = (e) => {
    const { value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      Guest_Speaker: value.split(',').map(speaker => speaker.trim())
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setUserData((prevData) => ({
      ...prevData,
      Event_Images: imageFile,
    }));
  };

  const handleSubmit = () => {
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

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((updatedData) => {
        console.log(updatedData);
        alert("Data updated successfully");
        navigate("/Event_Show");
      })
      .catch((error) => {
        console.error('Error updating event data:', error);
        alert('Error updating event data. Please try again.');
      });
  };
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="content-body">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Edit Event</h4>
            <code>  Event details edit below. </code> 
            <div className="basic-form">
              <form encType="multipart/form-data">
                <label>Event Name</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Event Name"
                    name="Event_Name"
                    value={newUserData.Event_Name}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Event Location</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Event Location"
                    name="Event_Location"
                    value={newUserData.Event_Location}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Event Date</label>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control input-default"
                    placeholder="Enter Event Date"
                    name="Event_Date"
                    value={newUserData.Event_Date}
                    onChange={handleInputChange} 
                    min={today}
                  />
                </div>
                <label>Event Time</label>
                <div className="form-group">
                  <input
                    type="time"
                    className="form-control input-default"
                    placeholder="Enter Your Event Time"
                    name="Event_Time"
                    value={newUserData.Event_Time}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Total Days</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Total Days Of Event"
                    name="Total_Days"
                    value={newUserData.Total_Days}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Booth Count</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Booth Count"
                    name="Booth_Count"
                    value={newUserData.Booth_Count}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Booth Space</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Booth Space"
                    name="Booth_Space"
                    value={newUserData.Booth_Space}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Booth Price</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Booth Price"
                    name="Booth_Price"
                    value={newUserData.Booth_Price}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Ticket Price</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Ticket Price"
                    name="Ticket_Price"
                    value={newUserData.Ticket_Price}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Event Description</label>
                <div className="form-group">
                  <textarea
                    className="form-control input-default"
                    placeholder="Enter Your Event Description"
                    name="Event_Description"
                    value={newUserData.Event_Description}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Guest Speaker</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Guest Speakers"
                    name="Guest_Speaker"
                    value={newUserData.Guest_Speaker.join(", ")}
                    onChange={handleGuestSpeakerChange}
                  />
                </div>
                <label>Category Name</label>
                <select
                  className="form-control input-default"
                  name="Cat_id_FK"
                  value={newUserData.Cat_id_FK}
                  onChange={handleInputChange}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.Category_Name}
                    </option>
                  ))}
                </select>
                <br />
                <label>Event Images</label>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control input-default"
                    onChange={handleImageChange}
                    name="Event_Images"
                  />
                </div>
                <br />
                <button
                  type="button"
                  className="btn mb-1 btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event_Edit;
