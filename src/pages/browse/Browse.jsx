import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Styled from "./Styled/Navbar.module.css";
import DataHttp from "./Components/DataHttp";

function Browse(props) {
  const [sendData, setSendData] = useState({
    name: "",
    overview: "",
  });

  const Propsmovie = (Virus) => {
    setSendData({
      name: Virus.name,
      overview: Virus.overview,
    });
    console.log(sendData);
    console.log(Virus);
  };
  return (
    <React.Fragment>
      <Navbar onData={sendData} />
      <DataHttp onProps={Propsmovie} />
    </React.Fragment>
  );
}

export default Browse;
