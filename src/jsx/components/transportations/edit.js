import PageTitle from "../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import TransportationService from "../../../services/api/transportation/TransportationService";

const TransEdit = () => {
  const { id } = useParams();

  const history = useHistory();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TransportationService.getTransprotationById(id);
        setTrans(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const updateTrans = (e) => {
    e.preventDefault();
    TransportationService.updateTransprotation(id, trans)
      .then((response) => {
        history.push("/transportations");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <PageTitle
        activeMenu="Edit"
        motherMenu="Transportation"
        pageContent="Edit"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Transportation</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={updateTrans}>
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
                  <div className="form-group"></div>
                  <button className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TransEdit;
