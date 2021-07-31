import React, { useEffect, useState } from "react";
import axios from "axios";
import Speaches from "./speaches";

const Dashboard = () => {
  const [sounds, setSounds] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get("http://localhost:2500/sound");
    const { sounds } = data;
    setSounds(sounds);
  };

  return (
    <>
      <h1>Canciones / Discursos</h1>
      <Speaches sounds={sounds} getData={getData} />
    </>
  );
};

export default Dashboard;
