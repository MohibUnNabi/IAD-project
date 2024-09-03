import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './Register_Insert.css';

function Register_Insert() {




  const [selectedBooths, setSelectedBooths] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const pid = localStorage.getItem('id');
  const exhibitorUrl = `http://localhost:8000/api/Exhibitor/${pid}`;
  const [myid, setMyId] = useState("");
  useEffect(() => {
    setMyId(id);
  }, [id]);


  const [exhibitorData, setExhibitorData] = useState(null);
  useEffect(() => {
    fetch(exhibitorUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        setExhibitorData(data);
      })
      .catch((error) => console.error('Error fetching exhibitor details:', error));
  }, [exhibitorUrl]);


  useEffect(() => {
    if (exhibitorData) {
      setNewUserData((prevData) => ({
        ...prevData,
        ExhibitorId: exhibitorData.exhibitor._id,
      }));
    }
  }, [exhibitorData]);


  const [newUserData, setNewUserData] = useState({
    Event_id_Fk: id,
    ExhibitorId: '',
    Booth_Name: "",

  });

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [boothdata, setBoothData] = useState([]);

  const [boothCount, setBoothCount] = useState(0);

  const handleDivClick = (booth) => {
    if (booth.Booth_Reserved === "true") {
      alert("This booth is already booked.");
    } else {
      setSelectedBooths((prevSelectedBooths) =>
        prevSelectedBooths.includes(booth._id)
          ? prevSelectedBooths.filter((boothId) => boothId !== booth._id)
          : [...prevSelectedBooths, booth._id]
      );
    }
  };
  

  const divStyle = {
    border: '1px solid black',
    margin: '10px',
    padding: '10px',
    cursor: 'pointer',
  };

  const selectedDivStyle = {
    ...divStyle,
    backgroundColor: 'lightblue',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  
   
   
  };

  const Click = () => {
    fetch("http://localhost:8000/api/Registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUserData)
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json().then((data) => {
            
  
            const boothManagementData = {
              Booth_Reserved: true,
              UserId: localStorage.getItem('id')
            };
  
            // Create an array of fetch promises
            const boothFetches = selectedBooths.map((booth) => {
              // Construct the URL with the booth ID
              const url = `http://localhost:8000/api/BoothManagement/${booth}`;
  
              // Make the fetch request
              return fetch(url, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(boothManagementData)
              })
              .then(response => response.json())
              .catch(error => console.error(`Error for booth ${booth}:`, error));
            });
  
            // Wait for all booth fetches to complete
            return Promise.all(boothFetches).then(() => {
              navigate("/Event_Show");
            });
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.error || "Error adding Registration");
          });
        }
      })
      .catch((error) => console.error("Error adding User:", error));
  };
  

  const url1 = "http://localhost:8000/api/Event";
  const url2 = "http://localhost:8000/api/Exhibitor";

  useEffect(() => {
    fetchInfo(url1, setData1);
    fetchInfo(url2, setData2);
  }, []);

  useEffect(() => {
    if (myid) {
      fetchBoothInfo(myid);
    }
  }, [myid]);

  const fetchInfo = (url, setData) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const fetchBoothInfo = (id) => {
    const url = `http://localhost:8000/api/RegistrationforBoothCount/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBoothData(data.dataa);
        setBoothCount(data.booth_count); // Assuming the API response contains booth_count
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      <div className="content-body">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Registration</h4>
              <p className="text-muted m-b-15 f-s-12">
                Use the input classes on an
                <code>.input-default, input-flat, .input-rounded</code> for
                Default input.
              </p>
              <div className="basic-form">
                <form>
                
                  <input type="hidden" name="Event_id_Fk"  value={newUserData.Event_id_Fk}
                    onChange={handleInputChange}/>
                
                  <input type="hidden"  name="ExhibitorId" value={newUserData.ExhibitorId}
                    onChange={handleInputChange}/>
                
                  <br />
                  <label>Booth Name</label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control input-default"
                      placeholder="Enter Your Booth Name"
                      name="Booth_Name"
                      value={newUserData.Booth_Name}
                      onChange={handleInputChange}
                    />
                  </div>
                
             
                  <button
                    type="button"
                    className="btn mb-1 btn-primary"
                    onClick={Click}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-4 booth-main" style={{width:"100%!important"}}>
            <h1>Booth Count: {boothCount}</h1>
            <h3>Select Booth</h3>
            <div className="row">
              {boothdata.length ? (
                boothdata.map((d, i) => (
                  <div
                    className={`col-4 booth-card ${d.Booth_Reserved === "true" ? 'reserved' : (selectedBooths.includes(d._id) ? 'selected' : '')}`}
                    key={i}
                    onClick={() => handleDivClick(d)}
                  >
                    <p>{d.Booth_Reserved === "true" ? "Reserved" : "Available"}</p>
                    <p>{d._id}</p>
                  </div>
                ))
              ) : (
                <p>No booths available</p>
              )}
            </div>
          </div>


          
        </div>
      </div>
    </>
  );
}


export default Register_Insert;
