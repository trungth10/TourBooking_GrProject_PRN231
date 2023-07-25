import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import TourService from "../../../services/api/tour/TourService";
import Loader from "../../loader";
import product1 from "../../../images/product/1.jpg";

import { loadingToggleAction } from "../../../store/actions/AuthActions";
import BookingService from "../../../services/api/booking/BookingService";
import { Button } from "react-bootstrap";
import PaymentService from "../../../services/api/payment/PaymentService";

const BookingDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [bookings, setBookings] = useState({});
  const [statuss, setStatuss] = useState(2);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadingToggleAction(true));
      try {
        const response = await BookingService.getBookingById(id);
        setBookings(response.data.data);
      } catch (error) {
        console.log(error);
      }
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, [id]);

  const handleUpdate = (id, status) => {
    if (id) {
      PaymentService.updateStatus(id, status);
      history.push("/bookings");
      setBookings({ ...bookings });
    }
  };

  console.log(bookings);

  return (
    <>
      {props.showLoading && <Loader />}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-xl-3 col-lg-6  col-md-6 col-xxl-5 ">
                  {bookings.payments &&
                    Array.isArray(bookings.payments) &&
                    bookings.payments.map((img, index) => {
                      return (
                        <div key={index}>
                          <img
                            className="img-fluid"
                            src={img.paymentImage}
                            alt=""
                          />
                        </div>
                      );
                    })}
                </div>

                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                  <div className="product-detail-content">
                    {/*Product details*/}
                    <div className="new-arrival-content pr">
                      <h4>
                        {bookings.customer && bookings.customer.firstName}
                      </h4>
                      {/* <div className="d-table mb-2">
                        <p className="price float-left d-block">$325.00</p>
                      </div> */}
                      <p>
                        Phone:{" "}
                        <span className="item">
                          {bookings.customer && bookings.customer.phone}
                        </span>
                      </p>
                      <p>
                        Email:{" "}
                        <span className="item">
                          {bookings.customer && bookings.customer.email}
                        </span>
                      </p>
                      <p>
                        Address:{" "}
                        <span className="item">
                          {bookings.customer && bookings.customer.address}
                        </span>
                      </p>
                      <p>
                        Tour:{" "}
                        <span className="item">
                          {bookings.tour && bookings.tour.tourName}
                        </span>
                      </p>
                      {/* <div className="filtaring-area my-3">
                        <div className="size-filter">
                          <h4 className="m-b-15">Select size</h4>
                        </div>
                      </div> */}
                    </div>
                    {bookings.payments &&
                      Array.isArray(bookings.payments) &&
                      bookings.payments.map((pay) => {
                        return pay.status === 1 ? (
                          <div className="shopping-cart mt-3">
                            <Button
                              onClick={() => handleUpdate(id, statuss)}
                              className="btn btn-primary btn-lg"
                              to="/ecom-product-detail"
                            >
                              Confirm
                            </Button>
                          </div>
                        ) : pay.status === 2 ? (
                          <div className="filtaring-area my-3">
                            <div className="size-filter">
                              <h4 className="m-b-15 text-success">CONFIRMED</h4>
                            </div>
                          </div>
                        ) : (
                          ""
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* review */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(BookingDetail);
