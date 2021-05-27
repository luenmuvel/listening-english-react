/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Mood from "../mood/mood";
import Buttons from "./components/buttons";

const H1 = styled.h1`
  text-align: center;
`;

const SPAN = styled.span`
  color: gray;
  font-style: italic;
  display: inline-block;
  text-align: center;
  width: 100%;
`;

const TITLE = styled.span`
  color: #292929;
  font-weight: bold;
  font-style: italic;
  display: inline-block;
  text-align: center;
  width: 100%;
`;

const BADWORD = styled.p`
  color: #ce0000;
  font-size: 2.6em;
  text-align: center;
  font-weight: bold;
`;

const WritingPlayground = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [editPast, setEditPast] = useState(false);
  const [validPast, setValidPast] = useState(null);
  const [editPastParticiple, setEditPastParticiple] = useState(false);
  const [validPastParticiple, setValidPastParticiple] = useState(null);
  const [pastAttemps, setPastAttemps] = useState(0);
  const [pastParticipleAttemps, setPastParticipleAttemps] = useState(0);

  // refs
  const pastRef = React.createRef();
  const pastParticipleRef = React.createRef();

  useEffect(() => {
    const getWords = async () => {
      const data = await axios.get("http://localhost:8080/dictionary/getAll");
      setTotal(data.data.data.length);
      addStatus(data.data.data);
    };
    getWords();
  }, []);

  useEffect(() => {
    if (pastRef.current) {
      pastRef.current.focus();
    }

    if (pastParticipleRef.current) {
      pastParticipleRef.current.focus();
    }
  }, [editPast, editPastParticiple]);

  useEffect(() => {
    if (validPast && validPastParticiple) {
      data[index].status = true;
      setData(data);
    }
  }, [validPast, validPastParticiple, data]);

  useEffect(() => {
    setValidPast(null);
    setValidPastParticiple(null);
    setPastAttemps(0);
    setPastParticipleAttemps(0);
  }, [index]);

  const addStatus = (data) => {
    data = data.map((ele) => {
      ele = {
        ...ele,
        status: null,
      };
      return ele;
    });
    setData(data);
  };

  const next = () => {
    if (index + 1 !== total) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index - 1 !== -1) {
      setIndex(index - 1);
    }
  };

  const getWord = (word, isValid, attemps = 0) => {
    if (attemps === 0) return "_".repeat(word.length);
    if (isValid) return word;

    var myword = word.split("");
    var count = Math.ceil(word.length / 2);
    var increment = 0;
    for (var i = 0; i < count; i++) {
      myword.splice(increment, 1, "_");
      increment += 2;
    }
    return myword.join("");
  };

  const editPastWord = (e) => {
    setEditPast(!editPast);
    setValidPast(null);
  };

  const editPastParticipleWord = (e) => {
    setEditPastParticiple(!editPastParticiple);
    setValidPastParticiple(null);
  };

  const isValidPast = (e) => {
    if (e.target.name === "txtEditPastWord") {
      setPastAttemps(pastAttemps + 1);
      if (data[index].pastWord === e.target.value) {
        setValidPast(true);
      } else {
        setValidPast(false);
      }
      setEditPast(!editPast);
    }
  };

  const isValidPastParticiple = (e) => {
    if (e.target.name === "txtEditPastParticipleWord") {
      setPastParticipleAttemps(pastParticipleAttemps + 1);
      if (data[index].pastParticiple === e.target.value) {
        setValidPastParticiple(true);
      } else {
        setValidPastParticiple(false);
      }
      setEditPastParticiple(!editPastParticiple);
    }
  };

  // events

  const makeBlur = (e) => {
    if (pastRef.current) {
      if (e.charCode === 13) {
        pastRef.current.blur();
      }
    }

    if (pastParticipleRef.current) {
      if (e.charCode === 13) {
        pastParticipleRef.current.blur();
      }
    }
  };

  return (
    <>
      <h4>Playground</h4>
      <Mood data={data} index={index} />
      <br />
      {data.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <TITLE>Infinitive</TITLE>
              <H1>{data[index].infinitive}</H1>
              <SPAN>{data[index].infinitivo}</SPAN>
            </div>
            <div className="col">
              <TITLE>Past</TITLE>
              {editPast ? (
                <input
                  type="text"
                  autoComplete="off"
                  ref={pastRef}
                  name="txtEditPastWord"
                  onBlur={isValidPast}
                  onKeyPress={makeBlur}
                  className="form-control"
                  style={{ textAlign: "center", fontSize: "1.8em" }}
                />
              ) : (
                <H1 onClick={editPastWord}>
                  {getWord(data[index].pastWord, validPast, pastAttemps)}
                </H1>
              )}
              <SPAN>{data[index].pasado}</SPAN>
              {validPast === null ? null : !validPast && pastAttemps > 1 ? (
                <BADWORD>{data[index].pastWord}</BADWORD>
              ) : null}
            </div>

            <div className="col">
              <TITLE>Past Participle</TITLE>
              {editPastParticiple ? (
                <input
                  type="text"
                  autoComplete="off"
                  ref={pastParticipleRef}
                  name="txtEditPastParticipleWord"
                  onKeyPress={makeBlur}
                  onBlur={isValidPastParticiple}
                  className="form-control"
                  style={{ textAlign: "center", fontSize: "1.8em" }}
                />
              ) : (
                <H1 onClick={editPastParticipleWord}>
                  {getWord(
                    data[index].pastParticiple,
                    validPastParticiple,
                    pastParticipleAttemps
                  )}
                </H1>
              )}
              <SPAN>{data[index].pasadoParticipio}</SPAN>
              {validPastParticiple === null ? null : !validPastParticiple &&
                pastParticipleAttemps > 1 ? (
                <BADWORD>{data[index].pastParticiple}</BADWORD>
              ) : null}
            </div>
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <Buttons value="Anterior" fn={prev} />
            <Buttons value="Siguiente" fn={next} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WritingPlayground;
