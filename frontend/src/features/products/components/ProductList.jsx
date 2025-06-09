import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../../auth/AuthSlice';
import { fetchProductsAsync, resetProductFetchStatus, selectProductFetchStatus, selectProducts, selectProductTotalResults } from '../ProductsSlice';
import { resetCartItemAddStatus, selectCartItemAddStatus } from '../../cart/CartSlice';
import { createWishlistItemAsync, deleteWishlistItemByIdAsync, resetWishlistItemAddStatus, resetWishlistItemDeleteStatus, selectWishlistItemAddStatus, selectWishlistItemDeleteStatus, selectWishlistItems } from '../../wishlist/WishlistSlice';
import ProductCard from './ProductCard';
import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';
import { ITEMS_PER_PAGE } from '../../../constants';
import './ProductCard.css';

const List = styled('ul')({
    listStyle: 'none',
    padding: 0,
    margin: 20,
    display: 'flex',
    gap: 7,
    justifyContent: 'center'
});

const ProductList = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectLoggedInUser);
    const products = useSelector(selectProducts);
    const productFetchStatus = useSelector(selectProductFetchStatus);
    const cartItemAddStatus = useSelector(selectCartItemAddStatus);
    const wishlistItemAddStatus = useSelector(selectWishlistItemAddStatus);
    const wishlistItemDeleteStatus = useSelector(selectWishlistItemDeleteStatus);
    const wishlistItems = useSelector(selectWishlistItems);
    const totalResults = useSelector(selectProductTotalResults);
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    const isAdminUser = loggedInUser && loggedInUser._id !== "77f2434c53bbe09c7c63f666";

    // Handle status effects
    useEffect(() => {
        if (cartItemAddStatus === 'fulfilled') {
            toast.success("Product added to cart");
            dispatch(resetCartItemAddStatus());
        } else if (cartItemAddStatus === 'rejected') {
            toast.error('Error adding product to cart, please try again later');
            dispatch(resetCartItemAddStatus());
        }
    }, [cartItemAddStatus]);

    useEffect(() => {
        if (productFetchStatus === 'rejected') {
            toast.error("Error fetching products, please try again later");
        }
    }, [productFetchStatus]);

    useEffect(() => {
        if (wishlistItemAddStatus === 'fulfilled') {
            toast.success("Product added to wishlist");
        } else if (wishlistItemAddStatus === 'rejected') {
            toast.error("Error adding product to wishlist, please try again later");
        }
    }, [wishlistItemAddStatus]);

    useEffect(() => {
        if (wishlistItemDeleteStatus === 'fulfilled') {
            toast.success("Product removed from wishlist");
        } else if (wishlistItemDeleteStatus === 'rejected') {
            toast.error("Error removing product from wishlist, please try again later");
        }
    }, [wishlistItemDeleteStatus]);

    useEffect(() => {
        setPage(1)
    }, [totalResults])

    // Fetch products on filter or page change
    useEffect(() => {
        const finalFilters = { ...filters, pagination: { page, limit: ITEMS_PER_PAGE } };
        dispatch(fetchProductsAsync(finalFilters));
    }, [filters, page, dispatch, loggedInUser]);

    // Handle wishlist add/remove
    const handleAddRemoveFromWishlist = (e, productId) => {
        if (e.target.checked && isAdminUser) {
            const data = { user: loggedInUser?._id, product: productId };
            dispatch(createWishlistItemAsync(data));
        } else if (!e.target.checked && isAdminUser) {
            const index = wishlistItems.findIndex((item) => item.product._id === productId);
            dispatch(deleteWishlistItemByIdAsync(wishlistItems[index]._id));
        } else {
            toast.error("Please log in to add/remove items from the wishlist.");
        }
    };

    const { items } = usePagination({
        count: Math.ceil(totalResults / ITEMS_PER_PAGE),
        page: page,
        onChange: (_, page) => setPage(page),
    });

    // Reset statuses when component unmounts
    useEffect(() => {
        return () => {
            dispatch(resetProductFetchStatus());
            dispatch(resetWishlistItemAddStatus());
            dispatch(resetWishlistItemDeleteStatus());
            dispatch(resetCartItemAddStatus());
        };
    }, [dispatch]);

    return (
        <>
            <div className='product-main-conatiner'>
                <h4 > All Products</h4>
                <div className="product-container">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                sku={product?.sku}
                                title={product.title}
                                thumbnail={product?.thumbnail}
                                price={product.price}
                                description={product?.description}
                                discountPercentage={product?.discountPercentage}
                                handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                            />
                        ))
                    ) : (
                        <div className='noProductAvailable'>
                            <p >No Products Available.</p>
                        </div>

                    )}
                </div>
            </div>



            {/* Pagination */}

            {totalResults > 5 && (
                <List>
                    {items.map(({ page, type, selected, ...item }, index) => {
                        let children = null;

                        // If it's an ellipsis, just display the "..."
                        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
                            children = '…';
                        } else if (type === 'page') {
                            // Style the selected page button differently
                            children = (
                                <button
                                    type="button"
                                    style={{
                                        fontWeight: selected ? 'bold' : 'normal',
                                        backgroundColor: selected ? '#007bff' : 'transparent',
                                        color: selected ? '#fff' : '#000',
                                        border: selected ? '1px solid #007bff' : '1px solid #ccc',
                                        padding: '6px 10px',
                                        borderRadius: '5px',
                                        marginTop:'6px'
                                    }}
                                    {...item}
                                >
                                    {page}
                                </button>
                            );
                        } else {
                            // For other types of pagination (like 'previous', 'next', or 'ellipsis')
                            children = (
                                <button type="button" {...item}>
                                    {type.toUpperCase()}
                                </button>
                            );
                        }

                        return <li key={index}>{children}</li>;
                    })}
                </List>
            )
            }
        </>
    );
};

export default ProductList;
