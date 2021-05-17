/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Time from "./time/time";
import { useParams } from "react-router-dom";
import { helper } from "./helpers/index";

import styled from "styled-components";

const LyricsTrack = styled.div`
  margin: 20px 0px;
`;

const MyArea = styled.div`
  margin: 5px 0px;
`;

const Sound = () => {
  const { id } = useParams();
  const [sound, setSound] = useState({});
  const [currentTime, setCurrentTime] = useState("00:00");
  const [trackData, setTrackData] = useState({});
  const [audioState, setAudioState] = useState({});
  const [totalTime, setTotalTime] = useState("00:00");

  const [timer, setTimer] = useState({});
  let [mStart, setMStart] = useState(0);
  let [mEnd, setMEnd] = useState(0);

  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");

  const streamUrl = `http://localhost:8080/sound/${id}`;
  const trackDataUrl = `http://localhost:8080/sound/track-data`;

  useEffect(() => {
    getAudio(streamUrl);
  }, []);

  const stop = () => {
    clearInterval(timer);
    sound.currentTime = 0;
    sound.pause();
    setCurrentTime(helper.formatTime(0));
  };

  const play = () => {
    sound.playbackRate = 1;
    sound.volume = 0.3;
    setTimer(configTimer());
    sound.play();
  };

  const configTimer = () => {
    return setInterval(() => {
      if (sound.currentTime <= mEnd) {
        setCurrentTime(helper.formatTime(sound.currentTime));
      }
      if (sound.currentTime >= mEnd) {
        sound.pause();
        clearInterval(timer);
      }
    }, 1000);
  };

  const getAudio = async (url) => {
    const audio = await new Audio(url);
    audio.addEventListener("loadeddata", () => {
      if (audio.readyState === 4) {
        setSound(audio);
        setTotalTime(helper.formatTime(audio.duration));
        setMEnd(audio.duration);
        getTrackData();
      }
    });
    return audio;
  };

  const getTrackData = async () => {
    const data = await axios.post(trackDataUrl, {
      id: id,
    });
    const {
      data: { trackData: tData },
    } = data;
    setTrackData(tData);
  };

  const pause = () => {
    if (audioState.paused) {
      const currentTime = Math.floor(sound.currentTime);
      sound.currentTime = currentTime;
      setCurrentTime(helper.formatTime(currentTime));

      sound.play();
    } else {
      sound.pause();
    }
    const trackState = {
      ...audioState,
      paused: !audioState.paused,
    };
    setAudioState(trackState);
  };

  const returnFive = () => {
    const minusFive = sound.currentTime - 5;
    sound.currentTime = minusFive;
  };

  const plushFive = () => {
    const plusFive = sound.currentTime + 5;
    sound.currentTime = plusFive;
  };

  const returnTwo = () => {
    const minusTwo = sound.currentTime - 2;
    sound.currentTime = minusTwo;
  };

  //**************** */
  // Los botones para marcar los tiempos para mostrar las letras
  const markStart = () => {
    setMStart(sound.currentTime);
  };

  const markEnd = () => {
    setMEnd(sound.currentTime);
    sound.pause();
    clearInterval(timer);
  };
  const listenTrack = () => {
    sound.currentTime = mStart;
    play();
  };
  const saveTrack = async () => {
    const resp = await axios.post(
      "http://localhost:8080/sound/update-lyrics/" + id,
      {
        id,
        english,
        spanish,
        mStart,
        mEnd,
      }
    );
    sound.currentTime = mStart;
    console.log(resp);
    // console.log(totalTime);
    setMEnd(helper.formatSeconds(totalTime));
  };

  const handleEnglish = (evt) => {
    setEnglish(evt.target.value);
  };

  const handleSpanish = (evt) => {
    setSpanish(evt.target.value);
  };

  return (
    <>
      <h3>{trackData.title}</h3>
      <button onClick={play}>Iniciar</button>
      <button onClick={stop}>Detener</button>
      <button onClick={pause}>
        {audioState.paused ? "Continuar" : "Pausar"}
      </button>
      <button onClick={returnFive}>-5 seg</button>
      <button onClick={plushFive}>+5 seg</button>
      <button onClick={returnTwo}>-2 seg</button>
      <LyricsTrack>
        Inglés
        <MyArea>
          <textarea
            cols="40"
            rows="3"
            onChange={handleEnglish}
            value={english}
          ></textarea>
        </MyArea>
        Español
        <MyArea>
          <textarea
            cols="40"
            rows="3"
            onChange={handleSpanish}
            value={spanish}
          ></textarea>
        </MyArea>
        <button onClick={markStart}>Marcar inicio</button>
        <button onClick={markEnd}>Marcar fin</button>
        <button onClick={listenTrack}>Escuchar</button>
        <button onClick={saveTrack}>Guardar</button>
      </LyricsTrack>
      <div>
        <div>
          <strong>{helper.formatTime(mStart)}</strong> |{" "}
          <strong>{helper.formatTime(mEnd)}</strong>
        </div>
      </div>
      <Time currentTime={currentTime} totalTime={totalTime} />
      <pre>{trackData.lyrics}</pre>
    </>
  );
};

export default Sound;
