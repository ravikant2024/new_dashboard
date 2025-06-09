import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // ✅ Import DOMPurify

import {
  selectAllBlogs,
  selectBlogUpdateStatus,
  resetBlogUpdateStatus,
  fetchAllBlogsAsync,
  deleteBlogByIdAsync,
  updateBlogByIdAsync,
  selectBlogDeleteStatus,
  resetBlogDeleteStatus
} from '../../features/blogs/BlogSlice';
import EditBlog from './EditBlog';

const commonCellStyle = {
  fontWeight: 'bold',
  paddingTop: 1,
  paddingBottom: 1
};

// ✅ Helper function to strip HTML
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

const BlogListTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector(selectAllBlogs);
  const updateStatus = useSelector(selectBlogUpdateStatus);
  const deleteStatus = useSelector(selectBlogDeleteStatus);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    if (updateStatus === 'fulfilled') {
      toast.success("Blog updated successfully!");
      setOpenEditForm(false);
      setSelectedBlog(null);
    } else if (updateStatus === 'rejected') {
      toast.error("Failed to update blog.");
    }
  }, [updateStatus, dispatch]);

  useEffect(() => {
    if (deleteStatus === 'fulfilled') {
      toast.success("Blog deleted successfully!");
    } else if (deleteStatus === 'rejected') {
      toast.error("Failed to delete blog.");
    }
  }, [deleteStatus, dispatch]);

  useEffect(() => {
    dispatch(fetchAllBlogsAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    const blogToEdit = blogs.find(blog => blog._id === id);
    setSelectedBlog(blogToEdit);
    setOpenEditForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlogByIdAsync(id));
  };

  const updateBlog = (id, updatedData) => {
    dispatch(updateBlogByIdAsync({ id, data: updatedData }));
  };

  useEffect(() => {
    return () => {
      dispatch(resetBlogUpdateStatus());
      dispatch(resetBlogDeleteStatus());
    };
  }, [dispatch]);

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '100%',
          padding: '20px',
          marginLeft: '10px'
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginLeft: '10px',
            fontWeight: 'bold',
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          Blog List ({blogs.length})
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 'auto', mr: 2 }}
            onClick={() => navigate('/admin-dashboard/add-blog')}
          >
            Add Blog
          </Button>
        </Typography>

        <hr />

        <Table sx={{ minWidth: 650, marginTop: '0px' }} aria-label="blog list table">
          <TableHead>
            <TableRow>
              <TableCell sx={commonCellStyle}>S. No.</TableCell>
              <TableCell sx={commonCellStyle}>Title</TableCell>
              <TableCell sx={commonCellStyle}>Content</TableCell>
              <TableCell sx={commonCellStyle}>Category</TableCell>
              <TableCell sx={commonCellStyle}>Image</TableCell>
              <TableCell sx={{ ...commonCellStyle, textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog, index) => (
              <TableRow key={blog._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(stripHtml(blog.content).substring(0, 20) + "...")
                    }}
                  />
                </TableCell>
                <TableCell>{blog.category}</TableCell>
                <TableCell>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ height: 50, width: 70, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(blog._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EditBlog Modal */}
      <EditBlog
        open={openEditForm}
        onClose={() => {
          setOpenEditForm(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
        onSave={(updatedData) => updateBlog(selectedBlog._id, updatedData)}
      />
    </div>
  );
};

export default BlogListTable;
