import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate ,} from "react-router-dom";
import { useState,useEffect } from 'react';

function User_Edit() {
    const navigate=useNavigate();
    const { id } = useParams();
    const url = `http://localhost:8000/api/User/${id}`;
    console.log(url)
    const [userData, setUserData] = useState(null);
 
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user details:", error));
    }, [url]);
  
    if (!userData) {
      return 
      
      <div >Loading...</div>;
    }
    const changingValue = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
      const Click = () => {
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((updatedData) => {
              console.log(updatedData)
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
<div className="col-lg-12">
  <div className="card">
    <div className="card-body">
      <h4 className="card-title">User</h4>
      <p className="text-muted m-b-15 f-s-12">Use the input classes on an <code>.input-default, input-flat, .input-rounded</code> for Default input.</p>
      <div className="basic-form">
        <form>
            <label>User Name</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Name" name="User_Name" value={userData.User_Name} onChange={changingValue} />
          </div>
          <label>User Email</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Email" name="User_Email" value={userData.User_Email} onChange={changingValue} />
          </div>
          <label>User Password</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Password" name="User_Password" value={userData.User_Password} onChange={changingValue} />
          </div>
          <label>User Role</label>
          <div className="form-group">
            <input type="text" className="form-control input-default"  placeholder="Enter Your Role" name="User_Role" value={userData.User_Role} onChange={changingValue} />
          </div>
          <button type="button" class="btn mb-1 btn-primary" onClick={Click}>Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>




      );
}


export default User_Edit