import PageTitle from "../../layouts/PageTitle";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";
import TourGuideService from "../../../services/api/tour-guide/TourGuideService";
import TourService from "../../../services/api/tour/TourService";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";

//import swal from "sweetalert";

const TourGuideCreate = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await TourService.getTours();
      setTours(response.data.data);
    };
    fetchData();
  }, []);

  const [tourGuides, setTourGuides] = useState({
    tourGuideName: "",
    tourGuideAge: "",
    tourGuidePhone: "",
    tourGuideEmail: "",
    tourGuideLanguageSpoken: "",
    tourGuideAva: "",
    tourGuideBio: "",
    tourId: 2,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTourGuides({
      ...tourGuides,
      [e.target.name]: value,
    });
  };

  const saveTourGuides = (e) => {
    e.preventDefault();
    dispatch(loadingToggleAction(true));
    const imageRef = ref(
      storage,
      `images/guide/${tourGuides.tourGuideAva.name + v4()}`
    );
    uploadBytes(imageRef, tourGuides.tourGuideAva).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const updatedTourGuide = {
          ...tourGuides,
          tourGuideAva: url, // Set the URL of the uploaded image to tourGuideAva
        };
        setTourGuides(updatedTourGuide);

        TourGuideService.postTourGuide(updatedTourGuide)
          .then((response) => {
            history.push("/tour-guides");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setTourGuides({
      tourGuideName: "",
      tourGuideAge: "",
      tourGuidePhone: "",
      tourGuideEmail: "",
      tourGuideLanguageSpoken: "",
      tourGuideAva: "",
      tourGuideBio: "",
      tourId: "",
    });
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Tour Guides"
        motherMenu="Tour Guides"
        pageContent="Create New Tour Guides"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Tour Guides</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveTourGuides}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourGuideName"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuideName}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Age
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourGuideAge"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuideAge}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourGuidePhone"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuidePhone}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="tourGuideEmail"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuideEmail}
                        required
                      />
                    </div>
                    {/* <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Tour
                      </label>
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourId}
                        name="tourId"
                        required
                      >
                        <option value="" disabled>
                          Choose Tour
                        </option>
                        {tours &&
                          tours.map((t) => (
                            <option value={t.id} key={t.id}>
                              {t.tourName}
                            </option>
                          ))}
                      </select>
                    </div> */}
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Language Spoken
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="tourGuideLanguageSpoken"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuideLanguageSpoken}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Bio
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="tourGuideBio"
                        onChange={(e) => handleChange(e)}
                        value={tourGuides.tourGuideBio}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Avatar
                      </label>
                      <div className="from-file">
                        <input
                          type="file"
                          name="tourGuideAva"
                          className="form-file-input form-control"
                          required
                          onChange={(e) =>
                            setTourGuides({
                              ...tourGuides,
                              tourGuideAva: e.target.files[0],
                            })
                          }
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
export default connect(mapStateToProps)(TourGuideCreate);
