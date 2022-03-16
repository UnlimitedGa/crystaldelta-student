import React, { Component } from "react";
import TaskService from "../services/task.service";
import LocalStorageService from "../LocalStorageService";
const userId=LocalStorageService.getUserId();
export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.creatTask = this.creatTask.bind(this);

    this.state = {
      currentTask: {
        name: "",
        description: "",
        completed: false
      },
      message: ""
    };
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  creatTask() {
    var data = {
      userId:userId,
      name: this.state.currentTask.name,
      description: this.state.currentTask.description,
      completed: this.state.currentTask.completed
    };
    TaskService.create(
      data
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Task was created successfully!"
        });
        this.props.history.push('/task')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    return (
      <div>
    
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={this.state.currentTask.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={this.state.currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.creatTask}
            >
              Create
            </button>
            <p>{this.state.message}</p>
          </div>
       
      </div>
    );
  }
}
