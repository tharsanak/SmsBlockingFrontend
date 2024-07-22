import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/BodyStyle.css";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdDelete } from "react-icons/md";
import { IoPlayBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function BodyView() {
  const DeleteConfirmationbutton = ({ blacklistMobile }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
      const data = {
        blacklistMobile: blacklistMobile,
      };

      axios
        .put(
          `http://localhost:8080/deleteBlacklistMobile/${blacklistMobile}`,
          data
        )
        .then((response) => {
          console.log("Deletion successful:", response.data);
          setShow(false); 
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    };
    return (
      <>
        <MdDelete onClick={handleShow} />

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
  const { id } = useParams();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/Page1/${id}`);
  };
  const [blockedList, setBlockedList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/mobile/${id}`);

        setBlockedList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="Bodyblock">
      <h5>Blocked Incoming SMS Information</h5>
      <button className="backButton" onClick={handleBack}>
        <IoPlayBackSharp />
        &nbsp;&nbsp;Back
      </button>
      <br></br>
      <div className="my-customer-table-container">
        <Table className="my-customer-table" striped bordered hover>
          <thead>
            <tr>
              <th className="my-customer-table-th">
                <b>Blocked Date</b>
              </th>
              <th className="my-customer-table-th">
                <b>Phone number</b>
              </th>
              <th className="my-customer-table-th">
                <b>Action </b>
              </th>
            </tr>
          </thead>
          <tbody>
            {blockedList.map((blockedlist, index) => (
              <tr key={index}>
                <td>{blockedlist.activatedOn}</td>
                <td>{blockedlist.blacklistMobile}</td>
                <td align="center">
                  <DeleteConfirmationbutton
                    blacklistMobile={blockedlist.blacklistMobile}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BodyView;
