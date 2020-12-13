import React , {Component} from "react"
import {Accordion, Button, Card, Navbar} from "react-bootstrap"
import ListItem from "./navComponents/listItem"
import DropDownItem from "./navComponents/dropDownItem"
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
            <Navbar className="primebg fixed-top">
                <Button className="primebg openbtn" onClick={this.OpenNav}>
                    <span className="primecolor">Jacket </span>
                </Button>
            </Navbar>
            <div className="sidebar" ref={this.leftNavRef}>
                <p className="closebtn" onClick={this.CloseNav}>
                    &times;
                </p>
                <Card className="primebg">
                    <Card.Header>
                        <h5 className="mb-0" >
                            <Button className="collapsed" variant="link">
                                Home
                            </Button>
                        </h5>
                    </Card.Header>
                    <Accordion>
                        <DropDownItem title="hellodrop" text="goga boga" num="1" />
                        <DropDownItem title="hellodrop2" text="goga boga2" num="2" />
                        <ListItem text="hello" />
                    </Accordion>
                </Card>
            </div>
        </div>
        )
    }
}