import React, { Component } from "react";
import Player from "./Player";

export default class TicTac extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: Array(9).fill(null),
      player: "X",
      winner: null,
      player1WinningCount: Array(6).fill(null),
      player2WinningCount: Array(6).fill(null),
    };
  }

  handleClick = (e, i) => {
    let newBoard = this.state.board;
    let newPlayer = this.state.player === "X" ? "O" : "X";

    if (this.state.winner) {
      this.setState({ winner: null }, () => {
        if (this.state.board[i] === null && !this.state.winner) {
          newBoard[i] = this.state.player;
          this.setState({ board: newBoard, player: newPlayer });
          this.checkWinner();
        }
      });
    }
    if (this.state.board[i] === null && !this.state.winner) {
      newBoard[i] = this.state.player;
      this.setState({ board: newBoard, player: newPlayer });
      this.checkWinner();
    }
  };

  checkWinner() {
    let winLines = [
      ["0", "1", "2"],
      ["3", "4", "5"],
      ["6", "7", "8"],
      ["0", "3", "6"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["0", "4", "8"],
      ["2", "4", "6"],
    ];
    winLines.map((arr) => {
      const [a, b, c] = arr;
      if (
        this.state.board[a] &&
        this.state.board[a] === this.state.board[b] &&
        this.state.board[a] === this.state.board[c]
      ) {
        this.setState({
          winner: this.state.player,
          board: Array(9).fill(null),
        });
        if (this.state.player === "X") {
          let player1WinningCount = this.state.player1WinningCount;
          let index = this.state.player1WinningCount.lastIndexOf(true) + 1;
          player1WinningCount[index] = true;
          this.setState({ player1WinningCount });
        } else {
          let player2WinningCount = this.state.player2WinningCount;
          let index = this.state.player2WinningCount.lastIndexOf(true) + 1;
          player2WinningCount[index] = true;
          this.setState({
            player2WinningCount,
          });
        }
        let checkPlayer1WinningCount = this.state.player1WinningCount.filter(
          (val) => {
            return val === true;
          }
        );
        let checkPlayer2WinningCount = this.state.player2WinningCount.filter(
          (val) => {
            return val === true;
          }
        );
        if (
          checkPlayer1WinningCount.length === 6 ||
          checkPlayer2WinningCount.length === 6
        ) {
          alert(`Congratulations ... ${this.state.player} Won the Game `);
        } else {
          this.setState({ board: Array(9).fill(null) });
        }
      }
    });
  }
  startGame = () => {
    this.setState({ board: Array(9).fill(null) });
  };
  render() {
    const Box = this.state.board.map((box, i) => (
      <div
        className={`box box${i}`}
        key={i}
        onClick={(e) => {
          this.handleClick(e, i);
        }}
      >
        {box === "X" && <img src="./close.svg" alt="" className="closeImage" />}
        {box === "O" && <div className="round"></div>}
        {/*  */}
      </div>
    ));

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h2 className="turn">
                {this.state.winner === "X" && <span>Winner</span>}
              </h2>

              <Player
                playerNO="1"
                playerName="Murali"
                winningCount={this.state.player1WinningCount}
                player={this.state.player}
              />
            </div>
            <div className="col-sm">
              <div className="main">
                <div className="board">{Box}</div>
              </div>
              <button className="btn btn-primary mt-3" onClick={this.startGame}>
                Start Game
              </button>
            </div>
            <div className="col-sm">
              <h2 className="turn">
                {this.state.winner === "O" && <span>Winner</span>}
              </h2>
              <Player
                playerNO="2"
                playerName="Krishna"
                winningCount={this.state.player2WinningCount}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
