import React , {Component} from "react"
import {Card} from "react-bootstrap"
export default class DirectorDash extends Component {
    _isMounted = false
    constructor(props) {
        super(props)

        this.state = {id: ""}
        this.updateAppState = this.updateAppState.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    updateAppState(stateObject) {
        this.props.updateAppState(stateObject)
    }
    render() {
        return (
        <Card className="primebg w3-container w3-animate-bottom  center">
            <h1>Greatings </h1>
            <h4>{this.props.firstName} {this.props.lastName}</h4>
        </Card>
        )
    }
}
