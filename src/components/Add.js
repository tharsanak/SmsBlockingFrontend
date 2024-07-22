import React, { useState } from "react";
import "../style/BodyStyle.css";
import { MdAdd } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";
import { IoPlayBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { Modal, Button } from "react-bootstrap";
import { PatternFormat } from "react-number-format";
import axios from "axios";
import { useParams } from "react-router-dom";

{/* <PatternFormat
  format="+1 (###) ###-####"
  value="123456789"
  valueIsNumericString={true}
/>; */}

function Add() {
  const AddConfirmationbutton = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAdd = () => {
      const data = {
        blacklistMobile: phoneNumber,
        addedBy: addBy,
      };

      axios
        .post(`http://localhost:8080/createBlockMobile/${id}`, data)
        .then((response) => {
          console.log("Activation successful:", response.data);
          setErrorMessage("Added successfully");
          handleClose();
          window.location.reload();
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
              console.log("Error message from server:", errorMessageFromServer); 
              if (typeof errorMessageFromServer === 'string' && errorMessageFromServer.includes("Phone number cannot be null or empty")) {
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
        
        
    };
    return (
      <>
        {/* <button
          type="button"
          className="btn btn-secondary btn-sm AddButton"
          onClick={handleShow}
        >
          <MdAdd /> Add
        </button> */}
           <button className="Addbutton" onClick={handleShow}>
           &nbsp; <MdAdd />  Add
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
            <Modal.Title>Add To Block List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>Are you sure to Add?</p>
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
              onClick={handleAdd}
            >
              Add
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

  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [addBy, setAddBy] = useState("");
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    navigate(`/Page1/${id}`);
  };
  // const formatPhoneNumber = (event) => {
  //   if (!event) return event;

  //   const cleaned = event.replace(/\D/g, ""); // Remove non-numeric characters
  //   const formattedValue = `${cleaned.slice(0, 3)} ${cleaned.slice(
  //     3,
  //     6
  //   )} ${cleaned.slice(6, 10)}`;
  //   return formattedValue;
  // };

  const handlePhoneNumberChange = (event) => {
    const enteredValue = event.target.value;
    const numericValue = enteredValue.replace(/\D/g, "");

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
          Adding Numbers to your Block List
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
            {/* <p>Formatted Phone Number: {formatPhoneNumber(phoneNumber)}</p> */}
          </div>

          <div className="form-group row" style={{ padding: "15px" }}>
            <label htmlFor="inputNumber" className="col-sm-3 col-form-label">
              Add By
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
          {/* <button
            type="button"
            className="btn btn-primary btn-sm ResetButton"
            style={{ marginRight: "10px" }}
            onClick={handleReset}
          >
            <GrPowerReset /> Reset
          </button> */}
          <button className="Resetbutton" onClick={handleReset}>
          &nbsp; <GrPowerReset /> Reset
        </button>
          <AddConfirmationbutton />
        </div>
      </div>
    </div>
  );
}

export default Add;
