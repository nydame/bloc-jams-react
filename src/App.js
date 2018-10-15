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
        albumViews: [],
        songPlays: []
      },
      userIsAdmin: false
    };
    // this.routes = [
    //   { path: "/", component: Landing },
    //   { path: "/library", component: Library },
    //   { path: "/album/:slug", component: Album }
    // ];
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
          console.log("count is now " + count);
          fbRef.update({ homeViews: ++count });
        });
        break;
      case "blocJamsLib":
        fbRef.child("libraryViews").once("value", data => {
          count = data.node_.value_;
          console.log("count is now " + count);
          fbRef.update({ libraryViews: ++count });
        });
        break;
      default:
    }
  }

  render() {
    const recordUniquePageView = this.recordUniquePageView;
    const stats = this.state.stats;
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
                cookieKey="blocJamsLib"
              />
            )}
          />
          {
            // ALBUM PAGES
          }
          <Route path="/album/:slug" component={Album} />
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
