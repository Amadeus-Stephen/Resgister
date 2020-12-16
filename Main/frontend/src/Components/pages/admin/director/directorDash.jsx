import React , {Component} from "react"
import Axios from "axios"
import AuthenticationService from "../../../../service/AuthenticationService";
import NavBar from "../../../nav/navBar"
export default class DirectorDash extends Component {
    _isMounted = false
    constructor(props) {
        super(props)

        this.state = {id: ""}
        this.updateAppState = this.updateAppState.bind(this)
    }
    componentDidMount() {
        this._isMounted = true;
        Axios.get(`${this.props.proxy}/user/`,
            {headers:
                {authorization:
                    AuthenticationService.getSessionToken()
                }
            }
        ).then((response) => {
            this.updateAppState(response.data)
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    updateAppState(stateObject) {
        this.props.updateAppState(stateObject)
    }
    render() {
        return (
            <>
            <NavBar role={this.props.role} />            
            </>

        )
    }
}