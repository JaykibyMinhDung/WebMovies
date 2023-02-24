import React from "react";
import { useState, useContext, useEffect } from "react";
// import Modal from "../../browse/Styled/Modal";
import DetailSearch from "./DetailSearch";
import classes from "../Styled/MovieSearch.module.css";

const DetailHttp = (props) => {
  const [idmovie, setIdMovie] = useState([]);

  const TrailerDataSearch = async (movie) => {
    // Tải trailer phim từ API về
    const Data = await fetch(
      `https://api.themoviedb.org/3//movie/${movie}/videos?api_key=a28e081bc24d2a37cb3c6cc39834e3db`
    );
    try {
      if (!Data.ok) {
        throw new Error("Khong co trailer movie"); // Thông báo lỗi khi không có trailer phim
      }
      const Response = await Data.json();
      console.log(Response);
      const RenderTrailer = await Response.results;
      // Truyền dữ liệu phim vào mảng để truyền ra ngoài hàm
      setIdMovie(RenderTrailer);
      // setIsLoadding(true);
      if (!Response.results) {
        throw new Error("Khong co trailer movie"); // Thông báo lỗi khi không có trailer phim
      }
      console.log(RenderTrailer);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // console.log(props.onSecurity.id);
    if (props.onSecurity.id) {
      TrailerDataSearch(props.onSecurity.id); // Điều kiện để chuyển Idmovie tới components chứa cấu trúc
    }
  }, [props.onSecurity]);

  return (
    <div className={classes.boxtrailer} onClick={props.onClose}>
      <DetailSearch onData={idmovie} onInformationTrailer={props.onSecurity} />
    </div>
  );
};

export default DetailHttp;
