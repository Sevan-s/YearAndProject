import React from "react";
import { Link } from 'react-router-dom';
import "../css/NavBar.css"

export default function Navbar() {
  return (
    <div>
      <nav>
        <Link className="itemsTitle" to="/">OtakuBoard</Link>
        <div className="list">
          <Link className="items" to="/home">Home</Link>
          <Link className="items" to="/Service1">Youtube Service</Link>
          <Link className="items" to="/Service2">Manga Service</Link>
          <Link className="items" to="/Service3">Traduction Service</Link>
        </div>
        <Link className="itemsSignOut" to="/disconnect">Sign out</Link>
      </nav>
    </div>
  )
}