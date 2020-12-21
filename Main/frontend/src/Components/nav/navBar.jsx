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
				{(this.props.role === "director") ?
				<div>
					<DropDownItem title="Create" num="1">
						<ListItem text="Add New User" link="/director/create/user/" handleClick={this.handleClick}/>
						<ListItem text="Add New Class" link="/director/create/classes" handleClick={this.handleClick} />
					</DropDownItem>
					<DropDownItem title="View" num="2">
						<ListItem text="Get Classes" link="/director/get/classes/" handleClick={this.handleClick}/>
						<ListItem text="Get Admins" link="/director/get/admins/" handleClick={this.handleClick}/>
						<ListItem text="Get Students" link="/director/get/students/" handleClick={this.handleClick}/>
					</DropDownItem>
				</div>
				:""}
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
							<Link to={`/${this.props.role}/dash`} >
								<Button  variant="link" onClick={this.handleClick}>
									Home
								</Button>
							</Link>
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
							<Link to="/" onClick={AuthenticationService.logout}>
								<Button variant="link" onClick={this.handleClick}>
									Logout
								</Button>
							</Link>
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