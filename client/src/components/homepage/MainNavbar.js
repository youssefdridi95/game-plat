import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import "./MainNavbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

function MainNavbar({ token, user, logout }) {

  return (
      <div className="appbar">
        <div className="appbar-content">
        <Link className="petbox" to="/">
        {/* <img className="btMainLogo" data-hw="2.1111111111111" src="https://i.ibb.co/nwtGbV4/logo-home-02.png" alt="Buddy"/> */}
          {/* <span className="home">
              Petbox
              </span> */}
            </Link>
          {/* <div className="navbar-links">
          {user.type==="admin"&&
            <Link className="link" to="/admin"><p>
              Dashboard
              </p></Link>}
            <Link className="link" to="/itemshop"><p>
              Nos produits
              </p></Link>
            <Link className="link" to="/petshop"><p>
              Animalerie
              </p></Link>
            <Link className="link" to="/posts"><p>
            Adoption
              </p> </Link>
          </div> */}
          <div className="right-navbar" >
            {token ? (<div>
              <Link className="navbar-profile" to="/profile">
                <img src={user?user.avatar:""} height="100%" width="auto" alt="img error"/><Badge badgeContent={17} color="secondary"></Badge>
                <p className="navbar-name">{user?user.name:""}</p>
                </Link>
                <div className="signup-signin">
                  <Link className="navbar-buttons disconnect" onClick={logout} to="/"><p>
                  Se déconnecter
              </p>
                  </Link>
              </div>
              </div>
            ) : (
              <div className="signup-signin">
                <Link className="navbar-buttons registerlink" to="/register"><p className="register">
                S'inscrire
              </p>
                </Link>
                <Link className="navbar-buttons connectlink" to="/login"><p className="connect">
                Se connecter
              </p>
                </Link>
              </div>
            )}
          </div>
          </div>

      </div>
      )
  
}

MainNavbar.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  token: state.auth.token,
  user: state.auth.user
});
export default connect(mapStateToProps, { MainNavbar, logout })(MainNavbar);
