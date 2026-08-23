import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blog } from '../../data/blog';
import { formatDate } from '../../utils/formatDate';
import './BlogTeaser.css';

function BlogTeaser() {
    const [post] = blog;
    const formattedDate = formatDate(post.date);

    return (
        <section className="panel-blue">
            <div className="panel-blue__head">
                <h2 className="section-title">Blog</h2>
                <Link to="/blog" className="btn btn--primary">
                    Leer todas
                    <ArrowRight size={20} strokeWidth={3} aria-hidden="true" />
                </Link>
            </div>

            <div className="blog-teaser-card">
                <div className="blog-teaser-card__media">
                    <img src="https://picsum.photos/220/165" alt="" />
                </div>
                <div>
                    <div className="blog-teaser-card__tag">{post.category}</div>
                    <h3 className="blog-teaser-card__title">{post.title}</h3>
                    <p className="blog-teaser-card__excerpt">{post.excerpt}</p>
                    <div className="blog-teaser-card__author">
                        Por {post.author} ({post.authorTitle}) · {formattedDate}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogTeaser;
