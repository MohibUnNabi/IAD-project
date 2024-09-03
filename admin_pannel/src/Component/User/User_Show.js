import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery'; 
import Modal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';
const User_Show = () => {
  const url = "http://localhost:8000/api/User";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exhibitorData, setExhibitorData] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Moved up here
  const [userData, setUserData] = useState({ User_Status: "" });
  const navigate = useNavigate(); // Initialize useNavigate
  const openModal = (user) => {
    setSelectedUser(user);
    fetchExhibitorDetails(user._id);  // Fetch exhibitor details for the selected user
    setIsOpen(true);
  };
  
  const fetchExhibitorDetails = (id) => {
    fetch(`http://localhost:8000/api/UserAndExhibitor/${id}`)
      .then((res) => res.json())
      .then((data) => setExhibitorData(data))
      .catch((error) => console.error("Error fetching exhibitor details:", error));
  };
  
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

  const deletedata = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete user');
        }
        alert("Data deleted successfully");
        fetchInfo();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again.");
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
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  const changingValue = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const Click = () => {
    const userId = selectedUser.User_id_Fk._id; // Access the ObjectId
    fetch(`http://localhost:8000/api/UserStatus/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((updatedData) => {
        console.log(updatedData);
        alert("Data updated successfully");
        navigate("/User_Show");
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        alert('Error updating user data. Please try again.');
      });
  }; 
  function confirmDelete(id) {
    if (window.confirm("Are you sure you want to delete this item?")) {
      // Call the delete function if the user confirms
      deletedata(id);
    }
  }
  
  return (
    <div className="content-body">
      <div className="row page-titles mx-0">
        <div className="col p-md-0">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
            <li className="breadcrumb-item active"><a href="javascript:void(0)">Home</a></li>
          </ol>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">User Table</h4>
                <div className="table-responsive">
                  <table id="myTable" className="display">
                    <thead>
                      <tr>
                   
                        <th>User Name</th>
                        <th className="hidden-phone">Email</th>
                        <th className="hidden-phone">Role</th>
                        <th className="hidden-phone">Status</th>
                   

                        <th className="hidden-phone">Delete</th>
                        <th className="hidden-phone"> Exhibitor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dataObj, index) => (
                        <tr key={index}>
                      
                          <td>{dataObj.User_Name}</td>
                          <td>{dataObj.User_Email}</td>
                          <td>{dataObj.User_Role}</td>
                          <td>{dataObj.User_Status}</td>
                       
           
                          <td>
  <button onClick={() => confirmDelete(dataObj._id)} className="btn btn-link p-0 text-danger border-0">
    <i className="bi bi-trash" style={{ fontSize: '1.3rem' }}></i>
  </button>
</td>

                          <td>
                            <button onClick={() => openModal(dataObj)} className="btn btn-dark p-0 text-light p-2 " style={{ fontSize: '1.1rem' }}>
                             See Exhibitor Detail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
  <style>
    {`
      .modal-body {
        max-height: 400px; /* Set a max height for the modal body */
        overflow-y: auto; /* Enable vertical scrolling */
      }
      .modal-body .carousel-control-next-icon,
      .modal-body .carousel-control-prev-icon {
        background-color: black !important;
      }
      .visually-hidden {
        color: black !important;
      }
    `}
  </style>
  {exhibitorData && (
    <div>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Exhibitor Details</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        {exhibitorData.Official_Document && (
          <Carousel>
            {exhibitorData.Official_Document.filter(ds => !ds.endsWith('.pdf')).map((ds, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={`http://localhost:8000/${ds}`} height="200" alt={`Slide ${index}`} />
              </Carousel.Item> 
            ))}
          </Carousel>
        )}
        <div className="col-6">
          {exhibitorData.Official_Document && (
            exhibitorData.Official_Document.filter(ds => ds.endsWith('.pdf')).map((ds, index) => (
              <div key={index} className="">
                <a href={`http://localhost:8000/${ds}`} className="btn btn-success" download target="_blank" rel="noopener noreferrer">
                  Download PDF
                </a>
              </div>
            ))
          )}
        </div>
        <p><strong>Exhibitor Name:</strong> {exhibitorData.Exhibitor_Name}</p>
        <p><strong>Company Name:</strong> {exhibitorData.Company_Name}</p>
        <p><strong>Company Email:</strong> {exhibitorData.Company_Email}</p>
        <p><strong>Official Documents:</strong> {Array.isArray(exhibitorData.Official_Document) ? exhibitorData.Official_Document.join(', ') : 'No documents available'}</p>

        <button onClick={toggleFormVisibility} className="btn btn-primary">
          {isFormVisible ? (
            <>
              <i className="bi bi-chevron-up"></i> Hide Form
            </>
          ) : (
            <>
              <i className="bi bi-chevron-down"></i> Change Status
            </>
          )}
        </button>
        {isFormVisible && (
          <form onSubmit={(e) => { e.preventDefault(); Click(); }}>
            <br />
            <label>Status</label>
            <select className="form-control input-default" name="User_Status" onChange={changingValue} value={userData.User_Status}>
              <option value="">Select a Status</option>
              <option value="Verified">Verified</option>
              <option value="Unverified">Unverified</option>
            </select>
            <br />
            <div className="row">
              <button className="btn btn-secondary col-6" onClick={closeModal}>Close</button>
              <button type="submit" className="btn btn-primary col-6">Change</button>
            </div>
          </form>
        )}
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
    </div>
  );
};

export default User_Show;
