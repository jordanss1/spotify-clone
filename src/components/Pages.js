import React, { useEffect, useContext } from "react";
import SearchContext from "../contexts/SearchStore";

const Pages = () => {
  const { setSlicedElements, setPage, page, items } = useContext(SearchContext);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page === 1) {
      setSlicedElements([0, 10]);
    }
    if (page === 2) {
      setSlicedElements([11, 21]);
    }
    if (page === 3) {
      setSlicedElements([22, 32]);
    }
    if (page === 4) {
      setSlicedElements([33, 43]);
    }
  }, [page]);

  const handlePageClick = () => {
    document
      .getElementsByClassName("artistGrid")[0]
      .scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`w-100 pages justify-content-center  mb-lg-4 ${
        items.length === 0 ? "d-none" : "d-flex"
      }`}
    >
      <div className="d-flex justify-content-center justify-content-between pages w-75 fs-1">
        <p
          style={page === 1 ? { cursor: "default" } : { cursor: "pointer" }}
          hidden={items.length < 11}
          onClick={() => {
            setPage(1);
            handlePageClick();
          }}
        >
          1
        </p>
        <p
          style={page === 2 ? { cursor: "default" } : { cursor: "pointer" }}
          hidden={items.length < 11}
          onClick={() => {
            setPage(2);
            handlePageClick();
          }}
        >
          2
        </p>
        <p
          style={page === 3 ? { cursor: "default" } : { cursor: "pointer" }}
          hidden={items.length < 21}
          onClick={() => {
            setPage(3);
            handlePageClick();
          }}
        >
          3
        </p>
        <p
          style={page === 4 ? { cursor: "default" } : { cursor: "pointer" }}
          hidden={items.length < 31}
          onClick={() => {
            setPage(4);
            handlePageClick();
          }}
        >
          4
        </p>
      </div>
    </div>
  );
};

export default Pages;
