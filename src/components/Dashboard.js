import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="dashboard">
        <h1>Welcome to the Dashboard!</h1>
        <h2>Page Views</h2>
        <p>Home Page: {this.props.stats.homeViews} unique visits</p>
        <p>Library Page: {this.props.stats.libraryViews} unique visits</p>
      </section>
    );
  }
}

export default Dashboard;
