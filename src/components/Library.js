import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import './../styles/Library.css';
import { AxiosProvider, Request, Head, Get, withAxios } from 'react-axios';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        // alert("hello");
        // update state if Promise resolves
        let newAlbum = new Promise(function(resolve, reject) {
            //
        })();
    }

    render() {
        return (
            <section className="library">
                {this.state.albums.map((album, index) => (
                    <Link to={`album/${album.slug}`} key={index}>
                        <img
                            src={album.albumCover}
                            alt={
                                album.title +
                                ' by ' +
                                album.artist +
                                ' (' +
                                album.releaseInfo +
                                ')'
                            }
                        />
                        <div>{album.title}</div>
                        <div>{album.artist}</div>
                        <div>{album.songs.length} songs</div>
                    </Link>
                ))}
                <aside className="chooser">
                    <Get url="https://accounts.spotify.com/authorize?client_id=ae45a76e6e264417a49a32043284912b&response_type=token&redirect_uri=https:%2F%2Fnydame-bloc-jams-v2.netlify.com%2Flibrary%2F&state=12345">
                        {(error, response, isLoading, onReload) => {
                            if (error) {
                                return (
                                    <div>
                                        Oops! Spotify could not be loaded due to{' '}
                                        {error.message}
                                    </div>
                                );
                            } else if (isLoading) {
                                return <div>{'Loading...'}</div>;
                            } else if (response !== null) {
                                return <div>{response.data.message} </div>;
                            }
                            return (
                                <div>
                                    Default message before request is made.
                                </div>
                            );
                        }}
                    </Get>
                    <button
                        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                        onClick={() => this.handleButtonClick()}
                    >
                        Nah, get my music!&nbsp;
                        <i className="material-icons song-play">
                            library_music
                        </i>
                    </button>
                </aside>
            </section>
        );
    }
}

export default Library;
