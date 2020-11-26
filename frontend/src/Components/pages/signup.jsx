import React, {Component } from "react"
import {Link ,/* Redirect */} from 'react-router-dom'
import {Card , Form , Button} from 'react-bootstrap'
//import ThrowMessage from  "../utils/throwMessage"

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
        }
		this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
	 	this.setState({
	 		[event.target.name]: event.target.value // updates state with input
	 	})
    }
    
    handleSubmit(event) {
		event.preventDefault()
		console.log(this.state)
        //this.props.Signup(this.state.username , this.state.password , this.state.confirmPassword) 
    }
    render() {
        return (
		<div className="col-md-6 mt-1 m-auto">
		  <Card className="card-body primebg">
			<h1 className="text-center mb-3">Signup</h1>
			<Form onSubmit={this.handleSubmit}>
			  <Form.Group> 
				{/* {this.renderErrors()} */}
				<Form.Label >Name</Form.Label>
				<Form.Control onChange={e => this.handleChange(e)}  value={this.state.username} id="name" name="username"  placeholder="Enter Name" />
			  </Form.Group>
			  <Form.Group >
				<Form.Label>Password</Form.Label>
				<Form.Control onChange={e => this.handleChange(e)} value={this.state.password} type="password"   id="password" name="password" placeholder="Enter Password" />
			  </Form.Group>
			  <Form.Group>
				<Form.Label >Confirm Password</Form.Label>
				<Form.Control onChange={e => this.handleChange(e)} value={this.state.confirmPassword} type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-Enter Password" />
			  </Form.Group>
			  <Button type="submit" className="btn-primary btn-block">Signup</Button>
			</Form>
			<p className="lead mt-4">Have An Account? <Link to="/login">Login</Link></p>
		  </Card>
		 </div>
        )
    }
}