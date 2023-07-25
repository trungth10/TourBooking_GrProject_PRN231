import axios from "axios";

const USER_API_BASE_URL = "https://localhost:44389/api/accounts";

class UserService {
  constructor() {
    axios.defaults.headers.common["Authorization"] = `${localStorage.getItem(
      "jwtToken"
    )}`;
  }

  getUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  getUserById(id) {
    return axios.get(USER_API_BASE_URL + "/" + id);
  }

  postUser(trans) {
    return axios.post(USER_API_BASE_URL, trans);
  }

  updateUser(id, trans) {
    return axios.put(USER_API_BASE_URL + "/" + id, trans);
  }
}

export default new UserService();
