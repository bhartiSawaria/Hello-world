import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import * as actionCreators from './actions/index';
import HomePage from './components/HomePage/HomePage';
import AddPost from './components/AddPost/AddPost';
import TextPost from './components/AddPost/TextPost/TextPost';
import ImagePost from './components/AddPost/ImagePost/ImagePost';

class App extends Component{

  componentDidMount(){
    const token = localStorage.getItem('token');
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log('Fetched from localstore', token, userDetails);
    if( token && userDetails ){
      this.props.setStatusToLogin(userDetails, token);
      this.props.history.push('/');
    }
  }

  logoutHandler = () => {
    this.props.setStatusToLogout();
    this.props.history.push('/');
  }

  render(){
    return(
      <BrowserRouter>
        <div className={classes.RootContainer}>
          <Navbar isAuth={this.props.isAuth} setStatusToLogout={this.logoutHandler}/>
          <Switch>
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/login' component={Login}/>
            {this.props.isAuth ? <Route exact path='/add-post' component={AddPost}/> : null } 
            {this.props.isAuth ? <Route exact path='/add-post/type1' component={TextPost}/> : null }
            {this.props.isAuth ? <Route exact path='/add-post/type2' component={ImagePost}/> : null } 
            <Route path='/' component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStatusToLogin: (userDetails, token) => dispatch(actionCreators.setStatusToLogin(userDetails, token)),
    setStatusToLogout: () => dispatch(actionCreators.setStatusToLogout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
 