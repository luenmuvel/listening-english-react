import React from "react";
import styled from "styled-components";

const MyArea = styled.div`
  margin: 5px 0px;
`;

const LangLyrics = ({ lang, handle, lyrics }) => {
  return (
    <>
      {lang}
      <MyArea>
        <textarea
          cols="40"
          rows="3"
          className="form-control"
          onChange={handle}
          value={lyrics}
        ></textarea>
      </MyArea>
    </>
  );
};

export default LangLyrics;
