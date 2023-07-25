import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import TourService from "../../../services/api/tour/TourService";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";
import { Row, Col, Card, Carousel, ListGroup } from "react-bootstrap";

const TourDetail = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [tours, setTours] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadingToggleAction(true));
      try {
        const response = await TourService.getTourById(id);
        setTours(response.data.data);
      } catch (error) {
        console.log(error);
      }
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, [id]);

  return (
    <>
      {props.showLoading && <Loader />}
      <div className="row">
        <div className="col-xl-9 col-xxl-8">
          <div className="card">
            {/* <div className="card-header border-0 pb-0">
              <h4 className="card-title">Current Booking</h4>
            </div> */}
            <div className="card-body">
              <Carousel>
                {tours &&
                  tours.tourDetails &&
                  tours.tourDetails.map((des) =>
                    des.destination.destinationImages.map((image, i) => (
                      <Carousel.Item key={i}>
                        <img
                          src={image.image}
                          className="d-block w-100"
                          alt={`Slide ${i + 1}`}
                          style={{ height: "400px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))
                  )}
              </Carousel>

              <div className="d-flex mt-4 flex-wrap">
                <h5 className="card-title me-auto">{tours.tourName}</h5>
                {tours &&
                  tours.tourDetails &&
                  tours.tourDetails.map((date) => (
                    <h4 className="card-title">
                      Expired Date:{" "}
                      {new Date(date.expiredDate).toLocaleDateString()}
                    </h4>
                  ))}
              </div>
            </div>
            <div className="card-body d-flex pt-0 align-items-center flex-wrap">
              <div className="d-sm-flex d-block align-items-center">
                <div className="me-5 mb-sm-0 mb-3">
                  <p className="mb-2">
                    <i className="far fa-user scale3 me-3"></i>Tour Capacity
                  </p>
                  <h4 className="mb-0 card-title">
                    {tours.tourCapacity} People
                  </h4>
                </div>
                <div className="me-5 mb-sm-0 mb-3">
                  <p className="mb-2">
                    <i className="fas fa-bed scale3 me-3"></i>Duration
                  </p>
                  <h4 className="mb-0 card-title">{tours.tourDuration} Days</h4>
                </div>
              </div>
              {tours &&
                tours.tourDetails &&
                tours.tourDetails.map((d, index) => (
                  <React.Fragment key={index}>
                    <div className="me-5 mb-sm-0 mb-3">
                      <p className="mb-2">
                        <i className="far fa-calendar-minus scale3 me-3"></i>
                        Start Date
                      </p>
                      <h4 className="mb-0 card-title">
                        {new Date(d.startDate).toLocaleDateString()}
                      </h4>
                    </div>
                    <div className="me-5 mb-sm-0 mb-3">
                      <div>
                        <p className="mb-2">
                          <i className="far fa-calendar-minus scale3 me-3"></i>
                          End Date
                        </p>
                        <h4 className="mb-0 card-title">
                          {new Date(d.endDate).toLocaleDateString()}
                        </h4>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              <div className="mt-5">
                <h4 className="card-title me-auto">Description</h4>
                {tours.tourDetails &&
                  tours.tourDetails.map((t, index) => (
                    <span key={index}>{t.tourDescription}</span>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4">
          <div className="card profile-card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <img
                  src={tours.tourGuide && tours.tourGuide.tourGuideAva}
                  alt=""
                  className="rounded profile-img me-4"
                />
                <div>
                  {/* <h5 className="text-primary">#GS-2234</h5> */}
                  <h4 className="mb-0">
                    {tours.tourGuide && tours.tourGuide.tourGuideName}
                  </h4>
                </div>
              </div>
              <div className="row mt-4 pt-3">
                <div className="col-12">
                  <Link
                    to={`${
                      tours.tourGuide && tours.tourGuide.id
                    }-tour-guides-detail`}
                    className="btn btn-dark light btn-block"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
              <ul className="user-info-list">
                <li>
                  <i className="fas fa-phone-volume"></i>
                  <span>
                    {tours.tourGuide && tours.tourGuide.tourGuidePhone}
                  </span>
                </li>
                <li>
                  <i className="far fa-envelope"></i>
                  <span className="overflow-hidden">
                    {tours.tourGuide && tours.tourGuide.tourGuideEmail}
                  </span>
                </li>
              </ul>
            </div>

            <div className="card-body">
              <h4 className="text-align-center">More Information</h4>
              {tours &&
                tours.tourDetails &&
                tours.tourDetails.map((detail, i) => (
                  <ul className="list-group list-group-flush" key={i}>
                    {/* <li className="list-group-item">
                      <span className="mb-0 title">Expired Date</span> :
                      <span className="text-black ms-2">
                        {new Date(detail.expiredDate).toLocaleDateString()}
                      </span>
                    </li> */}
                    <li className="list-group-item">
                      <span className="mb-0 title">Destination</span> :
                      <span className="text-black ms-2">
                        {detail.destination.name}
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span className="mb-0 title">Transportation</span> :
                      <span className="text-black ms-2">
                        {detail.transportation.transportationType}
                      </span>
                    </li>
                  </ul>
                ))}
              <h4 className="text-align-center mt-3">Price</h4>
              {tours &&
                tours.tourPrices &&
                tours.tourPrices.map((price, i) => (
                  <ul className="list-group list-group-flush" key={i}>
                    <li className="list-group-item">
                      <span className="mb-0 title">Price Adults</span> :
                      <span className="text-black ms-2">
                        {price.priceAdults}đ
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span className="mb-0 title">Price Children</span> :
                      <span className="text-black ms-2">
                        {price.priceChildren}đ
                      </span>
                    </li>
                    <li className="list-group-item">
                      <span className="mb-0 title">Price Infants</span> :
                      <span className="text-black ms-2">
                        {price.priceInfants === 0 ? "Free" : price.priceInfants}
                        đ
                      </span>
                    </li>
                  </ul>
                ))}
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(TourDetail);
