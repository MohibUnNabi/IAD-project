import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

// Corrected import statement to match the file name
function Booth_Insert() {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    Event_id_Fk: "",
    Booth_Reserved: "",
    UserId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Click = () => {
    fetch("http://localhost:8000/api/BoothManagement", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Data Inserted successfully");
        navigate("/Booth_Show");
      })
      .catch((error) => console.error("Error adding User:", error));
  };
  const url1 = "http://localhost:8000/api/Event";
  const [data1, setData1] = useState([]);
  const url2 = "http://localhost:8000/api/User";
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetchInfo1();
    fetchInfo2();
  }, []);

  const fetchInfo1 = () => {
    fetch(url1)
      .then((res) => res.json())
      .then((d) => setData1(d))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchInfo2 = () => {
    fetch(url2)
      .then((res) => res.json())
      .then((d) => setData2(d))
      .catch((error) => console.error("Error fetching data:", error));
  };
  return (





    <>
      <div className="content-body">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">User</h4>
              <p className="text-muted m-b-15 f-s-12">Use the input classes on an <code>.input-default, input-flat, .input-rounded</code> for Default input.</p>
              <div className="basic-form">
                <form>
                  <label>Event</label>

                  <select className="form-control input-default" name="Event_id_Fk" value={newUserData.Event_Id_Fk} onChange={handleInputChange}>
                    <option value="">Select a Event</option>
                    {data1.map((Event) => (
                      <option key={Event.id} value={Event._id}>
                        {Event.Event_Name}
                      </option>
                    ))}
                  </select>
                  <label>Booth Reserved</label>
                  <div className="form-group">
                    <input type="text" className="form-control input-default" placeholder="Enter Your Booth Reserved" name="Booth_Reserved" value={newUserData.Booth_Reserved} onChange={handleInputChange} />
                  </div>
                  <select className="form-control input-default" name="UserId" value={newUserData.UserId} onChange={handleInputChange}>
                    <option value="">Select a User</option>
                    {data2.map((User) => (
                      <option key={User.id} value={User._id}>
                        {User.User_Name}
                      </option>
                    ))}
                  </select>
                  <button type="button" class="btn mb-1 btn-primary" onClick={Click}>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Booth_Insert;
