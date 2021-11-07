import React, { useState } from "react";
import Button from "./Button";

function Verify(props) {
  const [otpData, setOtpData] = useState(new Array(6).fill(""));

  function handleChange(event, index) {

    if (isNaN(event.target.value)) {
      return false;
    }else{

    setOtpData([
      ...otpData.map((item, ind) => (ind === index ? event.target.value : item))
    ]);

    event.target.nextSibling && event.target.nextSibling.focus();

    }
  }

  function handleClick(event, index) {
    if (event.keyCode === 8) {
      setOtpData([
        ...otpData.map((item, ind) =>
          ind === index ? (event.target.value = " ") : item
        )
      ]);
      event.target.previousSibling && event.target.previousSibling.focus();
    } else if (event.keyCode === 37) {
      event.target.previousSibling && event.target.previousSibling.focus();
    } else if (event.keyCode === 39) {
      event.target.nextSibling && event.target.nextSibling.focus();
    }
    // var ctrl = event.ctrlKey
    //   ? event.ctrlKey
    //   : event.keyCode === 17
    //   ? true
    //   : false;
    // if (event.keyCode === 86 && ctrl) {
    //   console.log("Ctrl+V pressed");
    // }
  }
  function handlePaste(e) {
    if (isNaN(e.clipboardData.getData("text"))) {
      return false;
    }
    e.target.maxLength = 6;
    let val = e.clipboardData.getData("text");
    e.target.maxLength = 1;
    let rah = val.split("");
    setOtpData([...otpData.map((item, ind) => rah[ind])]);
  }
  return (
    <>
      {props.modal && (
        <div className="modal">
          <div onClick={() => props.toggleModal()} className="overlay"></div>
          <div className="modal-content">
            <div className="container">
              <p className="otpPara">
                Enter the OTP you received on XXXXXXX574
              </p>
              {otpData.map((item, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    className="inputClass"
                    maxLength="1"
                    onChange={(event) => handleChange(event, index)}
                    onKeyUp={(event) => {
                      handleClick(event, index)
                    }}
                    onPaste={handlePaste}
                    onFocus={(event) => event.target.select()}
                    value={item}
                  />
                );
              })}
            </div>
            <button className="close-modal" onClick={() => props.toggleModal()}>
              CLOSE
            </button>
            <Button />
          </div>
        </div>
      )}
    </>
  );
}

export default Verify;
