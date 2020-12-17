import React , {Component} from "react"
import { Card } from 'react-bootstrap';
export default class User extends Component {
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
						<h6 className="text-start">Name :{this.props.firstName} {this.props.lastName}</h6>		
						<h6 className="text-start">Role :{this.props.role}</h6>
						<h6>Username :{this.props.username}</h6>
						<h6>Email :{this.props.email}</h6>
					</div>
                </Card.Body>
        )
    }
}