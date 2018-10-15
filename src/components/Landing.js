import React, { Component } from "react";
import CookieMaster from "../helpers/cookieMaster";

// const randomLargeNumber = Date.now() * Math.floor(Math.random() * 1000 + 1);
// const scope = 'user-read-private user-read-email';
// const clientId = 'ae45a76e6e264417a49a32043284912b';
// const redirectUrl =
//     window.location.protocol + '//' + window.location.host + '/library';
//
// const spotifyUrl =
//     encodeURI('https://accounts.spotify.com/authorize') +
//     encodeURIComponent('?response_type=token') +
//     encodeURIComponent('&scope=' + scope) +
//     encodeURIComponent('&client_id=' + clientId) +
//     encodeURIComponent('&redirect_uri=' + redirectUrl) +
//     '&state=' +
//     randomLargeNumber.toString(36);

// window.localStorage.setItem('sessionKey', spotifyUrl.split('=').pop());

class Landing extends Component {
  constructor(props) {
    super(props);
    this.spotifyUrl = "#";
  }

  componentDidMount() {
    const cm = new CookieMaster();
    if (cm.checkSetCookie(this.props.cookieKey)) {
      // tell <App /> to record page view to state
      this.props.recordUniquePageView(this.props.cookieKey);
    }
  }

  render() {
    return (
      <section className="landing">
        <h1 className="hero-title">Turn the music up!</h1>
        <section className="selling-points">
          <div className="point">
            <h2 className="point-title">Choose your music.</h2>
            <p className="point-description">
              The world is full of music. Why should you have to listen to music
              chosen by someone else?
            </p>
            <p>
              Comming soon...&nbsp;
              <a href={this.spotifyUrl}>log into Spotify</a> for a better
              experience.
            </p>
          </div>
          <div className="point">
            <h2 className="point-title">Unlimited, streaming, ad-free</h2>
            <p className="point-description">
              No arbitrary limits. No distractions.
            </p>
          </div>
          <div className="point">
            <h2 className="point-title">Mobile enabled.</h2>
            <p className="point-description">
              Listen to your music on the go. This streaming service is
              available on all mobile platforms.
            </p>
          </div>
        </section>
      </section>
    );
  }
}

export default Landing;
