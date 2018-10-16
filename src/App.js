import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Dashboard from "./components/Dashboard";
import Album from "./components/Album";
import "./App.css";
import { database } from "./data/firebase";
import cookieMaster from "./helpers/cookieMaster";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {
        homeViews: 0,
        libraryViews: 0,
        albumSelections: {}, // NB This is ignored and so is the next line
        songPlays: {}
      },
      userIsAdmin: false
    };
    // this.routes = [
    //   { path: "/", component: Landing },
    //   { path: "/library", component: Library },
    //   { path: "/album/:slug", component: Album }
    // ];
    this.recordUniquePageView = this.recordUniquePageView.bind(this);
    this.recordAlbumSelection = this.recordAlbumSelection.bind(this);
    this.recordSongEnd = this.recordSongEnd.bind(this);
  }

  componentDidMount() {
    database.ref("stats").on("value", snapshot => {
      this.setState({ stats: snapshot.val() });
    });
  }

  recordUniquePageView(pageKey) {
    let count;
    let fbRef = database.ref("stats");
    switch (pageKey) {
      case "blocJamsHome":
        fbRef.child("homeViews").once("value", data => {
          count = data.node_.value_;
          fbRef.update({ homeViews: ++count });
        });
        break;
      case "blocJamsLib":
        fbRef.child("libraryViews").once("value", data => {
          count = data.node_.value_;
          fbRef.update({ libraryViews: ++count });
        });
        break;
      default:
    }
  }

  recordAlbumSelection(albumTitle, albumArtist) {
    const keyString = `${albumTitle} by ${albumArtist}`;
    const statsObj = Object.assign({}, this.state.stats);
    const fbRef = database.ref("stats");

    if (statsObj.albumSelections === undefined) {
      statsObj["albumSelections"] = {};
    }

    if (statsObj.albumSelections[keyString] === undefined) {
      statsObj.albumSelections[keyString] = 1;
    } else {
      statsObj.albumSelections[keyString] += 1;
    }

    fbRef.update({ albumSelections: statsObj.albumSelections });
  }

  recordSongEnd(song) {
    console.log(`User just finished ${song.title}.`);
    const statsObj = Object.assign({}, this.state.stats);
    const fbRef = database.ref("stats");

    if (statsObj.songPlays === undefined) {
      statsObj["songPlays"] = {};
    }

    if (statsObj.songPlays[song.title] === undefined) {
      statsObj.songPlays[song.title] = 1;
    } else {
      statsObj.songPlays[song.title] += 1;
    }

    fbRef.update({ songPlays: statsObj.songPlays });
  }

  render() {
    const recordUniquePageView = this.recordUniquePageView,
      recordAlbumSelection = this.recordAlbumSelection,
      recordSongEnd = this.recordSongEnd,
      stats = this.state.stats;
    return (
      <div className="App">
        <header>
          <h1>
            <NavLink to="/" exact>
              <img src="/assets/images/bloc_jams_logo.png" />
            </NavLink>
          </h1>
          <nav>
            <NavLink to="/" exact>
              Home
            </NavLink>
            <NavLink to="/library" exact>
              Library
            </NavLink>
          </nav>
        </header>
        <main>
          {
            // HOME PAGE
          }
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                recordUniquePageView={recordUniquePageView}
                cookieKey="blocJamsHome"
              />
            )}
          />
          {
            // LIBRARY PAGE
          }
          <Route
            path="/library"
            render={props => (
              <Library
                {...props}
                recordUniquePageView={recordUniquePageView}
                recordAlbumSelection={recordAlbumSelection}
                cookieKey="blocJamsLib"
              />
            )}
          />
          {
            // ALBUM PAGES
          }
          <Route
            path="/album/:slug"
            render={props => <Album {...props} recordSongEnd={recordSongEnd} />}
          />
          {
            // DASHBOARD
          }
          <Route
            path="/dashboard"
            render={props => <Dashboard {...props} stats={stats} />}
          />
        </main>
      </div>
    );
  }
}

export default App;
