import React, { useState } from "react";
import "../style/BodyStyle.css";
import { GrPowerReset } from "react-icons/gr";
import { IoPlayBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiMinus } from "react-icons/bi";
import PhoneInput from 'react-phone-number-input/input'
import "react-phone-number-input/style.css";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Delete() {
  const DeleteConfirmationbutton = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
      const data = {
        blacklistMobile: phoneNumber,
        deactivatedBy: deactivatedBy,
      };
  
      axios
        .put(`http://localhost:8080/deleteBlacklistMobile/${phoneNumber}`, data)
        .then((response) => {
          console.log('Deletion successful:', response.data);
          setShow(false); 
          window.location.reload();
          setErrorMessage("Deleted successfully");
        })
          .catch((error) => {
            console.error('Error deleting:', error);
            handleClose();
            if (error.response) {
              setErrorMessage(error.response.data); 
            } else {
              setErrorMessage("Invalid request"); 
            }
          });
    };
    return (
      <>
        <button className="Addbutton" onClick={handleShow}>
           &nbsp; <BiMinus />  Delete
        </button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header
            closeButton
            style={{  color: "#000",background: "#f2f2f2",
            "@media (max-width: 768px)": {
              width: "50%",
            },}}
          >
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>Are you sure to delete?</p>
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
              onClick={handleDelete}
            >
              Delete
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
  const [deactivatedBy, setDeactivatedBy]= useState("");
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleBack = () => {
    navigate(`/Page1/${id}`);
  };
  

  const handlePhoneNumberChange = (event) => {
    const enteredValue = event.target.value;
    const numericValue = enteredValue.replace(/\D/g, "");

    if (numericValue.length <= 10) {
      setPhoneNumber(numericValue);
      setIsValid(numericValue.length === 10); 
    }
  };
  const handleDeactivatedByChange = (event) => {
    setDeactivatedBy(event.target.value);
    setErrorMessage("");
  };

  const handleReset = () => {
    setPhoneNumber("");
    setDeactivatedBy("");
    setErrorMessage("");
  };

  

  return (
    <div className="Bodyblock">
      <div className="box">
        <button className="backButton" onClick={handleBack}>
          <IoPlayBackSharp />
          &nbsp;&nbsp;Back
        </button>
        <p className="AddHeading"> SMS Blocking</p>
        <p
          style={{ fontFamily: "monospace", padding: "10px", fontSize: "18px" }}
        >
          Deleting Numbers from your Block List
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        </p>
        <form>
          <div className="form-group row" style={{ padding: "15px" }}>
            <label htmlFor="inputNumber" className="col-sm-3 col-form-label">
              Phone Number
            </label>
            {/* <div className="col-sm-6">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className={isValid ? "form-control" : "form-control is-invalid"}
              />
              {!isValid && (
                <div className="invalid-feedback">
                  Please enter a valid phone number.
                </div>
              )}
            </div> */}
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
              Delete By
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="addedBy"
                placeholder="Enter your name"
                value={deactivatedBy}
                onChange={handleDeactivatedByChange}

              />
            </div>
          </div>
        </form>
        <div style={{ marginTop: "20px", marginLeft: "700px" }}>
        <button className="Resetbutton" onClick={handleReset}>
          &nbsp; <GrPowerReset /> Reset
        </button>
          <DeleteConfirmationbutton/>
        </div>
      </div>
    </div>
  );
}

export default Delete;
