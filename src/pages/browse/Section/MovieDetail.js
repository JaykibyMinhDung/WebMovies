import React from "react";
import { useContext } from "react";
import YouTube from "react-youtube";
import Styled from "../Styled/MovieStyled.module.css";
import Authcontext from "../useHook-Custom/context";

const MovieDetail = (props) => {
  const ctx = useContext(Authcontext);
  // Sau khi lấy trailer phim về thì sẽ lưu vào giá trị, giá trị chỉ lấy key để trình chiếu trailer
  const Datatrailer = props.onData.map((movie) => {
    return {
      key: movie.key,
      title: movie.name,
      type: movie.type,
      // image: movie.posterpath,
    };
  });
  // Thiết lập khung hình cho iFrame
  const opts = {
    height: "300",
    width: "180%",
    playerVars: {
      autoplay: 0,
    },
  };
  // Tạo truy vấn cho trailer, Ưu tiên lấy các bộ phim có chữ trailer
  const FindTrailerMovie = Datatrailer.find(
    (id) => id.type === "Trailer" || id.type === "Teaser"
  );
  return (
    <div className={Styled.modaltrailer}>
      <div className={Styled.overtrailer}>
        <header>
          <h2>{ctx.MovieCTX.name}</h2>
        </header>
        <hr />
        <p>Release Date: {ctx.MovieCTX.date}</p>
        <p>Vote: {ctx.MovieCTX.vote + "/10"}</p>
        <div>
          Describe :{" "}
          {ctx.MovieCTX.overview
            ? ctx.MovieCTX.overview
            : "Hiện tại chưa có mô tả chi tiết cho movie này các bạn có thể xem thêm ở google nha, ahihi 🤣🤣"}
        </div>
      </div>
      <div>
        {FindTrailerMovie ? (
          <YouTube videoId={FindTrailerMovie.key} opts={opts} />
        ) : (
          <img
            src={
              "https://image.tmdb.org/t/p/w500" +
              (ctx.MovieCTX.imageback
                ? ctx.MovieCTX.imageback
                : ctx.MovieCTX.image)
            }
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
