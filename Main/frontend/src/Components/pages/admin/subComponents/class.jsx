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
						<h6 className="text-start">Number of Students: {this.props.num}/{this.props.maxNum}</h6>
						<h6>Runtime: {this.props.runTime}</h6>
						<h6>Time Frame: {this.props.startTime} - {this.props.endTime}</h6>
					</div>
                </Card.Body>
        )
    }
}