import React, { Component } from "react"
import SockJsClient from 'react-stomp'
// import axios from "axios"
import {Route} from 'react-router-dom'
import "./App.css"
import "./w3.css"
import Home from "./Components/pages/home"
import AdminLogin from "./Components/pages/admin/adminLogin"
import StudentLogin from "./Components/pages/student/studentLogin"
import AuthenticationService from "./service/AuthenticationService"
import Axios from "axios"
class App extends Component {
  _isMounted = false;
  constructor() {
    super()
      this.proxy = "http://localhost:8080";
      // this.SignUp = this.SignUp.bind(this)
      this.socketClient = React.createRef();
      this.state ={ logedIn : false}
      this.AdminLogin = this.AdminLogin.bind(this)
      this.StudentLogin = this.StudentLogin.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  AdminLogin(email , password , confirmPassword) {

  }
  StudentLogin(username , password) {

    AuthenticationService.executeBasicAuthenticationService(username , password).then(() => {
      AuthenticationService.registerSuccessfulLogin(username   , password )
	  console.log("auth pass")
    }).catch((e) => {
      console.log("auth failed", e)
    })
  }
  render() {
    let socket
    if (this.state.logedIn) { 
      socket =  
      <SockJsClient url='http://localhost:8080/websocket-chat'
      topics={['/topic/greetings']}
      onConnect={() => {console.log("connected");}}
      onDisconnect={() =>{console.log("disconnected");}}
      onMessage={(msg) => {console.log(msg);}}
      ref={(client) => {this.socketClient = client}}
      />
    } else{
      socket = <div></div>
    }
    return ( 
      <div>
      {socket}
      <div className="center page">
      <Route path="/" exact render={() => <Home />} />
      <Route path="/admin/login" render={() => <AdminLogin login={this.AdminLogin} /> } />
      <Route path="/student/login" render={() => <StudentLogin login={this.StudentLogin}/> } />
      </div>
      </div>
    )
  }
}

export default App;