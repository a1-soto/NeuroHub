import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { noticias } from '../../data/noticias';
import NewsItem from './NewsItem';
import './UltimasNoticias.css';

function UltimasNoticias() {
    const ultimas = noticias.slice(0, 4);

    return (
        <section className="panel-blue">
            <div className="panel-blue__head">
                <div>
                    <h2 className="section-title">Últimas Noticias</h2>
                    <p className="section-sub">
                        Actualidad sobre regulaciones educativas, investigación y vida independiente
                    </p>
                </div>
                <Link to="/noticias" className="btn btn--primary">
                    Leer todas <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                </Link>
            </div>
            {ultimas.map((item) => (
                <NewsItem key={item.id} {...item} />
            ))}
        </section>
    );
}

export default UltimasNoticias;
