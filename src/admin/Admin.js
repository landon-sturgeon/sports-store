import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";
import { Route, Navigate, Routes } from "react-router-dom";
import ToggleLink from "../components/ToggleLink";
import { ConnectedProducts } from "./ProductsConnector";
import { ProductEditor } from "./ProductEditor";
import { ProductCreator } from "./ProductCreator";
import { AuthPrompt } from "../auth/AuthPrompt";
import { authWrapper } from "../auth/AuthWrapper";

export default authWrapper(
  class extends Component {
    constructor(props) {
      super(props);
      this.client = new ApolloClient({
        uri: GraphQlUrl,
        request: (gqloperation) =>
          gqloperation.setContext({
            headers: {
              Authorization: `Bearer<${this.props.webToken}>`,
            },
          }),
      });
    }

    render() {
      return (
        <ApolloProvider client={this.client}>
          <div className="container-fluid">
            <div className="row">
              <div className="col bg-info text-white">
                <div className="navbar-brand">SPORTS STORE</div>
              </div>
            </div>
            <div className="row">
              <div className="col-3 p-2">
                <ToggleLink to="/admin/orders">Orders</ToggleLink>
                <ToggleLink to="/admin/products">Products</ToggleLink>
                {this.props.isAuthenticated && (
                  <button
                    onClick={this.props.signout}
                    className="btn btn-block btn-secondary m-2 fixed-bottom col-3"
                  >
                    Log Out
                  </button>
                )}
              </div>
              <div className="col-9 p-2">
                <Routes>
                  {!this.props.isAuthenticated && (
                    <Route element={AuthPrompt} />
                  )}
                  <Route path="/admin/orders" element={OrdersConnector} />
                  <Route
                    path="/admin/products/create"
                    element={ProductCreator}
                  />
                  <Route path="/admin/products/:id" element={ProductEditor} />
                  <Route path="/admin/products" element={ConnectedProducts} />
                  <Navigate to="/admin/orders" />
                </Routes>
              </div>
            </div>
          </div>
        </ApolloProvider>
      );
    }
  }
);
