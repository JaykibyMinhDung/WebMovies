import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "./SearchIcon";
import { useEffect } from "react";
import { useState } from "react";
import Styled from "../Styled/Navbar.module.css";

const Navbar = (props) => {
  const [scroll, setScroll] = useState(0);
  // const [event, SetEvent] = useState(true);
  // Thay đổi class khi thay đổi tọa độ. Trạng thái class scroll và trạng thái class Scroll_state2
  const classess = `${scroll > 100 ? Styled.Scroll : Styled.Scroll_state2}`;

  const handleSearch = () => {
    window.location.assign("/Search/"); // Quay lại trang Search
  };
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
    <div className={classess}>
      <div className={Styled.navbar}>
        <Link to="/">Movie App</Link>
        <SearchIcon onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Navbar;
