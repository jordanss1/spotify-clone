import React, { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import SearchContext from "../contexts/SearchStore";
import SearchBar from "./SearchBar";

const SearchList = () => {
  const { items, page, setPage, elements, setElements, typeString } =
    useContext(SearchContext);

  const content = () => {
    return (
      <div className="d-flex listNavbar">
        <div className="text-lowercase">
          <span className="w">w.</span>
          <span className="pink me-2">s</span>
        </div>
        <span className="underScore ms-1">_</span>
        <div className="d-flex align-items-end ps-2 pe-2 pb-3 listSpotify">
          <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
            powered by
          </h2>
          <i className="spotify icon mb-1 fs-1 pe-1 spotifyIconList"></i>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const nav = document.getElementsByClassName("navClass")[0];
    nav.classList.add("navClassList");
  });

  useEffect(() => {
    if (page === 1) {
      setElements([0, 10]);
    }
    if (page === 2) {
      setElements([11, 21]);
    }
    if (page === 3) {
      setElements([22, 32]);
    }
    if (page === 4) {
      setElements([33, 43]);
    }
  }, [page])

  const renderSongs = () => {
    if (!items) {
    }
  };

  const renderArtists = (elements) => {
    if (items.length === 0) {
      return (
        <div className="ui segment h-100 loading p-0 m-0">
          <div className="ui active dimmer loading">
            <div className="ui massive text loader"></div>
          </div>
        </div>
      );
    } else if (items.length > 0) {
      return (
        <section className="w-100 d-grid listContainer align-items-center justify-content-center mt-1">
          <div className="d-flex align-items-center justify-content-center justify-content-between searchListDiv align-self-end border rounded-3">
            <h2 className="ms-4 fs-3 pt-1 typeHeader">Artists</h2>
            <SearchBar />
          </div>
          <div className="d-grid listGrid">
            {items.slice(elements[0], elements[1]).map(({ external_urls, name, images }, i) => {
              return (
                <div className="artistContainer">
                  <article class="ui fluid card">
                    {!images.length ? (
                      <div class="image p-5">
                        <h3>No image</h3>
                      </div>
                    ) : (
                      <div class="image pb-0">
                        <img className="artistImage p-1" src={images[0].url} />
                      </div>
                    )}
                    <div class="content artistContent ps-2 pt-1  d-flex justify-content-center justify-content-evenly align-content-center p-0">
                      <i class="user outline icon fs-4"></i>
                      <a class="header text-center fs-6 pt-2">{name}</a>
                      <i class="spotify icon fs-4"></i>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
  };

  return (
    <main className="wholeListContainer container-fluid d-flex flex-column">
      <NavBar content={content} />
      {renderArtists(elements)}
      {typeString === "artist" ? (
        <div
          className={`w-100 justify-content-center mb-4 ${
            items.length === 0 ? "d-none" : "d-flex"
          }`}
        >
          <div className="d-flex justify-content-center justify-content-between pages w-25 fs-1">
            <p onClick={() => setPage(1)}>1</p>
            <p onClick={() => setPage(2)}>2</p>
            <p onClick={() => setPage(3)}>3</p>
            <p onClick={() => setPage(4)}>4</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default SearchList;
