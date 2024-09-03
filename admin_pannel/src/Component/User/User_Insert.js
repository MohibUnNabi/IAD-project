import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Corrected import statement to match the file name
function User_Insert() {
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({
        User_Name: "",
        User_Email: "",
        User_Password: "",
        User_Role: "",
        User_Status: "Pending"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddUser = () => {
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
                  alert("Data Inserted successfully");
                  navigate("/User_Show");
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
            <label>User Name</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Name" name="User_Name" value={newUserData.User_Name} onChange={handleInputChange} />
          </div>
          <label>User Email</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Email" name="User_Email" value={newUserData.User_Email} onChange={handleInputChange} />
          </div>
          <label>User Password</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Password" name="User_Password" value={newUserData.User_Password} onChange={handleInputChange} />
          </div>
          <label>User Role</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Role" name="User_Role" value={newUserData.User_Role} onChange={handleInputChange} />
          </div>
          <button type="button" class="btn mb-1 btn-primary" onClick={handleAddUser}>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>

</>
    );
}

export default User_Insert;
