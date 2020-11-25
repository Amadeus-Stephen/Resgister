import React , {Component} from "react"
import {Accordion} from "react-bootstrap"
import LeftNavCard from "./navComponents/leftNavCard"
import LeftNavDrop from "./navComponents/leftNavDrop"
export default class LeftNav extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.OpenNav = this.OpenNav.bind(this)
        this.CloseNav = this.CloseNav.bind(this)
        this.leftNavRef = React.createRef();
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    OpenNav() {
        const leftNav = this.leftNavRef.current;
        leftNav.style.width = "20rem";

    }
    CloseNav() {
        const leftNav = this.leftNavRef.current;
        leftNav.style.width = "0";

    }
    render() {
        return (
        <div>
            <nav className="navbar navbar-light primebg">
                <button className="btn primebg openbtn" onClick={this.OpenNav}>
                    <span className="primecolor">Jacket </span>
                </button>
            </nav>
            <div id="mySideBar" className="sidebar" ref={this.leftNavRef}>
                <p className="closebtn" onClick={this.CloseNav}>
                    &times;
                </p>
                <div className="card primebg">
                    <div className="card-header">
                        <h5 className="mb-0" >
                            <button className="btn btn-link collapsed">
                                Home
                            </button>
                        </h5>
                    </div>
                    <Accordion>
                        <LeftNavDrop title="hellodrop" text="goga boga" num="1" />
                        <LeftNavDrop title="hellodrop2" text="goga boga2" num="2" />
                        <LeftNavCard text="hello" />
                    </Accordion>
                </div>
            </div>
        </div>
        )
    }
}