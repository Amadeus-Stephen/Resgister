import React , {Component} from 'react'
import {Redirect } from 'react-router-dom'
import {Card , Form , Button } from 'react-bootstrap'
import AuthenticationService from "../../../service/AuthenticationService"
import Axios from "axios"

export default class AddClass extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            classes:[],
            class: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    console.log(response.data.Success)
                }
            } else {
                let msg = "A server Error has taken place"
                this.props.addFlash({success: false , msg})
            }
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault() 
        console.log(this.state)
        Axios.post(`${this.props.proxy}/student/add/`,
            {
                classId:this.state.class,
                studentId:this.props.id
            },
                {headers:
                    {authorization : 
                        AuthenticationService.getSessionToken()
                    }
            })
    }
    renderClassOptions() {
        return this.state.classes.map((i ,idx)=> {
            return <option value={i.id} key ={idx}>{i.className}</option>
        })
    }
    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{pathname : this.state.redirectTo}}/>
        } else {
            return (
                <div className = "col-md-6 mt-1">
                  <Card.Body className="primebg">
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Label>Class</Form.Label>
                      <Form.Control as="select" onChange={e => this.handleChange(e)} value={this.state.class} name="class">
                        <option value="">....</option>
                        {this.renderClassOptions()}
                      </Form.Control>
                    </Form.Group>
                        <Button variant="primary" className="btn-block" type="submit">
                          Submit
                        </Button>
                    </Form>
                  </Card.Body>
                </div>
            )
        }
    }
}
