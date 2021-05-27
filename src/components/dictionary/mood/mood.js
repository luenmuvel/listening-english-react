import React from "react";
import styled from "styled-components";

const GOOD = styled.span`
  display: inline-block;
  background-color: #3ea105;
  width: 15px;
  height: 8px;
  border-radius: 3px;
  margin-right: 3px;
`;

const BAD = styled.span`
  display: inline-block;
  background-color: #dd0808;
  width: 15px;
  height: 8px;
  border-radius: 3px;
  margin-right: 3px;
`;

const CONTAINER = styled.div`
  margin: 10px 0;
`;

const Mood = ({ data, index }) => {
  return (
    <>
      <CONTAINER>
        {data.map((word, index) => {
          return word.status ? (
            <GOOD key={index}></GOOD>
          ) : (
            <BAD key={index}></BAD>
          );
        })}
      </CONTAINER>
      <span>🙂</span>
      <span>😱 ⏰ </span>
    </>
  );
};

export default Mood;
