import Square from "./square";

interface BoardRowProps {
    squares: (string | null)[];
    handleClick: (i: number) => void;
    rowIndex: number;
}

const BoardRow = ({ squares, handleClick, rowIndex }: BoardRowProps) => {
    const rowSquares = squares.slice(rowIndex * 3, rowIndex * 3 + 3);

    return (
        <div className="board-row" id={`board-row-${rowIndex}`}>
            {rowSquares.map((val, i) => {
                const globalIndex = 3 * rowIndex + i;
                return (<Square key={i} value={val} onSquareClick={() => handleClick(globalIndex)} />);
            })}
        </div>
    );
};

export default BoardRow;
