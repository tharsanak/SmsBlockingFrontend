import React from 'react';
import  '../style/HeaderStyle.css';
import SLTM from'../assets/SLTM.png';
 
function Header() {
  return (
    <div className='headerBlock'>
      <img src={SLTM} alt="logo" className="logosltm"/>
       <h2 className='h2Block'>Block Incoming SMS</h2>
   
    </div>
  );
}

export default Header;