import React from 'react';
import "./blogCard.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllBlogs } from '../BlogSlice';

const BlogCard = () => {
    const blogs = useSelector(selectAllBlogs);
    return (
        <div className="blog-card-grid">
            {blogs.map((data) => (
                <Link to={`/blog/${data._id}`} key={data._id} className="blog-card-link">
                    <div className="blog-card">
                        <div className="blog-header">
                            <div className="blog-right">
                                <img src={data.image} alt="blog" />
                            </div>
                        </div>
                        <div className="blog-description">
                            <p>{data.title}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BlogCard;
