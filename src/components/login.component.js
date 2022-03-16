import React, { Component } from "react";
import LoginService from "../services/login.service";
import LocalStorageService from "../LocalStorageService";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
          email: "",
          password: "", 
          published: false,
          submitted: false
        };
      }

      loginSubmit() {
        var data = {
            email: this.state.email,
          password: this.state.password
        };
    
        LoginService.login(data)
          .then(response => {
            if (!response.data.status) {
                alert(response.data.message);
              }
            this.setState({
              _id: response.data.data._id,
              email: response.data.data.email,
              name: response.data.data.name,
            });
            const tokenObject = {
                access_token: response.data.data.tokens.access.token,
                refresh_token: response.data.data.tokens.refresh.token,
                _id: response.data.data._id,
              };
              LocalStorageService.setToken(tokenObject);
              history.push('/task');
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

    render() {
        return (
            <div className="submit-form">
                <h3>Sign In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                    onChange={this.onChangeEmail} value={this.state.email} name="email" required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={this.onChangePassword} placeholder="Enter password" value={this.state.password} name="password" required/>
                </div>
                <button  className="btn btn-primary btn-block" onClick={this.loginSubmit}>Submit</button>
            </div>
        );
    }
}