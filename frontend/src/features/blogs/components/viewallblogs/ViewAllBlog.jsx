import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllBlogsAsync, selectAllBlogs } from '../../BlogSlice';
import { Link } from 'react-router-dom';
import './viewAllBlogs.css';

const ViewAllBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  
   useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [])
  useEffect(() => {
    dispatch(fetchAllBlogsAsync());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter blogs based on the search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="View-all-container">
      <div className="search-container">
        <h4>Search Blogs</h4>
        <input
          type="text"
          placeholder="Search blog here"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <h3>All Blogs List</h3>
      <div className="blog-card-grid">
        {filteredBlogs.map((data) => (
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
    </div>
  );
};

export default ViewAllBlogs;
