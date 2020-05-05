import React, { Component } from "react";
import { Col, Button,Modal,ModalHeader,ModalBody, Spinner,Form, FormGroup, Label, Input } from 'reactstrap';
import { setKeep } from "../API/keep";
import {Header} from "../header/Header";


class AddKeep extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clickSubmit: true,
			showError: false,
			errorMsg: "",
			title:"",
			description:"",
			links:[],
			showLoading:false,
			model:false,
			otpError:"",
			isAuthenticated:false,
			status : false
		};
		this.handleUserInput = this.handleUserInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		let token=localStorage.getItem('Authorization');
		if(!token){
			this.props.history.push("/login");
		}

	}


	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		console.log("test --------------------------------", name, value)
		if(name==="title" && !value){
			this.setState({
				showError: true,
				errorMsg:"Title is Empty "
			});
		}else if(name==="description" && !value){
			this.setState({
				showError: true,
				errorMsg:"Discription is Empty"
			});
		}else{
			this.setState({ [name]: value });
			this.setState({ showError: false });
			this.setState({otpError:false});
		}
	}

	handleSubmit=event=> {
		event.preventDefault();
		if (!this.state.showError && this.state.title && this.state.description) {
			this.setState({ showLoading: true});
			setKeep(this.state.title,this.state.description,this.state.links, this.state.status)
				.then(()=>{
					this.setState({
						showError:false,
						showLoading: false,
					})
					this.props.history.push("/");
					window.location.reload(true);
				}).catch((error)=>{
				if (error.response) {
					this.setState({
						showError:true,
						errorMsg:error.response.data.error.message,
						showLoading: false,
						modal:false
					})
				}

			})
		}
	}

	renderButton() {
		if (!this.state.showLoading) {
			return (
				<FormGroup row>
			<Col md={{ size: 6, offset: 3 }}>
		<button disabled ={!this.state.title  || !this.state.description || this.state.showError || !this.state.links }
			className="btn btn-primary"
			name="action"
			onClick={this.handleSubmit}
				>
				Add</button>
				</Col>
				</FormGroup>
		);
		} else {
			return (
				<FormGroup row>
			<Col md={{ size: 6, offset: 3 }}>
		<Spinner style={{ width: '3rem', height: '3rem' }} />
			</Col>
			</FormGroup>
		);
		}
	}

	render() {
		return (
			<div>
			<Header auth={this.state.isAuthenticated}/>
		<Form>
		<FormGroup row className="form-group required">
			<Col md={{ size: 6, offset: 3 }}>
	<Label className="col-md-2 control-label" for="email" sm={2}>Title</Label>
			<Input type="title" name="title" id="title" placeholder="Enter Title" onChange={this.handleUserInput} required/>
		</Col>
		</FormGroup>
		<FormGroup row className="form-group required">
			<Col md={{ size: 6, offset: 3 }}>
	<Label className="col-md-2 control-label" for="name" md={5} sm={5}>Description</Label>
			<Input type="textarea" name="description" id="name" placeholder="Enter Description "  onChange={this.handleUserInput} required/>
		</Col>
		</FormGroup>
		<FormGroup row className="form-group required">
			<Col md={{ size: 6, offset: 3 }}>
			<Label className="col-md-2 control-label" for="password" sm={2}>Link</Label>
			<Input type="links" name="links" id="links" placeholder="Enter Links" onChange={this.handleUserInput} required/>
		</Col>
		</FormGroup>
		{this.state.showError && (
		<div className="formError">
			<FormGroup row>
		<Col md={{ size: 6, offset: 3 }}>
			{this.state.errorMsg}
		</Col>
		</FormGroup>
		</div>
		)}
		{this.renderButton()}
	</Form>
		</div>);
	}
}

export default AddKeep;
