import { Link } from 'react-router-dom';
import { noticias } from '../../data/noticias';
import { blog } from '../../data/blog';
import { formatDate } from '../../utils/formatDate';
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll';
import NewsItem from './NewsItem';
import './NewsBlock.css';

function NewsBlock() {
    const ultimas = noticias.slice(0, 4);
    const [post] = blog;
    const formattedDate = formatDate(post.date);
    const innerRef = useRevealOnScroll();

    return (
        <section className="newsblock max-w-[1240px] mx-auto mt-14 rounded-[28px] px-11 py-13">
            <div
                ref={innerRef}
                className="newsblock__inner grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-12"
            >
                <div>
                    <div className="newsblock__head">
                        <h2>Últimas noticias</h2>
                        <Link to="/noticias" className="btn btn--outline-dark">
                            Leer todas
                        </Link>
                    </div>
                    <ul className="newsitem-list">
                        {ultimas.map((item) => (
                            <NewsItem key={item.id} {...item} />
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="newsblock__head">
                        <h2>Blog</h2>
                        <Link to="/blog" className="btn btn--outline-dark">
                            Leer todas
                        </Link>
                    </div>
                    <div className="blogcard">
                        <span className="tag">{post.category}</span>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <div className="blogcard__author">
                            Por {post.author} ({post.authorTitle}) · {formattedDate}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsBlock;
