import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

//import pic11 from './../../../images/hotel/pic11.jpg';

import BookingService from "../../../services/api/booking/BookingService";

const DropdownBlog = () => {
  return (
    <>
      <Dropdown className="dropdown">
        <Dropdown.Toggle
          as="div"
          className="btn-link i-false"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
              stroke="#262626"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
              stroke="#262626"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
              stroke="#262626"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item className="dropdown-item">Edit</Dropdown.Item>
          <Dropdown.Item className="dropdown-item">Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

const Booking = (props) => {
  const dispatch = useDispatch();

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setBookings(search);
    } else {
      const filterResult = search.filter((item) =>
        item.customer.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      setBookings(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadingToggleAction(true));

      try {
        const response = await BookingService.getBookings();
        setBookings(response.data.data);
        setSearch(response.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, []);

  const sort = 5;
  let paggination = Array(Math.ceil(bookings.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    bookings.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = bookings.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = bookings.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  });
  return (
    <>
      {props.showLoading && <Loader />}

      <Tab.Container defaultActiveKey="All">
        <div className="row">
          <div className="col-xl-12">
            <div className="d-flex mb-4 justify-content-between align-items-center flex-wrap">
              <div className="table-search">
                <div className="input-group search-area mb-xxl-0 mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here"
                    value={filterValue}
                    onInput={(e) => handleFilter(e)}
                  />
                  <span className="input-group-text">
                    <i className="flaticon-381-search-2"></i>
                  </span>
                </div>
              </div>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="table-responsive">
                  <div
                    id="room_wrapper"
                    className="dataTables_wrapper no-footer"
                  >
                    <table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">
                      <thead>
                        <tr role="row">
                          <th>Customer</th>
                          <th>Total Price</th>
                          <th>Booking Date</th>
                          <th>Tour</th>
                          <th>Status</th>
                          <th className="bg-none"></th>
                        </tr>
                      </thead>
                      {!loading && (
                        <tbody>
                          {jobData.current.map((pays) => {
                            return (
                              <tr role="row" className="odd" key={pays.id}>
                                <td>
                                  <div className="media-bx">
                                    <img
                                      className="me-3 rounded"
                                      src={pays.customer.avatar}
                                      alt=""
                                    />
                                    <div>
                                      <h4 className="mb-0 mt-1">
                                        <Link
                                          to={`./${pays.id}-booking-detail`}
                                          className="text-black"
                                        >
                                          {pays.customer.firstName}
                                        </Link>
                                      </h4>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5>{pays.totalPrice}đ</h5>
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    <h5>
                                      {new Date(
                                        pays.bookingDate
                                      ).toLocaleDateString()}
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <span className="fs-16">
                                    {pays.tour.tourName}
                                  </span>
                                </td>
                                <td>
                                  {pays.payments.map((pay, index) => (
                                    <div key={index}>
                                      <span
                                        className={
                                          pay.status === 1
                                            ? "text-warning fw-bold"
                                            : pay.status === 2
                                            ? "text-success font-w600"
                                            : "text-danger font-w600"
                                        }
                                      >
                                        {pay.status === 0
                                          ? "PENDING"
                                          : pay.status === 2
                                          ? "FINISH"
                                          : "EXPIRED"}
                                      </span>
                                    </div>
                                  ))}
                                </td>
                                {/* <td>
                                  <DropdownBlog id={pays.id} />
                                </td> */}
                              </tr>
                            );
                          })}
                        </tbody>
                      )}
                    </table>
                    <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                      <div className="dataTables_info">
                        Showing {activePag.current * sort + 1} to{" "}
                        {bookings.length > (activePag.current + 1) * sort
                          ? (activePag.current + 1) * sort
                          : bookings.length}{" "}
                        of {bookings.length} entries
                      </div>
                      <div
                        className="dataTables_paginate paging_simple_numbers mb-0"
                        id="example2_paginate"
                      >
                        <Link
                          className="paginate_button previous disabled"
                          to="/bookings"
                          onClick={() =>
                            activePag.current > 0 &&
                            onClick(activePag.current - 1)
                          }
                        >
                          <i className="fa fa-angle-double-left"></i> Previous
                        </Link>
                        <span>
                          {paggination.map((number, i) => (
                            <Link
                              key={i}
                              to="/bookings"
                              className={`paginate_button  ${
                                activePag.current === i ? "current" : ""
                              } `}
                              onClick={() => onClick(i)}
                            >
                              {number}
                            </Link>
                          ))}
                        </span>

                        <Link
                          className="paginate_button next"
                          to="/bookings"
                          onClick={() =>
                            activePag.current + 1 < paggination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          Next <i className="fa fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};
export { DropdownBlog };
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Booking);
