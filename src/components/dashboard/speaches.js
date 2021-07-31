import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const List = styled.li`
  margin-top: 10px;
`;

const Button = styled.button`
  margin: 0 10px 5px 0;
`;

const Speaches = ({ sounds, getData }) => {
  const [wantDelete, setWantDelete] = useState(false);
  const [id, setId] = useState(null);

  const onDelete = (id) => {
    setId(id);
    setWantDelete(true);
  };

  const deleteLyrics = async () => {
    const resp = await axios.post("http://localhost:2500/sound/remove", {
      id,
    });
    console.log(resp);
    await getData();
    restore();
  };

  const cancelDelete = () => {
    restore();
  };

  const restore = () => {
    setWantDelete(false);
    setId(null);
  };

  return (
    <>
      {wantDelete ? (
        <>
          <Button className="btn btn-info btn-sm" onClick={deleteLyrics}>
            Eliminar
          </Button>
          <Button className="btn btn-danger btn-sm" onClick={cancelDelete}>
            No, please, no
          </Button>
        </>
      ) : null}
      <ul>
        {sounds.map((sound) => (
          <List key={sound._id}>
            <Button
              className="btn btn-dark btn-sm"
              onClick={() => onDelete(sound._id)}
            >
              [Eliminar]
            </Button>
            {sound.title} - &nbsp;
            <Link
              to={{
                pathname: `/sound/${sound._id}`,
              }}
            >
              Cortes
            </Link>
            &nbsp;| &nbsp;
            <Link
              to={{
                pathname: `/playground/${sound._id}`,
              }}
            >
              Playground
            </Link>
            &nbsp;| &nbsp;
            <Link
              to={{
                pathname: `/dictionary/${sound._id}`,
              }}
            >
              Diccionario
            </Link>
          </List>
        ))}
      </ul>
    </>
  );
};

export default Speaches;
