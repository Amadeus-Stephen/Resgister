import React, { Component } from "react"
import axios from "axios"
import {Route} from 'react-router-dom'

import "./App.css"
import LeftNav from "./Components/nav/leftNav"
import SignUp from "./Components/pages/signup"
import LogIn from "./Components/pages/login"
class App extends Component {
  _isMounted = false;
  constructor() {
    super()
      this.proxy = "http://localhost:8080";
      this.SignUp = this.SignUp.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentDidUpdate() {
    this._isMounted = false;
  }
  SignUp(username , password , confirmPassword) {
    console.log(username , password , confirmPassword)

  } 
  render() {
    return ( 
      <div>
      <LeftNav />
      <Route path="/signup" render={() => <SignUp SignUp={this.SignUp}/>} />
      <Route path="/login" render={() => <LogIn />} />
      </div>
    )
  }
}

export default App;