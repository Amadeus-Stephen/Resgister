import React, {Component} from "react"
import { Redirect } from "react-router-dom" 
import AuthenticationServive from "../../service/AuthenticationService"

export default class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationServive.isUserLoggedIn()) {
            return {...this.props.children} 
        } else {
            return <Redirect to="/login" />
        }
    }    
}