import React from "react";
import { useState } from "react";
import { useContext } from "react";
// import { useCallback } from "react";
import { useEffect } from "react";
import AddNameFilm from "../Store/Context-search";
import Styled from "../Styled/MovieSearch.module.css";

const Results = (props) => {
  const ctxsearch = useContext(AddNameFilm);
  const [SortMovie, setSortMovie] = useState([]);
  const Searchmovie = async (Name) => {
    // Khi có tên phim rồi sẽ thực hiện lấy dữ liệu từ API về
    const Data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US&query=${Name}&page=1&include_adult=false`
    );
    const response = await Data.json();
    console.log(response);
    const PreSortMovie = await response.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        releaseDate: movie.release_date,
        openingText: movie.overview,
        image: movie.poster_path,
        vote: movie.vote_average,
      };
    });
    // Truyền dữ liệu phim ra khỏi hàm
    setSortMovie(PreSortMovie);
    console.log(PreSortMovie);

    // console.log(response);
  };
  // Khi người dùng click vào một bộ phim, hàm sẽ lấy dữ liệu từ phim đó rà soát trong toàn bộ mảng phim thu về. Nếu tìm thấy title phù hợp, hàm sẽ trả về một mảng chứa toàn bộ thông tin trailer phim
  const displaytrailer = (event) => {
    const sort = SortMovie.find((e) => e.title === event.target.alt);

    // console.log(event.target.alt);
    // console.log(sort);
    props.onVirus(sort);
  };

  useEffect(() => {
    if (ctxsearch !== "") {
      Searchmovie(ctxsearch); // Truyền dư liệu tên phim vào làm tham số
    }
  }, [ctxsearch]);
  return (
    <React.Fragment>
      <div style={{ marginTop: "18%", marginLeft: "2%", marginRight: "2%" }}>
        <p style={{ color: "white", fontSize: "larger" }}>Results</p>
        {SortMovie.map((movie) => (
          <img
            key={movie.id}
            className={Styled.Results}
            onClick={displaytrailer}
            src={"https://image.tmdb.org/t/p/w500" + movie.image}
            alt={movie.title}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Results;
