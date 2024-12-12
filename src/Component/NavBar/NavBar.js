import React from "react";
import './NavBar.css'
import {Link} from "react-scroll"
const NavBar= () => {
    return(
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="#">SCADA System Project</Link></li>
                <li><Link to="#">Web dashboard</Link></li>
                <li><Link to="#">Home</Link></li>
            </ul>
        </nav>
    )
};

export default NavBar;