import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './App.css';
import { database } from './data/firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: null,
      user: null,
    };
  }

  componentDidMount() {console.log(database);}

  render() {
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
                <Route exact path="/" component={Landing} />
                <Route path="/library" component={Library} />
                <Route path="/album/:slug" component={Album} />
            </main>
        </div>
    );
  }
}

export default App;
