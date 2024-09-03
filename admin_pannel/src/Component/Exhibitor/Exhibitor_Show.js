import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery';
import Modal from 'react-modal';
import Carousel from 'react-bootstrap/Carousel';

const Exhibitor_Show = () => {
  const url = "http://localhost:8000/api/Exhibitor";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Moved up here
  const [userData, setUserData] = useState({ User_Status: "" });
  const navigate = useNavigate(); // Initialize useNavigate

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

  function openModal(user) {
    setSelectedUser(user);
    setUserData({ User_Status: user.User_Status || "" }); // Initialize form with the user's current status
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedUser(null);
    setIsFormVisible(false); // Reset form visibility
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
  const carouselStyles = {
    '.carousel-indicators li': {
      backgroundColor: 'black',
    },
    '.carousel-indicators .active': {
      backgroundColor: 'black',
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
                <h4 className="card-title">Data Table</h4>
                <div className="table-responsive">
                  <table id="myTable" className="display">
                    <thead>
                      <tr>
                        <th className="hidden-phone">Company Name</th>
                        <th className="hidden-phone">Company Email</th>
                        <th className="hidden-phone">View</th>
                        <th className="hidden-phone">Edit</th>
                        <th className="hidden-phone">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dataObj, index) => (
                        <tr key={index}>
                          <td className="-">{dataObj.Company_Name}</td>
                          <td className="">{dataObj.Company_Email}</td>
                          <td>
                            <button className="btn btn-light" onClick={() => openModal(dataObj)}>
                              <i className="bi bi-eye" style={{ fontSize: '1.1rem' }}></i>
                            </button>
                          </td>
                          <td>
                            <Link to={`/Exhibitor_Edit/${dataObj._id}`} className="text-info">
                              <i className="bi bi-pencil" style={{ fontSize: '1.5rem' }}></i>
                            </Link>
                          </td>
                          <td>
                            <button onClick={() => deletedata(dataObj._id)} className="btn btn-link p-0 text-danger border-0">
                              <i className="bi bi-trash" style={{ fontSize: '1.5rem' }}></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                    {selectedUser && (
                      <div>
                        <style>
                          {`
                            .modal-body .carousel-control-next-icon,
                            .modal-body .carousel-control-prev-icon {
                              background-color: black !important;
                            }
                            .visually-hidden {
                              color: black !important;
                            }
                          `}
                        </style>
                        <div className="">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">User Details</h5>
                            <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}>
                              <i className="bi bi-x" style={{ fontSize: '1.5rem' }}></i>
                            </button>
                          </div>
                          <div className="modal-body">
                            {selectedUser.Official_Document && (
                              <Carousel>
                                {selectedUser.Official_Document.filter(ds => !ds.endsWith('.pdf')).map((ds, index) => (
                                  <Carousel.Item key={index}>
                                    <img className="d-block w-100" src={`http://localhost:8000/${ds}`} height="200" alt={`Slide ${index}`} />
                                  </Carousel.Item> 
                                ))}
                              </Carousel>
                            )}


                            <div className="row mt-2">
                              <div className="col-6">
                                <p><strong>ID:</strong> {selectedUser._id}</p>

                              </div>
                              <div className="col-6">
                                {selectedUser.Official_Document && (
                                  selectedUser.Official_Document.filter(ds => ds.endsWith('.pdf')).map((ds, index) => (
                                    <div key={index} className="">
                                      <a href={`http://localhost:8000/${ds}`} className="btn btn-success" download target="_blank" rel="noopener noreferrer">
                                        Download PDF
                                      </a>
                                    </div>
                                  ))
                                )}
                              </div>
                              <div className="col-6">
                                <p><strong>Exhibitor:</strong> {selectedUser.Exhibitor_Name}</p>

                              </div>
                              <div className="col-6">
                                <p><strong>Company:</strong> {selectedUser.Company_Name}</p>

                              </div>
                              <div className="col-6">
                                <p><strong>Company Email:</strong> {selectedUser.Company_Email}</p>

                              </div>
                              <div className="col-6">
                                <p><strong>User Name :</strong> {selectedUser.User_id_Fk ? selectedUser.User_id_Fk.User_Name : 'No Category'}</p>

                              </div>


                            </div>
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
                                <button type="submit" className="btn btn-primary">Change</button>
                              </form>
                            )}
                          </div>
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

export default Exhibitor_Show;
