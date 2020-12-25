import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {Card, Form , Button, Col}from 'react-bootstrap'
import AuthenticationService from '../../../../../service/AuthenticationService'
import Axios from "axios"
export default class CreateNewUser extends Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state ={
			username: '',
			password: '',
			role:'student',
			firstName: '',
			lastName: '',
			middleName: '',
			email: '',
			carrerPath: '',
			lastYear: '',
			redirectTo: null,
			flashes: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	handleChange(event) {
		this.setState({ 
			[event.target.name]:event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		let userInfo;
		let path;
		userInfo = {
			username: this.state.username,
			firstName:this.state.firstName,
			lastName:this.state.lastName,
			middleName:this.state.middleName,
			email:this.state.email,
			role:this.state.role,
			password:this.state.password,
		}
		if (this.state.role === "student") {
			path = "student"
			userInfo["carrerPath"] = this.state.carrerPath
			userInfo["finalYear"] = this.state.lastYear
		} else {
			path ="admin"
		}
		console.log(userInfo)
		Axios.post(`${this.props.proxy}/${path}/create`, 
			userInfo,
				{
				headers: {
					authorization: AuthenticationService.getSessionToken()
				}
		}).then((response) => {
			if (response.status === 200) {
				if (response.data.Error) {
					let msg = response.data.Error;
            		this.props.addFlash({ success: false, msg });
				} else if (response.data.Success){
					let msg = response.data.Success;
					this.props.addFlash({ success:true , msg})
				}
			} else {
				let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})	
			}
		})
	}

	renderStudentForm() {
		return (
			<div>
				{(this.state.role) === "student" ?  
					<Form.Row>
						<Form.Group as={Col} >
	 						<Form.Label>Career Path</Form.Label>
	  						<Form.Control as="select" onChange={e => this.handleChange(e)} value={this.state.carrerPath} name="carrerPath">
								<option>...</option>
	  						</Form.Control>
						</Form.Group>
						<Form.Group as={Col} >
							<Form.Label>Senior Year</Form.Label>
	  						<Form.Control onChange={e => this.handleChange(e)} value={this.state.lastYear} name="lastYear"/>
						</Form.Group>
  					</Form.Row>
				: "" }
			</div>
		)
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />;
		} else {
		return (
			<div className="col-md-6 mt-1">
				<Card className="card-body primebg">
					<h1 className="text-center mb-3">Create New User </h1>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label>Role</Form.Label>
							<Form.Control as="select"  onChange={e => this.handleChange(e)} value={this.state.role} name="role" >
								<option value="student">student</option>
								<option value="teacher">teacher</option>
								<option value="director">director</option>
							</Form.Control>
						</Form.Group>
						<Form.Group >
							<Form.Label>Username</Form.Label>
							<Form.Control onChange={e => this.handleChange(e)}  value={this.state.username}  name="username"  placeholder="Enter username" />
						</Form.Group>
  						<Form.Row>
							<Form.Group as={Col}>
								<Form.Label>First Name</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)}  value={this.state.firstName}  name="firstName"  placeholder="Enter First Name" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Last Name</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)}  value={this.state.lastName}  name="lastName"  placeholder="Enter Last Name" />
							</Form.Group>
							<Form.Group as={Col}>
								<Form.Label>Middle Name</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)}  value={this.state.middleName}  name="middleName"  placeholder="Enter Middle Name" />
							</Form.Group>
  						</Form.Row>
  						<Form.Row>
							<Form.Group as={Col} >
								<Form.Label>Email</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)}  value={this.state.email} type="email"  name="email"  placeholder="Enter User Email" />
							</Form.Group>

							<Form.Group as={Col} >
								<Form.Label>Password</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)} value={this.state.password} type="password" name="password" placeholder="Enter Password" />
							</Form.Group>
  						</Form.Row>
						{this.renderStudentForm()}			
  						<Button variant="primary" className="btn-block" type="submit">
							Submit
  						</Button>
					</Form>
				</Card>
			</div>
		)
		} 
	}
}
