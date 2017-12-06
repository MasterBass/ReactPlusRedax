import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import initialState from '../reducers/initialState';
import * as authActions from '../actions/authenticationActions';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.logOut = this.logOut.bind(this);
  }


  componentDidUpdate(prevProps) {
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
    // const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;



    if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
      this.props.filterActions.applyRepairsFilters(initialState.filters);
    }
  }

  logOut(event) {
    event.preventDefault();
    this.props.actions.logOut();
    browserHistory.push('/');
  }

  render() {
    return (
      <div className="container-fluid">
        <Header
          loading={this.props.loading}
          isLoggedIn={this.props.isLoggedIn}
          onLogOut={this.logOut} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    isLoggedIn: PropTypes.bool.isRequired,
    redirectUrl: PropTypes.string.isRequired,
    isManager: PropTypes.bool.isRequired
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
