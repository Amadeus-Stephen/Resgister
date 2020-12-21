import React , {Component} from "react"
import { Card } from 'react-bootstrap';
// import {  Link }from 'react-router-dom'
export default class Class extends Component {
    _isMounted = false;
    constructor() {
        super()
        this.state = {}
        this.textRef = React.createRef();
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
                <Card.Body className="primebg d-flex m-3 w3-container w3-animate-bottom cardborder">
                    <div>
						<h6 className="text-start">Name: {this.props.name}</h6>		
                        <h6 className="text-start">Teacher Username: {this.props.teacherUsername}</h6>
						<h6 className="text-start">Number of Students: {this.props.numOfStudents}</h6>
						<h6>Period: {this.props.period}</h6>
					</div>
                </Card.Body>
        )
    }
}