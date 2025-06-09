import React, { useRef, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  IconButton,
  Stack
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useDispatch } from 'react-redux';
import {  createBlogAsync } from '../../features/blogs/BlogSlice';
import JoditEditor from 'jodit-react';

const AddBlog = () => {
  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [blogDetails, setBlogDetails] = useState({
    title: '',
    content: '',
    category: ''
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', blogDetails.title);
    formData.append('content', content);
    formData.append('category', blogDetails.category);
    if (image) formData.append('image', image);

    try {
      await dispatch(createBlogAsync(formData)).unwrap();
      alert('Blog added successfully!');
      setBlogDetails({ title: '', content: '', category: '' });
      setContent('');
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      alert('Failed to add blog.');
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ pt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          <IconButton color="primary">
            <PostAddIcon />
          </IconButton>
          Add New Blog Post
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Stack spacing={3}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              name="title"
              value={blogDetails.title}
              onChange={handleInputChange}
            />

            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />

            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              required
              name="category"
              value={blogDetails.category}
              onChange={handleInputChange}
            />

            <Button variant="contained" component="label" fullWidth>
              Upload Blog Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {image && <Typography variant="caption">{image.name}</Typography>}

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: 300, marginTop: 10 }}
              />
            )}

            <Button type="submit" fullWidth variant="contained" color="primary">
              Add Blog
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBlog;
