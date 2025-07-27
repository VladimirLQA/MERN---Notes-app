import { useRef } from "react";
import Board, { BoardRef } from "../../components/TicTacToe/board";
import ResetButton from "../../components/TicTacToe/resetButton";

const Game = () => {
    const boardRef = useRef<BoardRef>(null);
    const resetGame = () => {
        boardRef.current?.resetGame();
    };

    return <>
        <div className="tic-tac-toe-container">
            <Board ref={boardRef} />
            <div className="reset-button-container">
                <ResetButton resetGame={resetGame} />
            </div>
        </div>
    </>
};

export default Game;
