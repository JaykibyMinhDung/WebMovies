import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
// import { useCallback } from "react";
import MovieDetail from "./MovieDetail";
import Authcontext from "../useHook-Custom/context";
import classes from "../Styled/StyledModal.module.css";
// import Modal from "../Styled/Modal";

const MovieData = (props) => {
  // const [isloadding, setIsLoadding] = useState(false);
  const [idmovie, setIdMovie] = useState([]);
  const ctx = useContext(Authcontext);

  // console.log(ctx);
  // Lấy trailer movie từ API về
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
      // console.log(RenderTrailer);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(ctx.MovieCTX.id);

  useEffect(() => {
    // console.log(ctx.MovieCTX);
    if (ctx.MovieCTX.id) {
      // Nếu có Id movie thì mới chạy hàm, không thì sẽ không chạy
      TrailerData(ctx.MovieCTX.id);
    }
  }, [ctx.MovieCTX]);
  return (
    <div className={classes.modal}>
      {/* Truyền mảng chứa dữ liệu của trailer vào modal */}
      <MovieDetail onData={idmovie} />
    </div>
  );
};

export default MovieData;

/*

Link: https://api.themoviedb.org/3//movie/1416/videos?api_key=a28e081bc24d2a37cb3c6cc39834e3db

{"id":1416,
"results":
  [{"iso_639_1":"en",
  "iso_3166_1":"US",
  "name":"Trailer to a film \"The Coast Guard / Hae anseon\" 2002, the director Ki-duk Kim",
  "key":"_PYag4NjXck",
  "site":"YouTube",
  "size":1080,
  "type":"Trailer",
  "official":false,
  "published_at":"2010-01-16T05:18:02.000Z",
  "id":"6214cc494284ea0040dc1761"}]}
*/
