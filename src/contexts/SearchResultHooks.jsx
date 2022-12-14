import { useCallback, useReducer } from "react";

export const useArtistResults = (initialState) => {
  const [items, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD":
        return {
          ...state,
          artist: action.artist,
          albums: action.albums,
          topTracks: action.topTracks,
        };
    }
  }, initialState);

  const setProfile = useCallback((artist, albums, topTracks) => {
    dispatch({
      type: "ADD",
      artist,
      albums,
      topTracks,
    });
  });

  const { artist, albums, topTracks } = items;

  return { artist, albums, topTracks, setProfile };
};
