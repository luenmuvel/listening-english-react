import React from "react";
import styled from "styled-components";

const LoadingBox = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const Loading = () => {
  return (
    <LoadingBox>
      <span>Guardando...</span>
    </LoadingBox>
  );
};

export default Loading;
