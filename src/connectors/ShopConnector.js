import React, { Component } from "react";
import { Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as ShopActions from "../data/ActionCreaters";
import { DataTypes } from "../data/Types";
import Shop from "../components/shop/Shop";
import * as CartActions from "../data/CartActionCreators";
import CartDetails from "../components/shop/CartDetail";
import { DataGetter } from "../data/DataGetter";
import Checkout from "../components/shop/Checkout";
import Thanks from "../components/shop/Thanks";

const mapDispatchToProps = { ...ShopActions, ...CartActions };

const ShopConnector = connect(
  (ds) => ds,
  mapDispatchToProps
)(
  class extends Component {
    selectComponent = (routeProps) => {
      const wrap = (Component, Content) => (
        <Component {...this.props} {...routeProps}>
          {Content && wrap(Content)}
        </Component>
      );
      switch (routeProps.match.params.section) {
        case "products":
          return wrap(DataGetter, Shop);
        case "cart":
          return wrap(CartDetails);
        case "checkout":
          return wrap(Checkout);
        case "thanks":
          return wrap(Thanks);
        default:
          return <Navigate to="/shop/products/all/1" />;
      }
    };

    render() {
      return (
        <Routes>
          <Navigate
            from="/shop/products/:category"
            to="/shop/products/:category/1"
            exact={true}
          />
          <Navigate
            path={"/shop:section?/:category?/:page?"}
            render={(routeProps) => this.selectComponent(routeProps)}
          />
        </Routes>
      );
    }
    componentDidMount = () => this.props.loadData(DataTypes.CATEGORIES);
  }
);

export default ShopConnector;
