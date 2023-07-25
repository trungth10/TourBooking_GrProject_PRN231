import PageTitle from "../../layouts/PageTitle";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";
import TourGuideService from "../../../services/api/tour-guide/TourGuideService";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import TransportationService from "../../../services/api/transportation/TransportationService";
import TourService from "../../../services/api/tour/TourService";

//import swal from "sweetalert";

const TourCreate = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [trans, setTrans] = useState([]);
  const [guide, setGuide] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await TransportationService.getTransprotations();
      setTrans(response.data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await TourGuideService.getTourGuides();
      setGuide(response.data.data);
    };
    fetchData();
  }, []);

  const [tours, setTours] = useState({
    tourName: "",
    tourDuration: "",
    tourCapacity: "",
    status: 1,
    tourGuideId: "",
  });

  const [tourDetails, setTourDetails] = useState({
    tourId: "",
    startDate: "",
    endDate: "",
    departure: "",
    destinationId: "",
    expiredDate: "",
    transportationId: "",
    tourDescription: "",
  });

  const [des, setDes] = useState({
    name: "",
    region: "",
    description: "",
    destinationImages: [],
  });

  const [prices, setPrices] = useState({
    tourId: "",
    priceAdults: "",
    priceChildren: "",
    priceInfants: "",
  });

  const [images, setImages] = useState();

  useEffect(() => {
    // Set the minimum value of the start date input to the current date
    const today = new Date().toISOString().substr(0, 10);
    const startDateInput = document.querySelector('input[name="startDate"]');
    const endDateInput = document.querySelector('input[name="endDate"]');
    const expiredDateInput = document.querySelector(
      'input[name="expiredDate"]'
    );

    startDateInput.setAttribute("min", today);
    endDateInput.setAttribute("min", today);
    expiredDateInput.setAttribute("min", today);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setTours({
      ...tours,
      [e.target.name]: value,
    });
  };

  const handleChangeDes = (e) => {
    const value = e.target.value;
    setDes({
      ...des,
      [e.target.name]: value,
    });
  };

  const handleChangeDetail = (e) => {
    const value = e.target.value;

    setTourDetails({
      ...tourDetails,
      [e.target.name]: value,
    });
  };

  const handleChangePrice = (e) => {
    const value = e.target.value;
    setPrices({
      ...prices,
      [e.target.name]: value,
    });
  };

  const saveTours = async (e) => {
    e.preventDefault();
    dispatch(loadingToggleAction(true));
    const imageUrls = [];

    for (let i = 0; i < images.length; i++) {
      const imageRef = ref(storage, `images/tour/${images[i].name + v4()}`);
      const snapshot = await uploadBytes(imageRef, images[i]);
      const url = await getDownloadURL(snapshot.ref);
      imageUrls.push({ image: url });
    }

    const updateDes = {
      ...des,
      destinationImages: imageUrls,
    };

    TourService.postDestination(updateDes)
      .then((response) => {
        const desResponse = response.data.data;

        TourService.postTour(tours)
          .then((response) => {
            const tourResponse = response.data.data;
            const desId = desResponse.id;
            const tourId = tourResponse.id;
            const updateTourDetail = {
              ...tourDetails,
              destinationId: desId,
              tourId: tourId,
            };
            const updatePrice = {
              ...prices,
              tourId: tourId,
            };
            console.log(tourResponse);
            TourService.postTourDetail(updateTourDetail)
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });

            TourService.postTourPrice(updatePrice)
              .then((response) => {
                history.push("/tours");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Tour"
        motherMenu="Tour"
        pageContent="Create New Tour"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Tour</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveTours}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Tour Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourName"
                        onChange={(e) => handleChange(e)}
                        value={tours.tourName}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Tour Guide
                      </label>
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => handleChange(e)}
                        value={tours.tourGuideId}
                        name="tourGuideId"
                        required
                      >
                        <option value="" disabled>
                          Choose Tour Guide
                        </option>
                        {guide &&
                          guide.map((t) => (
                            <option value={t.id} key={t.id}>
                              {t.tourGuideName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Duration
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourDuration"
                        onChange={(e) => handleChange(e)}
                        value={tours.tourDuration}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Capacity
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourCapacity"
                        onChange={(e) => handleChange(e)}
                        value={tours.tourCapacity}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Departure
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="departure"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.departure}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="startDate"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.startDate}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="endDate"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.endDate}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Expired Date
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg"
                        name="expiredDate"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.expiredDate}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Tour Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="tourDescription"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.tourDescription}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Destination
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        onChange={(e) => handleChangeDes(e)}
                        value={des.name}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Transportation
                      </label>
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => handleChangeDetail(e)}
                        value={tourDetails.transportationId}
                        name="transportationId"
                        required
                      >
                        <option value="" disabled>
                          Choose Transportation
                        </option>
                        {trans &&
                          trans.map((t) => (
                            <option value={t.id} key={t.id}>
                              {t.transportationType}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Destination Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="description"
                        onChange={(e) => handleChangeDes(e)}
                        value={des.description}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Region
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="region"
                        onChange={(e) => handleChangeDes(e)}
                        value={des.region}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Price Adults
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="priceAdults"
                        onChange={(e) => handleChangePrice(e)}
                        value={prices.priceAdults}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Price Children
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="priceChildren"
                        onChange={(e) => handleChangePrice(e)}
                        value={prices.priceChildren}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Price Infants
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="priceInfants"
                        onChange={(e) => handleChangePrice(e)}
                        value={prices.priceInfants}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Images
                      </label>
                      <div className="from-file">
                        <input
                          type="file"
                          //name="des"
                          multiple
                          className="form-file-input form-control"
                          required
                          onChange={(e) => setImages(e.target.files)}
                        />
                      </div>
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
export default connect(mapStateToProps)(TourCreate);
