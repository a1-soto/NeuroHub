import { useContext, useEffect, useRef } from 'react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import './ReadingGuide.css';

function ReadingGuide() {
    const guideRef = useRef(null);
    const { guiaLectura } = useContext(AccesibilidadContext);

    useEffect(() => {
        function handleMouseMove(event) {
            guideRef.current.style.top = `${event.clientY - 17}px`;
        }

        if (guiaLectura) {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [guiaLectura]);

    return <div className="reading-guide" ref={guideRef}></div>;
}

export default ReadingGuide;
