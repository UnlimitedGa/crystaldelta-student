import React, { Component } from "react";
import TaskService from "../services/task.service";
import { Link } from "react-router-dom";
import LocalStorageService from "../LocalStorageService";
const userId=LocalStorageService.getUserId();
export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  retrieveTasks() {
    TaskService.getAll(userId)
      .then(response => {
        this.setState({
          tasks: response.data.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);

      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }



  render() {
    const {  tasks, currentTask, currentIndex } = this.state;
console.log('tasks',tasks)
    return (
      <div className="list row col-md-12">
        <div className="col-md-6">
          <h4>Task List</h4>
          </div>
          <div className="col-md-6">
          <Link
                to={"/task-add"}
                className="badge badge-info"
              >
                Add Task
              </Link>
          </div>
        <div className="col-md-6">    
          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentTask ? (
            <div>
              <h4>Task</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentTask.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask.completed ? "Completed" : "Uncompleted"}
              </div>

              <Link
                to={"/task/" + currentTask._id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>No tasks found...</p>
            </div>
          )}
        </div>
        
      </div>
    );
  }
}
