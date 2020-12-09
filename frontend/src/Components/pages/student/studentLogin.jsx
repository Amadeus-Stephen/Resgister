import React, {Component} from 'react'
import {Link , /*Redirect */} from 'react-router-dom'
import {Card, Form , Button}from 'react-bootstrap'
import Axios from 'axios'

export default class studentLogin extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state ={
            username: '',
            password: ''
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
        this.props.login(this.state.username , this.state.password)
    }
    render() {
        return (
            <div className="col-md-6 mt-1 m-auto ">
                <Card className="card-body primebg">
                    <h1 className="text-center mb-3">Login</h1>
                    <Form onSubmit={this.handleSubmit} >
                        <Form.Group>
                            <Form.Label >User Name</Form.Label>
				            <Form.Control onChange={e => this.handleChange(e)}  value={this.state.username} id="name" name="username"  placeholder="Enter User Name" />
                        </Form.Group>
			            <Form.Group >
				            <Form.Label>Password</Form.Label>
				            <Form.Control onChange={e => this.handleChange(e)} value={this.state.password} type="password"   id="password" name="password" placeholder="Enter Password" />
			            </Form.Group>
                        <Button type="submit" className="btn-primary btn-block">Login</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}