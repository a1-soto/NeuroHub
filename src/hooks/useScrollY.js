import { useEffect, useState } from 'react';

export function useScrollY() {
    const [scrollY, setScrollY] = useState(() => window.scrollY);

    useEffect(() => {
        let ticking = false;

        function handleScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                setScrollY(window.scrollY);
                ticking = false;
            });
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollY;
}
