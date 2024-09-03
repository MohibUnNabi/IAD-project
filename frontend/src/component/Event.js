import React, { useEffect, useState } from 'react';



function Event () {
  const [userToken, setUserToken] = useState(localStorage.getItem('User_token'));

  const handleBuyTicket = (eventId) => {
    if (!userToken) {
      alert('You need to login to buy a ticket.');
      window.location.href = `/login`;
    }

 
    window.location.href = `/TicketForm/${eventId}`;
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/frontendEvent')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const renderEvents = () => {
    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
      if (!acc[event.Event_Date]) {
        acc[event.Event_Date] = [];
      }
      acc[event.Event_Date].push(event);
      return acc;
    }, {});

    // Render tabs and event content
    return Object.keys(eventsByDate).map((date, index) => (
      <div key={date} className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} id={`v-pills-${index + 1}`} role="tabpanel">
        {eventsByDate[date].map(event => (
          <div key={event._id} className="speaker-wrap d-flex">
            <div className="img speaker-img" style={{ backgroundImage: `url(http://localhost:8000/${event.Event_Images})` }} />

            <div className="text pl-md-5">
              <span className="time">{event.Event_Time}</span>
              <h2><a href="#">{event.Event_Name}</a></h2>
              <p>{event.Event_Description}</p>
              <h3 className="speaker-name">— <a href="#">Speaker Name</a> <span className="position">
                {event.Guest_Speaker.map((ds, index) => (
                  // Assuming ds is a string
                  <span key={index}>{ds}</span>
                ))}
              </span></h3>
            
              <button onClick={() => handleBuyTicket(event._id)} className="btn btn-primary">Buy ticket</button>


            </div>
          </div>
        ))}
      </div>
    ));
  };

  const renderTabs = () => {
    // Extract unique dates for tabs
    const uniqueDates = [...new Set(events.map(event => event.Event_Date))];

    return uniqueDates.map((date, index) => (
      <a key={date} className={`nav-link ${index === 0 ? 'active' : ''}`} id={`v-pills-${index + 1}-tab`} data-toggle="pill" href={`#v-pills-${index + 1}`} role="tab">
        {events
          .filter(event => event.Event_Date === date)
          .map(event => (
            <span key={event._id} className='eventName'>{event.Event_Name}</span>
          ))} <span>{date}</span>
      </a>
    ));
  };

  return (
    <>



<br></br>
      <section className=" bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 text-center heading-section">
              <span className="subheading">Schedule</span>
              <h2 className="mb-4"><span>Event</span> Schedule</h2>
            </div>
          </div>
          <div className="ftco-search">
            <div className="row">
              <div className="col-md-12 nav-link-wrap">
                <div className="nav nav-pills d-flex text-center" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  {renderTabs()}
                </div>
              </div>
              <div className="col-md-12 tab-wrap">
                <div className="tab-content" id="v-pills-tabContent">
                  {renderEvents()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Event;
