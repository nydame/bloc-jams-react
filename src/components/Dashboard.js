import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="dashboard--summary">
        <h1>Welcome to the Dashboard!</h1>
        <h2>Page Views</h2>
        <p>Home Page: {this.props.stats.homeViews} unique visits</p>
        <p>Library Page: {this.props.stats.libraryViews} unique visits</p>
        <h2>Album Popularity</h2>
        <div>
          {Object.entries(this.props.stats.albumSelections).map(
            (entry, index) => (
              <p key={index}>
                {entry[0]}: selected {entry[1]} times
              </p>
            )
          )}
        </div>
      </section>
    );
  }
}

export default Dashboard;
