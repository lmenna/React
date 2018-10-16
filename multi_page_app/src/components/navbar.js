import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';

const Navbar = (props) => {
  // Set up a redirect to the About page after two seconds as an example of programatic redirect.
  // For this component to get the props object import withRouter
  // setTimeout(() => {
  //   props.history.push('/about');
  // }, 2000);
  return(
    <nav className="nav-wrapper red darken-3">
      <div className="container">
      <a className="brand-logo">The Brand to watch</a>
      <ul className="right">
        <li><Link to="/">Home</Link></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>
      </div>
      </nav>
  )
}

// Wrap the Navbar withRouter to gain access to the Router props
export default withRouter(Navbar);
