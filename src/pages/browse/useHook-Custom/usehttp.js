import { useCallback, useEffect } from "react";
import { useState } from "react";

const useHttp = (URL) => {
  const [Arraymovie, setArraymovie] = useState([]);
  const [error, setError] = useState(null);
  const [Loading, setLoading] = useState(false);
  const SendRequest = useCallback(async () => {
    // Tìm results của các API Endpoint
    // Truy cập vào Endpoint
    const TypeMovies = await fetch(`${"https://api.themoviedb.org/3" + URL}`);
    try {
      // Khối try catch để ném lỗi cần thiết khi có vấn đề xảy ra với server
      // Lấy dữ liệu từ Endpoint
      const Rendermovie = await TypeMovies.json();
      // Kiểm tra cấu trúc bên trong
      // console.log(Rendermovie);
      // Lưu dữ liệu phim vào mảng sau đó xuất ra màn hình
      const dulieuphim = await Rendermovie.results.map((dulieu) => {
        return {
          backdrop_path: dulieu.backdrop_path, // This is image of background
          genre_ids: dulieu.genre_ids,
          id: dulieu.id,
          mediatype: dulieu.media_type,
          title: `${dulieu.title === undefined ? dulieu.name : dulieu.title}`, // Title movies
          originallanguage: dulieu.original_language,
          originaltitle: dulieu.original_title,
          overview: dulieu.overview, // This is introduction
          popularity: dulieu.popularity,
          posterpath: dulieu.poster_path, // This is image title
          releasedate: `${
            !dulieu.release_date ? dulieu.first_air_date : dulieu.release_date
          }`, // ReleaseDates
          video: dulieu.video,
          voteaverage: dulieu.vote_average,
          votecount: dulieu.vote_count,
        };
      });
      // In mảng ra console
      // console.log(dulieuphim);
      // Chuyển dữ liệu
      setArraymovie(dulieuphim);
    } catch (error) {
      setError(error.message); // Thiết lập lỗi
    }
    setLoading(false); // Trạng thái Loading
  }, [URL]);
  // useEffect(() => {
  //   SendRequest; // Thiết lập lại dữ liệu in ra console và màn hình mỗi khi load lại trang
  // }, []);
  return {
    error,
    Loading,
    Arraymovie,
    SendRequest,
  };
};

export default useHttp;
