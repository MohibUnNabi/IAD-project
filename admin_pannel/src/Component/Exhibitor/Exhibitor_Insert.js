import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Exhibitor_Insert() {
  const navigate = useNavigate();

  // State for user data
  const [newUserData, setNewUserData] = useState({
    User_Name: "",
    User_Email: "",
    User_Password: "",
    User_Role: "",
    User_Status: "Pending"
  });

  // State for exhibitor data
  const [newExhibitorData, setNewExhibitorData] = useState({
    Exhibitor_Name: "",
    Company_Name: "",
    Company_Email: "",
    Official_Document: [],
    User_id_Fk: ""
  });
  const [userDataInserted, setUserDataInserted] = useState(false);
  // State for the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Handle input change for user data
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle input change for exhibitor data
  const handleExhibitorInputChange = (e) => {
    const { name, value } = e.target;
    setNewExhibitorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change for exhibitor data
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewExhibitorData((prevData) => ({
      ...prevData,
      Official_Document: files,
    }));
  };

  // Handle form submission for user data
  // Handle form submission for user data
  const handleAddUser = (e) => {
    e.preventDefault();
    // Now handle form submission
    fetch("http://localhost:8000/api/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json().then((data) => {
            alert("User data inserted successfully");
            const lastInsertedId = data.id;
  
            // Update the exhibitor data state with the new user ID
            setNewExhibitorData((prevData) => ({
              ...prevData,
              User_id_Fk: lastInsertedId
            }));
  
            // Set user data insertion flag to true
  
            if (newUserData.User_Role === "Exhibitor") {
              setUserDataInserted(true);
              nextStep();
            }
            else{
              navigate('/')
            }
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


  // Handle form submission for exhibitor data
  const handleAddExhibitor = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Exhibitor_Name", newExhibitorData.Exhibitor_Name);
    formData.append("Company_Name", newExhibitorData.Company_Name);
    formData.append("Company_Email", newExhibitorData.Company_Email);
    formData.append("User_id_Fk", newExhibitorData.User_id_Fk);

    // Filter out files with unsupported extensions
    newExhibitorData.Official_Document.forEach(file => {
      formData.append("Official_Document", file);
    });

    fetch("http://localhost:8000/api/Exhibitor", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json().then((data) => {
            alert("Exhibitor data inserted successfully");
            navigate("/Exhibitor_Show");
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.error || "Error adding Exhibitor");
          });
        }
      })
      .catch((error) => {
        console.error("Error adding Exhibitor:", error);
        alert("Error adding exhibitor data: " + error.message);
      });
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };


  const [userData, setUserData] = useState({ User_Status: "" });

  const changingValue = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
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
          <div className="col-md-12">
            <form id="step-form-horizontal" className="step-form-horizontal">
              {currentStep === 1 && (
                <div>
                  <h4>Account Details</h4>
                  <section>
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <label>User Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Name" name="User_Name" value={newUserData.User_Name} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label>User Email</label>
                          <div className="form-group">
                            <input type="email" className="form-control input-default" placeholder="Enter Your Email" name="User_Email" value={newUserData.User_Email} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label>User Password</label>
                          <div className="form-group">
                            <input type="password" className="form-control input-default" placeholder="Enter Your Password" name="User_Password" value={newUserData.User_Password} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className='col-lg-12'>
                          <label>User Role</label>
                          <select className="form-control input-default" name="User_Role"  onChange={handleUserInputChange} value={userData.User_Role}>
                            <option value="">Select a Role</option>
                            <option value="Attendees">Attendees</option>
                            <option value="Exhibitor">Exhibitor</option>
                          </select>
                        </div>
                        <div className="col-lg-12 row mt-3">
                          <div className="col-7"></div>
                          <button type="button" className="btn btn-light col-2" onClick={handleAddUser}><b>Sign Up</b></button>
                          <div className="col-1"></div>
                         
                          <button className="btn btn-primary col-2" onClick={nextStep} disabled={!userDataInserted}> Next</button>

                        </div>

                      </div>
                    </form>
                  </section>

                </div>
              )}
              {currentStep === 2 && (
                <div>
                  <h4>Your Company Details</h4>
                  <section>
                    <form encType="multipart/form-data">
                      <div className="row">
                        <div className="col-lg-6">
                          <label>Exhibitor Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Exhibitor Name" name="Exhibitor_Name" value={newExhibitorData.Exhibitor_Name} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Company Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Company Name" name="Company_Name" value={newExhibitorData.Company_Name} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Company Email</label>
                          <div className="form-group">
                            <input type="email" className="form-control input-default" placeholder="Enter Your Company Email" name="Company_Email" value={newExhibitorData.Company_Email} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Official Document</label>
                          <div className="form-group">
                            <input type="file" className="form-control input-default" name="Official_Document" multiple onChange={handleFileChange} />
                          </div>
                        </div>

                        <div className="col-lg-12 row">
                          <div className="col-7"></div>
                          <button className="btn btn-light col-2" onClick={prevStep}><b>Previous</b></button>

                          <div className="col-1"></div>
                          <button type="button" className="btn btn-primary col-2" onClick={handleAddExhibitor}>Add Exhibitor</button> {/* Reduced width for Submit button */}

                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exhibitor_Insert;
