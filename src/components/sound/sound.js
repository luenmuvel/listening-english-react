/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Time from "./time/time";
import { useParams } from "react-router-dom";
import { helper } from "./helpers/index";

import styled from "styled-components";
import Range from "./components/range/Range";
import IniEnd from "./../dictionary/writing/components/IniEnd";
import Title from "./components/title/Title";
import Navigation from "./components/navigation/Navigation";
import LangLyrics from "./components/lang-lyrics/LangLyrics";
import Cutter from "./components/cutter/Cutter";

const LyricsTrack = styled.div`
  margin: 20px 0px;
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

  const [cutStart, setCutStart] = useState(false);

  const streamUrl = `http://localhost:2500/sound/${id}`;
  const trackDataUrl = `http://localhost:2500/sound/track-data`;

  useEffect(() => {
    getAudio(streamUrl);
  }, []);

  useEffect(() => {
    console.log(cutStart);
    // if (cutStart) {
    //   sound.currentTime = sound.currentTime - 2;
    //   sound.play();
    // }
  }, [cutStart]);

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

  const setInit = (time) => {
    sound.currentTime = time;
    setMStart(time);
  };

  //**************** */
  // Los botones para marcar los tiempos para mostrar las letras
  const markStart = () => {
    setCutStart(true);
    setMStart(sound.currentTime);
  };

  const markEnd = () => {
    setMEnd(sound.currentTime);
    setCutStart(false);
    sound.pause();
    clearInterval(timer);
  };

  const listenTrack = () => {
    sound.currentTime = mStart;
    play();
  };

  const saveTrack = async () => {
    await axios.post("http://localhost:2500/sound/update-lyrics/" + id, {
      id,
      english,
      spanish,
      mStart,
      mEnd,
    });
    sound.currentTime = mStart;
    setMStart(mEnd);
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
      <Title trackData={trackData} />
      <Navigation
        play={play}
        stop={stop}
        pause={pause}
        audioState={audioState}
        returnFive={returnFive}
        plushFive={plushFive}
        returnTwo={returnTwo}
      />
      <LyricsTrack>
        <LangLyrics handle={handleEnglish} lyrics={english} lang="Inglés" />
        <LangLyrics handle={handleSpanish} lyrics={spanish} lang="Español" />

        <Cutter
          markStart={markStart}
          markEnd={markEnd}
          listenTrack={listenTrack}
          saveTrack={saveTrack}
        />
      </LyricsTrack>
      <IniEnd mStart={mStart} mEnd={mEnd} />
      <Range
        max={totalTime}
        setInit={setInit}
        currentTime={currentTime}
        sound={sound}
      />
      <Time currentTime={currentTime} totalTime={totalTime} />
      {/* <pre>{trackData.lyrics}</pre> */}
      {mStart} | {mEnd}
    </>
  );
};

export default Sound;
