import React, { Component } from 'react';

class PlayerBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button
                        className="mdl-button mdl-button--accent mdl-js-button mdl-button--fab mdl-button--mini-fab"
                        onClick={this.props.handlePrevClick}
                    >
                        <i className="material-icons">fast_rewind</i>
                    </button>
                    <button
                        className="mdl-button mdl-button--accent mdl-js-button mdl-button--fab mdl-button--mini-fab"
                        onClick={this.props.handleSongClick}
                    >
                        <i className="material-icons">play_arrow</i>
                    </button>
                    <button
                        className="mdl-button mdl-button--accent mdl-js-button mdl-button--fab mdl-button--mini-fab"
                        onClick={this.props.handleNextClick}
                    >
                        <i className="material-icons">fast_forward</i>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">
                        {this.props.formatTime(this.props.currentSongTime)}
                    </div>
                    <input
                        type="range"
                        className="seek-bar mdl-slider"
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
                        {this.props.formatTime(this.props.currentSongDuration)}
                    </div>
                </section>
                <section id="volume-control">
                    <i className="material-icons">volume_down</i>
                    <input
                        type="range"
                        className="seek-bar mdl-slider"
                        value={this.props.currentSongVolume * 100}
                        onChange={this.props.handleVolumeInput}
                    />
                    <i className="material-icons">volume_up</i>
                </section>
            </section>
        );
    }
}

export default PlayerBar;
