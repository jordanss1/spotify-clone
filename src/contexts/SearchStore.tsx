import React, { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { spotifyTokenAndSearch, spotifyArtistAndAlbum } from "../api";
import {
  useAnimateSearchManager,
  useAnimateListManager,
} from "./AnimateStateHooks";
import { useArtistResults } from "./SearchResultHooks";

type StyleObjects =
  | { x: number; opacity: number }
  | { y: number; opacity: number };

interface animationObjects {
  initial: StyleObjects;
  exit: StyleObjects;
}

type fullProviders = {
  animateStateSearch: animationObjects;
  filteredAlbum: number;
  filteredTrack: number;
  topTracks: null | [];
  albums: null | [];
  focused: boolean;
  slicedElements: number[];
  page: number;
  typeString: string;
  term: null | string;
  selectedItem: null;
  submittedTerm;
  items;
  setAnimateStateList;
  setAnimateStateSearch;
  setFilteredAlbum;
  setFilteredTrack;
  setProfile;
  deleteProfile;
  setSlicedElements;
  setPage;
  setTypeString;
  setTerm;
  setSubmittedTerm;
  setItems;
  spotifyTokenAndSearch;
  spotifyArtistAndAlbum;
  setSelectedItem;
  navigate;
};

type searchStoreResult = ReturnType<typeof SearchStore>;

const SearchContext = createContext<searchStoreResult>();

export const SearchStore = ({ children }) => {
  const [term, setTerm] = useState("");
  const [submittedTerm, setSubmittedTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [typeString, setTypeString] = useState("");
  const [page, setPage] = useState(1);
  const [slicedElements, setSlicedElements] = useState([0, 10]);
  const [filteredAlbum, setFilteredAlbum] = useState(0);
  const [filteredTrack, setFilteredTrack] = useState(0);

  const { animateStateSearch, setAnimateStateSearch } = useAnimateSearchManager(
    {
      initial: { y: 100, opacity: 0.5 },
      exit: { y: 0, opacity: 0 },
    }
  );

  const { animateStateList, setAnimateStateList } = useAnimateListManager({
    initial: { x: -300, opacity: 0 },
    exit: { x: -300, opacity: 0 },
  });

  const { artist, albums, topTracks, setProfile, deleteProfile } =
    useArtistResults({
      artist: null,
      albums: null,
      topTracks: null,
    });

  const focused = useRef(false);

  const navigate = useNavigate();

  const fullProviders = {
    animateStateSearch,
    animateStateList,
    filteredAlbum,
    filteredTrack,
    topTracks,
    artist,
    albums,
    focused,
    slicedElements,
    page,
    typeString,
    term,
    selectedItem,
    submittedTerm,
    items,
    setAnimateStateList,
    setAnimateStateSearch,
    setFilteredAlbum,
    setFilteredTrack,
    setProfile,
    deleteProfile,
    setSlicedElements,
    setPage,
    setTypeString,
    setTerm,
    setSubmittedTerm,
    setItems,
    spotifyTokenAndSearch,
    spotifyArtistAndAlbum,
    setSelectedItem,
    navigate,
  };

  return (
    <SearchContext.Provider value={fullProviders}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
