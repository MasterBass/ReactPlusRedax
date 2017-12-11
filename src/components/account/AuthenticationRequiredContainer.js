import React, {PropTypes}  from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import * as authActions from '../../actions/authenticationActions';
import {bindActionCreators} from 'redux';

class AuthenticationRequiredContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

    if (!this.props.isLoggedIn) {
      this.props.actions.setRedirectUrl(this.props.currentUrl);
      browserHistory.replace("/login");
    } else if(this.props.route.role) {
      const roles = this.props.route.role .split(', ');
      if(!roles.includes(this.props.role)) {
        this.props.actions.setRedirectUrl(this.props.currentUrl);
        browserHistory.replace("/login");
      }
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div>
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

AuthenticationRequiredContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  currentUrl: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.authentication.loggedIn,
    redirectUrl: state.authentication.redirectUrl,
    role: state.authentication.role,
    currentUrl: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationRequiredContainer);
