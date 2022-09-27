import React from "react";
import { useCallback, useEffect, useState } from "react";
import MovieList from "./MoviesList";

const DataHttp = (props) => {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);

  const movieApp = useCallback(async () => {
    setLoading(true);
    setError(null);
    // Kiểm tra trạng thái response, xem cấu trúc của response
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/550?api_key=a28e081bc24d2a37cb3c6cc39834e3db"
    );
    // Khối try catch để ném lỗi cần thiết khi có vấn đề xảy ra với server
    try {
      //Trích xuất dữ liệu data ra khỏi response
      const data = await response.json();
      // Kiểm tra cấu trúc bên trong
      console.log(response);
      console.log(data);
      // Nếu trạng thái không hoàn thành thì sẽ tạo ra lỗi cho lập trình
      if (!response.ok) {
        throw new Error("Something were wrong!");
      }
      //   const ListMovie = data.map((list) => {
      //     return {
      //       page: list.page,
      //       total_pages: list.total_pages,
      //       total_results: list.total_results,
      //     };
      //   });

      // URL login web: https://api.themoviedb.org/3/trending/all/week?api_key=a28e081bc24d2a37cb3c6cc39834e3db&language=en-US

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

      // Tìm results của các API Endpoint
      // Truy cập vào Endpoint
      const TypeMovies = await fetch(
        `${"https://api.themoviedb.org/3" + requests.fetchNetflixOriginals}`
      );
      // Lấy dữ liệu từ Endpoint
      const Rendermovie = await TypeMovies.json();
      console.log(Rendermovie);
      // Lưu dữ liệu phim vào mảng sau đó xuất ra màn hình
      const dulieuphim = await Rendermovie.results.map((dulieu) => {
        return {
          backdrop_path: dulieu.backdrop_path, // This is image of films
          genre_ids: dulieu.genre_ids,
          id: dulieu.id,
          mediatype: dulieu.media_type,
          title: `${dulieu.title === undefined ? dulieu.name : dulieu.title}`, // Title movies
          originallanguage: dulieu.original_language,
          originaltitle: dulieu.original_title,
          overview: dulieu.overview, // This is introduction
          popularity: dulieu.popularity,
          posterpath: dulieu.poster_path,
          releasedate: `${
            !dulieu.release_date ? dulieu.first_air_date : dulieu.release_date
          }`, // ReleaseDates
          video: dulieu.video,
          voteaverage: dulieu.vote_average,
          votecount: dulieu.vote_count,
        };
      });
      // In mảng ra console
      console.log(dulieuphim);
      const randommovie =
        Rendermovie.results[
          Math.floor(Math.random() * Rendermovie.results.length - 1)
        ];
      props.onProps({
        name: randommovie.name,
        overview: randommovie.overview,
      });
      console.log(randommovie.overview);
      setMovie(dulieuphim);
    } catch (error) {
      setError(error.message); // Thiết lập lỗi
    }
    setLoading(false); // Trạng thái Loading
  }, []);
  useEffect(() => {
    movieApp(); // Thiết lập lại dữ liệu in ra console và màn hình mỗi khi load lại trang
  }, []);
  return (
    <React.Fragment>
      <section>
        <button onClick={movieApp}>Fetch Movies</button>
      </section>
      <section>
        <p>Xu hướng</p>
        {!Loading && movie.length > 0 && <MovieList movies={movie} />}
        {!Loading && movie.length === 0 && <p>Khong co bo phim nao ca</p>}
        {!Loading && movie.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section>
      {/* <section>
        {!Loading && movie.length > 0 && <MovieList movies={movie} />}
        {!Loading && movie.length === 0 && <p>Khong co bo phim nao ca</p>}
        {!Loading && movie.length === 0 && error && (
          <p>Something were wrong !</p>
        )}
        {Loading && <b> Loading... </b>}
      </section> */}
    </React.Fragment>
  );
};

export default DataHttp;
