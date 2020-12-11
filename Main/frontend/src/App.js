import React, { Component } from "react"
// import SockJsClient from 'react-stomp'
// import axios from "axios"
import {BrowserRouter as Redirect, Route} from 'react-router-dom'
import "./App.css"
import "./w3.css"
import Home from "./Components/pages/home"
import AdminLogin from "./Components/pages/admin/adminLogin"
import StudentLogin from "./Components/pages/student/studentLogin"
import StudentDash from "./Components/pages/student/studentDash"
import AuthenticatedRoute from "./Components/utils/authenticateRoute"
import AuthenticationService from "./service/AuthenticationService"
import Axios from "axios"
class App extends Component {
	_isMounted = false;
	constructor() {
    	super()
		this.proxy = "http://localhost:8080";
      // this.SignUp = this.SignUp.bind(this)
      // this.socketClient = React.createRef();
      	this.state ={ logedIn : false , redirectTo: null}
  	}
  	componentDidMount() {
		this._isMounted = true;
    	AuthenticationService.setupAxiosInterceptors(AuthenticationService.getSessionToken())
    	// console.log(AuthenticationService.getSessionToken())
    	console.log(AuthenticationService.isUserLoggedIn())
    	this.setState({logedIn : AuthenticationService.isUserLoggedIn()})
		Axios.get(`${this.proxy}/teacher/`).then(response => {console.log(response.data)})
  	}
  	componentWillUnmount() {
		this._isMounted = false;
 	}
  	render() {
    // let socket
    // if (this.state.logedIn) { 
    //   socket =  
    //   <SockJsClient url='http://localhost:8080/websocket-chat'
    //   topics={['/topic/greetings']}
    //   onConnect={() => {console.log("connected");}}
    //   onDisconnect={() =>{console.log("disconnected");}}
    //   onMessage={(msg) => {console.log(msg);}}
    //   ref={(client) => {this.socketClient = client}}
    //   />
    // } else{
    //   socket = <div></div>
    // }
    return ( 
    <div>
      {/* {socket} */}
		<div className="center page">
			<Route path="/" exact render={() => <Home />} />
			<Route path="/admin/login" render={() => <AdminLogin /> } />
			<Route path="/student/login" render={() => <StudentLogin /> } />
			<AuthenticatedRoute path="/student/dash" exact redirect="/student/login" render= {() => { <StudentDash login={this.state.logedIn} /> }} />
		</div>
	</div>
    )
  }
}

export default App;