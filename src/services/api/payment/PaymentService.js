import axios from "axios";

const PAYMENTS_API_BASE_URL = "https://localhost:44389/api/Payments";

class PaymentService {
  getPayments() {
    return axios.get(PAYMENTS_API_BASE_URL);
  }

  getPaymentById(id) {
    return axios.get(PAYMENTS_API_BASE_URL + "/" + id);
  }

  postPayment(tg) {
    return axios.post(PAYMENTS_API_BASE_URL, tg);
  }

  updatePayment(id, tg) {
    return axios.put(PAYMENTS_API_BASE_URL + "/" + id, tg);
  }

  updateStatus(id, status) {
    return axios.put(
      PAYMENTS_API_BASE_URL + "/" + id + "/update-status/" + status
    );
  }
}

export default new PaymentService();
