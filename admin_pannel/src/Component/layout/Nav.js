import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="nk-sidebar">
      <div className="nk-nav-scroll">
        <ul className="metismenu" id="menu">
          <li className="nav-label">Dashboard</li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Dashboard</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/index.html">Home 1</NavLink></li>
              {/* <li><NavLink to="/index-2.html">Home 2</NavLink></li> */}
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Event</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/Event_Insert">Event Insert</NavLink></li>
              <li><NavLink to="/Event_Show">Event Show</NavLink></li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">User</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/User_Insert">User Insert</NavLink></li>
              <li><NavLink to="/User_Show">User Show</NavLink></li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Exhibitor</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/Exhibitor_Insert">Exhibitor Insert</NavLink></li>
              <li><NavLink to="/Exhibitor_Show">Exhibitor Show</NavLink></li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Category</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/Category_Insert">Category Insert</NavLink></li>
              <li><NavLink to="/Category_Show">Category Show</NavLink></li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Register</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/Register_Insert">Register Insert</NavLink></li>
              <li><NavLink to="/Register_Show">Register Show</NavLink></li>
            </ul>
          </li>
          <li>
            <a className="has-arrow" href="javascript:void(0)" aria-expanded="false">
              <i className="icon-speedometer menu-icon" /><span className="nav-text">Booth Management</span>
            </a>
            <ul aria-expanded="false">
              <li><NavLink to="/Booth_Insert">Booth Insert</NavLink></li>
              <li><NavLink to="/Booth_Show">Booth Show</NavLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
