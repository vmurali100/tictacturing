import React, { Component } from "react";
import Player from "./Player";
import { connect } from "react-redux";
import { updateBoard, updateWinner, updateWinnerCount } from "./Store/actions";
class TicTac extends Component {
  handleClick = (e, i) => {
    const { board, player } = this.props.tictoc;
    let newBoard = board;
    let newPlayer = player === "X" ? "O" : "X";

    const { winner } = this.props.tictoc;
    const { dispatch } = this.props;
    if (winner) {
      let obj = {
        winner: null,
        board: Array(9).fill(null),
      };
      dispatch(updateWinner(obj));
      newBoard[i] = player;

      obj = {
        board: newBoard,
        player: newPlayer,
      };
      dispatch(updateBoard(obj));
      this.checkWinner();
    }
    if (board[i] === null && !winner) {
      newBoard[i] = player;
      let obj = {
        board: newBoard,
        player: newPlayer,
      };
      // updateBoard(obj);
      this.props.dispatch(updateBoard(obj));
      this.checkWinner();
    }
  };

  checkWinner() {
    const {
      board,
      player,
      winner,
      player1WinningCount,
      player2WinningCount,
    } = this.props.tictoc;
    const { dispatch } = this.props;
    let matchStatus = null;
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        let obj = {
          winner: this.props.tictoc.player,
          board: Array(9).fill(null),
        };
        alert(`Congrats . ${player} won the Board`);
        this.props.dispatch(updateWinner(obj));
        if (player === "X") {
          let index = player1WinningCount.lastIndexOf(true) + 1;
          player1WinningCount[index] = true;
          let winner = {
            winnerName: "X",
            WinningCount: player1WinningCount,
          };
          dispatch(updateWinnerCount(winner));
        } else {
          let index = player2WinningCount.lastIndexOf(true) + 1;
          player2WinningCount[index] = true;

          let winner = {
            winnerName: "O",
            WinningCount: player2WinningCount,
          };
          this.props.dispatch(updateWinnerCount(winner));
        }
        let checkPlayer1WinningCount = this.props.tictoc.player1WinningCount.filter(
          (val) => {
            return val === true;
          }
        );
        let checkPlayer2WinningCount = this.props.tictoc.player2WinningCount.filter(
          (val) => {
            return val === true;
          }
        );
        if (
          checkPlayer1WinningCount.length === 6 ||
          checkPlayer2WinningCount.length === 6
        ) {
          alert(
            `Congratulations ... ${this.props.tictoc.player} Won the Game `
          );
        } else {
          let obj = {
            board: Array(9).fill(null),
            player: player,
          };
          this.props.dispatch(updateBoard(obj));
        }
      } else {
        let checkBoard = board.filter((val) => {
          return val == "X" || val == "O";
        });
        if (checkBoard.length === 9 && !winner) {
          matchStatus = "draw";
        }
      }
    });
    if (matchStatus) {
      alert("Board Draw .. Play Again");
      this.restartGame();
    }
  }

  restartGame = () => {
    const { dispatch } = this.props;
    let obj = {
      winner: null,
      board: Array(9).fill(null),
    };
    dispatch(updateWinner(obj));
  };
  render() {
    console.log(this.props.tictoc);
    const {
      board,
      winner,
      player1WinningCount,
      player2WinningCount,
    } = this.props.tictoc;
    const Box = board.map((box, i) => (
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
              <h2 className="turn">{winner === "X" && <span>Winner</span>}</h2>

              <Player
                playerNO="1"
                playerName="Murali"
                winningCount={player1WinningCount}
              />
            </div>
            <div className="col-sm">
              <div className="main">
                <div className="board">{Box}</div>
              </div>
              <button
                className="btn btn-primary mt-3"
                onClick={this.restartGame}
              >
                Re Start Game
              </button>
            </div>
            <div className="col-sm">
              <h2 className="turn">{winner === "O" && <span>Winner</span>}</h2>
              <Player
                playerNO="2"
                playerName="Krishna"
                winningCount={player2WinningCount}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    tictoc: state,
  };
}
export default connect(mapStateToProps)(TicTac);
