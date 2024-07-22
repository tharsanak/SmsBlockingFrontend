import React, { useState } from "react";
import "../style/BodyStyle.css";
import { HiUserAdd } from "react-icons/hi";
import { GrPowerReset } from "react-icons/gr";
import { IoPlayBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function Activate() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [addBy, setAddBy] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const [id,setId]=useState("");
  // const [reset,setReset]= useState('');

  const handleBack = () => {
    navigate("/");
  };

  const handlePhoneNumberChange = (event) => {
    const enteredValue = event.target.value;
    const numericValue = enteredValue.replace(/\D/g, "");

    // Limit the phone number length to 10 digits
    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
      setIsValid(numericValue.length === 10); 
    }
  };

  const handleAddByChange = (event) => {
    setAddBy(event.target.value);
    setErrorMessage("");
  };

  const handleReset = () => {
    console.log("Reset button clicked");
    setPhoneNumber("");
    setAddBy("");
    setErrorMessage("");
  };

  const AddConfirmationbutton = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleActivate = () => {
      const data = {
        mobileNo: phoneNumber,
        addedBy: addBy,
      };

      axios
        .post("http://localhost:8080/createMobile", data)
        .then((response) => {
          if (response.status === 201) {
            console.log("Activation successful:", response.data);
            const id = response.data.id;
            setErrorMessage("Activated successful");

            navigate(`/Page1/${id}`);
          }
        })
        .catch((error) => {
  console.error("Error activating:", error);
  handleClose();
  if (error.response) {
    const status = error.response.status;
    if (status === 409) {
      setErrorMessage("Phone number already exists");
    } else if (status === 400) {
      const errorMessageFromServer = error.response.data;
      console.log(errorMessage); 
      if (errorMessageFromServer.includes("Phone number cannot be null or empty")) {
        setErrorMessage("Please enter phone number");
      } else {
        setErrorMessage("Invalid request");
      }
    }
  } else if (error.message === "Network Error") {
    setErrorMessage("Network Error. Please try again later.");
  } else {
    setErrorMessage("An unexpected error occurred");
  }
});
    }

    return (
      <>
      
        <button className="Addbutton" onClick={handleShow}>
            <HiUserAdd />  Activate
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{
              color: "#000",
              background: "#f2f2f2",
              "@media (max-width: 768px)": {
                width: "50%",
              },
            }}
          >
            <Modal.Title>Activation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>Are you sure to Activate?</p>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                width: "15%",
                height: "38px",
                border: "1px solid #ced4da",
                fontSize: "14px",
                padding: "0 8px",
                color: "#fff",
                fontWeight: "500",
                textTransform: "none",
                background: "#000060",
                "@media (max-width: 768px)": {
                  width: "60%",
                },
              }}
              onClick={handleActivate}
            >
              Activate
            </Button>
            <Button
              style={{
                width: "15%",
                height: "38px",
                border: "1px solid #ced4da",
                fontSize: "14px",
                padding: "0 8px",
                color: "black",
                fontWeight: "500",
                textTransform: "none",
                background: "#f2f2f2",
                "@media (max-width: 768px)": {
                  width: "60%",
                },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <div className="Bodyblock">
      <div className="box">
        <button className="backButton" onClick={handleBack}>
          &nbsp; <IoPlayBackSharp /> &nbsp;&nbsp;Back
        </button>
        <p className="AddHeading"> SMS Blocking</p>

        <p
          style={{ fontFamily: "monospace", padding: "10px", fontSize: "18px" }}
        >
          Activate SMS Blocking Functionality
          {errorMessage && (
            <p style={{ color: "red" }} className="error-message">
              {errorMessage}
            </p>
          )}
        </p>
        <form>
  <div className="form-group row" style={{ padding: "15px" }}>
    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">
      Phone Number
    </label>
    <div className="col-sm-6">
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        className="form-control" 
      />
      {!isValid && (
        <div style={{ color: "red" }} className="error-message">
          Please enter a valid 10-digit phone number
        </div>
      )}
    </div>
  </div>
  <div className="form-group row" style={{ padding: "15px" }}>
    <label htmlFor="inputNumber" className="col-sm-3 col-form-label">
      Activate By
    </label>
    <div className="col-sm-6">
      <input
        type="text"
        className="form-control"
        id="addedBy"
        placeholder="Enter your name"
        value={addBy}
        onChange={handleAddByChange}
      />
    </div>
  </div>
</form>

        <div style={{ marginTop: "20px", marginLeft: "700px" }}>
        <button className="Resetbutton" onClick={handleReset}>
          &nbsp; <GrPowerReset /> Reset
        </button>
          <AddConfirmationbutton />
        </div>
      </div>
    </div>
  );
}

export default Activate;
