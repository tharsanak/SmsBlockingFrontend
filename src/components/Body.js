import React, { useState } from 'react';
import '../style/BodyStyle.css';
import { useNavigate } from 'react-router-dom';
import { HiUserAdd } from "react-icons/hi";
import { Modal, Button } from "react-bootstrap";

function Body() {
  const navigate = useNavigate();
  // const [confirm,setConfirm]=useState(false);
  const ActivateConfirmationbutton = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirm=()=>{
      navigate('/Page1');
      setShow(false);
    }

    const titleStyle = {
      fontFamily: "monospace", 
      fontSize:"20px",
      fontWeight: 'bold',
    };

    const contentStyle={
    fontFamily:"sans-serif",

    };
    return (
      <>
        <button className='buttonBlock' onClick={handleShow} ><HiUserAdd /> Activate </button>   

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
            <Modal.Title style={titleStyle}>Activation</Modal.Title>
          </Modal.Header>
          <Modal.Body style={contentStyle}>
            <center>
              <p>Are you sure to Activate?</p>
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
    <div className='Bodyblock'>
<ActivateConfirmationbutton/>
    </div>
  );
}

export default Body;