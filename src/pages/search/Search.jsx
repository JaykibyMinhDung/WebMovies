import React from "react";
import { useState } from "react";
import Navbar from "../browse/Components/Navbar";
import DetailHttp from "./Components/DetailHttp";
import Results from "./Components/ResultsList";
import SearchBox from "./Components/SearchFrom";

const Search = () => {
  const [isYoutube, setIsYoutube] = useState(false);
  // Biến Data sẽ được dùng để truyền cho các component phị trách tìm trailer phim, ngoài ra nó tạo thêm tính ẩn và hiện cho modal
  const [Data, setData] = useState([]);

  const InitModalTrailer = (e) => {
    setData(e); // Lấy dư liệu trailer phim từ ResultsList
    if (Data === null || Data.id === e.id) {
      // Dư liệu phim lấy về trống sẽ không hiện modal
      setIsYoutube(false);
    } else {
      // Dư liệu phim lấy về có mảng sẽ hiện modal
      setIsYoutube(true);
    }
    // console.log(e);
  };
  return (
    <SearchBox>
      {/*  onFilm={ClickMovie} */}
      <Navbar />
      <Results onVirus={InitModalTrailer} />
      {/* Điều kiện hiện modal */}
      {isYoutube && <DetailHttp onSecurity={Data} />}
      {/* onMovie={Propsmovie} */}
    </SearchBox>
  );
};

export default Search;
