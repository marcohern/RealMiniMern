import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import UserList from "./components/user/UserList";
import UserForm from "./components/user/UserForm";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import store from "./store";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/users" component={UserList} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
