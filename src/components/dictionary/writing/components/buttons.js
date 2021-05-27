import React from "react";

const Buttons = ({ value, fn }) => {
  return (
    <>
      <div className="col-1">
        <button className="btn btn-danger" onClick={fn}>
          {value}
        </button>
      </div>
    </>
  );
};

export default Buttons;
