
import { useState, useImperativeHandle, forwardRef } from "react";
import { getWinnerOrNextPlayer } from "../../helpers/TicTacToe/getWinnerOrNextPlayer";
import { calculateWinner } from "../../helpers/TicTacToe/calculateWinner";
import BoardRow from "./boardRow";
import './styles/index.css';

export interface BoardRef {
    resetGame: () => void;
}

const Board = forwardRef<BoardRef, object>((props, ref) => {
    const [history, setHistory] = useState<(string|null)[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    const handleClick = (i: number) => {
        if (currentSquares[i] || calculateWinner(currentSquares)) return;

        const nextSquares = currentSquares.slice();
        if (xIsNext) nextSquares[i] = 'X';
        else nextSquares[i] = 'O'; 

        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove);
    };

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
    };

    useImperativeHandle(ref, () => ({
        resetGame,
    }));

    return <>
            <div className="board">
                <div className="status">{getWinnerOrNextPlayer(currentSquares, xIsNext)}</div>
                <div className="board-grid">
                    {[0,1,2].map(row => (
                        <BoardRow
                        key={row}
                        rowIndex={row}         
                        squares={currentSquares}
                        handleClick={handleClick}
                    />
                ))}
                </div>
            </div>
            <div className="game-info">
                <h3 className="history-title">Game History</h3>
                <ul className="history-list">
                    {history.map((_, move) => {
                        const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
                        const isCurrentMove = move === currentMove;
                        return (
                            <li key={move} className="history-item">
                                <button 
                                    onClick={() => jumpTo(move)}
                                    className={`history-button ${isCurrentMove ? 'current-move' : ''}`}
                                >
                                    {description}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
    </>
});

export default Board;
