import React, { useEffect, useState } from "react";
import axios from "axios";
import Speaches from "./speaches";

const Dashboard = () => {
  const [sounds, setSounds] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("http://localhost:8080/sound");
      const { sounds } = data;
      setSounds(sounds);
    };
    getData();
  }, []);

  return (
    <>
      <h1>Listado de discursos</h1>
      <Speaches sounds={sounds} />
    </>
  );
};

export default Dashboard;
