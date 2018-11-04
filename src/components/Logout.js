import React, { Component } from "react";
import auth from "../data/firebase";

class Logout extends Component {
  render() {
    return (
      <div className="logout">
        <p>Log out</p>
      </div>
    );
  }
}

export default Logout;
