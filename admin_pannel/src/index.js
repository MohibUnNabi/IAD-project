import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import Dashboard from './Component/Dashboard';





import User_Show from './Component/User/User_Show';
import User_Insert from './Component/User/User_Insert';
import User_Edit from './Component/User/User_Update';
import Login from './Component/User/Login';
import Logout from './Component/User/Logout';
import PasswordChange from './Component/User/Change-Password';

import Previous_Event from './Component/Event/Previous_Event';
import Event_Show from './Component/Event/Event_Show';
import Event_Insert from './Component/Event/Event_Insert';
import Event_Edit from './Component/Event/Event_Update';
import My_Event from './Component/Event/My_Event';


import Category_Show from './Component/Category/Category_Show';
import Category_Insert from './Component/Category/Category_Insert';
import Category_Edit from './Component/Category/Category_Update';




import Ticket_Show from './Component/Ticket/Ticket_Show';

import Exhibitor_Show from './Component/Exhibitor/Exhibitor_Show';
import Exhibitor_Insert from './Component/Exhibitor/Exhibitor_Insert';
import Exhibitor_Edit from './Component/Exhibitor/Exhibitor_Update';




import Register_Show from './Component/Register/Register_Show';
import Register_Insert from './Component/Register/Register_Insert';
import Register_Edit from './Component/Register/Register_Update';



import Booth_Show from './Component/BoothManagement/Booth_Show';
import Booth_Insert from './Component/BoothManagement/Booth_Insert';
import Booth_Edit from './Component/BoothManagement/Booth_Update';

import Contact_Show from './Component/User/Contact_Show';

import Nav from './Component/layout/Nav';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Dasboard from './Component/Dashboard';



const token=localStorage.getItem('User_token')

const admintoken=localStorage.getItem('Admin_token')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
 

      <Routes>

      <Route path='/'  element={admintoken!=null ? (<Dasboard />):(<Navigate to="/login" replace/>)}/>
   
    
        <Route path='/User_Show' element={admintoken!=null ? (<User_Show />):(<Navigate to="/login" replace/>)}/>
      <Route path='/User_Edit/:id' element={<User_Edit/>}/>
      <Route path='/User_Insert' element={<User_Insert/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Logout' element={<Logout/>}/>
      
      <Route path='/password-change' element={<PasswordChange/>}/>
      <Route path='/Contact_Show' element={<Contact_Show/>}/>
      <Route path='/Event_Show' element={<Event_Show />}/>
      <Route path='/Previous_Event' element={<Previous_Event />}/>
      <Route path='/Event_Edit/:id' element={<Event_Edit/>}/>
      <Route path='/Event_Insert'  element={admintoken!=null ? (<Event_Insert />):(<Navigate to="/login" replace/>)}/>
      <Route path='/My_Event' element={<My_Event />}/>
      <Route path='/Category_Show'  element={admintoken!=null ? (<Category_Show />):(<Navigate to="/login" replace/>)}/>
      <Route path='/Category_Edit/:id'  element={admintoken!=null ? (<Category_Edit />):(<Navigate to="/login" replace/>)}/>
      <Route path='/Category_Insert'  element={admintoken!=null ? (<Category_Insert />):(<Navigate to="/login" replace/>)}/>

      <Route path='/a' element={<a />}/>
      <Route path='/Exhibitor_Show' element={admintoken!=null ? (<Exhibitor_Show />):(<Navigate to="/login" replace/>)}/>
      <Route path='/Exhibitor_Edit/' element={<Exhibitor_Edit/>}/>
      <Route path='/Exhibitor_Insert' element={<Exhibitor_Insert/>}/>

      
      <Route path='/Register_Show/:id' element={<Register_Show />}/>
      <Route path='/Register_Edit/:id' element={<Register_Edit/>}/>
      <Route path='/Register_Insert/:id' element={<Register_Insert/>}/>


      
      <Route path='/Booth_Show' element={<Booth_Show />}/>
      <Route path='/Booth_Edit/:id' element={<Booth_Edit/>}/>
      <Route path='/Booth_Insert' element={<Booth_Insert/>}/>


      <Route path='/Ticket_Show'  element={admintoken!=null ? (<Ticket_Show />):(<Navigate to="/login" replace/>)}/>
      </Routes>


  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
