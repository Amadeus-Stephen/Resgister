import React , {Component} from "react"
import {Card} from "react-bootstrap"
import Axios from "axios"
import User from "../../subComponents/user"
import AuthenticationService from "../../../../../service/AuthenticationService"

export default class GetStudents extends Component {
	_isMounted = false
	constructor(props) {
		super(props)

		this.state = {students:[]}
	}

	componentDidMount() {
		Axios.get(`${this.props.proxy}/student/`,
			{headers:
				{authorization:
					AuthenticationService.getSessionToken()
				}
			}
		).then((response) => {
			if (response.status === 200) {
				if (response.data.Error) {
					let msg = response.data.Error;
					this.props.addFlash({ success: false, msg });
					
				} else if (response.data.Success){
					this.setState({ students:response.data.Success})
				}
			} else {
				let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})	
			}
		})
	}
	renderStudents() {
		const { students } = this.state;
		if(students.length > 0) {
			return (
				students.map(({name , role , username, email} , idx) => {
					return <User firstName={name[0]} lastName={name[1]} role={role} username={username} email={email} key={idx} />
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
				{this.renderStudents()}
			</div>
		)
	}
}