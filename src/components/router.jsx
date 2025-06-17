import * as React from "react";
import { Switch, Route, Redirect } from "wouter";

import NorthHemisphere from "../pages/northHemisphere";
import SouthHemisphere from "../pages/southHemisphere";
import ControlKnob from "../pages/ControlKnob";
import ArduinoReceiver from "../pages/ArduinoReceiver";

export default () => (
  <Switch>
    <Route path="/">
      <Redirect to="/N/07" />
    </Route>
    <Route path="/N/:fov" component={NorthHemisphere} />
    <Route path="/S/:fov" component={SouthHemisphere} />

    {/* Rutas nuevas */}
    <Route path="/control" component={ControlKnob} />
    <Route path="/arduino" component={ArduinoReceiver} />
  </Switch>
);
