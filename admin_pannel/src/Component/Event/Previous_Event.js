import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery';
import Modal from 'react-modal';
import './Event_Show.css';
const Previous_Event = () => {
  const url = "http://localhost:8000/api/PreviousEvent";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [myid, setMyId] = useState("");
  const [boothCount, setBoothCount] = useState(0);
  const [boothdata, setBoothData] = useState([]);
  const [modalIsOpen2, setIsOpen2] = useState(false);
  const [boothData2, setBoothData2] = useState([]);
  const [boothCount2, setBoothCount2] = useState(0);
  const isAdminLoggedIn = localStorage.getItem('Admin_token');

  function openModal(user) {
    setSelectedUser(user);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedUser(null);
  }


 

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
  }, [loading]);
  useEffect(() => {
    if (myid) {
      fetchBoothInfo(myid);
    }
  }, [myid]);


  const fetchInfo = () => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  };

  const initializeDataTable = () => {
    $('#myTable').DataTable({
      responsive: true
    });
  };


  const fetchBoothInfo2 = (id) => {
    const url = `http://localhost:8000/api/EventToRegister/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log fetched data to console
        setBoothData2(data.events || []);
        setBoothCount2(data.totalBooths || 0);
   
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setBoothData2([]);
        setBoothCount2(0);
      });
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const customStyles = {
    overlay: {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '10px',
      padding: '20px',
      width: '90%',
      maxWidth: '500px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
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
    <div className="content-body">
 
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Previous Event</h4>
                <div className="table-responsive">
                  <table id="myTable" className="display">
                    <thead>
                      <tr>
                        <th className="">Event Name</th>
                      
                        <th className="">Booth</th>

                        <th className="">View</th>
                  
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dataObj, index) => (
                        <tr key={index}>
                          <td>{dataObj.Event_Name}</td>

                      

                          <td>
                            <button
                              className="btn btn-light"
                              onClick={() => setMyId(dataObj._id)}
                            >
                              <i className="bi bi-shop" style={{ fontSize: '1.3rem' }}></i>
                            </button>
                          </td>

                          <td>
                            <button className="btn btn-light text-info;" onClick={() => openModal(dataObj)}>
                              <i className="bi bi-eye " style={{ fontSize: '1.3rem' }}></i>
                            </button>
                          </td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </table>
            
                  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    {selectedUser && (
                      <div>
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Event Details</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-12">
                              <img className="d-block w-100" src={`http://localhost:8000/${selectedUser.Event_Images}`} height="200" />
                            </div>
                          
                            <div className="col-6">
                              <p><strong>Event Name :</strong> {selectedUser.Event_Name}</p>

                            </div>
                            <div className="col-6">
                              <p><strong>Event Date :</strong> {selectedUser.Event_Date}</p>

                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p><strong>Event Location :</strong> {selectedUser.Event_Location}</p>

                            </div>
                            <div className="col-6">
                              <p><strong>Event Time :</strong> {selectedUser.Event_Time}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p><strong>Total Event days :</strong> {selectedUser.Total_Days}</p>
                            </div>
                            <div className="col-6">
                              <p><strong>Booth Count :</strong> {selectedUser.Booth_Count}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p><strong>Booth Space :</strong> {selectedUser.Booth_Space}</p>
                            </div>
                            <div className="col-6">
                              <p><strong>Booth Price :</strong> {selectedUser.Booth_Price}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <p><strong>Event Description:</strong> {selectedUser.Event_Description}</p>
                            </div>
                            <div className="col-6">
                              <p><strong>Category Name :</strong> {selectedUser.Cat_id_FK ? selectedUser.Cat_id_FK.Category_Name : 'No Category'}</p>
                            </div>
                          </div>
                          {selectedUser.Guest_Speaker.map((ds, index) => (
                            <p key={index}><strong>Guest Speaker :</strong> {ds}</p>
                          ))}

                          <button className="btn btn-secondary" onClick={closeModal}>Close</button>
                        </div>
                      </div>
                    )}

                  </Modal>

                 


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 mt-4 booth-main" style={{ width: "100%!important" }}>
        <h1>Total Booth Count: {boothCount}</h1>
       
        <div className="row">
          {boothdata.length ? (
            boothdata.map((d, i) => (




              <div
                className={`col-4 booth-card ${d.Booth_Reserved === "true" ? "reserved" : ""}`}
                key={i}
              >
                <h5>{d.UserId ? d.UserId.User_Name : 'No user assigned'}</h5>

                <p>{d.Booth_Reserved === "true" ? "Reserved" : "Available"}</p>
              </div>
            ))
          ) : (
            <p>No booths available</p>
          )}
        </div>
      </div>
    </div>





  );
};

export default Previous_Event;