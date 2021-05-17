export const helper = {
  formatTime: (time) => {
    let minutes;
    if (Math.ceil(time) % 60 === 0) {
      minutes = Math.ceil(time / 60);
    } else {
      minutes = Math.floor(time / 60);
    }
    const seconds = Math.ceil(Math.ceil(time % 60) % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  },
  formatSeconds: (time) => {
    const parts = time.split(":");
    const minutes = parseInt(parts[0] * 60);
    const seconds = parseInt(parts[1]);
    return minutes + seconds;
  },
};
