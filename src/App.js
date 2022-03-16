import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component.js"
import Logout from "./components/logout.component.js"
import SignUp from "./components/signup.component.js"
import TaskList from "./components/taskList.component.js"
import TaskAdd from "./components/taskAdd.component.js"
import TaskUpdate from "./components/taskUpdate.component.js"
import LocalStorageService from "./LocalStorageService";
const userId=LocalStorageService.getUserId();
class App extends Component {
  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Crystal-Delta</Link>
          {userId ? (
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/logout"}>Logout</Link>
            </li>
          </ul>
        </div> ):(
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-in"}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
            </li>
          </ul>
        </div>
        )
        }
        </div>
      </nav>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/task/:id" component={TaskUpdate} />
          <Route path="/task-add" component={TaskAdd} />
          <Route path="/task" component={TaskList} />
          <Route path="/logout" component={Logout} />
        </Switch>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
