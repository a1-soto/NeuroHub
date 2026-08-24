function ToggleRow({ title, description, checked, onToggle, ariaLabel }) {
    return (
        <div className="a11y-panel__section">
            <div className="a11y-panel__row">
                <div>
                    <div className="a11y-panel__section-title">{title}</div>
                    <div className="a11y-panel__desc">{description}</div>
                </div>
                <button
                    className={`a11y-panel__toggle ${checked ? 'a11y-panel__toggle--on' : ''}`}
                    onClick={onToggle}
                    aria-pressed={checked}
                    aria-label={ariaLabel}
                >
                    <span className="a11y-panel__toggle-knob"></span>
                </button>
            </div>
        </div>
    );
}

export default ToggleRow;
