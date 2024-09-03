import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Register_Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:8000/api/Registration/${id}`;
  console.log(url);

  const [newUserData, setUserData] = useState(null);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const url1 = 'http://localhost:8000/api/Event';
  const url2 = 'http://localhost:8000/api/Exhibitor';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user details:', error));
  }, [url]);

  useEffect(() => {
    fetch(url1)
      .then((res) => res.json())
      .then((d) => setData1(d))
      .catch((error) => console.error('Error fetching data:', error));

    fetch(url2)
      .then((res) => res.json())
      .then((d) => setData2(d))
      .catch((error) => console.error('Error fetching data:', error));
  }, [url1, url2]);

  if (!newUserData) {
    return <div>Loading...</div>;
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
        console.log(updatedData);
        alert('Data updated successfully');
        navigate('/Register_Show');
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
            <p className="text-muted m-b-15 f-s-12">
              Use the input classes on an <code>.input-default, input-flat, .input-rounded</code> for Default input.
            </p>
            <div className="basic-form">
              <form>
                <label>Event</label>
                <select
                  className="form-control input-default"
                  name="Event_id_Fk"
                  value={newUserData.Event_id_Fk}
                  onChange={handleInputChange}
                >
                  <option value="">Select an Event</option>
                  {data1.map((Event) => (
                    <option key={Event._id} value={Event._id}>
                      {Event.Event_Name}
                    </option>
                  ))}
                </select>
                <br></br>
                <label>Exhibitor Name</label>
                <select
                  className="form-control input-default"
                  name="ExhibitorId"
                  value={newUserData.ExhibitorId}
                  onChange={handleInputChange}
                >
                  <option value="">Select an Exhibitor</option>
                  {data2.map((Exhibitor) => (
                    <option key={Exhibitor._id} value={Exhibitor._id}>
                      {Exhibitor.Exhibitor_Name}
                    </option>
                  ))}
                </select>
                <br></br>

                <label>Booth_Name</label>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control input-default"
                    placeholder="Enter Your Booth_Name"
                    name="Booth_Name"
                    value={newUserData.Booth_Name}
                    onChange={handleInputChange}
                  />
                </div>
                <label>Booth_Count</label>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control input-default"
                    placeholder="Enter Your Booth_Count"
                    name="Booth_Count"
                    value={newUserData.Booth_Count}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="button" className="btn mb-1 btn-primary" onClick={Click}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register_Edit;
