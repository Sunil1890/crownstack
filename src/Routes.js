import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";

function Routes() {
  return (
    <div>
      <Route exact path="/">
        <Home />
      </Route>
    </div>
  );
}

export default Routes;
