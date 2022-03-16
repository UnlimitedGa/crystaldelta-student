import React, { Component } from "react";
import TaskService from "../services/task.service";
import { Link } from "react-router-dom";
export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCompleted = this.onChangeCompleted.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);

    this.state = {
      currentTask: {
        _id: null,
        name: "",
        description: "",
        completed: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
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
  onChangeCompleted(e) {
    const completed = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          completed: completed
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

  getTask(id) {
    TaskService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCompleted(status) {
    var data = {
      name: this.state.currentTask.name,
      description: this.state.currentTask.description,
      completed: status
    };
console.log('data',data)
    TaskService.update(this.state.currentTask._id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            completed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    var data = {
      name: this.state.currentTask.name,
      description: this.state.currentTask.description,
      completed: this.state.currentTask.completed
    };
    TaskService.update(
      this.state.currentTask._id,
      data
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Task was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskService.delete(this.state.currentTask._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/task')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.completed ? "Completed" : "Uncompleted"}
              </div>
            </form>

            {currentTask.completed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(false)}
              >
                UnCompleted
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(true)}
              >
                Completed
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            
            <p>{this.state.message}</p>
            <button
              type="submit"
              className="badge badge-warning"
            >
            <Link
                to={"/task"}
              >
                Back
              </Link>
              </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
