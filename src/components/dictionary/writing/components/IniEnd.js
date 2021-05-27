import React from "react";
import { helper } from "./../../../sound/helpers/index";

const IniEnd = ({ mStart, mEnd }) => {
  return (
    <>
      <div>
        <div>
          <strong>{helper.formatTime(mStart)}</strong> |{" "}
          <strong>{helper.formatTime(mEnd)}</strong>
        </div>
      </div>
    </>
  );
};

export default IniEnd;
