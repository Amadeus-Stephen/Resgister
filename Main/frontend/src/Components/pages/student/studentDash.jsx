import React , {Component} from "react"
import Axios from "axios"
import {Card} from "react-bootstrap"
import AuthenticationService from "../../../service/AuthenticationService";
import Class from "../admin/subComponents/class"
export default class StudentDash extends Component {
    _isMounted = false
    constructor(props) {
         super(props)
        this.state = {id: null , name :"" , classes : [] , role : ""}
    }
    componentDidMount() {
        this._isMounted = true;
        // console.log(AuthenticationService.getSessionToken())
        Axios.get(`${this.props.proxy}/user/`,
                  {headers:
                        {authorization: AuthenticationService.getSessionToken()}
                  }
        ).then((response) => {
            this.setState({
                id:response.data.id ,
                classes:response.data.classes,
                name: response.data.name,
                role:response.data.role
            })
            console.log(response.data)
            if (this.state.classes) {
                Axios.post(`${this.props.proxy}/class/student/get/`,
                           this.state.classes
                ).then((response) => {
                    if (response.status === 200) {
                        if (response.data.Success ) {
                            this.setState({classes :response.data.Success})
                        }
                    }     
                })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }
    renderClasses() {
        const  {classes}  = this.state;
        if(classes) {
            return (
                classes.map(({className ,teacherUsername,  numOfStudents, period} , idx) => {
                    return <Class 
                        name={className}
                        teacherUsername={teacherUsername} 
                        numOfStudents={numOfStudents} 
                        period={period}
                        key={idx}
                    />
                })
            )
        }
        return (
            <Card className="primebg w3-container w3-animate-bottom  center">
              <h6>We could not find any classes in our database</h6>
                <h6>try adding some with the add features</h6>
            </Card>
        )
    }
    render() {
        return (
            <div>
              {this.renderClasses()}
            </div>
        )
    }
}
