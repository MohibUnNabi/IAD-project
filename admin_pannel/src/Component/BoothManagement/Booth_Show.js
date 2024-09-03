import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import $ from 'jquery';

const Booth_Show = () => {
  const url = "http://localhost:8000/api/BoothManagement";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      initializeDataTable();
    }
  }, [loading, error]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const d = await res.json();
      setData(d);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const initializeDataTable = () => {
    $('#myTable').DataTable({
      responsive: true,
      destroy: true, // Ensure DataTable is destroyed and reinitialized
    });
  };

  const deletedata = async (id) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error('Failed to delete user');
      }
      alert("Data deleted successfully");
      fetchInfo();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="content-body">
        <div>Error: {error.message}</div>
      </div>
    );
  }

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
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Data Table</h4>
                <div className="table-responsive">
                  <table id="myTable" className="display">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th className="hidden-phone">Event Name</th>
                        <th className="hidden-phone">Booth Reserved</th>
                        <th className="hidden-phone">User Name</th>
                        <th className="hidden-phone">Edit</th>
                        <th className="hidden-phone">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((dataObj, index) => (
                        <tr key={index}>
                          <td>{dataObj._id}</td>
                          <td>{dataObj.Event_id_Fk ? dataObj.Event_id_Fk.Event_Name : 'No Event Name'}</td>
                          <td>{dataObj.Booth_Reserved}</td>
                          <td>{dataObj.UserId ? dataObj.UserId.User_Name : 'No User Name'}</td>
                          <td>
                            <Link to={`/Booth_Edit/${dataObj._id}`} className="text-info">
                              <i className="bi bi-pencil" style={{ fontSize: '1.5rem' }}></i>
                            </Link>
                          </td>
                          <td>
                            <button onClick={() => deletedata(dataObj._id)} className="btn btn-link p-0 text-danger border-0">
                              <i className="bi bi-trash" style={{ fontSize: '1.5rem' }}></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booth_Show;
