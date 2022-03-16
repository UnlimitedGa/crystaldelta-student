import React, { Component } from "react";
import LoginService from "../services/login.service";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.state = {
          email: "",
          password: "", 
          firstName:"",
          lastName:"",
          published: false,
          submitted: false
        };
      }

      registerSubmit() {
        var data = {
            email: this.state.email,
          password: this.state.password,
          name:{first:this.state.firstName,last:this.state.lastName}
        };
    
        LoginService.register(data)
          .then(response => {
            if (!response.data.status) {
                alert(response.data.message);
              }
              history.push('/sign-in')
              window.location.reload(true);
          })
          .catch(e => {
            console.log(e);
          });
          
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

      onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
      }
      onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
      }
    render() {
        return (
            <div className="submit-form">
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={this.onChangeFirstName} value={this.state.firstName} name="firstName" required />
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={this.onChangeLastName} value={this.state.lastName} name="lastName"  required/>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.onChangeEmail} value={this.state.email} name="email" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onChangePassword}  value={this.state.password}placeholder="Enter password" name="password" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.registerSubmit}>Sign Up</button>
            </div>
        );
    }
}