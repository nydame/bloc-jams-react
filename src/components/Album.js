import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../styles/Album.css';

class Album extends Component {
    constructor(props) {
        super(props);
        const album = albumData.find(
            album => album.slug === this.props.match.params.slug
        );
        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentSongTime: 0,
            currentSongDuration: album.songs[0]['duration'],
            currentSongVolume: 0.8,
            isPlaying: false,
            isPaused: false,
        };
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleTimeInput = this.handleTimeInput.bind(this);
        this.handleVolumeUpdate = this.handleVolumeUpdate.bind(this);
        this.handleVolumeInput = this.handleVolumeInput.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.getSongClassName = this.getSongClassName.bind(this);
    }
    // UTILITY FNS & EVENT HANDLERS
    play() {
        let chromePlayPromise = this.audioElement.play();
        if (chromePlayPromise !== undefined) {
            chromePlayPromise.then(function() {}).catch(function(err) {
                console.log(err);
            });
        }
        this.setState({ isPlaying: true, isPaused: false });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false, isPaused: true });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }
    getCurrentIndex() {
        return this.state.album.songs.findIndex(
            song => this.state.currentSong === song
        );
    }
    formatTime(timeInSeconds) {
        const timeString = isNaN(timeInSeconds)
            ? '--:--'
            : parseInt(timeInSeconds / 60, 10) +
              ':' +
              Math.round(timeInSeconds % 60);
        const minSecsArr = timeString.split(':');
        if (minSecsArr[1] < 10 && minSecsArr.length === 2) {
            return minSecsArr[0] + ':0' + minSecsArr[1];
        }
        return timeString;
    }
    getSongClassName(song) {
        if (this.state.currentSong === song) {
            if (this.state.isPlaying) {
                return 'current-song';
            }
            if (this.state.isPaused) {
                return 'current-song-paused';
            }
        }
        return '';
    }
    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play();
        }
    }
    handlePrevClick() {
        const currentIndex = this.getCurrentIndex();
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    handleNextClick() {
        const currentIndex = this.getCurrentIndex();
        const newIndex = Math.min(
            this.state.album.songs.length - 1,
            currentIndex + 1
        );
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }
    handleTimeUpdate() {
        this.setState({ currentSongTime: this.audioElement.currentTime });
    }
    handleDurationChange(ev) {
        this.setState({ currentSongDuration: this.audioElement.duration });
    }
    handleTimeInput(ev) {
        const newTime = this.audioElement.duration * ev.target.value;
        this.audioElement.currentTime = newTime;
        this.handleTimeUpdate();
    }
    handleVolumeUpdate() {
        this.setState({ currentSongVolume: this.audioElement.volume });
    }
    handleVolumeInput(ev) {
        this.audioElement.volume = ev.target.value / 100;
        this.handleVolumeUpdate();
    }

    componentDidMount() {
        this.audioElement.addEventListener('timeupdate', this.handleTimeUpdate);
        this.audioElement.addEventListener(
            'durationchange',
            this.handleDurationChange
        );
        this.audioElement.addEventListener(
            'volumechange',
            this.handleVolumeUpdate
        );
    }
    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener(
            'timeupdate',
            this.handleTimeUpdate
        );
        this.audioElement.removeEventListener(
            'durationchange',
            this.handleDurationChange
        );
        this.audioElement.removeEventListener(
            'volumechange',
            this.handleVolumeUpdate
        );
        this.audioElement = null;
    }
    // END UTILIY FNS & EVENT HANDLERS
    render() {
        return (
            <section className="album">
                <article id="album-info">
                    <img
                        id="album-cover-art"
                        src={this.state.album.albumCover}
                        alt={
                            this.state.album.title +
                            ' by ' +
                            this.state.album.artist +
                            ' (' +
                            this.state.album.releaseInfo +
                            ')'
                        }
                    />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">
                            {this.state.album.releaseInfo}
                        </div>
                    </div>
                </article>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((song, index) => (
                            <tr
                                key={index}
                                onClick={() => this.handleSongClick(song)}
                                className={this.getSongClassName(song)}
                            >
                                <td className="song-number">
                                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                                        <i className="material-icons song-play">
                                            play_circle_outline
                                        </i>
                                        <span className="song-number-showing">
                                            {index + 1}
                                        </span>
                                        <i className="material-icons song-pause">
                                            pause
                                        </i>
                                    </button>
                                </td>
                                <td className="song-title">{song.title}</td>
                                <td className="song-duration">
                                    {this.formatTime(song.duration)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PlayerBar
                    isPlaying={this.state.isPlaying}
                    currentSong={this.state.currentSong}
                    currentSongTime={this.state.currentSongTime}
                    currentSongDuration={this.state.currentSongDuration}
                    currentSongVolume={this.state.currentSongVolume}
                    handleSongClick={() =>
                        this.handleSongClick(this.state.currentSong)
                    }
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeInput={ev => this.handleTimeInput(ev)}
                    handleVolumeInput={ev => this.handleVolumeInput(ev)}
                    formatTime={t => this.formatTime(t)}
                />
            </section>
        );
    }
}

export default Album;
