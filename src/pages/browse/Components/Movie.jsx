import React from "react";
import Styled from "../Styled/MovieStyled.module.css";

const Movie = (props) => {
  return (
    <React.Fragment>
      <img
        className={Styled.Img_style}
        src={"https://image.tmdb.org/t/p/w500" + props.image}
        alt="Anh loi"
      />
    </React.Fragment>
  );
};

export default Movie;
