import axios from "axios";

const TRANSPORTATION_API_BASE_URL =
  "https://localhost:44389/api/transportations";

class TransportationService {
  constructor() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  }

  getTransprotations() {
    return axios.get(TRANSPORTATION_API_BASE_URL);
  }

  getTransprotationById(id) {
    return axios.get(TRANSPORTATION_API_BASE_URL + "/" + id);
  }

  postTransprotation(trans) {
    return axios.post(TRANSPORTATION_API_BASE_URL, trans);
  }

  updateTransprotation(id, trans) {
    return axios.put(TRANSPORTATION_API_BASE_URL + "/" + id, trans);
  }
}

export default new TransportationService();
