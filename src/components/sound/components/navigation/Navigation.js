import React from "react";

const Navigation = ({
  play,
  stop,
  pause,
  audioState,
  returnFive,
  plushFive,
  returnTwo,
}) => {
  return (
    <>
      <button onClick={play} className="btn btn-success">
        <i className="bi bi-play-circle"></i>
      </button>
      &nbsp;
      <button onClick={stop} className="btn btn-danger">
        <i className="bi bi-stop-circle"></i>
      </button>
      &nbsp;
      <button onClick={pause} className="btn btn-warning">
        {audioState.paused ? (
          <i className="bi bi-play-fill"></i>
        ) : (
          <i className="bi bi-pause-circle"></i>
        )}
      </button>
      &nbsp;
      <button onClick={returnFive} className="btn btn-secondary">
        <i className="bi bi-arrow-counterclockwise"></i> -5
      </button>
      &nbsp;
      <button onClick={returnTwo} className="btn btn-secondary">
        <i className="bi bi-arrow-counterclockwise"></i> -2
      </button>
      &nbsp;
      <button onClick={plushFive} className="btn btn-dark">
        <i className="bi bi-arrow-clockwise"></i> +5
      </button>
    </>
  );
};

export default Navigation;
