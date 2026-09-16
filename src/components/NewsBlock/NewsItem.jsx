import { formatDate } from '../../utils/formatDate';

function NewsItem({ title, source, org, date, url }) {
    const formattedDate = formatDate(date);

    return (
        <li className="newsitem">
            <a href={url} target="_blank" rel="noopener noreferrer" className="newsitem__link">
                <div className="newsitem__tag">
                    {source} · {org}
                </div>
                <h3 className="newsitem__title">{title}</h3>
                <div className="newsitem__date">{formattedDate}</div>
            </a>
        </li>
    );
}

export default NewsItem;
