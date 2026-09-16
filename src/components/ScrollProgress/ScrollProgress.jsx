import { useEffect, useState } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import './ScrollProgress.css';

// Deliberately NOT gated by movimientoReducido, confirmed 2026-09-08
// (design-handoff.md): this is a live scroll-position indicator the user
// reads from, not decorative motion — same reasoning as ReadingGuide.
function ScrollProgress() {
    const scrollY = useScrollY();
    const [scrollable, setScrollable] = useState(0);

    useEffect(() => {
        function updateScrollable() {
            const doc = document.documentElement;
            setScrollable(doc.scrollHeight - doc.clientHeight);
        }

        updateScrollable();
        const observer = new ResizeObserver(updateScrollable);
        observer.observe(document.documentElement);
        return () => observer.disconnect();
    }, []);

    const pct = scrollable > 0 ? (scrollY / scrollable) * 100 : 0;
    const height = Math.min(100, Math.max(0, pct));

    return (
        <div className="scrollguide" aria-hidden="true">
            <span className="scrollguide__fill" style={{ height: `${height}%` }}></span>
        </div>
    );
}

export default ScrollProgress;
