import React, { useState } from "react";
import axios from "axios";
import Loading from "../loading/loading.component";

const Register = () => {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [saving, setSaving] = useState(false);

  const sendForm = () => {
    setSaving(true);
    const data = {
      url,
      title,
      lyrics,
    };
    axios.post("http://localhost:2500/save", data).then((resp) => {
      setSaving(false);
      console.log(resp);
    });
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleLyrics = (e) => {
    setLyrics(e.target.value);
  };

  return (
    <>
      {saving && <Loading />}
      <div className="row mb-3">
        <label htmlFor="url" className="form-label">
          URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          className="form-control"
          value={url}
          onChange={handleUrl}
          autoComplete="off"
        />
      </div>

      <div className="row mb-3">
        <label htmlFor="title" className="form-label">
          Titulo
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          value={title}
          onChange={handleTitle}
          autoComplete="off"
        />
      </div>

      <div className="row mb-3">
        <label htmlFor="lirycs" className="form-label">
          Lyrics
        </label>
        <textarea
          name="lyrics"
          id="lyrics"
          className="form-control"
          value={lyrics}
          onChange={handleLyrics}
          rows="10"
          autoComplete="off"
        ></textarea>
      </div>

      <div className="row mb-3">
        <button type="button" className="btn btn-dark" onClick={sendForm}>
          Guardar
        </button>
      </div>
    </>
  );
};

export default Register;
