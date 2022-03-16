import http from "../http-common";

class loginService {

  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post(`/user/register`, data);
  }

  logout(id) {
    return http.post(`/user/logout/${id}`);
  }
}

export default new loginService();