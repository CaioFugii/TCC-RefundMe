import React, {
  ComponentPropsWithoutRef,
  ElementType,
  FC,
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "semantic-ui-react";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/lgo-allinvestx.png";

import { Menu } from "./menu";

import { logout } from "../../store/ducks/login/actions";

import { ApplicationState } from "../../models";
// import { login } from "../../store/ducks/login/sagas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const Header: FC<ComponentPropsWithoutRef<ElementType>> = ({ history }) => {
  const dispatch = useDispatch();
  const { data: login } = useSelector((state: ApplicationState) => ({
    ...state.login
  }));

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to="expenses-refunds">
            <img src={Logo} alt="Stark Reembolso" />
          </Link>
        </div>
        {/* <Button className="header-menu-toggle" onClick={toggleMenu}>
          menu
        </Button> */}
          <div className='header-ferramentas'>
              {/*<a className='header-ferramentas-link' onClick={handleClick}>
                  <i className='fas fa-power-off'></i>Logout
              </a>*/}
              <Button
                className="btn"
                onClick={handleClick}
              >
                <FontAwesomeIcon icon={faPowerOff} />
              </Button>
          </div>
      </header>
    </>
  );
};

export { Header };
