import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, name, isLoggedIn, onLogOut, role}) => {
  return (
    <div>
      <nav>
        <IndexLink to="/" activeClassName="active">Home</IndexLink>
        {" | "}
        {role == "admin" && <Link to="/courses" activeClassName="active">Courses</Link>}
        {role == "user" && <Link to="/courses/all" activeClassName="active">Courses</Link>}
        {(role == "user" || role == "admin") && " | "}
        <Link to="/about" activeClassName="active">About</Link>
        {loading && <LoadingDots interval={100} dots={20}/>}
      </nav>
      <div className="log-in-out">
        {isLoggedIn && <span>Welcome,&nbsp;{name}</span>}
        {isLoggedIn && <br></br>}
        {!isLoggedIn && <Link to="/login" activeClassName="hide">LogIn</Link>}
        {isLoggedIn && <a href="#" onClick={onLogOut}>Log out</a>}
      </div>
      <div className="clear"/>
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string,
  role: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogOut: PropTypes.func.isRequired
};

export default Header;
