import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Appointments from "./pages/Appointments";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Appointments} />
          <Route exact path="/appointments" component={Appointments} />
          <Route exact path="/appointments/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
