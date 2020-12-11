import React, {Component} from "react"
import {Route , Redirect} from "react-router-dom" 
import AuthenticationServive from "../../service/AuthenticationService"

export default class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationServive.isUserLoggedIn()) {
            return <Route {...this.props.render} />
        } else {
            return <Redirect to={{pathname:this.props.redirect}} />
        }
    }    
}