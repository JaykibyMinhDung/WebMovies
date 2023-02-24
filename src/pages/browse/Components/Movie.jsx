import React from "react";
// import { Slide } from "react-slideshow-image";
// import { useEffect } from "react";
import { useContext } from "react";
import Styled from "../Styled/MovieStyled.module.css";
import Authcontext from "../useHook-Custom/context";

const Movie = (props) => {
  const ctx = useContext(Authcontext);
  const displaytrailer = () => {
    const DataContext = {
      name: props.title,
      id: props.id,
      date: props.releaseDate,
      overview: props.Description,
      vote: props.vote,
      image: props.image,
      imageback: props.imageback,
    };
    // Hiển thị và ẩn phim khi nhấn vào ảnh
    if (DataContext.id !== ctx.MovieCTX.id) {
      ctx.onShow();
    } else {
      ctx.onHide();
    }
    // Truyền dữ liệu cho value của contextHook
    ctx.onReceive(DataContext);
    return DataContext;
  };
  return (
    <li>
      <img
        className={Styled.Img_style}
        onClick={displaytrailer}
        src={"https://image.tmdb.org/t/p/w500" + props.image}
        alt="Anh loi"
      />
    </li>
  );
};

export default Movie;
