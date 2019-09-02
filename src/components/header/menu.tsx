import React from "react";
import { Link } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <nav className="nav is-active">
      <div className="nav-wrapper">
        <div className="menu">
          <ul className="menu-list">
            {/* <li className="menu-list-item">
              <Link to="/dashboard" className="menu-list-item-link">
                <i className="fas fa-tachometer-alt" />
                <span className="menu-list-item-text">Dashboard</span>
              </Link>
            </li> */}
            {/* <li className="menu-list-item">
              <Link to="/deposit-withdraw" className="menu-list-item-link">
                <i className="fas fa-hand-holding-usd" />
                <span className="menu-list-item-text">
                  Deposit and Withdrawal
                </span>
              </Link>
            </li> */}
            {/* <li className="menu-list-item">
              <Link to="/my-extract" className="menu-list-item-link">
                <i className="fas fa-history" />
                <span className="menu-list-item-text">My extract</span>
              </Link>
            </li> */}
            {/* <li className="menu-list-item">
              <Link to="/account-activity" className="menu-list-item-link">
                <i className="fas fa-shield-alt" />
                <span className="menu-list-item-text">Safety</span>
              </Link>
            </li> */}
            {/* <li className="menu-list-item">
              <Link to="/device-activity" className="menu-list-item-link">
                <i className="fas fa-mobile-alt" />
                <span className="menu-list-item-text">Devices</span>
              </Link>
            </li> */}
            {/* <li className="menu-list-item">
              <Link to="/contact" className="menu-list-item-link">
                <i className="far fa-envelope" />
                <span className="menu-list-item-text">Contact</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Menu };
