import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditExhibitor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = http://localhost:8000/api/exhibitor/${id};
  const [exhibitor, setExhibitor] = useState(null);
  const [exhibitor, setExhibitor] = useState({
    User_FK: '',
    FullName: '',
    Job_Title: '',
    Company_Name: '',
    Company_Address: '',
    Profile: {
      description: '',
      product: '',
      email: '',
      contact: '',
      website: '',
    },
    Staff: [],
  });
  
  const [previewLogoUrl, setPreviewLogoUrl] = useState(null);
  const [previewDocumentUrl, setPreviewDocumentUrl] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setExhibitor(data))
      .catch(error => console.error('Error fetching exhibitor details:', error));
  }, [url]);

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((d) => setUsers(d));
  }, []);

  if (!exhibitor) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("Profile.")) {
      const profileField = name.split(".")[1];
      setExhibitor(prevData => ({
        ...prevData,
        Profile: {
          ...prevData.Profile,
          [profileField]: value
        }
      }));
    } else {
      setExhibitor(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (field === "logo") {
          setPreviewLogoUrl(event.target.result);
        } else if (field === "Document") {
          setPreviewDocumentUrl(event.target.result);
        }
      };
      reader.readAsDataURL(file);
      setExhibitor(prevData => ({
        ...prevData,
        [field]: file
      }));
    }
  };

  const handleStaffChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStaff = exhibitor.Staff.map((staff, i) => i === index ? { ...staff, [name]: value } : staff);
    setExhibitor(prevData => ({
      ...prevData,
      Staff: updatedStaff
    }));
  };

  const handleAddStaff = () => {
    setExhibitor(prevData => ({
      ...prevData,
      Staff: [...prevData.Staff, { name: "", email: "", contact: "" }]
    }));
  };

  const handleRemoveStaff = (index) => {
    const updatedStaff = exhibitor.Staff.filter((_, i) => i !== index);
    setExhibitor(prevData => ({
      ...prevData,
      Staff: updatedStaff
    }));
  };

  const handleUpdateExhibitor = async () => {
    try {
      const formData = new FormData();
      formData.append("User_FK", exhibitor.User_FK);
      formData.append("FullName", exhibitor.FullName);
      formData.append("Job_Title", exhibitor.Job_Title);
      formData.append("Company_Name", exhibitor.Company_Name);
      formData.append("Company_Address", exhibitor.Company_Address);
      formData.append("Profile", JSON.stringify(exhibitor.Profile));
      formData.append("Staff", JSON.stringify(exhibitor.Staff));
      if (exhibitor.Document) formData.append("Document", exhibitor.Document);
      if (exhibitor.logo) formData.append("logo", exhibitor.logo);

      const response = await fetch(url, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        alert('Exhibitor updated successfully');
        navigate("/viewexhibitor");
      } else {
        alert('Error occurred while updating exhibitor');
      }
    } catch (error) {
      console.error('Error updating exhibitor:', error);
      alert('Error occurred while updating exhibitor');
    }
  };

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="row justify-content-between align-items-center mb-3">
          <div className="col-4">
            <h1 className="mb-0">Edit Exhibitor</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <form encType="multipart/form-data">

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">User:</h4>
                      </div>
                      <div className="card-body p-2">
                        <select
                          className="form-control"
                          name="User_FK"
                          value={exhibitor.User_FK}
                          onChange={handleInputChange}
                        >
                          <option value="">Select User</option>
                          {users.map((user) => (
                            <option key={user._id} value={user._id}>{user.Username}</option>
                          ))}
                        </select>
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Full Name:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Full Name"
                          name="FullName"
                          value={exhibitor.FullName}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Job Title:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Job Title"
                          name="Job_Title"
                          value={exhibitor.Job_Title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Company Name:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Company Name"
                          name="Company_Name"
                          value={exhibitor.Company_Name}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Business Address:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Business Address"
                          name="Company_Address"
                          value={exhibitor.Company_Address}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Profile Details:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          name="Profile.description"
                          value={exhibitor.Profile.description}
                          onChange={handleInputChange}
                        />
                          description
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Product"
                          name="Profile.product"
                          value={exhibitor.Profile.product}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="Profile.email"
                          value={exhibitor.Profile.email}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact"
                          name="Profile.contact"
                          value={exhibitor.Profile.contact}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Website"
                          name="Profile.website"
                          value={exhibitor.Profile.website}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Upload Business Documents:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="file"
                          className="form-control"
                          name="Document"
                          onChange={(e) => handleFileChange(e, "Document")}
                        />
                        {previewDocumentUrl && (
                          <img src={previewDocumentUrl} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
                        )}
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Upload Business Logo:</h4>
                      </div>
                      <div className="card-body p-2">
                        <input
                          type="file"
                          className="form-control"
                          name="logo"
                          onChange={(e) => handleFileChange(e, "logo")}
                        />
                        {previewLogoUrl && (
                          <img src={previewLogoUrl} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
                        )}
                      </div>

                      <div className="card-header p-2">
                        <h4 className="card-title mb-0">Add Staff:</h4>
                      </div>
                      <div className="card-body p-2">
                        {exhibitor.Staff.map((staff, index) => (
                          <div key={index} className="row">
                            <div className="col-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                value={staff.name}
                                onChange={(e) => handleStaffChange(e, index)}
                              />
                            </div>
                            <div className="col-4">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="email"
                                value={staff.email}
                                onChange={(e) => handleStaffChange(e, index)}
                              />
                            </div>
                            <div className="col-3">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Contact"
                                name="contact"
                                value={staff.contact}
                                onChange={(e) => handleStaffChange(e, index)}
                              />
                            </div>
                            <div className="col-1">
                              <button type="button" className="btn btn-danger" onClick={() => handleRemoveStaff(index)}>Remove</button>
                            </div>
                          </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={handleAddStaff}>Add Staff</button>
                      </div>

                      <div className="card-body p-2">
                        <button type="button" className="btn btn-primary" onClick={handleUpdateExhibitor}>Update Exhibitor</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};