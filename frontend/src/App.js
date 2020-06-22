import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import classes from './App.module.css';
import Navbar from './components/Navbar/Navbar';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';


class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <div className={classes.RootContainer}>
          <Navbar />
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/login' component={Login}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
 