import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
/// Scroll
//import PerfectScrollbar from "react-perfect-scrollbar";

/// Image
import profile from "../../../images/avatar/pic1.jpg";
//import avatar from "../../../images/avatar/1.jpg";
import { Dropdown } from "react-bootstrap";
import LogoutPage from "./Logout";

const Header = ({ onNote }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userDetails")) {
      const obj = JSON.parse(localStorage.getItem("userDetails"));
      setUsername(obj.userName);
    }
  }, []);

  var path = window.location.pathname.split("/");
  var name = path[path.length - 1].split("-");
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes("app")
    ? filterName.filter((f) => f !== "app")
    : filterName.includes("ui")
    ? filterName.filter((f) => f !== "ui")
    : filterName.includes("uc")
    ? filterName.filter((f) => f !== "uc")
    : filterName.includes("basic")
    ? filterName.filter((f) => f !== "basic")
    : filterName.includes("jquery")
    ? filterName.filter((f) => f !== "jquery")
    : filterName.includes("table")
    ? filterName.filter((f) => f !== "table")
    : filterName.includes("page")
    ? filterName.filter((f) => f !== "page")
    : filterName.includes("email")
    ? filterName.filter((f) => f !== "email")
    : filterName.includes("ecom")
    ? filterName.filter((f) => f !== "ecom")
    : filterName.includes("chart")
    ? filterName.filter((f) => f !== "chart")
    : filterName.includes("editor")
    ? filterName.filter((f) => f !== "editor")
    : filterName;
  return (
    <div className="header">
      <div className="header-content">
        <nav className="navbar navbar-expand">
          <div className="collapse navbar-collapse justify-content-between">
            <div className="header-left">
              <div
                className="dashboard_bar"
                style={{ textTransform: "capitalize" }}
              >
                {finalName.join(" ").length === 0
                  ? "Dashboard"
                  : finalName.join(" ") === "dashboard dark"
                  ? "Dashboard"
                  : finalName.join(" ")}
              </div>
            </div>
            <ul className="navbar-nav header-right main-notification">
              <Dropdown as="li" className="nav-item dropdown header-profile">
                <Dropdown.Toggle
                  variant=""
                  as="a"
                  className="nav-link i-false c-pointer"
                >
                  {/* <img src={profile} width={20} alt="" /> */}
                  <div className="header-info ms-3">
                    <span>{username}</span>
                    {/* <small>Superadmin</small> */}
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  align="right"
                  className="mt-3 dropdown-menu dropdown-menu-end"
                >
                  <LogoutPage />
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
