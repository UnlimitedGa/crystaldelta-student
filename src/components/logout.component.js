import React, { Component } from "react";
import LoginService from "../services/login.service";
import LocalStorageService from "../LocalStorageService";
import { createBrowserHistory } from 'history';
const userId=LocalStorageService.getUserId();
const history = createBrowserHistory();
export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = { 
          published: false,
          submitted: false
        };
      }

      componentDidMount() {
        this.logout();
      }
      logout(){
      if(userId){
        LoginService.logout(userId)
          .then(response => {
            history.push('/sign-in')
            LocalStorageService.clearToken()
              window.location.reload(true);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    else{
      history.push('/sign-in')
      LocalStorageService.clearToken()
        window.location.reload(true);
    }
  }
    render() {
        return (
            <div className="submit-form">
            </div>
        );
    }
}