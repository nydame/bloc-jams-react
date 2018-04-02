import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

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
            isPlaying: false,
        };
        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleTimeInput = this.handleTimeInput.bind(this);
    }
    // UTILITY FNS & EVENT HANDLERS
    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
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
    handleTimeUpdate(ev) {
        this.setState({ currentSongTime: this.audioElement.currentTime });
    }
    handleDurationChange(ev) {
        this.setState({ currentSongDuration: this.audioElement.duration });
    }
    handleTimeInput(ev) {
        const newTime = this.audioElement.duration * ev.target.value;
        this.audioElement.currentTime = newTime;
        this.handleTimeUpdate(ev);
    }

    componentDidMount() {
        this.audioElement.addEventListener('timeupdate', this.handleTimeUpdate);
        this.audioElement.addEventListener(
            'durationchange',
            this.handleDurationChange
        );
    }
    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener(
            'timeupdate',
            this.handleTimeUpdate
        );
        this.audioElement.addEventListener(
            'durationchange',
            this.handleDurationChange
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
                            >
                                <td className="song-number">{index + 1} </td>
                                <td className="song-title">{song.title}</td>
                                <td className="song-duration">
                                    {song.duration}
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
                    handleSongClick={() =>
                        this.handleSongClick(this.state.currentSong)
                    }
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeInput={ev => this.handleTimeInput(ev)}
                />
            </section>
        );
    }
}

export default Album;
