function AidCard({ titulo, pasos }) {
    return (
        <div className="aid-card">
            <h3>{titulo}</h3>
            <ol>
                {pasos.map((paso) => (
                    <li key={paso}>{paso}</li>
                ))}
            </ol>
        </div>
    );
}

export default AidCard;
