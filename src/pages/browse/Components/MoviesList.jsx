import React from "react";
import Styled from "../Styled/MovieStyled.module.css";
import Movie from "./Movie.jsx";

const MovieList = (props) => {
  return (
    <div className={Styled.Movie_style}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releasedate}
          openingText={movie.overview}
          image={movie.posterpath}
        />
      ))}
    </div>
  );
};

export default MovieList;
