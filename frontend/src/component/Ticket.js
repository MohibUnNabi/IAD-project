import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
const TicketForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `http://localhost:8000/api/Event/${id}`;
  const loginid = localStorage.getItem('id');
  const userurl = `http://localhost:8000/api/User/${loginid}`;

  const [newUserData, setUserData] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [url]);

  useEffect(() => {
    fetch(userurl)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userurl]);

  const [formData, setFormData] = useState({
    Ticket_Price: '',
    Event_id_Fk: id,
    User_id_Fk: loginid
  });

  useEffect(() => {
    if (event) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Ticket_Price: event.Ticket_Price || '',
      }));
    }
  }, [event]);

  useEffect(() => {
    if (newUserData) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        User_id_Fk: newUserData._id || '',
      }));
    }
  }, [newUserData]);

  const handleSubmit = async e => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.setFont('times', 'bold');
    doc.setFontSize(22);
    doc.text('Event Ticket', 105, 20, { align: 'center' });
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.text(`Event Name: ${event.Event_Name}`, 20, 40);
    doc.text(`User Name: ${newUserData.User_Name}`, 20, 50);
    doc.text(`Ticket Price: ${formData.Ticket_Price}`, 20, 60);

    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 80);


    const pdfBlob = doc.output('blob');
    
    try {
      const data = new FormData();
      data.append('Event_id_Fk', formData.Event_id_Fk);
      data.append('User_id_Fk', formData.User_id_Fk);
      data.append('Ticket_Price', formData.Ticket_Price);
      data.append('Ticket_Quantity', formData.Ticket_Quantity);
      data.append('ticket', pdfBlob, 'ticket.pdf');
  
 
      const response = await fetch('http://localhost:8000/api/Ticket', {
        method: 'POST',
        body: data,
      });

 

      alert("Ticket Send To your Email");
      navigate("/Userdashboard");
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!newUserData || !event) {
    return <p>Loading...</p>;
  }

  return (



    
    <div className="Container" style={{}}>

      
      <div className=' row justify-content-center'>
     <div className='container' style={{width:500}}>
     <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="ticketPrice" className="form-label">Ticket Price</label>
          <input
            type="text"
            className="form-control"
            id="ticketPrice"
            placeholder="Enter ticket price"
            name="Ticket_Price"
            value={formData.Ticket_Price}
            onChange={handleChange}
            disabled
          />
        </div>









        <div className="mb-3">
          <label htmlFor="eventId" className="form-label">Event ID</label>
          <input
            type="text"
            className="form-control"
            id="eventId"
            placeholder="Enter event ID"
            name="Event_id_Fk"
            value={event.Event_Name}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="mb-3">
          <label htmlFor="userId" className="form-label">User ID</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            placeholder="Enter user ID"
            name="User_id_Fk"
            value={newUserData.User_Name}
            onChange={handleChange}
            disabled
          />
        </div>
        
        <div className="mb-3">
        <label htmlFor="ticketPrice" className="form-label">Ticket Quantity</label>
          <input
            type="text"
            className="form-control"
            id="ticketPrice"
            placeholder="Enter ticket Quantity"
            name="Ticket_Quantity"
            value={formData.Ticket_Quantity}
            onChange={handleChange}
          required
          />
        </div>




<center>
          <button type="submit" className="btn btn-primary mb-3" style={{width:250}}>Submit</button>
</center>
      </form>

     </div>
      </div>
    </div>
  );
};

export default TicketForm;
