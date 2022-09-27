import React from "react";
import SearchIcon from "./SearchIcon";
import { useEffect } from "react";
import { useState } from "react";
import Styled from "../Styled/Navbar.module.css";

const Navbar = (props) => {
  const [scroll, setScroll] = useState(0);
  // const [event, SetEvent] = useState(true);
  const classess = `${scroll > 100 ? Styled.Scroll : Styled.Scroll_state2}`;

  useEffect(() => {
    const onScroll = () => setScroll(window.pageYOffset); // Lấy số liệu từ việc scroll
    // clean up code
    // web sẽ lắng nghe và thực hiện scroll xuống số liệu mình đang có
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true }); // scroll xuống số liệu đã được lưu ở onScroll
    return () => window.removeEventListener("scroll", onScroll); // Tránh lặp sự kiện
  }, []);
  // console.log(scroll);
  return (
    <div className={Styled.image}>
      <div className={classess}>
        <div className={Styled.navbar}>
          <a href="./Browse">Movie App</a>
          <SearchIcon />
        </div>
      </div>
      <p>{props.onData.name}</p>
      <div>
        <button className={Styled.button_play}>Play</button>
        <button className={Styled.button_Mylist}>My List</button>
      </div>
      <div>
        <p>{props.onData.overview}</p>
      </div>
    </div>
  );
};

export default Navbar;
