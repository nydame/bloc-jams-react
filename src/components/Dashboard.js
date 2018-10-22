import React, { Component } from "react";
import { BarChart } from "react-d3-components";
import "./../styles/Dashboard.css";
import "./../helpers/dashboardNavigation";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.viewData = [{ values: [{ x: "Home", y: 0 }, { x: "Library", y: 0 }] }];
    this.albumData = [{ values: [] }];
    this.songData = [{ values: [] }];
  }

  render() {
    const albums = this.albumData[0]["values"],
      songs = this.songData[0]["values"];
    this.viewData[0]["values"][0]["y"] = this.props.stats.homeViews;
    this.viewData[0]["values"][1]["y"] = this.props.stats.libraryViews;
    albums.push({ x: "", y: 0 });
    songs.push({ x: "", y: 0 });
    Object.entries(this.props.stats.albumSelections).forEach((item, index) => {
      albums.push({ x: item[0].split(" by ")[0], y: item[1] });
      if (albums[0]["x"] === "") {
        albums.shift();
      }
    });
    Object.entries(this.props.stats.songPlays).forEach((item, index) => {
      songs.push({ x: item[0], y: item[1] });
      if (songs[0]["x"] === "") {
        songs.shift();
      }
    });

    // const albumArr = Object.entries(this.props.stats.albumSelections).map(
    //   entry => entry
    // );
    // albumArr.forEach(item => {
    //   this.albumData[0]["values"].push({ x: item[0], y: item[1] });
    // });
    return (
      <div className="dashboard-container">
        <h1 className="title">Dashboard</h1>
        <section className="dashboard--menu">
          <div className="summary active">
            <h2 className="menu--item" data-type="views">
              Page Views
            </h2>
            <p>Home Page: {this.props.stats.homeViews} unique visits</p>
            <p>Library Page: {this.props.stats.libraryViews} unique visits</p>
          </div>
          <div className="summary">
            <h2 className="menu--item" data-type="albums">
              Album Popularity
            </h2>
            {Object.entries(this.props.stats.albumSelections).map(
              (entry, index) => (
                <p key={index}>
                  {entry[0]}: selected {entry[1]} times
                </p>
              )
            )}
          </div>
          <div className="summary">
            <h2 className="menu--item" data-type="songs">
              Song Popularity
            </h2>
            {Object.entries(this.props.stats.songPlays).map((entry, index) => (
              <p key={index}>
                {entry[0]}: played to completion {entry[1]} times
              </p>
            ))}
          </div>
        </section>
        <section className="dashboard--data">
          <div className="chart views active">
            <BarChart
              data={this.viewData}
              width={400}
              height={400}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              xAxis={{ label: "Unique Page Views" }}
            />
          </div>
          <div className="chart albums">
            <BarChart
              data={this.albumData}
              width={400}
              height={400}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              xAxis={{ label: "Album Selections" }}
            />
          </div>
          <div className="chart songs">
            <BarChart
              data={this.songData}
              width={400}
              height={400}
              margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
              xAxis={{ label: "Complete Song Plays" }}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
