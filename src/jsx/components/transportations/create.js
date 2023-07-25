import PageTitle from "../../layouts/PageTitle";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

//import swal from "sweetalert";

import TransportationService from "../../../services/api/transportation/TransportationService";

const TransCreate = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //Use State For Create Subject
  const [trans, setTrans] = useState({
    transportationType: "",
    transportationDescription: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTrans({
      ...trans,
      [e.target.name]: value,
    });
  };

  const saveSubjects = (e) => {
    e.preventDefault();

    dispatch(loadingToggleAction(true));
    TransportationService.postTransprotation(trans)
      .then((response) => {
        history.push("/transportations");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(trans);
  };

  const reset = (e) => {
    e.preventDefault();
    setTrans({
      transportationType: "",
      transportationDescription: "",
    });
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Transportation"
        motherMenu="Transportation"
        pageContent="Create New Transportation"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Transportation</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveSubjects}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Type
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="transportationType"
                        onChange={(e) => handleChange(e)}
                        value={trans.transportationType}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="transportationDescription"
                        onChange={(e) => handleChange(e)}
                        value={trans.transportationDescription}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="me-2 btn btn-primary">Save</button>
                    <button onClick={reset} className="me-2 btn btn-dark">
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(TransCreate);
