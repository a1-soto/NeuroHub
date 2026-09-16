import { useEffect, useId, useRef } from 'react';
import './GooChipFilter.css';

function GooChipFilter({ options, value, onChange, ariaLabel }) {
    const filterId = useId();
    const wrapRef = useRef(null);
    const blobRef = useRef(null);
    const chipRefs = useRef({});

    useEffect(() => {
        function positionBlob() {
            const wrap = wrapRef.current;
            const activeChip = chipRefs.current[value];
            if (!wrap || !activeChip) return;
            const wrapRect = wrap.getBoundingClientRect();
            const chipRect = activeChip.getBoundingClientRect();
            blobRef.current.style.left = `${chipRect.left - wrapRect.left}px`;
            blobRef.current.style.top = `${chipRect.top - wrapRect.top}px`;
            blobRef.current.style.width = `${chipRect.width}px`;
        }
        positionBlob();
        const observer = new ResizeObserver(positionBlob);
        if (wrapRef.current) observer.observe(wrapRef.current);
        return () => observer.disconnect();
    }, [value, options]);

    function registerChip(optionValue) {
        return (el) => {
            chipRefs.current[optionValue] = el;
        };
    }

    function createChipClickHandler(optionValue) {
        return () => onChange(optionValue);
    }

    return (
        <div className="goo-outer" ref={wrapRef}>
            <svg width="0" height="0" aria-hidden="true" className="goo-defs">
                <filter id={filterId}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -11"
                        result="goo"
                    />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>
            <div className="goo-layer" style={{ filter: `url(#${filterId})` }}>
                <div className="goo-blob" ref={blobRef}></div>
            </div>
            <div className="chip-layer" role="group" aria-label={ariaLabel}>
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        ref={registerChip(option.value)}
                        className={`chip ${value === option.value ? 'is-active' : ''}`}
                        aria-pressed={value === option.value}
                        onClick={createChipClickHandler(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GooChipFilter;
