import React from "react";
import { useCallback, useEffect, useState } from "react";
import Styled from "../Styled/MovieStyled.module.css";
import MovieList from "./MoviesList";
import useHttp from "../useHook-Custom/usehttp";

const DataHttp = (props) => {
  // const [movie, setMovie] = useState([]);
  // Các Endpoint đề bài cung cấp
  const requests = {
    fetchTrending: `/trending/all/week?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&with_genres=99`,
    fetchSearch: `/search/movie?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US`,
  };
  // Loc danh sach tung bo phim
  const {
    error,
    Loading,
    Arraymovie: trend,
    SendRequest: requesttrend,
  } = useHttp(requests.fetchTrending);
  const { Arraymovie: Netflix, SendRequest: requestnetflix } = useHttp(
    requests.fetchNetflixOriginals
  );
  const { Arraymovie: toprate, SendRequest: requesttoprate } = useHttp(
    requests.fetchTopRated
  );
  const { Arraymovie: action, SendRequest: requestaction } = useHttp(
    requests.fetchActionMovies
  );
  const { Arraymovie: Comedy, SendRequest: requestcomedy } = useHttp(
    requests.fetchComedyMovies
  );
  const { Arraymovie: Horror, SendRequest: requesthorror } = useHttp(
    requests.fetchHorrorMovies
  );
  const { Arraymovie: Romance, SendRequest: requestromance } = useHttp(
    requests.fetchRomanceMovies
  );
  const { Arraymovie: document, SendRequest: requestdocument } = useHttp(
    requests.fetchDocumentaries
  );

  // URL login web: https://api.themoviedb.org/3/trending/all/week?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US
  // Lấy danh sách phim random từ fetchNetflixOriginals
  const moviebanner = useCallback(async () => {
    const TypeMovies = await fetch(
      `${"https://api.themoviedb.org/3" + requests.fetchTrending}`
    );
    const Rendermovie = await TypeMovies.json();
    // console.log(Rendermovie);
    const randommovie = await Rendermovie.results[
      Math.floor(Math.random() * Rendermovie.results.length - 1)
    ];

    // Truyền thông tin sang cho banner
    props.onProps({
      name: `${
        randommovie.title === undefined || randommovie === ""
          ? randommovie.name
          : randommovie.title // Vì name movie không đồng bộ nên sẽ phải có điều kiện, có movie đặt là title, có movie đặt là name
      }`,
      overview: randommovie.overview,
      image: randommovie.backdrop_path,
      id: randommovie.id,
    });
  });
  // Cập nhật phim khi tải trang
  useEffect(() => {
    moviebanner();
    requesttrend();
    requestnetflix();
    requesttoprate();
    requestaction();
    requestcomedy();
    requesthorror();
    requestromance();
    requestdocument();
  }, []);

  return (
    <React.Fragment>
      <div className={Styled.scroll_row_origin}>
        <p>Netflix</p>
        {!Loading && Netflix.length > 0 && <MovieList API_Endpoint={Netflix} />}
        {!Loading && Netflix.length === 0 && <p>Not found movie</p>}
        {!Loading && Netflix.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </div>
      <section className={Styled.scroll_row_all}>
        <p>Trending</p>
        {!Loading && trend.length > 0 && <MovieList movies={trend} />}
        {!Loading && trend.length === 0 && <p>Not found movie</p>}
        {!Loading && trend.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>Top movie</p>
        {!Loading && toprate.length > 0 && <MovieList movies={toprate} />}
        {!Loading && toprate.length === 0 && <p>Not found movie</p>}
        {!Loading && toprate.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>Action</p>
        {!Loading && action.length > 0 && <MovieList movies={action} />}
        {!Loading && action.length === 0 && <p>Not found movie</p>}
        {!Loading && action.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>Comedy</p>
        {!Loading && Comedy.length > 0 && <MovieList movies={Comedy} />}
        {!Loading && Comedy.length === 0 && <p>Not found movie</p>}
        {!Loading && Comedy.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>horror</p>
        {!Loading && Horror.length > 0 && <MovieList movies={Horror} />}
        {!Loading && Horror.length === 0 && <p>Not found movie</p>}
        {!Loading && Horror.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>Romances</p>
        {!Loading && Romance.length > 0 && <MovieList movies={Romance} />}
        {!Loading && Romance.length === 0 && <p>Not found movie</p>}
        {!Loading && Romance.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      <section className={Styled.scroll_row_all}>
        <p>Documents</p>
        {!Loading && document.length > 0 && <MovieList movies={document} />}
        {!Loading && document.length === 0 && <p>Not found movie</p>}
        {!Loading && document.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
    </React.Fragment>
  );
};

export default DataHttp;
