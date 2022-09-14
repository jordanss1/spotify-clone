import React, { createContext, useEffect, useState } from "react";
import { spotifyTokenAndSearch } from "../api";

const SearchContext = createContext();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [typeString, setTypeString] = useState("artist");

  const fullProviders = {
    term,
    selectedSong,
    submittedTerm,
    items,
    typeString,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    setTypeString,
    setSelectedSong,
  };

  useEffect(() => {
    const randomArtistInitial = [..."abcdefghijklmnopqrstuvwxyz"][
      Math.floor(Math.random() * 25)
    ];
    spotifyTokenAndSearch(randomArtistInitial, typeString, setItems, 12);
  }, []);

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
