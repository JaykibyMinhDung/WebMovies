import React, { useState } from "react";
import Authcontext from "./useHook-Custom/context";
import Navbar from "./Components/Navbar";
// import Styled from "./Styled/Navbar.module.css";
import DataHttp from "./Components/DataHttp";
import MovieData from "./Section/MovieData";
import Banner from "./Components/Banner";

function Browse(props) {
  // Biến lấy dữ liệu trailer movie
  const [DataContext, setDataContext] = useState({
    Name: "",
    id: 0,
    date: "",
    overview: "",
    vote: "",
    image: "",
    imageback: "",
  });
  const [showmovie, setShowmovie] = useState(false);
  // Biến lưu dư liệu movie sau khi lấy random
  const [sendData, setSendData] = useState({
    name: "",
    overview: "",
    id: 0,
  });
  let a;
  // Hàm có chức năng hiện modal
  const showSummary = (item) => {
    // console.log(DataContext);
    setShowmovie(true);
  };
  // Hàm có chức năng ẩn modal
  const hideSummary = () => {
    setShowmovie(false);
  };
  // Dữ liệu phim ngẫu nhiên được truyền xuống http để lấy random movie
  const Propsmovie = (Virus) => {
    setSendData({
      name: Virus.name,
      overview: Virus.overview,
      image: Virus.image,
      id: Virus.id,
    });
  };
  return (
    <Authcontext.Provider
      value={{
        MovieCTX: DataContext, // Mảng truyền dữ liệu từ trailer movie
        onShow: showSummary,
        onHide: hideSummary,
        onReceive: setDataContext, // Hàm lấy dữ liệu từ trailer movie
      }}
    >
      <Banner onData={sendData} />
      <Navbar />
      <DataHttp onProps={Propsmovie} />
      {showmovie && <MovieData onClose={hideSummary} />}
      {/* {console.log(showmovie)} */}
    </Authcontext.Provider>
  );
}

export default Browse;
