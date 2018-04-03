import React, { Component } from 'react';

class PlayerBar extends Component {
    constructor(props) {
        super(props);
        this.formatTime = this.formatTime.bind(this);
    }

    formatTime(timeInSeconds) {
        const timeString = isNaN(timeInSeconds)
            ? '--:--'
            : parseInt(timeInSeconds / 60, 10) +
              ':' +
              parseInt(timeInSeconds % 60, 10);
        return timeString;
    }

    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-skip-backward" />
                    </button>
                    <button
                        id="play-pause"
                        onClick={this.props.handleSongClick}
                    >
                        <span
                            className={
                                this.props.isPlaying ? 'ion-pause' : 'ion-play'
                            }
                        />
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <span className="ion-skip-forward" />
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">
                        {this.formatTime(this.props.currentSongTime)}
                    </div>
                    <input
                        type="range"
                        className="seek-bar"
                        value={
                            this.props.currentSongTime /
                                this.props.currentSongDuration || 0
                        }
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeInput}
                    />
                    <div className="total-time">
                        {this.formatTime(this.props.currentSongDuration)}
                    </div>
                </section>
                <section id="volume-control" />
                <div className="icon ion-volume-low" />
                <input
                    type="range"
                    className="seek-bar"
                    value={this.props.currentSongVolume * 100}
                    onChange={this.props.handleVolumeInput}
                />
                <div className="icon ion-volume-high" />
            </section>
        );
    }
}

export default PlayerBar;
