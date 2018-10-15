import React, { Component } from "react";
import { Link } from "react-router-dom";
import albumData from "./../data/albums";
import "./../styles/Library.css";
import CookieMaster from "../helpers/cookieMaster";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const cm = new CookieMaster();
    if (cm.checkSetCookie(this.props.cookieKey)) {
      // tell <App /> to record page view to state
      this.props.recordUniquePageView(this.props.cookieKey);
    }
  }

  handleButtonClick() {
    // alert("hello");
    // update state if Promise resolves
    let newAlbum = new Promise(function(resolve, reject) {
      // use token already received
    });
  }

  render() {
    return (
      <section className="library">
        {this.state.albums.map((album, index) => (
          <Link to={`/album/${album.slug}`} key={index}>
            <img
              src={album.albumCover}
              alt={
                album.title +
                " by " +
                album.artist +
                " (" +
                album.releaseInfo +
                ")"
              }
            />
            <div>{album.title}</div>
            <div>{album.artist}</div>
            <div>{album.songs.length} songs</div>
          </Link>
        ))}
        <aside className="chooser">
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={() => this.handleButtonClick()}
          >
            Nah, get my music from Spotify!&nbsp;
            <i className="material-icons song-play">library_music</i>
          </button>
          <p>Sorry, this feature is not yet available.</p>
        </aside>
      </section>
    );
  }
}

export default Library;
