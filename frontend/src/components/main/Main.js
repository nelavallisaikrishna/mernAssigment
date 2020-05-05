import React, { Component } from "react";
import moment from 'moment'
import {Spinner, Card, CardBody, CardText, Row, Col, FormGroup} from 'reactstrap';
import {getKeeps, setKeep, updateKeep} from "../API/keep";
import {Header} from "../header/Header";
class Main extends Component {
	constructor() {
		super();
		this.state = {
			showLoading: true,
			keeps:[],
			isAuthenticated:true,
			id:"",
			status:""
		};
		this.formatDate=this.formatDate.bind(this)

	}
	componentDidMount(){
		getKeeps().then((result)=>{
			console.log("result",result.data.data)
			this.setState({
				showLoading:false,
				keeps:result.data.data
			})
		}).catch(err => console.log(err));
	}

	handleInputChange=(item)=> {
		// event.preventDefault();
		updateKeep(item._id, item.status)
			.then(()=>{
				this.componentDidMount()
			}).catch((error)=>{
			if (error.response) {
				console.log("-----------------------------", error.response)
			}

		})
	}

	formatDate(date){
		var today = new Date();
		var feedDay = new Date(date);
		let result=moment(feedDay).from(moment(today));
		return result;
	}
	renderLoaderOrData(){
		if (this.state.showLoading) {
			return(
				<Row className="widthTopSpinner">
				<Col md={{ size: 6, offset: 5 }}>
		<Spinner style={{ width: '3rem', height: '3rem' }} />
			</Col>
			</Row>
		)
		}else{
			return (
				<div className="bottom-margin row" >
				{this.state.keeps && this.state.keeps.map((item,index) =>(

					<div className="card col-md-4" style={{marginRight:"10px", marginBottom:"10px", height:"144px",backgroundColor:item.status ===true? "#D5F9BC":"#F9C2BC"}}>
						<div className="container">
							<h4><b>{item.title}</b> <input
			type="checkbox" className="float-right"
			checked={item.status} style={{marginTop: "9px"}} onChange={() => this.handleInputChange(item)}/></h4>
							<p>{item.description}</p>
							<a href={item.links} target="_blank">{item.links}</a>
						</div>
					</div>
				))
		}
		</div>)
		}
	}
	render() {
		return(
			<div>
			<Header auth={this.state.isAuthenticated}/>
			{this.renderLoaderOrData()}
	<div className="container1">
			<div className="btn-holder">
			<a href="/addKeep">Add Note</a>
		</div>
		</div>

	</div>
	)
	}
}

export default Main;
