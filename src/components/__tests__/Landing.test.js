import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SearchContext, { SearchStore } from "../../contexts/SearchStore";
import { NavigationAndStore } from "../../../test-utils/test-utils";
import { history } from "../../../test-utils";
import Landing from "../Landing";
import Search from "../Search";

const WrapperComponent = ({ children }) => {
  return (
    <NavigationAndStore context={SearchContext} store={SearchStore}>
      {children}
    </NavigationAndStore>
  );
};

beforeEach(() => {
  history.push("/");
});

test("On hover the div is visible/class added and the class removed from Nav", async () => {
  const user = userEvent.setup();

  const { getByRole, container } = render(
    <Routes>
      <Route path={"/"} element={<Landing />} />
    </Routes>,
    { wrapper: WrapperComponent }
  );

  const button = getByRole("button", { name: "Get started!" });
  const div = container.getElementsByClassName("spotifyDiv")[0];
  const nav = getByRole("banner");

  expect(div).not.toHaveClass("spotifyLoad");

  await user.hover(button);

  expect(div).toHaveClass("spotifyLoad");
  expect(nav).not.toHaveClass("navClassAnimate");
});

test("On click of button, the Search component is mounted", async () => {
  const user = userEvent.setup();

  const { getByRole } = render(
    <Routes>
      <Route path={"/"} element={<Landing />} />
      <Route path={"/search"} element={<Search />} />
    </Routes>,
    { wrapper: WrapperComponent }
  );
  const button = getByRole("button", { name: "Get started!" });

  expect(history.location.pathname).toBe("/");

  user.click(button);

  await waitFor(
    () => {
      expect(history.location.pathname).toBe("/search");
    },
    { timeout: 1500 }
  );
});