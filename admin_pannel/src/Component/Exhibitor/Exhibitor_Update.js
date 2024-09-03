import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Exhibitor_Edit() {
  const navigate = useNavigate();
  const pid2 = localStorage.getItem('id');
  const exhibitorUrl = `http://localhost:8000/api/Exhibitor/${pid2}`;
  const pid = localStorage.getItem('id');

  const userUrl = `http://localhost:8000/api/User/${pid}`;

  const [exhibitorData, setExhibitorData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(exhibitorUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setExhibitorData(data)})
      .catch((error) => console.error("Error fetching exhibitor details:", error));

    fetch(userUrl)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [exhibitorUrl, userUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExhibitorData((prevData) => ({
      ...prevData,
      exhibitor: {
        ...prevData.exhibitor,
        [name]: value
      }
    }));
  };
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setExhibitorData((prevData) => ({ ...prevData, Official_Document: imageFile }));
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("Exhibitor_Name", exhibitorData.exhibitor.Exhibitor_Name);
    formData.append("Company_Name", exhibitorData.exhibitor.Company_Name);
    formData.append("Company_Email", exhibitorData.exhibitor.Company_Email);
    formData.append("Official_Document", exhibitorData.exhibitor.Official_Document);
    formData.append("User_id_Fk", exhibitorData.exhibitor.User_id_Fk);
    fetch(exhibitorUrl, {
      method: 'PUT',
      body: formData
    })
      .then((res) => res.json())
      .then((updatedExhibitorData) => {
      
        alert("Exhibitor data updated successfully");
        navigate("/Exhibitor_Show");
      })
      .catch((error) => {
        console.error('Error updating exhibitor data:', error);
        alert('Error updating exhibitor data. Please try again.');
      });

    fetch(userUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((updatedUserData) => {
        console.log(updatedUserData);
        alert("User data updated successfully");
        // navigate to appropriate page if needed
      })
      .catch((error) => {
        console.error('Error updating user data:', error);
        alert('Error updating user data. Please try again.');
      });
  };

  if (!exhibitorData || !userData) {
    return <div>Loading...</div>;
  }






  return (
















    <div className="content-body">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">User</h4>
            <p className="text-muted m-b-15 f-s-12">Use the input classes on an <code>.input-default, input-flat, .input-rounded</code> for Default input.</p>
            <div className="basic-form">
              <form encType="multipart/form-data">

              
                <label>User Email</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Email" name="User_Email" value={userData.User_Email} onChange={handleUserInputChange} />
                </div>
            

                <label>Exhibitor Name</label>
                <div className="form-group">
           
                  <input type="text" className="form-control input-default" placeholder="Enter Your Exhibitor Name" name="Exhibitor_Name" value={exhibitorData.exhibitor.Exhibitor_Name} onChange={handleInputChange} />
                </div>
                <label>Company Name</label>
                <div className="form-group">
                  <input type="text" className="form-control input-default" placeholder="Enter Your Company Name" name="Company_Name" value={exhibitorData.exhibitor.Company_Name} onChange={handleInputChange} />
                </div>
                <label>Company Email</label>
                <div className="form-group">
                  <input type="email" className="form-control input-default" placeholder="Enter Your Company Email" name="Company_Email" value={exhibitorData.exhibitor.Company_Email}  />
                </div>

                <div className="form-group">
                  <input type="hidden" className="form-control input-default" placeholder="Enter Your Company Email" name="User_id_Fk" value={exhibitorData.exhibitor.User_id_Fk} onChange={handleInputChange}/>
                </div>
                <label>Official Document</label>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control input-default"
                    placeholder="Enter Your Official Document"
                    onChange={handleImageChange}
                    name="Official_Document"
                  />

                </div>

                <button type="button" class="btn mb-1 btn-primary" onClick={handleClick}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>




  );
}


export default Exhibitor_Edit