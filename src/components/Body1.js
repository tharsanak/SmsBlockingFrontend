import React, { useState } from 'react';
import '../style/BodyStyle.css';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import { BiMinus } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiUserRemove } from "react-icons/hi";
import { IoPlayBackSharp } from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { HiUserAdd } from "react-icons/hi";
import { useParams } from 'react-router-dom';


function Body1() {
  const navigate = useNavigate();
  const DeactivateConfirmationbutton = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = () => {
      navigate('/');
      setShow(false);
    }
    const titleStyle = {
      fontFamily: "monospace",
      fontSize: "20px",
      fontWeight: 'bold',

    };

    const contentStyle = {
      fontFamily: "sans-serif",

    };
   
    return (
      <>
        <button className='buttonBlock' onClick={handleShow}> <HiUserRemove /> Deactivate </button>

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
            <Modal.Title style={titleStyle}>Deactivation</Modal.Title>
          </Modal.Header>
          <Modal.Body style={contentStyle}>
            <center>
              <p>Are you sure to Deactivate?</p>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                width: "18%",
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
              onClick={handleConfirm}
            >
              Deactivate
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

  const handleClick = () => {
    navigate(`/ViewPage/${id}`);
  };
  const handleAdd = () => {
    navigate(`/AddPage/${id}`);
  };

  const handleDelete = () => {
    navigate(`/DeletePage/${id}`);
  };
  const handleActivate = () => {
    navigate('/ActivatePage');
  };
  const handleDeactivate = () => {
    navigate(`/DeactivatePage/${id}`);
  };
  return (
    <div className='Bodyblock'>
      {/* <button className='backButton' onClick={handleBack}>
      <IoPlayBackSharp /> &nbsp;&nbsp;Back
      </button> */}
      <button className='buttonBlock' onClick={handleActivate}><HiUserAdd /> Activate </button>
      <button className='buttonBlock' onClick={handleAdd}> <MdAdd /> Add </button>
      <button className='buttonBlock' onClick={handleDelete}><BiMinus /> Delete </button>
      <button className='buttonBlock' onClick={handleClick}> <MdOutlineRemoveRedEye /> View </button>
      <button className='buttonBlock' onClick={handleDeactivate}> <HiUserRemove /> Deactivate </button>

    </div>
  );
}

export default Body1;