import React from 'react';
import { Link } from 'react-router-dom';
import geekoss from '../img/geekoss-logo-sm.png';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="Nav-container">
      <div>
        <div className="Nav-logo">
          <Link to="/admin">
            <img src={geekoss} className="Img-logo" alt="Geekoss" />
          </Link>
        </div>
        <ul>
          <Link to="/admin/admins">
            <li className="brand-interface">
              <span className="fas fa-users-cog" />
              Admin
            </li>
          </Link>
          <Link to="/admin/users">
            <li className="brand-interface">
              <span className="fas fa-users" />
              Utilisateurs
            </li>
          </Link>
          <Link to="/admin/offers">
            <li className="brand-interface">
              <span className="fas fa-bullhorn" />
              Annonces
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
