import React, { useState, useEffect } from "react";

const ReadingPlayground = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(setInterval(() => {}, 1000));
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <>
      <p>Reading playground</p>
    </>
  );
};

export default ReadingPlayground;
