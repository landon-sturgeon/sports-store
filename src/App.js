import React, { Component, lazy, Suspense } from "react";
import { SportsStoreDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ShopConnector from "./connectors/ShopConnector";
import { AuthProviderImpl } from "./auth/AuthProviderImpl";

const Admin = lazy(() => import("./admin/Admin"));

class App extends Component {
  render() {
    return (
      <Provider store={SportsStoreDataStore}>
        <AuthProviderImpl>
          <Router>
            <Routes>
              <Route path="/shop" element={ShopConnector} />
              <Route
                path="/admin"
                render={(routeProps) => (
                  <Suspense fallback={<h3>Loading...</h3>}>
                    <Admin {...routeProps} />
                  </Suspense>
                )}
              />
              <Navigate to="/shop" />
            </Routes>
          </Router>
        </AuthProviderImpl>
      </Provider>
    );
  }
}

export default App;
