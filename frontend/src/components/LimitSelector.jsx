const LimitSelector = ({ limit, onLimitChange }) => {
    const arr = ["5", "10", "20", "50"];

    return (
        <div className="LimitSelectorContainer">
            {arr.map((lim) => (
                <button
                    key={lim}
                    onClick={() => onLimitChange(lim)}
                    disabled={limit === lim}
                    id= {limit === lim ? "currentLim" : "Lim"}
                >
                    {lim}
                </button>
            ))}
        </div>
    );
};

export default LimitSelector;