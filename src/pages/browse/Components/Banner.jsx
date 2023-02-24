import React from "react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import Modal from "../Styled/Modal";
import Styled from "../Styled/Navbar.module.css";

const Banner = (props) => {
  const [idmovie, setIdMovie] = useState();
  const [onMovie, setonMovie] = useState(false);
  const [trailerBanner, settrailerBanner] = useState();

  const exitYoutube = () => {
    if (onMovie) {
      console.log("false");
      return setonMovie(false);
    }
  };
  // Link tìm tralier movie, movie là id của phim
  const TrailerData = async (movie) => {
    const Data = await fetch(
      `https://api.themoviedb.org/3//movie/${movie}/videos?api_key=a28e081bc24d2a37cb3c6cc39834e3db`
    );
    try {
      if (!Data.ok) {
        throw new Error("Khong co trailer movie");
      }
      const Response = await Data.json();
      // console.log(Response);
      const RenderTrailer = await Response.results; // Lấy mảng các trailer phim ra một biến
      setIdMovie(RenderTrailer); // Truyền vào giá trị để lưu giữ đưa ra ngoài hàm
      // setIsLoadding(true);
      if (!Response.results) {
        throw new Error("Khong co trailer movie");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Thiết lập khung hình cho iFrame
  const opts = {
    height: "300vw",
    width: "250%",
    playerVars: {
      autoplay: 0,
    },
  };

  const FindTrailermovieBanner = () => {
    if (idmovie) {
      const Datatrailer = idmovie.map((movie) => {
        return {
          key: movie.key,
          title: movie.name,
          type: movie.type,
          // image: movie.posterpath,
        };
      });
      // Tạo truy vấn cho trailer, Ưu tiên lấy các bộ phim có chữ trailer
      const FindTrailerMovie = Datatrailer.find(
        (id) => id.type === "Trailer" || id.type === "Teaser"
      );
      settrailerBanner(FindTrailerMovie);
      setonMovie(true);
    } else {
      // console.log(Boolean(FindTrailerMovie));
      alert("Không có trailer movie");
    }
  };
  useEffect(() => {
    TrailerData(props.onData.id);
  }, [props.onData.id]);
  return (
    <div
      className={Styled.image}
      style={{
        backgroundImage: `url(${
          "https://image.tmdb.org/t/p/w500" + props.onData.image
        } )`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `cover`,
        //padding: `${20 + "%"}`,
      }}
    >
      {/* 
    <img
      src={"https://image.tmdb.org/t/p/w500" + props.onData.image}
      alt="Anh loi"
    /> */}
      <p>{props.onData.name}</p>
      <div>
        <button className={Styled.button_play} onClick={FindTrailermovieBanner}>
          Play Trailer
        </button>
        <button className={Styled.button_Mylist}>My List</button>
      </div>
      <div>
        <p>{props.onData.overview}</p>
      </div>
      <div>
        {/* {trailerBanner ? (
          // <div className={Styled.TralerMovie} onClick={exitYoutube}>
          <Modal onCancel={exitYoutube}>
            <YouTube
              videoId={trailerBanner.key}
              opts={opts}
              className={Styled.TralerMovie}
            />
          </Modal>
        ) : (
          // </div>
          ""
        )} */}
      </div>
    </div>
  );
};

export default Banner;
