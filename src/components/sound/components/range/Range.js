/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { helper } from "../../helpers/index";

const Input = styled.input`
  width: 100%;
`;

const Range = ({ max, setInit, currentTime, sound }) => {
  const [range, setRange] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  useEffect(() => {
    console.log(max);
    setMaxTime(helper.formatSeconds(max));
  }, [max]);

  useEffect(() => {
    setRange(helper.formatSeconds(currentTime));
  }, [currentTime]);

  const handleRange = (evt) => {
    setRange(evt.target.value);
    sound.pause();
  };

  const finalValue = (e) => {
    setInit(Number(e.target.value));
    sound.play();
  };

  return (
    <>
      <div>
        <Input
          type="range"
          min="0"
          max={maxTime}
          value={range}
          step="any"
          onChange={handleRange}
          onMouseUp={finalValue}
        />
      </div>
      {/* <div>can play? {canplay ? "Sí" : "No"}</div> */}
      <p>{range}</p>
    </>
  );
};

export default Range;
