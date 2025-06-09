import "./blogList.css";
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllBlogsAsync } from "../BlogSlice";

const BlogList = () => {
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(fetchAllBlogsAsync());
    }, [dispatch]);

    return (
        <div className="blogcard-container">
            <div className='blog-heading'>
                <h4>Blog</h4>
                <Link to="view-all-blogs">
                    <button className="blog-view-all">View All</button>
                </Link>
            </div>
            <BlogCard />
        </div>
    );
};

export default BlogList;
