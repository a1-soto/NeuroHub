import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { AccesibilidadContext } from '../../context/AccesibilidadContext';
import './Hero.css';

// Scrolls its own listener instead of the shared useScrollY hook: the blob's
// position only ever needs to reach blobRef's inline style, so routing it
// through state (and re-rendering all of Hero on every scroll tick) would be
// wasted work — this writes straight to the DOM instead.
function Hero() {
    const blobRef = useRef(null);
    const { movimientoReducido } = useContext(AccesibilidadContext);

    useEffect(() => {
        if (movimientoReducido) {
            if (blobRef.current) blobRef.current.style.transform = '';
            return;
        }

        let ticking = false;

        function handleScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                if (blobRef.current) {
                    blobRef.current.style.transform = `translateY(${-50 + window.scrollY * 0.06}%)`;
                }
                ticking = false;
            });
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [movimientoReducido]);

    return (
        <section className="hero relative overflow-hidden pt-22 px-8 pb-16 max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-14 items-center min-h-[64vh]">
            <div className="hero__blob" ref={blobRef}></div>

            <div className="hero__content relative z-10">
                <span className="eyebrow">✵ Espacio pensado para bajo estímulo sensorial</span>

                <h1 className="hero__title">
                    <span className="line">
                        <span>Información, recursos</span>
                    </span>
                    <span className="line">
                        <span>y especialistas para la</span>
                    </span>
                    <span className="line">
                        <span>comunidad neurodivergente</span>
                    </span>
                </h1>

                <p className="hero__sub max-w-[50ch]">
                    Un portal accesible para autismo, TDAH, dislexia, procesamiento sensorial y
                    altas capacidades — recursos, ayudas públicas y profesionales por comunidad
                    autónoma.
                </p>

                <div className="hero__actions flex gap-3.5 flex-wrap mt-[30px]">
                    <Link to="/recursos" className="hero__btn hero__btn--primary">
                        Explorar recursos
                        <ArrowRight size={16} strokeWidth={3} aria-hidden="true" />
                    </Link>
                    <Link to="/profesionales" className="hero__btn hero__btn--ghost">
                        Buscar especialistas
                    </Link>
                </div>
            </div>

            <div className="hero__art relative z-10 aspect-[1/1.05] rounded-[40px] overflow-hidden flex items-center justify-center border border-border">
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    className="w-[56%] h-[56%] text-primary opacity-85"
                    aria-hidden="true"
                >
                    <circle cx="50" cy="38" r="20" />
                    <path d="M30 62c0-4 4-6 8-6h24c4 0 8 2 8 6v14H30z" />
                    <path d="M40 30c2-6 8-10 10-10s8 4 10 10" />
                </svg>
            </div>
        </section>
    );
}

export default Hero;
