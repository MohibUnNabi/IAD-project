import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({
        User_Name: "",
        User_Email: "",
        User_Password: "",
        User_Role: "",
        User_Status: "Pending"
    });

    const [showSignUpButton, setShowSignUpButton] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [newExhibitorData, setNewExhibitorData] = useState({
        Exhibitor_Name: "",
        Company_Name: "",
        Company_Email: "",
        Official_Document: [],
        User_id_Fk: ""
    });
    const [userDataInserted, setUserDataInserted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRoleChange = (e) => {
        const { value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            User_Role: value,
        }));

        if (value === "Attendees") {
            setShowSignUpButton(true);
            setShowNextButton(false);
        } else if (value === "Exhibitor") {
            setShowSignUpButton(false);
            setShowNextButton(true);
        } else {
            setShowSignUpButton(false);
            setShowNextButton(false);
        }
    };

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

                    setNewExhibitorData((prevData) => ({
                        ...prevData,
                        User_id_Fk: lastInsertedId
                    }));

                    if (newUserData.User_Role === "Exhibitor") {
                        setUserDataInserted(true);
                        nextStep();
                    } else {
                        navigate('/');
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

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    return (
        <div className="signup-form">
            <form onSubmit={handleAddUser}>
                <h2>Sign Up</h2>
                {currentStep === 1 && (
                <div>
                  <h4>Account Details</h4>
                  <section>
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
                          <select className="form-control input-default" name="User_Role" onChange={handleRoleChange} value={newUserData.User_Role}>
                            <option value="">Select a Role</option>
                            <option value="Attendees">Attendees</option>
                            <option value="Exhibitor">Exhibitor</option>
                          </select>
                        </div>
                        <div className="col-lg-12 row mt-3">
                          {showSignUpButton && <button type="submit" className="btn btn-light col-12"><b>Sign Up</b></button>}
                          {showNextButton && <button type="button" className="btn btn-primary col-12" onClick={nextStep} disabled={!userDataInserted}>Next</button>}
                        </div>
                    </div>
                  </section>
                </div>
                )}
                {currentStep === 2 && (
                <div>
                  <h4>Your Company Details</h4>
                  <section>
                    <div className="row">
                        <div className="col-lg-6">
                          <label>Exhibitor Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Exhibitor Name" name="Exhibitor_Name" value={newExhibitorData.Exhibitor_Name} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Company Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Company Name" name="Company_Name" value={newExhibitorData.Company_Name} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Company Email</label>
                          <div className="form-group">
                            <input type="email" className="form-control input-default" placeholder="Enter Your Company Email" name="Company_Email" value={newExhibitorData.Company_Email} onChange={handleUserInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label>Official Document</label>
                          <div className="form-group">
                            <input type="file" className="form-control input-default" name="Official_Document" multiple onChange={handleFileChange} />
                          </div>
                        </div>
                        <div className="col-lg-12 row">
                          <button type="button" className="btn btn-light col-2" onClick={prevStep}><b>Previous</b></button>
                          <button type="button" className="btn btn-primary col-2" onClick={handleAddExhibitor}>Add Exhibitor</button>
                        </div>
                    </div>
                  </section>
                </div>
                )}
            </form>
        </div>
    );
}

export default Signup;
