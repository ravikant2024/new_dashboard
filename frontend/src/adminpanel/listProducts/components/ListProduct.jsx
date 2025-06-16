import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, IconButton, Divider, Button, Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { deleteProductByIdAsync, fetchProductsAsync, selectProducts, selectProductTotalResults } from '../../../features/products/ProductsSlice';
import EditProduct from './EditProduct';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { ITEMS_PER_PAGE_ADMIN } from '../../../constants';
import { useNavigate } from "react-router"

const headers = [
  { label: 'S.No', width: '10%' },
  { label: 'Image', width: '16%' },
  { label: 'Title', width: '22%' },
  { label: 'Price', width: '12%' },
  { label: 'Disc %', width: '12%' },
  { label: 'Category', width: '15%' },
  { label: 'Brand', width: '15%' },
  { label: 'S.Qty', width: '10%' },
  { label: 'SKU', width: '17%' },
  { label: 'Action', width: '8%' },
];


const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 20,
  display: 'flex',
  gap: 7,
  justifyContent: 'center'
});
const ListProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const productItems = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState(null)
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, []);
  useEffect(() => {
    setPage(1)
  }, [totalResults])

  // Fetch products on filter or page change
  useEffect(() => {
    const finalFilters = { ...filters, pagination: { page, limit: ITEMS_PER_PAGE_ADMIN } };
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, page, dispatch]);

  const handleMenuClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const handleEditProduct = () => {
    setEditProductId(selectedProduct._id);
    setOpenDialog(true);
    handleMenuClose();
  };

  // Delete Product from list
  const handleDelete = () => {
    dispatch(deleteProductByIdAsync(selectedProduct._id));
    dispatch(fetchProductsAsync());
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditProductId(null);
  };

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? productItems?.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
    )
    : productItems;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { items } = usePagination({
    count: Math.ceil(totalResults / ITEMS_PER_PAGE_ADMIN),
    page: page,
    onChange: (_, page) => setPage(page),
  });


  return (
    <>
      <div style={{ backgroundColor: 'white', padding: '2px' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: 3, marginLeft: 2, marginRight: 1 }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'left' }}>
            Product List
          </Typography>

          <Typography variant="h5" gutterBottom style={{ alignItems: 'center',marginLeft:'250px' }}>
            <TextField
              variant="outlined"
              size="small"
              sx={{ width: 250 }}
              placeholder="Search here"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 'auto', mr: 0 }}
            onClick={() => Navigate('/admin-dashboard/add-products')} >
            Add Product
          </Button>
        </Box>

        {/* Header Section with Box */}
        <Box display="flex" justifyContent="space-between" style={{ backgroundColor: 'brown', width: '100%', padding: '10px' }}>
          {headers.map((header, index) => (
            <Box key={index} style={{ width: header.width, textAlign: 'left' }}>
              <Typography variant="h6" style={{ color: 'white' }}>
                {header.label}
              </Typography>
            </Box>
          ))}
        </Box>
        {filteredProducts?.map((product, index) => {
          return (
            <Box key={product._id}>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop='10px'>
                <Box sx={{ width: '6%', textAlign: 'center' }}>
                  <Typography >{index + 1}</Typography>
                </Box>
                <Box sx={{ width: '12%', textAlign: 'center' }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                  />
                </Box>

                <Box sx={{ width: '23%', textAlign: 'center' }}>
                  <Typography >{product.title}</Typography>
                </Box>
                <Box sx={{ width: '12%', textAlign: 'center' }}>
                  <Typography >₹{product.price}</Typography>
                </Box>
                <Box sx={{ width: '10%', textAlign: 'center' }}>
                  {product.discountPercentage > 0 && (
                    <Typography>{product.discountPercentage}%</Typography>
                  )}
                </Box>
                <Box sx={{ width: '12%', textAlign: 'center' }}>
                  <Typography >{product.category}</Typography>
                </Box>

                <Box sx={{ width: '15%', textAlign: 'center' }}>
                  <Typography>{product.brand}</Typography>
                </Box>

                <Box sx={{ width: '8%', textAlign: 'center' }}>
                  <Typography >{product.stockQuantity}</Typography>
                </Box>
                <Box sx={{ width: '20%', textAlign: 'center' }}>
                  <Typography >{product.sku}</Typography>
                </Box>
                <Box sx={{ width: '8%', textAlign: 'center' }}>
                  <Button onClick={(e) => handleMenuClick(e, product)}>
                    <MoreVertIcon />
                  </Button>
                </Box>
              </Box>
              <Divider sx={{ marginY: 1 }} />
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditProduct}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                {/* <MenuItem onClick={handleMenuClose}>More</MenuItem> */}
              </Menu>
            </Box>
          );
        })}

        {/* Pagination  */}
        {items.length > 0 && (
          <List>
            {items.map(({ page, type, selected, ...item }, index) => {
              let children = null;

              if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                children = '…';
              } else if (type === 'page') {
                children = (
                  <button
                    type="button"
                    style={{
                      fontWeight: selected ? 'bold' : 'normal',
                      backgroundColor: selected ? '#007bff' : 'transparent',
                      color: selected ? '#fff' : '#000',
                      border: selected ? '1px solid #007bff' : '1px solid #ccc',
                      padding: '5px 10px',
                      borderRadius: '5px',
                    }}
                    {...item}
                  >
                    {page}
                  </button>
                );
              } else {
                children = (
                  <button type="button" {...item}>
                    {type.toUpperCase()}
                  </button>
                );
              }

              return <li key={index}>{children}</li>;
            })}
          </List>
        )}

      </div>

      {/* Modal/Dialog for Editing Product */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Product</DialogTitle>

        {/* Close Button */}
        <IconButton
          onClick={handleCloseModal}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '4px',
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {editProductId && <EditProduct productId={editProductId} setOpenDialog={setOpenDialog} currentFilters={{ ...filters, pagination: { page, limit: ITEMS_PER_PAGE_ADMIN } }} />}
        </DialogContent>
      </Dialog>


    </>
  );
};

export default ListProduct;
