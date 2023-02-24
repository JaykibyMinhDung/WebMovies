import React from "react";
import { useRef } from "react";
import { useState } from "react";
import SearchIcon from "../../browse/Components/SearchIcon";
import AddNameFilm from "../Store/Context-search";
import Styled from "../Styled/MovieSearch.module.css";

const SearchBox = (props) => {
  const [addnamemovie, setAddNameMovie] = useState("");
  const Searchvalue = useRef(); // Theo dõi thanh input
  const Sendrequest = async (event) => {
    event.preventDefault(); // Tránh thực hiện tác vụ gửi cho server, điều này sẽ gây mất dữ liệu,reload lại trang
    const enteredMovie = await Searchvalue.current.value; // Láy dữ liệu từ ô input
    if (enteredMovie.trim().length === 0) {
      // valid value của input, nếu sai sẽ ngừng thực hiện các code bên dưới
      return;
    }
    console.log(`Dang load phim ${enteredMovie}`);
    setAddNameMovie(enteredMovie); // Lưu trữ tên phim để chuyển lên API tìm kiếm
    // ...
    Searchvalue.current.value = "";
  };
  // Thực hiện xóa input khi nhấn Search
  const Reset = (event) => {
    event.preventDefault();
    Searchvalue.current.value = "";
  };
  return (
    // truyền tên phim cho context hook, từ đó ResultList sẽ lấy được name movie và tìm kiếm
    <AddNameFilm.Provider value={addnamemovie}>
      <form className={Styled.Box} onSubmit={Sendrequest}>
        <div>
          <input
            ref={Searchvalue}
            type="search"
            name="searchmovie"
            placeholder="Ex: Thor"
          ></input>
          <SearchIcon />
        </div>
        <div className={Styled.line}></div>
        <button type="button" className={Styled.reset} onClick={Reset}>
          RESET
        </button>
        <button type="submit" className={Styled.search}>
          SEARCH
        </button>
      </form>
      {props.children}
    </AddNameFilm.Provider>
  );
};

export default SearchBox;

// setTimeout(() => {
//   if (!addnamemovie) {
//     props.onFilm.ham();
//   }
// }, 2000);
// props.onFilm();
