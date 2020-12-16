import React , {Component} from "react"
import { Card } from 'react-bootstrap';
import {  Link }from 'react-router-dom'
export default class Home extends Component {
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
						<h1 className="text-start"> [name]CompSci</h1>		
						<h6 className="text-start">[num students]21/[max num of students]31 students</h6>
						<h6>[Runtime]Runtime 45 mins</h6>
						<h6>[Runspan]From 2:15 - 3:00</h6>
					</div>
                </Card.Body>
        )
    }
}