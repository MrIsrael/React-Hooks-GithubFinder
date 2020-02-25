import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';  // al usar <Link> en vez de <a>, no se resetea el state de los componentes,
                                          // al dar clic en un link a otra página
const Navbar = ({ title, icon }) => {
  return(
    <nav className="navbar bg-primary">
      <h3>
        <i className={ icon } /> { title }
      </h3>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'GitHub Finder',
  icon: 'fab fa-github'
};  // Estos defaultProps son los props por defecto para el componente Navbar, si no
    // se le pasa ninguno desde otro componente parent (Como App.js).

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default Navbar;

// Un código de un componente es más claro y corto si se construye como un
// functional component, en vez de un class component.