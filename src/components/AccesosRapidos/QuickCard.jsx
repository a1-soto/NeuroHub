import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function QuickCard({ icon: Icon, title, description, href }) {
    return (
        <div className="quick-card">
            <div className="quick-card__icon">
                <Icon aria-hidden="true" />
            </div>
            <h3 className="quick-card__title">{title}</h3>
            <p className="quick-card__description">{description}</p>
            <Link to={href} className="quick-card__link">
                {' '}
                Ver{' '}
                <span className="quick-card__link-icon">
                    <ArrowRight strokeWidth={3} aria-hidden="true" />
                </span>
            </Link>
        </div>
    );
}

export default QuickCard;
