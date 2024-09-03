import React from 'react'
import { useParams } from "react-router-dom";
import { useNavigate ,} from "react-router-dom";
import { useState,useEffect } from 'react';

function Category_Edit() {
    const navigate=useNavigate();
    const { id } = useParams();
    const url = `http://localhost:8000/api/Category/${id}`;
    console.log(url)
    const [newUserData, setUserData] = useState(null);
 
    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user details:", error));
    }, [url]);
  
    if (!newUserData) {
      return 
      
      <div >Loading...</div>;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
      };
      const Click = () => {
        fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserData),
          })
            .then((res) => res.json())
            .then((updatedData) => {
              console.log(updatedData)
                alert("Data updated successfully");
         navigate("/Category_Show");
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
            <h4 className="card-title">Category</h4>
            <p className="text-muted m-b-15 f-s-12"><code>Category Detail Edit Here</code></p>
            <div className="basic-form">
              <form>
                <label>Category Name</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Category Name" name="Category_Name" value={newUserData.Category_Name} onChange={handleInputChange} />
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


export default Category_Edit