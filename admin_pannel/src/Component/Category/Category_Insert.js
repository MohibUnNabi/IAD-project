import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Corrected import statement to match the file name
function Category_Insert() {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({

    Category_Name: "",

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Click = () => {
    fetch("http://localhost:8000/api/Category", {
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
            navigate("/Category_Show");
          });
        } else {
          return res.json().then((data) => {
            throw new Error(data.error || "Error adding Category");
          });
        }
      })
      .catch((error) => console.error("Error adding User:", error));
  };

  return (





    <>
      <div className="content-body">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Category</h4>
              <p className="text-muted m-b-15 f-s-12">
            Enter the category details below. 
          </p>
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

    </>
  );
}

export default Category_Insert;
