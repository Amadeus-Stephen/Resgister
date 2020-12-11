import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import {Card, Form , Button}from 'react-bootstrap'
import AuthenticationService from "../../../service/AuthenticationService"
import Axios from 'axios'

export default class studentLogin extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state ={
            username: '',
            password: '',
            redirectTo: null,
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
        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                console.log(response.data)
            }).then(() => { 
                this.setState({redirectTo:"/student/dash"})
            }).catch((e) => {
                console.log(e);
        })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />;
        } else {
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
}