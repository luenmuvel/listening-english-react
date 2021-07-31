/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
  display: inline-block;
  margin: 5px 5px;

  &::first-child {
    margin-left: 0;
  }
`;

const Speech = styled.div`
  width: 500px;
  font-size: 1.5em;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  margin: 20px 0;
`;

const SelectedWord = styled.p`
  display: inline-block;
  background: #585858;
  padding: 3px 10px;
  border-radius: 8px;
  color: white;
`;

const AddDictionaryOption = styled.p`
  display: inline-block;
  background-color: #0062cc;
  color: white;
  padding: 3px 10px;
  border-radius: 5px;
  margin: 3px 5px 0 0;
  cursor: pointer;
`;

const AddGrammarOption = styled.p`
  display: inline-block;
  background-color: #05680a;
  color: white;
  padding: 3px 10px;
  border-radius: 5px;
  margin: 3px 5px;
  cursor: pointer;
`;

const Playground = () => {
  const { id } = useParams();
  const url = `http://localhost:2500/sound/${id}`;
  const trackDataUrl = `http://localhost:2500/sound/track-data`;

  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState({});
  const [timer, setTimer] = useState({});
  const [sound, setSound] = useState({});
  const [index, setIndex] = useState(0);
  const [mStart, setMStart] = useState(0);
  const [mEnd, setMEnd] = useState(0);
  const [loop, setLoop] = useState(true);
  const [userInteract, setUserInteract] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    getAudio(url);
  }, []);

  useEffect(() => {
    const keyPress = (e) => {
      if (e.keyCode === 80) {
        previous();
      } else if (e.keyCode === 78) {
        next();
      } else if (e.keyCode === 32) {
        // barra espaciadora
        if (playing) {
          sound.pause();
          setPlaying((play) => !play);
        } else {
          sound.play();
          setUserInteract(true);
          setPlaying((play) => !play);
        }
      } else if (e.keyCode === 37) {
        minusTwo();
      } else if (e.keyCode === 39) {
        plusTwo();
      } else if (e.keyCode === 82) {
        repeat();
      }
    };

    const selection = () => {
      const wordSelected = window.getSelection().toString();
      if (wordSelected.length) {
        setSelected(wordSelected);
      } else {
        setSelected("");
      }
    };
    if (!edit) {
      document.addEventListener("keydown", keyPress);
    }

    document.addEventListener("mouseup", selection);

    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("mouseup", selection);
    };
  });

  useEffect(() => {
    if (tracks.length > 0) {
      setTrack(tracks[index]);
    }
  }, [index]);

  useEffect(() => {
    setMStart(track.mStart);
    setMEnd(track.mEnd);
  }, [track]);

  useEffect(() => {
    sound.currentTime = mStart;
    if (userInteract) {
      sound.play();
    }
    const t = setInterval(() => {
      if (loop && sound.currentTime >= mEnd) {
        sound.currentTime = mStart;
      }
    }, 1000);
    setTimer(t);
    return () => {
      if (sound.pause) {
        sound.pause();
        clearInterval(timer);
      }
    };
  }, [mEnd]);

  const getAudio = async (url) => {
    const audio = await new Audio(url);
    audio.addEventListener("loadeddata", () => {
      if (audio.readyState === 4) {
        setSound(audio);
        getTrackData();
      }
    });
  };

  const getTrackData = async () => {
    const data = await axios.post(trackDataUrl, {
      id: id,
    });
    const {
      data: {
        trackData: { tracks },
      },
    } = data;
    setMStart(tracks[index].mStart);
    setMEnd(tracks[index].mEnd);
    setTracks(tracks);
    setTrack(tracks[index]);
  };

  const play = () => {
    sound.play();
    setUserInteract(true);
    setPlaying((play) => !play);
  };

  const pause = () => {
    sound.pause();
    setPlaying((play) => !play);
  };

  const next = (e) => {
    clear();
    setIndex((i) => i + 1);
  };

  const previous = () => {
    clear();
    setIndex((i) => i - 1);
  };

  const turnLoop = () => {
    setLoop(!loop);
  };

  const clear = () => {
    clearInterval(timer);
  };

  const minusFive = () => {
    sound.currentTime = sound.currentTime - 5;
  };

  const minusTwo = () => {
    sound.currentTime = sound.currentTime - 2;
  };

  const minusOne = () => {
    sound.currentTime = sound.currentTime - 1;
  };
  const plusOne = () => {
    sound.currentTime = sound.currentTime + 1;
  };

  const plusTwo = () => {
    sound.currentTime = sound.currentTime + 2;
  };

  const plusFive = () => {
    sound.currentTime = sound.currentTime + 5;
  };

  // Editar
  const updateTrack = async () => {
    await axios.post("http://localhost:2500/sound/update-chunk", {
      ...track,
    });
    setEdit(false);
  };

  const editTrack = (e) => {
    const myTrack = {
      ...track,
      [e.target.name]: e.target.value,
    };
    setTrack(myTrack);
  };

  const cancelUpdating = () => {
    setEdit(false);
  };

  const repeat = () => {
    sound.currentTime = mStart;
  };

  // ----

  const addDictionary = () => {
    console.log("diccionario");
  };

  const addGrammar = () => {
    console.log("gramatica");
  };

  return (
    <>
      <h2>Playground</h2>
      <div>
        {!playing ? (
          <Button className="btn btn-success btn-sm" onClick={play}>
            <i class="bi bi-play-circle"></i>
          </Button>
        ) : (
          <Button className="btn btn-warning btn-sm" onClick={pause}>
            <i class="bi bi-pause-circle"></i>
          </Button>
        )}
        <Button onClick={turnLoop} className="btn btn-dark btn-sm">
          {loop ? (
            <i class="bi bi-arrow-clockwise"></i>
          ) : (
            <i class="bi bi-arrow-counterclockwise"></i>
          )}
        </Button>
        <Button onClick={previous} className="btn btn-sm btn-danger">
          <i class="bi bi-arrow-left-circle"></i>
        </Button>
        <Button onClick={next} className="btn btn-sm btn-danger">
          <i class="bi bi-arrow-right-circle"></i>
        </Button>
        <Button onClick={minusFive} className="btn btn-secondary btn-sm">
          -5
        </Button>
        <Button onClick={minusTwo} className="btn btn-secondary btn-sm">
          -2
        </Button>
        <Button onClick={minusOne} className="btn btn-secondary btn-sm">
          -1
        </Button>
        <Button onClick={plusOne} className="btn btn-secondary btn-sm">
          +1
        </Button>
        <Button onClick={plusTwo} className="btn btn-secondary btn-sm">
          +2
        </Button>
        <Button onClick={plusFive} className="btn btn-secondary btn-sm">
          +5
        </Button>
      </div>
      {edit ? (
        <>
          <Wrapper>
            <div>
              <textarea
                onChange={editTrack}
                name="eng"
                value={track.eng}
                cols="60"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            &nbsp;
            <div>
              <textarea
                onChange={editTrack}
                name="spa"
                value={track.spa}
                cols="60"
                rows="5"
                className="form-control"
              ></textarea>
            </div>
            <Button onClick={updateTrack} className="btn btn-sm btn-info">
              <i class="bi bi-clipboard-check"></i> Actualizar
            </Button>
            <Button onClick={cancelUpdating} className="btn btn-sm btn-danger">
              <i class="bi bi-clipboard-x"></i> Cancelar
            </Button>
          </Wrapper>
        </>
      ) : (
        <>
          <Speech>{track.eng}</Speech>
          <Speech>{track.spa}</Speech>
          <p>
            <button
              onClick={() => {
                setEdit(true);
              }}
              className="btn btn-dark btn-sm"
            >
              <i class="bi bi-pencil"></i>
            </button>
          </p>
          {selected ? (
            <>
              <div>
                <SelectedWord>{selected}</SelectedWord>
              </div>
              <AddDictionaryOption onClick={addDictionary}>
                Añadir a diccionario
              </AddDictionaryOption>
              <AddGrammarOption onClick={addGrammar}>
                Añadir a gramática
              </AddGrammarOption>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default Playground;
