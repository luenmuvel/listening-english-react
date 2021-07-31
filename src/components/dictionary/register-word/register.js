import React, { useState } from "react";
import axios from "axios";

const RegisterWord = () => {
  const [wordsObj, setWordsObj] = useState({
    infinitive: "",
    infinitivo: "",
    pastWord: "",
    pasado: "",
    pastParticiple: "",
    pasadoParticipio: "",
  });
  const [saving, setSaving] = useState(false);

  const updateWord = (e) => {
    setWordsObj({
      ...wordsObj,
      [e.target.name]: e.target.value,
    });
  };

  const guardar = async () => {
    setSaving(true);
    await axios.post("http://localhost:2500/dictionary/save-word", wordsObj);
    setSaving(false);
    setWordsObj({
      infinitive: "",
      infinitivo: "",
      pastWord: "",
      pasado: "",
      pastParticiple: "",
      pasadoParticipio: "",
    });
  };
  return (
    <>
      <h4>Registrar palabra</h4>
      {saving ? <p>Guardando...</p> : null}
      <div>
        <div className="row">
          <div className="col">
            <label htmlFor="infinitive">Infinitive</label>
            <input
              type="text"
              id="infinitive"
              name="infinitive"
              className="form-control"
              value={wordsObj.infinitive}
              onChange={updateWord}
            />
          </div>
          <div className="col">
            <label htmlFor="infinitivo">Infinitivo</label>
            <input
              type="text"
              id="infinitivo"
              name="infinitivo"
              className="form-control"
              value={wordsObj.infinitivo}
              onChange={updateWord}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <label htmlFor="past">Past</label>
            <input
              type="text"
              id="past"
              name="pastWord"
              className="form-control"
              value={wordsObj.pastWord}
              onChange={updateWord}
            />
          </div>
          <div className="col">
            <label htmlFor="pasado">Pasado</label>
            <input
              type="text"
              id="pasado"
              name="pasado"
              className="form-control"
              value={wordsObj.pasado}
              onChange={updateWord}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          <div className="col">
            <label htmlFor="pastParticiple">Past Participle</label>
            <input
              type="text"
              name="pastParticiple"
              id="pastParticiple"
              value={wordsObj.pastParticiple}
              className="form-control"
              onChange={updateWord}
            />
          </div>
          <div className="col">
            <label htmlFor="pasadoParticipio">Pasado Participio</label>
            <input
              type="text"
              name="pasadoParticipio"
              id="pasadoParticipio"
              value={wordsObj.pasadoParticipio}
              className="form-control"
              onChange={updateWord}
            />
          </div>
        </div>
      </div>
      <div>
        <br />
        <button onClick={guardar} className="btn btn-danger">
          Guardar
        </button>
      </div>
    </>
  );
};

export default RegisterWord;
