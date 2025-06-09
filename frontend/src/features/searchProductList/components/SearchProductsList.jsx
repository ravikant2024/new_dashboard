import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './searchProductsList.css';
import { fetchProductsAsync, selectProducts } from '../../products/ProductsSlice';
import SearchProductCardList from './SearchProductCardList';

const SearchProductsList = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [searchProductData, setSearchProductData] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const products = useSelector(selectProducts);
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProductsAsync({}));
        }
    }, [dispatch, products.length]);

    useEffect(() => {
        if (!query.trim()) {
            setSearchProductData([]);
            return;
        }
        const q = query.toLowerCase();
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.category.toLowerCase().includes(q)
        );
        // Sort the filtered products
        if (sortOption === 'lowToHigh') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'highToLow') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        setSearchProductData(filtered);
    }, [products, query, sortOption]);

    return (
        <>
            <div className='search-result'>
                <h3 >
                    Showing  {Math.min(searchProductData.length, 32)}  of {searchProductData.length}
                </h3>
                <div className='sorting-product'>
                    <span >Sort By</span>
                    <ul>
                        <li onClick={() => setSortOption('lowToHigh')}
                            className={sortOption === 'lowToHigh' ? 'active' : ''}>Price - Low to High</li>
                        <li onClick={() => setSortOption('highToLow')}
                            className={sortOption === 'highToLow' ? 'active' : ''}>Price - High to Low</li>
                        <li onClick={() => setSortOption('newest')}
                            className={sortOption === 'newest' ? 'active' : ''}>Newest First</li>
                    </ul>
                </div>
            </div>


            <div className="search-products-list">
                {searchProductData && searchProductData.length > 0 ? (
                    searchProductData.map((product) => (
                        <SearchProductCardList
                            key={product._id}
                            id={product._id}
                            sku={product?.sku}
                            title={product.title}
                            thumbnail={product?.thumbnail}
                            price={product.price}
                            description={product?.description}
                            discountPercentage={product?.discountPercentage}

                        />
                    ))
                ) : (
                    <div className='noProductAvailable'>
                        <p >No Products Available.</p>
                    </div>

                )}
            </div>

        </>

    );
};

export default SearchProductsList;
