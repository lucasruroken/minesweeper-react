import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { RecoilRoot } from 'recoil'
import {Header} from "./components/Layout/Header";
import {routes} from "./config/routes";

import "./App.css"
import {AppContainer} from "./containers/AppContainer";

function App() {
  return (
    <RecoilRoot>
      <AppContainer>
        <Router>
          <Header />
          <div className="site-container">
            <div className="container-fluid">
              <div className="container">
                <Switch>
                  {
                    routes.map(route => {
                      return <Route exact={true} key={route.to} path={route.to} component={route.component} />
                    })
                  }
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </AppContainer>
    </RecoilRoot>
  );
}

export default App;
