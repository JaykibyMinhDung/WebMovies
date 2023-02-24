import React from "react";
import YouTube from "react-youtube";
import Classes from "../../browse/Styled/MovieStyled.module.css";
// import Modal from "../../browse/Styled/Modal";

const DetailSearch = (props) => {
  const opts = {
    height: "300",
    width: "180%",
    playerVars: {
      autoplay: 0,
      origin: "http://localhost:3000",
      host: "https://www.youtube.com",
    },
  };
  // Ưu tiên trailer phim có type là trailer
  const FindTrailerMovie = props.onData.find(
    (id) => id.type === "Trailer" || id.type === "Teaser"
  );
  return (
    <React.Fragment>
      <div className={Classes.modaltrailer}>
        <div className={Classes.overtrailer}>
          <header>
            <h2>{props.onInformationTrailer.title}</h2>
          </header>
          <hr />
          <p>Release Date: {props.onInformationTrailer.releaseDate}</p>
          <p>Vote: {props.onInformationTrailer.vote + "/10"}</p>
          <div>{props.onInformationTrailer.openingText}</div>
        </div>
        <div>
          {FindTrailerMovie ? (
            <YouTube videoId={FindTrailerMovie.key} opts={opts} />
          ) : (
            <img
              src={
                "https://image.tmdb.org/t/p/w500" +
                props.onInformationTrailer.image
              }
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailSearch;
