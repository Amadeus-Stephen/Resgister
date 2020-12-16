import React, { Component } from "react"
// import SockJsClient from 'react-stomp'
// import axios from "axios"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import "./App.css"
import "./w3.css"
import Home from "./Components/pages/home"
import Login from "./Components/pages/login"
import StudentDash from "./Components/pages/student/studentDash"
import DirectorDash from "./Components/pages/admin/director/directorDash"
import TeacherDash from "./Components/pages/admin/teacher/teacherDash"
import AuthenticatedRoute from "./Components/utils/authenticateRoute"
import AuthenticationService from "./service/AuthenticationService"
// import Axios from "axios"
class App extends Component {
	_isMounted = false;
	constructor() {
    	super()
		this.proxy = "http://localhost:8080";
      // this.socketClient = React.createRef();
		this.state ={ 
				logedIn : false ,
				redirectTo: null ,
				id:null,
				name: [],
				role:""  }
		this.updateAppState = this.updateAppState.bind(this)	  
  	}
  	componentDidMount() {
		this._isMounted = true;
		console.log(AuthenticationService.isUserLoggedIn())
		this.setState({logedIn : AuthenticationService.isUserLoggedIn()})
		
  	}
  	componentWillUnmount() {
		this._isMounted = false;
	 }  
	 updateAppState(stateObject) {
		this.setState(stateObject);
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
			<Router>
				<Switch>
					<Route path="/" exact render={() => <Home />} />
					<Route path="/login" exact render={() => <Login proxy={this.proxy}/>} />
					<AuthenticatedRoute path="/student/dash"  redirect="/login" >
						<StudentDash proxy={this.proxy}/>
					</AuthenticatedRoute>
					<AuthenticatedRoute path="/teacher/dash"  redirect="/login" >
						<TeacherDash proxy={this.proxy}/>
					</AuthenticatedRoute>
					<AuthenticatedRoute path="/director/dash"  redirect="/login" >
						<DirectorDash proxy={this.proxy} updateAppState={this.updateAppState} role={this.state.role}/>
					</AuthenticatedRoute>
				</Switch>
			</Router>
		</div>
	</div>
    )
  }
}

export default App;