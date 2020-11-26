import React, {Component} from 'react'
import {Link , /*Redirect */} from 'react-router-dom'
import {Card, Form , Button}from 'react-bootstrap'


export default class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state ={
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ 
            [event.target.name]:event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }
    render() {
        return (
            <div className="col-md-6 mt-1 m-auto">
                <Card className="card-body primebg">
                    <h1 className="text-center mb-3">Login</h1>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group>
                            <Form.Label >Name</Form.Label>
				            <Form.Control onChange={e => this.handleChange(e)}  value={this.state.username} id="name" name="username"  placeholder="Enter Name" />
                        </Form.Group>
			            <Form.Group >
				            <Form.Label>Password</Form.Label>
				            <Form.Control onChange={e => this.handleChange(e)} value={this.state.password} type="password"   id="password" name="password" placeholder="Enter Password" />
			            </Form.Group>
                        <Button type="submit" className="btn-primary btn-block">Login</Button>
                    </Form>
			        <p className="lead mt-4">Dont Have An Account? <Link to="/signup">Signup</Link></p>
                </Card>
            </div>
        )
    }
}