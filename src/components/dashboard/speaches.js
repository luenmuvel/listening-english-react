import React from "react";
import { Link } from "react-router-dom";

const Speaches = ({ sounds }) => {
  return (
    <ul>
      {sounds.map((sound) => (
        <li key={sound._id}>
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
            Diccinario
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Speaches;
