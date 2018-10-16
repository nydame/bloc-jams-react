import React, { Component } from "react";

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="dashboard--summary">
        <h1>Welcome to the Dashboard!</h1>
        <div className="pageviews--summary">
          <h2>Page Views</h2>
          <p>Home Page: {this.props.stats.homeViews} unique visits</p>
          <p>Library Page: {this.props.stats.libraryViews} unique visits</p>
        </div>
        <div className="album--summary">
          <h2>Album Popularity</h2>
          {Object.entries(this.props.stats.albumSelections).map(
            (entry, index) => (
              <p key={index}>
                {entry[0]}: selected {entry[1]} times
              </p>
            )
          )}
        </div>
        <div className="song--summary">
          <h2>Song Popularity</h2>
          {Object.entries(this.props.stats.songPlays).map((entry, index) => (
            <p key={index}>
              {entry[0]}: played to completion {entry[1]} times
            </p>
          ))}
        </div>
      </section>
    );
  }
}

export default Dashboard;
