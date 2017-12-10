import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import LoginPage from './components/account/LoginPage';
import RegisterPage from './components/account/RegisterPage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage';
import AuthenticationRequired from './components/account/AuthenticationRequiredContainer';
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route component={AuthenticationRequired}>
      <Route path="courses" component={CoursesPage} />
      <Route path="course" component={ManageCoursePage} />
      <Route path="course/:id" component={ManageCoursePage} />
    </Route>
    <Route path="about" component={AboutPage} />
  </Route>
);
