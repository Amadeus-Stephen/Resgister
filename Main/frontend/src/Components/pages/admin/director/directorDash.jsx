import React , {Component} from "react"
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
            <div>
                Hello                
            </div>

        )
    }
}