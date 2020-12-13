import React , {Component} from "react"
import Axios from "axios"
import AuthenticationService from "../../../../service/AuthenticationService";
export default class DirectorDash extends Component {
    _isMounted = false
    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        this._isMounted = true;
        Axios.get(`${this.props.proxy}/user/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        Axios.get(`${this.props.proxy}/admin/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        return (
         <div>Hello</div>   
        )
    }
}