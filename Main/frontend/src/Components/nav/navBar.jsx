import React , {Component} from "react"
import {Accordion, Button, Card, Navbar} from "react-bootstrap"
import ListItem from "./navComponents/listItem"
import AuthenticationService from "../../service/AuthenticationService"
import DropDownItem from "./navComponents/dropDownItem"
import { Link } from "react-router-dom"
export default class LeftNav extends Component {
	constructor(props) {
		super(props)
		this._isMounted = false;
		this.handleClick = this.handleClick.bind(this)
		this.leftNavRef = React.createRef();
		this.overLayRef = React.createRef();


	}
	componentDidMount() {
		this._isMounted = true;
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	handleClick() {
		const leftNav = this.leftNavRef.current;
		const overlay = this.overLayRef.current;

		leftNav.classList.toggle("is-active");
		overlay.classList.toggle("is-active");
	}

	renderNavButtons() {
		return (
			<div>
				{(this.props.role === "director") ? <ListItem text="Add Teacher" link="/director/create/admin/"/>:""}
			</div>   
		)
	}
	render() {
		return (
		<div>
			<Navbar className="primebg fixed-top">
				<Button className="primebg openbtn" onClick={this.handleClick}>
					<span className="primecolor">Jacket </span>
				</Button>
			</Navbar>
			<div className="sidebar" ref={this.leftNavRef}>
				<Card className="primebg mt-5">
					<Card.Header className="mt-5">
						<span className="mb-0" >
							<Button  variant="link">
								<p>
									home
								</p>
							</Button>
						</span>
					</Card.Header>
					<Accordion>
						{ (this.props.role) ? this.renderNavButtons() : ""}
						{/* <DropDownItem title="hellodrop" text="goga boga" num="1" />
						<DropDownItem title="hellodrop2" text="goga boga2" num="2" /> */}
						{/* <ListItem text="hello" /> */}
					</Accordion>
					
				</Card>
				<Card className="primebg nav-link">
					<Card.Header >
						<h5 className="mb-0">
							<Button variant="link" >
								<Link to="/" onClick={AuthenticationService.logout}>Logout</Link>
							</Button>
						</h5>
					</Card.Header>
				</Card>
			</div>
				<div
          			onClick={this.handleClick}
          			ref={this.overLayRef}
          			className="overlay"
        		></div>
		</div>
		)
	}
}