import React , {Component} from 'react'
import { Redirect} from 'react-router-dom'
import {Card , Form , Button , Col} from 'react-bootstrap'
import AuthenticationService from '../../../../../service/AuthenticationService'
import Axios from "axios"
export default class CreateNewClass extends Component {
	_isMounted = false;
	constructor(props) {
		super(props)
		this.state = {
			className: '',
			period: '',
			teacherId: '',
			teacherUsername: '',
			redirectTo: null,
			flashes:[],
			teacherList: [],
			periodList: [1, 2, 3,4, 6, 7],
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.getTeachers = this.getTeachers.bind(this)
		this.getTeacherUsername = this.getTeacherUsername.bind(this)
	}
	componentDidMount() {
		this._isMounted = true;
		this.getTeachers();
	}
	componentWillUnmount() {
		this._isMounted = false;
	}
	
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	
	handleSubmit(event) {
		event.preventDefault()
		let classInfo = {
			className: this.state.className,
			teacherId: this.state.teacherId,
			teacherUsername : this.getTeacherUsername(this.state.teacherId),
			period: this.state.period
		}
		console.log(classInfo)
		Axios.post(`${this.props.proxy}/class/create`, 
			classInfo, 
				{
					headers: {
						authorization: AuthenticationService.getSessionToken()
					}
		}).then((response) => {
			if (response.status  === 200 ) {
				if (response.data.Success) {
					let msg = response.data.Success;
					this.props.addFlash({success:true , msg})
				} else{ 
					let msg = response.data.Error;
					this.props.addFlash({success: false, msg}) ;
				}
			} else {
				let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})
			}
		} 
		)
	}
	getTeacherUsername(id) {
		for (let i = 0 ; i < this.state.teacherList.length ; i++ ) {
			if (this.state.teacherList[i].id === id) {
				return this.state.teacherList[i].username;
			}
		}
		return null;
	}
	getTeachers() {
		Axios.get(`${this.props.proxy}/admin/`, 
		{headers:
			{authorization : 
				AuthenticationService.getSessionToken()
			}
		}
		).then(response => {
			if (response.status === 200) {
				if (response.data.Error) {
					let msg = response.data.Error;
					this.props.addFlash({ success: false, msg });
					
				} else if (response.data.Success){
					this.setState({ teacherList:response.data.Success})
					console.log(response.data)
				}
			} else {
				let msg = "A server Error has taken place"
				this.props.addFlash({success: false , msg})	
			}
		})
	}
	renderTeacherOptions() {
		return this.state.teacherList.map(({id , name } , idx ) => {
			return <option value={id}  key={idx}>{name? name[0] : ''} {name? name[2] : ''}</option>	
		})
	}
	renderPeriodOptions() {
		return this.state.periodList.map(i => {
			return <option value={i} key={i}>{i}</option>
		})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{pathname: this.state.redirectTo}} />;
		} else { 
			return (
				<div className="col-md-6 mt-1">
					<Card className="card-body primebg">
						<h1 className="text-center mb-3">
							Create New Class
						</h1>
						<Form onSubmit={this.handleSubmit}>
							<Form.Group>
								<Form.Label>Class Name</Form.Label>
								<Form.Control onChange={e => this.handleChange(e)} value={this.state.className} name="className" placeholder="Enter Class Name" />
							</Form.Group>
							<Form.Row>

								<Form.Group as={Col}>
									<Form.Label>Teacher</Form.Label>
									<Form.Control as="select" onChange={e => this.handleChange(e)} value={this.state.teacherId} name="teacherId" >
										<option value="" >....</option>
										{this.renderTeacherOptions()}
									</Form.Control>
								</Form.Group>	
								<Form.Group as={Col}>
									<Form.Label>Class Period</Form.Label>
									<Form.Control as="select" onChange={e => this.handleChange(e)} value={this.state.period} name="period">
										<option value="">....</option>
										{this.renderPeriodOptions()}
									</Form.Control>
								</Form.Group>
							</Form.Row>
							<Button variant="primary" className="btn-block" type="submit">
							Submit
  							</Button>
						</Form>
					</Card>
				</div>
			)
		}
	}
}

	// STOP BEING DUMB ADD A PERIOD SELECTOR