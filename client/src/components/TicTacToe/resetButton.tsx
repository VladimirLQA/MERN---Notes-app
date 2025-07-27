interface ResetButtonProps {
    resetGame: () => void;
}

const ResetButton = ({ resetGame }: ResetButtonProps) => {
    return <button id="reset-button" onClick={resetGame}>Reset</button>;
};

export default ResetButton;