
import instance from "../axios";
class TaskService {
  getAll(id) {
    return instance.get(`/student/${id}/tasks`);
  }
  get(id) {
    return instance.get(`/student/${id}`);
  }
  create(data) {
    return instance.post("/student", data);
  }

  update(id, data) {
    return instance.put(`/student/${id}`, data);
  }

  delete(id) {
    return instance.delete(`/student/${id}`);
  }
}

export default new TaskService();