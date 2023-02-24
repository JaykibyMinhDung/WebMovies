import React from "react";
import Styled from "../Styled/MovieStyled.module.css";
import Movie from "./Movie.jsx";
import { useState, useEffect } from "react";
import { useRef } from "react";

const MovieList = (props) => {
  // console.log(props.API_Endpoint);
  // Lấy tọa độ X và Y
  const [ScrollRight, setScrollRight] = useState({ x: 0, y: 0 });
  const test = useRef();
  const HandleMouseMove = (event) => {
    // Bắt tọa độ x và Y của chuột. Sau đó thay đổi giá trị state, giá trị state được dùng để thay đổi vị trí slideimage khi di chuyển chuột
    setScrollRight({
      x: event.clientX,
      y: event.clientY,
    });
    // Khi di chuyển chuột sẽ tạo hiệu ứng lướt
    if (ScrollRight.x > 0) {
      test.current.scrollLeft += 5;
    }
    if (ScrollRight.x < 0) {
      test.current.scrollLeft -= 20;
    }
  };
  // console.log(ScrollRight.x);
  return (
    // Dùng để tạo các ảnh dọc và ảnh ngang
    <ul className={Styled.Movie_style} onDrag={HandleMouseMove} ref={test}>
      {props.API_Endpoint
        ? props.API_Endpoint.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.releasedate}
              openingText={movie.overview}
              image={movie.posterpath}
              imageback={movie.backdrop_path}
              Description={movie.overview}
              vote={movie.voteaverage}
            />
          ))
        : props.movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.releasedate}
              openingText={movie.overview}
              image={movie.backdrop_path}
              Description={movie.overview}
              vote={movie.voteaverage}
            />
          ))}
    </ul>
  );
};

export default MovieList;
