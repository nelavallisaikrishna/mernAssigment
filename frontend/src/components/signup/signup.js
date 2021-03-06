import React, { Component } from "react";
import { Col, Button,Modal,ModalHeader,ModalBody, Spinner,Form, FormGroup, Label, Input } from 'reactstrap';
import { registerAPI } from "../API/keep";
import {Header} from "../header/Header";
  

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSubmit: true,
      showError: false,
      errorMsg: "",
      password:"",
      password2:"",
      email:"",
      name:"",
      showLoading:false,
      model:false,
      otpError:"",
      isAuthenticated:false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    let token=localStorage.getItem('Authorization');
    if(token){
        this.props.history.push("/");
    }
    
  }



  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  validatePassword(password){
      var re=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/
      return re.test(String(password));
  }
  validateMobile(mobile){
    var re=/[0-9]{10}/
      return re.test(String(mobile));
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

      if(name==="email" && !this.validateEmail(value)){
        this.setState({ 
            showError: true,
            errorMsg:"Email Entered is Invalid"
         });
    }else if(name==="password" && !this.validatePassword(value)){
        this.setState({
            showError: true,
            errorMsg:"Password should be combination of Lowercase,Uppercase,Number and Special Character"
         });
    }else{
        this.setState({ [name]: value });
        this.setState({ showError: false });
        this.setState({otpError:false});
    }
  }

  handleSubmit=event=> {
    event.preventDefault();
    if (!this.state.showError && this.state.password && this.state.email) {
      this.setState({ showLoading: true}); 
      registerAPI(this.state.email,this.state.name,this.state.password,this.state.password2)
        .then(()=>{
            this.setState({
                showError:false,
                showLoading: false,
            })
          this.props.history.push("/login");
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
            <button 
            className="btn btn-primary"
            name="action"
            onClick={this.handleSubmit}
            >
            Register</button>
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
                        <Label className="col-md-2 control-label" for="email" sm={2}>Email</Label>
                        <Input type="email" name="email" id="email" placeholder="Enter Email Address" onChange={this.handleUserInput} required/>
                    </Col>
                </FormGroup>
                <FormGroup row className="form-group required">
                    <Col md={{ size: 6, offset: 3 }}>
                        <Label className="col-md-2 control-label" for="name" md={5} sm={5}>Name</Label>
                        <Input type="tel" name="name" id="name" placeholder="Enter Your Name" pattern="[0-9]{10}" onChange={this.handleUserInput} required/>
                    </Col>
                </FormGroup>
                <FormGroup row className="form-group required">
                    <Col md={{ size: 6, offset: 3 }}>
                        <Label className="col-md-2 control-label" for="password" sm={2}>Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Enter Password" onChange={this.handleUserInput} required/>
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

export default Signup;
