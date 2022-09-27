import { useCallback } from "react";
import { useState } from "react";

const usehttp = () => {
  const [movie2, setMovie2] = useState([]);
  const movieapp = useCallback(async () => {
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
    const TypeMovies = await fetch(
      `${"https://api.themoviedb.org/3" + requests.fetchNetflixOriginals}`
    );
    const Rendermovie = await TypeMovies.json();
    console.log(Rendermovie);
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
    setMovie2(dulieuphim);
  });
};

export default usehttp;
