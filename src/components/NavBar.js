import React, { Component } from 'react';

class NavBar extends Component {

  // put all your React functions here


  render() {
    return (

        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Ray Bangs    <span className="smallFont">(courtesy of HarlemCrypto)</span>
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-node d-sm-block">
              <small className="text-white"><span id="account">Account: {this.props.account}</span></small>
            </li>
            <li className="nav-item text-nowrap d-none d-sm-node d-sm-block">
              <small className="text-white"><span id="account">Network: {this.props.network}</span></small>
            </li>
          </ul>
        </nav>
    );
  }
}

export default NavBar;
