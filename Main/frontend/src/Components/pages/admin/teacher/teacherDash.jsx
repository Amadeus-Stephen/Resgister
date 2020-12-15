import React , {Component} from "react"
import Axios from "axios"
import AuthenticationService from "../../../../service/AuthenticationService";
import NavBar from "../../../nav/navBar"
import Class from "./class"
export default class TeacherDash extends Component {
    _isMounted = false
    constructor(props) {
        super(props)
        this.state = {id:null, name:"", role:"" }
    }
    componentDidMount() {
        this._isMounted = true;
        Axios.get(`${this.props.proxy}/user/`,
        {headers: 
            {authorization: 
                        AuthenticationService.getSessionToken()
                    }
        }).then((response) => {
				console.log(response.data)
				this.setState({ 
					id:response.data[0] , 
					name:response.data[1], 
					role: response.data[2]
				})
        		Axios.get(`${this.props.proxy}/class/teacher/${this.state.id}`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        })
        // Axios.get(`${this.props.proxy}/class/teacher/${this.state.id}`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        // Axios.post(`${this.props.proxy}/admin/create`, 
        // {
        //     username: "bwconn",
        //     firstName:"Bill",
        //     lastName:"Conn",
        //     middleName:"Willam",
        //     email:"bill.conn@wburg.kyschool.us",
        //     role:"admin",
        //     password:"bc123"
        // },
        // {
		// 	headers: {
		// 		authorization: AuthenticationService.getSessionToken()
		// 	}
        // }).then((response) => {console.log(response.data)})
        Axios.delete(`${this.props.proxy}/admin/bwconn`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        Axios.get(`${this.props.proxy}/admin/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    render() {
        return (
            <>
            <NavBar role={this.state.role} />
			<div className="cspage p-3">
          		<div className="d-flex justify-content-end flex-wrap">
					<Class />
					<Class />
					<Class />
					<Class />
					<Class />
					<Class />
		  		</div>
		  </div>
            </>
        )
    }
}