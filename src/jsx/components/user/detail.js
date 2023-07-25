import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useParams } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";
import UserService from "../../../services/api/user/UserService";

const UserDetail = () => {
  const { id } = useParams();

  const [activeToggle, setActiveToggle] = useState("aboutMe");

  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(id);
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="User" />

      <div className="row">
        <div className="col-lg-">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              {/* <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div> */}
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={users.avatar}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h2 className="text-primary mb-0">{users.firstName}</h2>
                    <h4>User</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("aboutMe")}
                    >
                      <Link
                        to="#about-me"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "aboutMe" ? "active show" : ""
                        }`}
                      >
                        Information
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "aboutMe" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-personal-info mt-4">
                        <h3 className="text-primary mb-4">Personal Detail</h3>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Full Name<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">
                              {users.firstName + " " + users.lastName}
                            </h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Phone<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{users.phone}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Email<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{users.email}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Location
                              <span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{users.city}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserDetail;
