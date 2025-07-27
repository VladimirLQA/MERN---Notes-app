interface SquareProps {
   value: string | null;
   onSquareClick: () => void 
}

const Square = ({ value, onSquareClick }: SquareProps) => {

    return <button
            className="square"
            onClick={onSquareClick}>
            {value}
        </button>;
}


export default Square;