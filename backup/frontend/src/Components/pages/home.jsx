import React , {Component} from 'react'
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
                <Card className="primebg w3-container w3-animate-bottom  center">
                    <h1>Building Lifelong Learners</h1>
                    <h6>Manage/Register for your class</h6>
                    <span className="row">
                        <p className="lead mt-4 m-1">
                            <Link to="/student/login">Student login </Link>
                        </p>
                        <p className="lead mt-4 m-1">
                            Or 
                        </p>
                        <p className="lead mt-4 m-1">
                            <Link to="/admin/login">Admin/Teacher login </Link>
                        </p>
                    </span>
                </Card>
        )
    }
}