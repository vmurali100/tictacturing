import React, { Component } from "react";

export default class Player extends Component {
  render() {
    const Counts = this.props.winningCount.map((count, i) => {
      return (
        <li key={i}>
          {!count && <div className="count"></div>}
          {count && <div className="count win"></div>}
        </li>
      );
    });
    return (
      <div>
        <div className="player">
          <p>Player {this.props.playerNO}</p>
          <h3>{this.props.playerName}</h3>
          {this.props.playerNO === "1" && (
            <img src="./close.svg" alt="" className="playerImage" />
          )}
          {this.props.playerNO === "2" && (
            <div className="round playerCount"></div>
          )}
        </div>
        {Counts}
      </div>
    );
  }
}
