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
      // State for exhibitor data
      const [newExhibitorData, setNewExhibitorData] = useState({
        Exhibitor_Name: "",
        Company_Name: "",
        Company_Email: "",
        Official_Document: [],
        User_id_Fk: ""
      });
    
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
  
    
      // Handle form submission for exhibitor data


      const handleAddUserAndExhibitor = async (e) => {
        e.preventDefault();

        try {
            const userResponse = await fetch("http://localhost:8000/api/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserData),
            });

            if (userResponse.status !== 201) {
                const errorData = await userResponse.json();
                throw new Error(errorData.error || "Error adding user");
            }

            const userData = await userResponse.json();
            const lastInsertedId = userData.id;

            setNewExhibitorData((prevData) => ({
                ...prevData,
                User_id_Fk: lastInsertedId,
            }));

            if (newUserData.User_Role === "Exhibitor") {
                const formData = new FormData();
                formData.append("Exhibitor_Name", newExhibitorData.Exhibitor_Name);
                formData.append("Company_Name", newExhibitorData.Company_Name);
                formData.append("Company_Email", newExhibitorData.Company_Email);
                formData.append("User_id_Fk", lastInsertedId);

                newExhibitorData.Official_Document.forEach(file => {
                    formData.append("Official_Document", file);
                });

                const exhibitorResponse = await fetch("http://localhost:8000/api/Exhibitor", {
                    method: "POST",
                    body: formData,
                });

                if (exhibitorResponse.status !== 201) {
                    const errorData = await exhibitorResponse.json();
                    throw new Error(errorData.error || "Error adding exhibitor");
                }

                alert("Exhibitor data inserted successfully");
                navigate("/");
            } else {
                alert("User data inserted successfully");
                navigate('/');
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error: " + error.message);
        }
    };

      const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
      };
    
      const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
      };
    
    

    

    

    return (
        <div className="signup-form">
            <form >
                <h2>Sign Up</h2>
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
                          <select className="form-control input-default" name="User_Role"  onChange={handleRoleChange} value={newUserData.User_Role}>
                            <option value="">Select a Role</option>
                            <option value="Attendees">Attendees</option>
                            <option value="Exhibitor">Exhibitor</option>
                          </select>
                        </div>
                        <div className="col-lg-12 row mt-3">
                         
                          {showSignUpButton && <button type="button" className="btn btn-light col-12" onClick={handleAddUserAndExhibitor}><b>Sign Up</b></button>}
                          {showNextButton && <button className="btn btn-primary col-12" onClick={nextStep} > Next</button>}
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
                        <div className="col-lg-12">
                          <label>Exhibitor Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Exhibitor Name" name="Exhibitor_Name" value={newExhibitorData.Exhibitor_Name} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label>Company Name</label>
                          <div className="form-group">
                            <input type="text" className="form-control input-default" placeholder="Enter Your Company Name" name="Company_Name" value={newExhibitorData.Company_Name} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label>Company Email</label>
                          <div className="form-group">
                            <input type="email" className="form-control input-default" placeholder="Enter Your Company Email" name="Company_Email" value={newExhibitorData.Company_Email} onChange={handleExhibitorInputChange} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <label>Official Document</label>
                          <div className="form-group">
                            <input type="file" className="form-control input-default" name="Official_Document" multiple onChange={handleFileChange} />
                          </div>
                        </div>

                        <div className="col-lg-12 row">
                         
                          <button className="btn btn-light col-5" onClick={prevStep}><b>Previous</b></button>

                          <div className="col-2"></div>
                          <button type="button" className="btn btn-primary col-5" onClick={handleAddUserAndExhibitor}  >Add Exhibitor</button> {/* Reduced width for Submit button */}

                        </div>
                      </div>
                    </form>
                  </section>
                </div>
              )}
           
           
           
                <div className="hint-text">
                    Already have an account? <a href="/login">Login here</a>
                </div>
            </form>
        </div>
    );
}

export default Signup;
