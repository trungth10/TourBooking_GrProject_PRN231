import axios from "axios";

const TOUR_API_BASE_URL = "https://localhost:44389/api/tours";
const TOUR_DETAIL_API_BASE_URL = "https://localhost:44389/api/tourdetails";
const DESTINATION_API_BASE_URL = "https://localhost:44389/api/destinations";
const TOUR_PRICE_API_BASE_URL = "https://localhost:44389/api/tourprices";

class TourService {
  constructor() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  }
  getTours() {
    return axios.get(TOUR_API_BASE_URL);
  }

  getTourById(id) {
    return axios.get(TOUR_API_BASE_URL + "/" + id);
  }

  postTour(tg) {
    return axios.post(TOUR_API_BASE_URL, tg);
  }

  postTourDetail(tg) {
    return axios.post(TOUR_DETAIL_API_BASE_URL, tg);
  }

  postDestination(tg) {
    return axios.post(DESTINATION_API_BASE_URL, tg);
  }

  postTourPrice(tg) {
    return axios.post(TOUR_PRICE_API_BASE_URL, tg);
  }

  updateTour(id, tg) {
    return axios.put(TOUR_API_BASE_URL + "/" + id, tg);
  }
}

export default new TourService();
