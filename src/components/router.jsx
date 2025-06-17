import * as React from "react";
import { Switch, Route, Redirect } from "wouter";

import NorthHemisphere from "../pages/northHemisphere";
import SouthHemisphere from "../pages/southHemisphere";

export default () => (
  <Switch>
    <Route path="/">
      <Redirect to="/N/07" />
    </Route>
    <Route path="/N/:fov" component={NorthHemisphere} />
    <Route path="/S/:fov" component={SouthHemisphere} />

  </Switch>
);
