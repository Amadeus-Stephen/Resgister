import React , {Component} from "react"
import Axios from "axios"
import AuthenticationService from "../../../service/AuthenticationService";
export default class StudentDash extends Component {
    _isMounted = false
    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        this._isMounted = true;
        console.log(AuthenticationService.getSessionToken())
        // Axios.post(`${this.props.proxy}/user/`, 
        // {
		// 	username:"raschwarz23",
		// 	password:"ras17073"
        // },
        // {
        //     headers:{
		// 		authorization:AuthenticationService.getSessionToken()
		// 	}
        // }).then((response) => {console.log(response.data)})
        // Axios.get(`${this.props.proxy}/user/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        
        // Axios.post(`${this.props.proxy}/student/`, 
        // {
        //     username: "raschwarz23",
        //     firstName:"Robel",
        //     lastName:"Schwarz",
        //     middleName:"Alan",
        //     gradeYear:2023,
        //     careerPath: "Comp Sci",
        //     email:"robel.schwarz@stu.wburg.kyschool.us",
        //     role:"student",
        //     password:"ras17073"
        // },
        // {
		// 	headers: {
		// 		authorization: AuthenticationService.getSessionToken()
		// 	}
		// }).then((response) => {console.log(response.data)})

        // Axios.get(`${this.props.proxy}/student/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
        // Axios.post(`${this.props.proxy}/teacher/`, 
        // {
        //     username: "jtjeffers",
        //     firstName:"Jocab",
        //     lastName:"Jeffers",
        //     middleName:"Tyler",
        //     email:"jacob.jeffers@wburg.kyschool.us",
        //     role:"teacher",
        //     password:"jj123"
        // },
        // {
		// 	headers: {
		// 		authorization: AuthenticationService.getSessionToken()
		// 	}
        // }).then((response) => {console.log(response.data)})

        Axios.get(`${this.props.proxy}/user/`, {headers: {authorization: AuthenticationService.getSessionToken()}}).then((response) => {console.log(response.data)})
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