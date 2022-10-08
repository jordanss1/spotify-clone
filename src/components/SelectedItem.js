import React, { useContext, useEffect } from "react";
import SearchContext from "../contexts/SearchStore";
import { gradient1 } from "../styles/inline";
import { motion } from "framer-motion";

const SelectedItem = () => {
  const { selectedItem, setSelectedItem, artist, setArtist, typeString } =
    useContext(SearchContext);

  const classFlex = selectedItem ? "flex-column" : "";

  useEffect(() => {
    if (sessionStorage.getItem("artist-details")) {
      setArtist(JSON.parse(sessionStorage.getItem("artist-details"))[0]);
    }
  }, []);

  const durationConvert = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  const renderSong = () => {
    if (!selectedItem) {
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <h2 className="ui header noSongHeader ps-1 mb-5">
            Search spotify songs
            <div className="sub header">
              Selected <b>details</b> will appear here
            </div>
          </h2>
        </div>
      );
    } else {
      const { album, artists, duration_ms, name, track_number } = selectedItem;
      return (
        <div
          className={`selectedDiv d-flex align-items-center ${classFlex} justify-content-evenly`}
        >
          <div className="w-100 d-flex justify-content-end align-items-center mt-2">
            <i
              onClick={() => setSelectedItem(null)}
              className="window close outline icon iconRed fs-4"
            ></i>
          </div>
          <div className="d-flex flex-column ms-0 mb-5 songItem justify-content-evenly">
            <img className="rounded" src={album.images[1].url} />
            <div className="ui items mt-0 description">
              <div className="item">
                <ul className="content d-flex flex-column justify-content-start justify-content-evenly align-content-center contentDescription">
                  <li className=" text-center">{`${name} by ${artists[0].name}`}</li>
                  <li className="text-center">{`${
                    album.album_type === "single" ? "Single:" : "Album:"
                  } ${album.name}`}</li>
                  <div className="text-center ">
                    <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
                  </div>
                  <li className="text-center mt-0">
                    Duration {durationConvert(duration_ms)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderArtist = () => {
    if (!artist) {
      return (
        <main className="artistPage d-grid">
          <section className="w-100 artistLeft d-flex justify-content-end align-items-center">
            <div class="ui active centered inline loader"></div>
          </section>
          <section className="w-100 h-100 d-grid artistRight">
            <div className="d-flex flex-column align-items-center justify-content-end artistHeading">
              <div class="ui active centered inline loader"></div>
            </div>
          </section>
        </main>
      );
    } else {
      const { external_urls, name, followers, images } = artist;
      const styles = {
        background: `${gradient1}
        url(${images[0]?.url}) no-repeat 0px/ 640px`,
      };
      return (
        <main className="artistPage d-grid">
          <section className="w-100 artistLeft d-flex justify-content-end">
            <div className="artistBg w-100 h-100" style={styles}></div>
          </section>
          <section className="w-100 h-100 d-grid artistRight">
            <div className="d-flex flex-column align-items-center justify-content-end artistHeading">
              <h1 className="fs-1">{name}</h1>
              <hr className="w-50 mt-2" />
              <div className="d-flex flex-row w-75 justify-content-center ms-5">
                <i
                  title={external_urls.spotify}
                  onClick={() => window.open(external_urls.spotify, "_blank")}
                  className="spotify icon fs-1 pe-5 me-3"
                ></i>
                <div className="vl"></div>
                <h2 className="fs-5 ps-4">{`${followers.total} followers`}</h2>
              </div>
            </div>
          </section>
        </main>
      );
    }
  };

  return <>{typeString === "track" ? renderSong() : renderArtist()}</>;
};

export default SelectedItem;
