import React , {Component} from "react"
import {Card} from "react-bootstrap"
import Axios from "axios"
import Class from "../../subComponents/class"
import AuthenticationService from "../../../../../service/AuthenticationService"

export default class GetClasses extends Component {
	_isMounted = false
	constructor(props) {
		super(props)

		this.state = {classes:[]}
	}

	componentDidMount() {
		Axios.get(`${this.props.proxy}/class/`,
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
                    this.setState({ classes:response.data.Success})
				}
			} else {
                let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})	
			}
		})
	}
	renderClasses() {
		const { classes } = this.state;
		if(classes.length > 0) {
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
