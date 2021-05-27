import React, { useState } from "react";
import styled from "styled-components";
import RegisterWord from "./register-word/register";
import WritingPlayground from "./writing/writing";
import ReadingPlayground from "./reading/reading";

const TitleLink = styled.a`
  display: inline-block;
  margin: 5px;
  color: white;
  cursor: pointer;
  background-color: #181818;
  border-radius: 3px;
  padding: 1px 3px;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    color: red;
    text-decoration: none;
  }
`;

const Dictionary = () => {
  const [register, setRegister] = useState(false);
  const [writingPlayground, setWritingPlayground] = useState(false);
  const [readingPlayground, setReadingPlayground] = useState(false);

  const showRegister = () => {
    setRegister(true);
    setWritingPlayground(false);
    setReadingPlayground(false);
  };

  const showWritingPlayground = () => {
    setRegister(false);
    setWritingPlayground(true);
    setReadingPlayground(false);
  };

  const showReadingPlayground = () => {
    setRegister(false);
    setWritingPlayground(false);
    setReadingPlayground(true);
  };

  return (
    <>
      <h2>Dictionary (dikSHəˌnerē)</h2>
      <div>
        <TitleLink onClick={showRegister}>Registrar palabra</TitleLink>
        <TitleLink onClick={showWritingPlayground}>Writing</TitleLink>
        <TitleLink onClick={showReadingPlayground}>Reading</TitleLink>
      </div>
      {register ? (
        <RegisterWord />
      ) : writingPlayground ? (
        <WritingPlayground />
      ) : readingPlayground ? (
        <ReadingPlayground />
      ) : null}
    </>
  );
};

export default Dictionary;
