import { calculateWinner } from "./calculateWinner";

export const getWinnerOrNextPlayer = (squares: (string|null)[], isXNext: boolean) => {
    const winner = calculateWinner(squares);
    const isDraw = squares.every(Boolean);

    return winner
        ? `Winner: ${winner}`
        : isDraw
            ? `It's a draw!`
            : `Next player: ${isXNext ? 'X' : 'O'}`;
};
