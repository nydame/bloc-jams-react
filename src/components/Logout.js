import React, { Component } from "react";
import { auth } from "../data/firebase";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ""
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    auth
      .signOut()
      .then(function() {})
      .catch(function(err) {
        this.setState({
          errorMessage: `Oops, looks like there was an error logging you out: ${
            err.message
          }. Please check your network connection.`
        });
      });
  }

  render() {
    return (
      <div className="logout">
        <button onClick={() => this.handleLogout()}>Log out</button>
        <span>{this.state.errorMessage}</span>
      </div>
    );
  }
}

export default Logout;
