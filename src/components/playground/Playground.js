/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Button = styled.button`
  display: inline-block;
  margin: 0 5px;
`;

const Speech = styled.div`
  width: 500px;
  font-size: 1.5em;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  margin: 20px 0;
`;

const Playground = () => {
  const { id } = useParams();
  const url = `http://localhost:8080/sound/${id}`;
  const trackDataUrl = `http://localhost:8080/sound/track-data`;

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
          pause();
        } else {
          sound.play();
          setUserInteract(true);
          setPlaying(true);
        }
      } else if (e.keyCode === 37) {
        minusOne();
      } else if (e.keyCode === 39) {
        plusOne();
      } else if (e.keyCode === 82) {
        repeat();
      }
    };
    if (!edit) {
      document.addEventListener("keydown", keyPress);
    }
    return () => {
      document.removeEventListener("keydown", keyPress);
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
    setUserInteract(true);
    sound.currentTime = mStart;
    sound.play();
    setPlaying(true);
  };

  const pause = () => {
    sound.pause();
    setPlaying(false);
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
    await axios.post("http://localhost:8080/sound/update-chunk", {
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

  return (
    <>
      <h2>Playground</h2>
      <div>
        <Button onClick={play}>Play</Button>
        <Button onClick={pause}>Pausa</Button>
        <Button onClick={turnLoop}>{loop ? "Quitar bucle" : "Bucle"}</Button>
        <Button onClick={previous}>Anterior</Button>
        <Button onClick={next}>Siguiente</Button>
        <Button onClick={minusFive}>-5</Button>
        <Button onClick={minusTwo}>-2</Button>
        <Button onClick={minusOne}>-1</Button>
        <Button onClick={plusOne}>+1</Button>
        <Button onClick={plusTwo}>+2</Button>
        <Button onClick={plusFive}>+5</Button>
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
              ></textarea>
            </div>
            <div>
              <textarea
                onChange={editTrack}
                name="spa"
                value={track.spa}
                cols="60"
                rows="5"
              ></textarea>
            </div>
            <button onClick={updateTrack}>Actualizar</button>
            <button onClick={cancelUpdating}>Cancelar</button>
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
            >
              Editar
            </button>
          </p>
        </>
      )}
    </>
  );
};

export default Playground;
