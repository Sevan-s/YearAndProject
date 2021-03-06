import React from "react";
import { Link } from 'react-router-dom';
import "../css/NavBar.css"

export default function Navbar() {
  return (
    <div>
      <nav>
        <Link className="itemsTitle" to="/">Digital Widget Service</Link>
        <div className="list">
          <Link className="items" to="/home">Home</Link>
          <Link className="items" to="/config">Config</Link>
          <Link className="items" to="/settings">Settings</Link>
        </div>
        <Link className="itemsSignOut" to="/disconnect">Sign out</Link>
      </nav>
    </div>
  )
}