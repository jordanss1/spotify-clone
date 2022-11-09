import React, { useCallback, useContext, useEffect, useMemo } from "react";
import Loader from "./Loader";
import LeftArrow from "./Arrows/LeftArrow";
import RightArrow from "./Arrows/RightArrow";
import {
  leftStyle,
  leftDisabledStyle,
  rightStyle,
  rightDisabledStyle,
} from "../styles/inline";
import SearchContext from "../contexts/SearchStore";

const ArtistAlbums = () => {
  const { albums, filteredAlbum, setFilteredAlbum } = useContext(SearchContext);

  useEffect(() => {
    setFilteredAlbum(0);
  }, []);

  const handleRightArrow = () => {
    const album = document.getElementsByClassName("albumCard")[0];
    album.classList.add("rightClick");

    setTimeout(() => {
      if (filteredAlbum < albums.length - 2) {
        setFilteredAlbum((prev) => prev + 1);
      } else {
        setFilteredAlbum(albums.length - 1);
      }
    }, 100);

    setTimeout(() => {
      album.classList.remove("rightClick");
    }, 200);
  };

  const handleLeftArrow = () => {
    const album = document.getElementsByClassName("albumCard")[0];
    album.classList.add("leftClick");

    setTimeout(() => {
      if (filteredAlbum > 1) {
        setFilteredAlbum((prev) => prev - 1);
      } else {
        setFilteredAlbum(0);
      }
    }, 180);

    setTimeout(() => {
      album.classList.remove("leftClick");
    }, 220);
  };

  const renderLeftArrow = useCallback(() => {
    if (!albums) {
      <Loader />;
    } else if (filteredAlbum === 0 || albums.noAlbums) {
      return <LeftArrow style={leftDisabledStyle} />;
    } else {
      return <LeftArrow func={handleLeftArrow} style={leftStyle} />;
    }
  }, [filteredAlbum]);

  const renderRightArrow = useCallback(() => {
    if (!albums) {
      <Loader />;
    } else if (filteredAlbum === albums.length - 1 || albums.noAlbums) {
      return <RightArrow style={rightDisabledStyle} />;
    } else {
      return <RightArrow func={handleRightArrow} style={rightStyle} />;
    }
  }, [filteredAlbum]);

  const renderAlbums = useCallback(() => {
    if (!albums) {
      <div className="ui raised centered card albumCard">
        <div className="image">
          <Loader />
        </div>
        <div className="content"></div>
      </div>;
    } else if (albums.noAlbums) {
      return <h3 className="align-self-center">No albums</h3>;
    } else if (albums.length > 0 && !albums.noAlbums && albums[filteredAlbum]) {
      const { name, images } = albums[filteredAlbum];

      return (
        <div className="ui raised card albumCard">
          <div className="image d-flex justify-content-center pt-1 ps-1">
            {images[1] ? <img src={`${images[1].url}`} /> : <h3>No image</h3>}
          </div>
          <div className="content d-flex align-items-center justify-content-center p-0">
            <h3 className="header fs-5 text-center w-100 px-1">{name}</h3>
          </div>
        </div>
      );
    }
  }, [filteredAlbum]);

  return (
    <section className="d-flex flex-row justify-content-center justify-content-evenly pt-4">
      {renderLeftArrow()}
      {renderAlbums()}
      {renderRightArrow()}
    </section>
  );
};

export default ArtistAlbums;