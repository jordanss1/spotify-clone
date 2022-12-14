import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./Landing";
import Search from "./Search";
import SearchList from "./SearchList";
import { AnimatePresence } from "framer-motion";
import SelectedItem from "./SelectedItem";

const App = () => {
  const location = useLocation();

  return (
    <AnimatePresence initial={false} mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/artists">
          <Route index element={<SearchList />} />
          <Route path="/artists/:id" element={<SelectedItem />} />
        </Route>
        <Route path="/songs" element={<SearchList />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
