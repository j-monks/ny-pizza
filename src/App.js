import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }

  render() {
    return(
      // defining context data and methods using the context provider component
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
        // navigation is handled via the router component, routes defined using switch and route components
        // navigation menu is being created with each link using the 'Link' component provided in the React Router module
        // routerRef is a reference to the 'Router' component to enable us to access the router from within the 'App' component
        >
          <Router ref={this.routerRef}>
            <div className="App">
              <nav
                className="navbar container"
                role="navigation"
                aria-label="main navigation"
                >
                  <div className="navbar-brand">
                    <b className="navbar-item is-size-4">ny pizza</b>
                    <label
                      role="button"
                      class="navbar-burger burger"
                      aria-label="menu"
                      aria-expanded="false"
                      data-target="navbarBasicExample"
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ showMenu: !this.state.showMenu });
                      }}
                      >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                      </label>
                  </div>
                    <div className={`navbar-menu ${
                      this.state.showMenu ? "is-active" : ""
                    }`}>
                    <Link to="/products" className="navbar-item">
                      Products
                    </Link>
                    {this.state.user && this.state.user.accessLevel < 1 && (
                      <Link to="/add-product" className="navbar-item">
                        Add Product
                      </Link>
                    )}
                    <Link to="/cart" className="navbar-item">
                      Cart
                      <span 
                        className="tag is-primary"
                        style={{ marginLeft: "5px" }}
                        >
                          { Object.keys(this.state.cart).length }
                        </span>
                    </Link>
                    {!this.state.user ? (
                      <Link to="/login" className="navbar-item">
                        Login
                      </Link>
                    ) : (
                      <Link to="/" onClick={this.logout} className="navbar-item">
                        Logout
                      </Link>
                    )}
                    </div>
                </nav>
                <Switch>
                  <Route exact path="/" component={ProductList} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/add-product" component={AddProduct} />
                  <Route exact path="/products" component={ProductList} />
                </Switch>
            </div>
          </Router>
        </Context.Provider>
    ); 
  }
}
