function NewsItem({ title, source, org, date }) {
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(new Date(date));

    return (
        <div className="news-item">
            <div>
                <div className="news-item__tag">
                    {source} · {org}
                </div>
                <h3 className="news-item__title">{title}</h3>
            </div>
            <div className="news-item__date">{formattedDate}</div>
        </div>
    );
}

export default NewsItem;
