import React , {Component} from "react"
// import {Card} from "react-bootstrap"
import Axios from "axios"
import User from "./subComponents/user"
import AuthenticationService from "../../../../../service/AuthenticationService"
import { render } from "@testing-library/react"

export default class GetAdmins extends Component {
	_isMounted = false
	constructor(props) {
		super(props)

		this.state = {admins:[]}
	}

	componentDidMount() {
		Axios.get(`${this.props.proxy}/admin/`,
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
					this.setState({ admins:response.data.Success})
				}
			} else {
				let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})	
			}
		})
	}
	renderAdmins() {
		const { admins } = this.state;
		if(admins) {
			return (
				admins.map(({name , role , username, email} , idx) => {
					return <User firstName={name[0]} lastName={name[1]} role={role} username={username} email={email} key={idx} />
				})
			)
		}
		render (
			<div>
			</div>
		)
	}
	render() {
		return (
			<div>
				{this.renderAdmins()}
			</div>
		)
	}
}