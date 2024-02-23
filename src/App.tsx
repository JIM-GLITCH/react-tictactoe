import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import "./App.css";
import { useUpdate } from "./useUpdate";
export function App() {
  return <Game></Game>;
}
function Test({ onClick }) {
  return <button onClick={onClick}>test</button>;
}
function Game() {
  const [history, setHistory] = useState([Array(9).fill("")] as Value[][]);
  const [player, setPlayer] = useState("X" as Player);
  const props = { history, setHistory, player, setPlayer };

  return (
    <>
      <Board {...props}></Board>
      {history.map((_, index) => (
        <li>
          <button onClick={() => setHistory(history.slice(0, index + 1))}>
            history {index}
          </button>
        </li>
      ))}
    </>
  );
}
interface Ctx {
  history: Value[][];
  player: Player;
  setHistory: (history: Value[][]) => void;
  setPlayer: (player: Player) => void;
}
interface SquareProps extends BoardProps {
  id: number;
}
function Square(props: SquareProps) {
  const { history, player, id, setPlayer, setHistory } = props;
  const board = history[history.length - 1];
  const value = board[id];
  function onClick() {
    console.log("click");
    if (value == "") {
      const newBoard = board.slice();
      newBoard[id] = player;
      setHistory([...history, newBoard]);
      // history.push(newBoard);
      // setHistory(history);

      setPlayer(oppsite(player));
    }
  }

  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

type Player = "X" | "O";

function oppsite(player: Player): Player {
  if (player == "O") {
    return "X";
  } else {
    return "O";
  }
}
type Value = Player | "";
interface BoardProps {
  player: Player;
  setPlayer: Dispatch<SetStateAction<Player>>;
  history: Value[][];
  setHistory: Dispatch<SetStateAction<Value[][]>>;
}
function Board(props: BoardProps) {
  const { player, history } = props;
  const board = history[history.length - 1];

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${oppsite(player)}`;
  return (
    <>
      <div className="status">{status}</div>
      {[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ].map((xs) => {
        return (
          <div className="board-row">
            {xs.map((idx) => (
              <Square id={idx} {...props} />
            ))}
          </div>
        );
      })}
    </>
  );
}

function calculateWinner(squares: Value[]): Player | undefined {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const maybeWinIndexs = lines.find((indexs) => {
    const values = indexs.map((x) => squares[x]);
    return values.every((x) => x == "O") || values.every((x) => x == "X");
  });

  if (maybeWinIndexs) {
    return squares[maybeWinIndexs[0]] as Player;
  } else {
    return;
  }
}
