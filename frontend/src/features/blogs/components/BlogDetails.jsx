import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaTelegramPlane, FaWhatsapp, FaComments, FaRegCalendarAlt } from "react-icons/fa";
import { LiaBlogSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import {  fetchAllBlogsAsync, selectAllBlogs } from '../BlogSlice';
import Comment from '../../comment/components/Comment';
import { fetchAllComments, selectComments } from '../../comment/CommentSlice';
import "./BlogDetails.css"

const BlogDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const blogsdetails = useSelector(selectAllBlogs);
    const comment=useSelector(selectComments)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        dispatch(fetchAllBlogsAsync());
        dispatch(fetchAllComments())
    }, [dispatch]);

    const blog = blogsdetails.find(blog => blog._id === id);
    const relatedBlogs = blogsdetails.filter(
        item => item.category === blog?.category && item._id !== blog._id
    );

    return (
        <div className="blog-details-wrapper">
            {/* Social Icons */}
            <div className="left-icons">
                <Link to="https://www.facebook.com/profile.php?id=61566401565182"><FaFacebookF size={30} /></Link>
                <Link to="https://x.com/LlpOriginal"><FaTwitter size={30} /></Link>
                <Link to="#"><FaTelegramPlane size={30} /></Link>
                <Link to=""><FaWhatsapp size={30} /></Link>
            </div>

            <div className="blog-container">

                {/* Blog Content */}
                <div className="blog-content">
                    <h1 className="blog-title">{blog?.title}</h1>
                    <div className="blog-meta">
                        <span><LiaBlogSolid /> Blogs, {blog?.category}</span>
                        <span><FaComments /> {comment.length} comments</span>
                        <span><FaRegCalendarAlt /> {new Date(blog?.createdAt).toDateString()}</span>
                    </div>
                    <div className="blog-paragraph" dangerouslySetInnerHTML={{ __html: blog?.content }} />
                    {/* <img src={blog?.image} alt={blog?.title} className="blog-image" /> */}
                    <hr />
                    {/* Comment Section */}
                 <Comment/>
                </div>


                {/* Sidebar */}
                <div className="blog-sidebar">
                    <div className="sidebar-section">
                        <h3>Search Post</h3>
                        <input type="text" placeholder="Search blogs..." className="search-input" />
                    </div>
                    <div className="sidebar-section">
                        <h3>Related Posts</h3>
                        <ul className="related-list">
                            {relatedBlogs.length > 0 ? (
                                relatedBlogs.map(item => (
                                    <li key={item._id}>
                                        <Link to={`/blog/${item._id}`}>{item.title}</Link>
                                    </li>
                                ))
                            ) : (
                                <li>No related posts found.</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
