import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home'
import Map from '../containers/Map'
import RouteMap from '../containers/RouteMap'
import Notfound from './Notfound'
import ToastWrapper from './ToastWrapper'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/route/:routeId" component={RouteMap} />
            <Route component={Notfound} />
          </Switch>
          <ToastWrapper />
        </div>
      </Router>
    );
  }
}

export default App;
