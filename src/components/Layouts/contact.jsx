import { useState } from "react";
// import emailjs from "emailjs-com";

import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  RequestPartnershipThunk,
} from "../../redux/slices/Clinic";

const initialState = {
  clinic_name: "",
  email: "",
  message: "",
  contact_number: "",
  contact_person: "",
};
export const Contact = (props) => {
  const [
    { clinic_name, email, message, contact_number, contact_person },
    setState,
  ] = useState(initialState);
  const { success, error } = useSelector((state) => state.clinic);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clinic_name, email, message);
    const formData = new FormData();
    formData.append("clinic_name", clinic_name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("contact_number", contact_number);
    formData.append("contact_person", contact_person);
    dispatch(RequestPartnershipThunk(formData));
    // emailjs
    //   .sendForm(
    //     "service_9xzngdb",
    //     "template_u4ipcrc",
    //     e.target,
    //     "pVGefAq8_Qnz-1YuH"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       clearState();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };

  const onClose = (e) => {
    if (success) {
      clearState();
    }
    dispatch(clearSuccess());
    dispatch(clearError());
  };
  return (
    <div>
      {success && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          name="success"
          onClose={onClose}
        >
          <Alert severity="success" variant="filled">
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          name="error"
          onClose={onClose}
        >
          <Alert severity="success" variant="filled">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      )}
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Be Our Partner</h2>
                <p>
                  Please fill out the form below to send us an email and we will
                  get back to you as soon as possible.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="clinic_name"
                        className="form-control"
                        placeholder="Clinic Name"
                        value={clinic_name}
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="contact_person"
                        className="form-control"
                        placeholder="Contact Person"
                        required
                        value={contact_person}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="contact_number"
                        pattern="^(09|\+639)\d{9}$"
                        className="form-control"
                        placeholder="Contact Number e.g 09xxxxxxxxx or +639xxxxxxxxx"
                        title="Please enter a valid phone number"
                        required
                        value={contact_number}
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    value={message}
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            {/*  <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div> */}
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>

          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href={props.data ? props.data.facebook : "/"}>
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={props.data ? props.data.twitter : "/"}>
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href={props.data ? props.data.youtube : "/"}>
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
